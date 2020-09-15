import React, { FC } from 'react';

export type KlaviyoFormProps = {};

/**
 * Adds a div to the DOM for Klaviyo to embed a form
 */
const KlaviyoForm: FC<KlaviyoFormProps> = () => (
  <div className={`klaviyo-form-${process.env.KLAVIYO_FORM_EMBED_CODE}`} />
);

export default KlaviyoForm;
