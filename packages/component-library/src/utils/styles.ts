import { CSSObject } from '@emotion/core';

function combineObjects<T>(combined: T, obj: T): T {
  return { ...combined, ...obj };
}

/**
 * Creates a single style object from many style objects. Styles
 * are merged from left to right and any undefined or null values
 * are removed.
 *
 * @param styles - A list of Emotion style objects
 *
 * @return A combined CSS object
 */
export function composeStyles(styles: CSSObject[]): CSSObject {
  return styles.filter(Boolean).reduce(combineObjects, {});
}
