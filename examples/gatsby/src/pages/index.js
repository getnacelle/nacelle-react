import React from 'react';
import { graphql } from 'gatsby';

import ContentSections from 'components/ContentSections';

const HomePage = ({ data }) => (
  <ContentSections sections={data.nacelleContent.sections} />
);

export default HomePage;

export const query = graphql`
  query {
    nacelleContent(type: { eq: "page" }, handle: { eq: "homepage" }) {
      sections
    }
  }
`;
