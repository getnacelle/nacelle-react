import { InputHTMLAttributes, ChangeEvent } from 'react';
import { CSSObject } from '@emotion/core';
import { ShopifyItem } from '@nacelle/react-dev-utils';

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
