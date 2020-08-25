import $nacelle from 'services/nacelle';
import React from 'react';
import { Sections } from 'components';

export default function Home({ page }) {
  return (
    <>
      <Sections
        sections={page.sections}
        options={{ heroBanner: { textColor: '#ffffff' } }}
      />
    </>
  );
}

export async function getStaticProps() {
  try {
    const page = await $nacelle.data.page({ handle: 'homepage' });

    return {
      props: { page }
    };
  } catch (err) {
    console.error(`Error fetching data on homepage:\n${err}`);
  }
}
