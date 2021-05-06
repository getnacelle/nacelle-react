import { NacelleShopProduct, CartItem } from '@nacelle/types';

export type CartState = {
  cart: CartItem[];
  show: boolean;
  useLocalStorage: boolean;
};

export type IsInCartFunction = (
  cart: CartItem[],
  payload: NacelleShopProduct
) => boolean;

export interface BuildCartParams {
  cart: CartItem[];
  payload: NacelleShopProduct;
  isInCart?: IsInCartFunction;
}

export type CartActions = {
  addToCart: (payload: NacelleShopProduct) => void;
  updateItem: (payload: NacelleShopProduct | CartItem) => void;
  removeFromCart: (payload: NacelleShopProduct | CartItem) => void;
  incrementItem: (payload: NacelleShopProduct | CartItem) => void;
  decrementItem: (payload: NacelleShopProduct | CartItem) => void;
  toggleCart: (payload: CartToggleStates) => void;
  clearCart: () => void;
};

export type AddToCartAction = {
  type: 'cart/add-to-cart';
  payload: NacelleShopProduct;
  isInCart?: IsInCartFunction;
};

export type UpdateItemAction = {
  type: 'cart/update-item';
  payload: NacelleShopProduct | CartItem;
};

export type IncrementItemAction = {
  type: 'cart/increment-item';
  payload: NacelleShopProduct | CartItem;
};

export type DecrementItemAction = {
  type: 'cart/decrement-item';
  payload: NacelleShopProduct | CartItem;
};

export type RemoveFromCartAction = {
  type: 'cart/remove-from-cart';
  payload: NacelleShopProduct | CartItem;
};

export type ToggleVisibilityAction = {
  type: 'cart/toggle-visibility';
  payload?: CartToggleStates;
};

export type ClearCartAction = { type: 'cart/clear'; payload?: null };

export type CartReducerAction =
  | AddToCartAction
  | UpdateItemAction
  | IncrementItemAction
  | DecrementItemAction
  | RemoveFromCartAction
  | ToggleVisibilityAction
  | ClearCartAction;

const cartToggleStates = {
  open: 'open',
  closed: 'closed'
} as const;

export type CartToggleStates = typeof cartToggleStates[keyof typeof cartToggleStates];

export type { AddToCartFunction } from './actions/addToCart';
export type { ClearCartFunction } from './actions/clearCart';
export type { DecrementItemFunction } from './actions/decrementItem';
export type { IncrementItemFunction } from './actions/incrementItem';
export type { RemoveFromCartFunction } from './actions/removeFromCart';
export type { ToggleCartFunction } from './actions/toggleCart';
export type { UpdateItemFunction } from './actions/updateItem';
