import React from 'react';
import { Checkout } from '@nacelle/types';
import { MetafieldInput } from '@nacelle/types';
import { CartItem } from '../common/types';

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

export interface AnyObject {
  [key: string]: AnyObject | string | unknown;
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

export interface CheckoutState {
  checkoutComplete: boolean;
  checkoutId: string;
  checkoutSource: string;
  checkoutUrl: string;
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

export type SetCheckoutDataAction = {
  type: 'checkout/set-checkout-data';
  payload: CheckoutState;
};

export type CheckoutReducerAction =
  | ClearCheckoutDataAction
  | GetCheckoutAction
  | ProcessCheckoutAction
  | SetCheckoutDataAction
  | SetCheckoutCompleteAction
  | SetCheckoutIdAction
  | SetCheckoutSourceAction
  | SetCheckoutUrlAction;

export interface CheckoutActions {
  clearCheckoutData: () => void;
  getCheckout: (payload: GetCheckoutInput) => void;
  processCheckout: (payload: ProcessCheckoutInput) => void;
}

export type CheckoutDispatch = React.Dispatch<CheckoutReducerAction>;

export interface ActionHandlerParams {
  dispatch: CheckoutDispatch;
}

export type ActionHandler = ({
  dispatch
}: {
  dispatch: any;
}) => (action: any) => Promise<void>;
