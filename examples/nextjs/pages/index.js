import React from 'react';

import { nacelleClient } from 'services';
import ContentSections from 'components/ContentSections';

export default function Home({ page }) {
  return (
    <>
      <ContentSections sections={page.sections} />
    </>
  );
}

export async function getStaticProps({ previewData }) {
  try {
    const page = await nacelleClient.data.page({
      handle: 'homepage',
      previewData
    });

    return {
      props: { page }
    };
  } catch {
    return {
      notFound: true
    };
  }
}
