import NacelleShopifyPreviewConnector from '@nacelle/shopify-connector';

/**
 * Initialize the Shopify preview connector
 * @param {Object} config the configuration object
 * @param {string} config.myShopifyDomain example: cool-new-brand.myshopify.com
 * @param {string} config.shopifyStorefrontAccessToken token for the Shopify Storefront API
 */
export default function createShopifyClient({
  myShopifyDomain,
  shopifyStorefrontAccessToken
}) {
  if (!myShopifyDomain || !shopifyStorefrontAccessToken) {
    throw new Error(
      'Could not initialize Shopify client due to missing environment variables. ' +
        'Please ensure that the MYSHOPIFY_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN ' +
        "have been added to your `.env` or deployment's Environment Variables."
    );
  }

  return new NacelleShopifyPreviewConnector({
    shopifyDomain: myShopifyDomain,
    shopifyApiKey: shopifyStorefrontAccessToken
  });
}
