module.exports = `
  "Details for different media types associated with content & products"
  type NacelleMedia @dontInfer {
    remoteId: ID
    type: String!
    src: String!
    thumbnailSrc: String!
    altText: String
    remoteImage: File @link
  }

  "Content from a CMS that has been indexed by Nacelle"
  type NacelleContent implements Node @infer {
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
    tags: [String!]
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
`;
