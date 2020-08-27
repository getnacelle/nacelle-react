/** @jsx jsx */
import { FC, InputHTMLAttributes } from 'react';
import { jsx, CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles, secondaryStyles } from './Button.styles';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  styles?: CSSObject;
  fullwidth?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  type: 'button' | 'submit' | 'reset';
}

/**
 * A button component with two variants:
 *
 * - primary (default): filled button with background color
 * - secondary: outlined button
 *
 * Use the fullwidth prop to make the button take up the entire
 * width of the container
 */
const Button: FC<ButtonProps> = ({
  fullwidth = false,
  disabled = false,
  onClick,
  variant = 'primary',
  children,
  styles,
  ...props
}) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    variant === 'secondary' && secondaryStyles,
    fullwidth && { width: '100%' },
    styles
  ]);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      css={combinedStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
