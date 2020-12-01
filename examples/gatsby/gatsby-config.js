require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleSpaceId: process.env.NACELLE_SPACE_ID,
        nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
        cmsPreviewEnabled: process.env.NACELLE_PREVIEW_MODE,
        contentfulPreviewSpaceId: process.env.CONTENTFUL_PREVIEW_SPACE_ID,
        contentfulPreviewApiToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN,
        cacheDuration: 1000 * 60 * 60 * 24 // 1 day in ms
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-emotion',
    'gatsby-alias-imports'
  ]
};
