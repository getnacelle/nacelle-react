import React, { useReducer, useMemo, useContext, FC, ReactNode } from 'react';

import {
  CartState,
  ShopifyItem,
  CartItem,
  CheckoutStatus
} from './use-cart.types';

import cartReducer, {
  initialState,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  TOGGLE_CART,
  SET_CHECKOUT_STATUS,
  CLEAR_CART
} from './use-cart.reducer';

export type CartActions = {
  addToCart: (payload: ShopifyItem) => void;
  removeFromCart: (payload: ShopifyItem | CartItem) => void;
  incrementItem: (payload: ShopifyItem | CartItem) => void;
  decrementItem: (payload: ShopifyItem | CartItem) => void;
  setCheckoutStatus: (payload: CheckoutStatus) => void;
  toggleCart: () => void;
  clearCart: () => void;
};

export type CartProviderProps = {
  useLocalStorage: boolean;
  children: [ReactNode];
};
export type CartContextValue = null | CartState;
export type CartActionContextValue = null | CartActions;

const CartContext = React.createContext<CartContextValue>(null);
const CartActionContext = React.createContext<CartActionContextValue>(null);

export const CartProvider: FC<CartProviderProps> = ({ useLocalStorage, children }) => {
  let cart: CartItem[] = []
  if (useLocalStorage && typeof window !== 'undefined') {
    const localCart = window.localStorage.getItem('cart')
    if (localCart) {
      cart = JSON.parse(localCart)
    }
  }
  const [state, dispatch] = useReducer(
    cartReducer,
    {
      ...initialState,
      cart,
      useLocalStorage
    }
  );

  const cartActions: CartActions = useMemo(
    () => ({
      addToCart: (payload: ShopifyItem): void =>
        dispatch({ type: ADD_TO_CART, payload }),
      removeFromCart: (payload: ShopifyItem | CartItem) =>
        dispatch({ type: REMOVE_FROM_CART, payload }),
      incrementItem: (payload: ShopifyItem | CartItem): void =>
        dispatch({ type: INCREMENT_ITEM, payload }),
      decrementItem: (payload: ShopifyItem | CartItem): void =>
        dispatch({ type: DECREMENT_ITEM, payload }),
      toggleCart: () => dispatch({ type: TOGGLE_CART }),
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
