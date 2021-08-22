import {
  CheckoutState,
  SetGetCheckoutSuccessAction
} from '../use-checkout.types';

const setGetCheckoutSuccess = (
  state: CheckoutState,
  action: SetGetCheckoutSuccessAction
): CheckoutState => {
  return {
    ...state,
    getCheckoutSuccess: action.payload
  };
};

export default setGetCheckoutSuccess;
