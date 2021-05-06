import { CartItem } from '../../common/types';

import { IsInCartFunction } from '../use-cart.types';

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
