import {
  useCartState,
  useCartActions,
  CartProvider
} from './use-cart.provider';
import { isItemInCart as isInCart } from './utils';

const useCart = () => [useCartState(), useCartActions()];

export { useCart, CartProvider, isInCart };
