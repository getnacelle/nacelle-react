import { shopifyItem } from '@nacelle/react-dev-utils';
import { set, del } from 'idb-keyval';

const cartItem = {
  product: shopifyItem,
  variant: shopifyItem?.variants ? shopifyItem.variants[0] : { id: '12345' },
  quantity: 1
};
const cartItems = [
  {
    product: shopifyItem,
    variant: shopifyItem?.variants ? shopifyItem.variants[0] : { id: '12345' },
    quantity: 1
  },
  {
    product: shopifyItem,
    variant: shopifyItem?.variants ? shopifyItem.variants[1] : { id: '23456' },
    quantity: 1
  }
];

import cartReducer, {
  initialState,
  INIT_CART,
  ADD_TO_CART,
  UPDATE_ITEM,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  TOGGLE_CART
} from './use-cart.reducer';

jest.mock('idb-keyval');
const mockedSet = set as jest.Mocked<typeof set>;
const mockedDel = del as jest.Mocked<typeof del>;

describe('useCart reducer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.mock('idb-keyval');

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

  describe(`${INIT_CART}`, () => {
    it('should initialize cart with payload items', () => {
      const result = cartReducer(initialState, {
        type: INIT_CART,
        payload: cartItems,
        storage: 'idb',
        cacheKey: 'cart'
      });
      expect(result.cart).toEqual(cartItems);
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

    it('should add to item idbStorage cart', () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem,
          storage: 'idb',
          cacheKey: 'cart'
        }
      );
      expect(mockedSet).toHaveBeenCalledTimes(1);
      expect(mockedSet).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([cartItem])
      );
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

    it('should add to item idbStorage cart using custom cacheKey', async () => {
      cartReducer(
        { ...initialState },
        {
          type: ADD_TO_CART,
          payload: cartItem,
          storage: 'idb',
          cacheKey: 'new-cart'
        }
      );
      expect(mockedSet).toHaveBeenCalledTimes(1);
      expect(mockedSet).toHaveBeenCalledWith(
        'new-cart',
        JSON.stringify([cartItem])
      );
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

    it('should only update the values of a matching cart item, and not other cart items', () => {
      const secondCartItem = {
        product: {
          ...cartItem.product,
          title: 'Another Product'
        },
        variant: { id: '6789' },
        quantity: 2
      };
      const cartState = {
        ...initialState,
        cart: [cartItem, secondCartItem]
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

      expect(result.cart[0].quantity).toEqual(10);
      expect(result.cart[1].quantity).toEqual(2);

      expect(result.cart[0].product.title).toEqual('Updated Title');
      expect(result.cart[1].product.title).toEqual('Another Product');
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

    it('should only update the values of a matching cart item, and not other cart items, in the localStorage cart', () => {
      const secondCartItem = {
        product: {
          ...cartItem.product,
          title: 'Another Product'
        },
        variant: { id: '6789' },
        quantity: 2
      };
      const cartState = {
        ...initialState,
        cart: [cartItem, secondCartItem]
      };

      cartReducer(cartState, {
        type: UPDATE_ITEM,
        payload: {
          ...cartItem,
          quantity: 10,
          product: {
            ...cartItem.product,
            title: 'Updated Title'
          }
        },
        storage: 'local',
        cacheKey: 'cart'
      });

      const cart = JSON.parse(window.localStorage.getItem('cart') as string);

      expect(cart[0].quantity).toEqual(10);
      expect(cart[1].quantity).toEqual(2);

      expect(cart[0].product.title).toEqual('Updated Title');
      expect(cart[1].product.title).toEqual('Another Product');
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

    it('should update some values of an item in idbStorage cart', () => {
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
        storage: 'idb',
        cacheKey: 'cart'
      });

      expect(mockedSet).toHaveBeenCalledTimes(1);
      expect(mockedSet).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([
          {
            ...cartItem,
            quantity: 10,
            product: { ...cartItem.product, title: 'Updated Title' }
          }
        ])
      );
    });

    it('should update to a falsy value of an item in the cart', () => {
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
            title: ''
          }
        },
        storage: null,
        cacheKey: 'cart'
      });

      expect(result.cart).toEqual([
        {
          ...cartItem,
          quantity: 10,
          product: { ...cartItem.product, title: '' }
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

    it('should remove an item from idbStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      cartReducer(cartState, {
        type: REMOVE_FROM_CART,
        payload: cartItem,
        storage: 'idb',
        cacheKey: 'cart'
      });

      expect(mockedSet).toHaveBeenCalledTimes(1);
      expect(mockedSet).toHaveBeenCalledWith('cart', JSON.stringify([]));
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

    it('should increment the quantity of an item in idbStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [cartItem]
      };

      cartReducer(cartState, {
        type: INCREMENT_ITEM,
        payload: cartItem,
        storage: 'idb',
        cacheKey: 'cart'
      });

      expect(mockedSet).toHaveBeenCalledTimes(1);
      expect(mockedSet).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([{ ...cartItem, quantity: 2 }])
      );
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

    it('should decrement the quantity of an item in idbStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }]
      };

      cartReducer(cartState, {
        type: DECREMENT_ITEM,
        payload: cartItem,
        storage: 'idb',
        cacheKey: 'cart'
      });

      expect(mockedSet).toHaveBeenCalledTimes(1);
      expect(mockedSet).toHaveBeenCalledWith(
        'cart',
        JSON.stringify([{ ...cartItem, quantity: 1 }])
      );
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

    it('should remove all items from the idbStorage cart', () => {
      const cartState = {
        ...initialState,
        cart: [{ ...cartItem, quantity: 2 }]
      };

      cartReducer(cartState, {
        type: CLEAR_CART,
        storage: 'idb',
        cacheKey: 'cart'
      });

      expect(mockedDel).toHaveBeenCalledTimes(1);
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
