import * as React from 'react';
import { graphql } from 'gatsby';

import ContentSections from 'components/ContentSections';

const HomePage = ({ data }) => {
  const page = data.nacelleContent;
  return <ContentSections sections={page.sections} />;
};

export default HomePage;

export const query = graphql`
  query {
    nacelleContent(type: { eq: "page" }, handle: { eq: "homepage" }) {
      sections {
        fields {
          mobileFullHeight
          ctaUrl
          size
          ctaText
          handle
          title
          alignment
          contentType
          backgroundColor
          reverseDesktop
          reverseMobile
          productHandle
          heroImageFocus
          publishDate
          backgroundAltTag
          textColor
          itemsToShow
          collectionHandle
          subtitle
        }
        sys {
          contentType {
            sys {
              id
            }
          }
        }
      }
    }
  }
`;
