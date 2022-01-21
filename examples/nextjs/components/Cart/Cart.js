import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCheckout, useCart } from '@nacelle/react-hooks';
import { Button } from '@nacelle/react-components';
import { formatCurrency } from '@nacelle/react-dev-utils';

import ItemQuantity from 'components/ItemQuantity';
import useDetectDevice from 'hooks/useDetectDevice';
import * as styles from './Cart.styles';

const Cart = () => {
  const [{ cart, show }, cartActions] = useCart();
  const { isMobile } = useDetectDevice();
  const [checkoutData, checkoutActions] = useCheckout();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const checkoutItems = cart.map((cartItem) => ({
    quantity: cartItem.quantity,
    variantId: cartItem.variant.id,
    metafields: [...cartItem.product.metafields, ...cartItem.variant.metafields]
  }));
  const processCheckout = async () => {
    // initiate checkout & redirect customer to checkout URL
    setIsCheckingOut(true);

    return await checkoutActions
      .processCheckout({ cartItems: checkoutItems })
      .then(({ url, completed }) => {
        if (url && !completed) {
          window.location.href = url;
        }
      })
      .catch((err) => {
        setIsCheckingOut(false);
        console.error(err);
      });
  };

  useEffect(() => {
    if (checkoutData.completed) {
      checkoutActions.clearCheckoutData();
      cartActions.clearCart();
    }
  }, [checkoutData.completed, checkoutActions, cartActions]);

  const cartStateStyle = show ? styles.show : styles.hide;

  return (
    <div css={[styles.cart, cartStateStyle, !show && { boxShadow: 'none' }]}>
      <header css={styles.cartHeader}>
        <h3 css={styles.cartTitle}>Your Cart</h3>
        <Button styles={styles.closeButton} onClick={cartActions.toggleCart}>
          <Image
            alt="cross for closing the cart"
            src="https://nacelle-assets.s3-us-west-2.amazonaws.com/default-close-icon.svg"
            width="15"
            height="25"
            css={styles.closeIcon}
          />
        </Button>
      </header>
      <section css={styles.cartItems}>
        {cart.map((item, idx) => (
          <CartItem
            item={item}
            key={`${idx}::${item.variant.id}`}
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
        onClick={processCheckout}
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

  useEffect(() => {
    updateQuantity(item.quantity);
  }, [item]);

  const formatPrice = formatCurrency(
    item.product.locale,
    item.variant.priceCurrency
  );

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
  const { featuredMedia: variantMedia } = item.variant;
  const { featuredMedia: productMedia } = item.product;
  const altText =
    variantMedia.altText || productMedia.altText || item.product.title;

  return (
    <div css={styles.cartItem}>
      <Link href={`/products/${item.product.handle}`}>
        <a css={[styles.thumbnailContainer, isMobile && { paddingLeft: 0 }]}>
          <Image
            src={variantMedia.thumbnailSrc || productMedia.thumbnailSrc}
            alt={altText}
            width="100"
            height="70"
            css={styles.cartItemThumbnail}
          />
        </a>
      </Link>

      <div css={[styles.column, { width: '100%' }]}>
        <div css={styles.cartItemTitleLayout}>
          <h4 css={styles.cartItemTitle}>{item.product.title}</h4>
          {isMobile && (
            <span css={[styles.cartItemPrice, { flexGrow: 0 }]}>
              {formatPrice(item.variant.price)}
            </span>
          )}
        </div>

        <div css={styles.productInteractLayout}>
          {!isMobile && (
            <span css={styles.cartItemPrice}>
              {formatPrice(item.variant.price)}
            </span>
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
  const cartLocale = cart.length ? cart[0].product.locale : 'en-us';
  const cartCurrency = cart.length ? cart[0].variant.priceCurrency : 'USD';
  const formatPrice = formatCurrency(cartLocale, cartCurrency);

  const total = cart.reduce((subTotal, item) => {
    const itemTotal = item.quantity * parseInt(item.variant.price, 10);
    return subTotal + itemTotal;
  }, 0);

  return formatPrice(total);
}

export default Cart;
