import { CSSObject } from '@emotion/core';

export const defaultStyles: CSSObject = {
  padding: '.75rem 1.5rem',
  color: 'white',
  backgroundColor: '#3b3b3b',
  border: 0,
  outline: 0,
  boxShadow: 'none',
  letterSpacing: 1,
  height: 48,
  cursor: 'pointer',
  textAlign: 'center',
  '&:hover:enabled': {
    opacity: 0.8
  },
  '&:active:enabled': {
    transform: 'scale(0.97)',
    transition: 'all 0.3s'
  },
  '&:disabled': {
    color: '#3b3b3b',
    backgroundColor: 'gainsboro'
  }
};
