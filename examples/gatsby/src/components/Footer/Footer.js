import React from 'react';
import * as styles from './Footer.styles';

const Footer = () => {
  return (
    <footer css={styles.footer}>
      <div>
        <h4 css={styles.brandName}>Example Store</h4>
        <h4 css={styles.copyright}>&#169; 2022</h4>
      </div>
    </footer>
  );
};

export default Footer;
