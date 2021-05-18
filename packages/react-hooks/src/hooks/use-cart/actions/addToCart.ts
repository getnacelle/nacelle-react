import { CartItem } from '../../common/types';

import { isItemInCart, setCacheItem } from '~/hooks/use-cart/utils';
import { AddToCartAction, CartState } from '~/hooks/use-cart/use-cart.types';

const addToCart: AddToCartFunction = (
  state: CartState,
  action: AddToCartAction
) => {
  const isInCart = action.isInCart || isItemInCart;
  const cart: CartItem[] = isInCart(state.cart, action.payload)
    ? state.cart.map((item) => {
        if (isInCart([item], action.payload)) {
          return {
            ...item,
            quantity: item.quantity + (action.payload.quantity || 1)
          };
        }

        return item;
      })
    : [...state.cart, { ...action.payload }];

  setCacheItem(action.storage)(action.cacheKey || 'cart', JSON.stringify(cart));

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
};
