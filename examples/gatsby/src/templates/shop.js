import React from 'react';
import { graphql } from 'gatsby';

import ContentSections from 'components/ContentSections';
import ProductGallery from 'components/ProductGallery';
import PageNavigator from 'components/PageNavigator';

const Collection = ({ data, pageContext }) => {
  const products = data.allNacelleProduct.edges.map((edge) => edge.node);
  const page = data.nacelleContent;
  const { numPages } = pageContext;

  return (
    <>
      {page && <ContentSections sections={page.sections} />}
      <ProductGallery products={products} />
      <PageNavigator numPages={numPages} basePath="/shop" />
    </>
  );
};

export default Collection;

export const query = graphql`
  query ProductInHandlesArray($handles: [String]) {
    allNacelleProduct(filter: { handle: { in: $handles } }) {
      edges {
        node {
          remoteId
          handle
          title
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
          metafields {
            key
            namespace
            value
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
    nacelleContent(type: { eq: "page" }, handle: { eq: "shop" }) {
      sections
    }
  }
`;
