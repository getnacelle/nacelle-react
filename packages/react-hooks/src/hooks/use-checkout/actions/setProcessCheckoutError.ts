import {
  CheckoutState,
  SetProcessCheckoutErrorAction
} from '../use-checkout.types';

const setProcessCheckoutError = (
  state: CheckoutState,
  action: SetProcessCheckoutErrorAction
): CheckoutState => {
  return {
    ...state,
    processCheckoutError: action.payload,
    processCheckoutSuccess: Promise.resolve(false)
  };
};

export default setProcessCheckoutError;
