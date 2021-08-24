import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useContext,
  FC,
  Reducer
} from 'react';
import { useReducerAsync, AsyncActionHandlers } from 'use-reducer-async';
import 'abort-controller/polyfill';

import {
  getCheckout as getCheckoutActionHandler,
  processCheckout as processCheckoutActionHandler
} from './async-handlers';
import { getCacheString, getCacheBoolean } from './utils';
import {
  Actions,
  AsyncActions,
  CheckoutActions,
  CheckoutState,
  Credentials
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
  redirectUserToCheckout: boolean;
};

const CheckoutDataContext =
  React.createContext<CheckoutContextValue>(initialState);
const CheckoutActionContext =
  React.createContext<CheckoutActionContextValue>(null);
const IsCheckingOutContext = React.createContext<boolean>(false);

const asyncActionHandlers: AsyncActionHandlers<
  Reducer<CheckoutState, Actions>,
  AsyncActions
> = {
  [GET_CHECKOUT]: getCheckoutActionHandler,
  [PROCESS_CHECKOUT]: processCheckoutActionHandler
};

export const CheckoutProvider: FC<CheckoutProviderProps> = ({
  children,
  credentials,
  redirectUserToCheckout = true
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isMounted = useRef(true);
  const hasFetchedCheckout = useRef(false);
  const [checkoutState, dispatch] = useReducerAsync(
    checkoutReducer,
    initialState,
    asyncActionHandlers
  );

  const checkoutActions = useMemo<CheckoutActions>(() => {
    const checkoutProperties = {
      checkoutComplete: checkoutState.checkoutComplete,
      checkoutId: checkoutState.checkoutId,
      checkoutSource: checkoutState.checkoutSource,
      checkoutUrl: checkoutState.checkoutUrl
    };

    return {
      clearCheckoutData: () => dispatch({ type: CLEAR_CHECKOUT_DATA }),
      getCheckout: async (payload) => {
        dispatch({ type: GET_CHECKOUT, payload, credentials });

        const success = await checkoutState.getCheckoutSuccess;

        if (success) {
          return checkoutProperties;
        }

        throw new Error(
          checkoutState.getCheckoutError?.message ||
            'Could not fetch checkout data with `getCheckout`'
        );
      },
      processCheckout: async (payload) => {
        dispatch({
          type: PROCESS_CHECKOUT,
          credentials,
          payload,
          isMounted,
          isCheckingOut,
          setIsCheckingOut,
          redirectUserToCheckout
        });

        const success = await checkoutState.processCheckoutSuccess;

        if (success) {
          return checkoutProperties;
        }

        throw new Error(
          checkoutState.processCheckoutError?.message ||
            'Could not process checkout via `processCheckout`'
        );
      }
    };
  }, [
    checkoutState.checkoutComplete,
    checkoutState.checkoutId,
    checkoutState.checkoutSource,
    checkoutState.checkoutUrl,
    checkoutState.getCheckoutError,
    checkoutState.getCheckoutSuccess,
    checkoutState.processCheckoutError,
    checkoutState.processCheckoutSuccess,
    credentials,
    dispatch,
    isCheckingOut,
    redirectUserToCheckout
  ]);

  // throw an error if credentials are missing
  useEffect(() => {
    const { nacelleEndpoint, nacelleSpaceId, nacelleGraphqlToken } =
      credentials;

    if (!nacelleEndpoint || !nacelleSpaceId || !nacelleGraphqlToken) {
      throw new Error(
        `'nacelleEndpoint', 'nacelleSpaceId', and 'nacelleGraphqlToken' ` +
          `are required in the 'credentials' provided to the useCheckout hook.`
      );
    }
  }, [credentials]);

  // Set isMounted to false when the component is unmounted
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    []
  );

  // Set the `checkoutState.checkoutComplete` value, if needed
  useEffect(() => {
    const complete =
      checkoutState.checkoutComplete || getCacheBoolean('checkoutComplete');
    const id = checkoutState.checkoutId || getCacheString('checkoutId');
    const url = checkoutState.checkoutUrl || getCacheString('checkoutUrl');

    if (
      id &&
      url &&
      !complete &&
      !isCheckingOut &&
      !hasFetchedCheckout.current
    ) {
      hasFetchedCheckout.current = true;
      checkoutActions.getCheckout({ id, url });
    }
  }, [checkoutActions, checkoutState, isCheckingOut]);

  return (
    <CheckoutDataContext.Provider value={checkoutState}>
      <CheckoutActionContext.Provider value={checkoutActions}>
        <IsCheckingOutContext.Provider value={isCheckingOut}>
          {children}
        </IsCheckingOutContext.Provider>
      </CheckoutActionContext.Provider>
    </CheckoutDataContext.Provider>
  );
};

export function useCheckoutState(): CheckoutContextValue {
  return useContext(CheckoutDataContext);
}

export function useCheckoutActions(): CheckoutActionContextValue {
  return useContext(CheckoutActionContext);
}

export function useIsCheckingOut(): boolean {
  return useContext(IsCheckingOutContext);
}
