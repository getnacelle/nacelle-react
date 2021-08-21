import { CheckoutState, SetCheckoutErrorAction } from '../use-checkout.types';

const setCheckoutError = (
  state: CheckoutState,
  action: SetCheckoutErrorAction
): CheckoutState => {
  return {
    ...state,
    checkoutError: action.payload
  };
};

export default setCheckoutError;
