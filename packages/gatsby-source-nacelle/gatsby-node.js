const {
  sourceNacelleNodes,
  sourceContentfulPreviewNodes
} = require('./src/source-nodes');
const { cmsPreviewEnabled } = require('./src/utils');
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

exports.createSchemaCustomization = ({ actions }) => {
  // create custom type definitions to maintain data shape
  // in both preview and production settings
  actions.createTypes(typeDefs);
};

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
exports.onCreateNode = async ({
  actions: { createNode },
  getCache,
  createNodeId,
  node
}) => {
  // because onCreateNode is called for all nodes, verify that you are only running this code on nodes created by your plugin
  if (node.internal.type === 'NacelleMedia') {
    console.log(`Nacelle Media!\n\n${JSON.stringify(node, null, 2)}`);
    // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
    const fileNode = await createRemoteFileNode({
      // the url of the remote image to generate a node for
      url: node.src,
      getCache,
      createNode,
      createNodeId,
      parentNodeId: node.id
    });

    if (fileNode) {
      // with schemaCustomization: add a field `remoteImage` to your source plugin's node from the File node
      node.remoteImage = fileNode.id;
    }
  }
};

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  // source data from Hail Frequency API & convert to Gatsby nodes
  await sourceNacelleNodes(gatsbyApi, pluginOptions);

  if (cmsPreviewEnabled(pluginOptions)) {
    // source content data from Contentful Preview API & convert to Gatsby nodes
    await sourceContentfulPreviewNodes(gatsbyApi, pluginOptions);
  }
};
