import { shopifyItem } from '@nacelle/react-dev-utils';

import cartReducer, {
  initialState,
  formatCartItem,
  ADD_TO_CART,
  UPDATE_ITEM,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  TOGGLE_CART,
  SET_CHECKOUT_STATUS
} from './use-cart.reducer';

describe('useCart reducer', () => {
  describe(`${ADD_TO_CART}`, () => {
    it('should append an item to the cart', () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: shopifyItem
      });
      expect(result.cart).toEqual([formatCartItem(shopifyItem)]);
    });

    it(`should include a product's metafields when added to the cart`, () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: shopifyItem
      });
      expect(result.cart[0]).toHaveProperty('metafields');

      const metafieldKeys = result.cart[0].metafields.map((m) => m.key);
      expect(metafieldKeys).toContain('shipping_interval_frequency');
    });

    it('should increment the quantity if the item is already in the cart', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)]
      };

      const result = cartReducer(cartState, {
        type: ADD_TO_CART,
        payload: shopifyItem
      });

      expect(result.cart).toEqual([
        { ...formatCartItem(shopifyItem), quantity: 2 }
      ]);
    });

    it('should add to item localStorage cart', () => {
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

      cartReducer(
        { ...initialState, useLocalStorage: true },
        {
          type: ADD_TO_CART,
          payload: shopifyItem
        }
      );
      expect(JSON.parse(window.localStorage.getItem('cart'))).toEqual([
        formatCartItem(shopifyItem)
      ]);
    });
  });
  describe(`${UPDATE_ITEM}`, () => {
    it('should update some values of an item in the cart', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)]
      };
      const result = cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: { ...shopifyItem, title: 'Updated Title', quantity: 10 }
      });
      expect(result.cart).toEqual([
        { ...formatCartItem(shopifyItem), title: 'Updated Title', quantity: 10 }
      ]);
    });
    it('should update some values of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)],
        useLocalStorage: true
      };
      cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: { ...shopifyItem, title: 'Updated Title', quantity: 10 }
      });
      expect(JSON.parse(window.localStorage.getItem('cart'))).toEqual([
        { ...formatCartItem(shopifyItem), title: 'Updated Title', quantity: 10 }
      ]);
    });
  });
  describe(`${REMOVE_FROM_CART}`, () => {
    it('should remove an item from the cart', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)]
      };

      const result = cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: shopifyItem
      });

      expect(result.cart).toEqual([]);
    });

    it('should remove an item from localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)],
        useLocalStorage: true
      };

      cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: shopifyItem
      });

      expect(JSON.parse(window.localStorage.getItem('cart'))).toEqual([]);
    });
  });

  describe(`${INCREMENT_ITEM}`, () => {
    it('should increment the quantity of an item', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)]
      };

      const result = cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: shopifyItem
      });

      expect(result.cart).toEqual([
        { ...formatCartItem(shopifyItem), quantity: 2 }
      ]);
    });

    it('should increment the quantity of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [formatCartItem(shopifyItem)],
        useLocalStorage: true
      };

      cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: shopifyItem
      });

      expect(JSON.parse(window.localStorage.getItem('cart'))).toEqual([
        { ...formatCartItem(shopifyItem), quantity: 2 }
      ]);
    });
  });

  describe(`${DECREMENT_ITEM}`, () => {
    it('should decrement the quantity of an item', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...formatCartItem(shopifyItem), quantity: 2 }]
      };

      const result = cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: shopifyItem
      });

      expect(result.cart).toEqual([
        { ...formatCartItem(shopifyItem), quantity: 1 }
      ]);
    });

    it('should not decrement the quantity below 0', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...formatCartItem(shopifyItem), quantity: 0 }]
      };

      const result = cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: shopifyItem
      });

      expect(result.cart).toEqual([
        { ...formatCartItem(shopifyItem), quantity: 0 }
      ]);
    });

    it('should decrement the quantity of an item in localStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...formatCartItem(shopifyItem), quantity: 2 }],
        useLocalStorage: true
      };

      cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: shopifyItem
      });

      expect(JSON.parse(window.localStorage.getItem('cart'))).toEqual([
        { ...formatCartItem(shopifyItem), quantity: 1 }
      ]);
    });
  });

  describe(`${CLEAR_CART}`, () => {
    it('should remove all items from the cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...formatCartItem(shopifyItem), quantity: 2 }]
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

  describe(`${SET_CHECKOUT_STATUS}`, () => {
    it('should set the checkoutId and complete status for the cart', () => {
      const result = cartReducer(initialState, {
        type: SET_CHECKOUT_STATUS,
        payload: { checkoutId: 'my-checkout-id', checkoutComplete: true }
      });

      expect(result.checkoutId).toEqual('my-checkout-id');
      expect(result.checkoutComplete).toEqual(true);
    });
  });
});
