const { nacelleClient } = require('../services');
const { cmsPreviewEnabled, replaceKey } = require('../utils');

module.exports = async function (gatsbyApi, pluginOptions) {
  const { actions, createNodeId, createContentDigest } = gatsbyApi;
  const { createNode } = actions;

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
    console.info('[gatsby-source-nacelle] fetching Content');
    const contentData = await client.data.allContent();

    // change name of reserved keys
    const formattedData = contentData.map((entry) => {
      entry.replaceKey = replaceKey;
      return entry
        .replaceKey(entry, 'id', 'remoteId')
        .replaceKey(entry, 'fields', 'remoteFields');
    });

    formattedData.forEach((entry) => {
      const nodeMeta = {
        id: createNodeId(`NacelleContent-${entry.cmsSyncSourceContentId}`),
        parent: null,
        children: [],
        internal: {
          type: 'NacelleContent',
          contentDigest: createContentDigest(entry)
        }
      };
      const node = Object.assign({}, entry, nodeMeta);
      createNode(node);
    });
  } catch (err) {
    throw new Error(
      `Problem sourcing content from Contentful Preview API: ${err.message}`
    );
  }
};
