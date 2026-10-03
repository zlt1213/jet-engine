import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://zlt1213.github.io', base: '/jet-engine', trailingSlash: 'always', output: 'static',
  i18n: { locales: ['en', 'zh'], defaultLocale: 'en', routing: { prefixDefaultLocale: false } },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/'), i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } } })],
});
