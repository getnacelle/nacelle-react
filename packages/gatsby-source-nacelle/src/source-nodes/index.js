// Node sourcing utilities that can be called in the `exports.sourceNodes` of `gatsby-node.js`.
//
// New utilities should be functions with the parameters: (gatsbyApi, pluginOptions, config),
// where `gatsbyApi` and `pluginOptions` are the first two arguments of `exports.sourceNodes`
// in `gatsby-node.js`, and `config` is an optional configuration object.

exports.sourceContentfulPreviewNodes = require('./contentful-preview');
exports.sourceNacelleNodes = require('./nacelle');
