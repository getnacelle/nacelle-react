export const block = {
  display: 'grid',
  placeItems: 'center',
  '@media screen and (min-width: 1023px)': {
    gridTemplateColumns: '1fr 1fr'
  }
};

export const image = {
  width: '100%',
  objectFit: 'cover',
  '@media screen and (min-width: 1023px)': {
    height: '70vh'
  }
};

export const titleBlock = {
  position: 'absolute',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media screen and (min-width: 1023px)': {
    position: 'relative'
  }
};

export const bannerTitle = {
  margin: '0 1.34em',
  position: 'absolute',
  color: '#fff',
  fontSize: '2.5rem',
  textShadow: '1px 2px darkslategray',
  '@media screen and (min-width: 1023px)': {
    fontSize: '3.5em',
    color: '#404040',
    textShadow: 'unset'
  }
};
