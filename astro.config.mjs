// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// In CI these come from actions/configure-pages, so the build matches wherever
// GitHub Pages serves the site: "https://pistolkors.com" + "" once the custom
// domain is attached, "https://lippz.github.io" + "/pistolkors.com" before that.
const site = process.env.PAGES_ORIGIN || 'https://pistolkors.com';
const base = process.env.PAGES_BASE_PATH || '/';
/** @param {string} path */
const to = (path) => `${base.replace(/\/$/, '')}${path}`;

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  image: {
    // Every <Image> and every Markdown image gets srcset + sizes.
    layout: 'constrained',
    responsiveStyles: true,
    breakpoints: [480, 768, 1024, 1280, 1600, 2048, 2400],
  },
  // Keep links to the old Framer URLs working.
  redirects: {
    '/resume': to('/#about'),
    '/case-studies': to('/#work'),
    '/case-studies/5-legal-fans': to('/work/legalfans/'),
    '/case-studies/4-link-hms': to('/work/linkhms/'),
    '/case-studies/6-bbq-ua': to('/work/bbq-ua/'),
    '/case-studies/3-cci': to('/work/carolina-carports/'),
    '/case-studies/2-datanomika': to('/work/datanomika/'),
    '/case-studies/1-coth': to('/work/digital-church/'),
  },
});
