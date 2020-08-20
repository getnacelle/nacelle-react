import { CSSObject } from '@emotion/core';

export const defaultStyles: CSSObject = {
  paddingLeft: 4,
  paddingRight: 20,
  borderRadius: 4,
  lineHeight: '20px',
  color: '#363636',
  border: '1px solid #dbdbdb',
  height: 32,
  '&:hover': {
    borderColor: '#b5b5b5'
  },
  '&:active, &:focus': {
    borderColor: '#3273dc',
    boxShadow: '0 0 0 0.125em rgba(50,115,220,.25)',
    outline: 'none'
  }
};

export const placeholderStyles: CSSObject = {
  color: 'rgba(54,54,54,.3)'
};
