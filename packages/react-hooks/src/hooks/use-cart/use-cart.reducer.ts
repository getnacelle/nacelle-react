import { NacelleShopProduct, CartItem } from '@nacelle/types';

import { CartState, CartReducerAction } from './use-cart.types';

export const ADD_TO_CART = 'cart/add-to-cart';
export const INCREMENT_ITEM = 'cart/increment-item';
export const DECREMENT_ITEM = 'cart/decrement-item';
export const REMOVE_FROM_CART = 'cart/remove-from-cart';
export const TOGGLE_CART = 'cart/toggle-visibility';
export const SET_CHECKOUT_STATUS = 'cart/set-status';
export const CLEAR_CART = 'cart/clear';

export const initialState: CartState = {
  cart: [],
  show: false,
  checkoutId: null,
  checkoutComplete: false,
  useLocalStorage: true
};

const cartReducer = (
  state: CartState,
  action: CartReducerAction
): CartState => {
  const setCacheItem = state.useLocalStorage
    ? window.localStorage.setItem.bind(localStorage)
    : () => {};

  switch (action.type) {
    case ADD_TO_CART: {
      const cart: CartItem[] = buildCart(state.cart, action.payload);

      setCacheItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    }
    case REMOVE_FROM_CART: {
      const payloadId =
        'variant' in action.payload
          ? action.payload.variant.id
          : action.payload.id;

      const cart: CartItem[] = state.cart.filter(
        (item) => item.id !== payloadId
      );

      setCacheItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    }
    case INCREMENT_ITEM: {
      const cart: CartItem[] = state.cart.map((item) => {
        const payloadId =
          'variant' in action.payload
            ? action.payload.variant.id
            : action.payload.id;

        if (item.id === payloadId) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      });

      setCacheItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    }
    case DECREMENT_ITEM: {
      const cart: CartItem[] = state.cart.map((item) => {
        const payloadId =
          'variant' in action.payload
            ? action.payload.variant.id
            : action.payload.id;

        if (item.id === payloadId) {
          return {
            ...item,
            quantity: item.quantity >= 1 ? item.quantity - 1 : item.quantity
          };
        }

        return item;
      });

      setCacheItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart
      };
    }
    case CLEAR_CART:
      if (state.useLocalStorage) window.localStorage.removeItem('cart');
      return {
        ...state,
        cart: []
      };
    case TOGGLE_CART:
      return {
        ...state,
        show: !state.show
      };
    case SET_CHECKOUT_STATUS: {
      return {
        ...state,
        checkoutId: action.payload.checkoutId,
        checkoutComplete: action.payload.checkoutComplete
      };
    }
    default:
      throw new Error('invalid action sent to cart reducer');
  }
};

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

/**
 * A utility function which will return true if the item is already in the cart
 *
 * @param cart the current cart state
 * @param payload a Shopify item
 *
 * @returns a boolean indiciating if the item is already in the cart
 */
export function isInCart(
  cart: CartItem[],
  payload: NacelleShopProduct
): boolean {
  return cart.findIndex((item) => item.id === payload.variant.id) > -1;
}

/**
 * A utility function to build the cart with a new added item
 *
 * @param cart the current cart state
 * @param payload a Shopify item
 *
 * @returns a cart object containing the new added product
 */
export function buildCart(
  cart: CartItem[],
  payload: NacelleShopProduct
): CartItem[] {
  return isInCart(cart, payload)
    ? cart.map((item) => {
        const payloadId =
          'variant' in payload ? payload.variant.id : payload.id;
        if (item.id !== payloadId) {
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      })
    : [...cart, { ...formatCartItem(payload) }];
}

export default cartReducer;
