import React, { FC } from 'react';

export type KlaviyoFormProps = {};

const KlaviyoForm: FC<KlaviyoFormProps> = () => (
  <div className={`klaviyo-form-${process.env.KLAVIYO_FORM_EMBED_CODE}`} />
);

export default KlaviyoForm;
