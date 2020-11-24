import * as React from 'react';
import { Link, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Collection = ({ data, pageContext }) => {
  const { title } = pageContext;
  const products = data.allNacelleProduct.edges;
  return (
    <>
      <h1>{title}</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {products.map((el) => (
          <li key={el.node.handle}>
            <h2>
              <Link to={`/products/${el.node.handle}`}>{el.node.title}</Link>
            </h2>
            <GatsbyImage
              image={getImage(el.node.featuredMedia.remoteImage)}
              alt={el.node.featuredMedia.altText}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Collection;

export const query = graphql`
  query FilteredProductsQuery($handles: [String]) {
    allNacelleProduct(filter: { handle: { in: $handles } }) {
      edges {
        node {
          handle
          title
          priceRange {
            currencyCode
            min
            max
          }
          featuredMedia {
            src
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
`;
