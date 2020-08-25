import React from 'react';

function sanitizeUrl({ url = null } = {}) {
  const src = removeUrlParams({ url });
  if (src.split('//')[0] !== 'https:') {
    return `https://${src.split('//')[1]}`;
  } else {
    return src;
  }
}

function removeUrlParams({ url = null } = {}) {
  return (typeof url === 'string' && url.split('&')[0]) || url;
}

function roundedUpToNearest50px(x) {
  if (x >= 50) {
    return +x + 49 - ((+x + 49) % 50);
  }
}

function resizeImage({
  src = null,
  width = null,
  height = null,
  crop = false,
  cdn = 'unknown'
} = {}) {
  if (cdn === 'contentful') {
    return contentfulResize({ src, width, height, crop });
  } else if (cdn === 'shopify') {
    return shopifyResize({ src, width, height, crop });
  } else if (cdn === 'unknown') {
    return src;
  }
}

function reformatImage({ src = null, format = 'auto', cdn = 'unknown' } = {}) {
  if (cdn === 'shopify') {
    return format === 'auto'
      ? shopifyReformat({ src })
      : shopifyReformat({ src, format });
  } else if (cdn === 'contentful') {
    return format === 'auto'
      ? contentfulReformat({ src })
      : contentfulReformat({ src, format });
  } else if (cdn === 'unknown') {
    return src;
  }
}

function fromShopifyCDN({ url = null } = {}) {
  if (!url) {
    throw new Error("Function 'fromShopifyCDN' not provided a url");
  }
  if (typeof url === 'string') {
    return url.includes('cdn.shopify');
  }
  return false;
}

function shopifyResize({
  src = null,
  width = null,
  height = null,
  crop = false,
  cropDirection = 'center'
} = {}) {
  const getSizeString = () => {
    if (width && height) {
      return `_${width}x${height}`;
    } else if (width && !height) {
      return crop
        ? `_${width}x${roundedUpToNearest50px((width / 3) * 4)}`
        : `_${width}x`;
    } else if (!width && height) {
      return `_x${height}`;
    } else {
      return '';
    }
  };
  if (typeof src === 'string') {
    const [baseWithExt, args] = src.split('?');
    const [extension] = Array.from(baseWithExt.split('.')).reverse();
    const [base] = baseWithExt.split(`.${extension}`);
    const newSizeString = getSizeString();
    const cropString = crop ? `_crop_${cropDirection}` : '';
    const newBase = base.concat(newSizeString, cropString);
    const newArgs = args
      ? args.split('&').filter((el) => el.includes('width=') === false)
      : [];
    const newSrc = newBase.concat(`.${extension}?${newArgs.join('&')}`);
    return newSrc;
  }
  return null;
}

function shopifyReformat({ src = null, format = 'webp' } = {}) {
  if (typeof src === 'string') {
    const extension = Array.from(src.split('?v=')[0].split('.')).pop();
    if (extension === 'png' || extension === 'jpg') {
      return src
        .split('&format=')[0]
        .concat(`&format=${format === 'auto' ? 'jpg' : format}`);
    } else {
      // return the original image if it is a gif / not a png or jpg
      return src;
    }
  } else {
    return null;
  }
}

function fromContentfulCDN({ url = null } = {}) {
  if (!url) {
    throw new Error("Function 'fromContentfulCDN' not provided a url");
  }
  if (typeof url === 'string') {
    return url.includes('ctfassets.net');
  }
  return false;
}

function contentfulSplitUrl({ src = null }) {
  const [baseWithExt, args] = src.split('?');
  const [extension] = Array.from(baseWithExt.split('.')).reverse();
  const [base] = baseWithExt.split(`.${extension}`);
  return [base, args, extension];
}

function contentfulResize({
  src = null,
  width = null,
  height = null,
  crop = false
} = {}) {
  function getSizeString() {
    if (width && height) {
      return `w=${width}&h=${height}`;
    } else if (width && !height) {
      return `w=${width}`;
    } else if (!width && height) {
      return `h=${height}`;
    } else {
      return new Error('No image size specified');
    }
  }
  if (typeof src === 'string') {
    const [base, args, extension] = contentfulSplitUrl({ src });
    const sizeString = getSizeString();
    const cropString = crop ? `&fit=crop&f=${crop}` : '';
    const newArgs = args
      ? args
          .split('&')
          .filter((el) => el.includes('width=') === false)
          .join('&')
          .concat(`&${sizeString}`)
      : sizeString + cropString;
    const newSrc = newArgs
      ? base.concat(`.${extension}?${newArgs}`)
      : base.concat(`.${extension}`);
    return newSrc;
  }
  return null;
}

function contentfulReformat({ src = null, format = 'webp' } = {}) {
  if (typeof src === 'string') {
    const [base, args, extension] = contentfulSplitUrl({ src });
    const imgFormat = format === 'jpeg' ? 'jpg' : format;
    if (imgFormat !== extension) {
      const newArgs = args
        ? args
            .split('&')
            .filter((el) => el.includes('fl=') === false)
            .filter((el) => el.includes('fm=') === false)
            .join('&')
        : '';
      if (imgFormat === 'png' || imgFormat === 'jpg' || imgFormat === 'webp') {
        return `${base}.${extension}?${newArgs}&fm=${imgFormat}`;
      } else if (imgFormat === 'pjpg') {
        return `${base}.${extension}?${newArgs}&fm=jpg&fl=progressive`;
      }
    } else {
      // return the original image if not being converted to a possible extension
      return src;
    }
  } else {
    return null;
  }
}

function getImageCdn({ url = null } = {}) {
  if (fromShopifyCDN({ url })) {
    return 'shopify';
  } else if (fromContentfulCDN({ url })) {
    return 'contentful';
  } else {
    return 'unknown';
  }
}

function optimizeSource({
  url = null,
  format = 'jpg',
  width = null,
  height = null,
  crop = false,
  focus = null,
  reformat = true
} = {}) {
  if (typeof url === 'string') {
    const cleanUrl = sanitizeUrl({ url });
    const cdn = getImageCdn({ url: cleanUrl });

    if (!reformat && !(width || height)) {
      return url;
    }

    let optimizedSrc;
    if (reformat && !width && !height) {
      optimizedSrc = reformatImage({
        src: url,
        format,
        cdn
      });
    } else if (reformat && (width || height)) {
      optimizedSrc = resizeImage({
        src: reformatImage({ src: url, format, cdn }),
        width: roundedUpToNearest50px(width),
        height: roundedUpToNearest50px(height),
        crop,
        focus,
        cdn
      });
    } else if (!reformat && (width || height)) {
      optimizedSrc = resizeImage({
        src: url,
        width: roundedUpToNearest50px(width),
        height: roundedUpToNearest50px(height),
        crop,
        focus,
        cdn
      });
    }
    if (optimizedSrc) {
      return optimizedSrc;
    }
  }
}

export default function Image({
  src,
  alt,
  width,
  format = 'jpg',
  lazy = true,
  styles
}) {
  // Available formats: 'jpg', 'webp', 'png'
  const formats = Array.isArray(format) ? format : [format];

  return (
    <picture>
      {formats.map((format, idx) => (
        <source
          key={`${format}-${idx}`}
          srcSet={optimizeSource({
            url: src,
            format,
            width
          })}
          type={`image/${format}`}
        />
      ))}
      <img src={src} alt={alt} css={styles} loading={lazy && 'lazy'} />
    </picture>
  );
}
