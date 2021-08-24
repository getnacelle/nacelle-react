import { setCacheItem } from '../utils';
import { CheckoutState, SetGetCheckoutDataAction } from '../use-checkout.types';

const setGetCheckoutData = (
  state: CheckoutState,
  action: SetGetCheckoutDataAction
): CheckoutState => {
  const { checkoutComplete, checkoutSource } = action.payload;
  setCacheItem('checkoutComplete', checkoutComplete.toString());
  setCacheItem('checkoutSource', checkoutSource);

  return {
    ...state,
    checkoutComplete,
    checkoutSource,
    getCheckoutSuccess: Promise.resolve(true),
    getCheckoutError: null
  };
};

export default setGetCheckoutData;
