import { setCacheItem } from '../utils';
import { CheckoutState, SetCheckoutSourceAction } from '../use-checkout.types';

const setCheckoutSource = (
  state: CheckoutState,
  action: SetCheckoutSourceAction
): CheckoutState => {
  setCacheItem('checkoutSource', action.payload);

  return {
    ...state,
    checkoutSource: action.payload
  };
};

export default setCheckoutSource;
