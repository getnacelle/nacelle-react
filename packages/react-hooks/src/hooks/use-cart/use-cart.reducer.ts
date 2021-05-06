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

const cartReducer = (
  state: CartState,
  action: CartReducerAction
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      return action.addToCart
        ? action.addToCart(state, action)
        : addToCartDefault(state, action);
    }

    case UPDATE_ITEM: {
      return action.updateItem
        ? action.updateItem(state, action)
        : updateItemDefault(state, action);
    }

    case REMOVE_FROM_CART: {
      return action.removeFromCart
        ? action.removeFromCart(state, action)
        : removeFromCartDefault(state, action);
    }

    case INCREMENT_ITEM: {
      return action.incrementItem
        ? action.incrementItem(state, action)
        : incrementItemDefault(state, action);
    }

    case DECREMENT_ITEM: {
      return action.decrementItem
        ? action.decrementItem(state, action)
        : decrementItemDefault(state, action);
    }

    case CLEAR_CART:
      return action.clearCart
        ? action.clearCart(state)
        : clearCartDefault(state);

    case TOGGLE_CART: {
      return action.toggleCart
        ? action.toggleCart(state, action)
        : toggleCartDefault(state, action);
    }

    default:
      throw new Error('invalid action sent to cart reducer');
  }
};

export default cartReducer;
