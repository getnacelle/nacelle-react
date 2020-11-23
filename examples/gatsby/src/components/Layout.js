import * as React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

const Layout = ({ children }) => {
  const query = graphql`
    query LinkListsQuery {
      nacelleSpace {
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
  const linkListData = useStaticQuery(query);
  const mainMenu = linkListData.nacelleSpace.linklists.find(
    (linkList) => linkList.handle === 'main-menu'
  );
  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '3em'
        }}
      >
        {mainMenu.links.map((link) => (
          <Link to={link.to} key={link.to}>
            {link.title}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
};

export default Layout;
