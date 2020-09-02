export const layout = {
  display: 'flex',
  alignItems: 'center'
};

export const input = {
  '@media screen and (max-width: 1023px)': {
    display: 'none'
  }
};

export const button = {
  padding: '0 6px',
  margin: 0,
  border: 'none',
  marginLeft: 6
};

export const resultModal = {
  background: 'white',
  position: 'absolute',
  zIndex: 100,
  top: '5rem',
  right: '6rem',
  width: '30rem',
  overflow: 'scroll',
  height: '30rem',
  borderRadius: 4,
  padding: '1rem',
  border: '1px solid #d3d3d3',
  boxShadow: '-1px 4px 7px 0px rgba(0, 0, 0, 0.08)'
};

export const mask = {
  height: '100vh',
  width: '100vw',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 99,
  background: 'transparent'
};

export const resultTitle = {
  textTransform: 'uppercase',
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: 400,
  paddingBottom: 16,
  borderBottom: '1px solid #3b3b3b',
  marginBottom: 24
};

export const resultCard = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '8px 0',
  padding: '0 16px'
};

export const productImage = {
  maxWidth: '100%',
  minHeight: 100,
  maxHeight: 100,
  width: '100%',
  objectFit: 'cover'
};

export const productTitle = {
  flexGrow: 3,
  paddingLeft: 16,
  fontSize: 18,
  textTransform: 'uppercase'
};
