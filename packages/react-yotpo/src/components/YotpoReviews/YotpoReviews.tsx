import React, { FC, useMemo } from 'react';
import { NacelleShopProduct } from '@nacelle/types';

import decodeProductId from '../../utils/decodeProductId';
import { useYotpoRefresh } from '../../hooks/useYotpoRefresh';

export type YotpoReviewsProps = {
  product: NacelleShopProduct;
  price: string;
  urlPath: string;
};

/**
 * Adds a div to the DOM for Yotpo to embed reviews
 */
const YotpoReviews: FC<YotpoReviewsProps> = ({
  product,
  price = '',
  urlPath = ''
}) => {
  useYotpoRefresh();

  const sourceProductId = useMemo(
    () => decodeProductId(product.pimSyncSourceProductId),
    [product.pimSyncSourceProductId]
  );

  return (
    <div
      className="yotpo yotpo-main-widget"
      data-product-id={sourceProductId}
      data-price={price}
      data-currency={product.priceRange.currencyCode}
      data-name={product.title}
      data-url={`${window.location.origin}${urlPath}`}
      data-image-url={product.featuredMedia.src}
      data-description={product.description}
    />
  );
};

export default YotpoReviews;
