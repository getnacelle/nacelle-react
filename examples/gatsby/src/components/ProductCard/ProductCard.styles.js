export const cardMargin = {
  margin: '0 2em'
};

export const column = {
  '@media screen and (max-width: 768px)': {
    marginTop: 0,
    width: '100%',
    maxWidth: '100%'
  },
  maxWidth: '65vw',
  marginTop: '1.33em'
};

export const productGridLayout = {
  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    columnGap: 0,
    margin: 0
  },
  marginLeft: 46,
  marginRight: 46,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 98
};

export const sectionMargins = {
  '@media screen and (max-width: 768px)': {
    margin: 0
  },
  marginLeft: 46,
  marginRight: 46
};

export const productTitle = {
  '@media screen and (max-width: 768px)': {
    marginTop: 12
  },
  fontSize: 30,
  marginBottom: 16,
  marginTop: 0,
  fontFamily: 'Bebas Neue',
  textTransform: 'uppercase'
};

export const productPrice = {
  fontSize: 20,
  marginBottom: 16
};

export const productDesc = {
  lineHeight: '1.5rem',
  marginBottom: 16
};

export const addToCartButton = {
  padding: '12px 24px',
  height: 48,
  letterSpacing: 1,
  border: 0,
  outline: 0,
  boxShadow: 'none',
  backgroundColor: '#3b3b3b',
  color: '#fff',
  width: '100%'
};

export const counterLayout = {
  display: 'flex',
  maxWidth: 80,
  border: '1px solid #dbdbdb'
};

export const counterSwitchLayout = {
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid #dbdbdb',
  width: 32,
  '& button:first-of-type': {
    borderBottom: '1px solid #dbdbdb'
  }
};

export const counterSwitch = {
  flexGrow: 1,
  flexBasis: '50%',
  textAlign: 'center',
  cursor: 'pointer',
  outline: 0,
  border: 0,
  color: '#3b3b3b',
  backgroundColor: 'white'
};

export const quantity = {
  height: 48,
  width: 48,
  display: 'inline-flex',
  alignItems: 'center',
  paddingLeft: 5
};

export const productImage = {
  '@media screen and (max-width: 768px)': {
    maxHeight: 304
  },
  maxWidth: '100%',
  minHeight: 216,
  width: '100%',
  maxHeight: 216,
  objectFit: 'cover'
};

export const pdpImage = {
  maxWidth: '100%',
  width: '100%'
};

export const pdpLink = {
  textDecoration: 'none',
  color: '#000000',
  cursor: 'pointer'
};
