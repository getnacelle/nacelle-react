import { CartItem } from '@nacelle/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import {
  CartState,
  RemoveFromCartAction
} from '~/hooks/use-cart/use-cart.types';

const removeFromCart: RemoveFromCartFunction = (
  state: CartState,
  action: RemoveFromCartAction
) => {
  const payloadId =
    'variant' in action.payload ? action.payload.variant.id : action.payload.id;

  const cart: CartItem[] = state.cart.filter((item) => item.id !== payloadId);

  setCacheItem(state.useLocalStorage)('cart', JSON.stringify(cart));

  return {
    ...state,
    cart
  };
};

export default removeFromCart;

export type RemoveFromCartFunction = (
  state: CartState,
  action: RemoveFromCartAction
) => {
  cart: CartItem[];
  show: boolean;
  checkoutId: string;
  checkoutComplete: boolean;
  useLocalStorage: boolean;
};
