import { CartState, ClearCartAction } from '~/hooks/use-cart/use-cart.types';
import { unsetCacheItem } from '../utils';

const clearCart: ClearCartFunction = (
  state: CartState,
  action: ClearCartAction
) => {
  unsetCacheItem(action.storage)(action.cacheKey || 'cart');

  return {
    ...state,
    cart: []
  };
};

export default clearCart;

export type ClearCartFunction = (
  state: CartState,
  action: ClearCartAction
) => {
  cart: any[];
  show: boolean;
};
