/** @jsx jsx */
import { FC, InputHTMLAttributes } from 'react';
import { jsx, CSSObject } from '@emotion/core';

import { composeStyles } from '../../utils/styles';
import { defaultStyles } from './Select.styles';

export type SelectOption = {
  value: string;
  id?: string | number;
};

export interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  styles?: CSSObject;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Creates a <select /> component. If a placeholder option
 * is provided, it is used as the first <option /> in the list
 */
const Select: FC<SelectProps> = ({
  options,
  placeholder,
  styles,
  ...props
}) => {
  const combinedStyles = composeStyles([defaultStyles, styles]);

  return (
    <select css={combinedStyles} {...props}>
      {placeholder && <option value="placeholder">{placeholder}</option>}
      {options.map(({ value, id }, idx: number) => (
        <option key={id || `${idx}-${value}`} value={id || value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
