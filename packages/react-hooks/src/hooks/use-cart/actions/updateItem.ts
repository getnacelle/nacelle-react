import { CartItem } from '../../common/types';

import {
  setCacheItem,
  isItemInCart,
  isSameItem as isSameItemDefault
} from '~/hooks/use-cart/utils';
import { CartState, UpdateItemAction } from '~/hooks/use-cart/use-cart.types';

const updateItem: UpdateItemFunction = (
  state: CartState,
  action: UpdateItemAction
) => {
  const isInCart = action.isInCart || isItemInCart;

  if (!isInCart(state.cart, action.payload)) {
    return state;
  }

  const cart: CartItem[] = state.cart.map((item) => {
    let localItem: any = null;
    const isSameItem = action.isSameItem || isSameItemDefault;

    if (isSameItem(item, action.payload)) {
      localItem = { ...item };
      Object.keys(item).forEach((key) => {
        const value = (action.payload as any)[key];

        if (value && key !== 'id' && localItem[key] !== value) {
          localItem[key] = value;
        }
      });
    }

    return localItem || item;
  });

  setCacheItem(action.storage)(action.cacheKey || 'cart', JSON.stringify(cart));

  return {
    ...state,
    cart
  };
};

export default updateItem;

export type UpdateItemFunction = (
  state: CartState,
  action: UpdateItemAction
) => {
  cart: CartItem[];
  show: boolean;
};
