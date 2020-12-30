import React, { Fragment } from 'react';

import $nacelle from 'services/nacelle.js';
import useCollection from 'hooks/useCollection';
import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';

const Collection = ({ collection, page }) => {
  const products = useCollection(collection);

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
    const collections = await $nacelle.data.allCollections();
    const paths = collections.map((collection) => {
      const { handle } = collection;
      return { params: { handle } };
    });

    return {
      paths,
      fallback: false
    };
  } catch (err) {
    console.error(`could not fetch collections: ${err.message}`);
  }
}

export async function getStaticProps({ params }) {
  const { handle } = params;
  const collection = await $nacelle.data.collection({ handle }).catch(() => {
    console.warn(`no collection with handle '${handle}' found.`);
    return null;
  });

  const page = await $nacelle.data.page({ handle }).catch(() => {
    console.warn(`no page with handle '${handle}' found.`);
    return null;
  });

  return { props: { collection, page } };
}
