import { unsetCacheItem } from '../utils';
import { CheckoutState } from 'hooks/use-checkout/use-checkout.types';

const clearCheckoutData = (state: CheckoutState): CheckoutState => {
  unsetCacheItem('checkoutComplete');
  unsetCacheItem('checkoutId');
  unsetCacheItem('checkoutSource');
  unsetCacheItem('checkoutUrl');

  return {
    ...state,
    checkoutComplete: false,
    checkoutId: '',
    checkoutSource: '',
    checkoutUrl: '',
    getCheckoutError: null,
    processCheckoutError: null
  };
};

export default clearCheckoutData;
