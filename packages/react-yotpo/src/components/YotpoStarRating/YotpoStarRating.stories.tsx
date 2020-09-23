import React, { Fragment } from 'react';
import { Story, Meta } from '@storybook/react';
import { shopifyItem } from '@nacelle/react-dev-utils';

import YotpoStarRating, { YotpoStarRatingProps } from './YotpoStarRating';

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
