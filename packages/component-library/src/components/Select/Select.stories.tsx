import React from 'react';
import { Story, Meta } from '@storybook/react';

import Select, { SelectProps } from './Select';

const story: Meta = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    onChange: { action: 'changed ' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' }
  }
};

const options = [
  { value: '🇨🇦 - CAD - Français', id: 'fr-CA' },
  { value: '🇨🇦 - CAD - English', id: 'en-CA' },
  { value: '🇺🇸 - USD - English', id: 'en-US' },
  { value: '🇲🇽 - MXN - Español', id: 'es-MX' },
  { value: '🇯🇵 - JPY - 日本語', id: 'ja-JP' }
];

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = { options };

export const Placeholder = Template.bind({});
Placeholder.args = { options, placeholder: 'Select a currency' };

export default story;
