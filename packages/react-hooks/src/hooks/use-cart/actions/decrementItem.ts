import { CartItem } from '../../common/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import {
  CartState,
  DecrementItemAction
} from '~/hooks/use-cart/use-cart.types';

const decrementItem: DecrementItemFunction = (
  state: CartState,
  action: DecrementItemAction
) => {
  const cart: CartItem[] = state.cart.map((item) => {
    const payloadId = action.payload.variant.id;

    if (item.variant.id === payloadId) {
      return {
        ...item,
        quantity: item.quantity >= 1 ? item.quantity - 1 : item.quantity
      };
    }

    return item;
  });

  setCacheItem(action.useLocalStorage, action.useSessionStorage)(
    action.cacheKey || 'cart',
    JSON.stringify(cart)
  );

  return {
    ...state,
    cart
  };
};

export default decrementItem;

export type DecrementItemFunction = (
  state: CartState,
  action: DecrementItemAction
) => {
  cart: CartItem[];
  show: boolean;
};
