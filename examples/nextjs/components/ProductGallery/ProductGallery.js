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
      {products.map((product, idx) => (
        <ProductCard
          product={product}
          key={`${idx}::${product.remoteId}`}
          width={320}
          height={240}
        />
      ))}
    </Grid>
  );
};

export default ProductGallery;
