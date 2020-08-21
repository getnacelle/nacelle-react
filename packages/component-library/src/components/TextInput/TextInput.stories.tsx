import React, { useState, ChangeEvent } from 'react';
import { Story, Meta } from '@storybook/react';

import TextInput, { TextInputProps } from './TextInput';

const story: Meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
    onBlur: { action: 'blurred' }
  }
};

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'Type here...'
};

export const WithValue: Story<TextInputProps> = (args) => {
  const [value, setValue] = useState('I am batman.');

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) =>
    setValue(evt.target.value);

  return <TextInput {...args} value={value} onChange={onInputChange} />;
};
WithValue.args = {
  ...Placeholder.args
};

export default story;
