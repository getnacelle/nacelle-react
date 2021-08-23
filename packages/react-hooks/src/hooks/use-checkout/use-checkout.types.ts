import React, { Dispatch, Reducer, ReducerState, ReducerAction } from 'react';
import { GraphQLError } from 'graphql';
import { Checkout, MetafieldInput } from '@nacelle/types';
import { CartItem, AnyObject } from '../common/types';
import {
  CLEAR_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR,
  SET_GET_CHECKOUT_SUCCESS,
  SET_PROCESS_CHECKOUT_SUCCESS,
  GET_CHECKOUT,
  PROCESS_CHECKOUT,
  SET_GET_CHECKOUT_DATA
} from './use-checkout.reducer';

/**
 * @param nacelleSpaceId: the target Nacelle Space ID (string)
 * @param nacelleGraphqlToken: the GraphQL token associated with the Nacelle Space (string)
 * @param nacelleEndpoint: the API endpoint used to send requests to Nacelle (string)
 */
export interface Credentials {
  nacelleSpaceId: string;
  nacelleGraphqlToken: string;
  nacelleEndpoint: string;
}

export interface GraphQLRequestParams {
  credentials: Credentials;
  query: string;
  variables: AnyObject;
}

export interface ProcessCheckoutResponse {
  data: {
    processCheckout: Checkout;
  };
  errors: GraphQLError[];
}

export interface GetCheckoutResponse {
  data: {
    getCheckout: {
      id: string;
      url: string;
      completed: boolean;
      source: string;
    };
  };
  errors: GraphQLError[];
}

export interface GetCheckoutInput {
  id: string;
  url: string;
}

export interface ProcessCheckoutInput {
  lineItems: CartItem[];
  checkoutId?: string;
  discountCodes?: string[];
  metafields?: MetafieldInput[];
  note?: string;
  source?: string;
}

export interface CheckoutProperties {
  checkoutComplete: boolean;
  checkoutId: string;
  checkoutSource: string;
  checkoutUrl: string;
}

export interface CheckoutState extends CheckoutProperties {
  processCheckoutSuccess: Promise<CheckoutProperties | GraphQLError | void>;
  processCheckoutError: GraphQLError | Error | null;
  getCheckoutSuccess: Promise<CheckoutProperties | void>;
}

export type GetCheckoutProperties = Pick<
  CheckoutState,
  'checkoutComplete' | 'checkoutSource' | 'getCheckoutSuccess'
>;

export type ProcessCheckoutProperties = Omit<
  CheckoutState,
  'getCheckoutSuccess'
>;

export interface GetCheckoutAction {
  type: typeof GET_CHECKOUT;
  credentials: Credentials;
  payload: GetCheckoutInput;
}

export interface ProcessCheckoutAction {
  type: typeof PROCESS_CHECKOUT;
  credentials: Credentials;
  payload: ProcessCheckoutInput;
  isCheckingOut: boolean;
  setIsCheckingOut: React.Dispatch<React.SetStateAction<boolean>>;
  isMounted: React.MutableRefObject<boolean>;
  redirectUserToCheckout: boolean;
}

export interface ClearCheckoutDataAction {
  type: typeof CLEAR_CHECKOUT_DATA;
  payload?: null;
}

export interface SetCheckoutErrorAction {
  type: typeof SET_PROCESS_CHECKOUT_ERROR;
  payload: GraphQLError | Error | null;
}

export interface SetGetCheckoutDataAction {
  type: typeof SET_GET_CHECKOUT_DATA;
  payload: GetCheckoutProperties;
}

export interface SetGetCheckoutSuccessAction {
  type: typeof SET_GET_CHECKOUT_SUCCESS;
  payload: Promise<CheckoutProperties>;
}

export interface SetProcessCheckoutDataAction {
  type: typeof SET_PROCESS_CHECKOUT_DATA;
  payload: ProcessCheckoutProperties;
}

export interface SetProcessCheckoutSuccessAction {
  type: typeof SET_PROCESS_CHECKOUT_SUCCESS;
  payload: Promise<CheckoutProperties>;
}

export type Actions =
  | ClearCheckoutDataAction
  | SetCheckoutErrorAction
  | SetGetCheckoutSuccessAction
  | SetGetCheckoutDataAction
  | SetProcessCheckoutDataAction
  | SetProcessCheckoutSuccessAction;

export type AsyncActions = GetCheckoutAction | ProcessCheckoutAction;

export type CheckoutReducerAction = Actions | AsyncActions;

export type CheckoutActions = {
  clearCheckoutData: () => void;
  getCheckout: (payload: GetCheckoutInput) => void;
  processCheckout: (payload: ProcessCheckoutInput) => void;
};

export type CheckoutDispatch = React.Dispatch<CheckoutReducerAction>;

export interface ActionHandlerParams {
  dispatch: CheckoutDispatch;
}

export type ActionHandler<R extends Reducer<any, any>, AsyncActions> = ({
  dispatch,
  getState,
  signal
}: {
  dispatch: Dispatch<ReducerAction<R>>;
  getState: () => ReducerState<R>;
  signal: AbortSignal;
}) => (action: AsyncActions) => Promise<void>;

export type AsyncActionHandler<AsyncActionType> = ActionHandler<
  Reducer<CheckoutState, Actions>,
  AsyncActionType
>;
