import { CheckoutState, SetCheckoutSuccessAction } from '../use-checkout.types';

const setCheckoutSuccess = (
  state: CheckoutState,
  action: SetCheckoutSuccessAction
): CheckoutState => {
  return {
    ...state,
    checkoutSuccess: action.payload
  };
};

export default setCheckoutSuccess;
