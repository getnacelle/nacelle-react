import App from 'next/app';
import React from 'react';
import { Layout, DeviceDetector } from 'components';
import { CartProvider } from 'hooks/use-cart';
import $nacelle from 'services/nacelle.js';
import '../styles/globals.css';

function MyApp({ Component, pageProps, space }) {
  return (
    <CartProvider>
      <DeviceDetector>
        <Layout space={space}>
          <Component {...pageProps} />
        </Layout>
      </DeviceDetector>
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
