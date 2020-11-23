// Node sourcing utilities that can be called in the `exports.sourceNodes` of `gatsby-node.js`.
//
// New utilities should be functions with the parameters: (gatsbyApi, pluginOptions),
// where `gatsbyApi` and `pluginOptions` are the first two arguments of `exports.sourceNodes`

exports.sourceContentNodes = require('./content');
exports.sourceProductAndCollectionNodes = require('./products-and-collections');
