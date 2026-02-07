export function normalizePath(input: string): string {
  if (!input) {
    return '/';
  }

  let path = input.trim();
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  path = path.replace(/\/+/g, '/');

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  return path || '/';
}

export function joinUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return new URL(normalizedPath, normalizedBase).toString();
}

export function replaceFirstSegment(pathname: string, nextSegment: string): string {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) {
    return `/${nextSegment}`;
  }

  parts[0] = nextSegment;
  return `/${parts.join('/')}`;
}
