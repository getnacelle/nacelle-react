import { setCacheItem } from '../utils';
import { CheckoutState, SetCheckoutDataAction } from '../use-checkout.types';

const setCheckoutData = (
  state: CheckoutState,
  action: SetCheckoutDataAction
): CheckoutState => {
  const {
    checkoutComplete,
    checkoutId,
    checkoutSource,
    checkoutUrl
  } = action.payload;

  setCacheItem('checkoutComplete', checkoutComplete.toString());
  setCacheItem('checkoutId', checkoutId);
  setCacheItem('checkoutSource', checkoutSource);
  setCacheItem('checkoutUrl', checkoutUrl);

  return {
    ...state,
    checkoutComplete,
    checkoutId,
    checkoutSource,
    checkoutUrl
  };
};

export default setCheckoutData;
