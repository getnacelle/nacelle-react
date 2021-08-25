import { setCacheItem } from '../utils';
import {
  CheckoutState,
  SetProcessCheckoutErrorAction
} from '../use-checkout.types';

const setProcessCheckoutError = (
  state: CheckoutState,
  action: SetProcessCheckoutErrorAction
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
    processCheckoutError: action.payload
  };
};

export default setProcessCheckoutError;
