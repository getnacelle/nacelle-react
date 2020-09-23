import {
  Metafield,
  Media,
  ShopifyItem,
  PriceRule,
  SelectedOption
} from '@nacelle/react-dev-utils';

export type CartItem = {
  availableForSale: boolean;
  compareAtPrice?: string;
  compareAtPriceCurrency?: string;
  handle: string;
  id: string;
  image: Media;
  metafields?: Metafield[];
  price?: string;
  priceCurrency?: string;
  priceRules?: PriceRule[];
  productId: string;
  quantity: number;
  selectedOptions: SelectedOption[];
  sku?: string;
  swatchSrc?: string;
  tags: string[];
  title: string;
  vendor: string;
  weight?: number;
  weightUnit?: string;
  locale: string;
};

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
  | { type: 'cart/add-to-cart'; payload: ShopifyItem }
  | { type: 'cart/increment-item'; payload: ShopifyItem | CartItem }
  | { type: 'cart/decrement-item'; payload: ShopifyItem | CartItem }
  | { type: 'cart/remove-from-cart'; payload: ShopifyItem | CartItem }
  | { type: 'cart/toggle-visibility'; payload?: null }
  | { type: 'cart/set-status'; payload: CheckoutStatus }
  | { type: 'cart/clear'; payload?: null };
