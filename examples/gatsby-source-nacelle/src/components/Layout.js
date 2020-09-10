import * as React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

export default function Layout({ children }) {
  const linkListData = useStaticQuery(graphql`
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
  `)
  const mainMenu = linkListData.nacelleSpace.linklists.find(linkList => linkList.handle === 'main-menu')
  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '3em' }}>
        {mainMenu.links.map(link => (
          <Link to={link.to} key={link.to}>{link.title}</Link>
        ))}
      </nav>
      { children }
    </>
  )
}