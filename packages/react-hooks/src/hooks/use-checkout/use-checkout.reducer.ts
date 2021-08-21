import { Reducer } from 'react';
import {
  clearCheckoutData,
  setCheckoutData,
  setCheckoutError,
  setCheckoutComplete,
  setCheckoutId,
  setCheckoutSource,
  setCheckoutUrl
} from './actions';
import { getCacheBoolean, getCacheString } from './utils';

import { CheckoutState, CheckoutReducerAction } from './use-checkout.types';

const isClient = typeof window !== 'undefined';
export const initialState: CheckoutState = {
  checkoutComplete: isClient ? getCacheBoolean('checkoutComplete') : false,
  checkoutId: isClient ? getCacheString('checkoutId') : '',
  checkoutUrl: isClient ? getCacheString('checkoutUrl') : '',
  checkoutSource: isClient ? getCacheString('checkoutSource') : '',
  checkoutError: null,
  checkoutSuccess: new Promise(() => {})
};

export const CLEAR_CHECKOUT_DATA = 'checkout/clear-checkout-data';
export const SET_CHECKOUT_COMPLETE = 'checkout/set-checkout-complete';
export const SET_CHECKOUT_DATA = 'checkout/set-checkout-data';
export const SET_CHECKOUT_ERROR = 'checkout/set-checkout-error';
export const SET_CHECKOUT_SUCCESS = 'checkout/set-checkout-success';
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

    case SET_CHECKOUT_ERROR: {
      return setCheckoutError(state, action);
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
