import React from 'react';
import { CheckoutProvider } from '@nacelle/react-hooks';

const checkoutCredentials = {
  nacelleSpaceId: process.env.NACELLE_SPACE_ID,
  nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.NACELLE_ENDPOINT
};

function MyApp({ Component, pageProps }) {
  return (
    <CheckoutProvider credentials={checkoutCredentials}>
      <Component {...pageProps} />
    </CheckoutProvider>
  );
}

export default MyApp;
