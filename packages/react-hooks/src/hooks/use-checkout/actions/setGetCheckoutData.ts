import { cacheKeys, setCacheItem } from '../utils';
import { CheckoutState, SetGetCheckoutDataAction } from '../use-checkout.types';

const setGetCheckoutData = (
  state: CheckoutState,
  action: SetGetCheckoutDataAction
): CheckoutState => {
  const { completed, id, url } = action.payload;

  setCacheItem(cacheKeys.completed, completed.toString());
  setCacheItem(cacheKeys.id, id);
  setCacheItem(cacheKeys.url, url);

  return {
    ...state,
    completed,
    id,
    url
  };
};

export default setGetCheckoutData;
