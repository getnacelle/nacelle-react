import { useEffect, useMemo } from 'react';
import debounce from '../utils/debounce';

declare global {
  interface Window {
    yotpo?: {
      refreshWidgets: Function;
    };
  }
}

/**
 * Forces Yotpo widgets to update when a React component mounts. This
 * refresh is debounced so that it does not repeatedly occur.
 *
 * @param debounceTime the amount of time (in milliseconds) the refresh
 *  call should be debounced. The default time is 200 milliseconds
 *
 * @returns undefined
 */
export function useYotpoRefresh(debounceTime: number = 200): void {
  const debouncedRefresh = useMemo(() => {
    const refreshWidgets = window.yotpo
      ? window.yotpo.refreshWidgets.bind(window.yotpo)
      : () => {};

    return debounce(refreshWidgets, debounceTime);
  }, [debounceTime]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.yotpo) {
      debouncedRefresh();
    }
  }, [debouncedRefresh]);
}
