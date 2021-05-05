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

  if (typeof window !== 'undefined') {
    localStorage.setItem('checkoutComplete', checkoutComplete.toString());
    localStorage.setItem('checkoutId', checkoutId);
    localStorage.setItem('checkoutSource', checkoutSource);
    localStorage.setItem('checkoutUrl', checkoutUrl);
  }

  return {
    ...state,
    checkoutComplete,
    checkoutId,
    checkoutSource,
    checkoutUrl
  };
};

export default setCheckoutData;
