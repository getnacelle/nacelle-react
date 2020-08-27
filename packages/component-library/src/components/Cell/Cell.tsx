/** @jsx jsx */
import { FC } from 'react';
import { jsx, CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles } from './Cell.styles';

export type CellProps = {
  styles?: CSSObject;
  width?: number;
  height?: number;
  top?: string | number;
  left?: string | number;
  middle?: boolean;
  center?: boolean;
};

/**
 * Used to create a cell within a <Grid />
 *
 * Uses the same API as https://styled-css-grid.js.org/
 */
const Cell: FC<CellProps> = ({
  styles,
  width = 1,
  height = 1,
  top,
  left,
  middle,
  center,
  children
}) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    {
      gridColumnEnd: `span ${width}`,
      gridRowEnd: `span ${height}`
    },
    top && { gridRowStart: top },
    left && { gridColumnStart: left },
    center && { textAlign: 'center' },
    middle && {
      display: 'inline-flex',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      justifySelf: 'stretch'
    },
    styles
  ]);

  return <div css={combinedStyles}>{children}</div>;
};

export default Cell;
