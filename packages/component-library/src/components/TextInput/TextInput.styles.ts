import { CSSObject } from '@emotion/core';

export const defaultStyles: CSSObject = {
  boxShadow: 'inset 0 1px 2px rgba(10,10,10,.1)',
  border: '1px solid #dbdbdb',
  borderRadius: 4,
  lineHeight: 1.5,
  padding: 'calc(0.375em) calc(0.625em)',
  color: '#363636',
  backgroundColor: '#fff',
  '&:hover': {
    borderColor: '#b5b5b5'
  },
  '&:active, &:focus': {
    borderColor: '#3273dc',
    boxShadow: '0 0 0 0.125em rgba(50,115,220,.25)',
    outline: 'none'
  },
  '::placeholder': {
    color: 'rgba(54,54,54,.3)'
  }
};
