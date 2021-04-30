import {
  CartState,
  CartReducerAction,
  AddToCartFunction,
  ClearCartFunction,
  DecrementItemFunction,
  IncrementItemFunction,
  RemoveFromCartFunction,
  ToggleCartFunction,
  UpdateItemFunction,
  IsInCartFunction
} from './use-cart.types';

import {
  addToCart as addToCartDefault,
  clearCart as clearCartDefault,
  decrementItem as decrementItemDefault,
  incrementItem as incrementItemDefault,
  removeFromCart as removeFromCartDefault,
  toggleCart as toggleCartDefault,
  updateItem as updateItemDefault
} from './actions';

export const ADD_TO_CART = 'cart/add-to-cart';
export const INCREMENT_ITEM = 'cart/increment-item';
export const DECREMENT_ITEM = 'cart/decrement-item';
export const UPDATE_ITEM = 'cart/update-item';
export const REMOVE_FROM_CART = 'cart/remove-from-cart';
export const TOGGLE_CART = 'cart/toggle-visibility';
export const SET_CHECKOUT_STATUS = 'cart/set-status';
export const CLEAR_CART = 'cart/clear';

export const initialState: CartState = {
  cart: [],
  show: false,
  useLocalStorage: true
};

export interface CreateCartReducerParams {
  addToCart?: AddToCartFunction;
  clearCart?: ClearCartFunction;
  decrementItem?: DecrementItemFunction;
  incrementItem?: IncrementItemFunction;
  removeFromCart?: RemoveFromCartFunction;
  toggleCart?: ToggleCartFunction;
  updateItem?: UpdateItemFunction;
  isInCart?: IsInCartFunction;
}

function createCartReducer({
  addToCart,
  clearCart,
  decrementItem,
  incrementItem,
  removeFromCart,
  toggleCart,
  updateItem,
  isInCart
}: CreateCartReducerParams = {}) {
  const cartReducer = (
    state: CartState,
    action: CartReducerAction
  ): CartState => {
    switch (action.type) {
      case ADD_TO_CART: {
        return addToCart
          ? addToCart(state, action)
          : addToCartDefault(state, action, { isInCart });
      }

      case UPDATE_ITEM: {
        return updateItem
          ? updateItem(state, action)
          : updateItemDefault(state, action);
      }

      case REMOVE_FROM_CART: {
        return removeFromCart
          ? removeFromCart(state, action)
          : removeFromCartDefault(state, action);
      }

      case INCREMENT_ITEM: {
        return incrementItem
          ? incrementItem(state, action)
          : incrementItemDefault(state, action);
      }

      case DECREMENT_ITEM: {
        return decrementItem
          ? decrementItem(state, action)
          : decrementItemDefault(state, action);
      }

      case CLEAR_CART:
        return clearCart ? clearCart(state) : clearCartDefault(state);

      case TOGGLE_CART: {
        return toggleCart
          ? toggleCart(state, action)
          : toggleCartDefault(state, action);
      }

      default:
        throw new Error('invalid action sent to cart reducer');
    }
  };

  return cartReducer;
}

export default createCartReducer;
