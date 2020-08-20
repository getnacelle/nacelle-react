import React from 'react';
import { render, screen } from '@testing-library/react';

import Image, { ImageProps } from './Image';

const CONTENTFUL_JPEG =
  '//images.ctfassets.net/iojm91u4ez5c/2zULnyYyCGeM4fly3hsLLS/edf1f558194af5e6184547bffe39f00c/mens-fashion-in-restaurant-booth.jpg';
const SHOPIFY_JPG =
  'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse.jpg?v=1587622578';
const OTHER_IMAGE =
  'https://images.unsplash.com/photo-1509005084666-3cbc75184cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80';

function setupImage(props: ImageProps) {
  render(<Image {...props} />);

  const image = screen.getByRole('img');
  const picture = screen.getByTestId('pic');
  // screen.debug();
  return { image, picture };
}

const props = {
  alt: 'test image',
  testId: 'pic'
};

describe('Image', () => {
  it('should optimize an image from the contentful cdn', () => {
    const { image, picture } = setupImage({
      src: CONTENTFUL_JPEG,
      format: 'jpg',
      width: 400,
      ...props
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', CONTENTFUL_JPEG);
    expect(picture).toBeInTheDocument();
    expect(picture.children.length).toEqual(2);
    expect(picture.firstChild).toHaveAttribute(
      'srcset',
      `${CONTENTFUL_JPEG}?w=400`
    );
    expect(picture.firstChild).toHaveAttribute('type', 'image/jpg');
  });

  it('should optimize an image from the shpoify cdn', () => {
    const { image, picture } = setupImage({
      src: SHOPIFY_JPG,
      format: 'webp',
      width: 400,
      height: 200,
      ...props
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', SHOPIFY_JPG);
    expect(picture).toBeInTheDocument();
    expect(picture.children.length).toEqual(2);
    expect(picture.firstChild).toHaveAttribute(
      'srcset',
      'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/over-the-shoulder-pink-purse_400x200.jpg?v=1587622578&format=webp'
    );
    expect(picture.firstChild).toHaveAttribute('type', 'image/webp');
  });

  it('should handle an image that is from an unknown cdn', () => {
    const { image, picture } = setupImage({
      src: OTHER_IMAGE,
      format: 'jpg',
      width: 400,
      ...props
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', OTHER_IMAGE);
    expect(picture).toBeInTheDocument();
    expect(picture.children.length).toEqual(2);
    expect(picture.firstChild).toHaveAttribute('srcset', OTHER_IMAGE);
    expect(picture.firstChild).toHaveAttribute('type', 'image/jpg');
  });
});
