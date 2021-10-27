import { cacheKeys, unsetCacheItem } from '../utils';
import { CheckoutState } from 'hooks/use-checkout/use-checkout.types';

const clearCheckoutData = (): CheckoutState => {
  unsetCacheItem(cacheKeys.completed);
  unsetCacheItem(cacheKeys.id);
  unsetCacheItem(cacheKeys.url);

  return {
    completed: false,
    id: '',
    url: '',
    getCheckoutError: '',
    processCheckoutError: ''
  };
};

export default clearCheckoutData;
