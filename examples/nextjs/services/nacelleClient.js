import NacelleClient from '@nacelle/client-js-sdk';
import { createContentfulClient, createShopifyClient } from 'utils/preview';

const nacelleClientOptions = {
  // for a full list of configuration options, please see
  // https://docs.getnacelle.com/api-reference/client-js-sdk.html
  id: process.env.NEXT_PUBLIC_NACELLE_SPACE_ID,
  token: process.env.NEXT_PUBLIC_NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.NEXT_PUBLIC_NACELLE_ENDPOINT,
  useStatic: false
};

const defaultClient = new NacelleClient(nacelleClientOptions);
const unifiedClient = new NacelleClient(nacelleClientOptions);

const hasCmsEnvVars = (params) =>
  params?.contentfulSpaceId && params?.contentfulPreviewApiToken;
const hasPimEnvVars = (params) =>
  params?.myShopifyDomain && params?.shopifyStorefrontAccessToken;

unifiedClient.data.content = (params) =>
  hasCmsEnvVars(params.previewData)
    ? createContentfulClient(params.previewData).content(params)
    : defaultClient.data.content(params);

unifiedClient.data.page = (params) =>
  hasCmsEnvVars(params.previewData)
    ? createContentfulClient(params.previewData).page(params)
    : defaultClient.data.page(params);

unifiedClient.data.pages = (params) =>
  hasCmsEnvVars(params.previewData)
    ? createContentfulClient(params.previewData).pages(params)
    : defaultClient.data.pages(params);

unifiedClient.data.article = (params) =>
  hasCmsEnvVars(params.previewData)
    ? createContentfulClient(params.previewData).article(params)
    : defaultClient.data.article(params);

unifiedClient.data.articles = (params) =>
  hasCmsEnvVars(params.previewData)
    ? createContentfulClient(params.previewData).articles(params)
    : defaultClient.data.articles(params);

unifiedClient.data.blog = (params) =>
  hasCmsEnvVars(params.previewData)
    ? createContentfulClient(params.previewData).blog(params)
    : defaultClient.data.blog(params);

unifiedClient.data.allContent = (params) =>
  hasCmsEnvVars(params?.previewData)
    ? createContentfulClient(params.previewData).allContent(params)
    : defaultClient.data.allContent(params);

unifiedClient.data.product = (params) =>
  hasPimEnvVars(params.previewData)
    ? createShopifyClient(params.previewData).product(params)
    : defaultClient.data.product(params);

unifiedClient.data.products = (params) =>
  hasPimEnvVars(params.previewData)
    ? createShopifyClient(params.previewData).products(params)
    : defaultClient.data.products(params);

unifiedClient.data.collection = (params) =>
  hasPimEnvVars(params.previewData)
    ? createShopifyClient(params.previewData).collection(params)
    : defaultClient.data.collection(params);

unifiedClient.data.collectionPage = (params) =>
  hasPimEnvVars(params.previewData)
    ? createShopifyClient(params.previewData).collectionPage(params)
    : defaultClient.data.collectionPage(params);

unifiedClient.data.allProducts = (params) =>
  hasPimEnvVars(params?.previewData)
    ? createShopifyClient(params.previewData).allProducts(params)
    : defaultClient.data.allProducts(params);

unifiedClient.data.allCollections = (params) =>
  hasPimEnvVars(params?.previewData)
    ? createShopifyClient(params.previewData).allCollections(params)
    : defaultClient.data.allCollections(params);

export default unifiedClient;
