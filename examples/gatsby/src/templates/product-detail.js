import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ProductDetail = ({ data }) => {
  const { title, featuredMedia } = data?.nacelleProduct;
  const imageData = getImage(featuredMedia.remoteImage);
  return (
    <>
      <h2>{title}</h2>
      <GatsbyImage image={imageData} alt={featuredMedia.altText} />
    </>
  );
};

export default ProductDetail;

export const query = graphql`
  query ProductQuery($handle: String!) {
    nacelleProduct(handle: { eq: $handle }) {
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
    }
  }
`;
