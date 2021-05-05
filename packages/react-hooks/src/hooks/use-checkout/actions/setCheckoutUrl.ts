import { CheckoutState, SetCheckoutUrlAction } from '../use-checkout.types';

const setCheckoutUrl = (
  state: CheckoutState,
  action: SetCheckoutUrlAction
): CheckoutState => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('checkoutUrl', action.payload);
  }

  return {
    ...state,
    checkoutUrl: action.payload
  };
};

export default setCheckoutUrl;
