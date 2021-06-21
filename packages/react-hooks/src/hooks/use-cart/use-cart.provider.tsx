import React, { useReducer, useMemo, useContext, FC, useCallback } from 'react';
import { CartItem } from '../common/types';
import { convertLegacyCartItem, isItemInCart } from './utils';

import {
  AddToCartFunction,
  CartActions,
  CartState,
  CartToggleStates,
  ClearCartFunction,
  DecrementItemFunction,
  IncrementItemFunction,
  IsInCartFunction,
  IsSameItemFunction,
  LegacyCartItem,
  RemoveFromCartFunction,
  StorageTypes,
  ToggleCartFunction,
  UpdateItemFunction
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
  storage?: StorageTypes;
  cacheKey?: string;
  addToCart?: AddToCartFunction;
  clearCart?: ClearCartFunction;
  decrementItem?: DecrementItemFunction;
  incrementItem?: IncrementItemFunction;
  removeFromCart?: RemoveFromCartFunction;
  toggleCart?: ToggleCartFunction;
  updateItem?: UpdateItemFunction;
  isSameItem?: IsSameItemFunction;
};

const CartContext = React.createContext<CartContextValue>(null);
const CartActionContext = React.createContext<CartActionContextValue>(null);
const IsInCartContext = React.createContext<IsInCartFunction>(isItemInCart);

export const CartProvider: FC<CartProviderProps> = ({
  children,
  storage = 'local',
  cacheKey = 'cart',
  addToCart,
  clearCart,
  decrementItem,
  incrementItem,
  removeFromCart,
  toggleCart,
  updateItem,
  isSameItem
}) => {
  let cart: CartItem[] = [];
  let unformattedCart: CartItem[] | LegacyCartItem[];

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    let cartString: string | null = '';

    if (storage) {
      if (storage === 'local') {
        cartString = window.localStorage.getItem(cacheKey);
      } else if (storage === 'session') {
        cartString = window.sessionStorage.getItem(cacheKey);
      }
    }

    if (cartString) {
      unformattedCart = JSON.parse(cartString);

      const hasLegacyCartItems = unformattedCart?.length
        ? unformattedCart
            .map((i: CartItem | LegacyCartItem) => 'productId' in i)
            .some((truthy) => truthy)
        : false;

      if (hasLegacyCartItems) {
        cart = (unformattedCart as LegacyCartItem[]).map((item) =>
          convertLegacyCartItem(item)
        );
      } else {
        cart = unformattedCart as CartItem[];
      }
    }
  }

  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    cart
  });

  const isInCart: IsInCartFunction = useCallback(
    (cart: CartItem[], item: CartItem): boolean => {
      return isItemInCart(cart, item, isSameItem);
    },
    [isSameItem]
  );

  const cartActions: CartActions = useMemo(
    () => ({
      addToCart: (payload: CartItem): void =>
        dispatch({
          type: ADD_TO_CART,
          payload,
          isInCart,
          addToCart,
          storage,
          cacheKey
        }),
      removeFromCart: (payload: CartItem) =>
        dispatch({
          type: REMOVE_FROM_CART,
          payload,
          isInCart,
          removeFromCart,
          storage,
          cacheKey
        }),
      updateItem: (payload: CartItem) =>
        dispatch({
          type: UPDATE_ITEM,
          payload,
          isInCart,
          updateItem,
          storage,
          cacheKey
        }),
      incrementItem: (payload: CartItem): void =>
        dispatch({
          type: INCREMENT_ITEM,
          payload,
          isInCart,
          incrementItem,
          storage,
          cacheKey
        }),
      decrementItem: (payload: CartItem): void =>
        dispatch({
          type: DECREMENT_ITEM,
          payload,
          isInCart,
          decrementItem,
          storage,
          cacheKey
        }),
      toggleCart: (payload: CartToggleStates) =>
        dispatch({ type: TOGGLE_CART, payload, toggleCart }),
      clearCart: (): void =>
        dispatch({
          type: CLEAR_CART,
          clearCart,
          storage
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
      storage,
      cacheKey
    ]
  );

  return (
    <CartContext.Provider value={state}>
      <CartActionContext.Provider value={cartActions}>
        <IsInCartContext.Provider value={isInCart}>
          {children}
        </IsInCartContext.Provider>
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
  return useContext(CartContext);
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
  return useContext(CartActionContext);
}

/**
 * Provides access to the active isInCart function
 *
 * @returns a function which determines whether a line item is already in the cart
 */
export function useIsInCart(): IsInCartFunction {
  return useContext(IsInCartContext);
}
