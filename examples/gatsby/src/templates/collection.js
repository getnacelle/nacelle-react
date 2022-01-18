import React from 'react';
import { graphql } from 'gatsby';

import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';
import PageNavigator from 'components/PageNavigator';

const Collection = ({ data, pageContext }) => {
  const products = data.allNacelleProduct.edges.map((edge) => edge.node);
  const page = data.nacelleContent;
  const { numPages, handle } = pageContext;

  return (
    <>
      {page && page.remoteFields?.sections && (
        <ContentSections sections={page.remoteFields.sections} />
      )}
      <ProductGallery products={products} />
      <PageNavigator numPages={numPages} basePath={`/collections/${handle}`} />
    </>
  );
};

export default Collection;

export const query = graphql`
  query ProductInCollection($handles: [String], $handle: String) {
    allNacelleProduct(filter: { content: { handle: { in: $handles } } }) {
      edges {
        node {
          nacelleEntryId
          content {
            handle
            title
            locale
            featuredMedia {
              remoteImage {
                childImageSharp {
                  gatsbyImageData(width: 320)
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              src
              altText
            }
          }
          metafields {
            key
            namespace
            value
          }
          variants {
            nacelleEntryId
            sourceEntryId
            availableForSale
            compareAtPrice
            price
            priceCurrency
            metafields {
              key
              namespace
              value
            }
            sku
            content {
              swatchSrc
              title
              sourceEntryId
              featuredMedia {
                src
                thumbnailSrc
                altText
                remoteImage {
                  childImageSharp {
                    gatsbyImageData(width: 320)
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    nacelleContent(type: { eq: "page" }, handle: { eq: $handle }) {
      remoteFields
    }
  }
`;
