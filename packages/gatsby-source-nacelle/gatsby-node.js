const {
  sourceProductNodes,
  sourceCollectionNodes,
  sourceContentNodes,
  sourceSpaceNodes
} = require('./src/source-nodes');
const { createRemoteImageFileNode } = require('./src/utils');
const typeDefs = require('./src/type-defs');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    nacelleSpaceId: Joi.string()
      .required()
      .description('Space ID from the Nacelle Dashboard'),
    nacelleGraphqlToken: Joi.string()
      .required()
      .description('GraphQL Token from the Nacelle Dashboard'),
    contentfulPreviewSpaceId: Joi.string().description(
      'Space ID from Contentful Dashboard settings'
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
  await Promise.all([
    // source Nacelle space data from Nacelle's Hail Frequency API & convert to Gatsby node
    sourceSpaceNodes(gatsbyApi, pluginOptions),

    // source products & collections from Nacelle's Hail Frequency API & convert to Gatsby nodes
    sourceProductNodes(gatsbyApi, pluginOptions),
    sourceCollectionNodes(gatsbyApi, pluginOptions),

    // if Contentful preview is enabled, source content from Contentful Preview API,
    // otherwise source content from Nacelle's Hail Frequency API, then convert to Gatsby nodes
    sourceContentNodes(gatsbyApi, pluginOptions)
  ]);
};

exports.createSchemaCustomization = ({ actions }) => {
  // create custom type definitions to maintain data shape
  // in both preview and production settings
  actions.createTypes(typeDefs);
};

exports.onCreateNode = async ({ actions, getCache, createNodeId, node }) => {
  let gatsbySourceFilesystem;

  try {
    gatsbySourceFilesystem = require('gatsby-source-filesystem');
  } catch (err) {
    gatsbySourceFilesystem = null;
  }

  if (gatsbySourceFilesystem) {
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
  }
};

exports.onPostBootstrap = async function ({ cache }) {
  cache.set('nacelle-timestamp', Date.now());
};
