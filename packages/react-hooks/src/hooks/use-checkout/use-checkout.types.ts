import React from 'react';
import {
  CLEAR_CHECKOUT_DATA,
  SET_GET_CHECKOUT_DATA,
  SET_GET_CHECKOUT_ERROR,
  SET_PROCESS_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR
} from './use-checkout.reducer';
import { cacheKeys } from './utils';

export type CacheKey = typeof cacheKeys[keyof typeof cacheKeys];

export type IsCheckingOut = {
  isCheckingOut: boolean;
  setIsCheckingOut: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CheckoutProperties {
  completed: boolean;
  id: string;
  url: string;
}

export interface CheckoutState extends CheckoutProperties {
  getCheckoutError: string;
  processCheckoutError: string;
}

export interface ClearCheckoutDataAction {
  type: typeof CLEAR_CHECKOUT_DATA;
  payload?: null;
}

export interface SetGetCheckoutErrorAction {
  type: typeof SET_GET_CHECKOUT_ERROR;
  payload: string;
}

export interface SetGetCheckoutDataAction {
  type: typeof SET_GET_CHECKOUT_DATA;
  payload: Pick<CheckoutProperties, 'completed' | 'id' | 'url'>;
}

export interface SetProcessCheckoutDataAction {
  type: typeof SET_PROCESS_CHECKOUT_DATA;
  payload: Pick<CheckoutProperties, 'id' | 'url'>;
}

export interface SetProcessCheckoutErrorAction {
  type: typeof SET_PROCESS_CHECKOUT_ERROR;
  payload: string;
}

export type Actions =
  | ClearCheckoutDataAction
  | SetGetCheckoutDataAction
  | SetGetCheckoutErrorAction
  | SetProcessCheckoutDataAction
  | SetProcessCheckoutErrorAction;

export interface CheckoutActions {
  clearCheckoutData: () => void;
  getCheckout: CheckoutClientMethod;
  processCheckout: CheckoutClientMethod;
}

export type CheckoutClientMethod = (
  params: unknown
) => Promise<CheckoutProperties>;

export interface CheckoutClient {
  get: CheckoutClientMethod;
  process: CheckoutClientMethod;
}

export type CheckoutProviderProps = {
  children: JSX.Element | JSX.Element[];
  checkoutClient: CheckoutClient;
  redirectUserToCheckout?: boolean;
};

export type CheckoutContextValue = null | CheckoutState;
export type CheckoutActionContextValue = null | CheckoutActions;

// export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

// export type CheckoutProperties<CheckoutMethod extends (...args: any) => any> =
//   Exclude<Awaited<ReturnType<CheckoutMethod>>, void>;
