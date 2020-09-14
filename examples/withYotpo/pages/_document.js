import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { YotpoScripts } from '@nacelle/react-yotpo';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head>
          <YotpoScripts />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
