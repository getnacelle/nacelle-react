const { nacelleClient } = require('../services');
const {
  replaceKey,
  cacheIsInvalid,
  hasBeenIndexedSinceLastBuild
} = require('../utils');

module.exports = async function (gatsbyApi, pluginOptions) {
  const { actions, createContentDigest, cache } = gatsbyApi;
  const { createNode, touchNode } = actions;

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

    // handle incremental builds
    const lastFetched = await cache.get('nacelle-timestamp');

    let newNodeCount = 0;

    formattedData.forEach((entry) => {
      if (
        hasBeenIndexedSinceLastBuild(entry, lastFetched) ||
        cacheIsInvalid(lastFetched, pluginOptions)
      ) {
        const nodeMeta = {
          id: `NacelleProduct-${entry.pimSyncSourceProductId}`,
          parent: null,
          children: [],
          internal: {
            type: 'NacelleProduct',
            contentDigest: createContentDigest(entry)
          }
        };

        const node = Object.assign({}, entry, nodeMeta);
        createNode(node);

        newNodeCount += 1;
      } else {
        touchNode({
          nodeId: `NacelleProduct-${entry.pimSyncSourceProductId}`
        });
      }
    });

    if (newNodeCount) {
      console.info(
        `[gatsby-source-nacelle] created ${newNodeCount} new product nodes`
      );
    } else {
      console.info(
        '[gatsby-source-nacelle] using cached product nodes from previous build'
      );
    }
  } catch (err) {
    throw new Error(`Problem sourcing Nacelle product nodes: ${err.message}`);
  }
};
