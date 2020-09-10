import App from 'next/app';
import React from 'react';
import { Global } from '@emotion/core';
import { CartProvider } from '@nacelle/react-hooks';

import Layout from 'components/Layout';
import $nacelle from 'services/nacelle.js';
import { ProductSearchProvider } from 'providers/ProductSearch';
import * as styles from 'styles/global.styles';

function MyApp({ Component, pageProps, space, products }) {
  return (
    <CartProvider useLocalStorage>
      <Global styles={styles.global} />
      <ProductSearchProvider products={products}>
        <Layout space={space}>
          <Component {...pageProps} />
        </Layout>
      </ProductSearchProvider>
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
