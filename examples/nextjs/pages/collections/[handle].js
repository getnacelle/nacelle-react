import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import { nacelleClient } from 'services';
import { dataToPaths } from 'utils';
import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';

const Collection = ({ products, page }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      {page && <ContentSections sections={page.sections} />}
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
      fallback: true
    };
  } catch (err) {
    console.error(`could not fetch collections: ${err.message}`);
  }
}

export async function getStaticProps({ params: { handle }, preview }) {
  const collection = await nacelleClient.data
    .collection({ handle, preview })
    .catch(() => {
      console.warn(`no collection with handle '${handle}' found.`);
      return null;
    });

  const defaultProductList =
    collection &&
    collection.productLists.find((list) => {
      return list.slug === 'default';
    });

  const handles = defaultProductList?.handles;

  const products = await nacelleClient.data
    .products({ handles, preview })
    .catch(() => {
      console.warn(`no products found for collection '${handle}'.`);
      return [];
    });

  const page = await nacelleClient.data.page({ handle, preview }).catch(() => {
    console.warn(`no page with handle '${handle}' found.`);
    return null;
  });

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
}
