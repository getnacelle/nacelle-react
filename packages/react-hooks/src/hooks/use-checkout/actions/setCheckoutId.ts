import { setCacheItem } from '../utils';
import { CheckoutState, SetCheckoutIdAction } from '../use-checkout.types';

const setCheckoutId = (
  state: CheckoutState,
  action: SetCheckoutIdAction
): CheckoutState => {
  setCacheItem('checkoutId', action.payload);

  return {
    ...state,
    checkoutId: action.payload
  };
};

export default setCheckoutId;
