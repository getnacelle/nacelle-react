import React, { FC, Fragment } from 'react';

export type KlaviyoScriptsProps = {};

export type HtmlScript = {
  defer?: boolean;
  async?: boolean;
  src: string;
  type: string;
};

const KLAVIYO_SCRIPTS: HtmlScript[] = [
  {
    src: `//static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.KLAVIYO_COMPANY_ID}`,
    async: true,
    type: 'text/javascript'
  },
  {
    src: '//www.klaviyo.com/media/js/public/klaviyo_subscribe.js',
    async: true,
    type: 'text/javascript'
  }
];

/**
 * Embeds the Klaviyo account & event scripts to the page
 */
const KlaviyoScripts: FC<KlaviyoScriptsProps> = () => {
  return (
    <Fragment>
      {KLAVIYO_SCRIPTS.map((script) => (
        <script
          key={script.src}
          src={script.src}
          async={script.async}
          defer={script.defer}
          type={script.type}
        ></script>
      ))}
    </Fragment>
  );
};

export default KlaviyoScripts;
