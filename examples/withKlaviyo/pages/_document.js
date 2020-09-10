import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { KlaviyoScripts } from '@nacelle/react-klaviyo';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <KlaviyoScripts />
          <NextScript />
        </body>
      </Html>
    );
  }
}
