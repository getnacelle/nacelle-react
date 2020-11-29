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
    console.info('[gatsby-source-nacelle] fetching collections');
    const collectionData = await client.data.allCollections();

    // change name of reserved keys
    const formattedData = collectionData.map((entry) =>
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
          id: `NacelleCollection-${entry.pimSyncSourceCollectionId}`,
          parent: null,
          children: [],
          internal: {
            type: 'NacelleCollection',
            contentDigest: createContentDigest(entry)
          }
        };

        const node = Object.assign({}, entry, nodeMeta);
        createNode(node);

        newNodeCount += 1;
      } else {
        touchNode({
          nodeId: `NacelleCollection-${entry.pimSyncSourceCollectionId}`
        });
      }
    });

    if (newNodeCount) {
      console.info(
        `[gatsby-source-nacelle] created ${newNodeCount} new collection nodes`
      );
    } else {
      console.info(
        '[gatsby-source-nacelle] using cached collection nodes from previous build'
      );
    }
  } catch (err) {
    throw new Error(
      `Problem sourcing Nacelle collection nodes: ${err.message}`
    );
  }
};
