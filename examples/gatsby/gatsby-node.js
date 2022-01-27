const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  // Fetch all products
  const products = await graphql(`
    {
      allNacelleProduct {
        edges {
          node {
            content {
              handle
            }
          }
        }
      }
    }
  `);
  products.data.allNacelleProduct.edges.forEach(({ node: product }) =>
    createPage({
      // Build a Product Detail Page (PDP) for each product
      path: `/products/${product.content.handle}`,
      component: path.resolve('./src/templates/product-detail.js'),
      context: {
        handle: product.content.handle
      }
    })
  );

  // Create `/shop` pages
  const allProductHandles = products.data.allNacelleProduct.edges.map(
    (edge) => edge.node.content.handle
  );
  if (allProductHandles.length) {
    const productsPerPage = 12;
    const numPages = Math.ceil(allProductHandles.length / productsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      const handles = allProductHandles.slice(
        i * productsPerPage,
        (i + 1) * productsPerPage
      );

      createPage({
        path: i === 0 ? '/shop' : `/shop/${i + 1}`,
        component: path.resolve('./src/templates/shop.js'),
        context: {
          handles,
          numPages,
          currentPage: i + 1
        }
      });
    });
  }

  // Fetch all collections
  const collections = await graphql(`
    {
      allNacelleProductCollection {
        edges {
          node {
            content {
              handle
            }
            products {
              content {
                handle
              }
            }
          }
        }
      }
    }
  `);
  collections.data.allNacelleProductCollection.edges.forEach(
    ({ node: collection }) => {
      // Build Product Loading Pages (PLPs) for each collection
      const handle = collection.content?.handle;
      if (!handle) return;
      const products = collection.products;
      if (products.length) {
        const productsPerPage = 12;
        const numPages = Math.ceil(products.length / productsPerPage);
        Array.from({ length: numPages }).forEach((_, i) => {
          const paginatedProducts = products.slice(
            i * productsPerPage,
            (i + 1) * productsPerPage
          );
          const handles = paginatedProducts.map(
            (product) => product.content.handle
          );
          createPage({
            path:
              i === 0
                ? `/collections/${handle}`
                : `/collections/${handle}/${i + 1}`,
            component: path.resolve('./src/templates/collection.js'),
            context: {
              handle,
              handles,
              numPages,
              currentPage: i + 1
            }
          });
        });
      }
    }
  );
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve('@babel/plugin-proposal-optional-chaining')
  });
};
