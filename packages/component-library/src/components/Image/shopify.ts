import { ImageFormat } from './Image';

export function formatShopifyUrl(src: string, format: ImageFormat): string {
  const [imageUrl] = src.split('?v=');
  const extension = imageUrl.split('.').pop();

  return extension === 'jpg' || extension === 'png'
    ? src.split('&format=')[0].concat(`&format=${format}`)
    : src;
}

export function createShopifyDimensions(width: number, height: number): string {
  if (width && height) {
    return `_${width}x${height}`;
  }

  if (width && !height) {
    return `_${width}x`;
  }

  return `_x${height}`;
}

export function handleShopifyImages(
  src: string,
  format: ImageFormat,
  width: number,
  height: number
): string {
  const imageSrc = formatShopifyUrl(src, format);

  if (!width && !height) {
    return imageSrc;
  }

  const [baseWithExt, args] = src.split('?');
  const [extension] = Array.from(baseWithExt.split('.')).reverse();
  const [base] = baseWithExt.split(`.${extension}`);

  const newSizeString = createShopifyDimensions(width, height);
  const newBase = base.concat(newSizeString);

  const newArgs = args
    ? args.split('&').filter((el) => !el.includes('width='))
    : [];

  const newSrc = newBase.concat(`.${extension}?${newArgs.join('&')}`);

  return newSrc;
}
