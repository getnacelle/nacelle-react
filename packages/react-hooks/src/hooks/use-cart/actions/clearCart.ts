import { CartState, ClearCartAction } from '~/hooks/use-cart/use-cart.types';
import { unsetCacheItem } from '../utils';

const clearCart: ClearCartFunction = (
  state: CartState,
  action: ClearCartAction
) => {
  if (action.useLocalStorage || action.useSessionStorage) {
    unsetCacheItem(
      action.useLocalStorage,
      action.useSessionStorage
    )(action.cacheKey || 'cart');
  }

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
