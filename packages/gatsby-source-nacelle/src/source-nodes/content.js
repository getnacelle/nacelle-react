const { nacelleClient } = require('../services');
const {
  cmsPreviewEnabled,
  replaceKey,
  cacheIsInvalid,
  hasBeenIndexedSinceLastBuild
} = require('../utils');

module.exports = async function (gatsbyApi, pluginOptions) {
  const { actions, createContentDigest, cache } = gatsbyApi;
  const { createNode, touchNode } = actions;

  const {
    nacelleSpaceId,
    nacelleGraphqlToken,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken
  } = pluginOptions;

  const client = nacelleClient({
    previewMode: cmsPreviewEnabled(pluginOptions),
    nacelleSpaceId,
    nacelleGraphqlToken,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken
  });

  try {
    console.info('[gatsby-source-nacelle] fetching content');
    const contentData = await client.data.allContent();

    // change name of reserved keys
    const formattedData = contentData.map((entry) => {
      entry.replaceKey = replaceKey;
      return entry
        .replaceKey(entry, 'id', 'remoteId')
        .replaceKey(entry, 'fields', 'remoteFields');
    });

    // handle incremental builds
    const lastFetched = await cache.get('nacelle-timestamp');

    let newNodeCount = 0;

    formattedData.forEach((entry) => {
      if (
        hasBeenIndexedSinceLastBuild(entry, lastFetched) ||
        cacheIsInvalid(lastFetched, pluginOptions)
      ) {
        const nodeMeta = {
          id: `NacelleContent-${entry.cmsSyncSourceContentId}`,
          parent: null,
          children: [],
          internal: {
            type: 'NacelleContent',
            contentDigest: createContentDigest(entry)
          }
        };

        const node = Object.assign({}, entry, nodeMeta);
        createNode(node);

        newNodeCount += 1;
      } else {
        touchNode({
          nodeId: `NacelleContent-${entry.cmsSyncSourceContentId}`
        });
      }
    });

    if (newNodeCount) {
      console.info(
        `[gatsby-source-nacelle] created ${newNodeCount} new content nodes`
      );
    } else {
      console.info(
        '[gatsby-source-nacelle] using cached content nodes from previous build'
      );
    }
  } catch (err) {
    throw new Error(`Problem sourcing Nacelle content nodes: ${err.message}`);
  }
};
