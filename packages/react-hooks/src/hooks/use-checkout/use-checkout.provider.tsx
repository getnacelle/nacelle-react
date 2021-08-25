import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  FC,
  useCallback,
  useReducer
} from 'react';
import {
  getCheckout as getCheckoutRequest,
  processCheckout as processCheckoutRequest
} from './checkout-requests';
import { getCacheString, getCacheBoolean } from './utils';
import {
  CheckoutActions,
  CheckoutState,
  Credentials,
  GetCheckout,
  GraphQLError,
  ProcessCheckout
} from './use-checkout.types';

import checkoutReducer, {
  initialState,
  CLEAR_CHECKOUT_DATA,
  SET_GET_CHECKOUT_DATA,
  SET_GET_CHECKOUT_ERROR,
  SET_PROCESS_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR
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

export const CheckoutProvider: FC<CheckoutProviderProps> = ({
  children,
  credentials,
  redirectUserToCheckout = true
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isMounted = useRef(true);
  const hasFetchedCheckout = useRef(false);
  const setGetCheckoutError = (getCheckoutError: GraphQLError | null) =>
    dispatch({ type: SET_GET_CHECKOUT_ERROR, payload: getCheckoutError });
  const setProcessCheckoutError = (processCheckoutError: GraphQLError | null) =>
    dispatch({
      type: SET_PROCESS_CHECKOUT_ERROR,
      payload: processCheckoutError
    });

  // Set up the reducer
  const [checkoutState, dispatch] = useReducer(checkoutReducer, initialState);

  // Set up the `checkoutActions`
  const clearCheckoutData = () => dispatch({ type: CLEAR_CHECKOUT_DATA });

  const getCheckout: GetCheckout = useCallback(
    async ({ id, url }) => {
      const getCheckoutResponse = await getCheckoutRequest({
        credentials,
        id,
        url,
        getCheckoutError: checkoutState.getCheckoutError,
        setGetCheckoutError
      }).catch((err) => {
        throw new Error(err);
      });

      if (typeof getCheckoutResponse === 'object') {
        dispatch({
          type: SET_GET_CHECKOUT_DATA,
          payload: {
            checkoutComplete: getCheckoutResponse.checkoutComplete,
            checkoutSource: getCheckoutResponse.checkoutSource
          }
        });
        return getCheckoutResponse;
      }

      throw new Error(
        checkoutState.getCheckoutError?.message ||
          'Could not fetch checkout data with `getCheckout`'
      );
    },
    [checkoutState.getCheckoutError, credentials]
  );

  const processCheckout: ProcessCheckout = useCallback(
    async ({ lineItems, discountCodes, metafields, note }) => {
      const processCheckoutResponse = await processCheckoutRequest({
        credentials,
        lineItems,
        discountCodes,
        metafields,
        note,
        source: checkoutState.checkoutSource,
        checkoutId: checkoutState.checkoutId,
        isCheckingOut,
        setIsCheckingOut,
        processCheckoutError: checkoutState.processCheckoutError,
        setProcessCheckoutError
      }).catch((err) => {
        throw new Error(err);
      });

      if (typeof processCheckoutResponse === 'object') {
        dispatch({
          type: SET_PROCESS_CHECKOUT_DATA,
          payload: processCheckoutResponse
        });

        if (
          redirectUserToCheckout &&
          isMounted &&
          processCheckoutResponse.checkoutUrl
        ) {
          window.location.href = processCheckoutResponse.checkoutUrl;
        }

        return processCheckoutResponse;
      }

      throw new Error(
        checkoutState.processCheckoutError?.message ||
          'Could not process checkout via `processCheckout`'
      );
    },
    [
      checkoutState.checkoutId,
      checkoutState.checkoutSource,
      checkoutState.processCheckoutError,
      credentials,
      isCheckingOut,
      redirectUserToCheckout
    ]
  );

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

      getCheckout({ id, url }).catch((err) => console.warn(err));
    }
  }, [checkoutState, getCheckout, isCheckingOut]);

  return (
    <CheckoutDataContext.Provider value={checkoutState}>
      <CheckoutActionContext.Provider
        value={{ clearCheckoutData, getCheckout, processCheckout }}
      >
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
