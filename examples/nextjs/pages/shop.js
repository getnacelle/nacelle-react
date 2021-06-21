import React, { Fragment } from 'react';

import { nacelleClient } from 'services';
import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';

export default function Shop({ page, products }) {
  return (
    <Fragment>
      {page?.sections && <ContentSections sections={page.sections} />}
      <ProductGallery products={products} />
    </Fragment>
  );
}

export async function getStaticProps({ previewData }) {
  try {
    const products = await nacelleClient.data.allProducts({ previewData });
    const page = await nacelleClient.data.page({ handle: 'shop', previewData });

    return {
      props: { products, page }
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
}
