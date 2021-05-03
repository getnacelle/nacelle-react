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

export function getCacheString(key: string): string | null {
  if (typeof window !== 'undefined') {
    const item = window.localStorage.getItem(key);

    if (item) {
      return item;
    }

    return null;
  }

  return null;
}
