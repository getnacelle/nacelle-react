import React, { FC, MouseEvent } from 'react';
import { CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles } from './Button.styles';

export type ButtonProps = {
  styles?: CSSObject;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (evt: MouseEvent) => void | unknown;
};

const Button: FC<ButtonProps> = ({
  styles,
  fullWidth = false,
  disabled = false,
  children,
  onClick
}) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    styles,
    fullWidth && { width: '100%' }
  ]);

  return (
    <button disabled={disabled} onClick={onClick} css={combinedStyles}>
      {children}
    </button>
  );
};

export default Button;
