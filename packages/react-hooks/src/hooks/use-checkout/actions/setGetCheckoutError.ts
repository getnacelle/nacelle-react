import { setCacheItem } from '../utils';
import {
  CheckoutState,
  SetGetCheckoutErrorAction
} from '../use-checkout.types';

const setGetCheckoutError = (
  state: CheckoutState,
  action: SetGetCheckoutErrorAction
): CheckoutState => {
  setCacheItem('checkoutComplete', '');
  setCacheItem('checkoutId', '');
  setCacheItem('checkoutSource', '');
  setCacheItem('checkoutUrl', '');

  return {
    ...state,
    checkoutComplete: false,
    checkoutId: '',
    checkoutSource: '',
    checkoutUrl: '',
    getCheckoutError: action.payload
  };
};

export default setGetCheckoutError;
