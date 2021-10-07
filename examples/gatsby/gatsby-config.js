require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleSpaceId: process.env.GATSBY_NACELLE_SPACE_ID,
        nacelleGraphqlToken: process.env.GATSBY_NACELLE_GRAPHQL_TOKEN,
        nacelleEndpoint: process.env.GATSBY_NACELLE_ENDPOINT,
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
