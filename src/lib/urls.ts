import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Locale } from '../i18n/ui';
import { site } from '../data/site';
export function pageUrl(locale: Locale, path = '') {
  const url = getRelativeLocaleUrl(locale, path.replace(/^\/+|\/+$/g, ''));
  return /\.[a-z]+$/i.test(path) ? url.replace(/\/$/, '') : `${url.replace(/\/$/, '')}/`;
}
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
export function absoluteUrl(locale: Locale, path = '') {
  return new URL(pageUrl(locale, path), site.origin).href;
}
