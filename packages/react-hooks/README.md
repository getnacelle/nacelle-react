# @nacelle/react-hooks

> React Hooks for use with Nacelle apps

## Install

### With NPM

```bash
npm i @nacelle/react-hooks
```

### With Yarn

```bash
yarn add @nacelle/react-hooks
```

## Using the Hooks

### `useCheckout`

A hook which uses items in a cart to generate a checkout via Nacelle's Hail Frequency API.

#### Setting Up the Provider

Because checkout data and checkout actions should exist across the app, the `<CheckoutProvider />` needs to surround the root component of the application. The provider requires a `credentials` prop, with a `credentials` object containing the`nacelleSpaceId`, `nacelleGraphqlToken`, and `nacelleEndpoint` values found in your Space Settings in the [Nacelle Dashboard](https://dashboard.getnacelle.com).

```jsx
import { CheckoutProvider } from '@nacelle/react-hooks';

const checkoutCredentials = {
  nacelleSpaceId: process.env.NACELLE_SPACE_ID,
  nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.NACELLE_ENDPOINT
};

const App = () => {
  <CheckoutProvider credentials={checkoutCredentials}>
    <main>...</main>
  </CheckoutProvider>;
};
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

- `checkoutComplete` (boolean) - signals whether the checkout process has successfully completed
- `checkoutId` (string) - the checkout ID
- `checkoutSource` (string) - the checkout provider (e.g. 'Shopify')
- `checkoutUrl` (string) - the url of the checkout page
- `getCheckoutError` (GraphQLError | null) - error returned from the API when fetching the `checkoutComplete` and `checkoutSource`
- `processCheckoutError` (GraphQLError | null) - error returned from the API when processing a checkout

2. `checkoutActions`: an object containing the following properties:

- `processCheckout({ lineItems, checkoutId?, discountCodes?, metafields?, note?, source? })`: (function) when called, initiates checkout processing
  - Accepts an object with the following properties:
    - `lineItems` (_required_): an array containing objects representing items in the cart, where each object contains a `product` (_object_), `variant` (_object_) and `quantity`
    - `checkoutId` (_optional_): a string representing the checkout identification token from a previously-initiated checkout sequence
    - `metafields` (_optional_): an array of key-value pairs of metadata associated with the checkout
    - `note` (_optional_): a string representing the order note
    - `discountCodes` (_optional_): an array of strings representing the discount codes to be applied
    - `source` (_optional_): a string representing the name of the checkout service provider
  - Either rejects with an error message, or returns a promise which resolves to an object containing the `checkoutComplete`, `checkoutId`, `checkoutSource`, and `checkoutUrl`
- `getCheckout({ id, url })` (function) when called with a checkout `id` and `url`, updates the `checkoutData.checkoutComplete` (note: `useCheckout` runs this function automatically - it is provided only to satisfy special use cases)
  - Accepts an object with the following properties:
    - `id` (_required_): a string representing the checkout identification token from a previously-initiated checkout sequence
    - `url` (_required_): a string representing the checkout URL from a previously-initiated checkout sequence
  - Either rejects with an error message, or returns a promise which resolves to an object containing the `checkoutComplete`, `checkoutId`, `checkoutSource`, and `checkoutUrl`
- `clearCheckoutData`: (function) when called, resets the `checkoutData` and clears `checkoutData` values stored in browser storage
  - Accepts: nothing
  - Returns: nothing

3. `isCheckingOut`: a boolean that indicates whether or not checkout information is presently being exchanged with Nacelle's Hail Frequency API

##### Example Usage

```jsx
// Using the useCheckout hook

import { useCheckout } from '@nacelle/react-hooks';

const Cart = () => {
  const lineItems = [
    { id: 123456789, quantity: 1 },
    { id: 987654321, quantity: 4 }
  ];

  const credentials = {
    nacelleSpaceId: process.env.NACELLE_SPACE_ID,
    nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN,
    nacelleEndpoint: process.env.NACELLE_ENDPOINT
  };

  const [checkoutData, checkoutActions, isCheckingOut] = useCheckout({
    credentials: checkoutCredentials,
    lineItems: cart
  });

  useEffect(() => {
    if (checkoutData.checkoutComplete) {
      checkoutActions.clearCheckoutData();
      cartActions.clearCart();
    }
  }, [checkoutData.checkoutComplete, clearCheckoutData, cartActions]);

  return (
    <>
      <h2>Cart</h2>
      <button
        type="button"
        disabled={isCheckingOut}
        onClick={() => checkoutActions.processCheckout({ lineItems: cart })}
      >
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

- `initCart(items)` - initialize/override the cart with a list of cart items
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
