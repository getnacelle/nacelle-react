import React, { useReducer, useMemo, useContext, FC } from 'react';
import { NacelleShopProduct, CartItem } from '@nacelle/types';

import {
  CartState,
  CheckoutStatus,
  CartActions,
  CartToggleStates
} from './use-cart.types';
import cartReducer, {
  initialState,
  ADD_TO_CART,
  UPDATE_ITEM,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  TOGGLE_CART,
  SET_CHECKOUT_STATUS,
  CLEAR_CART
} from './use-cart.reducer';

export type CartProviderProps = {
  useLocalStorage?: boolean;
  children: JSX.Element | JSX.Element[];
};
export type CartContextValue = null | CartState;
export type CartActionContextValue = null | CartActions;

const CartContext = React.createContext<CartContextValue>(null);
const CartActionContext = React.createContext<CartActionContextValue>(null);

export const CartProvider: FC<CartProviderProps> = ({
  useLocalStorage = true,
  children
}) => {
  const hasWindow = typeof window !== 'undefined';
  const cart =
    useLocalStorage && hasWindow
      ? JSON.parse(window.localStorage.getItem('cart')) || []
      : [];

  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    cart,
    useLocalStorage: useLocalStorage && hasWindow
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
      setCheckoutStatus: (payload: CheckoutStatus): void =>
        dispatch({ type: SET_CHECKOUT_STATUS, payload }),
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
 * setCheckoutStatus() - sets the checkoutId and checkoutComplete properties of the cart
 * clearCart() - removes all items from the cart
 */
export function useCartActions(): CartActions {
  const context = useContext(CartActionContext);
  return context;
}
