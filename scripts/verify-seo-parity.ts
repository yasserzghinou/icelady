import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

import { XMLParser } from 'fast-xml-parser';
import matter from 'gray-matter';

import routeMap from '../src/lib/routing/routeMap.json';
import { normalizePath } from '../src/lib/utils/paths';

function resolveOldSitemapPath(projectRoot: string): string {
  const candidates = [
    path.join(projectRoot, 'IceLady old website', 'sitemap.xml'),
    path.join(projectRoot, 'Icelady Old Page', 'sitemap.xml'),
    path.join(projectRoot, 'icelady old website', 'sitemap.xml')
  ];

  for (const candidate of candidates) {
    try {
      readFileSync(candidate, 'utf8');
      return candidate;
    } catch {
      continue;
    }
  }

  throw new Error('Could not find old sitemap.xml in expected export folders.');
}

function parseSitemapPaths(xmlSource: string): string[] {
  const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });
  const parsed = parser.parse(xmlSource);
  const urls = parsed?.urlset?.url;
  const items = Array.isArray(urls) ? urls : [urls];

  return items
    .filter((entry) => entry?.loc)
    .map((entry) => normalizePath(new URL(entry.loc).pathname));
}

function loadGeneratedCoverage(projectRoot: string): {
  servicePaths: Set<string>;
  genericPaths: Set<string>;
  blogPaths: Set<string>;
} {
  const servicesJson = JSON.parse(
    readFileSync(path.join(projectRoot, 'src', 'content', 'services.json'), 'utf8')
  ) as {
    services: Array<{ path: string }>;
  };
  const pagesJson = JSON.parse(
    readFileSync(path.join(projectRoot, 'src', 'content', 'pages.json'), 'utf8')
  ) as {
    pages: Array<{ path: string }>;
  };
  const blogDir = path.join(projectRoot, 'src', 'content', 'blog');
  const blogPaths = new Set<string>();

  for (const fileName of readdirSync(blogDir)) {
    if (!fileName.endsWith('.mdx')) {
      continue;
    }
    const source = readFileSync(path.join(blogDir, fileName), 'utf8');
    const parsed = matter(source);
    if (typeof parsed.data.path === 'string') {
      blogPaths.add(normalizePath(parsed.data.path));
    }
  }

  return {
    servicePaths: new Set((servicesJson.services || []).map((service) => normalizePath(service.path))),
    genericPaths: new Set((pagesJson.pages || []).map((page) => normalizePath(page.path))),
    blogPaths
  };
}

function toPrimaryPath(pathname: string): string {
  return pathname.replace(/^\/(fr|ar)\//, '/en/').replace(/^\/(fr|ar)$/, '/en');
}

function hasRouteCoverage(
  route: { type: string; path: string },
  coverage: { servicePaths: Set<string>; genericPaths: Set<string>; blogPaths: Set<string> }
): boolean {
  const primaryPath = toPrimaryPath(route.path);

  switch (route.type) {
    case 'home':
      return primaryPath === '/en';
    case 'servicesIndex':
      return primaryPath === '/en/collections/all';
    case 'service':
      return coverage.servicePaths.has(primaryPath);
    case 'blogIndex':
      return primaryPath === '/en/blogs/news';
    case 'blogPost':
      return coverage.blogPaths.has(primaryPath);
    case 'contact':
      return primaryPath === '/en/pages/contact';
    case 'about':
      return primaryPath === '/en/pages/about';
    case 'generic':
    case 'utility':
      return coverage.genericPaths.has(primaryPath);
    default:
      return false;
  }
}

function main(): void {
  const projectRoot = process.cwd();
  const sitemapPath = resolveOldSitemapPath(projectRoot);
  const sitemapXml = readFileSync(sitemapPath, 'utf8');
  const oldPaths = parseSitemapPaths(sitemapXml);

  const newPaths = new Set(routeMap.map((entry) => entry.path));
  const missing = oldPaths.filter((pathItem) => !newPaths.has(pathItem));

  if (missing.length > 0) {
    console.error('SEO parity check failed. Missing paths:');
    for (const missingPath of missing) {
      console.error(`- ${missingPath}`);
    }
    process.exit(1);
  }

  const coverage = loadGeneratedCoverage(projectRoot);
  const uncovered = routeMap
    .filter((entry) => !hasRouteCoverage(entry, coverage))
    .map((entry) => `${entry.path} (${entry.type})`);

  if (uncovered.length > 0) {
    console.error('Route coverage check failed. Paths without renderer/content coverage:');
    for (const value of uncovered) {
      console.error(`- ${value}`);
    }
    process.exit(1);
  }

  console.log(`SEO parity check passed (${oldPaths.length} paths) with route coverage.`);
}

main();
