# @nacelle/react-dev-utils

> React utility functions & TypeScript types for creating Nacelle projects

## Install

### With NPM

```bash
npm i @nacelle/react-dev-utils
```

## Types

The majority of the types are generated from our GraphQL schemas using [Graphql Code Gen](https://graphql-code-generator.com/). In addition, we extend this type for some of the frontend applcations, and this can be found in `./src/types/custom`.

To generate new types manually, use `npm run generate`. You'll need the appropriate environment variables for this to be successful. Speak with someone on the dev team to get these if needed.

## Fixtures

Useful mock data for writing tests.

- **shopifyItem:** A typical Shopify item object
- **klaviyoItem:** An item that has been used within a mock Klavyio store and can be used to see results for the Klaviyo Shopify integration

## Utility Functions

### formatCurrency()

Creates a function for formatting international currencies.

```js
import { formatCurrency } from '@nacelle/react-dev-utils';

const formatPrice = formatCurrency('ja-JP', 'JPY');

const price = formatPrice(2744); // ￥2,744
```
