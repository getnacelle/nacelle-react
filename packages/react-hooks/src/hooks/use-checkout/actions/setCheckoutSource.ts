import { CheckoutState, SetCheckoutSourceAction } from '../use-checkout.types';

const setCheckoutSource = (
  state: CheckoutState,
  action: SetCheckoutSourceAction
): CheckoutState => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('checkoutSource', action.payload);
  }

  return {
    ...state,
    checkoutSource: action.payload
  };
};

export default setCheckoutSource;
