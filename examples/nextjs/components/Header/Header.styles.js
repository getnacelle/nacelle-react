export const header = {
  display: 'flex',
  alignItems: 'center',
  height: 75,
  paddingLeft: 16,
  paddingRight: 16,
  borderBottom: '1px solid #d3d3d3',
  justifyContent: 'space-between'
};

export const name = {
  textTransform: 'uppercase',
  textDecoration: 'none',
  fontWeight: 'bold',
  color: '#363636'
};

export const nav = {
  '@media screen and (max-width: 768px)': {
    display: 'none'
  },
  display: 'flex',
  minWidth: '50vw',
  justifyContent: 'space-around'
};

export const navLink = {
  color: '#3b3b3b',
  fontSize: 15,
  letterSpacing: '0.27px',
  padding: 16,
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'uppercase'
};

export const cartButton = {
  outline: 0,
  border: 0,
  padding: '0 6px',
  position: 'relative'
};

export const cartIcon = {
  width: 26,
  height: 26
};

export const cartCount = {
  backgroundColor: '#3b3b3b',
  color: 'white',
  border: '2px solid #fff',
  width: 20,
  height: 20,
  position: 'absolute',
  top: -4,
  right: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: 1.5,
  borderRadius: '50%'
};

export const mobileMenuButton = {
  '@media screen and (min-width: 769px)': {
    display: 'none'
  },
  position: 'relative',
  display: 'block',
  height: 52,
  width: 52,
  color: '#4a4a4a',
  cursor: 'pointer',
  background: 'transparent',
  border: 0,
  outline: 0,
  '& span': {
    position: 'absolute',
    left: 'calc(50% - 8px)',
    display: 'block',
    backgroundColor: '#4a4a4a',
    height: 2,
    width: 16
  },
  '& span:first-of-type': {
    top: 'calc(50% - 6px)'
  },
  '& span:nth-of-type(2)': {
    top: 'calc(50% - 1px)'
  },
  '& span:last-of-type': {
    top: 'calc(50% + 4px)'
  }
};

export const mobileNav = {
  '@media screen and (min-width: 769px)': {
    display: 'none'
  },
  width: '100%',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'white',
  zIndex: 99,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  transition: 'transform 0.3s cubic-bezier(0, 0.52, 0, 1)',
  borderRight: '1px solid #dedede7a',
  boxShadow: '20px 0 20px 20px #e6e6e6c4'
};

export const hide = {
  transform: 'translateX(-100%)'
};

export const show = {
  transform: 'translateX(0%)'
};

export const mobileNavHeader = {
  boxSizing: 'border-box',
  position: 'relative',
  padding: 32,
  borderBottom: '1px solid #d3d3d3',
  textAlign: 'center'
};

export const closeButton = {
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'none',
  border: 0,
  outline: 0,
  cursor: 'pointer'
};

export const closeIcon = {
  width: 16
};

export const mobileNavLink = {
  ...navLink,
  padding: '16px 0',
  borderBottom: '1px solid #f3f3f3'
};

export const mobileNavItems = {
  display: 'flex',
  flexDirection: 'column',
  padding: 16
};

export const buttons = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};

export const accountButton = {
  width: '25px',
  height: '25px'
};
