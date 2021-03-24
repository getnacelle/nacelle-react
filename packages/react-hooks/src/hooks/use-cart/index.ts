import { isInCart } from './use-cart.reducer';
import {
  useCartState,
  useCartActions,
  CartProvider
} from './use-cart.provider';
import { CartState, CartActions } from './use-cart.types';

const useCart = () =>
  [useCartState(), useCartActions()] as [CartState, CartActions];

export { useCart, CartProvider, isInCart };
