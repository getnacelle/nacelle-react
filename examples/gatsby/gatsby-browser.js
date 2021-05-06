import * as React from 'react';
import { Global } from '@emotion/core';
import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks';
import { ProductSearchProvider } from 'providers/ProductSearch';
import Layout from 'components/Layout';
import * as styles from 'styles/global.styles';

const checkoutCredentials = {
  nacelleSpaceId: process.env.GATSBY_NACELLE_SPACE_ID,
  nacelleGraphqlToken: process.env.GATSBY_NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.GATSBY_NACELLE_ENDPOINT
};

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider useLocalStorage>
    <CheckoutProvider credentials={checkoutCredentials}>
      <Global styles={styles.global} />
      <ProductSearchProvider>{element}</ProductSearchProvider>
    </CheckoutProvider>
  </CartProvider>
);
