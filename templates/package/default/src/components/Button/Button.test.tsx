import React from 'react';
import { render, screen } from '@testing-library/react';
import Button, { ButtonProps } from './Button';

function setupButton(props?: ButtonProps) {
  render(<Button {...props}>Click Me!</Button>);
  const button = screen.getByRole('button');

  return { button };
}

describe('Button', () => {
  it('should mount', () => {
    const { button } = setupButton();
    expect(button).toBeInTheDocument;
  });
});
