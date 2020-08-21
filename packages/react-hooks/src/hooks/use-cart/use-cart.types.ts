export type ShopifyMedia = {
  altText: string;
  id: string;
  src: string;
  thumbnailSrc: string;
  type: string;
};

export type ItemOptions = {
  name: string;
  value: string;
};

export type ItemMetaField = {
  key: string;
  namespace: string;
  value: string;
};

export type ItemVariant = {
  availableForSale: boolean;
  compareAtPrice: string;
  compareAtPriceCurrency: string;
  featuredMedia: ShopifyMedia;
  id: string;
  metafields: ItemMetaField[];
  price: string;
  priceCurrency: string;
  priceRules?: string;
  selectedOptions: ItemOptions[];
  sku: string;
  swatchSrc: string;
  title: string;
  weight: string;
  weightUnit: string;
};

export type ShopifyItem = {
  availableForSale: boolean;
  createdAt: number;
  description: string;
  featuredMedia: ShopifyMedia;
  globalHandle: string;
  handle: string;
  id: string;
  indexedAt: number;
  locale: string;
  media: ShopifyMedia[];
  metafields: ItemMetaField[];
  pimSyncSource: string;
  pimSyncSourceDomain: string;
  pimSyncSourceProductId: string;
  priceRange: {
    currencyCode: string;
    max: string;
    min: string;
  };
  productType: string;
  quantity?: number;
  tags: string[];
  title: string;
  variant?: ItemVariant;
  variants: ItemVariant[];
  vendor: string;
};

export type CartItem = {
  availableForSale: boolean;
  compareAtPrice: string;
  compareAtPriceCurrency: string;
  handle: string;
  id: string;
  image: ShopifyMedia;
  metafields: ItemMetaField[];
  price: string;
  priceCurrency: string;
  priceRules?: string;
  productId: string;
  quantity: number;
  selectedOptions: ItemOptions[];
  sku: string;
  swatchSrc: string;
  tags: string[];
  title: string;
  vendor: string;
  weight: string;
  weightUnit: string;
};

export type CartState = {
  cart: CartItem[];
  show: boolean;
  checkoutId: string;
  checkoutComplete: boolean;
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
