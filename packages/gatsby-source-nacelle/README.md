<h1 align="center">
  Gatsby-Source-Nacelle
</h1>

<!-- [![npm version](https://img.shields.io/npm/v/@nacelle/gatsby-source-nacelle.svg)](https://www.npmjs.com/package/@nacelle/gatsby-source-nacelle) -->
<!-- [![GitHub license](https://img.shields.io/github/license/getnacelle/nacelle-react/tree/main/packages/gatsby-source-nacelle)](https://github.com/getnacelle/nacelle-react/tree/main/packages/gatsby-source-nacelle/blob/master/LICENSE) -->

This plugin connects Gatsby to [Nacelle's](https://www.nacelle.com) v2 API, which gives you access to the product data (individual products, collections, etc.) and content data (blog posts, articles, etc.) needed to build an eCommerce storefront.

If you using Nacelle's v1 API, please use `@nacelle/gatsby-source-nacelle@nacelle-v1` instead.

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out the [Nacelle docs](https://nacelle.com/docs).

## Quick Start

Follow these steps to add `gatsby-source-nacelle` to your Gatsby site:

### Install

First make sure you're site is using Gatsby v4. Then follow the below instructions to start using the plugin.

#### With Yarn

```shell
yarn add @nacelle/gatsby-source-nacelle @nacelle/storefront-sdk
```

#### With NPM

```shell
npm i @nacelle/gatsby-source-nacelle @nacelle/storefront-sdk
```

### Configure

Begin by initializing [Nacelle Storefront SDK](https://nacelle.com/docs/querying-data/storefront-sdk) and pass it to `gatsby-source-nacelle` as `options.nacelleClient`.

```javascript
// gatsby-config.js
require('dotenv').config();

const NacelleClient = require('@nacelle/storefront-sdk').default;

const client = new NacelleClient({
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  storefrontEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT
});

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleClient: client
      }
    }
  ]
};
```

You'll note that we use `.env` variables to set Nacelle credentials. You can learn more about using environment variables with Gatsby in the [Gatsby docs](https://www.gatsbyjs.org/docs/environment-variables/)

## Additional Features

### Incremental Builds

`@nacelle/gatsby-source-nacelle` uses [build caching](https://www.gatsbyjs.com/docs/build-caching/) to support [incremental builds](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/). If you'd like to force `@nacelle/gatsby-source-nacelle` to re-source product, collection, and content data from Nacelle's v2 API after a given interval, you can do so by providing a `cacheDuration` value (in milliseconds).

For example, a build with the following configuration will force a re-fetch of product, collection, and content data after 24 hours, even if that data hasn't changed:

```js
// gatsby-config.js
require('dotenv').config();

const NacelleClient = require('@nacelle/storefront-sdk').default;

const client = new NacelleClient({
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  storefrontEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT
});

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        nacelleClient: client,
        cacheDuration: 1000 * 60 * 60 * 24 // 1 day in ms
      }
    }
  ]
};
```

### Gatsby Image

`@nacelle/gatsby-source-nacelle` provides a way to easily integrate with Gatsby's powerful [image processing tools](https://www.gatsbyjs.com/docs/how-to/images-and-media/using-gatsby-plugin-image) to enable progressive image loading with visually-compelling loading strategies such as [Traced SVG](https://using-gatsby-image.gatsbyjs.org/traced-svg/) and [Background Color](https://using-gatsby-image.gatsbyjs.org/background-color/). Gatsby Image is directly compatible with the `featuredMedia` and `media` of products.

Enabling these image processing techniques requires installing [`gatsby-plugin-image`](https://www.npmjs.com/package/gatsby-plugin-image), [`gatsby-source-filesystem`](https://www.npmjs.com/package/gatsby-source-filesystem), [`gatsby-plugin-sharp`](https://www.npmjs.com/package/gatsby-plugin-sharp), and [`gatsby-transformer-sharp`](https://www.npmjs.com/package/gatsby-transformer-sharp):

```
npm i gatsby-plugin-image gatsby-source-filesystem gatsby-plugin-sharp gatsby-transformer-sharp
```

Next, register `gatsby-plugin-image`, `gatsby-plugin-sharp`, and `gatsby-tranformer-sharp` in `gatsby-config.js`. You don't need to register `gatsby-source-filesystem`.

```js
// gatsby-config.js

module.exports = {
  plugins: [
    // ...other plugins,
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
};
```

Please refer to the [example project](https://github.com/getnacelle/nacelle-react/tree/main/examples/gatsby) to see how `@nacelle/gatsby-source-nacelle` can be used with [`gatsby-plugin-image`](https://www.npmjs.com/package/gatsby-plugin-image).

## Next Steps

Once you've established a connection to Nacelle's v2 API, it's time to start building out your store. Check out the [example project](https://github.com/getnacelle/nacelle-react/tree/main/examples/gatsby) to learn how to create a basic eCommerce store with product & content data provided by `@nacelle/gatsby-source-nacelle`.
