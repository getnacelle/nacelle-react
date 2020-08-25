import React from 'react'
import $nacelle from 'services/nacelle.js'

const Blog = ({ articles }) => {
  return <pre>{JSON.stringify(articles)}</pre>;
};

export default Blog

export async function getStaticPaths() {
  try {
    const allContent = await $nacelle.data.allContent()
    const blogs = allContent.filter(entry => entry.type === "blog")
    return {
      paths: blogs.flatMap(
        blog => blog.articleLists[0].handles.map(
          handle => {
            return { params: { blogHandle: blog.handle, handle }}
          }
        )
      ),
      fallback: false // See the "fallback" section below
    };
  } catch(err) {
    console.error(`Error fetching blogs & articles:\n${err}`)
  }  
}

export async function getStaticProps({ params }) {
  const articles = await $nacelle.data.blogPage({
    handle: params.blogHandle,
    paginate: true,
    itemsPerPage: 6
  });
  
  return {
    props: { articles }, // will be passed to the page component as props
  }
}
