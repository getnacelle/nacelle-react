import React from 'react';
import { Story, Meta } from '@storybook/react';
import { shopifyItem } from '@nacelle/react-dev-utils';

import RechargeSelect from './RechargeSelect';
import { RechargeSelectProps } from './RechargeSelect.types';

const story: Meta = {
  title: 'Components/RechargeSelect',
  component: RechargeSelect,
  argTypes: { getCartMetafields: { action: 'getCartMetafields' } },
  args: {
    product: shopifyItem
  }
};

const Template: Story<RechargeSelectProps> = (args) => (
  <RechargeSelect {...args} />
);

export const WithDiscount = Template.bind({});
export const WithoutDiscount = Template.bind({});
WithoutDiscount.args = {
  product: {
    ...shopifyItem,
    metafields: [
      {
        id: null,
        key: 'shipping_interval_unit_type',
        namespace: 'subscriptions',
        value: 'Days'
      },
      {
        id: null,
        key: 'is_subscription_only',
        namespace: 'subscriptions',
        value: 'false'
      },
      {
        id: null,
        key: 'subscription_id',
        namespace: 'subscriptions',
        value: '218593'
      },
      {
        id: null,
        key: 'has_subscription',
        namespace: 'subscriptions',
        value: 'True'
      },
      {
        id: null,
        key: 'shipping_interval_frequency',
        namespace: 'subscriptions',
        value: '30,14,7'
      }
    ]
  }
};

export default story;
