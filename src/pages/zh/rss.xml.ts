import rss from '@astrojs/rss';
import { publicPosts } from '../../lib/posts';
import { ui } from '../../i18n/ui';
import { absoluteUrl } from '../../lib/urls';
export async function GET() {
  return rss({
    title: ui.zh.name, description: ui.zh.logDescription, site: absoluteUrl('zh'),
    items: (await publicPosts('zh')).map((post) => ({
      title: post.data.title, description: post.data.description, pubDate: post.data.pubDate,
      link: absoluteUrl('zh', `build-log/${post.data.translationKey}`),
    })), customData: '<language>zh-CN</language>', trailingSlash: false,
  });
}
