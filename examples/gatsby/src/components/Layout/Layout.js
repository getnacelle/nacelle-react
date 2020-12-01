import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Loadable from '@loadable/component';

import Footer from 'components/Footer';
import Header from 'components/Header';

const Cart = Loadable(() => import('../Cart'));

const Layout = ({ children }) => {
  const query = graphql`
    query LinkListsQuery {
      nacelleSpace {
        name
        linklists {
          handle
          links {
            title
            to
            type
          }
        }
      }
    }
  `;
  const spaceData = useStaticQuery(query);
  return (
    <>
      <Header space={spaceData.nacelleSpace} />
      <Cart />
      <main>{children}</main>
      <Footer space={spaceData.nacelleSpace} />
    </>
  );
};

export default Layout;
