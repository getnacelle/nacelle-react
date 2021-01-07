import React from 'react';
import Image from 'next/image';

import * as styles from './HeroBanner.styles';

const HeroBanner = ({ fields }) => {
  const fileUrl = fields?.featuredMedia?.fields?.file?.url;
  const alt = fields?.backgroundAltTag;
  const src = fileUrl?.startsWith('https:') ? fileUrl : `https:${fileUrl}`;

  return (
    <div css={styles.block}>
      <Image src={src} alt={alt} layout="fill" css={styles.image} />
      <h1 css={styles.bannerTitle}>{fields.title}</h1>
    </div>
  );
};

export default HeroBanner;
