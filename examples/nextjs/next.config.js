module.exports = {
  env: {
    NACELLE_SPACE_ID: process.env.NACELLE_SPACE_ID,
    NACELLE_GRAPHQL_TOKEN: process.env.NACELLE_GRAPHQL_TOKEN
  },
  images: {
    domains: [
      'cdn.shopify.com',
      'cdn.contentful.com',
      'images.ctfassets.net',
      'cdn.sanity.io',
      'nacelle-assets.s3-us-west-2.amazonaws.com'
    ]
  }
};
