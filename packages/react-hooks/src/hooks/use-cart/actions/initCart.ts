import { CartItem } from '../../common/types';

import { InitCartAction, CartState } from '~/hooks/use-cart/use-cart.types';

const initCart: InitCartFunction = (
  state: CartState,
  action: InitCartAction
) => {
  const cart: CartItem[] = [...action.payload];

  return {
    ...state,
    cart
  };
};

export default initCart;

export type InitCartFunction = (
  state: CartState,
  action: InitCartAction
) => {
  cart: CartItem[];
  show: boolean;
};
