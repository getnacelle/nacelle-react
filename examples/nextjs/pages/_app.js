import App from 'next/app';
import React from 'react';
import { Global } from '@emotion/core';
import { CartProvider } from '@nacelle/react-hooks';

import Layout from 'components/Layout';
import $nacelle from 'services/nacelle.js';
import * as styles from 'styles/global.styles';

function MyApp({ Component, pageProps, space }) {
  return (
    <CartProvider useLocalStorage>
      <Global styles={styles.global} />
      <Layout space={space}>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}

export default MyApp;
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const space = await $nacelle.data.space();
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, space };
};
