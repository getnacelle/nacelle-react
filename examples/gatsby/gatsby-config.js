require('dotenv').config();

const NacelleClient = require('@nacelle/client-js-sdk').default;

const client = new NacelleClient({
  useStatic: false,
  token: process.env.GATSBY_NACELLE_GRAPHQL_TOKEN,
  id: process.env.GATSBY_NACELLE_SPACE_ID,
  nacelleEndpoint: process.env.GATSBY_NACELLE_ENDPOINT
});

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleClient: client,
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
