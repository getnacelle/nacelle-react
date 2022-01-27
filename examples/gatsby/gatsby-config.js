require('dotenv').config();

const NacelleClient = require('@nacelle/storefront-sdk').default;

const client = new NacelleClient({
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  storefrontEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT
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
