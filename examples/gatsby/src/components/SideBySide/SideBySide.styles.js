export const columnLayout = {
  flexDirection: 'row',
  display: 'flex'
};

export const column = {
  width: '100vw',
  minHeight: '25em',
  display: 'flex',
  maxWidth: 'unset',
  '@media screen and (min-width: 1023px)': {
    width: '50%'
  }
};

export const image = {
  width: '100vw',
  height: '100%',
  maxHeight: '35em',
  objectFit: 'cover',
  '@media screen and (min-width: 1023px)': {
    width: '50vw',
    maxHeight: 'unset'
  }
};

export const title = {
  marginTop: 0,
  marginBottom: 24,
  fontSize: 32,
  fontFamily: 'Bebas Neue',
  textTransform: 'uppercase',
  textAlign: 'center',
  color: '#363636'
};

export const content = {
  display: 'flex',
  flexGrow: 1,
  padding: '32px 48px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

export const textContent = {
  fontSize: 18,
  lineHeight: '28px',
  textAlign: 'center',
  color: '#363636',
  marginTop: 0,
  marginBottom: 16
};

export const ctaButton = {
  textTransform: 'uppercase',
  outline: 0,
  border: 0,
  background: 'none',
  color: '#363636',
  borderBottom: '1px solid #3b3b3b',
  padding: '2px 0 4px 0',
  fontSize: 14,
  cursor: 'pointer',
  borderRadius: 0
};
