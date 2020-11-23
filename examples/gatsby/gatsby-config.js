require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleSpaceId: process.env.NACELLE_SPACE_ID,
        nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
        cmsPreviewEnabled: false,
        contentfulPreviewSpaceId: process.env.CONTENTFUL_PREVIEW_SPACE_ID,
        contentfulPreviewApiToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN
      }
    }
  ]
};
