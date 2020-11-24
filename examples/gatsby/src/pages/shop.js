import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const AllProducts = () => {
  const productsData = useStaticQuery(graphql`
    query ProductsQuery {
      allNacelleProduct {
        edges {
          node {
            handle
            title
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
  `);
  return (
    <>
      <h1>All Products</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {productsData.allNacelleProduct.edges.map((product) => (
          <li key={product.node.handle}>
            <h2>
              <Link to={`/products/${product.node.handle}`}>
                {product.node.title}
              </Link>
            </h2>
            <GatsbyImage
              image={getImage(product.node.featuredMedia.remoteImage)}
              alt={product.node.featuredMedia.altText}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllProducts;
