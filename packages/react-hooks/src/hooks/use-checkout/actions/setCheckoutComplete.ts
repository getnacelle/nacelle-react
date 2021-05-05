import {
  CheckoutState,
  SetCheckoutCompleteAction
} from '../use-checkout.types';

const setCheckoutComplete = (
  state: CheckoutState,
  action: SetCheckoutCompleteAction
): CheckoutState => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('checkoutComplete', action.payload.toString());
  }

  return {
    ...state,
    checkoutComplete: action.payload
  };
};

export default setCheckoutComplete;
