import { hailFrequencyRequest } from '../utils';
import { PROCESS_CHECKOUT_QUERY } from '../queries';
import { SET_CHECKOUT_DATA } from '../use-checkout.reducer';

import { CheckoutInput as NacelleCheckoutInput } from '@nacelle/types';
import {
  ActionHandler,
  ProcessCheckoutResponse,
  ProcessCheckoutAction
} from 'hooks/use-checkout/use-checkout.types';

const processCheckout: ActionHandler = ({ dispatch }) => async (
  action: ProcessCheckoutAction
): Promise<void> => {
  if (typeof window !== 'undefined') {
    const {
      lineItems,
      checkoutId,
      metafields,
      note,
      discountCodes,
      source
    } = action.payload;

    const cartItems = lineItems.map((item, idx) => ({
      variantId: item.id,
      cartItemId: `${idx}::${item.id}`,
      quantity: item.quantity,
      metafields: item.metafields?.map((m) => ({ key: m.key, value: m.value }))
    }));

    if (action.isCheckingOut) {
      // while processing checkout, don't process checkout again
      return null;
    }

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

    const response = await hailFrequencyRequest({
      credentials: action.credentials,
      query: PROCESS_CHECKOUT_QUERY,
      variables: { input }
    });

    const checkoutResult: ProcessCheckoutResponse = await response.json();

    if (checkoutResult.errors) {
      throw new Error(
        `Checkout Errors:\n${JSON.stringify(checkoutResult.errors, null, 2)}`
      );
    }

    if (checkoutResult.data?.processCheckout) {
      const {
        id,
        completed,
        url,
        source
      } = checkoutResult.data.processCheckout;

      dispatch({
        type: SET_CHECKOUT_DATA,
        payload: {
          checkoutId: id,
          checkoutComplete: completed,
          checkoutUrl: url,
          checkoutSource: source
        }
      });
    }

    if (action.isMounted.current) {
      action.setIsCheckingOut(false);

      if (checkoutResult?.data?.processCheckout?.url) {
        window.location.href = checkoutResult.data.processCheckout.url;
      }
    }
  }
};

export default processCheckout;
