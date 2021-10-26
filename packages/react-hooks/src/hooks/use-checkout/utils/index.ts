import { CacheKey } from '../use-checkout.types';

export const cacheKeys = {
  completed: 'checkoutComplete',
  id: 'checkoutId',
  url: 'checkoutUrl'
} as const;

export function getCacheBoolean(key: CacheKey, defaultValue: boolean): boolean {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item) as boolean;
    }

    return false;
  }

  return defaultValue;
}

export function getCacheString(
  key: CacheKey,
  defaultValue: string = ''
): string {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);

    if (item) {
      return item;
    }

    return '';
  }

  return defaultValue;
}

export function setCacheItem(key: CacheKey, value: string): void {
  if (typeof window !== 'undefined' && value) {
    window.localStorage.setItem(key, value);
  }
}

export function unsetCacheItem(key: string): void {
  if (typeof window !== 'undefined' && key) {
    window.localStorage.removeItem(key);
  }
}
