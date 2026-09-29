// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pistolkors.com',
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
    '/resume': '/#about',
    '/case-studies': '/#work',
    '/case-studies/5-legal-fans': '/work/legalfans/',
    '/case-studies/4-link-hms': '/work/linkhms/',
    '/case-studies/6-bbq-ua': '/work/bbq-ua/',
    '/case-studies/3-cci': '/work/carolina-carports/',
    '/case-studies/2-datanomika': '/work/datanomika/',
    '/case-studies/1-coth': '/work/digital-church/',
  },
});
