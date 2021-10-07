import React from 'react';

import { Image } from '@nacelle/react-components';
import * as styles from './HeroBanner.styles';

const IMAGE_FORMATS = ['webp', 'jpg'];

const HeroBanner = ({ fields }) => {
  const image = fields?.featuredMedia?.fields;

  return (
    <div css={styles.block}>
      {image && (
        <Image
          src={image.file.url}
          width={1800}
          css={styles.image}
          format={IMAGE_FORMATS}
        />
      )}
      <div css={styles.titleBlock}>
        <h1 css={styles.bannerTitle}>{fields.title}</h1>
      </div>
    </div>
  );
};

export default HeroBanner;
