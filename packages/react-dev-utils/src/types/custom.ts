import { Product, Variant } from './graphql';

export interface ShopifyItem extends Product {
  locale?: string;
  pimSyncSourceProductId?: string;
  pimSyncSourceDomain?: string;
  pimSyncSource?: string;
  variant?: Variant;
  indexedAt?: number;
  quantity?: number;
}
