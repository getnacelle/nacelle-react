import React from 'react';

import $nacelle from 'services/nacelle';
import ProductCard from 'components/ProductCard';
import * as styles from 'styles/pages.styles';

const ProductDetail = ({ product }) => {
  return (
    <div css={styles.layout}>
      <ProductCard
        product={product}
        cardStyles={{ margin: 0 }}
        showDescription
        isPDP
        constrainImages={false}
      >
        <section css={styles.detailGridLayout}>
          <div css={styles.gettingLayout}>
            <h4 css={styles.gettingTitle}>WHAT YOU&apos;RE GETTING</h4>
            <p css={styles.gettingText}>
              Run a manual sweep of anomalous airborne or electromagnetic
              readings. Radiation levels in our atmosphere have increased by
              3,000 percent. Electromagnetic and subspace wave fronts
              approaching synchronization. What is the strength of the
              ship&apos;s deflector shields at maximum output? The
              wormhole&apos;s size and short period would make this a local
              phenomenon. Do you have sufficient data to compile a holographic
              simulation?
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
      </ProductCard>
    </div>
  );
};

export default ProductDetail;

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
