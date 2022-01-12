const sourceNodes = require('./src/source-nodes');
const typeDefs = require('./src/type-defs');
const { createRemoteImageFileNode, cmsPreviewEnabled } = require('./src/utils');
const { nacelleClient: createNacelleClient } = require('./src/services');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    nacelleSpaceId: Joi.string().description(
      'Space ID from the Nacelle Dashboard'
    ),
    nacelleGraphqlToken: Joi.string().description(
      'GraphQL Token from the Nacelle Dashboard'
    ),
    nacelleClient: Joi.optional().description(
      'Instance of the `@nacelle/client-js-sdk` which you want to use to fetch your nacelle data'
    ),
    contentfulPreviewApiToken: Joi.string().description(
      'Contentful Preview API token from Contentful Dashboard settings'
    ),
    cmsPreviewEnabled: Joi.boolean().description(
      `Toggle Contentful Preview on and off (IMPORTANT: requires that both 'contentfulPreviewSpaceId' and 'contentfulPreviewApiToken' are also set)`
    ),
    cacheDuration: Joi.number().description(
      'Max duration in ms that gatsby-source-nacelle caches product, collection, and content data from previous builds'
    )
  });
};

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const {
    nacelleSpaceId,
    nacelleGraphqlToken,
    nacelleEndpoint,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken,
    nacelleClient
  } = pluginOptions;

  const client = nacelleClient
    ? nacelleClient
    : createNacelleClient({
        previewMode: cmsPreviewEnabled(pluginOptions),
        nacelleSpaceId,
        nacelleGraphqlToken,
        nacelleEndpoint,
        contentfulPreviewSpaceId,
        contentfulPreviewApiToken
      });

  const [
    spaceData,
    productData,
    collectionData,
    contentData
  ] = await Promise.all([
    // fetch data from Nacelle's Hail Frequency API
    client.data.space(),
    client.data.allProducts(),
    client.data.allCollections(),
    client.data.allContent()
  ]).catch((err) => {
    throw new Error(`Could not fetch data from Nacelle: ${err.message}`);
  });

  await Promise.all([
    // use Nacelle data to create Gatsby nodes
    sourceNodes({ gatsbyApi, pluginOptions, data: spaceData }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: productData
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: collectionData
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: contentData
    })
  ]).catch((err) => {
    throw new Error(
      `Could not create Gatsby nodes from Nacelle data: ${err.message}`
    );
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  // create custom type definitions to maintain data shape
  // in both preview and production settings
  actions.createTypes(typeDefs);
};

exports.onCreateNode = async ({ actions, getCache, createNodeId, node }) => {
  try {
    // the user can opt into using Gatsby Image by installing `gatsby-source-filesystem`
    require('gatsby-source-filesystem');

    const gatsbyApi = { actions, getCache, createNodeId };
    const isImage = (nodeMediaEntry) =>
      nodeMediaEntry &&
      nodeMediaEntry.type &&
      nodeMediaEntry.type.startsWith('image');

    if (node.internal.type === 'NacelleProduct') {
      await createRemoteImageFileNode(
        node,
        ['featuredMedia', 'media'],
        gatsbyApi,
        { isImage }
      );
    }

    if (node.internal.type === 'NacelleCollection') {
      await createRemoteImageFileNode(node, 'featuredMedia', gatsbyApi, {
        isImage
      });
    }

    if (node.internal.type === 'NacelleContent') {
      await createRemoteImageFileNode(node, 'featuredMedia', gatsbyApi, {
        isImage
      });
    }
  } catch (err) {
    return null;
  }
};

exports.onPostBootstrap = async function ({ cache }) {
  cache.set('nacelle-timestamp', Date.now());
};
