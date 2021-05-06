import React, { useState, useRef } from 'react';
import Head from 'next/head';
import atob from 'atob';
import { RechargeSelect } from '@nacelle/react-recharge';
import { Image, Button } from '@nacelle/react-components';
import { useCheckout } from '@nacelle/react-hooks';

import product from '../data/product';
import * as styles from '../styles/pages.styles';

const Home = () => {
  const [cart, setCart] = useState([]);
  const itemMetafields = useRef([]);
  const [, { processCheckout }, isCheckingOut] = useCheckout();

  const selectedVariantId = product.variants[0].id;
  const selectedVariant = product.variants.find(
    ({ id }) => id === selectedVariantId
  );
  const variantPrice = itemMetafields.current.length
    ? determineVariantPrice(product, selectedVariant)
    : selectedVariant.price;

  const isInCart = cart.findIndex((item) => item.productId === product.id) > -1;

  const addItemToCart = () => {
    const cartItem = { product, variant: selectedVariant, quantity: 1 };

    return setCart((currentCart) => [...currentCart, cartItem]);
  };

  const removeItemFromCart = () => {
    return setCart([]);
  };

  const getCartMetafields = (cartMetafields) => {
    itemMetafields.current = cartMetafields;
  };

  return (
    <>
      <Head>
        <title>Nacelle Recharge Example</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+Pro:wght@300;400;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main css={styles.main}>
        <article css={styles.productCard}>
          <Image src={product.featuredMedia.src} styles={styles.productImage} />
          <div css={styles.productNameLayout}>
            <h2>{product.title}</h2>
            <h4>{`$${parseInt(product.variants[0].price, 10).toFixed(2)}`}</h4>
          </div>
          <Button
            styles={styles.button}
            fullwidth
            onClick={addItemToCart}
            disabled={isInCart}
          >
            ADD TO CART
          </Button>
          <RechargeSelect
            product={product}
            getCartMetafields={getCartMetafields}
          />
        </article>
        <section css={styles.cart}>
          <div css={styles.cartTitle}>
            <h2>Cart</h2>
          </div>
          <div css={styles.cartItems}>
            {cart.map((item) => (
              <article key={item.productId} css={styles.cartItem}>
                <div css={styles.cartItemInfo}>
                  <h3>{item.title}</h3>
                  <span>{`$${parseFloat(variantPrice).toFixed(2)}`}</span>
                </div>
                <Button
                  styles={styles.removeButton}
                  variant="secondary"
                  type="button"
                  onClick={removeItemFromCart}
                >
                  REMOVE
                </Button>
                <Button
                  onClick={() => processCheckout({ lineItems: cart })}
                  disabled={!cart.length || isCheckingOut}
                  fullwidth={true}
                >
                  {isCheckingOut ? 'Processing Cart...' : 'Checkout'}
                </Button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

function determineVariantPrice(product, selectedVariant) {
  const variantId = atob(selectedVariant.id)
    .split('gid://shopify/ProductVariant/')
    .pop();

  const priceVariantMap = product.metafields.find(
    ({ key }) => key === 'original_to_hidden_variant_map'
  );

  if (!priceVariantMap) {
    return selectedVariant.price;
  }

  const parsedPriceMap = JSON.parse(priceVariantMap.value);
  const discountPrices = parsedPriceMap[variantId];

  if (discountPrices) {
    return discountPrices.discount_variant_price;
  }

  return selectedVariant.price;
}

export default Home;
