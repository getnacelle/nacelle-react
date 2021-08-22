import {
  CheckoutState,
  SetProcessCheckoutSuccessAction
} from '../use-checkout.types';

const setProcessCheckoutSuccess = (
  state: CheckoutState,
  action: SetProcessCheckoutSuccessAction
): CheckoutState => {
  return {
    ...state,
    processCheckoutSuccess: action.payload
  };
};

export default setProcessCheckoutSuccess;
