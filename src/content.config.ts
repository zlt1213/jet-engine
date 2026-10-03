import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(
  (value) => !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
  'Use a real calendar date in YYYY-MM-DD form',
).transform((value) => new Date(`${value}T00:00:00Z`));
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) => z.object({
    translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), locale: z.enum(['en', 'zh']),
    title: z.string().min(1), description: z.string().min(1), pubDate: date, updatedDate: date.optional(),
    tags: z.array(z.enum(['design', 'cad', 'simulation', 'manufacturing', 'testing'])).min(1),
    heroImage: image(), heroAlt: z.string().min(1), heroCaption: z.string().min(1),
    status: z.enum(['draft', 'editorial-preview', 'published']).default('draft'),
  }),
});
export const collections = { blog };
