import React from 'react';
import { Story, Meta } from '@storybook/react';

import Image, { ImageProps } from './Image';

const CONTENTFUL_IMAGE =
  '//images.ctfassets.net/iojm91u4ez5c/x5mUMZYBI2t5imSjyzdyK/9b0a8330334c78e669e84c39793635d1/pexels-photo-3082716.jpeg';
const SHOPIFY_IMAGE =
  'https://cdn.shopify.com/s/files/1/0344/4362/4583/products/pexels-photo-2044228.jpg?v=1587622955';
const OTHER_IMAGE =
  'https://images.unsplash.com/photo-1509005084666-3cbc75184cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1012&q=80';

const story: Meta = {
  title: 'Components/Image',
  component: Image
};

const Template: Story<ImageProps> = (args) => <Image {...args} />;

export const Shopify = Template.bind({});
Shopify.args = {
  src: SHOPIFY_IMAGE,
  alt: 'shopify',
  format: 'jpg',
  width: 512
};

export const Contentful = Template.bind({});
Contentful.args = {
  src: CONTENTFUL_IMAGE,
  alt: 'contentful',
  format: ['webp', 'jpeg'],
  width: 527
};

export const Other = Template.bind({});
Other.args = {
  src: OTHER_IMAGE,
  alt: 'other',
  format: 'jpeg',
  height: 402
};

export default story;
