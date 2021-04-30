import { CartItem } from '@nacelle/types';

import { setCacheItem, unsetCacheItem } from '~/hooks/use-cart/utils';
import { CartState, SetStatusAction } from '~/hooks/use-cart/use-cart.types';

const setCheckoutStatus: SetCheckoutStatusFunction = (
  state: CartState,
  action: SetStatusAction
) => {
  const { checkoutId, checkoutUrl, checkoutComplete } = action.payload;

  if (action.payload === null) {
    unsetCacheItem(state.useLocalStorage)('checkoutId');
    unsetCacheItem(state.useLocalStorage)('checkoutUrl');
    unsetCacheItem(state.useLocalStorage)('checkoutComplete');
  } else {
    setCacheItem(state.useLocalStorage)('checkoutId', checkoutId);
    setCacheItem(state.useLocalStorage)('checkoutUrl', checkoutUrl);
    setCacheItem(state.useLocalStorage)(
      'checkoutComplete',
      checkoutComplete.toString()
    );
  }

  return {
    ...state,
    checkoutId,
    checkoutComplete
  };
};

export default setCheckoutStatus;

export type SetCheckoutStatusFunction = (
  state: CartState,
  action: SetStatusAction
) => {
  checkoutId: string;
  checkoutComplete: boolean;
  cart: CartItem[];
  show: boolean;
  useLocalStorage: boolean;
};
