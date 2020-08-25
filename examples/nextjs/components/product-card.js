import React, { useState } from 'react';
import Link from 'next/link';
import { useAddToCart, useFormatPrice } from 'hooks';
import { Image } from 'components';
import * as styles from 'styles/products.styles';

const LinkPDP = ({ linkToPDP, children }) => {
  if (linkToPDP) {
    return (
      <Link href="/products/[handle]" as={linkToPDP}>
        <a
          css={{
            textDecoration: 'none',
            color: '#000000',
            cursor: 'pointer'
          }}
        >
          {children}
        </a>
      </Link>
    );
  } else {
    return children;
  }
};

const ProductCard = ({ product, linkToPDP }) => {
  const [quantity, setQuantity] = useState(0);
  const minPrice = useFormatPrice(product, product.priceRange.min);
  const maxPrice = useFormatPrice(product, product.priceRange.max);
  const price =
    product.priceRange.min === product.priceRange.max
      ? minPrice
      : `$${minPrice} - $${maxPrice}`;

  const productVariant = product.variants[0];

  const addItemToCart = useAddToCart(product, productVariant, quantity);

  const incrementQty = () => setQuantity((qty) => qty + 1);
  const decrementQty = () => setQuantity((qty) => (qty > 0 ? qty - 1 : 0));

  return (
    <article css={{ margin: '0 2em' }}>
      <div css={{ ...styles.column }}>
        <LinkPDP linkToPDP={linkToPDP ? `/products/${product.handle}` : null}>
          <Image
            src={product.featuredMedia.src}
            alt={product.featuredMedia.altText}
            width="320"
            format={['webp', 'jpg']}
            styles={{
              maxWidth: '100%',
              minHeight: '100px',
              height: 'auto',
              width: '100%'
            }}
          />
        </LinkPDP>

        <div css={styles.column}>
          <LinkPDP linkToPDP={linkToPDP ? `/products/${product.handle}` : null}>
            <h3 css={styles.productTitle}>{product.title}</h3>
          </LinkPDP>
          <span css={styles.productPrice}>{price}</span>
          <div css={styles.productInteractLayout}>
            <div css={styles.counterLayout}>
              <span css={styles.quantity}>{quantity}</span>
              <div css={styles.counterSwitchLayout}>
                <button css={styles.counterSwitch} onClick={incrementQty}>
                  +
                </button>
                <button css={styles.counterSwitch} onClick={decrementQty}>
                  -
                </button>
              </div>
            </div>
            <button css={styles.addToCartButton} onClick={addItemToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
