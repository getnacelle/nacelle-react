import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Loadable from '@loadable/component';

import Footer from 'components/Footer';
import Header from 'components/Header';

const Cart = Loadable(() => import('../Cart'));

const Layout = ({ children }) => {
  const query = graphql`
    query navigationQuery {
      allNacelleNavigationGroup {
        edges {
          node {
            groupId
            title
            items {
              title
              url
            }
          }
        }
      }
    }
  `;
  const navigationData = useStaticQuery(query);
  const navigationArray = navigationData.allNacelleNavigationGroup.edges.map(
    (edge) => edge.node
  );
  return (
    <>
      <Header nav={navigationArray[0]} />
      <Cart />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
