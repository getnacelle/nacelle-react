import NacelleClient from '@nacelle/client-js-sdk';
import NacelleContentfulPreviewConnector from '@nacelle/contentful-preview-connector';

const settings = {
  id: process.env.NACELLE_SPACE_ID,
  token: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: 'https://hailfrequency.com/v2/graphql',
  useStatic: false
};

const shopifySettings = { ...settings, locale: 'en-us' };
const contentfulSettings = { ...settings, locale: 'en-US' };

const clientPIM = new NacelleClient(shopifySettings);
const clientCMS = new NacelleClient(contentfulSettings);
const client = { ...clientCMS };

client.data.product = (params) => clientPIM.data.product(params);
client.data.products = (params) => clientPIM.data.products(params);
client.data.allProducts = (params) => clientPIM.data.allProducts(params);
client.data.collection = (params) => clientPIM.data.collection(params);
client.data.collectionPage = (params) => clientPIM.data.collectionPage(params);
client.data.allCollections = (params) => clientPIM.data.allCollections(params);

// PREVIEW MODE SETUP
const previewBranchName = 'preview';
const vercelBranch = process.env.VERCEL_GITHUB_COMMIT_REF;
const inPreviewBranch = vercelBranch && vercelBranch === previewBranchName;
const previewModeToggled =
  process.env.NACELLE_PREVIEW_MODE === 'true' || inPreviewBranch;
const previewVariablesExist = Boolean(
  process.env.CONTENTFUL_PREVIEW_SPACE_ID &&
    process.env.CONTENTFUL_PREVIEW_API_TOKEN
);

if (previewModeToggled && !previewVariablesExist) {
  console.warn(
    '\nPreview Mode not activated due to missing environment variables:\n' +
      (!process.env.CONTENTFUL_PREVIEW_SPACE_ID &&
        '- CONTENTFUL_PREVIEW_SPACE_ID\n') +
      (!process.env.CONTENTFUL_PREVIEW_API_TOKEN &&
        '- CONTENTFUL_PREVIEW_API_TOKEN\n')
  );
}

if (previewModeToggled && previewVariablesExist) {
  // Initialize the Preview Connector
  // Note: the Contentful Preview API token is not the same as your Content Delivery API token
  const contentfulPreview = new NacelleContentfulPreviewConnector({
    contentfulSpaceID: process.env.CONTENTFUL_PREVIEW_SPACE_ID,
    contentfulToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN
  });

  client.data.content = (params) => contentfulPreview.content(params);
  client.data.page = (params) => contentfulPreview.page(params);
  client.data.pages = (params) => contentfulPreview.pages(params);
  client.data.article = (params) => contentfulPreview.article(params);
  client.data.articles = (params) => contentfulPreview.articles(params);
  client.data.blog = (params) => contentfulPreview.blog(params);

  console.log('\nRUNNING NACELLE IN PREVIEW MODE\n');
}

export default client;
