// To view unpublished products, collections, or content, provide the
// desired destination via the `path` query parameter.
//
// For example: `/api/preview?secret=my-preview-mode-secret&path=/pages/first-draft`

import { getPathFromData, handleRedirect } from 'utils/preview';

export default async function handler(req, res) {
  const previewModeSecret = process.env.PREVIEW_MODE_SECRET;
  const { secret, path = '/' } = req.query;
  const locale = req.query.locale?.toLowerCase() || 'en-us';

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

  // Configure data fetching & redirect for a variety of paths.
  // This section can be customized to meet unique use cases.
  if (path.startsWith('/products/')) {
    const method = 'product';
    const { newPath, handle } = await getPathFromData({ path, method, locale });

    handleRedirect({ res, newPath, method, handle, locale });
  } else if (path.startsWith('/collections/')) {
    const method = 'collection';
    const { newPath, handle } = await getPathFromData({ path, method, locale });

    handleRedirect({ res, newPath, method, handle, locale });
  } else if (path.startsWith('/pages/')) {
    const method = 'page';
    const { newPath, handle } = await getPathFromData({ path, method, locale });

    if (path.startsWith('/pages/homepage')) {
      handleRedirect({ res, newPath: '/', handle, method });
    } else {
      handleRedirect({ res, newPath, method, handle, locale });
    }
  } else {
    try {
      const method = 'article';

      // blogHandle example: in `/wellness/eat-avocados`, the blogHandle is `wellness`
      const [, blogHandle] = [...path.matchAll(/([\w|-]+)/g)]
        .map((matches) => matches[0])
        .reverse();

      const { newPath, handle } = await getPathFromData({
        path,
        method,
        blogHandle,
        locale
      });

      handleRedirect({ res, newPath, method, handle, locale });
    } catch (err) {
      // If path doesn't match any of the blocks above and isn't a blog article, redirect to home page
      handleRedirect({
        res,
        newPath: '/',
        method: 'n/a',
        handle: 'n/a',
        locale: 'n/a'
      });
    }
  }
}
