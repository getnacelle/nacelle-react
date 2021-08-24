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
    getCheckoutError: null,
    getCheckoutSuccess: Promise.resolve(true)
  };
};

export default setGetCheckoutData;
