/**
 * Prefix a root-relative path with the site's base path, so links work both on
 * the custom domain (base "/") and on a GitHub Pages project URL
 * (base "/pistolkors.com"). Pass paths starting with "/".
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
