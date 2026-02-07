import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { XMLParser } from 'fast-xml-parser';

import { normalizePath } from '@/lib/utils/paths';

export interface OldManifestPage {
  url: string;
  finalUrl?: string;
  title?: string;
  canonical?: string;
  meta?: {
    description?: string;
    robots?: string;
  };
  headings?: {
    h1?: string[];
    h2?: string[];
    h3?: string[];
  };
}

export interface OldManifest {
  site?: {
    baseUrl?: string;
  };
  pages: OldManifestPage[];
  urlMap?: Array<{
    originalUrl: string;
    localPath: string;
  }>;
}

export interface ParsedOldExport {
  exportRoot: string;
  sitemapPaths: string[];
  manifest: OldManifest;
}

const EXPORT_CANDIDATES = ['IceLady old website', 'Icelady Old Page', 'icelady old website'];

function findExportRoot(baseDir: string): string {
  for (const candidate of EXPORT_CANDIDATES) {
    const candidatePath = path.join(baseDir, candidate);
    if (
      existsSync(candidatePath) &&
      existsSync(path.join(candidatePath, 'sitemap.xml')) &&
      existsSync(path.join(candidatePath, 'site-manifest.json'))
    ) {
      return candidatePath;
    }
  }

  const dirs = readdirSync(baseDir)
    .map((entry) => path.join(baseDir, entry))
    .filter((entryPath) => statSync(entryPath).isDirectory());

  for (const dir of dirs) {
    if (existsSync(path.join(dir, 'sitemap.xml')) && existsSync(path.join(dir, 'site-manifest.json'))) {
      return dir;
    }
  }

  throw new Error('Could not find old export folder with sitemap.xml and site-manifest.json.');
}

function parseSitemapPaths(xmlSource: string): string[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true
  });

  const parsed = parser.parse(xmlSource);
  const rawUrls = parsed?.urlset?.url;

  if (!rawUrls) {
    return [];
  }

  const entries = Array.isArray(rawUrls) ? rawUrls : [rawUrls];
  const paths = entries
    .map((entry) => entry?.loc)
    .filter((loc): loc is string => typeof loc === 'string')
    .map((loc) => normalizePath(new URL(loc).pathname));

  return [...new Set(paths)];
}

export function parseOldExport(baseDir = process.cwd()): ParsedOldExport {
  const exportRoot = findExportRoot(baseDir);

  const sitemapXml = readFileSync(path.join(exportRoot, 'sitemap.xml'), 'utf8');
  const manifestJson = readFileSync(path.join(exportRoot, 'site-manifest.json'), 'utf8');

  const sitemapPaths = parseSitemapPaths(sitemapXml);
  const manifest = JSON.parse(manifestJson) as OldManifest;

  return {
    exportRoot,
    sitemapPaths,
    manifest
  };
}
