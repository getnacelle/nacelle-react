import * as React from 'react';
import { Global } from '@emotion/core';
import { CartProvider, CheckoutProvider } from '@nacelle/react-hooks';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';
import { ProductSearchProvider } from 'providers/ProductSearch';
import Layout from 'components/Layout';
import * as styles from 'styles/global.styles';

const checkoutClient = createShopifyCheckoutClient({
  storefrontCheckoutToken: process.env.GATSBY_SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  myshopifyDomain: process.env.GATSBY_MYSHOPIFY_DOMAIN,
  storefrontApiVersion: process.env.GATSBY_STOREFRONT_API_VERSION
});

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);

export const wrapRootElement = ({ element }) => (
  <CartProvider>
    <CheckoutProvider checkoutClient={checkoutClient}>
      <Global styles={styles.global} />
      <ProductSearchProvider>{element}</ProductSearchProvider>
    </CheckoutProvider>
  </CartProvider>
);
