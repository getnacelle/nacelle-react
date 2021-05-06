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

    const localStorageMock = (() => {
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
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  describe(`${ADD_TO_CART}`, () => {
    it('should append an item to the cart', () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: cartItem
      });
      expect(result.cart).toEqual([cartItem]);
    });

    it(`should include a product's metafields when added to the cart`, () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: cartItem
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
        payload: cartItem
      });

      expect(result.cart).toEqual([{ ...cartItem, quantity: 2 }]);
    });

    it('should add to item localStorage cart', () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem
        }
      );
      expect(
        JSON.parse(window.localStorage.getItem('cart') as string)
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
        }
      });

      expect(result.cart).toEqual([
        {
          ...cartItem,
          quantity: 10,
          product: { ...cartItem.product, title: 'Updated Title' }
        }
      ]);
    });

    it('should update some values of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem],
        useLocalStorage: true
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
        }
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
  });

  describe(`${REMOVE_FROM_CART}`, () => {
    it('should remove an item from the cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      const result = cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: cartItem
      });

      expect(result.cart).toEqual([]);
    });

    it('should remove an item from localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem],
        useLocalStorage: true
      };

      cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: cartItem
      });

      expect(JSON.parse(window.localStorage.getItem('cart') as string)).toEqual(
        []
      );
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
        payload: cartItem
      });

      expect(result.cart).toEqual([
        { ...cartItem, quantity: cartItem.quantity + 1 }
      ]);
    });

    it('should increment the quantity of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem],
        useLocalStorage: true
      };

      cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: cartItem
      });

      expect(
        JSON.parse(window.localStorage.getItem('cart') as string)
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
        payload: cartItem
      });

      expect(result.cart).toEqual([{ ...cartItem, quantity: 1 }]);
    });

    it('should not decrement the quantity below 0', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 0 }]
      };

      const result = cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem
      });

      expect(result.cart).toEqual([{ ...cartItem, quantity: 0 }]);
    });

    it('should decrement the quantity of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }],
        useLocalStorage: true
      };

      cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem
      });

      expect(
        JSON.parse(window.localStorage.getItem('cart') as string)
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
        type: CLEAR_CART
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
