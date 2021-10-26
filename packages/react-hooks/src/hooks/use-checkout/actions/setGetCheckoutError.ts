import { cacheKeys, setCacheItem } from '../utils';
import {
  CheckoutState,
  SetGetCheckoutErrorAction
} from '../use-checkout.types';

const setGetCheckoutError = (
  state: CheckoutState,
  action: SetGetCheckoutErrorAction
): CheckoutState => {
  setCacheItem(cacheKeys.completed, 'false');
  setCacheItem(cacheKeys.id, '');
  setCacheItem(cacheKeys.url, '');

  return {
    ...state,
    completed: false,
    id: '',
    url: '',
    getCheckoutError: action.payload
  };
};

export default setGetCheckoutError;
