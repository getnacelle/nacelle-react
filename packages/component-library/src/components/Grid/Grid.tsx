import React, { FC } from 'react';
import { CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles } from './Grid.styles';

export type GridProps = {
  styles?: CSSObject;
  flow?: 'row' | 'column' | 'row dense' | 'column dense';
  height?: string | number;
  columns?: string | number;
  rows?: string | number;
  justifyContent?: string;
  alignContent?: string;
  rowGap?: string;
  columnGap?: string;
  gridGap?: string;
  minRowHeight?: number;
};

function createGridFr(value: string | number): string {
  if (typeof value === 'string') {
    return value;
  }

  return `repeat(${value}, 1fr)`;
}

const Grid: FC<GridProps> = ({
  styles,
  flow = 'row',
  rows,
  height = 'auto',
  columns = 8,
  gridGap = 8,
  rowGap,
  columnGap,
  justifyContent,
  alignContent,
  minRowHeight = 20,
  children
}) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    {
      gridTemplateColumns: createGridFr(columns),
      gridAutoRows: `minmax(${minRowHeight}px, auto)`,
      gridGap,
      height
    },
    flow && { gridAutoFlow: flow },
    rows && { gridTemplateRows: createGridFr(rows) },
    rowGap && { rowGap },
    columnGap && { columnGap },
    justifyContent && { justifyContent },
    alignContent && { alignContent },
    styles
  ]);

  return <div css={combinedStyles}>{children}</div>;
};

export default Grid;
