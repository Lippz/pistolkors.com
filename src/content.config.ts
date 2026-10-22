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
      /** Hidden cases get no page and are left out of the home page and "next case" links. */
      hidden: z.boolean().default(false),
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
      role: z.string(),
      timeline: z.string(),
      company: z.string(),
      team: z.string().optional(),
      platforms: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** "My part": what I did myself, one short line each, shown under the facts. */
      part: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      /**
       * Optional layers for a livelier cover on the home page: a blurred background and a
       * vector logo that move against each other on hover. `cover` stays the static composite
       * (social image). `logoWidth` is the logo's share of the cover width, in %.
       * `themed` makes the cover follow the site theme: the background gets a translucent white
       * veil and the logo turns black in the light theme, a black veil and a white logo in the
       * dark one. Give it a raw background then, with no darkening or lightening baked in.
       * `veilLight` is the opacity of the white veil; raise it for a background that is very dark.
       */
      coverLayers: z
        .object({
          background: image(),
          logo: image(),
          logoWidth: z.number().default(50),
          themed: z.boolean().default(false),
          veilLight: z.number().min(0).max(1).default(0.7),
        })
        .optional(),
      /** Headline numbers shown above the cover (results or research). */
      stats: z
        .object({
          label: z.string(),
          items: z.array(z.object({ value: z.string(), label: z.string() })),
        })
        .optional(),
      /**
       * A product loop shown right under the results: a video exported from motion-lab
       * (`node motion-lab/export.mjs <name>` writes /motion/<name>.mp4 and .jpg into public/).
       * It plays while in view, opens full screen on click, and stays on the poster for
       * people who prefer reduced motion.
       */
      motion: z
        .object({
          video: z.string(),
          poster: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
      /** "story": written case with sections. "slides": intro + presentation slides. */
      format: z.enum(['story', 'slides']).default('story'),
      slides: z.array(z.object({ src: image(), alt: z.string() })).default([]),
    }),
});

export const collections = { cases };
