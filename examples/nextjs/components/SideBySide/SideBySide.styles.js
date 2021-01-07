export const columnLayout = {
  flexDirection: 'row',
  display: 'flex'
};

export const column = {
  '@media screen and (max-width: 1023px)': {
    maxWidth: 'unset'
  },
  maxWidth: '50%',
  minHeight: '25em',
  display: 'flex',
  zIndex: 0
};

export const image = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
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
