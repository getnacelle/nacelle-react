import React from 'react';
import $nacelle from 'services/nacelle.js';

const Blog = ({ articles }) => {
  return <pre>{JSON.stringify(articles, null, 2)}</pre>;
};

export default Blog;

export async function getStaticPaths() {
  try {
    const allContent = await $nacelle.data.allContent();
    const blogs = allContent.filter((entry) => entry.type === 'blog');
    const paths = blogs.flatMap((blog) =>
      blog.articleLists[0].handles.map((handle) => ({ params: { handle } }))
    );

    return {
      paths,
      fallback: false
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

  return { props: { articles } };
}
