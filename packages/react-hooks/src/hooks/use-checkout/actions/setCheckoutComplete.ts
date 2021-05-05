import { setCacheItem } from '../utils';
import {
  CheckoutState,
  SetCheckoutCompleteAction
} from '../use-checkout.types';

const setCheckoutComplete = (
  state: CheckoutState,
  action: SetCheckoutCompleteAction
): CheckoutState => {
  setCacheItem('checkoutComplete', action.payload.toString());

  return {
    ...state,
    checkoutComplete: action.payload
  };
};

export default setCheckoutComplete;
