import React from 'react';
import { Grid } from '@nacelle/react-components';

import ProductCard from 'components/ProductCard';
import * as styles from './ProductGallery.styles';

const ProductGallery = ({ products }) => {
  return (
    <Grid
      rowGap="6em"
      columns="repeat(auto-fit, minmax(20em, 1fr))"
      styles={styles.grid}
    >
      {products.map(
        (product, idx) =>
          product &&
          product.variants && (
            <ProductCard
              product={product}
              key={`${idx}::${product.remoteId}`}
            />
          )
      )}
    </Grid>
  );
};

export default ProductGallery;
