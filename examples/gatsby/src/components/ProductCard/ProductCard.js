import * as React from 'react';
import { useState } from 'react';
import { Link } from 'gatsby';
import { useCart } from '@nacelle/react-hooks';
import { Button, Grid } from '@nacelle/react-components';
import { formatCurrency } from '@nacelle/react-dev-utils';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import ItemQuantity from 'components/ItemQuantity';
import useDetectDevice from 'hooks/useDetectDevice';
import * as styles from './ProductCard.styles';

const LinkPDP = ({ pdpLink, children }) => {
  if (!pdpLink) {
    return children;
  }

  return (
    <Link to="/products/[handle]" as={pdpLink} css={styles.pdpLink}>
      {children}
    </Link>
  );
};

const ProductCard = ({
  product,
  cardStyles,
  showDescription = false,
  isPDP = false,
  children
}) => {
  const [quantity, setQuantity] = useState(0);
  const [, { addToCart, toggleCart }] = useCart();
  const device = useDetectDevice();
  const imageData =
    product.featuredMedia && getImage(product.featuredMedia.remoteImage);

  const productLink = `/products/${product.handle}`;
  const productVariant = product.variants[0];
  const formatPrice = formatCurrency(
    product.locale,
    productVariant.priceCurrency
  );

  const addItemToCart = () => {
    const item = {
      ...product,
      variant: productVariant,
      quantity
    };

    addToCart(item);
    return toggleCart();
  };

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
            <GatsbyImage
              width={200}
              image={imageData}
              alt={
                product.featuredMedia.altText || product.title || 'product card'
              }
              css={styles.productImage}
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
