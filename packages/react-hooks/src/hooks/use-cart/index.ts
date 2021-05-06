import {
  useCartState,
  useCartActions,
  CartProvider
} from './use-cart.provider';
import { isItemInCart as isInCart } from './utils';
import { CartState, CartActions, IsInCartFunction } from './use-cart.types';

const useCart = () =>
  [useCartState(), useCartActions(), isInCart] as [
    CartState,
    CartActions,
    IsInCartFunction
  ];

export { useCart, CartProvider };
