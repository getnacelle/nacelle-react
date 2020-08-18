import React, { ForwardRefRenderFunction, InputHTMLAttributes } from 'react';
import { CSSObject } from '@emotion/core';

import { defaultStyles } from './TextInput.styles';
import { composeStyles } from '../../utils/styles';

export type Ref = HTMLInputElement;

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  styles?: CSSObject;
  placeholder?: string;
  value: string;
  name?: string;
  disabled?: boolean;
  fullWidth?: boolean;
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

const TextInput: ForwardRefRenderFunction<Ref, TextInputProps> = (
  {
    styles,
    placeholder,
    value,
    disabled,
    role = 'text',
    fullWidth = false,
    ...props
  },
  ref
) => {
  const combinedStyles = composeStyles([
    defaultStyles,
    styles,
    fullWidth && { width: '100%' }
  ]);

  return (
    <input
      value={value}
      placeholder={placeholder}
      ref={ref}
      css={combinedStyles}
      role={role}
      disabled={disabled}
      {...props}
    />
  );
};

export default React.forwardRef<Ref, TextInputProps>(TextInput);