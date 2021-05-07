import { CartItem } from '../../common/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import {
  CartState,
  RemoveFromCartAction
} from '~/hooks/use-cart/use-cart.types';

const removeFromCart: RemoveFromCartFunction = (
  state: CartState,
  action: RemoveFromCartAction
) => {
  const payloadId = action.payload.variant?.id;

  const cart: CartItem[] = state.cart.filter(
    (item) => item.variant.id !== payloadId
  );

  setCacheItem(action.useLocalStorage, action.useSessionStorage)(
    action.cacheKey || 'cart',
    JSON.stringify(cart)
  );

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
};
