import { ImageFormat } from './Image';

export function splitContentfulSrc(src: string): string[] {
  const [baseWithExt, args = ''] = src.split('?');
  const [extension] = Array.from(baseWithExt.split('.')).reverse();
  const [base] = baseWithExt.split(`.${extension}`);

  return [base, args, extension];
}

export function formatContentfulUrl(src: string, format: ImageFormat): string {
  const [base, args, extension] = splitContentfulSrc(src);
  const imgFormat = format === 'jpeg' ? 'jpg' : format;

  if (imgFormat === extension) {
    // return the original image if not being converted to a possible extension
    return `${base}.${extension}`;
  }

  const newArgs = args
    .split('&')
    .filter((el) => !el.includes('fl='))
    .filter((el) => !el.includes('fm='))
    .join('&');

  const argsString = newArgs ? `${newArgs}&` : '';

  switch (imgFormat) {
    case 'pjpg':
      return `${base}.${extension}?${argsString}fm=jpg&fl=progressive`;
    case 'png':
    case 'jpg':
    case 'webp':
    default:
      return `${base}.${extension}?${argsString}fm=${imgFormat}`;
  }
}

export function handleContentfulImages(
  src: string,
  format: ImageFormat,
  width?: number,
  height?: number
): string {
  const imageSrc = formatContentfulUrl(src, format);

  if (!width && !height) {
    return imageSrc;
  }

  const [base, args, extension] = splitContentfulSrc(imageSrc);
  const sizeString = createContentfulDimensions(width, height);
  const newArgs = args
    ? args
        .split('&')
        .filter((el) => !el.includes('width='))
        .join('&')
        .concat(`&${sizeString}`)
    : sizeString;

  return newArgs
    ? base.concat(`.${extension}?${newArgs}`)
    : base.concat(`.${extension}`);
}

export function createContentfulDimensions(
  width?: number,
  height?: number
): string {
  if (width && height) {
    return `w=${width}&h=${height}`;
  }

  if (width && !height) {
    return `w=${width}`;
  }

  return `h=${height}`;
}
