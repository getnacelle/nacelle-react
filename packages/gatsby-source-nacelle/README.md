<h1 align="center">
  Gatsby-Source-Nacelle
</h1>

<!-- [![npm version](https://img.shields.io/npm/v/@nacelle/gatsby-source-nacelle.svg)](https://www.npmjs.com/package/@nacelle/gatsby-source-nacelle) -->
<!-- [![GitHub license](https://img.shields.io/github/license/getnacelle/nacelle-react/tree/master/packages/gatsby-source-nacelle)](https://github.com/getnacelle/nacelle-react/tree/master/packages/gatsby-source-nacelle/blob/master/LICENSE) -->

This plugin connects Gatsby to [Nacelle's](https://www.getnacelle.com) Hail Frequency API, which gives you access to the product data (individual products, collections, etc.) and content data (blog posts, articles, etc.) needed to build an eCommerce storefront.

## What is Nacelle?

Nacelle is a headless eCommerce platform made for developers who want to create superior customer buying experiences. When you connect your Shopify, Magento, or custom eCommerce store to Nacelle, our proprietary indexing system supplies a high-performance connection to your back end.

To learn more, check out the [Nacelle docs](https://docs.getnacelle.com/intro.html#what-is-nacelle).

## Quick Start

Follow these steps to add `gatsby-theme-nacelle` to your Gatsby site:

### Install

#### With Yarn

```shell
yarn add @nacelle/gatsby-theme-nacelle
```

#### With NPM

```shell
npm i @nacelle/gatsby-theme-nacelle
```

### Configure

Then add the theme to your `gatsby-config.js`. Be sure to include your `nacelle-space-id` and `nacelle-graphql-token`, which you can find in your Space settings in the [Nacelle Dashboard](https://dashboard.getnacelle.com/).

#### Adding Your Credentials Directly

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-theme-nacelle',
      options: {
        nacelle_space_id: YOUR_NACELLE_SPACE_ID,
        nacelle_graphql_token: YOUR_NACELLE_GRAPHQL_TOKEN
      }
    }
  ]
};
```

#### Adding Your Credentials Securely

Install [dotenv](https://www.npmjs.com/package/dotenv), then create a `.env` file with your Nacelle credentials. For more information about using environment variables in a Gatsby project, check out the [Gatsby docs](https://www.gatsbyjs.org/docs/environment-variables/).

```dotenv
# .env
NACELLE_SPACE_ID=your-nacelle-space-id
NACELLE_GRAPHQL_TOKEN=your-nacelle-graphql-token
```

```javascript
// gatsby-config.js
require('dotenv').config();

module.exports = {
  plugins: [
    {
      resolve: '@nacelle/gatsby-theme-nacelle',
      options: {
        nacelle_space_id: process.env.NACELLE_SPACE_ID,
        nacelle_graphql_token: process.env.NACELLE_GRAPHQL_TOKEN
      }
    }
  ]
};
```

## Next Steps

Once you've established a connection to Nacelle's Hail Frequency API, it's time to start building out your store. Check out the [examples](../../examples/gatsby) to learn how to create a basic eCommerce store with product & content data provided by `gatsby-source-nacelle`.
