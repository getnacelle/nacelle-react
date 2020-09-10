# @nacelle/react-recharge

Adds a React component [Recharge](https://rechargepayments.com/) subscriptions in your [Nacelle](https://getnacelle.com/) project.

![Image of RechargeSelect Component](component.png)

## Requirements

- A Nacelle project set up locally. See https://docs.getnacelle.com for getting started.
- A Recharge app installed and setup on your Shopify store.

## Setup

### Add Module to Nacelle

Once you have Nacelle and Recharge set up you can install this module in your project from `npm`:

```
npm install @nacelle/react-recharge -S
```

### Metafields

After the package is installed, you'll need to create a `.env` file in the root of the project that contains credentials for your store:

```
SHOPIFY_STORE_NAME=
SHOPIFY_ACCESS_TOKEN=
```

Please note that the above access token _must_ be the GraphQL Admin API token.

Recharge sets important product metafields that we need to expose to Nacelle. We can do this with a simple graphql query using [Shopify's GraphQL Admin API](https://help.shopify.com/en/api/graphql-admin-api/reference/object/metafieldstorefrontvisibility)

This module adds an NPM command that can be run to expose these, and only needs to be run once during the initial setup

```sh
npx expose-metafields
```

This command will read the values from your `.env` file and query the Admin API to expose the metafields needed.

## Usage

```jsx
import { RechargeSelect } from '@nacelle/react-recharge';

<RechargeSelect product={product} getCartMetafields={getCartMetafields} />;
```

### Props

- **product:** A Shopify Product object
- **getCartMetafields:** This is a callback function that is passed to the component and will return the values of metafields that should be integrated into the cart. Every time the user changes between the delivery frequency or the type of purchase, this callback will be run and provide updated metafields. When the item is added to cart, these metafields should be appended to any other metafields required in the cart.

Example of `getCartMetafields`:

```js
const itemMetafields = useRef([]);

const getCartMetafields = (cartMetafields) => {
  // type CartMetafield = {
  //   key: 'charge_interval_frequency' | 'order_interval_frequency' | 'order_interval_unit';
  //   value: string;
  // }
  itemMetafields.current = cartMetafields;
};
```

### Example

An example integration with Nextjs can be found [here](https://github.com/getnacelle/nacelle-react/tree/master/examples/withRecharge).
