export const cart = {
  '@media screen and (min-width: 769px)': {
    width: 448
  },
  '@media screen and (max-width: 768px)': {
    width: '100%'
  },
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  backgroundColor: 'white',
  zIndex: 99,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
  transition: 'transform 0.3s cubic-bezier(0, 0.52, 0, 1)',
  borderLeft: '1px solid #dedede7a',
  boxShadow: '20px 0 20px 20px #e6e6e6c4'
};

export const hide = {
  transform: 'translateX(100%)'
};

export const show = {
  transform: 'translateX(0%)'
};

export const closeIcon = {
  width: 16
};

export const cartHeader = {
  borderBottom: '1px solid #dedede'
};

export const closeButton = {
  outline: 0,
  border: 0,
  background: 'none',
  position: 'absolute',
  padding: '1px 6px',
  height: 'auto',
  top: 24,
  right: 32,
  cursor: 'pointer',
  zIndex: 100
};

export const cartTitle = {
  fontFamily: 'Bebas Neue',
  fontSize: 22,
  textTransform: 'uppercase',
  textAlign: 'center',
  margin: 24,
  cursor: 'pointer'
};

export const checkoutButton = {
  backgroundColor: '#3b3b3b',
  width: '100%',
  padding: 32,
  textTransform: 'uppercase',
  fontSize: 16,
  letterSpacing: '1px',
  color: 'white',
  border: 0,
  outline: 0,
  height: 'auto',
  borderRadius: 0
};

export const cartItem = {
  padding: 16,
  display: 'flex'
};

export const cartItemTitle = {
  fontFamily: 'Bebas Neue',
  fontSize: 22,
  marginTop: 0,
  marginBottom: 11,
  textTransform: 'uppercase'
};

export const cartItemThumbnail = {
  width: '100%'
};

export const thumbnailContainer = {
  flex: 'none',
  padding: 12,
  width: '25%',
  marginTop: 5
};

export const removeProductButton = {
  textTransform: 'uppercase',
  color: '#363636',
  backgroundColor: '#f3f3f3',
  marginLeft: 16,
  height: 48,
  border: 0,
  outline: 0,
  fontSize: 14,
  letterSpacing: '1px',
  fontWeight: 600,
  padding: '6px 14px'
};

export const column = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: 12
};

export const productInteractLayout = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

export const cartItemPrice = {
  flexGrow: 1
};

export const cartItems = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  flexGrow: 5
};

export const subTotalFooter = {
  borderTop: '1px solid #dedede',
  padding: '24px 0'
};

export const subTotal = {
  fontSize: 18,
  lineHeight: '28px',
  textTransform: 'uppercase',
  color: '#616161',
  textAlign: 'center',
  '& span:first-of-type': {
    marginRight: 8
  },
  marginTop: 0,
  marginBottom: 0
};

export const subtotalPrice = {
  fontFamily: 'Source Sans Pro',
  fontWeight: 600
};

export const cartItemTitleLayout = {
  display: 'flex',
  justifyContent: 'space-between'
};
