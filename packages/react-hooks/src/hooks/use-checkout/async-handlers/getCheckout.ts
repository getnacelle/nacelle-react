import { nacelleStorefrontRequest } from '../utils';
import { GET_CHECKOUT_QUERY } from '../queries';
import {
  SET_CHECKOUT_COMPLETE,
  SET_CHECKOUT_SOURCE,
  SET_GET_CHECKOUT_SUCCESS
} from '../use-checkout.reducer';
import {
  AsyncActionHandler,
  CheckoutProperties,
  GetCheckoutAction,
  GetCheckoutResponse
} from '../use-checkout.types';

const getCheckout: AsyncActionHandler<GetCheckoutAction> =
  ({ dispatch }) =>
  async (action: GetCheckoutAction): Promise<void> => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const { id, url } = action.payload;

      if (!id || !url) {
        dispatch({
          type: SET_GET_CHECKOUT_SUCCESS,
          payload: Promise.reject(
            `Could not fetch checkout with id: '${id}', url: '${url}'`
          )
        });

        return;
      }

      const checkoutResult: GetCheckoutResponse =
        await nacelleStorefrontRequest({
          credentials: action.credentials,
          query: GET_CHECKOUT_QUERY,
          variables: { id, url }
        }).then((res) => res.json());

      // if errors are returned by the API, handle them
      const hasErrors =
        typeof checkoutResult.errors !== 'undefined' &&
        Array.isArray(checkoutResult.errors) &&
        checkoutResult.errors.length;

      if (hasErrors) {
        dispatch({
          type: SET_GET_CHECKOUT_SUCCESS,
          payload: Promise.reject(checkoutResult.errors[0].message)
        });

        return;
      }

      if (checkoutResult.data?.getCheckout) {
        const { completed, source } = checkoutResult.data.getCheckout;
        const checkoutProperties: CheckoutProperties = {
          checkoutComplete: completed,
          checkoutId: id,
          checkoutSource: source,
          checkoutUrl: url
        };

        dispatch({
          type: SET_CHECKOUT_COMPLETE,
          payload: checkoutProperties.checkoutComplete
        });

        dispatch({
          type: SET_CHECKOUT_SOURCE,
          payload: checkoutProperties.checkoutSource
        });

        dispatch({
          type: SET_GET_CHECKOUT_SUCCESS,
          payload: Promise.resolve(checkoutProperties)
        });

        return;
      }

      dispatch({
        type: SET_GET_CHECKOUT_SUCCESS,
        payload: Promise.reject(
          'Checkout response did not include `data.getCheckout`'
        )
      });

      return;
    } catch (err) {
      dispatch({
        type: SET_GET_CHECKOUT_SUCCESS,
        payload: Promise.reject(err)
      });
    }
  };

export default getCheckout;
