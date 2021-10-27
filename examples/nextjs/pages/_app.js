import App from 'next/app';
import React from 'react';
import { Global } from '@emotion/core';
import { CartProvider } from '@nacelle/react-hooks';
import { CheckoutProvider } from '@nacelle/react-hooks';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

import Layout from 'components/Layout';
import { nacelleClient } from 'services';
import { ProductSearchProvider } from 'providers/ProductSearch';
import * as styles from 'styles/global.styles';

const checkoutClient = createShopifyCheckoutClient({
  storefrontCheckoutToken:
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  myshopifyDomain: process.env.NEXT_PUBLIC_MYSHOPIFY_DOMAIN,
  storefrontApiVersion: process.env.NEXT_PUBLIC_STOREFRONT_API_VERSION
});

function MyApp({ Component, pageProps, space, products }) {
  return (
    <CartProvider>
      <CheckoutProvider checkoutClient={checkoutClient}>
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
  const space = await nacelleClient.data.space();
  const products = await nacelleClient.data.allProducts();
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, space, products };
};
