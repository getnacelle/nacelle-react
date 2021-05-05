import { CheckoutState, SetCheckoutIdAction } from '../use-checkout.types';

const setCheckoutId = (
  state: CheckoutState,
  action: SetCheckoutIdAction
): CheckoutState => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('checkoutId', action.payload);
  }

  return {
    ...state,
    checkoutId: action.payload
  };
};

export default setCheckoutId;
