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

function extractEngraveTextFromMetafields(metafields) {
  const metafield = metafields.find((m) => m.key === 'engrave');

  if (!metafield) {
    return null;
  } else {
    return metafield.value;
  }
}

function isInCart(cart, payload) {
  const idx = cart.findIndex((item) => item.variant.id === payload.variant.id);
  console.log(`IDX: ${idx}`);
  const itemIdInCart = idx > -1;
  console.log(`ITEM_ID_IN_CART: ${itemIdInCart}`);

  if (!itemIdInCart) {
    return false;
  }

  const payloadEngraveText = extractEngraveTextFromMetafields(
    payload.variant.metafields
  );
  console.log(`PAYLOAD_ENGRAVE_TEXT: ${payloadEngraveText}`);
  const itemInCartEngraveText = extractEngraveTextFromMetafields(
    cart[idx].variant.metafields
  );
  console.log(`ITEM_IN_CART_ENGRAVE_TEXT: ${itemInCartEngraveText}`);

  console.log(
    `IS_IN_CART? ${payloadEngraveText === itemInCartEngraveText}\n\n`
  );
  return payloadEngraveText === itemInCartEngraveText;
}

function MyApp({ Component, pageProps, space, products }) {
  return (
    <CartProvider isInCart={isInCart}>
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
