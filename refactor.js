const {
  renameKeys,
  cacheIsInvalid,
  hasBeenIndexedSinceLastBuild
} = require('../utils');

const DEFAULT_KEY_MAPPINGS = { id: 'remoteId', fields: 'remoteFields' };
const UNIQUE_ID = 'remoteId';

async function createNacelleNodes({ gatsbyApi, data, pluginOptions, ...args }) {
  const dataType = determineInputDataType(args.data);
  if (dataType === 'unknown') {
    throw new Error('unrecognized data type for blah blah');
  }
  log(`fetching ${dataType}`);
  const nodeMap = {
    keyMappings: args.keyMappings || DEFAULT_KEY_MAPPINGS,
    uniqueId: args.uniqueIdProperty || UNIQUE_ID,
    output: { newNodes: [] },
    dataType: determineInputDataType(args.data),
    isSingleEntry: !Array.isArray(args.data) && Object.keys(args.data).length,
    lastFetched: await gatsbyApi.cache.get('nacelle-timestamp'),
    gatsbyApi,
    pluginOptions,
    data
  };
  try {
    const output = createNodes(nodeMap);
    logResult(output, nodeMap.dataType);
    return output;
  } catch (err) {
    log(`problem sourcing Nacelle ${dataTypeLower} nodes: ${err.message}`);
  }
}

function logResult(nodeOutput, dataType) {
  if (nodeOutput.newNodes.length) {
    log(`created ${nodeOutput.newNodes.length} new ${dataType} nodes`);
  } else {
    log(`using cached ${dataType} nodes from previous build`);
  }
}
function determineInputDataType(data) {
  const sample = Array.isArray(data) ? data[0] : data;
  switch (true) {
    case sample.linklists:
      return 'space';
    case sample.pimSyncSourceProductId:
      return 'product';
    case sample.pimSyncSourceCollectionId:
      return 'collection';
    case sample.cmsSyncSourceContentId:
      return 'content';
    default:
      return 'unknown';
  }
}

function capitalize(str) {
  const firstLetter = str[0].toUpperCase();
  const remaining = str.substring(1);
  return `${firstLetter}${remaining}`;
}

function createNodes(nodeMap) {
  if (nodeMap.isSingleEntry) {
    return processEntry(nodeMap, nodeMap.data);
  }
  return nodeMap.data.reduce(
    (outputMap, data) => processEntry(outputMap, data),
    nodeMap
  );
}

function processEntry(nodeMap, data) {
  const { lastFetched, dataType, uniqueId, isSingleEntry, gatsbyApi } = nodeMap;
  const { touchNode } = gatsbyApi.actions;
  const entry = renameKeys(data, nodeMap.keyMappings);
  const isIndexed = hasBeenIndexedSinceLastBuild(data, lastFetched);
  const invalidCache = cacheIsInvalid(lastFetched, nodeMap.pluginOptions);
  const shouldCreateNode = isIndexed || invalidCache;
  if (!isSingleEntry || !shouldCreateNode) {
    touchNode({
      nodeId: `Nacelle${capitalize(dataType)}-${entry[uniqueId]}`
    });
    return nodeMap;
  }
  const newNode = createNewNacelleNode(entry, dataType, uniqueId, gatsbyApi);
  return {
    ...nodeMap,
    output: { newNodes: [...nodeMap.output.newNodes, newNode] }
  };
}

function createNewNacelleNode(entry, dataType, idProperty, gatsbyApi) {
  const { createContentDigest, actions } = gatsbyApi;
  const dataTypeUpper = capitalize(dataType);
  const metadata = {
    id: `Nacelle${dataTypeUpper}-${data[idProperty]}`,
    parent: null,
    children: [],
    internal: {
      type: `Nacelle${dataTypeUpper}`,
      contentDigest: createContentDigest(data)
    }
  };
  const newNode = { ...entry, metadata };
  actions.createNode(newNode);
  return newNode;
}

function log(msg) {
  const prefix = '[gatsby-source-nacelle]';
  return `${prefix} ${msg}`;
}
