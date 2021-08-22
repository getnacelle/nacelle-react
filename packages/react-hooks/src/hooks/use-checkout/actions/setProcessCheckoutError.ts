import { CheckoutState, SetCheckoutErrorAction } from '../use-checkout.types';

const setProcessCheckoutError = (
  state: CheckoutState,
  action: SetCheckoutErrorAction
): CheckoutState => {
  return {
    ...state,
    processCheckoutError: action.payload
  };
};

export default setProcessCheckoutError;
