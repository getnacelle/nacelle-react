import { CartItem } from '../../common/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import { CartState, UpdateItemAction } from '~/hooks/use-cart/use-cart.types';

const updateItem: UpdateItemFunction = (
  state: CartState,
  action: UpdateItemAction
) => {
  const cart: CartItem[] = state.cart.map((item) => {
    const payloadId = action.payload.variant?.id;
    let localItem: any = null;

    if (item.variant.id === payloadId) {
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

  setCacheItem(state.useLocalStorage)('cart', JSON.stringify(cart));

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
  useLocalStorage: boolean;
};
