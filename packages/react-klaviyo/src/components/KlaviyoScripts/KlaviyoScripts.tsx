import React from 'react';

import { EmbedScripts } from '@nacelle/react-components';

const KLAVIYO_SCRIPTS = [
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
const KlaviyoScripts = () => <EmbedScripts scripts={KLAVIYO_SCRIPTS} />;

export default KlaviyoScripts;
