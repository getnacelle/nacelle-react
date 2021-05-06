import { CartItem } from '../common/types';

export type CartState = {
  cart: CartItem[];
  show: boolean;
  useLocalStorage: boolean;
};

export type IsInCartFunction = (cart: CartItem[], payload: CartItem) => boolean;

export interface BuildCartParams {
  cart: CartItem[];
  payload: CartItem;
  isInCart?: IsInCartFunction;
}

export type CartActions = {
  addToCart: (payload: CartItem) => void;
  updateItem: (payload: CartItem) => void;
  removeFromCart: (payload: CartItem) => void;
  incrementItem: (payload: CartItem) => void;
  decrementItem: (payload: CartItem) => void;
  toggleCart: (payload: CartToggleStates) => void;
  clearCart: () => void;
};

export type AddToCartAction = {
  type: 'cart/add-to-cart';
  payload: CartItem;
  isInCart?: IsInCartFunction;
};

export type UpdateItemAction = {
  type: 'cart/update-item';
  payload: CartItem;
};

export type IncrementItemAction = {
  type: 'cart/increment-item';
  payload: CartItem;
};

export type DecrementItemAction = {
  type: 'cart/decrement-item';
  payload: CartItem;
};

export type RemoveFromCartAction = {
  type: 'cart/remove-from-cart';
  payload: CartItem;
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
