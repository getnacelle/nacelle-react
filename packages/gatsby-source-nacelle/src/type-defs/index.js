module.exports = `
type CollectionContent @dontInfer {
  collectionEntryId: ID!
  createdAt: Int
  description: String
  fields: JSON
  handle: String
  indexedAt: Int
  locale: String
  metafields: [Metafield!]
  nacelleEntryId: ID!
  published: Boolean
  sourceEntryId: ID!
  title: String
  updatedAt: Int
}

"Represents master pieces of content like a page, article, employee, press-release, etc."
type NacelleContent implements Node @dontInfer {
  collections: [NacelleContentCollection!]
  createdAt: Int
  remoteFields: JSON
  handle: String
  indexedAt: Int
  locale: String
  nacelleEntryId: ID!
  published: Boolean
  sourceEntryId: ID!
  title: String
  type: String
  updatedAt: Int
}

"Represents a collection of content: articles for a blog, employees for an About Us page, press releases for a News page, etc."
type NacelleContentCollection implements Node @dontInfer {
  content: CollectionContent
  createdAt: Int
  entries: [NacelleContent!]
  indexedAt: Int
  metafields: [Metafield!]
  nacelleEntryId: ID!
  sourceEntryId: ID!
  tags: [String!]
  updatedAt: Int
}

"A piece of media that can represent an Image, 3dModel, or Video."
type Media @dontInfer {
  altText: String
  id: ID
  mimeType: String
  src: String!
  thumbnailSrc: String
  type: String!
  remoteImage: File @link
}

"Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are comprised of keys, values"
type Metafield @dontInfer {
  id: ID
  key: String!
  namespace: String
  value: String!
}

type NacelleNavigationGroup implements Node @dontInfer {
  groupId: String
  items: [NavigationGroupItem!]
  title: String
  updatedAt: String
  updatedBy: String
}

type NavigationGroupItem @dontInfer {
  items: [NavigationGroupItem!]
  title: String!
  url: String!
}

"A price break definition."
type PriceBreak @dontInfer {
  metafields: [Metafield!]
  price: String
  quantityMax: Int
  quantityMin: Int
}

"A price rule definition."
type PriceRule @dontInfer {
  availableTo: [String!]
  comparedAtPrice: String
  handle: String!
  id: ID
  metafields: [Metafield!]
  price: String!
  priceBreaks: [PriceBreak!]!
  priceCurrency: String!
  title: String!
}

"A product represents an individual item for sale. Products are often physical, but they don't have to be. For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty)."
type NacelleProduct implements Node @dontInfer {
  availableForSale: Boolean
  collections: [NacelleProductCollection!]
  content: ProductContent
  createdAt: Int
  indexedAt: Int
  metafields: [Metafield!]
  nacelleEntryId: ID!
  productType: String
  sourceEntryId: ID!
  tags: [String!]
  updatedAt: Int
  variants: [Variant!]
  vendor: String
}

"Represents a collection of products."
type NacelleProductCollection implements Node @dontInfer {
  content: CollectionContent
  createdAt: Int
  indexedAt: Int
  metafields: [Metafield!]
  nacelleEntryId: ID!
  products: [NacelleProduct!]
  sourceEntryId: ID!
  tags: [String!]
  updatedAt: Int
}

"A piece of product content represents the localized version of data points, with more flexibility."
type ProductContent @dontInfer {
  createdAt: Int
  description: String
  featuredMedia: Media
  fields: JSON
  handle: String
  indexedAt: Int
  locale: String
  media: [Media!]
  metafields: [Metafield!]
  nacelleEntryId: ID!
  options: [ProductOption!]
  productEntryId: ID
  published: Boolean
  sourceEntryId: ID!
  title: String
  updatedAt: Int
}

"Product property names like Size, Color, and Material that the customers can select. Variants are selected based on permutations of these options."
type ProductOption @dontInfer {
  name: String!
  values: [String!]
}

"Properties used by customers to select a product variant. Products can have multiple options, like different sizes or colors."
type SelectedOption @dontInfer {
  label: String
  name: String!
  value: String!
}

type NacelleSpaceProperties implements Node @dontInfer {
  properties: [SpacePropertyNamespace]
  updatedAt: String
  updatedBy: String
}

type SpacePropertyItem @dontInfer {
  key: String!
  value: String!
}

type SpacePropertyNamespace @dontInfer {
  items: [SpacePropertyItem]
  namespace: String
}

"A product variant represents a different version of a product, such as differing sizes or differing colors."
type Variant @dontInfer {
  availableForSale: Boolean
  compareAtPrice: String
  content: VariantContent
  createdAt: Int
  indexedAt: Int
  metafields: [Metafield!]
  nacelleEntryId: ID
  price: String
  priceCurrency: String
  priceRules: [PriceRule!]
  productEntryId: ID
  productHandle: String
  quantityAvailable: Int
  sku: String
  sourceEntryId: ID!
  updatedAt: Int
  weight: Float
  weightUnit: String
}

"A piece of variant content represents the localized version of data points, with more flexibility."
type VariantContent @dontInfer {
  createdAt: Int
  description: String
  featuredMedia: Media
  fields: JSON
  indexedAt: Int
  locale: String
  media: [Media!]
  metafields: [Metafield!]
  nacelleEntryId: ID!
  productEntryId: ID
  productHandle: String
  published: Boolean
  selectedOptions: [SelectedOption!]
  sourceEntryId: ID
  swatchSrc: String
  title: String
  updatedAt: Int
  variantEntryId: ID
}
`;
