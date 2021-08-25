import React from 'react';
import { Checkout, MetafieldInput } from '@nacelle/types';
import { CartItem, AnyObject } from '../common/types';
import {
  CLEAR_CHECKOUT_DATA,
  SET_GET_CHECKOUT_DATA,
  SET_GET_CHECKOUT_ERROR,
  SET_PROCESS_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR
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

export interface GetCheckoutRequestInput {
  credentials: Credentials;
  id: string;
  url: string;
  getCheckoutError: GraphQLError | null;
  setGetCheckoutError: (getCheckoutError: GraphQLError | null) => void;
}

export type GetCheckoutInput = Pick<GetCheckoutRequestInput, 'id' | 'url'>;

export interface ProcessCheckoutRequestInput {
  credentials: Credentials;
  lineItems: CartItem[];
  isCheckingOut: boolean;
  setIsCheckingOut: React.Dispatch<React.SetStateAction<boolean>>;
  processCheckoutError: GraphQLError | null;
  setProcessCheckoutError: (processCheckoutError: GraphQLError | null) => void;
  checkoutId?: string;
  discountCodes?: string[];
  metafields?: MetafieldInput[];
  source?: string;
  note?: string;
}

export type ProcessCheckoutInput = Pick<
  ProcessCheckoutRequestInput,
  'lineItems' | 'discountCodes' | 'metafields' | 'note'
>;

export interface CheckoutProperties {
  checkoutComplete: boolean;
  checkoutId: string;
  checkoutSource: string;
  checkoutUrl: string;
}

export interface CheckoutState extends CheckoutProperties {
  getCheckoutError: GraphQLError | null;
  processCheckoutError: GraphQLError | null;
}

export type GetCheckoutDataPayload = Pick<
  CheckoutState,
  'checkoutComplete' | 'checkoutSource'
>;

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

export type GetCheckout = (
  payload: GetCheckoutInput
) => Promise<CheckoutProperties>;

export type ProcessCheckout = (
  payload: ProcessCheckoutInput
) => Promise<CheckoutProperties>;

export interface CheckoutActions {
  clearCheckoutData: () => void;
  getCheckout: GetCheckout;
  processCheckout: ProcessCheckout;
}
