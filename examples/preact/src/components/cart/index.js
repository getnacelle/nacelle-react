import { h } from 'preact';
import style from './style.css';
import { connect } from 'unistore/preact';
import { actions } from '../../store/store';
import headers from '../../helpers/headers';
import { checkoutMutation as query } from '../../helpers/queries';

const Cart = connect(
  ['showCart', 'lineItems'],
  actions
)(({ showCart, lineItems, toggleCart }) => {
  const handleCheckout = async () => {
    try {
      const cartItems = lineItems.map((lineItem) => ({
        cartItemId: lineItem.productId,
        metafields: [],
        quantity: lineItem.quantity,
        variantId: lineItem.variant.id
      }));
      const res = await fetch('https://hailfrequency.com/v2/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query,
          variables: {
            input: {
              cartItems,
              checkoutId: ''
            }
          }
        })
      });
      const data = await res.json();
      window.location.href = data.data.processCheckout.url;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      {showCart && (
        <div class={style.cart}>
          <>
            <div style={{ display: 'flex' }}>
              <h1>Cart</h1>
              <span style={{ padding: '20px' }} onClick={toggleCart}>
                X
              </span>
            </div>
            <div>
              <ul>
                {lineItems &&
                  lineItems.map((lineItem) => (
                    <li>
                      ({lineItem.quantity}) {lineItem.title}:{' '}
                      <b>${lineItem.variant.price * lineItem.quantity}</b>
                    </li>
                  ))}
              </ul>
            </div>
            <button class="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        </div>
      )}
    </>
  );
});

export default Cart;
