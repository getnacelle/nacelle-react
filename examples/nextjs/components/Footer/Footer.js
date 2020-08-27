import React from 'react';

import * as styles from './Footer.styles';

const Footer = ({ space }) => {
  return (
    <footer css={styles.footer}>
      <div>
        <h4 css={styles.brandName}>{space.name}</h4>
        <h4 css={styles.copyright}>&#169; 2020</h4>
      </div>
    </footer>
  );
};

export default Footer;
