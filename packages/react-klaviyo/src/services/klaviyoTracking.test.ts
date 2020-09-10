import klaviyoTracking from './klaviyoTracking';
import { shopifyItem } from '../shared/product.fixtures';

const klaviyoQueueMock = {
  push: jest.fn(),
  account: jest.fn(),
  cookieDomain: jest.fn(),
  identify: jest.fn(),
  track: jest.fn()
};

const customer = {
  $email: 'bruce@notbatman.com'
};

describe('Klaviyo Tracking Service', () => {
  describe('trackEvent()', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should be a no-op if there is no window', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(() => undefined);

      const result = klaviyoTracking.trackEvent('identify', customer);

      expect(result).toBeNull();
    });

    it('should be a no-op if Klaviyo has not loaded', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(
        () =>
          <any>{
            _learnq: undefined
          }
      );

      const result = klaviyoTracking.trackEvent('identify', customer);

      expect(result).toBeNull();
    });

    it('should push events to the Klaviyo queue', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(
        () =>
          <any>{
            _learnq: klaviyoQueueMock
          }
      );

      const result = klaviyoTracking.trackEvent('identify', customer);

      expect(klaviyoQueueMock.push).toHaveBeenCalledTimes(1);
      expect(klaviyoQueueMock.push).toHaveBeenCalledWith([
        'identify',
        customer
      ]);
      expect(result).toBeUndefined();
    });
  });

  describe('viewedProduct()', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should track a viewed product event', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(
        () =>
          <any>{
            _learnq: klaviyoQueueMock,
            location: {
              origin: 'http://example.com'
            }
          }
      );

      const result = klaviyoTracking.viewedProduct(shopifyItem);

      const klaviyoItem = {
        Name: shopifyItem.title,
        ProductID: '4915654230151',
        Categories: shopifyItem.tags,
        ImageURL: shopifyItem.featuredMedia.src,
        URL: `http://example.com/products/${shopifyItem.handle}`,
        Brand: shopifyItem.vendor,
        Price: shopifyItem.priceRange.max,
        CompareAtPrice: null
      };

      expect(klaviyoQueueMock.push).toHaveBeenCalledTimes(1);
      expect(klaviyoQueueMock.push).toHaveBeenCalledWith([
        'track',
        'Viewed Product',
        klaviyoItem
      ]);
      expect(result).toBeUndefined();
    });
  });

  describe('addedToCart()', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should track an add to cart event', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(
        () =>
          <any>{
            _learnq: klaviyoQueueMock,
            location: {
              origin: 'http://example.com'
            }
          }
      );

      const result = klaviyoTracking.addedToCart(shopifyItem);

      const klaviyoItem = {
        Name: shopifyItem.title,
        ProductID: shopifyItem.variant.id,
        Categories: shopifyItem.tags,
        ImageURL: shopifyItem.featuredMedia.src,
        URL: `http://example.com/products/${shopifyItem.handle}`,
        Brand: shopifyItem.vendor,
        Price: shopifyItem.variant.price,
        CompareAtPrice: shopifyItem.variant.compareAtPrice
      };

      expect(klaviyoQueueMock.push).toHaveBeenCalledTimes(1);
      expect(klaviyoQueueMock.push).toHaveBeenCalledWith([
        'track',
        'Added to Cart',
        klaviyoItem
      ]);
      expect(result).toBeUndefined();
    });
  });

  describe('setCustomer()', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should be a no-op if there is no customer e-mail', () => {
      const result = klaviyoTracking.setCustomer({});
      expect(result).toBeNull();
    });

    it('should track a customer by email', () => {
      const windowSpy = jest.spyOn(global, 'window', 'get');
      windowSpy.mockImplementation(
        () =>
          <any>{
            _learnq: klaviyoQueueMock
          }
      );

      const browserCustomer = { email: 'bruce@notbatman.com' };
      const result = klaviyoTracking.setCustomer(browserCustomer);

      expect(klaviyoQueueMock.push).toHaveBeenCalledTimes(1);
      expect(klaviyoQueueMock.push).toHaveBeenCalledWith([
        'identify',
        customer
      ]);
      expect(result).toBeUndefined();
    });
  });
});
