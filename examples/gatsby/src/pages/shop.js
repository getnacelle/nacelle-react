import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

export default function AllProducts() {
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
            <img
              src={product.node.featuredMedia.src}
              alt={product.node.title}
              style={{ width: '100%' }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
