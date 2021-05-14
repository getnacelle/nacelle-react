import {
  useCartState,
  useCartActions,
  useIsInCart,
  CartProvider
} from './use-cart.provider';
import { CartState, CartActions, IsInCartFunction } from './use-cart.types';

const useCart = () =>
  [useCartState(), useCartActions(), useIsInCart()] as [
    CartState,
    CartActions,
    IsInCartFunction
  ];

export { useCart, CartProvider };
