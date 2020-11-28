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
    console.info('[gatsby-source-nacelle] fetching collections');
    const collectionData = await client.data.allCollections();

    // change name of reserved keys
    const formattedData = collectionData.map((entry) =>
      replaceKey(entry, 'id', 'remoteId')
    );

    formattedData.forEach((entry) => {
      const nodeMeta = {
        id: createNodeId(
          `NacelleCollection-${entry.pimSyncSourceCollectionId}`
        ),
        parent: null,
        children: [],
        internal: {
          type: 'NacelleCollection',
          contentDigest: createContentDigest(entry)
        }
      };
      const node = Object.assign({}, entry, nodeMeta);
      createNode(node);
    });
  } catch (err) {
    throw new Error(
      `Problem sourcing Nacelle collection nodes: ${err.message}`
    );
  }
};
