import React, { useState, useEffect } from 'react';
import { nacelleClient } from 'services';

import ProductGallery from 'components/ProductGallery';

const CollectionGrid = ({ fields }) => {
  const [products, setProducts] = useState([]);
  const collectionHandle = fields.collectionHandle;

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const products = await nacelleClient.collectionPage({
          handle: collectionHandle,
          paginate: true,
          itemsPerPage: 12
        });

        setProducts(products);
      } catch {
        console.warn(`Collection not found with handle: '${collectionHandle}'`);
      }
    };
    fetchCollection();
  }, [collectionHandle]);

  return <ProductGallery products={products} />;
};

export default CollectionGrid;
