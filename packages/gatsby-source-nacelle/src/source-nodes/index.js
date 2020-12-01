/**
 * Creates Gatsby nodes from Nacelle data
 * @param {Object} config - configuration object
 * @param {Object} config.gatsbyApi - object containing the `gatsbyApi` param from exports.sourceNodes
 * @param {Object} config.pluginOptions - object containing the `pluginOptions` param from exports.sourceNodes
 * @param {Object} config.data - the Nacelle data from which a Gatsby node will be created
 * @param {Object[]} keyMappings - an array of key mappings
 * @param {string} keyMappings[].oldKey - the property to be replaced
 * @param {string} keyMappings[].newKey - the property to replace with
 * @param {string} uniqueIdProperty - the unique property of the data used to create a node ID
 */
module.exports = async function ({
  gatsbyApi,
  pluginOptions,
  data,
  keyMappings = [
    { oldKey: 'id', newKey: 'remoteId' },
    { oldKey: 'fields', newKey: 'remoteFields' }
  ],
  uniqueIdProperty = 'remoteId'
}) {
  const {
    replaceKey,
    cacheIsInvalid,
    hasBeenIndexedSinceLastBuild
  } = require('../utils');

  const { actions, createContentDigest, cache } = gatsbyApi;
  const { createNode, touchNode } = actions;

  const dataSample = Array.isArray(data) ? data[0] : data;
  let dataType;

  if (dataSample.linklists) {
    dataType = 'space';
  } else if (dataSample.pimSyncSourceProductId) {
    dataType = 'product';
  } else if (dataSample.pimSyncSourceCollectionId) {
    dataType = 'collection';
  } else if (dataSample.cmsSyncSourceContentId) {
    dataType = 'content';
  }

  const dataTypeLower = dataType.toLowerCase();
  const dataTypeUpper =
    dataType.charAt(0).toUpperCase() + dataType.substring(1, dataType.length);

  try {
    console.info(`[gatsby-source-nacelle] fetching ${dataTypeLower}`);

    // handle incremental builds
    const lastFetched = await cache.get('nacelle-timestamp');

    let newNodeCount = 0;

    // format data for Gatsby by changing the names of reserved properties
    let formattedData;
    if (keyMappings) {
      formattedData = Array.isArray(data)
        ? data.map((entry) => replaceKey(entry, keyMappings))
        : replaceKey(data, keyMappings);
    } else {
      formattedData = data;
    }

    if (Array.isArray(formattedData)) {
      formattedData.forEach((entry) => {
        if (
          hasBeenIndexedSinceLastBuild(entry, lastFetched) ||
          cacheIsInvalid(lastFetched, pluginOptions)
        ) {
          const nodeMeta = {
            id: `Nacelle${dataTypeUpper}-${entry[uniqueIdProperty]}`,
            parent: null,
            children: [],
            internal: {
              type: `Nacelle${dataTypeUpper}`,
              contentDigest: createContentDigest(entry)
            }
          };

          const node = Object.assign({}, entry, nodeMeta);
          createNode(node);

          newNodeCount += 1;
        } else {
          touchNode({
            nodeId: `Nacelle${dataTypeUpper}-${entry[uniqueIdProperty]}`
          });
        }
      });
    } else if (Object.keys(formattedData).length) {
      // don't make an effort to cache single entries, such as Nacelle Space data
      const nodeMeta = {
        id: `Nacelle${dataTypeUpper}-${formattedData[uniqueIdProperty]}`,
        parent: null,
        children: [],
        internal: {
          type: `Nacelle${dataTypeUpper}`,
          contentDigest: createContentDigest(formattedData)
        }
      };

      const node = Object.assign({}, formattedData, nodeMeta);
      createNode(node);
    }

    if (Array.isArray(formattedData)) {
      if (newNodeCount) {
        console.info(
          `[gatsby-source-nacelle] created ${newNodeCount} new ${dataTypeLower} nodes`
        );
      } else {
        console.info(
          `[gatsby-source-nacelle] using cached ${dataTypeLower} nodes from previous build`
        );
      }
    }
  } catch (err) {
    throw new Error(
      `Problem sourcing Nacelle ${dataTypeLower} nodes: ${err.message}`
    );
  }
};
