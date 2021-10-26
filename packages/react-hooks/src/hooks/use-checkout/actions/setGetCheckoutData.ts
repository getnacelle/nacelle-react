import { cacheKeys, setCacheItem } from '../utils';
import { CheckoutState, SetGetCheckoutDataAction } from '../use-checkout.types';

const setGetCheckoutData = (
  state: CheckoutState,
  action: SetGetCheckoutDataAction
): CheckoutState => {
  const { completed } = action.payload;
  setCacheItem(cacheKeys.completed, completed.toString());

  return {
    ...state,
    completed
  };
};

export default setGetCheckoutData;
