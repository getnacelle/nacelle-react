import React from 'react';
import { useRouter } from 'next/router';
import { Image, Button } from '@nacelle/react-components';

import useDetectDevice from 'hooks/useDetectDevice';
import * as styles from './SideBySide.styles';

const IMAGE_FORMATS = ['webp', 'jpg'];

const SideBySide = ({ fields }) => {
  const router = useRouter();
  const device = useDetectDevice();
  const textContent = findTextContent(fields.content.content);
  const imageSrc = fields.featuredMedia.fields.file.url;

  const flexDirection = determineFlexDirection(device, fields);
  const routeToCtaPage = () => router.push(fields.ctaUrl);

  const layoutStyles = [styles.columnLayout, { flexDirection }];

  return (
    <div css={layoutStyles}>
      <section css={styles.column}>
        <Image
          src={imageSrc}
          css={styles.image}
          width={1000}
          format={IMAGE_FORMATS}
        />
      </section>
      <section
        css={[styles.column, { backgroundColor: fields.backgroundColor }]}
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
