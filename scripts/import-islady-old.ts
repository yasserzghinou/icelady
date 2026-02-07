import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { buildRouteMap } from '../src/lib/import/buildRouteMap';
import { parseOldExport } from '../src/lib/import/parseOldExport';
import { seedContent } from '../src/lib/import/seedContent';
import { logger } from '../src/lib/utils/logger';

function ensureDir(dirPath: string): void {
  mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath: string, value: unknown): void {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeBlogPosts(
  projectRoot: string,
  posts: Array<{
    slug: string;
    title: string;
    description: string;
    path: string;
    date: string;
    needsCopy: boolean;
    content: string;
  }>
): void {
  const blogDir = path.join(projectRoot, 'src', 'content', 'blog');
  ensureDir(blogDir);

  const keep = new Set(posts.map((post) => `${post.slug}.mdx`));
  for (const existingFile of readdirSync(blogDir)) {
    if (existingFile.endsWith('.mdx') && !keep.has(existingFile)) {
      rmSync(path.join(blogDir, existingFile));
    }
  }

  for (const post of posts) {
    const mdxPath = path.join(blogDir, `${post.slug}.mdx`);
    const imageBySlug: Record<string, string> = {
      'clinique-de-cryolipolyse-a-marrakech-traitement-de-perte-de-poids-avance':
        '/images/blog/clinique-cryolipolyse.jpg',
      'meilleures-methodes-de-perte-de-poids-en-2023': '/images/blog/meilleures-methodes.jpg',
      prendre_controle_de_votre_poids: '/images/blog/prendre-controle.png',
      trouvez_le_bonheur_en_prenant_soin_de_votre_corps_en_meditant:
        '/images/blog/trouver-bonheur.jpg'
    };
    const mdxSource = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
path: "${post.path}"
date: "${post.date}"
image: "${imageBySlug[post.slug] || '/images/hero-main.jpg'}"
needsCopy: ${post.needsCopy}
---

${post.content}
`;
    writeFileSync(mdxPath, mdxSource, 'utf8');
  }
}

function syncCuratedImages(projectRoot: string, exportRoot: string): void {
  const imageMap = [
    { source: 'assets/images/43cc03f219bfecfc443186668b1da99d.jpg', target: 'images/hero-main.jpg' },
    {
      source: 'assets/images/f649e4a4274ab1d118fe1a76ce5aadd2.png',
      target: 'images/cryotherapy-feature.png'
    },
    {
      source: 'assets/images/3eeb495160f952d10b6148090137a173.jpg',
      target: 'images/services/chromo.jpg'
    },
    {
      source: 'assets/images/01d901ac9c6df5f42fb4a2fc53cbc74a.png',
      target: 'images/services/chromo-detail-1.jpg'
    },
    {
      source: 'assets/images/0097a486091715c9be6a31af977ab6a7.png',
      target: 'images/services/chromo-detail-2.jpg'
    },
    {
      source: 'assets/images/0b3cf9749e2b0163c184eadc494cf752.jpg',
      target: 'images/services/extensions.jpg'
    },
    {
      source: 'assets/images/dc3e47e421f1af9cf9004032f6bd542e.jpg',
      target: 'images/services/extensions-detail-1.jpg'
    },
    {
      source: 'assets/images/11486169937b55ea6f41c239ad75bc82.jpg',
      target: 'images/services/extensions-detail-2.jpg'
    },
    {
      source: 'assets/images/d36306e4c2eaea057ebb6aa35b9903c1.jpg',
      target: 'images/services/micro-needling.jpg'
    },
    {
      source: 'assets/images/c13f5bf212687f465165c7eedb6c7cc6.jpg',
      target: 'images/services/micro-needling-detail-1.jpg'
    },
    {
      source: 'assets/images/69f251da1e707970686e6c39b2e9178c.png',
      target: 'images/services/micro-needling-detail-2.jpg'
    },
    {
      source: 'assets/images/95be3baf0d41ffd980c32fafb77c5fa9.jpg',
      target: 'images/services/microblading.jpg'
    },
    {
      source: 'assets/images/27c2893a650ec68c7e0683fc4c76d4ea.jpg',
      target: 'images/services/microblading-detail-1.jpg'
    },
    {
      source: 'assets/images/973f66d44b255c12a04698c632046c97.jpg',
      target: 'images/services/microblading-detail-2.jpg'
    },
    {
      source: 'assets/images/0faea81d0c3acb5a7a0ea929975933f4.jpg',
      target: 'images/services/peeling.jpg'
    },
    {
      source: 'assets/images/ae7a188161550f6d36f6faddd0484f07.jpg',
      target: 'images/services/peeling-detail-1.jpg'
    },
    {
      source: 'assets/images/c80519a72128193f6951f59822c7d655.png',
      target: 'images/services/peeling-detail-2.jpg'
    },
    {
      source: 'assets/images/6ee23791a7db973dce3faf787b914285.jpg',
      target: 'images/services/anti-age.jpg'
    },
    {
      source: 'assets/images/71e22f5c950f68fcc7e173b8b1aedf0f.png',
      target: 'images/services/anti-age-detail-1.jpg'
    },
    {
      source: 'assets/images/6a8e005a9326ad8429eb7a919b143ad7.png',
      target: 'images/services/anti-age-detail-2.jpg'
    },
    {
      source: 'assets/images/9316ba960332b67faf87783cbc7791e3.jpg',
      target: 'images/services/slimming.jpg'
    },
    {
      source: 'assets/images/3eeb495160f952d10b6148090137a173.jpg',
      target: 'images/services/slimming-detail-1.jpg'
    },
    {
      source: 'assets/images/01d901ac9c6df5f42fb4a2fc53cbc74a.png',
      target: 'images/services/slimming-detail-2.jpg'
    },
    {
      source: 'assets/images/67fabcf71a02ec04f8e1a1227d681c70.jpg',
      target: 'images/services/default.jpg'
    },
    {
      source: 'assets/images/1f50ab6b1e21df8c97df156a337536b1.jpg',
      target: 'images/blog/clinique-cryolipolyse.jpg'
    },
    {
      source: 'assets/images/3ce458c1f8bee882617e916bbdd2f2d6.jpg',
      target: 'images/blog/meilleures-methodes.jpg'
    },
    {
      source: 'assets/images/78894598f0f7933420b1706b30a77fa0.png',
      target: 'images/blog/prendre-controle.png'
    },
    {
      source: 'assets/images/233359d97bcb238076d75b1535ddbfe2.jpg',
      target: 'images/blog/trouver-bonheur.jpg'
    }
  ];

  for (const item of imageMap) {
    const sourcePath = path.join(exportRoot, item.source);
    const targetPath = path.join(projectRoot, 'public', item.target);
    ensureDir(path.dirname(targetPath));

    if (!existsSync(sourcePath)) {
      logger.warn(`Missing curated image in export: ${item.source}`);
      continue;
    }

    copyFileSync(sourcePath, targetPath);
  }
}

function main(): void {
  const projectRoot = process.cwd();
  const parsed = parseOldExport(projectRoot);

  const routeMap = buildRouteMap(parsed.sitemapPaths, parsed.manifest.pages || []);
  const seeded = seedContent({ routeMap, pages: parsed.manifest.pages || [] });

  ensureDir(path.join(projectRoot, 'src', 'lib', 'routing'));
  ensureDir(path.join(projectRoot, 'src', 'content'));

  writeJson(path.join(projectRoot, 'src', 'lib', 'routing', 'routeMap.json'), routeMap);
  writeJson(path.join(projectRoot, 'src', 'lib', 'routing', 'redirects.json'), []);
  writeJson(path.join(projectRoot, 'src', 'content', 'site-settings.json'), seeded.siteSettings);
  writeJson(path.join(projectRoot, 'src', 'content', 'services.json'), seeded.services);
  writeJson(path.join(projectRoot, 'src', 'content', 'pages.json'), seeded.pageContent);
  writeBlogPosts(projectRoot, seeded.blogPosts);
  syncCuratedImages(projectRoot, parsed.exportRoot);

  logger.info(`Import complete from: ${parsed.exportRoot}`);
  logger.info(`Route map entries: ${routeMap.length}`);
  logger.info(`Services seeded: ${(seeded.services.services as unknown[]).length}`);
  logger.info(`Blog posts seeded: ${seeded.blogPosts.length}`);
  logger.info('Curated image assets synced to /public/images');
}

main();
