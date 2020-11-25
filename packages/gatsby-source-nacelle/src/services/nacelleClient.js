const NacelleClient = require('@nacelle/client-js-sdk').default;

module.exports = function nacelleClient({
  nacelleSpaceId = '',
  nacelleGraphqlToken = '',
  contentfulPreviewSpaceId = '',
  contentfulPreviewApiToken = '',
  previewMode = false
}) {
  const clientSettings = {
    id: nacelleSpaceId || process.env.NACELLE_SPACE_ID,
    token: nacelleGraphqlToken || process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: 'https://hailfrequency.com/v2/graphql',
    useStatic: false
  };

  // Initialize the Nacelle Client
  const client = new NacelleClient(clientSettings);

  if (previewMode && contentfulPreviewSpaceId && contentfulPreviewApiToken) {
    const NacelleContentfulPreviewConnector = require('@nacelle/contentful-preview-connector')
      .default;

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

    console.info('[gatsby-source-nacelle] Contentful preview mode activated');
  }

  return client;
};
