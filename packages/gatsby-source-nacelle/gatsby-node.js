const {
  sourceProductAndCollectionNodes,
  sourceContentNodes
} = require('./src/source-nodes');
const { createRemoteImageFileNode } = require('./src/utils');
const typeDefs = require('./src/type-defs');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    nacelleSpaceId: Joi.string()
      .required()
      .description(`Space ID from the Nacelle Dashboard`),
    nacelleGraphqlToken: Joi.string()
      .required()
      .description(`GraphQL Token from the Nacelle Dashboard`),
    contentfulPreviewSpaceId: Joi.string().description(
      `Space ID from Contentful Dashboard settings`
    ),
    contentfulPreviewApiToken: Joi.string().description(
      `Contentful Preview API token from Contentful Dashboard settings`
    ),
    cmsPreviewEnabled: Joi.boolean().description(
      `Toggle Contentful Preview on and off (IMPORTANT: requires that both 'contentfulPreviewSpaceId' and 'contentfulPreviewApiToken' are also set)`
    )
  });
};

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  // source products & collections from Nacelle's Hail Frequency API & convert to Gatsby nodes
  await sourceProductAndCollectionNodes(gatsbyApi, pluginOptions);

  // if Contentful preview is enabled, source content from Contentful Preview API,
  // otherwise source content from Nacelle's Hail Frequency API, then convert to Gatsby nodes
  await sourceContentNodes(gatsbyApi, pluginOptions);
};

exports.createSchemaCustomization = ({ actions }) => {
  // create custom type definitions to maintain data shape
  // in both preview and production settings
  actions.createTypes(typeDefs);
};

exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node
}) => {
  // because onCreateNode is called for all nodes, verify that you are only running this code on nodes created by your plugin
  const gatsbyActions = { createNode, getCache, createNodeId };
  const isImage = (nodeMediaEntry) =>
    nodeMediaEntry &&
    nodeMediaEntry.type &&
    nodeMediaEntry.type.startsWith('image');

  if (node.internal.type === 'NacelleProduct') {
    await createRemoteImageFileNode(
      node,
      ['featuredMedia', 'media'],
      gatsbyActions,
      { isImage }
    );
  }

  if (node.internal.type === 'NacelleCollection') {
    await createRemoteImageFileNode(node, 'featuredMedia', gatsbyActions, {
      isImage
    });
  }

  if (node.internal.type === 'NacelleContent') {
    await createRemoteImageFileNode(node, 'featuredMedia', gatsbyActions, {
      isImage
    });
  }
};
