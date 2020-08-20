import {
  formatShopifyUrl,
  createShopifyDimensions,
  handleShopifyImages
} from './shopify';

const SHOPIFY_JPG =
  'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578';

describe('Image/Shopify Helpers', () => {
  describe('formatShopifyUrl', () => {
    it('should return a formatted image url for jpgs and pngs', () => {
      const result = formatShopifyUrl(SHOPIFY_JPG, 'webp');
      expect(result).toEqual(
        'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578&format=webp'
      );
    });

    it('should return the original src url if the image is not a jpg or png', () => {
      const webpUrl = SHOPIFY_JPG.replace('.jpg', '.webp');

      const result = formatShopifyUrl(webpUrl, 'jpg');
      expect(result).toEqual(webpUrl);
    });
  });

  describe('createShopifyDimensions', () => {
    it('should return a string with width x height', () => {
      const result = createShopifyDimensions(200, 100);
      expect(result).toEqual('_200x100');
    });

    it('should return a string with width when there is no height', () => {
      const result = createShopifyDimensions(200);
      expect(result).toEqual('_200x');
    });

    it('should return a string with height when there is no width', () => {
      const result = createShopifyDimensions(null, 100);
      expect(result).toEqual('_x100');
    });
  });

  describe('handleShopifyImages()', () => {
    it('should return a formatted image url if there are no width & height', () => {
      const result = handleShopifyImages(SHOPIFY_JPG, 'webp');
      expect(result).toEqual(`${SHOPIFY_JPG}&format=webp`);
    });

    it('should create a resized image url', () => {
      const result = handleShopifyImages(SHOPIFY_JPG, 'webp', 200, 100);
      expect(result).toEqual(
        'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse_200x100.jpg?v=1587622578&format=webp'
      );
    });
  });
});
