# Demo Site for Gatsby-Theme-Nacelle

An eCommerce Gatsby site built with `gatsby-source-nacelle`. This site demonstrates the use of `gatsby-node.js` to programatically build pages for products and collections.

## Quick Start

To run this locally, you'll need to first [create a Nacelle account](https://dashboard.nacelle.com) and follow the [directions](https://nacelle.com/docs/dashboard/source-connectors/shopify-connector) for connecting a Shopify store. Once your store is connected, copy the `Endpoint` and `Token` values from your Space Settings in the [Nacelle Dashboard](https://dashboard.nacelle.com/).

Next, we'll use these as environment variables. Create a `.env` file in the root of the `examples/gatsby` project with the following values:

```dotenv
# .env

GATSBY_NACELLE_STOREFRONT_TOKEN=<your-nacelle-graphql-token>
GATSBY_NACELLE_STOREFRONT_ENDPOINT= <nacelle-storefront-graphql-endpoint>
```

You're ready to go! Get started with Yarn or NPM:

#### With NPM

```shell
npm run develop
```
