import React from 'react';
import dynamic from 'next/dynamic';

// The Klaviyo form can only be injected client-side
const KlaviyoForm = dynamic(
  () => import('@nacelle/react-klaviyo').then((mod) => mod.KlaviyoForm),
  {
    ssr: false
  }
);

const Home = () => {
  return (
    <main>
      <KlaviyoForm />
    </main>
  );
};

export default Home;
