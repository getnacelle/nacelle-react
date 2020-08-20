import {
  splitContentfulSrc,
  formatContentfulUrl,
  handleContentfulImages,
  createContentfulDimensions
} from './contentful';

const CONTENTFUL_JPEG =
  '//images.ctfassets.net/iojm91u4ez5c/2zULnyYyCGeM4fly3hsLLS/edf1f558194af5e6184547bffe39f00c/mens-fashion-in-restaurant-booth.jpg';

describe('Image/Contentful Helpers', () => {
  describe('splitContentfulSrc()', () => {
    it('should split a contentful image url into its base, args, and the image extension', () => {
      const result = splitContentfulSrc(`${CONTENTFUL_JPEG}?fm=webp`);
      expect(result).toEqual([
        '//images.ctfassets.net/iojm91u4ez5c/2zULnyYyCGeM4fly3hsLLS/edf1f558194af5e6184547bffe39f00c/mens-fashion-in-restaurant-booth',
        'fm=webp',
        'jpg'
      ]);
    });
  });

  describe('formatContentfulUrl()', () => {
    it('should return the original src if the format is the same as the current image', () => {
      const result = formatContentfulUrl(`${CONTENTFUL_JPEG}?fm=webp`, 'jpg');
      expect(result).toEqual(CONTENTFUL_JPEG);
    });

    it('should return a progressive url if the image is a pjpg', () => {
      const result = formatContentfulUrl(`${CONTENTFUL_JPEG}?fm=webp`, 'pjpg');
      expect(result).toEqual(`${CONTENTFUL_JPEG}?fm=jpg&fl=progressive`);
    });

    it('should return a format string for png, jpg, and webp', () => {
      const result = formatContentfulUrl(`${CONTENTFUL_JPEG}?fm=webp`, 'png');
      expect(result).toEqual(`${CONTENTFUL_JPEG}?fm=png`);
    });
  });

  describe('handleContentfulImages()', () => {
    it('should return a re-formatted source image url if there is no height or width', () => {
      const result = handleContentfulImages(
        `${CONTENTFUL_JPEG}?fm=webp`,
        'png'
      );
      expect(result).toEqual(`${CONTENTFUL_JPEG}?fm=png`);
    });

    it('should return a string with image dimensions and the original args', () => {});

    it('should return a string with mage dimensions', () => {});
  });

  describe('createContentfulDimensions()', () => {
    it('should return a string with width x height', () => {
      const result = createContentfulDimensions(200, 100);
      expect(result).toEqual('w=200&h=100');
    });

    it('should return a string with width when there is no height', () => {
      const result = createContentfulDimensions(200);
      expect(result).toEqual('w=200');
    });

    it('should return a string with height when there is no width', () => {
      const result = createContentfulDimensions(null, 100);
      expect(result).toEqual('h=100');
    });
  });
});
