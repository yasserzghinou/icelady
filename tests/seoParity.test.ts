import { readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';
import { XMLParser } from 'fast-xml-parser';

import routeMap from '../src/lib/routing/routeMap.json';
import { normalizePath } from '../src/lib/utils/paths';

function loadOldSitemapXml(): string {
  const projectRoot = process.cwd();
  const candidates = [
    path.join(projectRoot, 'IceLady old website', 'sitemap.xml'),
    path.join(projectRoot, 'Icelady Old Page', 'sitemap.xml'),
    path.join(projectRoot, 'icelady old website', 'sitemap.xml')
  ];

  for (const candidate of candidates) {
    try {
      return readFileSync(candidate, 'utf8');
    } catch {
      continue;
    }
  }

  throw new Error('Unable to locate old sitemap.xml.');
}

describe('SEO parity', () => {
  it('contains every path from the old sitemap', () => {
    const xml = loadOldSitemapXml();
    const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });
    const parsed = parser.parse(xml);
    const urls = parsed?.urlset?.url;
    const entries = Array.isArray(urls) ? urls : [urls];

    const oldPaths = entries
      .filter((entry) => entry?.loc)
      .map((entry) => normalizePath(new URL(entry.loc).pathname));

    const newPaths = new Set(routeMap.map((entry) => entry.path));

    for (const oldPath of oldPaths) {
      expect(newPaths.has(oldPath)).toBe(true);
    }
  });
});
