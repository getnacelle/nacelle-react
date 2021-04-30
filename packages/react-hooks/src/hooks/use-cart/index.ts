import {
  useCartState,
  useCartActions,
  CartProvider
} from './use-cart.provider';
import { CartState, CartActions } from './use-cart.types';
import { isItemInCart as isInCart } from './utils';

const useCart = () =>
  [useCartState(), useCartActions()] as [CartState, CartActions];

export { useCart, CartProvider, isInCart };
