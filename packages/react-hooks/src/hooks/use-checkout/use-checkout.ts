import { useState, useEffect, useRef, useCallback } from 'react';
import { CartItem } from '@nacelle/types';

import { Credentials, CheckoutResponse } from '../../common/types';

const CHECKOUT_QUERY = `
mutation sendCheckout($input: CheckoutInput) {
  processCheckout(input: $input) {
    id
    completed
    url
    source
  }
}
`;

/**
 * Fetch checkout data (url, id, etc.) from the Hail Frequency API
 *
 * @param credentials an object containing your nacelle_space_id and your nacelle_graphql_token
 * @param lineItems an array of 'variant' objects containing an 'id' and a 'qty'
 * @param checkoutId an id string of a previously checkout to be continued
 *
 * @returns an array with checkout data [0], a checkout callback fn [1], and an isSending boolean [2]
 */
export const useCheckout = (
  credentials: Credentials,
  lineItems: CartItem[],
  checkoutId?: string
): [null | CheckoutResponse, () => Promise<CheckoutResponse>, boolean] => {
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(
    null
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isMounted = useRef(true);

  useEffect(
    // Set isMounted to false when the component is unmounted
    () => () => {
      isMounted.current = false;
    },
    []
  );

  const cartItems = lineItems.map((item, idx) => ({
    variantId: item.id,
    cartItemId: `${idx}::${item.id}`,
    quantity: item.quantity,
    metafields: item.metafields
  }));

  const checkout = useCallback(async () => {
    if (isCheckingOut) {
      // while sending, don't send again
      return null;
    }

    setIsCheckingOut(true);

    const variables = {
      input: {
        cartItems,
        checkoutId
      }
    };

    try {
      const response: Response = await fetch(
        'https://hailfrequency.com/v2/graphql',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Nacelle-Space-Id': credentials.nacelleSpaceId,
            'X-Nacelle-Space-Token': credentials.nacelleGraphqlToken
          },
          body: JSON.stringify({ query: CHECKOUT_QUERY, variables })
        }
      );

      const checkoutResult: CheckoutResponse = await response.json();

      setCheckoutData(checkoutResult);

      if (isMounted.current) {
        setIsCheckingOut(false); // only update if still mounted
      }

      return checkoutResult;
    } catch (error) {
      throw new Error(error);
    }
  }, [cartItems, checkoutId, credentials, isCheckingOut]);

  return [checkoutData, checkout, isCheckingOut];
};
