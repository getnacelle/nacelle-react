import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';

import KlaviyoForm, { KlaviyoFormProps } from './KlaviyoForm';

const story: Meta = {
  title: 'Components/KlaviyoForm',
  component: KlaviyoForm
};

const Template: Story<KlaviyoFormProps> = (args) => {
  return (
    <Fragment>
      <KlaviyoForm {...args} />
    </Fragment>
  );
};

export const Primary = Template.bind({});

export default story;
