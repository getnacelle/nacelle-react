import { renderHook, act } from '@testing-library/react-hooks';

import { shopifyItem } from '@nacelle/react-dev-utils';
import { useCheckout } from './use-checkout';

const checkoutResponse = {
  data: {
    data: {
      processCheckout: {
        id: 'checkout-id',
        completed: false,
        url: 'https://sample-apparel.myshopify.com/12345/checkouts/checkout-id',
        source: 'Shopify'
      }
    }
  }
};

const cartItem = {
  ...shopifyItem.variant,
  productId: shopifyItem.id,
  image: shopifyItem.variant.featuredMedia,
  quantity: 1,
  tags: [],
  handle: shopifyItem.handle,
  vendor: shopifyItem.vendor,
  locale: shopifyItem.locale,
  metafields: [...shopifyItem.metafields, ...shopifyItem.variant.metafields],
  title: shopifyItem.title
};

const items = [cartItem];

const credentials = {
  nacelleSpaceId: 'my-space-id',
  nacelleGraphqlToken: 'my-graphql-token',
  nacelleEndpoint: 'https://hailfrequency.com/v3/graphql'
};

describe('useCheckout', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if credentials are missing', () => {
    const badCreds = {
      ...credentials,
      nacelleEndpoint: undefined
    };

    expect(() => renderHook(() => useCheckout(badCreds, items))).toThrow();
  });

  it('should return checkout data from hail frequency', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(checkoutResponse)
      })
    );

    const { result } = renderHook(() => useCheckout(credentials, items));
    const [, checkout] = result.current;

    expect(result.current[2]).toEqual(false);
    expect(result.current[0]).toEqual(null);

    await act(async () => {
      await checkout();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(credentials.nacelleEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Nacelle-Space-Id': credentials.nacelleSpaceId,
        'X-Nacelle-Space-Token': credentials.nacelleGraphqlToken
      },
      body: expect.any(String)
    });

    expect(result.current[2]).toEqual(false);
    expect(result.current[0]).toEqual(checkoutResponse);
  });
});
