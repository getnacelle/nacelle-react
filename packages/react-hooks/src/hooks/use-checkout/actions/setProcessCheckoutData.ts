import { setCacheItem } from '../utils';
import {
  CheckoutState,
  SetProcessCheckoutDataAction
} from '../use-checkout.types';

const setCheckoutData = (
  state: CheckoutState,
  action: SetProcessCheckoutDataAction
): CheckoutState => {
  const { checkoutComplete, checkoutId, checkoutSource, checkoutUrl } =
    action.payload;

  setCacheItem('checkoutComplete', checkoutComplete.toString());
  setCacheItem('checkoutId', checkoutId);
  setCacheItem('checkoutSource', checkoutSource);
  setCacheItem('checkoutUrl', checkoutUrl);

  return {
    ...state,
    checkoutComplete,
    checkoutId,
    checkoutSource,
    checkoutUrl,
    processCheckoutSuccess: Promise.resolve(true),
    processCheckoutError: null
  };
};

export default setCheckoutData;
