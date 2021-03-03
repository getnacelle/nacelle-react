import NacelleClient from '@nacelle/client-js-sdk';
import NacelleContentfulPreviewConnector from '@nacelle/contentful-preview-connector';
import NacelleShopifyPreviewConnector from '@nacelle/shopify-connector';

function warnMissingEnvVars(envVars) {
  console.warn(
    '\nPreview Mode not activated due to missing environment variables:\n' +
      envVars
        .map((envVar) => (!process.env[envVar] ? `- ${envVar}\n` : ''))
        .join('')
  );
}

const settings = {
  id: process.env.NACELLE_SPACE_ID,
  token: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: 'https://hailfrequency.com/v3/graphql',
  useStatic: false
};

const shopifySettings = { ...settings, locale: process.env.PIM_LOCALE };
const contentfulSettings = { ...settings, locale: process.env.CMS_LOCALE };

const clientPIM = new NacelleClient(shopifySettings);
const clientCMS = new NacelleClient(contentfulSettings);
const client = new NacelleClient(contentfulSettings);

client.data.product = (params) => clientPIM.data.product(params);
client.data.products = (params) => clientPIM.data.products(params);
client.data.allProducts = (params) => clientPIM.data.allProducts(params);
client.data.collection = (params) => clientPIM.data.collection(params);
client.data.collectionPage = (params) => clientPIM.data.collectionPage(params);
client.data.allCollections = (params) => clientPIM.data.allCollections(params);

// PREVIEW MODE SETUP
const previewModeToggled = process.env.NACELLE_PREVIEW_MODE === 'true';

const pimPreviewVariablesExist = Boolean(
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN && process.env.MYSHOPIFY_DOMAIN
);
const cmsPreviewVariablesExist = Boolean(
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_PREVIEW_API_TOKEN
);

if (previewModeToggled) {
  if (!pimPreviewVariablesExist || !cmsPreviewVariablesExist) {
    warnMissingEnvVars([
      'SHOPIFY_STOREFRONT_ACCESS_TOKEN',
      'MYSHOPIFY_DOMAIN',
      'CONTENTFUL_SPACE_ID',
      'CONTENTFUL_PREVIEW_API_TOKEN'
    ]);
  } else {
    // Initialize the Shopify Preview Connector
    const shopifyConnector = new NacelleShopifyPreviewConnector({
      shopifyApiKey: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      shopifyDomain: process.env.MYSHOPIFY_DOMAIN.split('.').shift()
    });

    client.data.product = (params) =>
      params.preview
        ? shopifyConnector.product(params)
        : clientPIM.data.product(params);

    client.data.products = (params) =>
      params.preview
        ? shopifyConnector.products(params)
        : clientPIM.data.products(params);

    client.data.collection = (params) =>
      params.preview
        ? shopifyConnector.collection(params)
        : clientPIM.data.collection(params);

    client.data.collectionPage = (params) =>
      params.preview
        ? shopifyConnector.collectionPage(params)
        : clientPIM.data.collectionPage(params);

    client.data.allProducts = (params) =>
      params?.preview
        ? shopifyConnector.allProducts(params)
        : clientPIM.data.allProducts(params);

    client.data.allCollections = (params) =>
      params?.preview
        ? shopifyConnector.allCollections(params)
        : clientPIM.data.allCollections(params);

    // Initialize the Contentful Preview Connector
    //  NOTE: the Contentful Preview API token is not
    //  the same as your Content Delivery API token
    const contentfulPreview = new NacelleContentfulPreviewConnector({
      contentfulSpaceID: process.env.CONTENTFUL_SPACE_ID,
      contentfulToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN
    });

    client.data.content = (params) =>
      params.preview
        ? contentfulPreview.content(params)
        : clientCMS.data.content(params);

    client.data.page = (params) =>
      params.preview
        ? contentfulPreview.page(params)
        : clientCMS.data.page(params);

    client.data.pages = (params) =>
      params.preview
        ? contentfulPreview.pages(params)
        : clientCMS.data.pages(params);

    client.data.article = (params) =>
      params.preview
        ? contentfulPreview.article(params)
        : clientCMS.data.article(params);

    client.data.articles = (params) =>
      params.preview
        ? contentfulPreview.articles(params)
        : clientCMS.data.articles(params);

    client.data.blog = (params) =>
      params.preview
        ? contentfulPreview.blog(params)
        : clientCMS.data.blog(params);

    client.data.allContent = (params) =>
      params?.preview
        ? contentfulPreview.allContent(params)
        : clientCMS.data.allContent(params);
  }
}

export default client;
