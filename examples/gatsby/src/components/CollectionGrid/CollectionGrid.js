import React, { useState, useEffect } from 'react';
import $nacelle from 'services/nacelle';

import ProductGallery from 'components/ProductGallery';

const CollectionGrid = ({ fields }) => {
  const [products, setProducts] = useState([]);
  const collectionHandle = fields.collectionHandle;

  useEffect(() => {
    const fetchCollection = async () => {
      const collections = await $nacelle
        .collections({
          handle: collectionHandle
        })
        .catch(() =>
          console.warn(
            `Collection not found with handle: '${collectionHandle}'`
          )
        );

      if (collections) {
        const products = await $nacelle
          .products({
            handles: collections.products.map(
              (product) => product.content.handle
            )
          })
          .catch((err) => {
            console.error(
              `Problem fetching products for CollectionGrid: $${err.message}`
            );
          });
        setProducts(products);
      }
    };
    fetchCollection();
  }, [collectionHandle]);

  return products.length && <ProductGallery products={products} />;
};

export default CollectionGrid;
