import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button, { ButtonProps } from './Button';

const story: Meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' }
  }
};

const Template: Story<ButtonProps> = (args) => <Button {...args}>TEXT</Button>;

export const Primary = Template.bind({});

export default story;
