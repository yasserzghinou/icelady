export function pathToSlug(path: string): string {
  return path
    .split('/')
    .filter(Boolean)
    .pop()
    ?.toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-_]+|[-_]+$/g, '') ||
    'page';
}

export function cleanTitle(rawTitle: string | undefined): string {
  if (!rawTitle) {
    return 'Ice Lady Marrakech';
  }

  return rawTitle
    .replace(/\s*[-|–]+\s*Ice Lady Marrakech\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}
