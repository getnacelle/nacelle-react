import React, { useState, useEffect } from 'react';
import $nacelle from 'services/nacelle';

import ProductGallery from 'components/ProductGallery';

const CollectionGrid = ({ fields }) => {
  const [products, setProducts] = useState([]);
  const collectionHandle = fields.collectionHandle;

  useEffect(() => {
    const fetchCollection = async () => {
      const collection = await $nacelle.data
        .collection({
          handle: collectionHandle
        })
        .catch(() =>
          console.warn(
            `Collection not found with handle: '${collectionHandle}'`
          )
        );

      if (collection) {
        const products = await $nacelle.data
          .products({
            handles: collection.productLists.find(
              (listEntry) => listEntry.slug === 'default'
            ).handles
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
