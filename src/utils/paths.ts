const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/') {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized === '/' ? `${base}/` : `${base}${normalized}`;
}

export function assetPath(path: string) {
  return withBase(path);
}
