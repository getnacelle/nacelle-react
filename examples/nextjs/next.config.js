module.exports = {
  env: {
    NACELLE_SPACE_ID: process.env.NACELLE_SPACE_ID,
    NACELLE_GRAPHQL_TOKEN: process.env.NACELLE_GRAPHQL_TOKEN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    MYSHOPIFY_DOMAIN: process.env.MYSHOPIFY_DOMAIN,
    SERVERLESS_ENDPOINT: process.env.SERVERLESS_ENDPOINT
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
