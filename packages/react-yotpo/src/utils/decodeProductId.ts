/**
 * Decodes a base64 Shopify product id
 *
 * @param productId the base64 product id
 *
 * @returns the decoded product id; if there is an error decoding the product id
 * or there is no product id, the function will return null
 */
export default function decodeProductId(productId: string): string {
  if (!productId) {
    return null;
  }

  try {
    return Buffer.from(productId, 'base64').toString('ascii').split('/').pop();
  } catch (err) {
    console.error(`Could not decode productId: ${productId}`, err.message);
    return null;
  }
}
