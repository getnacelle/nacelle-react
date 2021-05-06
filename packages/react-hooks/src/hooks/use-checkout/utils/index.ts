import { GraphQLRequestParams } from '../use-checkout.types';

export async function hailFrequencyRequest({
  credentials,
  query,
  variables
}: GraphQLRequestParams) {
  const response: Response = await fetch(credentials.nacelleEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Nacelle-Space-Id': credentials.nacelleSpaceId,
      'X-Nacelle-Space-Token': credentials.nacelleGraphqlToken
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  return response;
}

export function getCacheBoolean(key: string): boolean {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item) as boolean;
    }

    return false;
  }

  return false;
}

export function getCacheString(key: string): string {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);

    if (item) {
      return item;
    }

    return '';
  }

  return '';
}

export function setCacheItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && value) {
    window.localStorage.setItem(key, value);
  }
}

export function unsetCacheItem(key: string): void {
  if (typeof window !== 'undefined' && key) {
    window.localStorage.removeItem(key);
  }
}
