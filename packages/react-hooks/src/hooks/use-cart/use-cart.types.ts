import { NacelleShopProduct, CartItem } from '@nacelle/types';

export type CartState = {
  cart: CartItem[];
  show: boolean;
  checkoutId: string;
  checkoutComplete: boolean;
  useLocalStorage: boolean;
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
  | { type: 'cart/toggle-visibility'; payload?: null }
  | { type: 'cart/set-status'; payload: CheckoutStatus }
  | { type: 'cart/clear'; payload?: null };
