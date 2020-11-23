const NacelleClient = require('@nacelle/client-js-sdk').default;
const NacelleContentfulPreviewConnector = require('@nacelle/contentful-preview-connector')
  .default;

module.exports = function nacelleClient({
  nacelleSpaceId = '',
  nacelleGraphqlToken = '',
  contentfulPreviewSpaceId = '',
  contentfulPreviewApiToken = ''
}) {
  const clientSettings = {
    id: nacelleSpaceId || process.env.NACELLE_SPACE_ID,
    token: nacelleGraphqlToken || process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: 'https://hailfrequency.com/v2/graphql',
    useStatic: false
  };

  // Initialize the Nacelle Client
  const client = new NacelleClient(clientSettings);

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

  return client;
};
