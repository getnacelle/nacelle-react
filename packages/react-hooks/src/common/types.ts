/**
 * @param nacelleSpaceId: the target Nacelle Space ID (string)
 * @param nacelleGraphqlToken: the GraphQL token associated with the Nacelle Space (string)
 */
export interface Credentials {
  nacelleSpaceId: string;
  nacelleGraphqlToken: string;
}

export interface Variant {
  [name: string]: {
    id: string;
    qty: number;
    metafields?: [object];
  };
}

export interface CartItem {
  cartItemId: string;
  variantId: string;
  quantity: number;
  metafields?: any[];
}

export interface CheckoutInput {
  cartItems: CartItem[];
  checkoutId?: string;
  discountCodes?: string[];
  source?: string;
}

export interface VariableInput {
  [name: string]: CheckoutInput | object;
}

export interface CheckoutResponse {
  data: {
    data: {
      processCheckout: {
        id: string;
        completed: boolean;
        url: string;
        source: string;
      };
    };
  };
  status: number;
  statusText: string;
  headers: {
    [name: string]: string;
  };
  config: {
    url: string;
    method: string;
    data: string;
    headers: {
      [name: string]: string;
    };
    transformRequest: unknown[];
    transformResponse: unknown[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
  };
  request?: unknown;
}
