import { hailFrequencyRequest } from '../utils';
import { GET_CHECKOUT_QUERY } from '../queries';
import {
  SET_CHECKOUT_COMPLETE,
  SET_CHECKOUT_SOURCE
} from '../use-checkout.reducer';

import {
  ActionHandler,
  GetCheckoutAction,
  GetCheckoutResponse
} from 'hooks/use-checkout/use-checkout.types';

const getCheckout: ActionHandler = ({ dispatch }) => async (
  action: GetCheckoutAction
): Promise<void> => {
  if (typeof window !== 'undefined') {
    const { id, url } = action.payload;
    const response = await hailFrequencyRequest({
      credentials: action.credentials,
      query: GET_CHECKOUT_QUERY,
      variables: { id, url }
    });

    const checkoutResult: GetCheckoutResponse = await response.json();

    if (!checkoutResult.errors && checkoutResult.data?.getCheckout) {
      dispatch({
        type: SET_CHECKOUT_COMPLETE,
        payload: checkoutResult.data.getCheckout.completed
      });

      dispatch({
        type: SET_CHECKOUT_SOURCE,
        payload: checkoutResult.data.getCheckout.source
      });
    }
  }
};

export default getCheckout;
