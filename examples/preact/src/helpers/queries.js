export const getSpaceQuery = `
query GetSpace {
    getSpace {
      id
      name
      domain
      metafields {
          namespace
          key
          value
      }
      linklists {
          handle
          links {
            title
            to
            type
            links {
              title
              to
              type
              links {
                title
                to
                type
            }
        }
      }
    }
  }
}`;

export const getCollectionByHandleQuery = `
query getCollectionByHandle($handle: String!){
  getCollectionByHandle(handle: $handle){
    title
    productLists{
      title
      handles
    }
  }
}`;

export const getProductByHandleQuery = `
query getProductByHandle($handle: String!){
  getProductByHandle(handle: $handle){
    id
    title
    description
    pimSyncSourceProductId
    featuredMedia{
      id
      type
      src
      thumbnailSrc
      altText
    }
    variants {
      id
      title
      price
      compareAtPrice
      swatchSrc
      featuredMedia{
        id
        type
        src
        thumbnailSrc
        altText
      }
      selectedOptions{
        name
        value
      }
    }
  }
}`;

export const checkoutMutation = `
mutation processCheckout($input: CheckoutInput) {
  processCheckout(input: $input) {
    id
    url
    completed
  }
}`;
