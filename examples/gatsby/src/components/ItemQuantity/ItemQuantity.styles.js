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
  backgroundColor: 'white',
  height: 'auto',
  padding: 0
};

export const quantity = {
  height: 48,
  width: 48,
  display: 'inline-flex',
  alignItems: 'center',
  paddingLeft: 5
};
