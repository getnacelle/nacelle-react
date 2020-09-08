import { InputHTMLAttributes, ChangeEvent } from 'react';
import { CSSObject } from '@emotion/core';

export interface RechargeSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  subscriptionLabel?: string;
  oneTimeLabel?: string;
  product: ShopifyItem;
  containerStyles?: CSSObject;
  onChange?(evt: ChangeEvent<HTMLInputElement>, product?: ShopifyItem): void;
  getCartMetafields(cartMetafields: CartMetafield[]): unknown;
}

export type CartMetafieldKey =
  | 'charge_interval_frequency'
  | 'order_interval_frequency'
  | 'order_interval_unit';

export type CartMetafield = {
  key: CartMetafieldKey;
  value: string;
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
