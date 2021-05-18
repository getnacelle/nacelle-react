import { CartItem } from '../../common/types';

import { isItemInCart, setCacheItem } from '~/hooks/use-cart/utils';
import {
  CartState,
  RemoveFromCartAction
} from '~/hooks/use-cart/use-cart.types';

const removeFromCart: RemoveFromCartFunction = (
  state: CartState,
  action: RemoveFromCartAction
) => {
  const isInCart = action.isInCart || isItemInCart;

  const cart: CartItem[] = state.cart.filter(
    (item) => !isInCart([item], action.payload)
  );

  setCacheItem(action.storage)(action.cacheKey || 'cart', JSON.stringify(cart));

  return {
    ...state,
    cart
  };
};

export default removeFromCart;

export type RemoveFromCartFunction = (
  state: CartState,
  action: RemoveFromCartAction
) => {
  cart: CartItem[];
  show: boolean;
};
