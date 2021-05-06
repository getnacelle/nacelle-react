import { NacelleProduct, ProductVariant } from '@nacelle/types';

export interface CartItem {
  product: NacelleProduct;
  variant: ProductVariant;
  quantity: number;
}
