import debounce from './debounce';

const testFn = jest.fn();

jest.useFakeTimers();

describe('debounce()', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should delay a function call', () => {
    const debouncedFn = debounce(testFn, 200);

    debouncedFn();
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(testFn).toHaveBeenCalledTimes(1);
  });

  it('should invoke a function immediately if immediate is true', () => {
    const debouncedFn = debounce(testFn, 200, true);

    debouncedFn();

    expect(testFn).toHaveBeenCalledTimes(1);
  });
});
