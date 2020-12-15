import React from 'react';

const Home = ({ color }) => {
  return (
    <main>
      <h1>
        <span style={{ color }}>Nacelle</span> Nextjs Example
      </h1>
    </main>
  );
};

export async function getStaticProps() {
  return {
    props: { color: `#4464cc` }
  };
}

export default Home;
