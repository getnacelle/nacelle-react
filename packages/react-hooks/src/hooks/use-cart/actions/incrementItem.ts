import { CartItem } from '@nacelle/types';

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
    const payloadId =
      'variant' in action.payload
        ? action.payload.variant?.id
        : action.payload.id;

    if (item.id === payloadId) {
      return { ...item, quantity: item.quantity + 1 };
    }

    return item;
  });

  setCacheItem(state.useLocalStorage)('cart', JSON.stringify(cart));

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
  useLocalStorage: boolean;
};
