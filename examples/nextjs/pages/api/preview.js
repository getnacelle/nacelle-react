// If this is located at pages/api/cms-preview.js,
// then open /api/cms-preview from your browser.
export default function handler(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (!req.query.path) {
    return res.status(400).json({
      message:
        'The path must be provided in a query param. ' +
        'For example: https://my-preview-site/api/preview?path=/page/some-page'
    });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});
  console.info('[nacelle] preview mode enabled');

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  if (req.query.path.endsWith('/homepage')) {
    res.redirect('/');
  }

  res.redirect(req.query.path);
}
