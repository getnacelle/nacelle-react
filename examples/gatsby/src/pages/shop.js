import React from 'react';
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
  query {
    allNacelleProduct {
      edges {
        node {
          remoteId
          handle
          title
          featuredMedia {
            remoteImage {
              childImageSharp {
                gatsbyImageData(width: 320, placeholder: TRACED_SVG)
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
                  gatsbyImageData(width: 320, placeholder: TRACED_SVG)
                }
              }
            }
          }
        }
      }
    }
    nacelleContent(type: { eq: "page" }, handle: { eq: "shop" }) {
      sections
    }
  }
`;
