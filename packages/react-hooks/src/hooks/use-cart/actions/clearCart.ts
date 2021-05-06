import { CartState } from '~/hooks/use-cart/use-cart.types';

const clearCart: ClearCartFunction = (state: CartState) => {
  if (state.useLocalStorage) {
    window.localStorage.removeItem('cart');
  }

  return {
    ...state,
    cart: []
  };
};

export default clearCart;

export type ClearCartFunction = (
  state: CartState
) => {
  cart: any[];
  show: boolean;
  useLocalStorage: boolean;
};
