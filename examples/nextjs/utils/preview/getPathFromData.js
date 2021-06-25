import { nacelleClient } from 'services';
import { previewData } from './handleRedirect';
/**
 * Redirecting to req.query.path might lead to open redirect vulnerabilities.
 * Instead, we'll use the handle from the provided path to fetch data with
 * the Nacelle Client JS SDK. If a result is found, we'll redirect to the
 * path associated with the data fetched with the Nacelle Client JS SDK.
 *
 * @param {Object} config the configuration object
 * @param {string} config.path the url path, which /ends/with/the/handle of the entry to be fetched
 * @param {string} config.method method to be used by the Nacelle Client JS SDK to fetch the entry of interest
 */
export default async function getPathFromData({
  path,
  method,
  blogHandle,
  locale = 'en-us'
}) {
  const [handle] = [...path.matchAll(/([\w|-]+)/g)]
    .map((matches) => matches[0])
    .reverse();
  const pathPrefix = path.split(`/${handle}`).shift();
  const params = {
    handle,
    locale,
    previewData
  };

  if (blogHandle && method === 'article') {
    params.blogHandle = blogHandle;
  }

  const data = await nacelleClient.data[method](params).catch((err) => {
    console.warn(err);
    return null;
  });

  const newPath = data?.handle ? `${pathPrefix}/${data.handle}` : null;

  return { newPath, handle };
}
