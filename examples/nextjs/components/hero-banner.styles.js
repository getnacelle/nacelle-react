export const block = {
  display: 'flex',
  placeItems: 'center',
  justifyContent: 'center',
  marginBottom: '-0.33em',
  width: '100%'
};

export const image = {
  width: '100%',
  objectFit: 'cover'
};

export const title = (color, device) => ({
  position: 'absolute',
  color: color,
  fontSize: device && device.isMobile ? '2.5em' : '4em',
  textShadow: '1px 2px darkslategray'
});
