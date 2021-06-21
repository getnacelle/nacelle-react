import ContentfulPreviewConnector from '@nacelle/contentful-preview-connector';

/**
 * Initialize the Contentful preview connector
 * @param {Object} config the configuration object
 * @param {string} config.contentfulSpaceId the Contentful Space ID
 * @param {string} config.contentfulPreviewApiToken the Contentful Preview API Token
 */
export default function createContentfulClient({
  contentfulSpaceId,
  contentfulPreviewApiToken
}) {
  if (!contentfulSpaceId || !contentfulPreviewApiToken) {
    throw new Error(
      'Could not initialize Contentful client due to missing environment variables. ' +
        'Please ensure that the CONTENTFUL_SPACE_ID and CONTENTFUL_PREVIEW_API_TOKEN ' +
        "have been added to your `.env` or deployment's Environment Variables."
    );
  }

  return new ContentfulPreviewConnector({
    contentfulConfig: {
      space: contentfulSpaceId,
      accessToken: contentfulPreviewApiToken
      // for a full list of configuration options, please see
      // https://github.com/contentful/contentful.js#configuration
    }
  });
}
