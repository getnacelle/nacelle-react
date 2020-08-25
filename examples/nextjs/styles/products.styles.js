export const layout = {
  padding: '48px 24px'
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

export const column = {
  '@media screen and (max-width: 768px)': {
    marginTop: 0,
    width: '100%',
    maxWidth: '100%'
  },
  maxWidth: '65vw',
  marginTop: '1.33em'
};

export const productImage = {
  width: '100%'
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

export const productInteractLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr'
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

export const detailGridLayout = {
  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    margin: 0,
    columnGap: 0
  },
  marginTop: 48,
  marginLeft: 46,
  marginRight: 46,
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  columnGap: 98
};

export const gettingTitle = {
  fontSize: 24,
  fontFamily: 'Bebas Neue',
  textTransform: 'uppercase',
  marginTop: 0,
  marginBottom: 24
};

export const gettingText = {
  lineHeight: '1.5rem'
};

export const gettingLayout = {
  '@media screen and (max-width: 768px)': {
    paddingTop: 48,
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: '100%',
    marginBottom: 32
  },
  maxWidth: '80vw',
  paddingTop: 48,
  paddingLeft: 12,
  paddingRight: 12
};

export const ourProducts = {
  '@media screen and (max-width: 768px)': {
    margin: -12,
    maxWidth: '100%',
    padding: '12px 12px 32px 12px'
  },
  padding: 48,
  backgroundColor: '#f5f5f5'
};
