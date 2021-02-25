import React from 'react';
import { useRouter } from 'next/router';

import $nacelle from 'services/nacelle';
import { dataToPaths } from 'utils';
import ProductCard from 'components/ProductCard';
import * as styles from 'styles/pages.styles';

const ProductDetail = ({ product }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return product ? (
    <div css={styles.layout}>
      <ProductCard
        product={product}
        cardStyles={{ margin: 0 }}
        showDescription
        isPDP
        constrainImages={false}
        width={530}
        height={350}
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
  ) : (
    <>
      <p>No product found...</p>
    </>
  );
};

export default ProductDetail;

export async function getStaticPaths() {
  try {
    const products = await $nacelle.data.allProducts();
    const paths = dataToPaths({ data: products });

    return {
      paths,
      fallback: true
    };
  } catch (err) {
    throw new Error(`could not fetch products on product detail page:\n${err}`);
  }
}

export async function getStaticProps({ params: { handle }, preview }) {
  const product = await $nacelle.data.product({ handle, preview }).catch(() => {
    console.warn(`no product with handle '${handle}' found.`);
    return null;
  });

  return {
    props: { product },
    revalidate: 60 * 60 * 24 // 1 day in seconds
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every day
    //
    // For more information, check out the docs:
    // https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  };
}
