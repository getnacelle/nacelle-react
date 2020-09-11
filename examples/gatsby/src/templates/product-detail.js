import * as React from 'react';
import { graphql } from 'gatsby';

export default function ProductDetail({ data }) {
  const { title, featuredMedia } = data?.nacelleProduct;
  return (
    <>
      <h2>{title}</h2>
      <img
        src={featuredMedia.src}
        alt={featuredMedia.altText}
        style={{ width: '100%' }}
      />
    </>
  );
}

export const query = graphql`
  query ProductQuery($handle: String!) {
    nacelleProduct(handle: { eq: $handle }) {
      handle
      title
      featuredMedia {
        src
        altText
      }
    }
  }
`;
