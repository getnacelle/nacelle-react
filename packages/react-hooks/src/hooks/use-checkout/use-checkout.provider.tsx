import React, { useState, useRef, useMemo, useContext, FC } from 'react';
import { useReducerAsync } from 'use-reducer-async';

import { getCheckout, processCheckout } from './handlers';
import {
  CheckoutActions,
  CheckoutState,
  Credentials,
  GetCheckoutInput,
  ProcessCheckoutInput
} from './use-checkout.types';

import checkoutReducer, {
  initialState,
  CLEAR_CHECKOUT_DATA,
  GET_CHECKOUT,
  PROCESS_CHECKOUT
} from './use-checkout.reducer';

export type CheckoutContextValue = null | CheckoutState;
export type CheckoutActionContextValue = null | CheckoutActions;

export type CheckoutProviderProps = {
  children: JSX.Element | JSX.Element[];
  credentials: Credentials;
};

const CheckoutDataContext = React.createContext<CheckoutContextValue>(
  initialState
);
const CheckoutActionContext = React.createContext<CheckoutActionContextValue>(
  null
);

const asyncActionHandlers = {
  [GET_CHECKOUT]: getCheckout,
  [PROCESS_CHECKOUT]: processCheckout
};

export const CheckoutProvider: FC<CheckoutProviderProps> = ({
  children,
  credentials
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isMounted = useRef(true);
  const [state, dispatch] = useReducerAsync(
    checkoutReducer,
    initialState,
    asyncActionHandlers
  );

  const checkoutActions = useMemo(
    () => ({
      clearCheckoutData: (): void => dispatch({ type: CLEAR_CHECKOUT_DATA }),
      getCheckout: (payload: GetCheckoutInput): void =>
        dispatch({ type: GET_CHECKOUT, payload, credentials }),
      processCheckout: (payload: ProcessCheckoutInput): void =>
        dispatch({
          type: PROCESS_CHECKOUT,
          payload,
          credentials,
          isMounted,
          isCheckingOut,
          setIsCheckingOut
        })
    }),
    [dispatch, credentials, isCheckingOut]
  );

  return (
    <CheckoutDataContext.Provider value={state}>
      <CheckoutActionContext.Provider value={checkoutActions}>
        {children}
      </CheckoutActionContext.Provider>
    </CheckoutDataContext.Provider>
  );
};

export function useCheckoutState(): CheckoutContextValue {
  const context = useContext(CheckoutDataContext);
  return context;
}

export function useCheckoutActions(): CheckoutActionContextValue {
  const context = useContext(CheckoutActionContext);
  return context;
}
