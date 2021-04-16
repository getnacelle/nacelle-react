import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useCheckout, useCart } from '@nacelle/react-hooks';
import { Button, Image } from '@nacelle/react-components';
import { formatCurrency } from '@nacelle/react-dev-utils';

import ItemQuantity from 'components/ItemQuantity';
import useDetectDevice from 'hooks/useDetectDevice';
import * as styles from './Cart.styles';

const checkoutCredentials = {
  nacelleSpaceId: process.env.GATSBY_NACELLE_SPACE_ID,
  nacelleGraphqlToken: process.env.GATSBY_NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.GATSBY_NACELLE_ENDPOINT
};

const Cart = () => {
  const [{ cart, show }, cartActions] = useCart();
  const { isMobile } = useDetectDevice();
  const [checkoutData, checkout, isCheckingOut] = useCheckout(
    checkoutCredentials,
    cart
  );

  useEffect(() => {
    if (checkoutData) {
      const {
        processCheckout: { url, id, completed }
      } = checkoutData.data;

      cartActions.setCheckoutStatus({
        checkoutId: id,
        checkoutComplete: completed
      });

      window.location = url;
    }
  }, [checkoutData, cartActions]);

  const cartStateStyle = show ? styles.show : styles.hide;

  return (
    <div css={[styles.cart, cartStateStyle, !show && { boxShadow: 'none' }]}>
      <header css={styles.cartHeader}>
        <h3 css={styles.cartTitle}>Your Cart</h3>
        <Button styles={styles.closeButton} onClick={cartActions.toggleCart}>
          <Image
            styles={styles.closeIcon}
            src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-close-icon.svg"
            alt="close the cart"
          />
        </Button>
      </header>
      <section css={styles.cartItems}>
        {cart.map((item) => (
          <CartItem
            item={item}
            key={item.id}
            cartActions={cartActions}
            isMobile={isMobile}
          />
        ))}
      </section>
      <footer css={styles.subTotalFooter}>
        <h4 css={styles.subTotal}>
          <span>SubTotal:</span>
          <span css={styles.subtotalPrice}>{calculateSubTotal(cart)}</span>
        </h4>
      </footer>
      <Button
        onClick={checkout}
        disabled={!cart.length || isCheckingOut}
        styles={styles.checkoutButton}
        fullwidth={true}
      >
        {isCheckingOut ? 'Processing Cart...' : 'Checkout'}
      </Button>
    </div>
  );
};

const CartItem = ({ item, cartActions, isMobile }) => {
  const [itemQuantity, updateQuantity] = useState(item.quantity || 0);

  const formatPrice = formatCurrency(item.locale, item.priceCurrency);

  const incrementQty = () => {
    const qty = itemQuantity + 1;

    cartActions.incrementItem(item);
    return updateQuantity(qty);
  };

  const decrementQty = () => {
    if (itemQuantity < 2) {
      return null;
    }

    const qty = itemQuantity > 2 ? itemQuantity - 1 : 1;

    cartActions.decrementItem(item);
    return updateQuantity(qty);
  };

  const removeItemFromCart = () => cartActions.removeFromCart(item);

  return (
    <div css={styles.cartItem}>
      <Link
        to={`/products/${item.handle}`}
        css={[styles.thumbnailContainer, isMobile && { paddingLeft: 0 }]}
      >
        <Image
          styles={styles.cartItemThumbnail}
          src={item.image.thumbnailSrc}
          alt={item.image.altText || item.title}
        />
      </Link>

      <div css={[styles.column, { width: '100%' }]}>
        <div css={styles.cartItemTitleLayout}>
          <h4 css={styles.cartItemTitle}>{item.title}</h4>
          {isMobile && (
            <span css={[styles.cartItemPrice, { flexGrow: 0 }]}>
              {formatPrice(item.price)}
            </span>
          )}
        </div>

        <div css={styles.productInteractLayout}>
          {!isMobile && (
            <span css={styles.cartItemPrice}>{formatPrice(item.price)}</span>
          )}
          <ItemQuantity
            quantity={itemQuantity}
            incrementFn={incrementQty}
            decrementFn={decrementQty}
          />
          <Button
            onClick={removeItemFromCart}
            styles={styles.removeProductButton}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

function calculateSubTotal(cart) {
  const cartLocale = cart.length ? cart[0].locale : 'en-us';
  const cartCurrency = cart.length ? cart[0].priceCurrency : 'USD';
  const formatPrice = formatCurrency(cartLocale, cartCurrency);

  const total = cart.reduce((subTotal, item) => {
    const itemTotal = item.quantity * parseInt(item.price, 10);
    return subTotal + itemTotal;
  }, 0);

  return formatPrice(total);
}

export default Cart;
