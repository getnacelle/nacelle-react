/** @jsx jsx */
import { FC, ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import { jsx, CSSObject } from '@emotion/core';

import { defaultStyles } from './TextInput.styles';
import { composeStyles } from '../../utils/styles';

export type Ref = HTMLInputElement;

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  styles?: CSSObject;
  placeholder?: string;
  value: string;
  name?: string;
  disabled?: boolean;
  fullwidth?: boolean;
  role?:
    | 'tel'
    | 'time'
    | 'url'
    | 'week'
    | 'text'
    | 'search'
    | 'number'
    | 'password'
    | 'month'
    | 'email'
    | 'date';
}

/**
 * Creates an <input /> component. Pass a ref prop to get access to
 * the html value of the input element if needed
 *
 * Use the fullwidth prop to make the button take up the entire
 * width of the container
 */
const TextInput: FC<TextInputProps> = ({
  styles,
  placeholder,
  value,
  disabled,
  role = 'text',
  fullwidth = false,
  ...props
}) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    fullwidth && { width: '100%' },
    styles
  ]);

  return (
    <input
      value={value}
      placeholder={placeholder}
      css={combinedStyles}
      role={role}
      disabled={disabled}
      {...props}
    />
  );
};

export default TextInput;
