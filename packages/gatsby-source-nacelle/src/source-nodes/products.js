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
    console.info('[gatsby-source-nacelle] fetching products');
    const productData = await client.data.allProducts();

    // change name of reserved keys
    const formattedData = productData.map((entry) =>
      replaceKey(entry, 'id', 'remoteId')
    );

    formattedData.forEach((entry) => {
      const nodeMeta = {
        id: createNodeId(`NacelleProduct-${entry.pimSyncSourceProductId}`),
        parent: null,
        children: [],
        internal: {
          type: 'NacelleProduct',
          contentDigest: createContentDigest(entry)
        }
      };
      const node = Object.assign({}, entry, nodeMeta);
      createNode(node);
    });
  } catch (err) {
    throw new Error(`Problem sourcing Nacelle product nodes: ${err.message}`);
  }
};
