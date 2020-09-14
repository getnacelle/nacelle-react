import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';

import YotpoStarRating, { YotpoStarRatingProps } from './YotpoStarRating';
import { shopifyItem } from '../../shared/product.fixtures';

const story: Meta = {
  title: 'Components/YotpoStarRating',
  component: YotpoStarRating,
  args: {
    productId: shopifyItem.pimSyncSourceProductId
  }
};

const Template: Story<YotpoStarRatingProps> = (args) => {
  return (
    <Fragment>
      <YotpoStarRating {...args} />
    </Fragment>
  );
};

export const Primary = Template.bind({});

export default story;
