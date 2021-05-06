import App from 'next/app';
import React from 'react';
import { Global } from '@emotion/core';
import { CartProvider } from '@nacelle/react-hooks';
import { CheckoutProvider } from '@nacelle/react-hooks';

import Layout from 'components/Layout';
import $nacelle from 'services/nacelle.js';
import { ProductSearchProvider } from 'providers/ProductSearch';
import * as styles from 'styles/global.styles';

const checkoutCredentials = {
  nacelleSpaceId: process.env.NACELLE_SPACE_ID,
  nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.NACELLE_ENDPOINT
};

function MyApp({ Component, pageProps, space, products }) {
  return (
    <CartProvider useLocalStorage>
      <CheckoutProvider credentials={checkoutCredentials}>
        <Global styles={styles.global} />
        <ProductSearchProvider products={products}>
          <Layout space={space}>
            <Component {...pageProps} />
          </Layout>
        </ProductSearchProvider>
      </CheckoutProvider>
    </CartProvider>
  );
}

export default MyApp;
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const space = await $nacelle.data.space();
  const products = await $nacelle.data.allProducts();
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, space, products };
};
