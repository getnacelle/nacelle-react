const NacelleClient = require('@nacelle/storefront-sdk').default;

module.exports = function nacelleClient({
  nacelleStorefrontToken = '',
  nacelleStorefrontEndpoint = '',
  locale = 'en-US'
}) {
  const clientSettings = {
    token: nacelleStorefrontToken || process.env.NACELLE_STOREFRONT_TOKEN,
    storefrontEndpoint:
      nacelleStorefrontEndpoint || process.env.NACELLE_STOREFRONT_ENDPOINT,
    locale
  };

  // Initialize the Nacelle Client
  const client = new NacelleClient(clientSettings);

  return client;
};
