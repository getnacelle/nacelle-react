import React from 'react';
import { nacelleClient } from 'services';
import { dataToPaths } from 'utils';

const Page = ({ page }) => {
  return page && <pre>{JSON.stringify(page, null, 2)}</pre>;
};

export default Page;

export async function getStaticPaths() {
  try {
    const allContent = await nacelleClient.data.allContent();
    const pages = allContent.filter((entry) => entry.type === 'page');
    const paths = dataToPaths({ data: pages });

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (err) {
    throw new Error(`could not fetch content:\n${err.message}`);
  }
}

export async function getStaticProps({ params: { handle }, previewData }) {
  try {
    const page = await nacelleClient.data.page({ handle, previewData });

    return {
      props: { page },
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
