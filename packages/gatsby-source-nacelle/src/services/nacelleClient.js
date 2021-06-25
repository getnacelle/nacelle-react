const NacelleClient = require('@nacelle/client-js-sdk').default;

module.exports = function nacelleClient({
  nacelleSpaceId = '',
  nacelleGraphqlToken = '',
  nacelleEndpoint = '',
  contentfulPreviewSpaceId = '',
  contentfulPreviewApiToken = '',
  previewMode = false
}) {
  const clientSettings = {
    id: nacelleSpaceId || process.env.NACELLE_SPACE_ID,
    token: nacelleGraphqlToken || process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: nacelleEndpoint || 'https://hailfrequency.com/v3/graphql',
    useStatic: false
  };

  // Initialize the Nacelle Client
  const client = new NacelleClient(clientSettings);

  if (
    previewMode === true &&
    contentfulPreviewSpaceId &&
    contentfulPreviewApiToken
  ) {
    const NacelleContentfulPreviewConnector =
      require('@nacelle/contentful-preview-connector').default;

    // Initialize the Preview Connector
    // Note: the Contentful Preview API token is not the same as your Content Delivery API token
    const previewConnector = new NacelleContentfulPreviewConnector({
      contentfulSpaceID: contentfulPreviewSpaceId,
      contentfulToken: contentfulPreviewApiToken
    });

    // Update the data module with the new connector
    client.data.content = (params) => previewConnector.content(params);
    client.data.page = (params) => previewConnector.page(params);
    client.data.pages = (params) => previewConnector.pages(params);
    client.data.article = (params) => previewConnector.article(params);
    client.data.articles = (params) => previewConnector.articles(params);
    client.data.blog = (params) => previewConnector.blog(params);
    client.data.allContent = (params) => previewConnector.allContent(params);

    console.info('[gatsby-source-nacelle] Contentful preview mode activated');
  }

  return client;
};
