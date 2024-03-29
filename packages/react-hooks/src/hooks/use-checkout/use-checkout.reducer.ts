import { Reducer } from 'react';
import {
  clearCheckoutData,
  setGetCheckoutData,
  setGetCheckoutError,
  setProcessCheckoutData,
  setProcessCheckoutError
} from './actions';
import { cacheKeys, getCacheBoolean, getCacheString } from './utils';
import { Actions, CheckoutState } from './use-checkout.types';

export const initialState: CheckoutState = {
  completed: getCacheBoolean(cacheKeys.completed, false),
  id: getCacheString(cacheKeys.id),
  url: '',
  getCheckoutError: '',
  processCheckoutError: ''
};

export const CLEAR_CHECKOUT_DATA = 'checkout/clear-checkout-data';
export const SET_GET_CHECKOUT_DATA = 'checkout/set-get-checkout-data';
export const SET_GET_CHECKOUT_ERROR = 'checkout/set-get-checkout-error';
export const SET_PROCESS_CHECKOUT_ERROR = 'checkout/set-process-checkout-error';
export const SET_PROCESS_CHECKOUT_DATA = 'checkout/set-process-checkout-data';

const checkoutReducer: Reducer<CheckoutState, Actions> = (
  state: CheckoutState,
  action: Actions
) => {
  switch (action.type) {
    case CLEAR_CHECKOUT_DATA: {
      return clearCheckoutData();
    }

    case SET_GET_CHECKOUT_DATA: {
      return setGetCheckoutData(state, action);
    }

    case SET_GET_CHECKOUT_ERROR: {
      return setGetCheckoutError(state, action);
    }

    case SET_PROCESS_CHECKOUT_DATA: {
      return setProcessCheckoutData(state, action);
    }

    case SET_PROCESS_CHECKOUT_ERROR: {
      return setProcessCheckoutError(state, action);
    }

    default:
      throw new Error('invalid action sent to checkout reducer');
  }
};

export default checkoutReducer;
