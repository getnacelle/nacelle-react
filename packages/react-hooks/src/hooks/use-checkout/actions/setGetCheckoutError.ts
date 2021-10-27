import { cacheKeys, setCacheItem, unsetCacheItem } from '../utils';
import {
  CheckoutState,
  SetGetCheckoutErrorAction
} from '../use-checkout.types';

const setGetCheckoutError = (
  state: CheckoutState,
  action: SetGetCheckoutErrorAction
): CheckoutState => {
  setCacheItem(cacheKeys.completed, 'false');
  unsetCacheItem(cacheKeys.id);
  unsetCacheItem(cacheKeys.url);

  return {
    ...state,
    completed: false,
    id: '',
    url: '',
    getCheckoutError: action.payload
  };
};

export default setGetCheckoutError;
