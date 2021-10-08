const path = require('path');

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
  `);
  products.data.allNacelleProduct.edges.forEach((product) =>
    createPage({
      // Build a Product Detail Page (PDP) for each product
      path: `/products/${product.node.handle}`,
      component: path.resolve('./src/templates/product-detail.js'),
      context: {
        handle: product.node.handle
      }
    })
  );

  // Fetch all collections
  const collections = await graphql(`
    {
      allNacelleCollection {
        edges {
          node {
            handle
            productLists {
              slug
              handles
            }
          }
        }
      }
    }
  `);
  collections.data.allNacelleCollection.edges.forEach((collection) => {
    // Build Product Loading Pages (PLPs) for each collection
    const { handle, productLists } = collection.node;

    if (productLists.length) {
      const defaultList = productLists.find(
        (productList) => productList.slug === 'default'
      );

      if (defaultList?.handles.length) {
        // Paginate the collection
        const collectionProductHandles = defaultList.handles;
        const productsPerPage = 12;
        const numPages = Math.ceil(
          collectionProductHandles.length / productsPerPage
        );
        Array.from({ length: numPages }).forEach((_, i) => {
          const handles = collectionProductHandles.slice(
            i * productsPerPage,
            (i + 1) * productsPerPage
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
  });
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: require.resolve('@babel/plugin-proposal-optional-chaining')
  });
};
