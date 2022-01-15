<h1 align="center">
  Gatsby-Source-Nacelle
</h1>

<!-- [![npm version](https://img.shields.io/npm/v/@nacelle/gatsby-source-nacelle.svg)](https://www.npmjs.com/package/@nacelle/gatsby-source-nacelle) -->
<!-- [![GitHub license](https://img.shields.io/github/license/getnacelle/nacelle-react/tree/main/packages/gatsby-source-nacelle)](https://github.com/getnacelle/nacelle-react/tree/main/packages/gatsby-source-nacelle/blob/master/LICENSE) -->

This plugin connects Gatsby to [Nacelle's](https://www.getnacelle.com) Hail Frequency API, which gives you access to the product data (individual products, collections, etc.) and content data (blog posts, articles, etc.) needed to build an eCommerce storefront.

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out the [Nacelle docs](https://docs.getnacelle.com/intro.html#what-is-nacelle).

## Quick Start

Follow these steps to add `gatsby-source-nacelle` to your Gatsby site:

### Install

#### With Yarn

```shell
yarn add @nacelle/gatsby-source-nacelle
```

#### With NPM

```shell
npm i @nacelle/gatsby-source-nacelle
```

### Configure

It's recommended to create a NacelleClient and pass it to `gatsby-source-nacelle`. This gives you the best control of your client, allowing you to setup [CMS previews](https://docs.getnacelle.com/integrations/contentful-preview.html) and the [Nacelle v2 Compatibility Connector](https://www.npmjs.com/package/@nacelle/compatibility-connector).

```javascript
// gatsby-config.js
require('dotenv').config();

const NacelleClient = require('@nacelle/storefront-sdk').default;

const client = new NacelleClient({
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  nacelleEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT
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

`@nacelle/gatsby-source-nacelle` uses [build caching](https://www.gatsbyjs.com/docs/build-caching/) to support [incremental builds](https://www.gatsbyjs.com/blog/2020-04-22-announcing-incremental-builds/). If you'd like to force `@nacelle/gatsby-source-nacelle` to re-source product, collection, and content data from Nacelle's Hail Frequency API after a given interval, you can do so by providing a `cacheDuration` value (in milliseconds).

For example, a build with the following configuration will force a re-fetch of product, collection, and content data after 24 hours, even if that data hasn't changed:

```js
// gatsby-config.js
require('dotenv').config();

const NacelleClient = require('@nacelle/storefront-sdk').default;

const client = new NacelleClient({
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  nacelleEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT
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

`@nacelle/gatsby-source-nacelle` provides a way to easily integrate with Gatsby's powerful [image processing tools](https://www.gatsbyjs.org/docs/working-with-images/#optimizing-images-with-gatsby-image) to enable progressive image loading with visually-compelling loading strategies such as [Traced SVG](https://using-gatsby-image.gatsbyjs.org/traced-svg/) and [Background Color](https://using-gatsby-image.gatsbyjs.org/background-color/). Gatsby Image is directly compatible with the `featuredMedia` and `media` of products.

Enabling these image processing techniques requires installing [gatsby-source-filesystem](https://www.npmjs.com/package/gatsby-source-filesystem), [`gatsby-plugin-sharp`](https://www.npmjs.com/package/gatsby-plugin-sharp), and [`gatsby-transformer-sharp`](https://www.npmjs.com/package/gatsby-transformer-sharp):

```
npm i gatsby-source-filesystem gatsby-plugin-sharp gatsby-transformer-sharp
```

Next, register `gatsby-plugin-sharp` and `gatsby-tranformer-sharp` in `gatsby-config.js`. You don't need to register `gatsby-source-filesystem`.

```js
// gatsby-config.js

module.exports = {
  plugins: [
    // ...other plugins,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp'
  ]
};
```

You'll also need to install either [`gatsby-image`](https://www.npmjs.com/package/gatsby-image) or Gatsby's latest offering, [`gatsby-plugin-image`](https://www.npmjs.com/package/gatsby-plugin-image). Please refer to the [example project](../../examples/gatsby) to see how `@nacelle/gatsby-source-nacelle` can be used with [`gatsby-plugin-image`](https://www.npmjs.com/package/gatsby-plugin-image).

### Previewing Content from Contentful

When Nacelle indexes content data from your Contentful space, only published content entries are indexed. To skip the Nacelle index and instead source unpublished content directly from Contentful, simply provide some additional environment variables and plugin options:

```dotenv
# .env

# always required
NACELLE_SPACE_ID=your-nacelle-space-id
NACELLE_GRAPHQL_TOKEN=your-nacelle-graphql-token

# required for Contentful preview
CONTENTFUL_PREVIEW_SPACE_ID=your-contentful-space-id
CONTENTFUL_PREVIEW_API_TOKEN=your-contentful-preview-api-token
ENABLE_GATSBY_REFRESH_ENDPOINT=true
```

```javascript
// gatsby-config.js
require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-source-nacelle',
      options: {
        // always required
        nacelleSpaceId: process.env.NACELLE_SPACE_ID,
        nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
        // required for Contentful preview
        contentfulPreviewSpaceId: process.env.CONTENTFUL_PREVIEW_SPACE_ID,
        contentfulPreviewApiToken: process.env.CONTENTFUL_PREVIEW_API_TOKEN,
        // optional toggle
        cmsPreviewEnabled: true
      }
    }
  ]
};
```

Your Contentful Preview API Token can be found in your Contentful **Settings** under **Api keys**.

By default, if the `contentfulPreviewSpaceId` and `contentfulPreviewApiToken` options are provided, content data will be sourced from Contentful's Preview API instead of the Nacelle content index. Setting `cmsPreviewEnabled` to `false` will allow you to toggle back to sourcing content data from the Nacelle content index while still providing `contentfulPreviewSpaceId` and `contentfulPreviewApiToken` options.

Adding `ENABLE_GATSBY_REFRESH_ENDPOINT=true` to `.env` [enables content refreshing](https://www.gatsbyjs.com/docs/refreshing-content/) during local development. A **Refresh Data** button will appear in Gatsby's GraphiQL explorer. Typically, content changes made in Contentful take about 5-10 seconds before the data can be successfully refreshed.

## Next Steps

Once you've established a connection to Nacelle's Hail Frequency API, it's time to start building out your store. Check out the [example project](../../examples/gatsby) to learn how to create a basic eCommerce store with product & content data provided by `@nacelle/gatsby-source-nacelle`.
