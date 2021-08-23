import { setCacheItem } from '../utils';
import { CheckoutState, SetGetCheckoutDataAction } from '../use-checkout.types';

const setGetCheckoutData = (
  state: CheckoutState,
  action: SetGetCheckoutDataAction
): CheckoutState => {
  const { checkoutComplete, checkoutSource, getCheckoutSuccess } =
    action.payload;
  setCacheItem('checkoutComplete', checkoutComplete.toString());
  setCacheItem('checkoutSource', checkoutSource);

  return {
    ...state,
    checkoutComplete,
    checkoutSource,
    getCheckoutSuccess
  };
};

export default setGetCheckoutData;
