import {
  NacelleShopProduct,
  CartItem as NacelleCartItem
} from '@nacelle/types';
import { CartItem } from '../common/types';
import { AddToCartFunction } from './actions/addToCart';
import { ClearCartFunction } from './actions/clearCart';
import { DecrementItemFunction } from './actions/decrementItem';
import { IncrementItemFunction } from './actions/incrementItem';
import { InitCartFunction } from './actions/initCart';
import { RemoveFromCartFunction } from './actions/removeFromCart';
import { ToggleCartFunction } from './actions/toggleCart';
import { UpdateItemFunction } from './actions/updateItem';

export type CartState = {
  cart: CartItem[];
  show: boolean;
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
  initCart: (payload: CartItem[]) => void;
  decrementItem: (payload: CartItem) => void;
  toggleCart: (payload: CartToggleStates) => void;
  clearCart: () => void;
};

export type InitCartAction = {
  type: 'cart/init-cart';
  payload: CartItem[];
  initCart?: InitCartFunction;
};

export type AddToCartAction = {
  type: 'cart/add-to-cart';
  payload: CartItem;
  storage: StorageTypes;
  cacheKey: string;
  addToCart?: AddToCartFunction;
  isInCart?: IsInCartFunction;
};

export type UpdateItemAction = {
  type: 'cart/update-item';
  payload: CartItem;
  storage: StorageTypes;
  cacheKey: string;
  updateItem?: UpdateItemFunction;
  isInCart?: IsInCartFunction;
};

export type IncrementItemAction = {
  type: 'cart/increment-item';
  payload: CartItem;
  storage: StorageTypes;
  cacheKey: string;
  incrementItem?: IncrementItemFunction;
  isInCart?: IsInCartFunction;
};

export type DecrementItemAction = {
  type: 'cart/decrement-item';
  payload: CartItem;
  storage: StorageTypes;
  cacheKey: string;
  decrementItem?: DecrementItemFunction;
  isInCart?: IsInCartFunction;
};

export type RemoveFromCartAction = {
  type: 'cart/remove-from-cart';
  payload: CartItem;
  storage: StorageTypes;
  cacheKey: string;
  removeFromCart?: RemoveFromCartFunction;
  isInCart?: IsInCartFunction;
};

export type ToggleVisibilityAction = {
  type: 'cart/toggle-visibility';
  payload?: CartToggleStates;
  toggleCart?: ToggleCartFunction;
};

export type ClearCartAction = {
  type: 'cart/clear';
  clearCart?: ClearCartFunction;
  storage: StorageTypes;
  cacheKey?: string;
};

export type CartReducerAction =
  | AddToCartAction
  | UpdateItemAction
  | IncrementItemAction
  | InitCartAction
  | DecrementItemAction
  | RemoveFromCartAction
  | ToggleVisibilityAction
  | ClearCartAction;

const cartToggleStates = {
  open: 'open',
  closed: 'closed'
} as const;

export type CartToggleStates =
  typeof cartToggleStates[keyof typeof cartToggleStates];

const storageTypes = {
  session: 'session',
  local: 'local',
  idb: 'idb'
} as const;

export type StorageTypes =
  | typeof storageTypes[keyof typeof storageTypes]
  | null;

export type LegacyCartItem = NacelleShopProduct & NacelleCartItem;

export type { AddToCartFunction } from './actions/addToCart';
export type { ClearCartFunction } from './actions/clearCart';
export type { DecrementItemFunction } from './actions/decrementItem';
export type { IncrementItemFunction } from './actions/incrementItem';
export type { InitCartFunction } from './actions/initCart';
export type { RemoveFromCartFunction } from './actions/removeFromCart';
export type { ToggleCartFunction } from './actions/toggleCart';
export type { UpdateItemFunction } from './actions/updateItem';
