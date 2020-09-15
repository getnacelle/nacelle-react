import React from 'react';
import dynamic from 'next/dynamic';

import { shopifyItem } from '../data/product';

// Yotpo reviews can only be injected client-side
const YotpoReviews = dynamic(
  () => import('@nacelle/react-yotpo').then((mod) => mod.YotpoReviews),
  {
    ssr: false
  }
);

const Home = () => {
  return (
    <main>
      <YotpoReviews
        product={shopifyItem}
        price={shopifyItem.variants[0].price}
        urlPath={'/products/music-at-work'}
      />
    </main>
  );
};

export default Home;
