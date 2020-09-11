require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelle_space_id: process.env.NACELLE_SPACE_ID,
        nacelle_graphql_token: process.env.NACELLE_GRAPHQL_TOKEN
      }
    }
  ]
};
