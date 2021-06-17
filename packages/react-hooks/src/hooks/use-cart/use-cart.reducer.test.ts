import { shopifyItem } from '@nacelle/react-dev-utils';

const cartItem = {
  product: shopifyItem,
  variant: shopifyItem?.variants ? shopifyItem.variants[0] : { id: '12345' },
  quantity: 1
};

import cartReducer, {
  initialState,
  ADD_TO_CART,
  UPDATE_ITEM,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  TOGGLE_CART
} from './use-cart.reducer';

describe('useCart reducer', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    const storageMock = () => {
      let store: any = {};
      return {
        getItem: (key: string) => {
          return store[key];
        },
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        clear: () => {
          store = {};
        },
        removeItem: (key: string) => {
          delete store[key];
        }
      };
    };

    Object.defineProperty(window, 'sessionStorage', {
      value: storageMock()
    });

    Object.defineProperty(window, 'localStorage', {
      value: storageMock()
    });
  });

  describe(`${ADD_TO_CART}`, () => {
    it('should append an item to the cart', () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });
      expect(result.cart).toEqual([cartItem]);
    });

    it(`should include a product's metafields when added to the cart`, () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });
      expect(result.cart[0].product).toHaveProperty('metafields');

      const metafieldKeys = result.cart[0].product.metafields?.map(
        (m) => m.key
      );
      expect(metafieldKeys).toContain('shipping_interval_frequency');
    });

    it('should increment the quantity if the item is already in the cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      const result = cartReducer(cartState, {
        type: ADD_TO_CART,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([{ ...cartItem, quantity: 2 }]);
    });

    it('should add to item localStorage cart', () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem,
          storage: 'local',
          cacheKey: 'cart'
        }
      );
      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        [cartItem]
      );
    });

    it('should add to item sessionStorage cart', () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem,
          storage: 'session',
          cacheKey: 'cart'
        }
      );
      expect(
        JSON.parse(window.sessionStorage.getItem('cart') as string)
      ).toEqual([cartItem]);
    });

    it('should add to item localStorage cart using custom cacheKey', () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem,
          storage: 'local',
          cacheKey: 'new-cart'
        }
      );
      expect(
        JSON.parse(window.localStorage.getItem('new-cart') as string)
      ).toEqual([cartItem]);
    });

    it('should add to item sessionStorage cart using custom cacheKey', () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem,
          storage: 'session',
          cacheKey: 'new-cart'
        }
      );
      expect(
        JSON.parse(window.sessionStorage.getItem('new-cart') as string)
      ).toEqual([cartItem]);
    });
  });

  describe(`${UPDATE_ITEM}`, () => {
    it('should update some values of an item in the cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      const result = cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: {
          ...cartItem,
          quantity: 10,
          product: {
            ...cartItem.product,
            title: 'Updated Title'
          }
        },
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([
        {
          ...cartItem,
          quantity: 10,
          product: { ...cartItem.product, title: 'Updated Title' }
        }
      ]);
    });

    it('should update only the values of the target item in the cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem, { ...cartItem, variant: { id: '2' } }]
      };

      const result = cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: {
          ...cartItem,
          quantity: 10,
          product: {
            ...cartItem.product,
            title: 'Updated Title'
          }
        },
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([
        {
          ...cartItem,
          quantity: 10,
          product: { ...cartItem.product, title: 'Updated Title' }
        },
        { ...cartItem, variant: { id: '2' } }
      ]);
    });

    it('should update some values of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };
      cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: {
          ...cartItem,
          product: {
            ...cartItem.product,
            title: 'Updated Title'
          },
          quantity: 10
        },
        storage: 'local',
        cacheKey: 'cart'
      });

      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        [
          {
            ...cartItem,
            quantity: 10,
            product: { ...cartItem.product, title: 'Updated Title' }
          }
        ]
      );
    });

    it('should update only the values of the target item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem, { ...cartItem, variant: { id: '2' } }]
      };
      cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: {
          ...cartItem,
          product: {
            ...cartItem.product,
            title: 'Updated Title'
          },
          quantity: 10
        },
        storage: 'local',
        cacheKey: 'cart'
      });

      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        [
          {
            ...cartItem,
            quantity: 10,
            product: { ...cartItem.product, title: 'Updated Title' }
          },
          { ...cartItem, variant: { id: '2' } }
        ]
      );
    });

    it('should update some values of an item in sessionStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };
      cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: {
          ...cartItem,
          product: {
            ...cartItem.product,
            title: 'Updated Title'
          },
          quantity: 10
        },
        storage: 'session',
        cacheKey: 'cart'
      });

      expect(
        JSON.parse(window.sessionStorage.getItem('cart') as string)
      ).toEqual([
        {
          ...cartItem,
          quantity: 10,
          product: { ...cartItem.product, title: 'Updated Title' }
        }
      ]);
    });
  });

  describe(`${REMOVE_FROM_CART}`, () => {
    it('should remove an item from the cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      const result = cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([]);
    });

    it('should remove an item from localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: cartItem,
        storage: 'local',
        cacheKey: 'cart'
      });

      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        []
      );
    });

    it('should remove an item from sessionStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: cartItem,
        storage: 'session',
        cacheKey: 'cart'
      });

      expect(
        JSON.parse(window.sessionStorage.getItem('cart') as string)
      ).toEqual([]);
    });
  });

  describe(`${INCREMENT_ITEM}`, () => {
    it('should increment the quantity of an item', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      const result = cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([
        { ...cartItem, quantity: cartItem.quantity + 1 }
      ]);
    });

    it('should increment the quantity of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: cartItem,
        storage: 'local',
        cacheKey: 'cart'
      });

      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        [{ ...cartItem, quantity: 2 }]
      );
    });

    it('should increment the quantity of an item in sessionStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: cartItem,
        storage: 'session',
        cacheKey: 'cart'
      });

      expect(
        JSON.parse(window.sessionStorage.getItem('cart') as string)
      ).toEqual([{ ...cartItem, quantity: 2 }]);
    });
  });

  describe(`${DECREMENT_ITEM}`, () => {
    it('should decrement the quantity of an item', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }]
      };

      const result = cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([{ ...cartItem, quantity: 1 }]);
    });

    it('should remove an item from the cart when its quantity is decremented to 0', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 1 }]
      };

      const result = cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem,
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([]);
    });

    it('should decrement the quantity of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }]
      };

      cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem,
        storage: 'local',
        cacheKey: 'cart'
      });

      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        [{ ...cartItem, quantity: 1 }]
      );
    });

    it('should decrement the quantity of an item in sessionStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }]
      };

      cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem,
        storage: 'session',
        cacheKey: 'cart'
      });

      expect(
        JSON.parse(window.sessionStorage.getItem('cart') as string)
      ).toEqual([{ ...cartItem, quantity: 1 }]);
    });
  });

  describe(`${CLEAR_CART}`, () => {
    it('should remove all items from the cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }]
      };

      const result = cartReducer(cartState, {
        type: CLEAR_CART,
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([]);
    });
  });

  describe(`${TOGGLE_CART}`, () => {
    it('should toggle the show status of the cart', () => {
      const result = cartReducer(initialState, { type: TOGGLE_CART });
      expect(result.show).toEqual(true);

      const newResult = cartReducer(result, { type: TOGGLE_CART });
      expect(newResult.show).toEqual(false);
    });
  });
});

export default {};
