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

```JavaScript
// Using the useCheckout hook

import { useCheckout } from '@nacelle/react-hooks';

const Cart = () => {
  const lineItems = [
    item1: { variant: { id: 101, qty: 1 }},
    item2: { variant: { id: 102, qty: 4 }}
  ]
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
      const payload = checkoutData.data.data.processCheckout;
      window.location = payload.url;
    }
  }, [checkoutData]);
  return (
    <>
      <h2>Cart</h2>
      <button
        type="button"
        onClick={() => checkout()}
        disabled={isLoading}
      >
        {isLoading ? <>Loading...</> : <>Checkout</>}
      </button>
      <ul>
        {lineItems.map(el => (
          <li key={el.variant.id}>
            <h3>{item.title}</h3>
            <img src={item.src} alt={item.title} />
            <p>{item.variant.title}</p>
            <p>Quantity: {item.variant.qty}</p>
            <p>$ {(Number(item.variant.price) * item.variant.qty).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
```

## License

ISC © [getnacelle](https://github.com/getnacelle)
