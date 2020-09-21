import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';
import { shopifyItem } from '@nacelle/react-dev-utils';

import YotpoReviews, { YotpoReviewsProps } from './YotpoReviews';

const story: Meta = {
  title: 'Components/YotpoReviews',
  component: YotpoReviews,
  args: {
    product: shopifyItem,
    price: '111.0',
    urlPath: '/products/music-at-work'
  }
};

const Template: Story<YotpoReviewsProps> = (args) => {
  return (
    <Fragment>
      <YotpoReviews {...args} />
    </Fragment>
  );
};

export const Primary = Template.bind({});

export default story;
