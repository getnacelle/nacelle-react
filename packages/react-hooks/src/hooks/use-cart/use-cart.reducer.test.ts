import { ShopifyItem } from './use-cart.types';
import cartReducer, {
  initialState,
  formatCartItem,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
  TOGGLE_CART,
  SET_CHECKOUT_STATUS
} from './use-cart.reducer';

const shopifyItem: ShopifyItem = {
  id: 'pepper-wood-apparel.myshopify.com::shevonne-bag::en-us',
  handle: 'shevonne-bag',
  locale: 'en-us',
  globalHandle: 'shevonne-bag::en-us',
  pimSyncSourceDomain: 'pepper-wood-apparel.myshopify.com',
  title: 'Shevonne Bag',
  description:
    '<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. </p>',
  priceRange: { min: '245.0', max: '245.0', currencyCode: 'USD' },
  availableForSale: true,
  tags: ['women'],
  media: [
    {
      id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS84NDYxNzc5MjA2Mjc5',
      thumbnailSrc:
        'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578&width=100',
      src:
        'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578',
      type: 'image',
      altText: 'Shevonne Bag'
    }
  ],
  metafields: [],
  variant: {
    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzg5Mzk4ODM2ODUxOQ==',
    title: 'Default Title',
    price: '245.0',
    priceCurrency: 'USD',
    compareAtPrice: null,
    compareAtPriceCurrency: null,
    swatchSrc: null,
    selectedOptions: [
      {
        name: 'Title',
        value: 'Default Title'
      }
    ],
    featuredMedia: {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTYyODQ4MTIzNzgyNDc=',
      thumbnailSrc:
        'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578&width=100',
      src:
        'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578',
      type: 'image',
      altText: null
    },
    sku: null,
    availableForSale: true,
    metafields: [],
    weight: null,
    weightUnit: null,
    priceRules: null
  },
  variants: [
    {
      id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMzg5Mzk4ODM2ODUxOQ==',
      title: 'Default Title',
      price: '245.0',
      priceCurrency: 'USD',
      compareAtPrice: null,
      compareAtPriceCurrency: null,
      swatchSrc: null,
      selectedOptions: [
        {
          name: 'Title',
          value: 'Default Title'
        }
      ],
      featuredMedia: {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0SW1hZ2UvMTYyODQ4MTIzNzgyNDc=',
        thumbnailSrc:
          'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578&width=100',
        src:
          'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578',
        type: 'image',
        altText: null
      },
      sku: null,
      availableForSale: true,
      metafields: [],
      weight: null,
      weightUnit: null,
      priceRules: null
    }
  ],
  indexedAt: 1597771717,
  pimSyncSource: 'shopify',
  pimSyncSourceProductId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ5MTU2NTQyMzAxNTE=',
  productType: null,
  featuredMedia: {
    id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS84NDYxNzc5MjA2Mjc5',
    thumbnailSrc:
      'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578&width=100',
    src:
      'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578',
    type: 'image',
    altText: 'Shevonne Bag'
  },
  vendor: 'Prairie Wind Apparel',
  createdAt: 1587622578
};

describe('useCart reducer', () => {
  describe(`${ADD_TO_CART}`, () => {
    it('should append an item to the cart', () => {
      const result = cartReducer(initialState, {
        type: ADD_TO_CART,
        payload: shopifyItem
      });
      expect(result.cart).toEqual([formatCartItem(shopifyItem)]);
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
