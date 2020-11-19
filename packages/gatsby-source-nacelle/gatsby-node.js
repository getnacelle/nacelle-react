const {
  sourceNacelleNodes,
  sourceContentfulPreviewNodes
} = require('./src/source-nodes');
const { getNacelleVariables } = require('./src/utils');

require('dotenv').config();

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const config = { nodePrefix: 'nacelle' };

  await sourceNacelleNodes(gatsbyApi, pluginOptions, config);

  if (getNacelleVariables(pluginOptions).cmsPreview) {
    await sourceContentfulPreviewNodes(gatsbyApi, pluginOptions, config);
  }
};
