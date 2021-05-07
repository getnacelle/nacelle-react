import { CartItem } from '../../common/types';

import {
  CartState,
  ToggleVisibilityAction
} from '~/hooks/use-cart/use-cart.types';

const toggleCart: ToggleCartFunction = (
  state: CartState,
  action: ToggleVisibilityAction
) => {
  let show = !state.show;
  const stay = action.payload;

  if (stay) {
    if (stay === 'open') {
      show = true;
    } else if (stay === 'closed') {
      show = false;
    }
  }

  return {
    ...state,
    show
  };
};

export default toggleCart;

export type ToggleCartFunction = (
  state: CartState,
  action: ToggleVisibilityAction
) => {
  show: boolean;
  cart: CartItem[];
};
