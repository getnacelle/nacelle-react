import React from 'react';
import { render, screen } from '@testing-library/react';
import Select, { SelectProps } from './Select';

function setupSelect(props: SelectProps) {
  render(<Select {...props} />);
  const options = screen.queryAllByRole('option');

  return { options };
}

const props = {
  options: [
    { value: 'one', id: 1 },
    { value: 'two', id: 2 }
  ]
};

describe('Button', () => {
  it('should load with a placeholder option', () => {
    const { options } = setupSelect({ ...props, placeholder: 'Select one' });
    expect(options.length).toEqual(3);
    expect(options[0].textContent).toEqual('Select one');
  });
});
