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
