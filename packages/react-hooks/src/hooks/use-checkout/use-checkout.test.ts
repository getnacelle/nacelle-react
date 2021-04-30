import { renderHook, act } from '@testing-library/react-hooks';

import { shopifyItem } from '@nacelle/react-dev-utils';
import { useCheckout } from './use-checkout';

const checkoutResponse = {
  data: {
    processCheckout: {
      id: 'checkout-id',
      completed: false,
      url: 'https://sample-apparel.myshopify.com/12345/checkouts/checkout-id',
      source: 'Shopify'
    }
  }
};

const checkoutData = {
  checkoutId: 'checkout-id',
  checkoutComplete: false,
  checkoutUrl:
    'https://sample-apparel.myshopify.com/12345/checkouts/checkout-id',
  checkoutSource: 'Shopify'
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

const lineItems = [cartItem];

const credentials = {
  nacelleSpaceId: 'my-space-id',
  nacelleGraphqlToken: 'my-graphql-token',
  nacelleEndpoint: 'https://hailfrequency.com/v3/graphql'
};

describe('useCheckout', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(checkoutResponse)
      })
    );

    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: (key) => {
          return store[key];
        },
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        clear: () => {
          store = {};
        },
        removeItem: (key) => {
          delete store[key];
        }
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  it('should throw an error if credentials are missing', () => {
    const badCreds = {
      ...credentials,
      nacelleEndpoint: undefined
    };

    expect(() =>
      renderHook(() => useCheckout({ credentials: badCreds, lineItems }))
    ).toThrow();
  });

  it('should pass optional fields to hail frequency', async () => {
    const input = {
      cartItems: lineItems,
      metafields: [{ key: 'testingTesting', value: '123' }],
      note: 'please pack with extra bubble wrap',
      source: 'https://endofie.party/',
      discountCodes: ['2020-was-hard']
    };

    const { metafields, note, source, discountCodes } = input;

    const { result } = renderHook(() =>
      useCheckout({
        credentials,
        lineItems,
        metafields,
        note,
        source,
        discountCodes
      })
    );
    const [, { processCheckout }] = result.current;

    await act(async () => {
      await processCheckout();
    });

    const bodyCalledWith = JSON.parse(
      (global.fetch as jest.Mock).mock.calls[0][1].body
    );

    expect(bodyCalledWith.variables.input.metafields).toEqual(input.metafields);
    expect(bodyCalledWith.variables.input.note).toEqual(input.note);
    expect(bodyCalledWith.variables.input.source).toEqual(input.source);
    expect(bodyCalledWith.variables.input.discountCodes).toEqual(
      input.discountCodes
    );
  });

  it('should return checkout data from hail frequency', async () => {
    const { result } = renderHook(() =>
      useCheckout({ credentials, lineItems })
    );

    const [, { processCheckout }] = result.current;

    await act(async () => {
      await processCheckout();
    });

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
    expect(result.current[0]).toEqual(checkoutData);
  });
});
