const NacelleClient = require('@nacelle/storefront-sdk').default;

module.exports = function nacelleClient({
  nacelleStorefrontToken = '',
  nacelleStorefrontEndpoint = '',
  locale = 'en-US',
  contentfulPreviewSpaceId = '',
  contentfulPreviewApiToken = '',
  previewMode = false
}) {
  const clientSettings = {
    token: nacelleStorefrontToken || process.env.NACELLE_STOREFRONT_TOKEN,
    storefrontEndpoint:
      nacelleStorefrontEndpoint || process.env.NACELLE_STOREFRONT_ENDPOINT,
    locale
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
