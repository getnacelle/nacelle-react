import React, { Fragment } from 'react';

import { nacelleClient } from 'services';
import { dataToPaths } from 'utils';
import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';

const Collection = ({ products, page }) => {
  return (
    <Fragment>
      {page?.sections && <ContentSections sections={page.sections} />}
      <ProductGallery products={products} />
    </Fragment>
  );
};

export default Collection;

export async function getStaticPaths() {
  try {
    const collections = await nacelleClient.data.allCollections();
    const paths = dataToPaths({ data: collections });

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (err) {
    console.error(`could not fetch collections: ${err.message}`);
  }
}

export async function getStaticProps({ params: { handle }, previewData }) {
  try {
    const products = await nacelleClient.data.collectionPage({
      handle,
      previewData,
      paginate: true,
      itemsPerPage: 24
    });

    const page = await nacelleClient.data.page({ handle, previewData });

    return {
      props: { products, page },
      revalidate: 60 * 60 * 24 // 1 day in seconds
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every day
      //
      // For more information, check out the docs:
      // https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
    };
  } catch (err) {
    return {
      notFound: true
    };
  }
}
