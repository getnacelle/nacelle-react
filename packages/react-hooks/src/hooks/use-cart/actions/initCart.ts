import { CartItem } from '../../common/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import { InitCartAction, CartState } from '~/hooks/use-cart/use-cart.types';

const initCart: InitCartFunction = (
  state: CartState,
  action: InitCartAction
) => {
  const cart: CartItem[] = [...action.payload];

  setCacheItem(action.storage)(action.cacheKey || 'cart', JSON.stringify(cart));

  return {
    ...state,
    cart
  };
};

export default initCart;

export type InitCartFunction = (
  state: CartState,
  action: InitCartAction
) => {
  cart: CartItem[];
  show: boolean;
};
