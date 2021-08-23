import { nacelleStorefrontRequest } from '../utils';
import { PROCESS_CHECKOUT_QUERY } from '../queries';
import {
  SET_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_ERROR,
  SET_PROCESS_CHECKOUT_SUCCESS
} from '../use-checkout.reducer';

import { CheckoutInput as NacelleCheckoutInput } from '@nacelle/types';
import {
  AsyncActionHandler,
  CheckoutProperties,
  ProcessCheckoutResponse,
  ProcessCheckoutAction
} from '../use-checkout.types';

const processCheckout: AsyncActionHandler<ProcessCheckoutAction> =
  ({ dispatch, getState }) =>
  async (action: ProcessCheckoutAction): Promise<void> => {
    if (typeof window === 'undefined') {
      // only run when window.fetch is available
      return;
    }

    if (action.isCheckingOut) {
      // while processing checkout, don't process checkout again
      return;
    }

    try {
      const checkoutState = getState();

      // clear out any errors from previous `processCheckout()`
      if (checkoutState.processCheckoutError) {
        dispatch({ type: SET_PROCESS_CHECKOUT_ERROR, payload: null });
      }

      const { lineItems, checkoutId, metafields, note, discountCodes, source } =
        action.payload;
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

      action.setIsCheckingOut(true);

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
          credentials: action.credentials,
          query: PROCESS_CHECKOUT_QUERY,
          variables: { input }
        }).then((res) => res.json());

      // if errors are returned by the API, handle them
      const hasErrors =
        typeof checkoutResult.errors !== 'undefined' &&
        Array.isArray(checkoutResult.errors) &&
        checkoutResult.errors.length;

      if (hasErrors) {
        const error = checkoutResult.errors[0];
        dispatch({
          type: SET_PROCESS_CHECKOUT_ERROR,
          payload: error
        });
        dispatch({
          type: SET_PROCESS_CHECKOUT_SUCCESS,
          payload: Promise.reject(error.message)
        });
        action.setIsCheckingOut(false);

        return;
      }

      if (checkoutResult.data?.processCheckout) {
        const { id, completed, url, source } =
          checkoutResult.data.processCheckout;

        if (url) {
          const parsedUrl = new URL(url);

          if (source && source === 'Shopify') {
            const discountCode =
              Array.isArray(discountCodes) && discountCodes[0];

            if (discountCode) {
              parsedUrl.searchParams.set('discount', discountCode);
            }
          }

          checkoutUrl = parsedUrl.toString();
        }

        const checkoutId = id;
        const checkoutComplete = completed;
        const checkoutSource = String(source);
        const checkoutSuccessPayload: CheckoutProperties = {
          checkoutComplete,
          checkoutId,
          checkoutSource,
          checkoutUrl
        };

        dispatch({
          type: SET_CHECKOUT_DATA,
          payload: {
            ...checkoutState,
            ...checkoutSuccessPayload,
            processCheckoutError: null,
            processCheckoutSuccess: Promise.resolve(checkoutSuccessPayload)
          }
        });
        action.setIsCheckingOut(false);
      } else {
        dispatch({
          type: SET_PROCESS_CHECKOUT_SUCCESS,
          payload: Promise.reject(
            'Checkout response did not incude `data.processCheckout`'
          )
        });
        action.setIsCheckingOut(false);

        return;
      }

      if (action.redirectUserToCheckout && action.isMounted && checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      action.setIsCheckingOut(false);
      dispatch({
        type: SET_PROCESS_CHECKOUT_ERROR,
        payload: err
      });
    }
  };

export default processCheckout;
