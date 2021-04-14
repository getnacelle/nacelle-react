import { NacelleShopProduct, CartItem } from '@nacelle/types';

export type CartState = {
  cart: CartItem[];
  show: boolean;
  checkoutId: string;
  checkoutComplete: boolean;
  useLocalStorage: boolean;
};

export type CartActions = {
  addToCart: (payload: NacelleShopProduct) => void;
  updateItem: (payload: NacelleShopProduct | CartItem) => void;
  removeFromCart: (payload: NacelleShopProduct | CartItem) => void;
  incrementItem: (payload: NacelleShopProduct | CartItem) => void;
  decrementItem: (payload: NacelleShopProduct | CartItem) => void;
  setCheckoutStatus: (payload: CheckoutStatus) => void;
  toggleCart: (payload: CartToggleStates) => void;
  clearCart: () => void;
};

export type CheckoutStatus = {
  checkoutId: string;
  checkoutComplete: boolean;
};

export type CartReducerAction =
  | { type: 'cart/add-to-cart'; payload: NacelleShopProduct }
  | { type: 'cart/update-item'; payload: NacelleShopProduct | CartItem }
  | { type: 'cart/increment-item'; payload: NacelleShopProduct | CartItem }
  | { type: 'cart/decrement-item'; payload: NacelleShopProduct | CartItem }
  | { type: 'cart/remove-from-cart'; payload: NacelleShopProduct | CartItem }
  | { type: 'cart/toggle-visibility'; payload?: CartToggleStates }
  | { type: 'cart/set-status'; payload: CheckoutStatus }
  | { type: 'cart/clear'; payload?: null };

export const enum CartToggleStates {
  open = 'open',
  closed = 'closed'
}
