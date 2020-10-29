import { Checkout } from '@nacelle/types';

/**
 * @param nacelleSpaceId: the target Nacelle Space ID (string)
 * @param nacelleGraphqlToken: the GraphQL token associated with the Nacelle Space (string)
 */
export interface Credentials {
  nacelleSpaceId: string;
  nacelleGraphqlToken: string;
}

export interface CheckoutResponse {
  data: {
    processCheckout: Checkout;
  };
}
