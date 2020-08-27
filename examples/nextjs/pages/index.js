import React, { Fragment } from 'react';

import $nacelle from 'services/nacelle';
import ContentSections from 'components/ContentSections';

export default function Home({ page }) {
  return (
    <Fragment>
      <ContentSections sections={page.sections} />
    </Fragment>
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
