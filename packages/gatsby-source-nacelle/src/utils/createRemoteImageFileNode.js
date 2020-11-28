const { createRemoteFileNode } = require('gatsby-source-filesystem');
const get = require('lodash.get');
const set = require('lodash.set');

function getNodeMedia(node, nodeMedia) {
  // given an object and a property (or array of properties to
  // access a nested property), return the value of that property
  if (Array.isArray(nodeMedia)) {
    return get(node, nodeMedia, null);
  }

  return node[nodeMedia];
}

function setNodeMedia(node, nodeMedia, fileNode, newField = 'remoteImage') {
  // given an object, a property (or array of properties to access
  // a nested property), and a file node, associate the '@link File'
  // field with the file node
  if (Array.isArray(nodeMedia)) {
    set(node, [...nodeMedia, newField], fileNode.id);
  } else {
    node[nodeMedia][newField] = fileNode.id;
  }

  return node;
}

async function createFileNode(
  node,
  nodeMedia,
  gatsbyActions,
  { isImage = () => true, imageProperties = ['src', 'url'] }
) {
  // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
  try {
    const nodeMediaEntry = getNodeMedia(node, nodeMedia);

    if (nodeMediaEntry) {
      const address = (Array.isArray(imageProperties)
        ? imageProperties
        : [imageProperties]
      ).map((property) => nodeMediaEntry[property])[0];

      if (isImage(nodeMediaEntry)) {
        const { createNode, getCache, createNodeId } = gatsbyActions;
        const fileNode = await createRemoteFileNode({
          url: address.startsWith('//') ? `https:${address}` : address,
          getCache,
          createNode,
          createNodeId,
          parentNodeId: node.id
        });

        if (fileNode) {
          // add a field `remoteImage` to the source plugin's node from the File node
          setNodeMedia(node, nodeMedia, fileNode);
        }
      }
    }
  } catch (err) {
    throw new Error(
      `Problem creating file node for remote image: ${err.message}`
    );
  }
}

/**
 * Create a local image file from a remote image file and
 * associate it with a node so that it can be used by Gatsby Image
 * @param {Object} node - A Gatsby node
 * @param {string|string[]} nodeMedia - Singular target property or array of properties representing a path to the target property
 * @param {Object[]} gatsbyActions - Functions provided by `onCreateNode`
 * @param {function} gatsbyActions[].createNode
 * @param {function} gatsbyActions[].getCache
 * @param {function} gatsbyActions[].createNodeId
 * @param {Object[]} options
 * @param {function} options[].isImage - Function used to determine if the target object at `nodeMedia` is an image
 * @param {string|string[]} options[].imageProperties - Property (or all possible properties) of the `nodeMedia` object containing the image url
 */
module.exports = async function (
  node,
  nodeMedia,
  gatsbyActions,
  { isImage, imageProperties } = {}
) {
  // create a FileNode in Gatsby that gatsby-transformer-sharp will create optimized images for
  try {
    const nodeMediaArray = Array.isArray(nodeMedia) ? nodeMedia : [nodeMedia];
    const options = { isImage, imageProperties };

    nodeMediaArray.forEach(async (media) => {
      if (Array.isArray(node[media])) {
        node.media.forEach(async (_media, idx) => {
          await createFileNode(node, [media, idx], gatsbyActions, options);
        });
      } else {
        await createFileNode(node, media, gatsbyActions, options);
      }
    });
  } catch (err) {
    throw new Error(
      `Problem creating file node for remote image: ${err.message}`
    );
  }
};
