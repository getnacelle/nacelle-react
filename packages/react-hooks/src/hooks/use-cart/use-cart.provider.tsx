import React, { useReducer, useMemo, useContext, FC } from 'react';
import { NacelleShopProduct, CartItem } from '@nacelle/types';

import {
  CartState,
  CartActions,
  CartToggleStates,
  AddToCartFunction,
  ClearCartFunction,
  DecrementItemFunction,
  IncrementItemFunction,
  RemoveFromCartFunction,
  ToggleCartFunction,
  UpdateItemFunction,
  IsInCartFunction
} from './use-cart.types';

import createCartReducer, {
  initialState,
  ADD_TO_CART,
  UPDATE_ITEM,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  TOGGLE_CART,
  CLEAR_CART
} from './use-cart.reducer';

export type CartContextValue = null | CartState;
export type CartActionContextValue = null | CartActions;
export type CartProviderProps = {
  children: JSX.Element | JSX.Element[];
  useLocalStorage?: boolean;
  addToCart?: AddToCartFunction;
  clearCart?: ClearCartFunction;
  decrementItem?: DecrementItemFunction;
  incrementItem?: IncrementItemFunction;
  removeFromCart?: RemoveFromCartFunction;
  toggleCart?: ToggleCartFunction;
  updateItem?: UpdateItemFunction;
  isInCart?: IsInCartFunction;
};

const CartContext = React.createContext<CartContextValue>(null);
const CartActionContext = React.createContext<CartActionContextValue>(null);

export const CartProvider: FC<CartProviderProps> = ({
  children,
  useLocalStorage = true,
  addToCart,
  clearCart,
  decrementItem,
  incrementItem,
  removeFromCart,
  toggleCart,
  updateItem,
  isInCart
}) => {
  const isClient = typeof window !== 'undefined';
  const cart =
    useLocalStorage && isClient
      ? JSON.parse(window.localStorage.getItem('cart')) || []
      : [];

  const cartReducer = createCartReducer({
    addToCart,
    clearCart,
    decrementItem,
    incrementItem,
    removeFromCart,
    toggleCart,
    updateItem,
    isInCart
  });
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    cart,
    useLocalStorage: useLocalStorage && isClient
  });

  const cartActions: CartActions = useMemo(
    () => ({
      addToCart: (payload: NacelleShopProduct): void =>
        dispatch({ type: ADD_TO_CART, payload }),
      removeFromCart: (payload: NacelleShopProduct | CartItem) =>
        dispatch({ type: REMOVE_FROM_CART, payload }),
      updateItem: (payload: NacelleShopProduct | CartItem) =>
        dispatch({ type: UPDATE_ITEM, payload }),
      incrementItem: (payload: NacelleShopProduct | CartItem): void =>
        dispatch({ type: INCREMENT_ITEM, payload }),
      decrementItem: (payload: NacelleShopProduct | CartItem): void =>
        dispatch({ type: DECREMENT_ITEM, payload }),
      toggleCart: (payload: CartToggleStates) =>
        dispatch({ type: TOGGLE_CART, payload }),
      clearCart: (): void => dispatch({ type: CLEAR_CART })
    }),
    []
  );

  return (
    <CartContext.Provider value={state}>
      <CartActionContext.Provider value={cartActions}>
        {children}
      </CartActionContext.Provider>
    </CartContext.Provider>
  );
};

/**
 * Provides access to the cart provider's state
 *
 * @returns an object with the cart's current state
 */
export function useCartState(): CartState {
  const context = useContext(CartContext);
  return context;
}

/**
 * Provides access to actions that interact with the cart
 *
 * @returns an object with functions for interacting with the cart.
 *
 * addToCart() - add an item to the cart; if the item is already in the cart,
 * this function will increase the quantity of that item
 * removeFromCart() - remove an item from the cart
 * incrementItem() - increment the quantity of an item in the cart
 * decrementItem() - decrement the quantity of an item in the cart
 * toggleCart() - toggles the cart's show status
 * clearCart() - removes all items from the cart
 */
export function useCartActions(): CartActions {
  const context = useContext(CartActionContext);
  return context;
}
