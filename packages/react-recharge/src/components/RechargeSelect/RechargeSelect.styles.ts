import { CSSObject } from '@emotion/core';

export const container: CSSObject = {
  border: '1px solid #f3f3f3',
  borderRadius: 4,
  boxSizing: 'border-box'
};

export const radioContainer: CSSObject = {
  padding: 10,
  cursor: 'pointer'
};

export const radioLayout: CSSObject = {
  display: 'flex',
  alignItems: 'center'
};

export const radio: CSSObject = {
  margin: '0 6px 0 0'
};

export const label: CSSObject = {
  fontSize: '1rem',
  width: '100%'
};

export const notSelected: CSSObject = {
  background: '#f3f3f3',
  '&:hover': {
    background: '#e9e9e9'
  }
};

export const frequencyContainer: CSSObject = {
  marginTop: 12
};

export const frequencyTitle: CSSObject = {
  fontWeight: 'bold',
  margin: 0
};

export const select: CSSObject = {
  display: 'block',
  marginTop: 10,
  padding: '6px 16px 6px 6px',
  borderRadius: 4,
  border: '1px solid #dbdbdb'
};
