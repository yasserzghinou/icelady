import { describe, expect, it } from 'vitest';

import routeMap from '../src/lib/routing/routeMap.json';

describe('routeMap sanity', () => {
  it('contains unique paths', () => {
    const paths = routeMap.map((entry) => entry.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('uses canonical URLs on islady.ma', () => {
    for (const entry of routeMap) {
      expect(entry.canonical.startsWith('https://islady.ma/')).toBe(true);
    }
  });

  it('stores normalized absolute paths', () => {
    for (const entry of routeMap) {
      expect(entry.path.startsWith('/')).toBe(true);
      if (entry.path.length > 1) {
        expect(entry.path.endsWith('/')).toBe(false);
      }
    }
  });
});
