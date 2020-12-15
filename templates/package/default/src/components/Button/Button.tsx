/** @jsx jsx */
import { FC, InputHTMLAttributes } from 'react';
import { jsx } from '@emotion/core';
import { defaultStyles } from './Button.styles';

export interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'submit' | 'reset';
}

/**
 * A sample button component
 */
const Button: FC<ButtonProps> = (props) => {
  return (
    <button style={defaultStyles} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
