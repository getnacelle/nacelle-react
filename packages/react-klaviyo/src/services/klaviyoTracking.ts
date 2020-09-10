import {
  ShopifyItem,
  TrackEvent,
  IdentifyCustomer,
  KlaviyoTrackingItem,
  ItemVariant,
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

function decodeProductId(productId: string): string {
  return Buffer.from(productId, 'base64').toString('binary').split('/').pop();
}

function variantPriceComparisions(variants: ItemVariant[]): string {
  return variants
    .map((variant) => variant.compareAtPrice)
    .sort()
    .pop();
}

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
