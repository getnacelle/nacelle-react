import React from 'react';
import { nacelleClient } from 'services';
import { dataToPaths } from 'utils';

const Blog = ({ articles }) => {
  return <pre>{JSON.stringify(articles, null, 2)}</pre>;
};

export default Blog;

export async function getStaticPaths() {
  try {
    const allContent = await nacelleClient.data.allContent();
    const articles = allContent.filter((entry) => entry.type === 'article');
    const paths = dataToPaths({
      data: articles,
      dataProperties: ['handle', 'blogHandle']
    });

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (err) {
    throw new Error(`could not fetch content: ${err.message}`);
  }
}

export async function getStaticProps({
  params: { handle, blogHandle },
  previewData
}) {
  try {
    const articles = await nacelleClient.data
      .article({
        handle,
        blogHandle,
        previewData
      })
      .catch(() => {
        console.warn(
          `no article with handle '${handle}' found for blog with handle: '${blogHandle}'`
        );
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
  } catch (err) {
    return {
      notFound: true
    };
  }
}
