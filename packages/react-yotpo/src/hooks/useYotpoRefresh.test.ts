import { renderHook } from '@testing-library/react-hooks';

import { useYotpoRefresh } from './useYotpoRefresh';

jest.useFakeTimers();

const refreshWidgets = jest.fn();

describe('useYotpoRefresh()', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call the yotpo.refreshWidgets based on the debounceTime', () => {
    window.yotpo = { refreshWidgets };

    const { result } = renderHook(() => useYotpoRefresh(400));
    jest.runAllTimers();

    expect(result.current).toBeUndefined();
    // setTimeout is called once by testing library and then by debounce
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 400);
    expect(refreshWidgets).toHaveBeenCalledTimes(1);
  });

  it('should do nothing if yotpo is not available on the window object', () => {
    window.yotpo = undefined;

    const { result } = renderHook(() => useYotpoRefresh(400));
    jest.runAllTimers();

    expect(result.current).toBeUndefined();
    // setTimeout is called once by testing library and then by debounce
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(refreshWidgets).not.toHaveBeenCalled();
  });
});
