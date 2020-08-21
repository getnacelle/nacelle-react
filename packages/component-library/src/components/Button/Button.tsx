import React, { FC, InputHTMLAttributes } from 'react';
import { CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles, secondaryStyles } from './Button.styles';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  styles?: CSSObject;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

/**
 * A button component with two variants:
 *
 * - primary (default): filled button with background color
 * - secondary: outlined button
 *
 * Use the fullWidth prop to make the button take up the entire
 * width of the container
 */
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
