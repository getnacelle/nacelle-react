import React from 'react';
import { Link } from 'gatsby';
import * as styles from './PageNavigator.styles';

const PageNavigator = ({ numPages, basePath }) => {
  const pageNumbers = Array.from({ length: numPages }, (_x, i) => i + 1);

  return (
    <nav>
      <ul style={styles.list}>
        Page{' '}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} style={styles.listItem}>
            <Link
              to={pageNumber === 1 ? basePath : basePath + `/${pageNumber}`}
              activeStyle={styles.activeLink}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PageNavigator;
