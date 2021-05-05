import { Reducer } from 'react';
import {
  clearCheckoutData,
  setCheckoutData,
  setCheckoutComplete,
  setCheckoutId,
  setCheckoutSource,
  setCheckoutUrl
} from './actions';

import { CheckoutState, CheckoutReducerAction } from './use-checkout.types';

export const initialState: CheckoutState = {
  checkoutComplete: false,
  checkoutId: '',
  checkoutUrl: '',
  checkoutSource: ''
};

export const CLEAR_CHECKOUT_DATA = 'checkout/clear-checkout-data';
export const SET_CHECKOUT_COMPLETE = 'checkout/set-checkout-complete';
export const SET_CHECKOUT_DATA = 'checkout/set-checkout-data';
export const SET_CHECKOUT_ID = 'checkout/set-checkout-id';
export const SET_CHECKOUT_SOURCE = 'checkout/set-checkout-source';
export const SET_CHECKOUT_URL = 'checkout/set-checkout-url';

// note: GET_CHECKOUT and PROCESS_CHECKOUT are async actions which are
// handled separately, by the useReducerAsync hook, in ./use-checkout.provider.tsx
export const GET_CHECKOUT = 'checkout/get-checkout';
export const PROCESS_CHECKOUT = 'checkout/process-checkout';

const checkoutReducer: Reducer<CheckoutState, CheckoutReducerAction> = (
  state: CheckoutState,
  action: CheckoutReducerAction
) => {
  switch (action.type) {
    case CLEAR_CHECKOUT_DATA: {
      return clearCheckoutData(state);
    }

    case SET_CHECKOUT_COMPLETE: {
      return setCheckoutComplete(state, action);
    }

    case SET_CHECKOUT_DATA: {
      return setCheckoutData(state, action);
    }

    case SET_CHECKOUT_ID: {
      return setCheckoutId(state, action);
    }

    case SET_CHECKOUT_SOURCE: {
      return setCheckoutSource(state, action);
    }

    case SET_CHECKOUT_URL: {
      return setCheckoutUrl(state, action);
    }

    default:
      throw new Error('invalid action sent to checkout reducer');
  }
};

export default checkoutReducer;
