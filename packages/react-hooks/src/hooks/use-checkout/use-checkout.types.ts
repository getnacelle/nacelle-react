import React, { Dispatch, Reducer, ReducerState, ReducerAction } from 'react';
import { Checkout } from '@nacelle/types';
import { MetafieldInput } from '@nacelle/types';
import { CartItem, AnyObject } from '../common/types';

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

export interface CheckoutError {
  message: string;
  extensions: {
    variables: string;
    field: string;
    code: string;
  };
}

export interface ProcessCheckoutResponse {
  data: {
    processCheckout: Checkout;
  };
  errors: CheckoutError[];
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
  errors: CheckoutError[];
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
  checkoutSuccess: Promise<CheckoutProperties | void>;
  checkoutError: CheckoutError | null;
}

export type GetCheckoutAction = {
  type: 'checkout/get-checkout';
  credentials: Credentials;
  payload: GetCheckoutInput;
};

export type ProcessCheckoutAction = {
  type: 'checkout/process-checkout';
  credentials: Credentials;
  payload: ProcessCheckoutInput;
  isCheckingOut: boolean;
  setIsCheckingOut: React.Dispatch<React.SetStateAction<boolean>>;
  isMounted: React.MutableRefObject<boolean>;
};

export type ClearCheckoutDataAction = {
  type: 'checkout/clear-checkout-data';
  payload?: null;
};

export type SetCheckoutCompleteAction = {
  type: 'checkout/set-checkout-complete';
  payload: boolean;
};

export type SetCheckoutIdAction = {
  type: 'checkout/set-checkout-id';
  payload: string;
};

export type SetCheckoutSourceAction = {
  type: 'checkout/set-checkout-source';
  payload: string;
};

export type SetCheckoutUrlAction = {
  type: 'checkout/set-checkout-url';
  payload: string;
};

export type SetCheckoutErrorAction = {
  type: 'checkout/set-checkout-error';
  payload: CheckoutError | null;
};

export type SetCheckoutSuccessAction = {
  type: 'checkout/set-checkout-success';
  payload: Promise<CheckoutProperties>;
};

export type SetCheckoutDataAction = {
  type: 'checkout/set-checkout-data';
  payload: CheckoutState;
};

export type Actions =
  | ClearCheckoutDataAction
  | SetCheckoutCompleteAction
  | SetCheckoutDataAction
  | SetCheckoutErrorAction
  | SetCheckoutIdAction
  | SetCheckoutSourceAction
  | SetCheckoutSuccessAction
  | SetCheckoutUrlAction;

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
