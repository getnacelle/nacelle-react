import { cacheKeys, setCacheItem } from '../utils';
import {
  CheckoutState,
  SetProcessCheckoutDataAction
} from '../use-checkout.types';

const setCheckoutData = (
  state: CheckoutState,
  action: SetProcessCheckoutDataAction
): CheckoutState => {
  const { id, url } = action.payload;

  setCacheItem(cacheKeys.id, id);
  setCacheItem(cacheKeys.url, url);
  setCacheItem(cacheKeys.completed, 'false');

  return {
    ...state,
    completed: false,
    id,
    url,
    processCheckoutError: ''
  };
};

export default setCheckoutData;
