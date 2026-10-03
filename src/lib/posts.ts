import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, type Locale, type Tag } from '../i18n/ui';
export type Post = CollectionEntry<'blog'>;
const launchKeys = ['starting-the-project', 'reconstructing-from-drawings', 'combustor-and-fuel-routing'];
async function validatedPosts() {
  const posts = await getCollection('blog');
  const seen = new Set<string>();
  for (const post of posts) {
    const key = `${post.data.locale}/${post.data.translationKey}`;
    if (seen.has(key)) throw new Error(`Duplicate article: ${key}`);
    seen.add(key);
    if (!post.id.startsWith(`${post.data.locale}/`)) throw new Error(`Article locale must match its directory: ${post.id}`);
  }
  for (const key of launchKeys) for (const locale of locales) {
    if (!posts.some((p) => p.data.translationKey === key && p.data.locale === locale && p.data.status !== 'draft')) {
      throw new Error(`Missing public launch translation: ${locale}/${key}`);
    }
  }
  return posts;
}
export async function publicPosts(locale: Locale): Promise<Post[]> {
  return (await validatedPosts()).filter((p) => p.data.locale === locale && p.data.status !== 'draft')
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.data.translationKey.localeCompare(b.data.translationKey));
}
export async function publicCounterpart(post: Post) {
  const locale = post.data.locale === 'en' ? 'zh' : 'en';
  return (await publicPosts(locale)).find((p) => p.data.translationKey === post.data.translationKey);
}
export function populatedTags(posts: Post[]): Tag[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))];
}
