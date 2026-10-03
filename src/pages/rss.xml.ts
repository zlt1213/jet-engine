import rss from '@astrojs/rss';
import { publicPosts } from '../lib/posts';
import { ui } from '../i18n/ui';
import { absoluteUrl } from '../lib/urls';
export async function GET() {
  return rss({
    title: ui.en.name, description: ui.en.logDescription, site: absoluteUrl('en'),
    items: (await publicPosts('en')).map((post) => ({
      title: post.data.title, description: post.data.description, pubDate: post.data.pubDate,
      link: absoluteUrl('en', `build-log/${post.data.translationKey}`),
    })), customData: '<language>en-GB</language>', trailingSlash: false,
  });
}
