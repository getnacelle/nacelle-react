import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@nacelle/react-hooks';
import { Image, Button, Grid } from '@nacelle/react-components';
import { formatCurrency } from '@nacelle/react-dev-utils';

import ItemQuantity from 'components/ItemQuantity';
import useDetectDevice from 'hooks/useDetectDevice';
import * as styles from './ProductCard.styles';

const IMAGE_FORMATS = ['webp', 'jpg'];

const LinkPDP = ({ pdpLink, children }) => {
  if (!pdpLink) {
    return children;
  }

  return (
    <Link href="/products/[handle]" as={pdpLink}>
      <a css={styles.pdpLink}>{children}</a>
    </Link>
  );
};

const ProductCard = ({
  product,
  cardStyles,
  showDescription = false,
  constrainImages = true,
  isPDP = false,
  children
}) => {
  const [quantity, setQuantity] = useState(0);
  const [, { addToCart, toggleCart }] = useCart();
  const device = useDetectDevice();

  const productLink = `/products/${product.handle}`;
  const productVariant = product.variants[0];
  const formatPrice = formatCurrency(
    product.locale,
    productVariant.priceCurrency
  );

  const addItemToCart = () => {
    const item = { ...product, variant: productVariant, quantity };

    addToCart(item);
    return toggleCart();
  };

  const imageStyles = constrainImages ? styles.productImage : styles.pdpImage;

  const incrementQty = () => setQuantity((qty) => qty + 1);
  const decrementQty = () => setQuantity((qty) => (qty > 0 ? qty - 1 : 0));

  return (
    <article css={[styles.cardMargin, cardStyles]}>
      <section css={[isPDP && styles.sectionMargins]}>
        <Grid
          columns={determineColumnCount(device, isPDP)}
          columnGap={isPDP ? 98 : 0}
        >
          <LinkPDP pdpLink={productLink}>
            <Image
              src={product.featuredMedia.src}
              alt={product.featuredMedia.altText}
              width={320}
              format={IMAGE_FORMATS}
              styles={imageStyles}
            />
          </LinkPDP>

          <div css={styles.column}>
            <LinkPDP pdpLink={productLink}>
              <h3 css={styles.productTitle}>{product.title}</h3>
            </LinkPDP>
            <span css={styles.productPrice}>
              {formatPrice(productVariant.price)}
            </span>
            {showDescription && (
              <p css={styles.productDesc}>{stripHtml(product.description)}</p>
            )}
            <Grid columns={2} styles={!showDescription && { marginTop: 16 }}>
              <ItemQuantity
                quantity={quantity}
                incrementFn={incrementQty}
                decrementFn={decrementQty}
              />
              <Button styles={styles.addToCartButton} onClick={addItemToCart}>
                ADD TO CART
              </Button>
            </Grid>
          </div>
        </Grid>
      </section>

      {children}
    </article>
  );
};

function stripHtml(str) {
  return str && str.replace(/(<([^>]+)>)/gi, '');
}

function determineColumnCount(device, isPDP) {
  if (device.isMobile && isPDP) {
    return 1;
  }

  if (isPDP) {
    return 2;
  }

  return 1;
}

export default React.memo(ProductCard);
