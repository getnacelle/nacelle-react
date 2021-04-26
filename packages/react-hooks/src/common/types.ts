import { Checkout } from '@nacelle/types';
import { CartItem, MetafieldInput } from '@nacelle/types';

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

interface CheckoutError {
  message: string;
  extensions: {
    variables: string;
    field: string;
    code: string;
  };
}
export interface CheckoutResponse {
  data: {
    processCheckout: Checkout;
  };
  errors: CheckoutError[];
}

export interface CheckoutInput {
  credentials: Credentials;
  lineItems: CartItem[];
  metafields?: MetafieldInput[];
  checkoutId?: string;
  note?: string;
  discountCodes?: string[];
  source?: string;
}
