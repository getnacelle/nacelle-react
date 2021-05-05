import { CheckoutState } from 'hooks/use-checkout/use-checkout.types';

const clearCheckoutData = (state: CheckoutState): CheckoutState => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('checkoutComplete');
    window.localStorage.removeItem('checkoutId');
    window.localStorage.removeItem('checkoutSource');
    window.localStorage.removeItem('checkoutUrl');
  }

  return {
    ...state,
    checkoutComplete: false,
    checkoutId: null,
    checkoutSource: null,
    checkoutUrl: null
  };
};

export default clearCheckoutData;
