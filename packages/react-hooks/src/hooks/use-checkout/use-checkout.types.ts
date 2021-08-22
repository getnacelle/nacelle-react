import React, { Dispatch, Reducer, ReducerState, ReducerAction } from 'react';
import { GraphQLError } from 'graphql';
import { Checkout, MetafieldInput } from '@nacelle/types';
import { CartItem, AnyObject } from '../common/types';
import {
  CLEAR_CHECKOUT_DATA,
  SET_CHECKOUT_COMPLETE,
  SET_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR,
  SET_CHECKOUT_ID,
  SET_CHECKOUT_SOURCE,
  SET_CHECKOUT_URL,
  SET_GET_CHECKOUT_SUCCESS,
  SET_PROCESS_CHECKOUT_SUCCESS,
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
  getCheckoutSuccess: Promise<CheckoutProperties | void>;
  processCheckoutSuccess: Promise<CheckoutProperties | void>;
  processCheckoutError: GraphQLError | Error | null;
}

export type GetCheckoutAction = {
  type: typeof GET_CHECKOUT;
  credentials: Credentials;
  payload: GetCheckoutInput;
};

export type ProcessCheckoutAction = {
  type: typeof PROCESS_CHECKOUT;
  credentials: Credentials;
  payload: ProcessCheckoutInput;
  isCheckingOut: boolean;
  setIsCheckingOut: React.Dispatch<React.SetStateAction<boolean>>;
  isMounted: React.MutableRefObject<boolean>;
  redirectUserToCheckout: boolean;
};

export type ClearCheckoutDataAction = {
  type: typeof CLEAR_CHECKOUT_DATA;
  payload?: null;
};

export type SetCheckoutCompleteAction = {
  type: typeof SET_CHECKOUT_COMPLETE;
  payload: boolean;
};

export type SetCheckoutIdAction = {
  type: typeof SET_CHECKOUT_ID;
  payload: string;
};

export type SetCheckoutSourceAction = {
  type: typeof SET_CHECKOUT_SOURCE;
  payload: string;
};

export type SetCheckoutUrlAction = {
  type: typeof SET_CHECKOUT_URL;
  payload: string;
};

export type SetCheckoutErrorAction = {
  type: typeof SET_PROCESS_CHECKOUT_ERROR;
  payload: GraphQLError | Error | null;
};

export type SetCheckoutDataAction = {
  type: typeof SET_CHECKOUT_DATA;
  payload: CheckoutState;
};

export type SetGetCheckoutSuccessAction = {
  type: typeof SET_GET_CHECKOUT_SUCCESS;
  payload: Promise<CheckoutProperties>;
};

export type SetProcessCheckoutSuccessAction = {
  type: typeof SET_PROCESS_CHECKOUT_SUCCESS;
  payload: Promise<CheckoutProperties>;
};

export type Actions =
  | ClearCheckoutDataAction
  | SetCheckoutCompleteAction
  | SetCheckoutDataAction
  | SetCheckoutErrorAction
  | SetCheckoutIdAction
  | SetCheckoutSourceAction
  | SetCheckoutUrlAction
  | SetGetCheckoutSuccessAction
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
