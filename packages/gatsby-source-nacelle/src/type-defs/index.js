module.exports = `
"A product that has been indexed by Nacelle"
  type NacelleProduct implements Node @dontInfer {
    remoteId: ID!
    handle: String!
    locale: String!
    globalHandle: String!
    pimSyncSourceDomain: String!
    pimSyncSource: String
    pimSyncSourceProductId: String
    pimSyncSourceLocale: String
    title: String
    description: String
    priceRange: PriceRange
    productType: String
    featuredMedia: NacelleMedia
    availableForSale: Boolean!
    vendor: String
    tags: [String!]
    media: [NacelleMedia!]
    metafields: [Metafield!]
    variants: [ProductVariant!]
    createdAt: Int
    updatedAt: Int
    indexedAt: Int!
  }

  "The price range and currency of a product"
  type PriceRange @dontInfer {
    min: String
    max: String
    currencyCode: String
  }

  "Details for different media types associated with content & products"
  type NacelleMedia @dontInfer {
    remoteId: ID
    type: String!
    src: String!
    thumbnailSrc: String!
    altText: String
    remoteImage: File @link
  }

  "A flexible key / value store that can be associated with many other pieces of Nacelle data"
  type Metafield @dontInfer {
    id: ID
    namespace: String
    key: String!
    value: String!
    source: String
  }

  "A product option that differs from the base product"
  type ProductVariant @dontInfer {
    id: ID!
    title: String
    price: String
    priceCurrency: String
    compareAtPrice: String
    compareAtPriceCurrency: String
    priceRules: [ProductPriceRule!]
    swatchSrc: String
    selectedOptions: [SelectedProductOption!]
    featuredMedia: NacelleMedia
    sku: String
    availableForSale: Boolean
    metafields: [Metafield!]
    weight: Float
    weightUnit: String
    quantityAvailable: Int
  }

  type ProductPriceRule @dontInfer {
    id: ID
    handle: String!
    title: String
    price: String
    priceCurrency: String
    comparedAtPrice: String
    priceBreaks: [ProductPriceBreaks!]
    availableTo: [String!]
    metafields: [Metafield!]
  }

  type ProductPriceBreaks @dontInfer {
    quantityMin: Int
    quantityMax: Int
    price: String
    metafields: [Metafield]
  }

  "Available options for a product variant (i.e. color, size, etc)"
  type SelectedProductOption @dontInfer {
    name: String!
    value: String!
  }

  "A collection of products that has been indexed by Nacelle"
  type NacelleCollection implements Node @dontInfer {
    remoteId: ID!
    handle: String!
    locale: String!
    globalHandle: String!
    pimSyncSourceDomain: String!
    pimSyncSource: String
    pimSyncSourceCollectionId: String
    pimSyncSourceLocale: String
    title: String
    description: String
    featuredMedia: NacelleMedia
    productLists: [NacelleProductList!]
    createdAt: Int
    updatedAt: Int
    metafields: [NacelleCollectionMetafield!]
  }

  type NacelleCollectionMetafield @dontInfer {
    id: ID
    namespace: String
    key: String!
    value: String!
    source: String
  }

  "A list of products by handle"
  type NacelleProductList @dontInfer {
    title: String!
    slug: String!
    locale: String
    handles: [String!]
  }

  "Content from a CMS that has been indexed by Nacelle"
  type NacelleContent implements Node @dontInfer {
    remoteId: ID!
    handle: String!
    locale: String!
    globalHandle: String!
    cmsSyncSource: String!
    cmsSyncSourceDomain: String!
    cmsSyncSourceContentId: String
    cmsSyncSourceLocale: String
    type: String!
    title: String
    description: String
    sections: JSON
    tags: [String!]
    remoteFields: JSON
    articleLists: [ContentArticleList!]
    relatedArticles: [ContentRelatedArticle!]
    collectionHandle: String
    content: String
    contentHtml: String
    excerpt: String
    blogHandle: String
    featuredMedia: NacelleMedia
    author: ContentAuthor
    publishDate: Int
    createdAt: Int
    updatedAt: Int
    indexedAt: Int!
  }

  "A list of articles by handle"
  type ContentArticleList @dontInfer {
    title: String!
    slug: String!
    locale: String
    handles: [String!]
  }

  "The author of the content"
  type ContentAuthor @dontInfer {
    firstName: String
    lastName: String
    bio: String
    email: String
  }

  "An article that is related to the current article"
  type ContentRelatedArticle @dontInfer {
    handle: String!
    title: String
    blogHandle: String
    cmsSyncSourceContentId: String
    locale: String!
    createdAt: Int
    updatedAt: Int
    description: String
    excerpt: String
    tags: [String!]
    author: ContentAuthor
    featuredMedia: NacelleMedia
    publishDate: Int
  }

  type OptionalMetafield @dontInfer {
    key: String
    value: String
  }

  input MetafieldInput @dontInfer {
    namespace: String
    key: String
    value: String
    source: String
  }

  "A sapce that has been created in the Nacelle dashboard"
  type NacelleSpace implements Node @dontInfer {
    remoteId: ID!
    type: String
    name: String
    domain: String
    token: String
    buildHook: String
      @deprecated(
        reason: "Features for this field were never implemented; it is currently a no-op"
      )
    privateToken: String
    publicToken: String
    pimSyncSourceDomain: String!
    cmsSyncSourceDomain: String
    linklists: [SpaceLinkList!]
    affinityLinklists: [SpaceAffinityLinkList!]
    metafields: [Metafield!]
    users: [SpaceUser!]
    featureFlags: [String]
  }

  input SpaceInput @dontInfer {
    id: String!
    domain: String
    name: String
    token: String
    privateToken: String
    publicToken: String
    type: String
    buildHook: String
    pimSyncSourceDomain: String
    cmsSyncSourceDomain: String
  }

  "A user who has access to a space"
  type SpaceUser @dontInfer {
    id: ID!
    email: String
    role: String
  }

  type SpaceAffinityLinkList @dontInfer {
    affinityGroupSlug: String!
    linklists: [SpaceLinkList!]!
  }

  "A list of links that can be used to generate pages & routes in a headless app"
  type SpaceLinkList @dontInfer {
    handle: String!
    links: [Link!]
  }

  "A link used to generate pages & routes in a headless app"
  type Link @dontInfer {
    title: String!
    to: String!
    type: String
    links: [Link!]
  }
`;
