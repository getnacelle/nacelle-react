export const ourProducts = {
  '@media screen and (max-width: 768px)': {
    margin: -12,
    maxWidth: '100%',
    padding: '12px 12px 32px 12px'
  },
  padding: 48,
  backgroundColor: '#f5f5f5'
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

export const layout = {
  padding: '48px 24px'
};

export const filterSection = {
  backgroundColor: 'whitesmoke',
  padding: '3rem 1.5rem',
  display: 'flex',
  flexDirection: 'column'
};

export const searchInput = {
  padding: 12,
  fontSize: 18,
  minWidth: 400,
  alignSelf: 'center'
};

export const refineSearch = {
  fontSize: 24,
  fontWeight: 400,
  margin: '4rem 0 1.5rem 0',
  textTransform: 'uppercase'
};

export const filterTitle = {
  textTransform: 'capitalize',
  fontSize: 20,
  fontWeight: 400
};

export const filterLayout = {
  '@media screen and (max-width: 1023px)': {
    borderLeft: 'none',
    paddingLeft: 0
  },
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid #cecece',
  paddingLeft: 32,
  paddingBottom: 16,
  '&:first-of-type': {
    border: 'none',
    paddingLeft: 0
  }
};

export const checkboxLayout = {
  display: 'flex',
  margin: '1px 0',
  '& label': {
    marginLeft: 12,
    fontWeight: 300
  }
};

export const filterGrid = {
  '@media screen and (max-width: 1023px)': {
    gridTemplateColumns: '1fr',
    gridGap: 0
  }
};

export const resultCount = {
  marginLeft: 24,
  fontWeight: 400
};
