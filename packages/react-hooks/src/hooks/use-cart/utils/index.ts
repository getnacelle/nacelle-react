import { CartItem } from '../../common/types';
import {
  IsInCartFunction,
  LegacyCartItem,
  StorageTypes
} from '../use-cart.types';

/**
 * A utility function which will return true if the item is already in the cart
 *
 * @param cart the current cart state
 * @param payload a Shopify item
 *
 * @returns a boolean indiciating if the item is already in the cart
 */
export function isItemInCart(cart: CartItem[], payload: CartItem): boolean {
  return cart.findIndex((item) => item.variant.id === payload.variant?.id) > -1;
}

export interface BuildCartParams {
  cart: CartItem[];
  payload: CartItem;
  isInCart: IsInCartFunction;
}

/**
 * A utility function to build the cart with a new added item
 *
 * @param cart the current cart state
 * @param payload a Shopify item
 *
 * @returns a cart object containing the new added product
 */
export function buildCart({
  cart,
  payload,
  isInCart
}: BuildCartParams): CartItem[] {
  return isInCart(cart, payload)
    ? cart.map((item) => {
        const payloadId = payload.variant?.id;

        if (item.variant.id !== payloadId) {
          return item;
        }

        return { ...item, quantity: item.quantity + (payload.quantity || 1) };
      })
    : [...cart, { ...payload }];
}

export function setCacheItem(storage: StorageTypes | null) {
  if (storage === 'local') {
    return window.localStorage.setItem.bind(localStorage);
  } else if (storage === 'session') {
    return window.sessionStorage.setItem.bind(sessionStorage);
  }

  return () => {};
}

export function unsetCacheItem(storage: StorageTypes | null) {
  if (storage === 'local') {
    return window.localStorage.removeItem.bind(localStorage);
  } else if (storage === 'session') {
    return window.sessionStorage.removeItem.bind(sessionStorage);
  }

  return () => {};
}

export function convertLegacyCartItem(legacyItem: LegacyCartItem): CartItem {
  const {
    quantity,
    productId,
    image,
    availableForSale,
    createdAt,
    description,
    featuredMedia,
    globalHandle,
    handle,
    indexedAt,
    locale,
    media,
    metafields,
    pimSyncSource,
    pimSyncSourceDomain,
    pimSyncSourceLocale,
    pimSyncSourceProductId,
    priceRange,
    productType,
    tags,
    title,
    updatedAt,
    variants,
    vendor,
    compareAtPrice,
    compareAtPriceCurrency,
    id,
    price,
    priceCurrency,
    selectedOptions,
    sku,
    swatchSrc,
    weight,
    weightUnit
  } = legacyItem;

  return {
    quantity: Number.isInteger(quantity) ? (quantity as number) : 1,
    product: {
      availableForSale,
      createdAt,
      description,
      featuredMedia,
      globalHandle,
      handle,
      id: productId,
      indexedAt,
      locale,
      media,
      metafields,
      pimSyncSource,
      pimSyncSourceDomain,
      pimSyncSourceLocale,
      pimSyncSourceProductId,
      priceRange,
      productType,
      tags,
      title,
      updatedAt,
      variants,
      vendor
    },
    variant: {
      ...legacyItem.variant,
      compareAtPrice,
      compareAtPriceCurrency,
      featuredMedia: image,
      id,
      price,
      priceCurrency,
      selectedOptions,
      sku,
      swatchSrc,
      weight,
      weightUnit
    }
  };
}
