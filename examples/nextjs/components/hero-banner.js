import React from 'react';
import { Image } from 'components';
import { useDetectDevice } from 'hooks';
import * as styles from './hero-banner.styles';

const HeroBanner = ({ fields, textColor }) => {
  const image = fields.featuredMedia.fields;
  const device = useDetectDevice();
  return (
    <div css={styles.block}>
      <Image
        src={image.file.url}
        width="1800"
        styles={styles.image}
        format={['webp', 'jpg']}
      />
      <h1 css={styles.title(textColor || '#222', device)}>{fields.title}</h1>
    </div>
  );
};

export default HeroBanner;
