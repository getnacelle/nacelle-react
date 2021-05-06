import { CartItem } from '@nacelle/types';

import { buildCart, isItemInCart, setCacheItem } from '~/hooks/use-cart/utils';
import {
  AddToCartAction,
  CartState,
  IsInCartFunction
} from '~/hooks/use-cart/use-cart.types';

interface AddToCartOptions {
  isInCart?: IsInCartFunction;
}

const addToCart: AddToCartFunction = (
  state: CartState,
  action: AddToCartAction
) => {
  const cart: CartItem[] = buildCart({
    cart: state.cart,
    payload: action.payload,
    isInCart: action.isInCart || isItemInCart
  });

  setCacheItem(state.useLocalStorage)('cart', JSON.stringify(cart));

  return {
    ...state,
    cart
  };
};

export default addToCart;

export type AddToCartFunction = (
  state: CartState,
  action: AddToCartAction
) => {
  cart: CartItem[];
  show: boolean;
  useLocalStorage: boolean;
};
