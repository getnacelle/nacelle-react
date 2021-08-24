import {
  CheckoutState,
  SetGetCheckoutErrorAction
} from '../use-checkout.types';

const setGetCheckoutError = (
  state: CheckoutState,
  action: SetGetCheckoutErrorAction
): CheckoutState => {
  return {
    ...state,
    getCheckoutError: action.payload,
    getCheckoutSuccess: Promise.resolve(false)
  };
};

export default setGetCheckoutError;
