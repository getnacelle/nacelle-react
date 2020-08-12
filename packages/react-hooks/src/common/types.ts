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
    processCheckout: {
      id: string;
      completed: boolean;
      url: string;
      source: string;
    };
  };
}
