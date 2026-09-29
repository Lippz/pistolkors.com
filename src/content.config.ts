import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      /** Position on the home page and in "next case" order. */
      order: z.number(),
      /** Featured cases get the large row layout on the home page. */
      featured: z.boolean().default(false),
      client: z.string(),
      /** Outcome-style title: what was done and for whom. */
      title: z.string(),
      /** Word(s) at the end of the title set in the italic serif accent. */
      accent: z.string().optional(),
      /** One or two sentences for the home page card. */
      summary: z.string(),
      /** Opening paragraph on the case page. */
      lead: z.string(),
      industry: z.string(),
      year: z.string(),
      role: z.string(),
      timeline: z.string(),
      company: z.string(),
      team: z.string().optional(),
      platforms: z.string().optional(),
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      /** Headline numbers shown above the cover (results or research). */
      stats: z
        .object({
          label: z.string(),
          items: z.array(z.object({ value: z.string(), label: z.string() })),
        })
        .optional(),
      /** "story": written case with sections. "slides": intro + presentation slides. */
      format: z.enum(['story', 'slides']).default('story'),
      slides: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

export const collections = { cases };
