export const previewData = {};

/**
 * Handle redirect to newPath, or provide error message specific to
 * the path, handle, and method being used to fetch the newPath.
 *
 * @param {Object} config the configuration object
 * @param {string} config.res the Vercel Serverless Function response object
 * @param {string} config.newPath the url path, which /ends/with/the/handle of the entry to be fetched
 * @param {string} config.method method to be used by the Nacelle Client JS SDK to fetch the entry of interest
 * @param {string} config.handle handle to be used by the Nacelle Client JS SDK
 */
export default function handleRedirect({
  res,
  newPath,
  method,
  handle,
  locale = 'en-us'
}) {
  // Redirect to the path from the fetched data
  if (newPath) {
    // Set cookies to enable Preview Mode
    res.setPreviewData(previewData);
    console.info('[nacelle] preview mode enabled');

    res.redirect(newPath);
  } else {
    return res.status(400).json({
      message:
        'Cannot enable preview mode. ' +
        `No ${method} found with handle: '${handle}' and locale: '${locale}'`
    });
  }
}
