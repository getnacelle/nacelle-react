import { nacelleStorefrontRequest } from '../utils';
import { GET_CHECKOUT_QUERY } from '../queries';
import {
  CheckoutProperties,
  GetCheckoutResponse,
  GetCheckoutRequestInput,
  GraphQLError
} from '../use-checkout.types';

export default async function getCheckout({
  id,
  url,
  credentials,
  getCheckoutError,
  setGetCheckoutError
}: GetCheckoutRequestInput) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (!id || !url) {
      throw new Error(
        `Could not fetch checkout with id: '${id}', url: '${url}'`
      );
    }

    // clear out any errors from previous `getCheckout()`
    if (getCheckoutError) {
      setGetCheckoutError(null);
    }

    let error: GraphQLError | null = null;

    const checkoutResult: GetCheckoutResponse = await nacelleStorefrontRequest({
      credentials,
      query: GET_CHECKOUT_QUERY,
      variables: { id, url }
    }).then((res) => res.json());

    // if errors are returned by the API, handle them
    const hasErrors =
      typeof checkoutResult.errors !== 'undefined' &&
      Array.isArray(checkoutResult.errors) &&
      checkoutResult.errors.length;

    if (hasErrors) {
      error = checkoutResult.errors[0];
      setGetCheckoutError(error);
      throw new Error(error.message);
    }

    if (checkoutResult.data?.getCheckout) {
      const { completed, source } = checkoutResult.data.getCheckout;
      const checkoutProperties: CheckoutProperties = {
        checkoutComplete: completed,
        checkoutId: id,
        checkoutSource: source,
        checkoutUrl: url
      };

      return checkoutProperties;
    }

    error = { message: 'Checkout response did not include `data.getCheckout`' };
    setGetCheckoutError(error);

    throw new Error(error.message);
  } catch (err) {
    throw new Error(err);
  }
}
