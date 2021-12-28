const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public'
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
});
