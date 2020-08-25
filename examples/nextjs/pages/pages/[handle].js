import React from 'react'
import $nacelle from 'services/nacelle.js'

const Page = ({ page }) => {
  return page && <pre>{JSON.stringify(page)}</pre>;
};

export default Page

export async function getStaticPaths() {
  try {
    const allContent = await $nacelle.data.allContent()
    const pages = allContent.filter(entry => entry.type === "page")
    return {
      paths: pages.map(page => {
        const { handle } = page
        return { params: { handle } }
      }),
      fallback: false // See the "fallback" section below
    };
  } catch (err) {
    console.error(`Error fetching page:\n${err}`)
  }
}

export async function getStaticProps({ params }) {
  try {
    const page = await $nacelle.data.page({
      handle: params.handle
    });

    return {
      props: { page }, // will be passed to the page component as props
    }
  } catch {
    console.warn(`Problem fetching page data for page with handle '${params.handle}'`)
    return { props: { page: null }}
  }
}
