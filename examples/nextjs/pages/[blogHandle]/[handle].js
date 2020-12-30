import React from 'react';
import { useRouter } from 'next/router';
import $nacelle from 'services/nacelle.js';

const Blog = ({ articles }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <pre>{JSON.stringify(articles, null, 2)}</pre>;
};

export default Blog;

export async function getStaticPaths() {
  try {
    const allContent = await $nacelle.data.allContent();
    const blogs = allContent.filter((entry) => entry.type === 'blog');
    const paths = blogs.flatMap((blog) =>
      blog.articleLists[0].handles.map((handle) => ({
        params: { handle, blogHandle: blog.handle }
      }))
    );

    return {
      paths,
      fallback: true
    };
  } catch (err) {
    throw new Error(`could not fetch content: ${err.message}`);
  }
}

export async function getStaticProps({ params }) {
  const { handle } = params;
  const articles = await $nacelle.data
    .blogPage({
      handle,
      paginate: true,
      itemsPerPage: 6
    })
    .catch(() => {
      console.warn(`no articles found for blog with handle: '${handle}'`);
      return null;
    });

  return {
    props: { articles },
    revalidate: 60 * 60 * 24 // 1 day in seconds
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every day
    //
    // For more information, check out the docs:
    // https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  };
}
