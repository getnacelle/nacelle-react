import React, {useState, useEffect} from 'react';
import $nacelle from 'services/nacelle';

import ProductGallery from 'components/ProductGallery';

const CollectionGrid = ({ fields }) => {
  const [products, setProducts] = useState([])
  const collectionHandle = fields.collectionHandle

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const collection = await $nacelle.data.collection({ handle: collectionHandle })
        const products = await $nacelle.data.products({
          handles: collection
          .productLists
          .find(listEntry => listEntry.slug === 'default')
          .handles
        })
        setProducts(products)
      } catch {
        console.warn(`Collection not found with handle: '${collectionHandle}'`)
      }
    }
    fetchCollection()
  }, [collectionHandle])

  return (
    <ProductGallery products={products} />
  );
};

export default CollectionGrid;
