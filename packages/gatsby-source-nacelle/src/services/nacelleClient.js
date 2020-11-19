const NacelleClient = require('@nacelle/client-js-sdk').default;
const NacelleContentfulPreviewConnector = require('@nacelle/contentful-preview-connector')
  .default;

module.exports = function nacelleClient({
  previewMode = false,
  nacelleSpaceId = '',
  nacelleGraphqlToken = '',
  contentfulPreviewSpaceId = '',
  contentfulPreviewApiToken = ''
}) {
  const previewModeToggled = previewMode !== false;
  const clientSettings = {
    id: nacelleSpaceId || process.env.NACELLE_SPACE_ID,
    token: nacelleGraphqlToken || process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: 'https://hailfrequency.com/v2/graphql',
    useStatic: false
  };

  // Initialize the Nacelle Client
  const client = new NacelleClient(clientSettings);

  if (previewModeToggled) {
    const previewVariablesExist = Boolean(
      contentfulPreviewSpaceId && contentfulPreviewApiToken
    );

    if (previewModeToggled && !previewVariablesExist) {
      console.warn(
        '\nPreview Mode not activated due to missing environment variables:\n' +
          (!contentfulPreviewSpaceId && '- CONTENTFUL_PREVIEW_SPACE_ID\n') +
          (!contentfulPreviewApiToken && '- CONTENTFUL_PREVIEW_API_TOKEN\n')
      );
    }

    if (previewModeToggled && previewVariablesExist) {
      // Initialize the Preview Connector
      // Note: the Contentful Preview API token is not the same as your Content Delivery API token
      const previewConnector = new NacelleContentfulPreviewConnector({
        contentfulSpaceID: contentfulPreviewSpaceId,
        contentfulToken: contentfulPreviewApiToken
      });

      // Update the data module with the new connector
      client.data.update({
        connector: previewConnector
      });

      console.info('[Nacelle] sourcing PREVIEW content from Contentful');
    }
  }

  return client;
};
