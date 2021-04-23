import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckoutInput as NacelleCheckoutInput } from '@nacelle/types';

import { CheckoutInput, CheckoutResponse } from '~/common/types';

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

type UseCheckoutResponse = [
  null | CheckoutResponse,
  () => Promise<CheckoutResponse>,
  boolean
];

/**
 * @typedef CheckoutInput
 * @type {Object}
 * @property {Object} credentials - an object containing your nacelleEndpoint, nacelleSpaceId, and nacelleGraphqlToken
 * @property {Object[]} lineItems - an array of 'variant' objects containing an 'id' and a 'qty'
 * @property {string} checkoutId - an id string of a previously-created checkout to be continued
 * @property {Object} metafields - an array of key-value pairs of metadata
 * @property {string} note - a string representing the order note
 * @property {string[]} discountCodes - an array of strings representing the discount codes to be applied
 * @property {string} source - a string representing a URL which is attributed as the source of the checkout
 */

/**
 * @descr Fetch checkout data (url, id, etc.) from the Hail Frequency API
 * @param {CheckoutInput} params - an object containing `credentials` and `lineItems`, plus optional parameters `checkoutId`, `metafields`, `note`, 'discountCodes', and `source`
 *
 * @returns an array with checkout data [0], a checkout callback fn [1], and an isSending boolean [2]
 */
export const useCheckout = ({
  credentials,
  lineItems,
  checkoutId,
  metafields,
  note,
  discountCodes,
  source
}: CheckoutInput): UseCheckoutResponse => {
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

  useEffect(() => {
    const {
      nacelleEndpoint,
      nacelleSpaceId,
      nacelleGraphqlToken
    } = credentials;

    if (!nacelleEndpoint || !nacelleSpaceId || !nacelleGraphqlToken) {
      throw new Error(
        `'nacelleEndpoint', 'nacelleSpaceId', and 'nacelleGraphqlToken' ` +
          `are required in the 'credentials' provided to the useCheckout hook.`
      );
    }
  }, [credentials]);

  const checkout = useCallback(async () => {
    const cartItems = lineItems.map((item, idx) => ({
      variantId: item.id,
      cartItemId: `${idx}::${item.id}`,
      quantity: item.quantity,
      metafields: item.metafields
    }));

    if (isCheckingOut) {
      // while sending, don't send again
      return null;
    }

    setIsCheckingOut(true);

    const input: NacelleCheckoutInput = {
      cartItems,
      checkoutId,
      metafields,
      note,
      discountCodes,
      source
    };

    try {
      const response: Response = await fetch(credentials.nacelleEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Nacelle-Space-Id': credentials.nacelleSpaceId,
          'X-Nacelle-Space-Token': credentials.nacelleGraphqlToken
        },
        body: JSON.stringify({ query: CHECKOUT_QUERY, variables: { input } })
      });

      const checkoutResult: CheckoutResponse = await response.json();

      setCheckoutData(checkoutResult);

      if (checkoutResult.errors) {
        throw new Error(
          `Checkout Errors:\n${JSON.stringify(checkoutResult.errors)}`
        );
      }

      if (isMounted.current) {
        setIsCheckingOut(false); // only update if still mounted
      }

      return checkoutResult;
    } catch (error) {
      throw new Error(error);
    }
  }, [
    lineItems,
    credentials,
    checkoutId,
    metafields,
    note,
    discountCodes,
    source,
    isCheckingOut
  ]);

  return [checkoutData, checkout, isCheckingOut];
};
