import React from 'react';
import { useDetectDevice } from 'hooks';

const galleryStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(20em, 1fr))',
  gridRowGap: '10em',
  placeItems: 'center'
};

const ProductGallery = ({ children }) => {
  const device = useDetectDevice();
  if (device.isMobile || device.isTablet) {
    galleryStyles.margin = '4em 0em';
  } else {
    galleryStyles.margin = '4em 6em';
  }
  return <div css={galleryStyles}>{children}</div>;
};

export default ProductGallery;
