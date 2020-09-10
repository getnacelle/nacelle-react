const path = require('path')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Fetch all products
  const products = await graphql(`
    {
      allNacelleProduct {
        edges {
          node {
            handle
          }
        }
      }
    }  
  `)
  products.data.allNacelleProduct.edges.forEach(product => (
    createPage({
      // Build a Product Detail Page (PDP) for each product
      path: `/products/${product.node.handle}`,
      component: path.resolve('./src/templates/product-detail.js'),
      context: {
        handle: product.node.handle
      }
    }))
  )

  // Fetch all collections
  const collections = await graphql(`
    {
      allNacelleCollection {
        edges {
          node {
            handle
            title
            productLists {
              slug
              handles
            }
          }
        }
      }
    }
  `)
  collections.data.allNacelleCollection.edges.forEach(collection => {
    const { title, handle, productLists, featuredMedia } = collection.node
    createPage({
      // Build a Product Loading Page (PLP) for each collection
      path: `/collections/${collection.node.handle}`,
      component: path.resolve('./src/templates/collection.js'),
      context: {
        title,
        handle,
        handles: productLists
          .find(productList => productList.slug === "default")
          .handles,
        imageSrc: featuredMedia && featuredMedia.src
      }
    })
  })
}