import React, { Fragment } from 'react';

const KlaviyoScripts = () => (
  <Fragment>
    <script
      src={`//static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.KLAVIYO_COMPANY_ID}`}
      async
    />
    <script
      src="//www.klaviyo.com/media/js/public/klaviyo_subscribe.js"
      async
    />
  </Fragment>
);

export default KlaviyoScripts;
