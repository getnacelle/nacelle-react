import React from 'react';
import { useRouter } from 'next/router';
import { Image } from 'components';
import { useDetectDevice } from 'hooks';

import * as styles from './side-by-side.styles';

const SideBySide = ({ fields }) => {
  const router = useRouter();
  const device = useDetectDevice();
  const textContent = findTextContent(fields.content.content);
  const imageSrc = fields.featuredMedia.fields.file.url;
  const flexDirectionMobile = fields.reverseMobile
    ? 'column-reverse'
    : 'column';
  const flexDirectionDesktop = fields.reverseDesktop ? 'row-reverse' : 'row';
  const routeToCtaPage = () => router.push(fields.ctaUrl);

  return (
    <div
      css={[
        styles.columnLayout,
        {
          flexDirection: device.isTouch
            ? flexDirectionMobile
            : flexDirectionDesktop
        }
      ]}
    >
      <section
        css={(styles.column, { maxWidth: device.isTouch ? 'unset' : '50%' })}
      >
        <Image
          src={imageSrc}
          styles={styles.image}
          width="1000"
          format={['webp', 'jpg']}
        />
      </section>
      <section
        css={[
          styles.column,
          {
            maxWidth: device.isTouch ? 'unset' : '50%',
            backgroundColor: fields.backgroundColor
          }
        ]}
      >
        <div css={styles.content}>
          <h3 css={styles.title}>{fields.title}</h3>
          <p css={styles.textContent}>{textContent}</p>
          <button onClick={routeToCtaPage} css={styles.ctaButton}>
            {fields.ctaText}
          </button>
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

export default SideBySide;
