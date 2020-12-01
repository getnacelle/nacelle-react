# Demo Site for Gatsby-Theme-Nacelle

An eCommerce Gatsby site built with `gatsby-source-nacelle`. This site demonstrates the use of `gatsby-node.js` to programatically build pages for products and collections.

## Quick Start

To run this locally, you'll need to first [create a Nacelle account](https://dashboard.getnacelle.com/) and follow the [directions](https://docs.getnacelle.com/getting-started.html#configure-your-shopify-account) for connecting a Shopify store. Once your store is connected, copy the `Space ID` and `Token` values from your Space Settings in the [Nacelle Dashboard](https://dashboard.getnacelle.com/).

Next, we'll use these as environment variables. Create a `.env` file in the root of the `examples/gatsby` project with the following values:

```dotenv
NACELLE_SPACE_ID=your-nacelle-space-id
NACELLE_GRAPHQL_TOKEN=your-nacelle-graphql-token
```

You're ready to go! Get started with Yarn or NPM:

#### With NPM

```shell
npm run develop
```
