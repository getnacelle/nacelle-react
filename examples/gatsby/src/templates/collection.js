import * as React from 'react';
import { graphql } from 'gatsby';

import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';

const Collection = ({ data }) => {
  const products = data.allNacelleProduct.edges.map((edge) => edge.node);
  const page = data.nacelleContent;
  return (
    <>
      {page && <ContentSections sections={page.sections} />}
      <ProductGallery products={products} />
    </>
  );
};

export default Collection;

export const query = graphql`
  query ProductInCollection($handles: [String], $handle: String) {
    allNacelleProduct(filter: { handle: { in: $handles } }) {
      edges {
        node {
          remoteId
          handle
          title
          featuredMedia {
            remoteImage {
              childImageSharp {
                gatsbyImageData
              }
            }
            src
            altText
          }
          variants {
            id
            availableForSale
            compareAtPrice
            compareAtPriceCurrency
            price
            priceCurrency
            metafields {
              key
              namespace
              value
            }
            sku
            swatchSrc
            title
            featuredMedia {
              src
              thumbnailSrc
              altText
              remoteImage {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
    nacelleContent(type: { eq: "page" }, handle: { eq: $handle }) {
      sections {
        fields {
          mobileFullHeight
          ctaUrl
          size
          ctaText
          handle
          title
          alignment
          contentType
          backgroundColor
          reverseDesktop
          reverseMobile
          productHandle
          heroImageFocus
          publishDate
          backgroundAltTag
          textColor
          itemsToShow
          collectionHandle
          subtitle
        }
      }
    }
  }
`;
