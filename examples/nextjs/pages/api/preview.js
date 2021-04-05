// To view unpublished products, collections, or content, provide the
// desired destination via the `path` query parameter.
//
// For example: `/api/preview?secret=my-preview-mode-secret&path=/pages/first-draft`

import nacelleClient from 'services/nacelle';

export default async function handler(req, res) {
  const previewModeSecret = 'my-preview-mode-secret'; // IMPORTANT! Update this value.
  const { secret, path = '/' } = req.query;

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
        'An incorrect preview mode secret was provided to the /api/preview endpoint.'
    });
  }

  if (path === '/') {
    // Set cookies to enable Preview Mode
    res.setPreviewData({});
    console.info('[nacelle] preview mode enabled');
    res.redirect('/');
  }

  // Redirecting to req.query.path might lead to open redirect vulnerabilities.
  // Instead, we'll use the handle from the provided path to fetch data with
  // the Nacelle Client JS SDK. If a result is found, we'll redirect to the
  // path associated with the data fetched with the Nacelle Client JS SDK.

  async function getPathFromIndexedData({ path, locale = 'en-us', method }) {
    const [, pathPrefix, handle] = path.split('/');
    const data = await nacelleClient.data[method]({ handle, locale }).catch(
      (err) => {
        console.warn(err);
        return null;
      }
    );
    const newPath = data?.handle ? `/${pathPrefix}/${data.handle}` : null;
    return { newPath, handle };
  }

  function handleRedirect({ res, newPath, handle, method }) {
    // Redirect to the path from the fetched data
    if (newPath) {
      // Set cookies to enable Preview Mode
      res.setPreviewData({});
      console.info('[nacelle] preview mode enabled');
      res.redirect(newPath);
    } else {
      return res.status(400).json({
        message:
          'Cannot enable preview mode. ' +
          `No ${method} found with handle: '${handle}'`
      });
    }
  }

  if (path.startsWith('/products/')) {
    const method = 'product';
    const { newPath, handle } = await getPathFromIndexedData({ path, method });
    handleRedirect({ res, newPath, handle, method });
  }

  if (path.startsWith('/collections/')) {
    const method = 'collection';
    const { newPath, handle } = await getPathFromIndexedData({ path, method });
    handleRedirect({ res, newPath, handle, method });
  }

  if (path.startsWith('/pages/')) {
    const method = 'page';
    const { newPath, handle } = await getPathFromIndexedData({ path, method });

    if (path.startsWith('/pages/homepage')) {
      handleRedirect({ res, newPath: '/', handle, method });
    } else {
      handleRedirect({ res, newPath, handle, method });
    }
  }

  if (path.startsWith('/articles/')) {
    const method = 'article';
    const { newPath, handle } = await getPathFromIndexedData({ path, method });
    handleRedirect({ res, newPath, handle, method });
  }

  if (path === '/') {
    // Set cookies to enable Preview Mode
    res.setPreviewData({});
    console.info('[nacelle] preview mode enabled');
    res.redirect('/');
  }
}
