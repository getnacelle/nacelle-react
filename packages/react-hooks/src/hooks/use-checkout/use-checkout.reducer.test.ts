import checkoutReducer, {
  initialState,
  CLEAR_CHECKOUT_DATA,
  SET_PROCESS_CHECKOUT_DATA
} from './use-checkout.reducer';
import { cacheKeys } from './utils';

const id = '112233'; // the checkout ID

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

  it('should set all properties of checkoutState', async () => {
    const url = 'https://endofie.party';

    const checkoutState = checkoutReducer(initialState, {
      type: SET_PROCESS_CHECKOUT_DATA,
      payload: { id, url }
    });

    expect(checkoutState.completed).toEqual(false);
    expect(
      JSON.parse(window.localStorage.getItem(cacheKeys.completed) as string)
    ).toEqual(false);

    expect(checkoutState.id).toEqual(id);
    expect(window.localStorage.getItem(cacheKeys.id) as string).toEqual(id);

    expect(checkoutState.url).toEqual(url);
    expect(window.localStorage.getItem(cacheKeys.url) as string).toEqual(url);
  });

  it('should clear all properties of checkoutState', async () => {
    const checkoutState = checkoutReducer(initialState, {
      type: CLEAR_CHECKOUT_DATA
    });

    expect(checkoutState.completed).toEqual(false);
    expect(window.localStorage.getItem(cacheKeys.completed)).toEqual(null);

    expect(checkoutState.id).toEqual('');
    expect(window.localStorage.getItem(cacheKeys.id)).toEqual(null);

    expect(checkoutState.url).toEqual('');
    expect(window.localStorage.getItem(cacheKeys.url)).toEqual(null);
  });
});

export default {};
