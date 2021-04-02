// To view unpublished products, collections, or content, provide the
// desired destination via the `path` param: `/api/preview?path=/pages/first-draft`
export default function handler(req, res) {
  const previewModeSecret = 'my-preview-mode-secret';
  const { secret } = req.query;

  if (!secret) {
    return res.status(400).json({
      message:
        'The preview mode secret must be provided in a query param. ' +
        'For example: https://my-preview-site/api/preview?secret=my-preview-mode-secret'
    });
  }

  if (secret !== previewModeSecret) {
    return res.status(400).json({
      message:
        'Cannot enable preview mode. ' +
        'An incorrect preview mode secret provided to the /api/preview endpoint.'
    });
  }

  const path = req.query.path || '/';

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});
  console.info('[nacelle] preview mode enabled');

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  if (req.query.path?.endsWith('/homepage')) {
    res.redirect('/');
  }

  res.redirect(path);
}
