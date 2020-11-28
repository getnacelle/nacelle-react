const { nacelleClient } = require('../services');
const { replaceKey } = require('../utils');

module.exports = async function (gatsbyApi, pluginOptions) {
  const { actions, createNodeId, createContentDigest } = gatsbyApi;
  const { createNode } = actions;

  const { nacelleSpaceId, nacelleGraphqlToken } = pluginOptions;

  const client = nacelleClient({
    nacelleSpaceId,
    nacelleGraphqlToken
  });

  try {
    console.info('[gatsby-source-nacelle] fetching Nacelle space');
    const spaceData = await client.data.space();

    // change name of reserved keys
    const formattedData = replaceKey(spaceData, 'id', 'remoteId');

    const nodeMeta = {
      id: createNodeId(`NacelleSpace-${formattedData.remoteId}`),
      parent: null,
      children: [],
      internal: {
        type: 'NacelleSpace',
        contentDigest: createContentDigest(formattedData)
      }
    };

    const node = Object.assign({}, formattedData, nodeMeta);
    createNode(node);
  } catch (err) {
    throw new Error(`Problem sourcing Nacelle space node: ${err.message}`);
  }
};
