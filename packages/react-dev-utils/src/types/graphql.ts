export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type ArticleList = {
  __typename?: 'ArticleList';
  title: Scalars['String'];
  slug: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  handles?: Maybe<Array<Scalars['String']>>;
};

export type ArticleListInput = {
  title: Scalars['String'];
  slug: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  handles?: Maybe<Array<Scalars['String']>>;
};

export type Author = {
  __typename?: 'Author';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type AuthorInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CheckoutDataConfig = {
  __typename?: 'CheckoutDataConfig';
  dataSource?: Maybe<Scalars['String']>;
  graphqlDataToken?: Maybe<Scalars['String']>;
  graphqlEndpoint?: Maybe<Scalars['String']>;
  restEndpoint?: Maybe<Scalars['String']>;
  alternativeDataSource?: Maybe<Scalars['String']>;
  alternativeDataToken?: Maybe<Scalars['String']>;
  alternativeDataRestEndpoint?: Maybe<Scalars['String']>;
  shopifyUrl?: Maybe<Scalars['String']>;
};

export type CheckoutDataConfigInput = {
  dataSource?: Maybe<Scalars['String']>;
  graphqlDataToken?: Maybe<Scalars['String']>;
  graphqlEndpoint?: Maybe<Scalars['String']>;
  restEndpoint?: Maybe<Scalars['String']>;
  alternativeDataSource?: Maybe<Scalars['String']>;
  alternativeDataToken?: Maybe<Scalars['String']>;
  alternativeDataRestEndpoint?: Maybe<Scalars['String']>;
  shopifyUrl?: Maybe<Scalars['String']>;
};

export type ClearCollectionIndexInput = {
  pim: PimInput;
};

export type ClearCollectionIndexOutput = {
  __typename?: 'ClearCollectionIndexOutput';
  count: Scalars['Int'];
  deletedIds?: Maybe<Array<Scalars['String']>>;
};

export type ClearContentIndexInput = {
  cms: CmsInput;
};

export type ClearContentIndexOutput = {
  __typename?: 'ClearContentIndexOutput';
  count: Scalars['Int'];
  deletedIds?: Maybe<Array<Scalars['String']>>;
};

export type ClearProductIndexInput = {
  pim: PimInput;
};

export type ClearProductIndexOutput = {
  __typename?: 'ClearProductIndexOutput';
  count: Scalars['Int'];
  deletedIds?: Maybe<Array<Scalars['String']>>;
};

export type Cms = {
  __typename?: 'Cms';
  syncSource: Scalars['String'];
  syncSourceDomain: Scalars['String'];
  defaultLocale: Scalars['String'];
};

export type CmsInput = {
  syncSource: Scalars['String'];
  syncSourceDomain: Scalars['String'];
  defaultLocale: Scalars['String'];
};

export type Collection = {
  __typename?: 'Collection';
  id: Scalars['ID'];
  handle: Scalars['String'];
  locale: Scalars['String'];
  pimSyncSourceCollectionId?: Maybe<Scalars['ID']>;
  pimSyncSourceLocale?: Maybe<Scalars['String']>;
  globalHandle: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Media>;
  productLists?: Maybe<Array<ProductList>>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type CollectionInput = {
  id?: Maybe<Scalars['ID']>;
  pimSyncSourceCollectionId?: Maybe<Scalars['ID']>;
  pimSyncSourceLocale?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  locale: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<MediaInput>;
  productLists?: Maybe<Array<ProductListInput>>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ConnectorConfig = {
  __typename?: 'ConnectorConfig';
  type: Scalars['String'];
  graphqlDataToken?: Maybe<Scalars['String']>;
  graphqlEndpoint?: Maybe<Scalars['String']>;
  restEndpoint?: Maybe<Scalars['String']>;
  webhookKey?: Maybe<Scalars['String']>;
};

export type ConnectorConfigInput = {
  type: Scalars['String'];
  autoSync?: Maybe<Scalars['Boolean']>;
  graphqlDataToken?: Maybe<Scalars['String']>;
  graphqlEndpoint?: Maybe<Scalars['String']>;
  restEndpoint?: Maybe<Scalars['String']>;
  webhookKey?: Maybe<Scalars['String']>;
};

export type Content = {
  __typename?: 'Content';
  id?: Maybe<Scalars['ID']>;
  handle: Scalars['String'];
  locale: Scalars['String'];
  cmsSyncSourceContentId?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sections?: Maybe<Scalars['JSON']>;
  tags?: Maybe<Array<Scalars['String']>>;
  fields?: Maybe<Scalars['JSON']>;
  articleLists?: Maybe<Array<ArticleList>>;
  collectionHandle?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentHtml?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  blogHandle?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Media>;
  publishDate?: Maybe<Scalars['Int']>;
  author?: Maybe<Author>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ContentDataConfig = {
  __typename?: 'ContentDataConfig';
  dataSource?: Maybe<Scalars['String']>;
  graphqlDataToken?: Maybe<Scalars['String']>;
  graphqlEndpoint?: Maybe<Scalars['String']>;
  restEndpoint?: Maybe<Scalars['String']>;
  assetStorage?: Maybe<Scalars['String']>;
};

export type ContentInput = {
  id?: Maybe<Scalars['ID']>;
  handle: Scalars['String'];
  locale: Scalars['String'];
  cmsSyncSourceContentId?: Maybe<Scalars['ID']>;
  cmsSyncSourceLocale?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sections?: Maybe<Scalars['JSON']>;
  tags?: Maybe<Array<Scalars['String']>>;
  fields?: Maybe<Scalars['JSON']>;
  articleLists?: Maybe<Array<ArticleListInput>>;
  relatedArticles?: Maybe<Scalars['JSON']>;
  collectionHandle?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentHtml?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  blogHandle?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<MediaInput>;
  publishDate?: Maybe<Scalars['Int']>;
  author?: Maybe<AuthorInput>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type DeleteCollectionInput = {
  pim: PimInput;
  id: Scalars['String'];
};

export type DeleteContentInput = {
  cms: CmsInput;
  id: Scalars['String'];
};

export type DeleteProductInput = {
  pim: PimInput;
  id: Scalars['String'];
};

export type FeaturedProducts = {
  __typename?: 'FeaturedProducts';
  collectionHandle: Scalars['String'];
  productHandles: Array<Scalars['String']>;
};

export type FeaturedProductsInput = {
  collectionHandle: Scalars['String'];
  productHandles: Array<Scalars['String']>;
};

export type FeaturedProductsResult = {
  __typename?: 'FeaturedProductsResult';
  result?: Maybe<Result>;
  featuredProducts: Array<FeaturedProducts>;
};

export type IndexCollectionsInput = {
  pim: PimInput;
  collections: Array<CollectionInput>;
};

export type IndexCollectionsOutput = {
  __typename?: 'IndexCollectionsOutput';
  count: Scalars['Int'];
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type IndexContentInput = {
  cms: CmsInput;
  content: Array<ContentInput>;
};

export type IndexContentOutput = {
  __typename?: 'IndexContentOutput';
  count: Scalars['Int'];
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type IndexProductOutput = {
  __typename?: 'IndexProductOutput';
  count: Scalars['Int'];
  ids?: Maybe<Array<Scalars['ID']>>;
};

export type IndexProductsInput = {
  pim: PimInput;
  products: Array<ProductInput>;
};

export type Link = {
  __typename?: 'Link';
  title?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Maybe<Link>>>;
};

export type LinkList = {
  __typename?: 'LinkList';
  handle?: Maybe<Scalars['String']>;
  links?: Maybe<Array<Maybe<Link>>>;
};

export type Media = {
  __typename?: 'Media';
  id?: Maybe<Scalars['ID']>;
  type: Scalars['String'];
  src: Scalars['String'];
  thumbnailSrc?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
};

export type MediaInput = {
  id?: Maybe<Scalars['ID']>;
  type: Scalars['String'];
  src: Scalars['String'];
  thumbnailSrc?: Maybe<Scalars['String']>;
  altText?: Maybe<Scalars['String']>;
};

export type MerchandisingRule = {
  __typename?: 'MerchandisingRule';
  inputs: Array<Scalars['String']>;
  outputs: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type MerchandisingRuleInput = {
  inputs: Array<Scalars['String']>;
  outputs: Array<Scalars['String']>;
  type: Scalars['String'];
};

export type MerchandisingRulesResult = {
  __typename?: 'MerchandisingRulesResult';
  result?: Maybe<Result>;
  rules: Array<MerchandisingRule>;
};

export type Metafield = {
  __typename?: 'Metafield';
  id?: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type MetafieldInput = {
  id?: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  namespace?: Maybe<Scalars['String']>;
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addUserToSpace?: Maybe<SpaceUpdateResult>;
  addUserToSpaceByEmail?: Maybe<SpaceUpdateResult>;
  clearCollectionIndex?: Maybe<ClearCollectionIndexOutput>;
  clearContentIndex?: Maybe<ClearContentIndexOutput>;
  clearProductIndex?: Maybe<ClearProductIndexOutput>;
  createNewSpace?: Maybe<SpaceUpdateResult>;
  deleteCollection?: Maybe<Scalars['Boolean']>;
  deleteContent?: Maybe<Scalars['Boolean']>;
  deleteProduct?: Maybe<Scalars['Boolean']>;
  editUserRoleForSpace?: Maybe<SpaceUpdateResult>;
  indexCollections?: Maybe<IndexCollectionsOutput>;
  indexContent?: Maybe<IndexContentOutput>;
  indexProducts?: Maybe<IndexProductOutput>;
  removeUserFromSpace?: Maybe<SpaceUpdateResult>;
  setBrandSettings?: Maybe<SpaceUpdateResult>;
  setBuildSettings?: Maybe<SpaceUpdateResult>;
  setCheckoutSettings?: Maybe<SpaceUpdateResult>;
  setContentSettings?: Maybe<SpaceUpdateResult>;
  setProductSettings?: Maybe<SpaceUpdateResult>;
  updateFeaturedProducts?: Maybe<FeaturedProductsResult>;
  updateMerchandisingRules?: Maybe<MerchandisingRulesResult>;
  updateSpace?: Maybe<SpaceUpdateResult>;
  updateSpaceLinkLists?: Maybe<SpaceUpdateResult>;
  updateSpaceMetafields?: Maybe<SpaceUpdateResult>;
  updateUserEmail?: Maybe<UserUpdateResult>;
  updateUserRoleForSpace?: Maybe<UserUpdateResult>;
};

export type MutationAddUserToSpaceArgs = {
  spaceId: Scalars['String'];
  userId: Scalars['String'];
  role: Scalars['String'];
};

export type MutationAddUserToSpaceByEmailArgs = {
  spaceId: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
};

export type MutationClearCollectionIndexArgs = {
  input?: Maybe<ClearCollectionIndexInput>;
};

export type MutationClearContentIndexArgs = {
  input?: Maybe<ClearContentIndexInput>;
};

export type MutationClearProductIndexArgs = {
  input?: Maybe<ClearProductIndexInput>;
};

export type MutationCreateNewSpaceArgs = {
  name: Scalars['String'];
  domain: Scalars['String'];
};

export type MutationDeleteCollectionArgs = {
  input?: Maybe<DeleteCollectionInput>;
};

export type MutationDeleteContentArgs = {
  input?: Maybe<DeleteContentInput>;
};

export type MutationDeleteProductArgs = {
  input?: Maybe<DeleteProductInput>;
};

export type MutationEditUserRoleForSpaceArgs = {
  spaceId: Scalars['String'];
  userId: Scalars['String'];
  role: Scalars['String'];
};

export type MutationIndexCollectionsArgs = {
  input?: Maybe<IndexCollectionsInput>;
};

export type MutationIndexContentArgs = {
  input?: Maybe<IndexContentInput>;
};

export type MutationIndexProductsArgs = {
  input?: Maybe<IndexProductsInput>;
};

export type MutationRemoveUserFromSpaceArgs = {
  spaceId: Scalars['String'];
  userId: Scalars['String'];
};

export type MutationSetBrandSettingsArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
  domain: Scalars['String'];
};

export type MutationSetBuildSettingsArgs = {
  id: Scalars['String'];
  buildHook: Scalars['String'];
};

export type MutationSetCheckoutSettingsArgs = {
  id: Scalars['String'];
  source: Scalars['String'];
  token: Scalars['String'];
  endpoint: Scalars['String'];
  alternativeDataSource?: Maybe<Scalars['String']>;
  alternativeDataToken?: Maybe<Scalars['String']>;
  alternativeDataRestEndpoint?: Maybe<Scalars['String']>;
  shopifyUrl?: Maybe<Scalars['String']>;
};

export type MutationSetContentSettingsArgs = {
  id: Scalars['String'];
  source: Scalars['String'];
  token: Scalars['String'];
  endpoint: Scalars['String'];
  restEndpoint: Scalars['String'];
  assetStorage: Scalars['String'];
};

export type MutationSetProductSettingsArgs = {
  id: Scalars['String'];
  source: Scalars['String'];
  token: Scalars['String'];
  endpoint: Scalars['String'];
};

export type MutationUpdateFeaturedProductsArgs = {
  id: Scalars['String'];
  featuredProducts: Array<FeaturedProductsInput>;
};

export type MutationUpdateMerchandisingRulesArgs = {
  id: Scalars['String'];
  rules: Array<MerchandisingRuleInput>;
};

export type MutationUpdateSpaceArgs = {
  space: SpaceInput;
};

export type MutationUpdateSpaceLinkListsArgs = {
  id: Scalars['String'];
  linklists?: Maybe<Scalars['String']>;
};

export type MutationUpdateSpaceMetafieldsArgs = {
  id: Scalars['String'];
  metafields?: Maybe<Array<Maybe<MetafieldInput>>>;
};

export type MutationUpdateUserEmailArgs = {
  userId: Scalars['String'];
  email: Scalars['String'];
};

export type MutationUpdateUserRoleForSpaceArgs = {
  userId: Scalars['String'];
  spaceId: Scalars['String'];
  role: Scalars['String'];
};

export type Pim = {
  __typename?: 'Pim';
  syncSource: Scalars['String'];
  syncSourceDomain: Scalars['String'];
  defaultLocale: Scalars['String'];
};

export type PimInput = {
  syncSource: Scalars['String'];
  syncSourceDomain: Scalars['String'];
  defaultLocale: Scalars['String'];
};

export type PopularSearchesResult = {
  __typename?: 'PopularSearchesResult';
  result: Result;
  searchQueries?: Maybe<Array<Maybe<SearchQueries>>>;
  totalQueries?: Maybe<Scalars['Int']>;
};

export type PriceBreakInput = {
  quantityMax?: Maybe<Scalars['Int']>;
  quantityMin?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['String']>;
  metafields?: Maybe<Array<MetafieldInput>>;
};

export type PriceBreaks = {
  __typename?: 'PriceBreaks';
  quantityMin?: Maybe<Scalars['Int']>;
  quantityMax?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['String']>;
  metafields?: Maybe<Array<Maybe<Metafield>>>;
};

export type PriceRange = {
  __typename?: 'PriceRange';
  min?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
};

export type PriceRangeInput = {
  min?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
};

export type PriceRule = {
  __typename?: 'PriceRule';
  id?: Maybe<Scalars['ID']>;
  handle: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  priceCurrency?: Maybe<Scalars['String']>;
  comparedAtPrice?: Maybe<Scalars['String']>;
  priceBreaks?: Maybe<Array<PriceBreaks>>;
  availableTo?: Maybe<Array<Scalars['String']>>;
  metafields?: Maybe<Array<Metafield>>;
};

export type PriceRuleInput = {
  id?: Maybe<Scalars['ID']>;
  handle: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  priceCurrency?: Maybe<Scalars['String']>;
  comparedAtPrice?: Maybe<Scalars['String']>;
  priceBreaks?: Maybe<Array<PriceBreakInput>>;
  availableTo?: Maybe<Array<Scalars['String']>>;
  metafields?: Maybe<Array<MetafieldInput>>;
};

export type Product = {
  __typename?: 'Product';
  id?: Maybe<Scalars['ID']>;
  sourceProductId?: Maybe<Scalars['ID']>;
  pimSyncSourceLocale?: Maybe<Scalars['String']>;
  handle: Scalars['String'];
  globalHandle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priceRange?: Maybe<PriceRange>;
  productType?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Media>;
  availableForSale: Scalars['Boolean'];
  vendor?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  options?: Maybe<Array<ProductOption>>;
  media?: Maybe<Array<Media>>;
  metafields?: Maybe<Array<Metafield>>;
  variants?: Maybe<Array<Variant>>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ProductDataConfig = {
  __typename?: 'ProductDataConfig';
  dataSource?: Maybe<Scalars['String']>;
  graphqlDataToken?: Maybe<Scalars['String']>;
  graphqlEndpoint?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  id?: Maybe<Scalars['ID']>;
  handle: Scalars['String'];
  locale: Scalars['String'];
  pimSyncSourceProductId?: Maybe<Scalars['ID']>;
  pimSyncSourceLocale?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priceRange?: Maybe<PriceRangeInput>;
  productType?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<MediaInput>;
  availableForSale: Scalars['Boolean'];
  vendor?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  options?: Maybe<Array<ProductOptionInput>>;
  media?: Maybe<Array<MediaInput>>;
  metafields?: Maybe<Array<MetafieldInput>>;
  variants?: Maybe<Array<VariantInput>>;
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type ProductList = {
  __typename?: 'ProductList';
  title: Scalars['String'];
  slug: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  handles?: Maybe<Array<Scalars['String']>>;
};

export type ProductListInput = {
  title: Scalars['String'];
  slug: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  handles?: Maybe<Array<Scalars['String']>>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  name: Scalars['String'];
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProductOptionInput = {
  name: Scalars['String'];
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  featuredProducts?: Maybe<FeaturedProductsResult>;
  getSpace?: Maybe<Space>;
  merchandisingRules?: Maybe<MerchandisingRulesResult>;
  popularSearchesBySpace: PopularSearchesResult;
  test?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type QueryFeaturedProductsArgs = {
  id: Scalars['String'];
};

export type QueryGetSpaceArgs = {
  id: Scalars['String'];
};

export type QueryMerchandisingRulesArgs = {
  id: Scalars['String'];
};

export type QueryPopularSearchesBySpaceArgs = {
  spaceId: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Result = {
  __typename?: 'Result';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SearchQueries = {
  __typename?: 'SearchQueries';
  query: Scalars['String'];
  count?: Maybe<Scalars['Int']>;
};

export type SelectedOption = {
  __typename?: 'SelectedOption';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type SelectedOptionInput = {
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Space = {
  __typename?: 'Space';
  id: Scalars['String'];
  domain?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  /** @deprecated Features for this field were never implemented; it is currently a no-op */
  buildHook?: Maybe<Scalars['String']>;
  pimSyncSourceDomain?: Maybe<Scalars['String']>;
  cmsSyncSourceDomain?: Maybe<Scalars['String']>;
  checkoutDataConfig?: Maybe<CheckoutDataConfig>;
  contentDataConfig?: Maybe<ContentDataConfig>;
  productDataConfig?: Maybe<ProductDataConfig>;
  productConnectorConfig?: Maybe<ConnectorConfig>;
  contentConnectorConfig?: Maybe<ConnectorConfig>;
  users?: Maybe<Array<Maybe<SpaceUser>>>;
  linklists?: Maybe<Array<Maybe<LinkList>>>;
  metafields?: Maybe<Array<Maybe<Metafield>>>;
  featureFlags?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SpaceInput = {
  id: Scalars['String'];
  domain?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  buildHook?: Maybe<Scalars['String']>;
  pimSyncSourceDomain?: Maybe<Scalars['String']>;
  cmsSyncSourceDomain?: Maybe<Scalars['String']>;
  checkoutDataConfig?: Maybe<CheckoutDataConfigInput>;
  productConnectorConfig?: Maybe<ConnectorConfigInput>;
  contentConnectorConfig?: Maybe<ConnectorConfigInput>;
};

export type SpaceUpdateResult = {
  __typename?: 'SpaceUpdateResult';
  result?: Maybe<Result>;
  space?: Maybe<Space>;
};

export type SpaceUser = {
  __typename?: 'SpaceUser';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  spaces?: Maybe<Array<Maybe<UserSpace>>>;
};

export type UserSpace = {
  __typename?: 'UserSpace';
  id: Scalars['String'];
  role?: Maybe<Scalars['String']>;
};

export type UserUpdateResult = {
  __typename?: 'UserUpdateResult';
  result?: Maybe<Result>;
  user?: Maybe<User>;
};

export type Variant = {
  __typename?: 'Variant';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  priceCurrency?: Maybe<Scalars['String']>;
  compareAtPrice?: Maybe<Scalars['String']>;
  compareAtPriceCurrency?: Maybe<Scalars['String']>;
  priceRules?: Maybe<Array<PriceRule>>;
  swatchSrc?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<Media>;
  metafields?: Maybe<Array<Metafield>>;
  sku?: Maybe<Scalars['String']>;
  availableForSale: Scalars['Boolean'];
  selectedOptions: Array<SelectedOption>;
  weight?: Maybe<Scalars['Float']>;
  weightUnit?: Maybe<Scalars['String']>;
};

export type VariantInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  availableForSale: Scalars['Boolean'];
  price?: Maybe<Scalars['String']>;
  priceCurrency?: Maybe<Scalars['String']>;
  priceRules?: Maybe<Array<PriceRuleInput>>;
  compareAtPrice?: Maybe<Scalars['String']>;
  compareAtPriceCurrency?: Maybe<Scalars['String']>;
  swatchSrc?: Maybe<Scalars['String']>;
  featuredMedia?: Maybe<MediaInput>;
  metafields?: Maybe<Array<MetafieldInput>>;
  sku?: Maybe<Scalars['String']>;
  selectedOptions?: Maybe<Array<SelectedOptionInput>>;
  weight?: Maybe<Scalars['Float']>;
  weightUnit?: Maybe<Scalars['String']>;
};
