import React from 'react';
import { useRouter } from 'next/router';
import $nacelle from 'services/nacelle.js';
import { dataToPaths } from 'utils';

const Page = ({ page }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return page && <pre>{JSON.stringify(page, null, 2)}</pre>;
};

export default Page;

export async function getStaticPaths() {
  try {
    const allContent = await $nacelle.data.allContent();
    const pages = allContent.filter((entry) => entry.type === 'page');
    const paths = dataToPaths({ data: pages });

    return {
      paths,
      fallback: true
    };
  } catch (err) {
    throw new Error(`could not fetch content:\n${err.message}`);
  }
}

export async function getStaticProps({ params: { handle }, preview }) {
  const page = await $nacelle.data.page({ handle, preview }).catch(() => {
    console.warn(`no page with handle '${handle}' found.`);
    return null;
  });

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
}
