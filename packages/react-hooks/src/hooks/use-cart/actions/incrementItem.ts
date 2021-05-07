import { CartItem } from '../../common/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import {
  CartState,
  IncrementItemAction
} from '~/hooks/use-cart/use-cart.types';

const incrementItem: IncrementItemFunction = (
  state: CartState,
  action: IncrementItemAction
) => {
  const cart: CartItem[] = state.cart.map((item) => {
    const payloadId = action.payload.variant.id;

    if (item.variant.id === payloadId) {
      return { ...item, quantity: item.quantity + 1 };
    }

    return item;
  });

  setCacheItem(action.storage)(action.cacheKey || 'cart', JSON.stringify(cart));

  return {
    ...state,
    cart
  };
};

export default incrementItem;

export type IncrementItemFunction = (
  state: CartState,
  action: IncrementItemAction
) => {
  cart: CartItem[];
  show: boolean;
};
