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
  whiteSpace: 'nowrap',
  borderRadius: 4,
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

export const secondaryStyles: CSSObject = {
  backgroundColor: '#fff',
  border: '1px solid #dbdbdb',
  color: '#363636',
  '&:hover:enabled': {
    borderColor: '#b5b5b5'
  },
  '&:active:enabled': {
    borderColor: '#4a4a4a',
    transform: 'scale(0.97)',
    transition: 'scale 0.3s'
  },
  '&:disabled': {
    opacity: 0.8
  }
};
