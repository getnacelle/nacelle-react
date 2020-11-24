const { nacelleClient } = require('../services');
const { cmsPreviewEnabled } = require('../utils');

function replaceKeys(obj, oldKey, newKey) {
  delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey];
  return obj;
}

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
    const contentData = await client.data.allContent();

    // change name of reserved keys
    const formattedData = contentData.map((entry) => {
      entry = replaceKeys(entry, 'id', 'remoteId');
      entry = replaceKeys(entry, 'fields', 'remoteFields');
      return entry;
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
