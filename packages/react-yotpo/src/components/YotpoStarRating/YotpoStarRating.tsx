import React, { FC, useMemo } from 'react';

import decodeProductId from '../../utils/decodeProductId';
import { useYotpoRefresh } from '../../hooks/useYotpoRefresh';

export type YotpoStarRatingProps = {
  productId: string;
};

/**
 * Adds a div to the dom for Yotpo to embed product ratings.
 *
 * Note that the productId provided to this component should
 * be the Shopify base64 product id.
 */
const YotpoStarRating: FC<YotpoStarRatingProps> = ({ productId }) => {
  useYotpoRefresh();

  const sourceProductId = useMemo(() => decodeProductId(productId), [
    productId
  ]);

  return <div className="yotpo bottomLine" data-product-id={sourceProductId} />;
};

export default YotpoStarRating;
