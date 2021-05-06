import { setCacheItem } from '../utils';
import { CheckoutState, SetCheckoutUrlAction } from '../use-checkout.types';

const setCheckoutUrl = (
  state: CheckoutState,
  action: SetCheckoutUrlAction
): CheckoutState => {
  setCacheItem('checkoutUrl', action.payload);

  return {
    ...state,
    checkoutUrl: action.payload
  };
};

export default setCheckoutUrl;
