import { InputHTMLAttributes, ChangeEvent } from 'react';
import { CSSObject } from '@emotion/core';
import { NacelleShopProduct, Metafield } from '@nacelle/types';

export interface RechargeSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  subscriptionLabel?: string;
  oneTimeLabel?: string;
  product: NacelleShopProduct;
  containerStyles?: CSSObject;
  onChange?(
    evt: ChangeEvent<HTMLInputElement>,
    product?: NacelleShopProduct
  ): void;
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

export interface RechargeMetafields extends Metafield {
  has_subscription: boolean;
  is_subscription_only: boolean;
  shipping_interval_frequency: string[];
  shipping_interval_unit_type: string;
  discount_percentage: number;
}
