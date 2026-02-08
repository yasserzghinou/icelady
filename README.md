# IceLady Premium Redesign (SEO-Preserved)

Premium Next.js redesign for IceLady Marrakech, rebuilt from the exported crawl package while preserving the old sitemap URL structure.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX blog content
- Vitest
- ESLint + Prettier

## Locales

- Default locale: `fr` (French)
- Secondary locales: `en` (English), `ar` (Arabic, RTL)
- Language selector is integrated in the top navigation.
- Legacy SEO URLs under `/en/...` are still fully served and preserved.

## Project Layout

- `src/app/(marketing)/en/...`: preserved SEO routes from the old sitemap
- `src/app/(marketing)/[...slug]/page.tsx`: generic renderer for extra preserved routes
- `src/content/site-settings.json`: global business/site data
- `src/content/services.json`: service catalogue data
- `src/content/pages.json`: generic/extra preserved pages
- `src/content/blog/*.mdx`: blog posts (generated from old sitemap posts)
- `src/lib/routing/routeMap.json`: generated preserved route map (committed)
- `scripts/import-islady-old.ts`: importer that builds route map + seed content
- `scripts/verify-seo-parity.ts`: parity/coverage gate
- `public/images/...`: curated media copied from old export by the importer
- `src/content/translations.json`: translated UI and page copy (fr/en/ar)
- `tests/seoParity.test.ts`: fails if old sitemap URL is missing

## Required Input Export

Importer auto-detects a folder at repo root containing:

- `sitemap.xml`
- `site-manifest.json`

It supports these common names:

- `IceLady old website`
- `Icelady Old Page`
- `icelady old website`

## Run Instructions

1. Install dependencies:

```bash
npm install
```

2. Generate route map + content from old export:

```bash
npm run import:islady
```

This also syncs curated visual assets from the old export into `public/images`.

3. Start dev server:

```bash
npm run dev
```

4. Run tests:

```bash
npm test
```

5. Build production app:

```bash
npm run build
```

## Admin Dashboard

- URL: `/admin` (not linked publicly, blocked from robots indexing)
- Login is server-side only with:
  - hashed password verification (scrypt)
  - signed `HttpOnly` admin session cookie
  - login rate limiting
  - origin checks on admin mutations

### What can be managed

- Business profile + maps:
  - site name, description, phone/WhatsApp/email
  - address, Google Maps profile URL, embed URL, opening hours
- Treatment catalog:
  - title, category, tagline, summary
  - hero image + gallery images
  - duration, pricing note, featured flag
  - SEO title + description
- Forms:
  - recipient email for incoming lead forms
  - sender identity for email forwarding
  - basic analytics and recent submissions list

### Email delivery

- Form submissions are always stored for analytics in `data/lead-submissions.json`.
- To forward submissions by email, set `RESEND_API_KEY`.
- Email settings are managed from `/admin`.

### Security hardening in production

- Set a strong `ADMIN_SESSION_SECRET`.
- Replace `ADMIN_PASSWORD_SALT` and `ADMIN_PASSWORD_HASH` with your own hash pair.
- You can generate a fresh hash pair with:
  - `npm run admin:hash -- \"<new-password>\"`
- Never commit real credentials or plaintext admin passwords to git.

## SEO Preservation Strategy

1. Old sitemap paths are parsed and normalized from the export.
2. `src/lib/routing/routeMap.json` is generated with every old path.
3. All old paths are served by either:
   - dedicated locale routes (`/[locale]`, `/[locale]/collections/all`, `/[locale]/products/[slug]`, `/[locale]/blogs/news`, `/[locale]/blogs/news/[slug]`, `/[locale]/pages/contact`), or
   - generic fallback route (`/en/cart`, `/en/search`, and extra `/en/pages/*` preserved URLs).
4. Canonicals are generated with `https://islady.ma` + the same path.
5. `src/app/sitemap.ts` generates sitemap entries from `routeMap.json`.
6. `scripts/verify-seo-parity.ts` and `tests/seoParity.test.ts` fail if any old sitemap path is missing.

## Metadata & Structured Data

- Per-page metadata built via `src/lib/seo/meta.ts`
- Canonical and OG metadata added on all major pages
- Global LocalBusiness schema via `src/lib/seo/schema.ts`
- BlogPosting schema for MDX blog detail pages

## Content Editing Guide

- Update clinic/contact/settings: `src/content/site-settings.json`
- Update services catalog + detail copy: `src/content/services.json`
- Update extra preserved pages: `src/content/pages.json`
- Update blog posts: `src/content/blog/*.mdx`

If a generated record has `needsCopy: true`, it is a placeholder and should be replaced with approved final copy.

## Notes

- No online payment flow is implemented.
- Analytics is optional via `.env`:
  - `NEXT_PUBLIC_SITE_URL` (default: `https://islady.ma`)
  - `NEXT_PUBLIC_GA_ID` (optional)
- Additional marketing shortcuts are available (`/services`, `/blog`, `/contact`, `/about`) and redirect to preserved `/en/...` URLs.
