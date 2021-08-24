import React, { Dispatch, Reducer, ReducerState, ReducerAction } from 'react';
import { Checkout, MetafieldInput } from '@nacelle/types';
import { CartItem, AnyObject } from '../common/types';
import {
  CLEAR_CHECKOUT_DATA,
  SET_GET_CHECKOUT_DATA,
  SET_GET_CHECKOUT_ERROR,
  SET_PROCESS_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR,
  GET_CHECKOUT,
  PROCESS_CHECKOUT
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

interface GraphQLErrorLocation {
  line: number;
  column: number;
}

interface GraphQLErrorExtension {
  [key: string]:
    | GraphQLErrorExtension
    | GraphQLErrorExtension[]
    | string
    | string[];
}

export interface GraphQLError {
  message: string;
  locations?: GraphQLErrorLocation[];
  path?: string[];
  extensions?: GraphQLErrorExtension[];
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
  getCheckoutError: GraphQLError | null;
  getCheckoutSuccess: Promise<boolean> | null;
  processCheckoutError: GraphQLError | null;
  processCheckoutSuccess: Promise<boolean> | null;
}

export type GetCheckoutProperties = Pick<
  CheckoutState,
  | 'checkoutComplete'
  | 'checkoutSource'
  | 'getCheckoutError'
  | 'getCheckoutSuccess'
>;

export type GetCheckoutDataPayload = Pick<
  GetCheckoutProperties,
  'checkoutComplete' | 'checkoutSource'
>;

export type ProcessCheckoutProperties = Pick<
  CheckoutState,
  | 'checkoutComplete'
  | 'checkoutId'
  | 'checkoutSource'
  | 'checkoutUrl'
  | 'processCheckoutError'
  | 'processCheckoutSuccess'
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

export interface SetGetCheckoutDataAction {
  type: typeof SET_GET_CHECKOUT_DATA;
  payload: GetCheckoutDataPayload;
}

export interface SetGetCheckoutErrorAction {
  type: typeof SET_GET_CHECKOUT_ERROR;
  payload: GraphQLError | null;
}

export interface SetProcessCheckoutDataAction {
  type: typeof SET_PROCESS_CHECKOUT_DATA;
  payload: CheckoutProperties;
}

export interface SetProcessCheckoutErrorAction {
  type: typeof SET_PROCESS_CHECKOUT_ERROR;
  payload: GraphQLError | null;
}

export type Actions =
  | ClearCheckoutDataAction
  | SetGetCheckoutDataAction
  | SetGetCheckoutErrorAction
  | SetProcessCheckoutDataAction
  | SetProcessCheckoutErrorAction;

export type AsyncActions = GetCheckoutAction | ProcessCheckoutAction;

export type CheckoutReducerAction = Actions | AsyncActions;

export interface CheckoutActions {
  clearCheckoutData: () => void;
  getCheckout: (
    payload: GetCheckoutInput
  ) => Promise<CheckoutProperties | GraphQLError>;
  processCheckout: (
    payload: ProcessCheckoutInput
  ) => Promise<CheckoutProperties | GraphQLError>;
}

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
