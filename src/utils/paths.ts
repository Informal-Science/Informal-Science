const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/') {
  if (/^(?:https?:|mailto:|tel:|#)/.test(path)) return path;

  const normalized = path.startsWith('/') ? path : `/${path}`;
  const [pathname, suffix = ''] = normalized.split(/(?=[?#])/);
  const isAsset = /\/[^/]+\.[a-z0-9]+$/i.test(pathname);

  if (pathname === '/' || isAsset) return `${base}${pathname}${suffix}`;
  return `${base}${pathname.replace(/\/+$/, '')}/${suffix}`;
}

export function assetPath(path: string) {
  return withBase(path);
}
