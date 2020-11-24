const { createRemoteFileNode } = require('gatsby-source-filesystem');

function getNodeMedia(node, nodeMedia) {
  if (Array.isArray(nodeMedia)) {
    return node[nodeMedia[0]][nodeMedia[1]];
  }

  return node[nodeMedia];
}

async function createFileNode(
  node,
  nodeMedia,
  createNode,
  getCache,
  createNodeId
) {
  // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
  try {
    const nodeMediaEntry = getNodeMedia(node, nodeMedia);

    if (nodeMediaEntry) {
      const { type, src } = nodeMediaEntry;

      if (type && type.startsWith('image')) {
        const fileNode = await createRemoteFileNode({
          url: src.startsWith('//') ? `https:${src}` : src,
          getCache,
          createNode,
          createNodeId,
          parentNodeId: node.id
        });

        if (fileNode) {
          // add a field `remoteImage` to the source plugin's node from the File node
          if (Array.isArray(nodeMedia)) {
            node[nodeMedia[0]][nodeMedia[1]]['remoteImage'] = fileNode.id;
          } else {
            node[nodeMedia]['remoteImage'] = fileNode.id;
          }
        }
      }
    }
  } catch (err) {
    throw new Error(
      `Problem creating file node for remote image: ${err.message}`
    );
  }
}

module.exports = async (
  node,
  nodeMedia,
  createNode,
  getCache,
  createNodeId
) => {
  // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
  try {
    const nodeMediaArray = Array.isArray(nodeMedia) ? nodeMedia : [nodeMedia];
    nodeMediaArray.forEach(async (media) => {
      if (Array.isArray(node[media])) {
        node.media.forEach(async (_media, idx) => {
          await createFileNode(
            node,
            [media, idx],
            createNode,
            getCache,
            createNodeId
          );
        });
      } else {
        await createFileNode(node, media, createNode, getCache, createNodeId);
      }
    });
  } catch (err) {
    throw new Error(
      `Problem creating file node for remote image: ${err.message}`
    );
  }
};
