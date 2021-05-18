import { CartItem } from '../../common/types';

import { isItemInCart, setCacheItem } from '~/hooks/use-cart/utils';
import {
  CartState,
  DecrementItemAction
} from '~/hooks/use-cart/use-cart.types';

const decrementItem: DecrementItemFunction = (
  state: CartState,
  action: DecrementItemAction
) => {
  const cart: CartItem[] = state.cart
    .map((item) => {
      const isInCart = action.isInCart || isItemInCart;

      if (isInCart([item], action.payload)) {
        return {
          ...item,
          quantity: item.quantity - 1
        };
      }

      return item;
    })
    .filter((item) => item.quantity);

  setCacheItem(action.storage)(action.cacheKey || 'cart', JSON.stringify(cart));

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
