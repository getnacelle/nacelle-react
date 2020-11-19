const {
  sourceNacelleNodes,
  sourceContentfulPreviewNodes
} = require('./src/source-nodes');
const { cmsPreviewEnabled } = require('./src/utils');

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  // source data from Hail Frequency API & convert to Gatsby nodes
  await sourceNacelleNodes(gatsbyApi, pluginOptions);

  if (cmsPreviewEnabled(pluginOptions)) {
    // source content data from Contentful Preview API & convert to Gatsby nodes
    await sourceContentfulPreviewNodes(gatsbyApi, pluginOptions);
  }
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    nacelleSpaceId: Joi.string()
      .required()
      .description(`Space ID from the Nacelle Dashboard`),
    nacelleGraphqlToken: Joi.string()
      .required()
      .description(`GraphQL Token from the Nacelle Dashboard`),
    contentfulPreviewSpaceId: Joi.string().description(
      `Space ID from Contentful Dashboard settings`
    ),
    contentfulPreviewApiToken: Joi.string().description(
      `Contentful Preview API token from Contentful Dashboard settings`
    ),
    cmsPreviewEnabled: Joi.boolean().description(
      `Toggle Contentful Preview on and off (IMPORTANT: requires that both 'contentfulPreviewSpaceId' and 'contentfulPreviewApiToken' are also set)`
    )
  });
};
