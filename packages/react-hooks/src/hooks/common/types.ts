import { NacelleProduct, ProductVariant } from '@nacelle/types';

export interface CartItem {
  product: NacelleProduct;
  variant: ProductVariant;
  quantity: number;
}

export interface AnyObject {
  [key: string]: AnyObject | string | unknown;
}
