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
  CheckoutClient,
  CheckoutActionContextValue,
  CheckoutContextValue,
  CheckoutProperties,
  CheckoutProviderProps
} from './use-checkout.types';

import checkoutReducer, {
  initialState,
  CLEAR_CHECKOUT_DATA,
  SET_GET_CHECKOUT_DATA,
  SET_GET_CHECKOUT_ERROR,
  SET_PROCESS_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR
} from './use-checkout.reducer';
import {
  cacheKeys,
  getCacheBoolean,
  getCacheString,
  setCacheItem
} from './utils';

const CheckoutClientContext = React.createContext<CheckoutClient>({
  get: () => Promise.resolve({ id: '', url: '', completed: false }),
  process: () => Promise.resolve({ id: '', url: '', completed: false })
});

const CheckoutDataContext =
  React.createContext<CheckoutContextValue>(initialState);
const CheckoutActionContext =
  React.createContext<CheckoutActionContextValue>(null);
const IsCheckingOutContext = React.createContext<boolean>(false);

export const CheckoutProvider: FC<CheckoutProviderProps> = ({
  children,
  checkoutClient,
  redirectUserToCheckout
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isMounted = useRef(true);
  const hasFetchedCheckout = useRef(false);

  // Set up the reducer
  const [checkoutState, dispatch] = useReducer(checkoutReducer, initialState);

  // Set up the `checkoutActions`
  const clearCheckoutData = () => dispatch({ type: CLEAR_CHECKOUT_DATA });

  const getCheckout = useCallback(
    (params: Parameters<typeof checkoutClient.get>[0]) => {
      return checkoutClient
        .get(params)
        .then((data: CheckoutProperties) => {
          dispatch({ type: SET_GET_CHECKOUT_DATA, payload: data });

          return data;
        })
        .catch((err: string) => {
          dispatch({ type: SET_GET_CHECKOUT_ERROR, payload: err });

          throw new Error(err);
        });
    },
    [checkoutClient]
  );

  const processCheckout = useCallback(
    (params: Parameters<typeof checkoutClient.process>[0]) => {
      setIsCheckingOut(true);
      return checkoutClient
        .process(params)
        .then((data) => {
          if (data.id && typeof data.id === 'string') {
            setCacheItem(cacheKeys.id, data.id);
          }

          dispatch({
            type: SET_PROCESS_CHECKOUT_DATA,
            payload: data
          });
          setIsCheckingOut(false);

          return data;
        })
        .catch((err: string) => {
          dispatch({
            type: SET_PROCESS_CHECKOUT_ERROR,
            payload: err
          });
          setIsCheckingOut(false);

          throw new Error(err);
        });
    },
    [checkoutClient]
  );

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
      checkoutState.completed || getCacheBoolean(cacheKeys.completed, false);
    const id = checkoutState.id || getCacheString(cacheKeys.id);
    const url = checkoutState.url || getCacheString(cacheKeys.url);

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

  useEffect(() => {
    if (typeof redirectUserToCheckout !== 'undefined') {
      console.warn(
        '[@nacelle/react-hooks|useCheckout] The `redirectUserToCheckout` prop is deprecated. ' +
          'Please handle the customer redirect to the checkout URL in your project code.'
      );
    }
  });

  return (
    <CheckoutClientContext.Provider value={checkoutClient}>
      <CheckoutDataContext.Provider value={checkoutState}>
        <CheckoutActionContext.Provider
          value={{ clearCheckoutData, getCheckout, processCheckout }}
        >
          <IsCheckingOutContext.Provider value={isCheckingOut}>
            {children}
          </IsCheckingOutContext.Provider>
        </CheckoutActionContext.Provider>
      </CheckoutDataContext.Provider>
    </CheckoutClientContext.Provider>
  );
};

export function useCheckoutClient() {
  return useContext(CheckoutClientContext);
}

export function useCheckoutState(): CheckoutContextValue {
  return useContext(CheckoutDataContext);
}

export function useCheckoutActions(): CheckoutActionContextValue {
  return useContext(CheckoutActionContext);
}

export function useIsCheckingOut(): boolean {
  return useContext(IsCheckingOutContext);
}
