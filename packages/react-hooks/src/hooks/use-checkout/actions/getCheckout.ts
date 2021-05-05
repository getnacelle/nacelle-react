import { hailFrequencyRequest } from '../utils';

import {
  CheckoutState,
  Credentials,
  GetCheckoutAction,
  GetCheckoutResponse
} from 'hooks/use-checkout/use-checkout.types';

import { GET_CHECKOUT_QUERY } from '../queries';

const getCheckout = async (
  state: CheckoutState,
  action: GetCheckoutAction,
  credentials: Credentials
): Promise<CheckoutState> => {
  if (typeof window !== 'undefined') {
    const { id, url } = action.payload;
    const response = await hailFrequencyRequest({
      credentials,
      query: GET_CHECKOUT_QUERY,
      variables: { id, url }
    });

    const checkoutResult: GetCheckoutResponse = await response.json();

    if (!checkoutResult.errors && checkoutResult.data?.getCheckout) {
      const checkoutComplete = checkoutResult.data.getCheckout.completed;
      const checkoutSource = checkoutResult.data.getCheckout.source;

      localStorage.setItem('checkoutComplete', checkoutComplete.toString());

      return {
        ...state,
        checkoutComplete,
        checkoutSource
      };
    }
  }
};

export default getCheckout;
