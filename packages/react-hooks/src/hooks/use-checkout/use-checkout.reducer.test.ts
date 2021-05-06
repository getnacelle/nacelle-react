import checkoutReducer, {
  initialState,
  CLEAR_CHECKOUT_DATA,
  SET_CHECKOUT_COMPLETE,
  SET_CHECKOUT_DATA,
  SET_CHECKOUT_ID,
  SET_CHECKOUT_SOURCE,
  SET_CHECKOUT_URL
} from './use-checkout.reducer';

const complete = true;
const id = '112233';
const source = 'Shopify';
const url = 'https://endofie.party';

describe('useCheckout reducer', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    const localStorageMock = (() => {
      let store: any = {};
      return {
        getItem: (key: string) => {
          return store[key] || null;
        },
        setItem: (key: string, value: string) => {
          store[key] = value.toString();
        },
        clear: () => {
          store = {};
        },
        removeItem: (key: string) => {
          delete store[key];
        }
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
  });

  it('should set checkoutState.checkoutComplete', async () => {
    const checkoutState = checkoutReducer(initialState, {
      type: SET_CHECKOUT_COMPLETE,
      payload: complete
    });

    expect(checkoutState.checkoutComplete).toEqual(complete);
    expect(
      JSON.parse(window.localStorage.getItem('checkoutComplete') as string)
    ).toEqual(complete);
  });

  it('should set checkoutState.checkoutId', async () => {
    const checkoutState = checkoutReducer(initialState, {
      type: SET_CHECKOUT_ID,
      payload: id
    });

    expect(checkoutState.checkoutId).toEqual(id);
    expect(window.localStorage.getItem('checkoutId') as string).toEqual(id);
  });

  it('should set checkoutState.checkoutSource', async () => {
    const checkoutState = checkoutReducer(initialState, {
      type: SET_CHECKOUT_SOURCE,
      payload: source
    });

    expect(checkoutState.checkoutSource).toEqual(source);
    expect(window.localStorage.getItem('checkoutSource') as string).toEqual(
      source
    );
  });

  it('should set checkoutState.checkoutUrl', async () => {
    const checkoutState = checkoutReducer(initialState, {
      type: SET_CHECKOUT_URL,
      payload: url
    });

    expect(checkoutState.checkoutUrl).toEqual(url);
    expect(window.localStorage.getItem('checkoutUrl') as string).toEqual(url);
  });

  it('should set all properties of checkoutState', async () => {
    const url = 'https://endofie.party';
    const checkoutState = checkoutReducer(initialState, {
      type: SET_CHECKOUT_DATA,
      payload: {
        checkoutComplete: complete,
        checkoutId: id,
        checkoutSource: source,
        checkoutUrl: url
      }
    });

    expect(checkoutState.checkoutComplete).toEqual(complete);
    expect(
      JSON.parse(window.localStorage.getItem('checkoutComplete') as string)
    ).toEqual(complete);

    expect(checkoutState.checkoutId).toEqual(id);
    expect(window.localStorage.getItem('checkoutId') as string).toEqual(id);

    expect(checkoutState.checkoutSource).toEqual(source);
    expect(window.localStorage.getItem('checkoutSource') as string).toEqual(
      source
    );

    expect(checkoutState.checkoutUrl).toEqual(url);
    expect(window.localStorage.getItem('checkoutUrl') as string).toEqual(url);
  });

  it('should clear all properties of checkoutState', async () => {
    const checkoutState = checkoutReducer(initialState, {
      type: CLEAR_CHECKOUT_DATA
    });

    expect(checkoutState.checkoutComplete).toEqual(false);
    expect(window.localStorage.getItem('checkoutComplete')).toEqual(null);

    expect(checkoutState.checkoutId).toEqual('');
    expect(window.localStorage.getItem('checkoutId')).toEqual(null);

    expect(checkoutState.checkoutSource).toEqual('');
    expect(window.localStorage.getItem('checkoutSource')).toEqual(null);

    expect(checkoutState.checkoutUrl).toEqual('');
    expect(window.localStorage.getItem('checkoutUrl')).toEqual(null);
  });
});

export default {};
