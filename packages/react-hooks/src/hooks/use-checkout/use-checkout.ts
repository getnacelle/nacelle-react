import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckoutInput as NacelleCheckoutInput } from '@nacelle/types';

import {
  hailFrequencyRequest,
  getCacheBoolean,
  getCacheString
} from '~/hooks/use-checkout/utils';
import {
  GET_CHECKOUT_QUERY,
  PROCESS_CHECKOUT_QUERY
} from '~/hooks/use-checkout/queries';
import {
  CheckoutData,
  CheckoutInput,
  GetCheckoutResponse,
  ProcessCheckoutResponse
} from '~/hooks/use-checkout/use-checkout.types';

export interface CheckoutStatus {
  checkoutId: string;
  checkoutComplete: boolean;
  checkoutUrl: string;
}

export interface GetCheckoutParams {
  id: string;
  url: string;
}
export interface UseCheckoutFunctions {
  getCheckout: (GetCheckoutParams) => Promise<GetCheckoutResponse>;
  processCheckout: () => Promise<ProcessCheckoutResponse>;
}

type UseCheckoutResponse = [null | CheckoutData, UseCheckoutFunctions, boolean];

/**
 * @typedef CheckoutInput
 * @type {Object}
 * @property {Object} credentials - an object containing your nacelleEndpoint, nacelleSpaceId, and nacelleGraphqlToken
 * @property {Object[]} lineItems - an array of 'variant' objects containing an 'id' and 'quantity' (required), and optionally, an array of line item 'metafields'
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
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isMounted = useRef(true);
  const id = getCacheString('checkoutId');
  const url = getCacheString('checkoutUrl');
  const complete = getCacheBoolean('checkoutComplete') as boolean;

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

  const getCheckout = useCallback(
    async ({ id, url }: GetCheckoutParams) => {
      if (typeof window !== undefined) {
        if (id && url) {
          const response = await hailFrequencyRequest({
            credentials,
            query: GET_CHECKOUT_QUERY,
            variables: { id, url }
          });

          const checkoutResult: GetCheckoutResponse = await response.json();

          return checkoutResult;
        }
      }
    },
    [credentials]
  );

  const processCheckout = useCallback(async () => {
    const cartItems = lineItems.map((item, idx) => ({
      variantId: item.id,
      cartItemId: `${idx}::${item.id}`,
      quantity: item.quantity,
      metafields: item.metafields?.map((m) => ({ key: m.key, value: m.value }))
    }));

    if (isCheckingOut) {
      // while sending, don't send again
      return null;
    }

    setIsCheckingOut(true);

    const input: NacelleCheckoutInput = {
      cartItems,
      checkoutId: checkoutId || id,
      metafields,
      note,
      discountCodes,
      source
    };

    try {
      const response = await hailFrequencyRequest({
        credentials,
        query: PROCESS_CHECKOUT_QUERY,
        variables: { input }
      });

      const checkoutResult: ProcessCheckoutResponse = await response.json();

      if (checkoutResult?.data?.processCheckout) {
        const { processCheckout } = checkoutResult.data;

        setCheckoutData({
          checkoutId: processCheckout.id,
          checkoutComplete: processCheckout.completed,
          checkoutUrl: processCheckout.url,
          checkoutSource: processCheckout.source
        });

        window.localStorage.setItem(
          'checkoutComplete',
          processCheckout.completed.toString()
        );
        window.localStorage.setItem('checkoutId', processCheckout.id);
        window.localStorage.setItem('checkoutSource', processCheckout.source);
        window.localStorage.setItem('checkoutUrl', processCheckout.url);
      }

      if (checkoutResult?.errors) {
        throw new Error(
          `Checkout Errors:\n${JSON.stringify(checkoutResult.errors, null, 2)}`
        );
      }

      if (isMounted.current) {
        setIsCheckingOut(false); // only update if still mounted
      }

      if (checkoutResult?.data?.processCheckout?.url) {
        window.location.href = checkoutResult.data.processCheckout.url;
      }
    } catch (error) {
      throw new Error(error);
    }
  }, [
    lineItems,
    credentials,
    id,
    checkoutId,
    metafields,
    note,
    discountCodes,
    source,
    isCheckingOut
  ]);

  useEffect(() => {
    let checkoutComplete = complete;
    let checkoutSource = source || (getCacheString('checkoutSource') as string);

    if (!checkoutComplete && id && url && !isCheckingOut) {
      getCheckout({ id, url }).then((checkoutResult) => {
        if (!checkoutResult.errors && checkoutResult.data?.getCheckout) {
          checkoutComplete = checkoutResult.data.getCheckout.completed;
          checkoutSource = checkoutResult.data.getCheckout.source;

          localStorage.setItem('checkoutComplete', checkoutComplete.toString());
        }
      });
    }

    setCheckoutData({
      checkoutComplete,
      checkoutId: id,
      checkoutSource,
      checkoutUrl: url
    });
  }, [complete, id, url, source, getCheckout, isCheckingOut]);

  const clearCheckoutData = useCallback(() => {
    window.localStorage.removeItem('checkoutComplete');
    window.localStorage.removeItem('checkoutId');
    window.localStorage.removeItem('checkoutSource');
    window.localStorage.removeItem('checkoutUrl');

    setCheckoutData(null);
  }, []);

  const checkoutFunctions = { processCheckout, getCheckout, clearCheckoutData };

  return [checkoutData, checkoutFunctions, isCheckingOut];
};
