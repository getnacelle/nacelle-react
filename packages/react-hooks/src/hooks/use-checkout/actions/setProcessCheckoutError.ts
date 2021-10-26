import { cacheKeys, setCacheItem } from '../utils';
import {
  CheckoutState,
  SetProcessCheckoutErrorAction
} from '../use-checkout.types';

const setProcessCheckoutError = (
  state: CheckoutState,
  action: SetProcessCheckoutErrorAction
): CheckoutState => {
  setCacheItem(cacheKeys.completed, 'false');
  setCacheItem(cacheKeys.id, '');
  setCacheItem(cacheKeys.url, '');

  return {
    ...state,
    completed: false,
    id: '',
    url: '',
    processCheckoutError: action.payload
  };
};

export default setProcessCheckoutError;
