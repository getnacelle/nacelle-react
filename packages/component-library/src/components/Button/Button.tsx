import React, { FC, MouseEvent } from 'react';
import { CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles, secondaryStyles } from './Button.styles';

export type ButtonProps = {
  styles?: CSSObject;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  onClick?: (evt: MouseEvent) => void | unknown;
};

const Button: FC<ButtonProps> = ({
  styles,
  fullWidth = false,
  disabled = false,
  onClick,
  variant = 'primary',
  children
}) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    variant === 'secondary' && secondaryStyles,
    fullWidth && { width: '100%' },
    styles
  ]);

  return (
    <button disabled={disabled} onClick={onClick} css={combinedStyles}>
      {children}
    </button>
  );
};

export default Button;
