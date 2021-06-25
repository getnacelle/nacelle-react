import { CartItem } from '../../common/types';

import { isItemInCart, setCacheItem } from '~/hooks/use-cart/utils';
import { CartState, UpdateItemAction } from '~/hooks/use-cart/use-cart.types';

const updateItem: UpdateItemFunction = (
  state: CartState,
  action: UpdateItemAction
) => {
  const cart: CartItem[] = state.cart.map((item) => {
    const isInCart = action.isInCart || isItemInCart;
    let localItem: any = null;

    if (isInCart([item], action.payload)) {
      localItem = { ...item };
      Object.keys(item).forEach((key) => {
        const value = (action.payload as any)[key];

        if (key !== 'id' && localItem[key] !== value) {
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
