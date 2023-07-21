# @nacelle/react-hooks

> React Hooks for Nacelle-fueled storefronts

## NOTICE

This package is deprecated. For up-to-date information and examples related to building frontend projects powered by Nacelle, please see [`docs.nacelle.com`](https://docs.nacelle.com/docs/heads) and the [`nacelle-js`](https://github.com/getnacelle/nacelle-js) repo.

## Install

```bash
npm i @nacelle/react-hooks
```

## Using the Hooks

### `useCheckout`

Use a checkout provider to create and manage checkouts.

#### Setting Up the Provider

Because checkout data and checkout actions should exist across the app, the `<CheckoutProvider />` needs to surround the root component of the application. The provider requires a `checkoutClient` prop, which is given an instance of a checkout client such as [`@nacelle/shopify-checkout`](https://www.npmjs.com/package/@nacelle/shopify-checkout). For example:

```jsx
import { CheckoutProvider } from '@nacelle/react-hooks';
import createShopifyCheckoutClient from '@nacelle/shopify-checkout';

const shopifyCheckoutClient = createShopifyCheckoutClient({
  // for more info, see https://www.npmjs.com/package/@nacelle/shopify-checkout
  storefrontCheckoutToken: process.env.SHOPIFY_STOREFRONT_CHECKOUT_TOKEN,
  myshopifyDomain: process.env.MYSHOPIFY_DOMAIN,
  storefrontApiVersion: process.env.STOREFRONT_API_VERSION
});

const App = () => {
  <CheckoutProvider checkoutClient={shopifyCheckoutClient}>
    <main>...</main>
  </CheckoutProvider>;
};
```

You're welcome to create your own checkout client. It just needs to expose two methods:

```ts
function get(params: any): Promise<{
  id: string;
  url: string;
  completed: boolean;
} | void> {
  try {
    // fetch an existing checkout
  } catch (err) {
    throw new Error(err);
  }
}

function process(params: any): Promise<{
  id: string;
  url: string;
  completed: boolean;
} | void> {
  try {
    // create a new checkout or update an existing checkout
  } catch (err) {
    throw new Error(err);
  }
}
```

#### The `useCheckout` Hook

##### Importing

```js
import { useCheckout } from '@nacelle/react-hooks';
```

##### Accepts

(None)

##### Returns

An array containing:

1. `checkoutData`: an object containing the following properties:

- `completed` (boolean) - signals whether the checkout process has successfully completed
- `id` (string) - the checkout ID
- `url` (string) - the URL of the checkout page
- `getCheckoutError` (string) - error returned from the checkout client when fetching an existing checkout
- `processCheckoutError` (string) - error returned from the checkout client when processing a checkout

2. `checkoutActions`: an object containing the following properties:

- `processCheckout(params)`: (function) initiates checkout processing
  - Accepts parameters required by the checkout client's `process` method
  - Either rejects with an error message, or returns a promise which resolves to an object containing the `completed`, `id`, and `url`
- `getCheckout(params)` (function) updates the `checkoutData` (note: `useCheckout` runs this function automatically - it is provided only to satisfy special use cases)
  - Accepts parameters required by the checkout client's `get` method
  - Either rejects with an error message, or returns a promise which resolves to an object containing the `completed`, `id`, and `url`
- `clearCheckoutData`: (function) when called, resets the `checkoutData` and clears `checkoutData` values stored in browser storage
  - Accepts: N/A
  - Returns: N/A

3. `isCheckingOut`: a boolean that indicates whether or not the `processCheckout` function is currently running

##### Example Usage

```jsx
// Using the useCheckout hook
//
// This example assumes that you're creating a Shopify
// checkout with `@nacelle/shopify-checkout. For more info,
// see https://www.npmjs.com/package/@nacelle/shopify-checkout.
//
// If using a different checkout client, adjust the `processCheckout`
// params accordingly.

import { useCheckout } from '@nacelle/react-hooks';

const Cart = () => {
  const [checkoutData, checkoutActions, isCheckingOut] = useCheckout();
  const cartItems = [
    { variantId: 123456789, quantity: 1 },
    { variantId: 987654321, quantity: 4 }
  ];

  useEffect(() => {
    if (checkoutData.completed) {
      checkoutActions.clearCheckoutData();
      // any other post-checkout actions, such as clearing the cart
    }
  }, [checkoutData.completed, clearCheckoutData]);

  const processCheckout = async () => {
    await checkoutActions.processCheckout({ cartItems }).then(() => {
      window.location = checkoutData.url;
    });
  };

  return (
    <>
      <h2>Cart</h2>
      <button type="button" disabled={isCheckingOut} onClick={processCheckout}>
        {isLoading ? <>Loading...</> : <>Checkout</>}
      </button>
    </>
  );
};
```

### `useCart`

A hook which uses items in a cart to generate a checkout via Nacelle's Hail Frequency API.

#### Setting Up the Provider

Because the cart should exist across the app, it needs to be setup to surround the root component of the application.

```jsx
import { CartProvider } from '@nacelle/react-hooks';

const App = () => {
  <CartProvider>
    <main>...</main>
  </CartProvider>;
};
```

##### Cart Persistence

By default, the `<CartProvider />` uses [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to persist the cart between refreshes. If you would prefer to use [Session Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) instead of Local Storage, pass `storage={'session'}` as a prop. If you would prefer to use [Index DB Storage](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) instead, pass `storage={'idb'}` as a prop. To disable cart storage entirely, pass `storage={null}` as a prop.

When using Local Storage or Session Storage to perist the cart, the default storage key of `'cart'` can be overriden by supplying a `cacheKey="my-custom-cart=key"` prop.

#### The `useCart` Hook

##### Importing

```js
import { useCart } from '@nacelle/react-hooks';
```

##### Accepts

(None)

##### Returns

An array containing:

1. `cartState`: an object containing the current state of the cart. The properties of this object are:

- `cart`: an array of line items in the cart
- `show`: a boolean to determine if the cart should be shown

2. `cartActions`: an object containing methods for interacting with the cart:

- `initCart(items)` - initialize/override the cart with an array of cart items
- `addToCart(item)` - add an item to the cart; if the item is already in the cart this function will increase the quantity of that item
- `updateItem(item)` - modify properties of an item in the cart
- `removeFromCart(item)` - remove an item from the cart
- `incrementItem(item)` - increment the quantity of an item in the cart
- `decrementItem(item)` - decrement the quantity of an item in the cart
- `toggleCart()` - toggles the cart's show status
  - Optionally, accepts one of the following string arguments:
    - `'open'` - if `cartState.show` was `false`, it will change to `true`; if `cartState.show` was `true`, it will remain `true`
    - `'closed'` - if `cartState.show` was `false`, it will remain `false`; if `cartState.show` was `true`, it will change to `false`
- `clearCart()` - removes all items from the cart

3. `isInCart` - a helper function that determines if a line item is in the cart, via `isInCart(cart, item)`. If a custom `isInCart` function is given to the `<CartProvider />` via the `isInCart` prop, the custom function will be returned instead of the default `isInCart` function.

##### Example Usage

```jsx
// Using the useCart hook

import { useCart } from '@nacelle/react-hooks';

const Cart = () => {
  const [{ cart }, { clearCart }] = useCart();

  return (
    <>
      <h2>Cart</h2>
      <button onClick={clearCart}>Clear</button>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <span>{item.quantity}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
```

## License

ISC © [getnacelle](https://github.com/getnacelle)
