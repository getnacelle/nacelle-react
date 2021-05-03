import { CartItem, NacelleShopProduct } from '@nacelle/types';

import { IsInCartFunction } from '../use-cart.types';

/**
 * A utility function which will return true if the item is already in the cart
 *
 * @param cart the current cart state
 * @param payload a Shopify item
 *
 * @returns a boolean indiciating if the item is already in the cart
 */
export function isItemInCart(
  cart: CartItem[],
  payload: NacelleShopProduct
): boolean {
  return cart.findIndex((item) => item.id === payload.variant.id) > -1;
}

export interface BuildCartParams {
  cart: CartItem[];
  payload: NacelleShopProduct;
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
        const payloadId =
          'variant' in payload ? payload.variant.id : payload.id;

        if (item.id !== payloadId) {
          return item;
        }

        return { ...item, quantity: item.quantity + (payload.quantity || 1) };
      })
    : [...cart, { ...formatCartItem(payload) }];
}

export function setCacheItem(useLocalStorage: boolean) {
  return useLocalStorage
    ? window.localStorage.setItem.bind(localStorage)
    : () => {};
}

export function unsetCacheItem(useLocalStorage: boolean) {
  return useLocalStorage
    ? window.localStorage.removeItem.bind(localStorage)
    : () => {};
}

/**
 * Formats a Shopify item to allow easier interaction within the cart
 *
 * @param item a Shopify item object
 *
 * @returns a formatted cart item
 */
export function formatCartItem(item: NacelleShopProduct): CartItem {
  const { title, vendor, tags, handle, locale, id: productId } = item;
  const { featuredMedia: image, ...variant } = item.variant;

  return {
    ...variant,
    title,
    vendor,
    tags,
    handle,
    productId,
    image,
    locale,
    quantity: item.quantity > 0 ? item.quantity : 1,
    metafields: [...item.metafields, ...variant.metafields]
  };
}
