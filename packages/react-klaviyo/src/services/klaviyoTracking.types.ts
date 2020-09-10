export type TrackEvent = [string, string, KlaviyoTrackingItem];
export type IdentifyCustomer = [string, KlaviyoCustomer];

export type Customer = {
  email?: string;
};

export type KlaviyoCustomer = {
  $email: string;
};

export type KlaviyoTrackingItem = {
  Name: string;
  ProductID: string;
  Categories: string[];
  ImageURL: string;
  URL: string;
  Brand: string;
  Price: string;
  CompareAtPrice: string;
};

export type Metafields = {
  has_subscription: boolean;
  is_subscription_only: boolean;
  shipping_interval_frequency: string[];
  shipping_interval_unit_type: string;
  discount_percentage: number;
  [key: string]: unknown;
};

export type ShopifyMedia = {
  altText: string;
  id: string;
  src: string;
  thumbnailSrc: string;
  type: string;
};

export type ItemMetaField = {
  id?: string | null;
  key: string;
  namespace: string;
  value: string;
};

export type ItemOptions = {
  name: string;
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
