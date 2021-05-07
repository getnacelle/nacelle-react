import React, { useReducer, useMemo, useContext, FC } from 'react';
import { CartItem } from '../common/types';

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

import cartReducer, {
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
  useSessionStorage?: boolean;
  cacheKey?: string;
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
  useSessionStorage = true,
  useLocalStorage = false,
  cacheKey = 'cart',
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
  let cart = [];

  if (useLocalStorage && isClient) {
    const cartString = window.localStorage.getItem('cart');

    if (cartString) {
      cart = JSON.parse(cartString);
    }
  }

  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    cart
  });

  const cartActions: CartActions = useMemo(
    () => ({
      addToCart: (payload: CartItem): void =>
        dispatch({
          type: ADD_TO_CART,
          payload,
          isInCart,
          addToCart,
          useSessionStorage,
          useLocalStorage,
          cacheKey
        }),
      removeFromCart: (payload: CartItem) =>
        dispatch({
          type: REMOVE_FROM_CART,
          payload,
          removeFromCart,
          useSessionStorage,
          useLocalStorage,
          cacheKey
        }),
      updateItem: (payload: CartItem) =>
        dispatch({
          type: UPDATE_ITEM,
          payload,
          updateItem,
          useSessionStorage,
          useLocalStorage,
          cacheKey
        }),
      incrementItem: (payload: CartItem): void =>
        dispatch({
          type: INCREMENT_ITEM,
          payload,
          incrementItem,
          useSessionStorage,
          useLocalStorage,
          cacheKey
        }),
      decrementItem: (payload: CartItem): void =>
        dispatch({
          type: DECREMENT_ITEM,
          payload,
          decrementItem,
          useSessionStorage,
          useLocalStorage,
          cacheKey
        }),
      toggleCart: (payload: CartToggleStates) =>
        dispatch({ type: TOGGLE_CART, payload, toggleCart }),
      clearCart: (): void =>
        dispatch({
          type: CLEAR_CART,
          clearCart,
          useSessionStorage,
          useLocalStorage
        })
    }),
    [
      isInCart,
      addToCart,
      removeFromCart,
      updateItem,
      incrementItem,
      decrementItem,
      toggleCart,
      clearCart,
      useSessionStorage,
      useLocalStorage,
      cacheKey
    ]
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
export function useCartState(): CartState | null {
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
export function useCartActions(): CartActions | null {
  const context = useContext(CartActionContext);
  return context;
}
