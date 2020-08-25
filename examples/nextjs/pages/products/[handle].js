import React, { useState } from 'react';
import $nacelle from 'services/nacelle';
import { Image } from 'components';

import { useAddToCart } from 'hooks';
import { formatCurrency } from 'utils';
import * as styles from 'styles/products.styles';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(0);

  const productMedia = product.media[0];
  const productVariant = product.variants[0];

  const addItemToCart = useAddToCart(product, productVariant, quantity);

  const incrementQty = () => setQuantity((qty) => qty + 1);
  const decrementQty = () => setQuantity((qty) => (qty > 0 ? qty - 1 : 0));

  return (
    <div css={styles.layout}>
      <section css={styles.productGridLayout}>
        <div css={styles.column}>
          <Image
            src={productMedia.src}
            alt={productMedia.altText}
            styles={styles.productImage}
            width="600"
            format={['webp', 'jpg']}
          />
        </div>
        <div css={styles.column}>
          <h3 css={styles.productTitle}>{product.title}</h3>
          <span css={styles.productPrice}>
            {formatCurrency(productVariant.price)}
          </span>
          <p css={styles.productDesc}>{stripHtml(product.description)}</p>
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
      </section>
      <section css={styles.detailGridLayout}>
        <div css={styles.gettingLayout}>
          <h4 css={styles.gettingTitle}>WHAT YOU&apos;RE GETTING</h4>
          <p css={styles.gettingText}>
            Run a manual sweep of anomalous airborne or electromagnetic
            readings. Radiation levels in our atmosphere have increased by 3,000
            percent. Electromagnetic and subspace wave fronts approaching
            synchronization. What is the strength of the ship&apos;s deflector
            shields at maximum output? The wormhole&apos;s size and short period
            would make this a local phenomenon. Do you have sufficient data to
            compile a holographic simulation?
          </p>
        </div>
        <div css={styles.ourProducts}>
          <div>
            <h4 css={styles.gettingTitle}>OUR PRODUCTS</h4>
            <p css={styles.gettingText}>
              It indicates a synchronic distortion in the areas emanating
              triolic waves. The cerebellum, the cerebral cortex, the brain
              stem, the entire nervous system has been depleted of
              electrochemical energy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;

function stripHtml(str) {
  return str && str.replace(/(<([^>]+)>)/gi, '');
}

export async function getStaticPaths() {
  try {
    const products = await $nacelle.data.allProducts();
    return {
      paths: products.map((product) => ({
        params: { handle: product.handle }
      })),
      fallback: false
    };
  } catch (err) {
    throw new Error(`Error fetching products on homepage:\n${err}`);
  }
}

export async function getStaticProps({ params }) {
  const product = await $nacelle.data.product({ handle: params.handle });

  return { props: { product } };
}
