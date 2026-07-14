import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Colección de blog: cada post es un .md/.mdx en src/content/blog.
// El generador de la fábrica escribe estos archivos con este frontmatter.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keyword: z.string().optional(),
    cluster: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    productoId: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
