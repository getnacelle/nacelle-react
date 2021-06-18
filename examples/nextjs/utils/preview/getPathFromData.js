import { nacelleClient } from 'services';
/**
 *  Redirecting to req.query.path might lead to open redirect vulnerabilities.
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
  locale = 'en-us'
}) {
  const [, pathPrefix, handle] = path.split('/');
  const data = await nacelleClient.data[method]({
    handle,
    locale,
    preview: true
  }).catch((err) => {
    console.warn(err);
    return null;
  });
  const newPath = data?.handle ? `/${pathPrefix}/${data.handle}` : null;

  return { newPath, handle };
}
