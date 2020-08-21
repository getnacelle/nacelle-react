import { isInCart } from './use-cart.reducer';
import {
  useCartState,
  useCartActions,
  CartProvider
} from './use-cart.provider';

const useCart = () => [useCartState(), useCartActions()];

export { useCart, CartProvider, isInCart };
