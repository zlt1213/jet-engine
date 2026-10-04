import { readdir, readFile, access } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { parse } from 'parse5';
import matter from 'gray-matter';
import config from '../astro.config.mjs';

const root = resolve('dist');
const origin = new URL(config.site).origin;
const base = `/${config.base.replace(/^\/+|\/+$/g, '')}`;
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const urlFor = (locale, path = '') => `${origin}${base}/${locale === 'zh' ? 'zh/' : ''}${path}`;
async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path)); else result.push(path);
  }
  return result;
}
function nodes(node, output = []) {
  if (node.tagName) output.push(node);
  for (const child of node.childNodes ?? []) nodes(child, output);
  return output;
}
const attr = (node, name) => node?.attrs?.find((a) => a.name === name)?.value;
const documents = new Map();
const files = await walk(root);
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const path = relative(root, file).split(sep).join('/');
  const route = path === 'index.html' ? '' : path.replace(/index\.html$/, '');
  const html = await readFile(file, 'utf8');
  documents.set(urlFor('en', route), { file, html, nodes: nodes(parse(html)) });
}

function localFile(url) {
  if (url.origin !== origin) return undefined;
  check(url.pathname === base || url.pathname.startsWith(`${base}/`), `URL escapes project base: ${url.href}`);
  if (!(url.pathname === base || url.pathname.startsWith(`${base}/`))) return undefined;
  let path = decodeURIComponent(url.pathname.slice(base.length)).replace(/^\//, '');
  if (!path || path.endsWith('/')) path += 'index.html';
  const file = resolve(root, path);
  check(file.startsWith(`${root}${sep}`), `URL escapes build directory: ${url.href}`);
  return file;
}

for (const [url, doc] of documents) {
  const isChinese = new URL(url).pathname.startsWith(`${base}/zh/`);
  check(attr(doc.nodes.find((n) => n.tagName === 'html'), 'lang') === (isChinese ? 'zh-Hans' : 'en'), `Wrong document language: ${url}`);
  check(doc.nodes.filter((n) => n.tagName === 'h1').length === 1, `Expected one h1: ${url}`);
  const canonical = doc.nodes.find((n) => n.tagName === 'link' && attr(n, 'rel') === 'canonical');
  check(attr(canonical, 'href') === url, `Wrong canonical: ${url} -> ${attr(canonical, 'href')}`);
  const ids = new Set(doc.nodes.map((n) => attr(n, 'id')).filter(Boolean));
  for (const node of doc.nodes) {
    const references = [];
    if (['a', 'link'].includes(node.tagName) && attr(node, 'href')) references.push(attr(node, 'href'));
    if (['img', 'script', 'source'].includes(node.tagName) && attr(node, 'src')) references.push(attr(node, 'src'));
    if (attr(node, 'srcset')) references.push(...attr(node, 'srcset').split(',').map((part) => part.trim().split(/\s+/)[0]));
    for (const reference of references) {
      if (/^(data:|mailto:|tel:)/.test(reference)) continue;
      const target = new URL(reference, url);
      const file = localFile(target);
      if (!file) continue;
      try { await access(file); } catch { check(false, `Missing link/asset: ${url} -> ${target.href}`); }
      if (target.hash && file === doc.file) check(ids.has(decodeURIComponent(target.hash.slice(1))), `Missing anchor: ${target.href}`);
    }
    if (node.tagName === 'img') {
      check(attr(node, 'alt') !== undefined, `Image has no alt attribute: ${url}`);
      check(Boolean(attr(node, 'width')) && Boolean(attr(node, 'height')), `Image lacks dimensions: ${url}`);
    }
  }
}

const contentFiles = (await walk(resolve('src/content/blog'))).filter((f) => f.endsWith('.md'));
const posts = contentFiles.map((file) => ({ file, ...matter.read(file).data }));
const launch = ['starting-the-project', 'reconstructing-from-drawings', 'combustor-and-fuel-routing', 'kj66-pros-and-cons'];
const sitemapFile = files.find((file) => file.endsWith('sitemap-0.xml'));
const sitemap = sitemapFile ? await readFile(sitemapFile, 'utf8') : '';
check(Boolean(sitemapFile), 'Missing sitemap');

for (const locale of ['en', 'zh']) {
  for (const route of ['', 'build-log/', 'resources/', 'about/']) check(documents.has(urlFor(locale, route)), `Missing page: ${urlFor(locale, route)}`);
  for (const key of launch) check(posts.some((p) => p.locale === locale && p.translationKey === key && (p.status ?? 'draft') !== 'draft'), `Missing public launch translation: ${locale}/${key}`);
  const feedPath = resolve(root, locale === 'zh' ? 'zh/rss.xml' : 'rss.xml');
  const feed = await readFile(feedPath, 'utf8');
  const visible = posts.filter((p) => p.locale === locale && (p.status ?? 'draft') !== 'draft')
    .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate) || a.translationKey.localeCompare(b.translationKey));
  const archive = documents.get(urlFor(locale, 'build-log/'));
  const cards = archive?.nodes.filter((n) => attr(n, 'data-post-key')) ?? [];
  check(cards.map((n) => attr(n, 'data-post-key')).join(',') === visible.map((p) => p.translationKey).join(','), `Incorrect post order in ${locale} archive`);
  const home = documents.get(urlFor(locale));
  const homeCards = home?.nodes.filter((n) => attr(n, 'data-post-key')) ?? [];
  check(homeCards.map((n) => attr(n, 'data-post-key')).join(',') === visible.slice(0, 3).map((p) => p.translationKey).join(','), `Incorrect latest posts in ${locale} homepage`);
  const starter = home?.nodes.find((n) => attr(n, 'data-start-here') !== undefined);
  check(attr(starter, 'href') === new URL(urlFor(locale, 'build-log/starting-the-project/')).pathname, `Incorrect Start here link for ${locale}`);
  for (const post of posts.filter((p) => p.locale === locale)) {
    const url = urlFor(locale, `build-log/${post.translationKey}/`);
    const doc = documents.get(url);
    if ((post.status ?? 'draft') === 'draft') {
      check(!doc, `Draft has a public page: ${url}`);
      check(!feed.includes(url), `Draft appears in RSS: ${url}`);
      check(!sitemap.includes(url), `Draft appears in sitemap: ${url}`);
      check(!cards.some((n) => attr(n, 'data-post-key') === post.translationKey), `Draft appears in archive: ${url}`);
      continue;
    }
    check(Boolean(doc), `Missing article: ${url}`);
    if (!doc) continue;
    check(feed.includes(url), `Public article missing from RSS: ${url}`);
    check(sitemap.includes(url), `Public article missing from sitemap: ${url}`);
    const notice = doc.nodes.some((n) => attr(n, 'data-preview-notice') !== undefined);
    check(notice === (post.status === 'editorial-preview'), `Preview notice does not match status: ${url}`);
    const card = cards.find((n) => attr(n, 'data-post-key') === post.translationKey);
    check(Boolean(card) && nodes(card).some((n) => attr(n, 'data-preview-label') !== undefined) === (post.status === 'editorial-preview'), `Listing preview label does not match status: ${url}`);
    const counterpart = posts.find((p) => p.translationKey === post.translationKey && p.locale !== locale && (p.status ?? 'draft') !== 'draft');
    const switchNode = doc.nodes.find((n) => attr(n, 'data-language-switch') !== undefined);
    check(Boolean(switchNode) === Boolean(counterpart), `Wrong counterpart availability: ${url}`);
    if (counterpart) check(attr(switchNode, 'href') === new URL(urlFor(counterpart.locale, `build-log/${post.translationKey}/`)).pathname, `Language switch changes article: ${url}`);
  }
}
check(!sitemap.includes('/404.html'), '404 should not appear in sitemap');
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Verified ${documents.size} HTML pages: local links/assets, languages, canonicals, publication statuses, post ordering, RSS, and sitemap.`);
