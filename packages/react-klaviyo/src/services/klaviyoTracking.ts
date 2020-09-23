import { ShopifyItem, Variant } from '@nacelle/react-dev-utils';

import {
  TrackEvent,
  IdentifyCustomer,
  KlaviyoTrackingItem,
  Customer
} from './klaviyoTracking.types';

declare global {
  interface Window {
    _learnq: {
      push: Function;
      account: Function;
      cookieDomain: Function;
      identify: Function;
      track: Function;
    };
  }
}

function trackEvent(...eventDetails: TrackEvent | IdentifyCustomer) {
  if (typeof window === 'undefined' || !window._learnq) {
    return null;
  }

  return window._learnq.push([...eventDetails]);
}

/**
 * Sends a tracking event to the Klaviyo event queue for the "Viewed Products"
 * event
 *
 * @param product the Shopify product object that has been viewed
 *
 * @returns null
 */
function viewedProduct(product: ShopifyItem): null | unknown {
  const item: KlaviyoTrackingItem = {
    Name: product.title,
    ProductID: decodeProductId(product.pimSyncSourceProductId),
    Categories: product.tags,
    ImageURL: product.featuredMedia.src,
    URL: `${window.location.origin}/products/${product.handle}`,
    Brand: product.vendor,
    Price: product.priceRange.max,
    CompareAtPrice: variantPriceComparisions(product.variants)
  };

  return trackEvent('track', 'Viewed Product', item);
}

/**
 * Decodes a base64 Shopify product id
 *
 * @param productId base64 encoded product id
 *
 * @returns the decoded product id
 */
function decodeProductId(productId: string): string {
  return Buffer.from(productId, 'base64').toString('binary').split('/').pop();
}

/**
 * Finds the highest variant price
 *
 * @param variants Shopify item variants
 *
 * @returns the highest variant price
 */
function variantPriceComparisions(variants: Variant[]): string {
  return variants
    .map((variant) => variant.compareAtPrice)
    .sort()
    .pop();
}

/**
 * Sends a tracking event to the Klaviyo event queue for the "Added to Cart"
 * event
 *
 * @param product the Shopify product object that has been added to the cart
 *
 * @returns null
 */
function addedToCart(product: ShopifyItem): null | unknown {
  const item = {
    Name: product.title,
    ProductID: product.variant.id,
    Categories: product.tags,
    ImageURL: product.variant.featuredMedia.src,
    URL: `${window.location.origin}/products/${product.handle}`,
    Brand: product.vendor,
    Price: product.variant.price,
    CompareAtPrice: product.variant.compareAtPrice
  };

  return trackEvent('track', 'Added to Cart', item);
}

/**
 * Sends an identify event to the Klaviyo event queue for the customer
 *
 * @param customer the current customer (requires email)
 *
 * @returns null
 */
function setCustomer(customer: Customer): null | unknown {
  if (!customer.email) {
    return null;
  }

  const trackCustomer = {
    $email: customer.email
  };

  return trackEvent('identify', trackCustomer);
}

export default {
  trackEvent,
  viewedProduct,
  addedToCart,
  setCustomer
};
