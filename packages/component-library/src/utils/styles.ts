import { CSSObject } from '@emotion/core';

function combineObjects<T>(combined: T, obj: T): T {
  return { ...combined, ...obj };
}

export function composeStyles(styles: CSSObject[]): CSSObject {
  return styles.filter(Boolean).reduce(combineObjects, {});
}
