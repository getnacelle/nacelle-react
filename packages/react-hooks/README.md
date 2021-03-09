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

#### `useCheckout`

A hook which uses items in a cart to generate a checkout via Nacelle's Hail Frequency API.

##### Accepts

1. `credentials`: an object containing `nacelleSpaceId` and `nacelleGraphqlToken`
2. `lineItems`: an array containing objects representing items in the cart, where each object contains `variant.id` and `variant.qty` properties
3. `checkoutId`[optional]: a string representing the checkout identification token from a previously-initiated checkout sequence

##### Returns

An array containing:

1. `checkoutData`: an object containing the `data.data.processCheckout` payload, which contains the checkout's `id` token (string), and the `completed` status (boolean)
2. `checkout`: a function that returns information for processing the checkout
3. `isLoading`: a boolean that indicates whether or not checkout information is presently being exchanged with Nacelle's Hail Frequency API

##### Example Usage

```jsx
// Using the useCheckout hook

import { useCheckout } from '@nacelle/react-hooks';

const Cart = () => {
  const lineItems = [
    (item1: { variant: { id: 101, qty: 1 } }),
    (item2: { variant: { id: 102, qty: 4 } })
  ];
  const credentials = {
    nacelleSpaceId: process.env.NACELLE_SPACE_ID,
    nacelleGraphqlToken: process.env.NACELLE_GRAPHQL_TOKEN
  };
  const [checkoutData, checkout, isLoading] = useCheckout(
    credentials,
    lineItems
  );
  useEffect(() => {
    if (checkoutData) {
      const { processCheckout } = checkoutData.data;
      window.location = processCheckout.url;
    }
  }, [checkoutData]);
  return (
    <>
      <h2>Cart</h2>
      <button type="button" onClick={() => checkout()} disabled={isLoading}>
        {isLoading ? <>Loading...</> : <>Checkout</>}
      </button>
      <ul>
        {lineItems.map((el) => (
          <li key={el.variant.id}>
            <h3>{item.title}</h3>
            <img src={item.src} alt={item.title} />
            <p>{item.variant.title}</p>
            <p>Quantity: {item.variant.qty}</p>
            <p>
              $ {(Number(item.variant.price) * item.variant.qty).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};
```

#### `useCheckout`

A hook which uses items in a cart to generate a checkout via Nacelle's Hail Frequency API.

##### Setup

Because the cart should exist across the app, it needs to be setup to surround the root component of the application.

```jsx
import { CartProvider } from '@nacelle/react-hooks';

const App = () => {
  <CartProvider>
    <main>...</main>
  </CartProvider>;
};
```

##### Returns

An array containing:

1. `cartState`: an object containing the current state of the cart. The properties of this object are:

- cart: a list of items in the cart
- show: a boolean to determine if the cart should be shown
- checkoutId: the Shopify checkoutId of the cart (if applicable)
- checkoutComplete: a boolean indicating if the checkout process has completed or not

2. `cartActions`: an object containing methods for interacting with the cart:

- addToCart() - add an item to the cart; if the item is already in the cart this function will increase the quantity of that item
- `updateItem(item)` - modify properties of an item in the cart
- `removeFromCart(item)` - remove an item from the cart
- `incrementItem(item)` - increment the quantity of an item in the cart
- `decrementItem(item)` - decrement the quantity of an item in the cart
- `toggleCart()` - toggles the cart's show status
- `setCheckoutStatus(status)` - sets the checkoutId and checkoutComplete properties of the cart
- `clearCart()` - removes all items from the cart

There is also a convenience method available named `isInCart` that will determine if an item is in the cart (i.e. `isInCart(cart, item)`).

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
