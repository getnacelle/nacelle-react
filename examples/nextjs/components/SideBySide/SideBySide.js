import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@nacelle/react-components';

import useDetectDevice from 'hooks/useDetectDevice';
import * as styles from './SideBySide.styles';

const SideBySide = ({ fields }) => {
  const router = useRouter();
  const device = useDetectDevice();
  const textContent = findTextContent(fields.content.content);
  const fileUrl = fields?.featuredMedia?.fields?.file?.url;
  const src = fileUrl?.startsWith('https:') ? fileUrl : `https:${fileUrl}`;
  const alt = fields?.featuredMedia?.fields?.title;

  const flexDirection = determineFlexDirection(device, fields);
  const routeToCtaPage = () => router.push(fields.ctaUrl);

  const layoutStyles = [styles.columnLayout, { flexDirection }];

  return (
    <div css={layoutStyles}>
      <section css={styles.column}>
        <Image
          src={src}
          alt={alt}
          width="1200"
          height="900"
          css={styles.image}
        />
      </section>
      <section
        css={[
          styles.column,
          { backgroundColor: fields.backgroundColor, flex: 1 }
        ]}
      >
        <div css={styles.content}>
          <h3 css={styles.title}>{fields.title}</h3>
          <p css={styles.textContent}>{textContent}</p>
          <Button
            onClick={routeToCtaPage}
            styles={styles.ctaButton}
            type="button"
          >
            {fields.ctaText}
          </Button>
        </div>
      </section>
    </div>
  );
};

function findTextContent(content) {
  return content.reduce((_textValue, contentNode) => {
    if (contentNode.nodeType === 'text') {
      return contentNode.value;
    }

    return findTextContent(contentNode.content);
  }, '');
}

function determineFlexDirection(device, fields) {
  if (device.isTouch) {
    return fields.reverseMobile ? 'column-reverse' : 'column';
  }

  return fields.reverseDesktop ? 'row-reverse' : 'row';
}

export default SideBySide;
