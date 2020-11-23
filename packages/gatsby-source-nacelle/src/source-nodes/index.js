// Node sourcing utilities that can be called in the `exports.sourceNodes` of `gatsby-node.js`.
//
// New utilities should be functions with the parameters: (gatsbyApi, pluginOptions),
// where `gatsbyApi` and `pluginOptions` are the first two arguments of `exports.sourceNodes`

exports.sourceContentfulPreviewNodes = require('./contentful-preview');
exports.sourceNacelleNodes = require('./nacelle');
