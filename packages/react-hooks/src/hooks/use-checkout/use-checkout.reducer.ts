import { Reducer } from 'react';
import { clearCheckoutData } from './actions';

import { CheckoutState, CheckoutReducerAction } from './use-checkout.types';

export const initialState: CheckoutState = {
  checkoutComplete: false,
  checkoutId: '',
  checkoutUrl: '',
  checkoutSource: ''
};

export const CLEAR_CHECKOUT_DATA = 'checkout/clear-checkout-data';
export const GET_CHECKOUT = 'checkout/get-checkout';
export const PROCESS_CHECKOUT = 'checkout/process-checkout';
export const SET_CHECKOUT_DATA = 'checkout/set-checkout-data';
export const SET_CHECKOUT_COMPLETE = 'checkout/set-checkout-complete';
export const SET_CHECKOUT_ID = 'checkout/set-checkout-id';
export const SET_CHECKOUT_SOURCE = 'checkout/set-checkout-source';
export const SET_CHECKOUT_URL = 'checkout/set-checkout-url';

const checkoutReducer: Reducer<CheckoutState, CheckoutReducerAction> = (
  state: CheckoutState,
  action: CheckoutReducerAction
) => {
  switch (action.type) {
    case CLEAR_CHECKOUT_DATA: {
      return clearCheckoutData(state);
    }

    // case GET_CHECKOUT: {
    //   return getCheckout(state, action, credentials);
    // }

    default:
      throw new Error('invalid action sent to checkout reducer');
  }
};
// function createCheckoutReducer() {
//   };

//   return checkoutReducer;
// }

export default checkoutReducer;
