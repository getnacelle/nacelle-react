import { nacelleStorefrontRequest } from '../utils';
import { GET_CHECKOUT_QUERY } from '../queries';
import {
  SET_CHECKOUT_COMPLETE,
  SET_CHECKOUT_SOURCE
} from '../use-checkout.reducer';

import {
  AsyncActionHandler,
  GetCheckoutAction,
  GetCheckoutResponse
} from 'hooks/use-checkout/use-checkout.types';

const getCheckout: AsyncActionHandler<GetCheckoutAction> =
  ({ dispatch }) =>
  async (action: GetCheckoutAction): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }

    const { id, url } = action.payload;
    const checkoutResult: GetCheckoutResponse = await nacelleStorefrontRequest({
      credentials: action.credentials,
      query: GET_CHECKOUT_QUERY,
      variables: { id, url }
    }).then((res) => res.json());

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
  };

export default getCheckout;
