import React from 'react';

import { EmbedScripts } from '@nacelle/react-components';

const YOTPO_SCRIPTS = [
  {
    src: `//staticw2.yotpo.com/${process.env.YOTPO_API_KEY}/widget.js`,
    type: 'text/javascript',
    defer: true
  }
];

/**
 * Embeds the Yotpo widget script into the dom
 */
const YotpoScripts = () => <EmbedScripts scripts={YOTPO_SCRIPTS} />;

export default YotpoScripts;
