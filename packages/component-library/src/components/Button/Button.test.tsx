import React from 'react';
import { render, screen } from '@testing-library/react';
import Button, { ButtonProps } from './Button';

function setupButton(props?: ButtonProps) {
  render(<Button {...props}>Click Me!</Button>);
  const button = screen.getByRole('button');

  return { button };
}

describe('Button', () => {
  it('should default to the primary style variant', () => {
    const { button } = setupButton();
    expect(button).toHaveStyle('background-color: #3b3b3b');
  });

  it('should have a secondary style variant', () => {
    const { button } = setupButton({ variant: 'secondary', type: 'button' });
    expect(button).toHaveStyle('background-color: #fff');
  });
});
