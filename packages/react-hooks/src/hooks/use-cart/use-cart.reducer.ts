import {
  CartState,
  CartReducerAction,
  ShopifyItem,
  CartItem
} from './use-cart.types';

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
  checkoutComplete: false
};

const cartReducer = (
  state: CartState,
  action: CartReducerAction
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      if (isInCart(state.cart, action.payload)) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            const payloadId =
              'variant' in action.payload
                ? action.payload.variant.id
                : action.payload.id;

            if (item.id !== payloadId) {
              return item;
            }

            return { ...item, quantity: item.quantity + 1 };
          })
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...formatCartItem(action.payload) }]
      };
    }
    case REMOVE_FROM_CART: {
      const payloadId =
        'variant' in action.payload
          ? action.payload.variant.id
          : action.payload.id;

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payloadId)
      };
    }

    case INCREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) => {
          const payloadId =
            'variant' in action.payload
              ? action.payload.variant.id
              : action.payload.id;

          if (item.id === payloadId) {
            return { ...item, quantity: item.quantity + 1 };
          }

          return item;
        })
      };
    case DECREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) => {
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
        })
      };
    case CLEAR_CART:
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
 * Formats a shopify item to allow easier interaction within the cart
 *
 * @param item a Shopify item object
 *
 * @returns a formatted cart item
 */
export function formatCartItem(item: ShopifyItem): CartItem {
  const { title, vendor, tags, handle, id: productId } = item;
  const { featuredMedia: image, ...variant } = item.variant;

  return {
    ...variant,
    title,
    vendor,
    tags,
    handle,
    productId,
    image,
    quantity: item.quantity > 0 ? item.quantity : 1
  };
}

/**
 * A utility function which will return true if the item is already in the cart
 *
 * @param cart the current cart state
 * @param payload a shopify item
 *
 * @returns a boolean indiciating if the item is already in the cart
 */
export function isInCart(cart: CartItem[], payload: ShopifyItem): boolean {
  return cart.findIndex((item) => item.id === payload.variant.id) > -1;
}

export default cartReducer;
