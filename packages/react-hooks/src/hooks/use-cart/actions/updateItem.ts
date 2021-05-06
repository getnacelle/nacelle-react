import { CartItem } from '@nacelle/types';

import { setCacheItem } from '~/hooks/use-cart/utils';
import { CartState, UpdateItemAction } from '~/hooks/use-cart/use-cart.types';

const updateItem: UpdateItemFunction = (
  state: CartState,
  action: UpdateItemAction
) => {
  const cart: CartItem[] = state.cart.map((item: any) => {
    const payloadId =
      'variant' in action.payload
        ? action.payload.variant?.id
        : action.payload.id;

    if (item.id === payloadId) {
      Object.keys(item).forEach((key) => {
        const value = (action.payload as any)[key];

        if (value && key !== 'id' && item[key] !== value) {
          item[key] = value;
        }
      });
    }

    return item;
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
