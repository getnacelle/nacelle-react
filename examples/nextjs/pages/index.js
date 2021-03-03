import React from 'react';

import $nacelle from 'services/nacelle';
import ContentSections from 'components/ContentSections';

export default function Home({ page }) {
  return page ? (
    <>
      <ContentSections sections={page.sections} />
    </>
  ) : null;
}

export async function getStaticProps({ preview }) {
  const page = await $nacelle.data
    .page({ handle: 'homepage', preview })
    .catch(() => {
      console.warn(`no page with handle 'homepage' found.`);
      return null;
    });

  return {
    props: { page }
  };
}
