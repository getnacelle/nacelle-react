import React from 'react';
import { Story, Meta } from '@storybook/react';

import Grid, { GridProps } from './Grid';
import Cell from '../Cell/Cell';

const story: Meta = {
  title: 'Components/Grid',
  component: Grid
};

const colors = [
  'orchid',
  'darkorange',
  'coral',
  'cornflowerblue',
  'crimson',
  'deeppink',
  'darkred',
  'indigo'
];

function renderCell(listLength, flow) {
  return function createCell(color) {
    return (
      <Cell
        width={flow === 'row' ? 8 / listLength : undefined}
        height={flow === 'column' ? 8 / listLength : undefined}
        key={`${listLength}-${color}`}
        styles={{ backgroundColor: color }}
      />
    );
  };
}

const Template: Story<GridProps> = ({ flow, ...args }) => {
  const listOne = colors.slice();
  const listTwo = colors.slice(0, 4);
  const listThree = colors.slice(0, 2);
  const listFour = colors.slice(0, 1);

  return (
    <Grid flow={flow} {...args}>
      {listOne.map(renderCell(listOne.length, flow))}
      {listTwo.map(renderCell(listTwo.length, flow))}
      {listThree.map(renderCell(listThree.length, flow))}
      {listFour.map(renderCell(listFour.length, flow))}
    </Grid>
  );
};

export const SideBySide: Story<GridProps> = (args) => (
  <Grid {...args}>
    {colors.slice(0, 2).map((color, idx) => (
      <Cell key={`${idx}-${color}`} styles={{ backgroundColor: color }} />
    ))}
  </Grid>
);

SideBySide.args = { columns: 2, minRowHeight: 200 };

export const Rows = Template.bind({});
Rows.args = { flow: 'row', columns: 8 };

export const Columns = Template.bind({});
Columns.args = { flow: 'column', columns: 5 };

export default story;
