import React from 'react';
import $nacelle from 'services/nacelle.js';

const Page = ({ page }) => {
  return page && <pre>{JSON.stringify(page, null, 2)}</pre>;
};

export default Page;

export async function getStaticPaths() {
  try {
    const allContent = await $nacelle.data.allContent();
    const pages = allContent.filter((entry) => entry.type === 'page');
    const paths = pages.map((page) => {
      const { handle } = page;
      return { params: { handle } };
    });

    return {
      paths,
      fallback: false
    };
  } catch (err) {
    throw new Error(`could not fetch content:\n${err.message}`);
  }
}

export async function getStaticProps({ params }) {
  const { handle } = params;
  const page = await $nacelle.data.page({ handle }).catch(() => {
    console.warn(`no page with handle '${handle}' found.`);
    return null;
  });

  return { props: { page } };
}
