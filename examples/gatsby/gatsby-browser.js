import * as React from 'react';
import { Global } from '@emotion/core';
import { CartProvider } from '@nacelle/react-hooks';
import { ProductSearchProvider } from 'providers/ProductSearch';
import Layout from 'components/Layout';
import * as styles from 'styles/global.styles';

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider useLocalStorage>
    <Global styles={styles.global} />
    <ProductSearchProvider>{element}</ProductSearchProvider>
  </CartProvider>
);
