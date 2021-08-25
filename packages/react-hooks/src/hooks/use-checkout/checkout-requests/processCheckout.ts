import { nacelleStorefrontRequest } from '../utils';
import { PROCESS_CHECKOUT_QUERY } from '../queries';

import { CheckoutInput as NacelleCheckoutInput } from '@nacelle/types';
import {
  GraphQLError,
  ProcessCheckoutRequestInput,
  ProcessCheckoutResponse
} from '../use-checkout.types';

export default async function processCheckout({
  lineItems,
  credentials,
  checkoutId,
  metafields,
  note,
  discountCodes,
  source,
  isCheckingOut,
  setIsCheckingOut,
  processCheckoutError,
  setProcessCheckoutError
}: ProcessCheckoutRequestInput) {
  if (typeof window === 'undefined') {
    // only run when window.fetch is available
    return;
  }

  if (isCheckingOut) {
    // while processing checkout, don't process checkout again
    return;
  }

  try {
    setIsCheckingOut(true);
    let error: GraphQLError | null = null;

    // clear out any errors from previous `processCheckout()`
    if (processCheckoutError) {
      setProcessCheckoutError(null);
    }

    let checkoutUrl = '';

    const cartItems = lineItems.map((item, idx) => ({
      variantId: item.variant.id,
      cartItemId: `${idx}::${item.variant.id}`,
      quantity: item.quantity,
      metafields: [
        ...(item.product.metafields || []),
        ...(item.variant.metafields || [])
      ].map((m) => ({ key: m.key, value: m.value }))
    }));

    const id = checkoutId || window.localStorage.getItem('checkoutId');

    const input: NacelleCheckoutInput = {
      cartItems,
      checkoutId: id,
      metafields,
      note,
      discountCodes,
      source
    };

    const checkoutResult: ProcessCheckoutResponse =
      await nacelleStorefrontRequest({
        credentials,
        query: PROCESS_CHECKOUT_QUERY,
        variables: { input }
      }).then((res) => res.json());

    // if errors are returned by the API, handle them
    const hasErrors =
      typeof checkoutResult.errors !== 'undefined' &&
      Array.isArray(checkoutResult.errors) &&
      checkoutResult.errors.length;

    if (hasErrors) {
      error = checkoutResult.errors[0];
      setIsCheckingOut(false);
      setProcessCheckoutError(error);

      throw new Error(error.message);
    }

    if (checkoutResult.data?.processCheckout) {
      const { id, completed, url, source } =
        checkoutResult.data.processCheckout;

      if (url) {
        const parsedUrl = new URL(url);

        if (source && source === 'Shopify') {
          const discountCode = Array.isArray(discountCodes) && discountCodes[0];

          if (discountCode) {
            parsedUrl.searchParams.set('discount', discountCode);
          }
        }

        checkoutUrl = parsedUrl.toString();
      }

      const checkoutComplete = completed;
      const checkoutId = id;
      const checkoutSource = String(source);

      setIsCheckingOut(false);

      return {
        checkoutComplete,
        checkoutId,
        checkoutSource,
        checkoutUrl
      };
    } else {
      throw new Error(
        'Checkout response did not incude `data.processCheckout`'
      );
    }
  } catch (err) {
    setIsCheckingOut(false);

    throw new Error(err);
  }
}
