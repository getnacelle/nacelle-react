import React, { FC } from 'react';
import { CSSObject } from '@emotion/core';

import { handleShopifyImages } from './shopify';
import { handleContentfulImages } from './contentful';
import { composeStyles } from '../../utils/styles';

export type ImageFormat = 'jpg' | 'webp' | 'png' | 'jpeg' | 'pjpg';

export type ImageProps = {
  styles?: CSSObject;
  src: string;
  alt: string;
  format: ImageFormat | ImageFormat[];
  loading?: 'lazy' | 'eager';
  height?: number;
  width?: number;
};

const Image: FC<ImageProps> = ({
  src,
  alt,
  styles,
  format = 'jpg',
  loading = 'lazy',
  height,
  width,
  ...props
}) => {
  const imageFormats = Array.isArray(format) ? format : [format];
  const combinedStyles = composeStyles([styles, { height, width }]);

  return (
    <picture>
      {imageFormats.map(renderSource(src, width, height))}
      <img
        src={src}
        alt={alt}
        css={combinedStyles}
        loading={loading}
        {...props}
      />
    </picture>
  );
};

export function renderSource(
  src: string,
  width: number,
  height: number
): (format: ImageFormat, idx: number) => JSX.Element {
  return function PictureSource(format, idx) {
    const srcSet = optimizeSource(src, format, width, height);

    return (
      <source
        key={`${format}-${idx}`}
        srcSet={srcSet}
        type={`image/${format}`}
      />
    );
  };
}

export function optimizeSource(
  src: string,
  format: ImageFormat,
  width: number,
  height: number
): string {
  const cdn = getImageCdn(sanitizeUrl(src));
  const roundedWidth = width && roundToNearest50px(width);
  const roundedHeight = height && roundToNearest50px(height);

  if (cdn === 'shopify') {
    return handleShopifyImages(src, format, roundedWidth, roundedHeight);
  }

  if (cdn === 'contentful') {
    return handleContentfulImages(src, format, roundedWidth, roundedHeight);
  }

  return src;
}

function sanitizeUrl(url: string): string {
  // Remove url params
  const src = url.split('&')[0];
  const [protocol, domain] = src.split('//');

  if (protocol !== 'https:') {
    return `https://${domain}`;
  }

  return src;
}

function getImageCdn(url: string): 'shopify' | 'contentful' | 'unknown' {
  if (url.includes('cdn.shopify')) {
    return 'shopify';
  }

  if (url.includes('ctfassets.net')) {
    return 'contentful';
  }

  return 'unknown';
}

function roundToNearest50px(px: number): number {
  return Math.round(px / 50) * 50;
}

export default Image;