import React, { Fragment } from 'react';

import $nacelle from 'services/nacelle';
import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';

export default function Shop({ page, products }) {
  return (
    <Fragment>
      {page && <ContentSections sections={page.sections} />}
      <ProductGallery products={products} />
    </Fragment>
  );
}

export async function getStaticProps({ preview }) {
  try {
    const products = await $nacelle.data.allProducts();
    const page = await $nacelle.data.page({ handle: 'shop', preview });
    return {
      props: { products, page }
    };
  } catch (err) {
    console.error(`Error fetching products on homepage:\n${err}`);
  }
}
