const sourceNodes = require('./src/source-nodes');
const typeDefs = require('./src/type-defs');

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    nacelleClient: Joi.required().description(
      'Instance of the `@nacelle/storefront-sdk` which you want to use to fetch your nacelle data'
    ),
    cacheDuration: Joi.number().description(
      'Max duration in ms that gatsby-source-nacelle caches product, collection, and content data from previous builds'
    )
  });
};

exports.sourceNodes = async (gatsbyApi, pluginOptions) => {
  const { nacelleClient } = pluginOptions;

  const client = nacelleClient;

  const [
    spaceData,
    navigationData,
    productData,
    productCollectionData,
    contentData,
    contentCollectionData
  ] = await Promise.all([
    // fetch data from Nacelle's Hail Frequency API
    client.spaceProperties(),
    client.navigation(),
    client.products(),
    client.productCollections(),
    client.content(),
    client.contentCollections()
  ]).catch((err) => {
    throw new Error(`Could not fetch data from Nacelle: ${err.message}`);
  });

  await Promise.all([
    // use Nacelle data to create Gatsby nodes
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: spaceData,
      dataType: 'SpaceProperties',
      uniqueIdProperty: null
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: navigationData,
      dataType: 'NavigationGroup',
      uniqueIdProperty: 'groupId'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: productData,
      dataType: 'Product'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: productCollectionData,
      dataType: 'ProductCollection'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: contentData,
      dataType: 'Content'
    }),
    sourceNodes({
      gatsbyApi,
      pluginOptions,
      data: contentCollectionData,
      dataType: 'ContentCollection'
    })
  ]).catch((err) => {
    throw new Error(
      `Could not create Gatsby nodes from Nacelle data: ${err.message}`
    );
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  // create custom type definitions to maintain data shape
  // in both preview and production settings
  actions.createTypes(typeDefs);
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    NacelleProductCollection: {
      products: {
        type: ['NacelleProduct'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                nacelleEntryId: {
                  in: source.products.map((product) => product.nacelleEntryId)
                }
              }
            },
            type: 'NacelleProduct'
          });
          return entries;
        }
      }
    },
    NacelleProduct: {
      collections: {
        type: ['NacelleProductCollection'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                products: {
                  elemMatch: { nacelleEntryId: { eq: source.nacelleEntryId } }
                }
              }
            },
            type: 'NacelleProductCollection'
          });
          return entries;
        }
      }
    },
    NacelleContentCollection: {
      entries: {
        type: ['NacelleContent'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                nacelleEntryId: {
                  in: source.entries.map((entry) => entry.nacelleEntryId)
                }
              }
            },
            type: 'NacelleContent'
          });
          return entries;
        }
      }
    },
    NacelleContent: {
      collections: {
        type: ['NacelleContentCollection'],
        resolve: async (source, args, context) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                entries: {
                  elemMatch: { nacelleEntryId: { eq: source.nacelleEntryId } }
                }
              }
            },
            type: 'NacelleContentCollection'
          });
          return entries;
        }
      }
    }
  });
};

exports.onPostBootstrap = async function ({ cache }) {
  cache.set('nacelle-timestamp', Date.now());
};
