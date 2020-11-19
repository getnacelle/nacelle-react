const { nacelleClient } = require('../services');
const { getNacelleVariables, replaceKeys } = require('../utils');

module.exports = async function (gatsbyApi, pluginOptions, nodeConfig) {
  const { actions, createNodeId, createContentDigest } = gatsbyApi;
  const { createNode } = actions;

  const nacelleOptions = getNacelleVariables(pluginOptions);

  const {
    nacelleSpaceId,
    nacelleGraphqlToken,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken
  } = nacelleOptions;

  const client = nacelleClient({
    previewMode: true,
    nacelleSpaceId,
    nacelleGraphqlToken,
    contentfulPreviewSpaceId,
    contentfulPreviewApiToken
  });

  const contentData = await client.data
    .allContent()
    .then((
      content // Gatsby disallows `sys` and `fields` node keys, so change them
    ) => replaceKeys(content, { sys: 'meta', fields: 'contentFields' }))
    .catch((err) => {
      throw new Error(
        `Problem fetching content:\n\n${JSON.stringify(err, null, 2)}`
      );
    });

  contentData.forEach((entry) => {
    const nodeContent = JSON.stringify(entry);
    const nodeMeta = {
      id: createNodeId(`NacelleContent-${entry.cmsSyncSourceContentId}`),
      parent: null,
      children: [],
      internal: {
        type: `${nodeConfig.gatsbyTypePrefix}Content`,
        content: nodeContent,
        contentDigest: createContentDigest(entry)
      }
    };
    const node = Object.assign({}, entry, nodeMeta);
    createNode(node);
  });
};
