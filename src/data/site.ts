import { url } from '../lib/url';
import { PRODUCT_SINCE, yearsSince, inWords } from '../lib/years';

export const site = {
  name: 'Pylyp Pistolkors',
  role: 'Senior Product Designer',
  location: 'Poznań, PL · Remote',
  description: `Senior Product Designer with over 20 years in visual and motion design and ${inWords(yearsSince(PRODUCT_SINCE))} as a senior product designer: legal-tech, healthcare, e-commerce and marketplaces.`,
  availability: 'Open to senior product design roles — Remote / Poznań, PL',
  email: 'ppistolkors@gmail.com',
  cv: url('/pylyp-pistolkors-cv.pdf'),
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/pistolkors' },
    { label: 'Behance', href: 'https://be.net/pistolkors' },
  ],
};

/**
 * Numbers under the hero. A fact with `since` shows whole years from that
 * date ("YYYY-MM") and updates itself, so it never needs a yearly edit.
 */
export const facts: { value?: string; since?: string; unit?: string; label: string }[] = [
  { value: '20+ yrs', label: 'in design, animation and motion' },
  { since: PRODUCT_SINCE, unit: 'yrs', label: 'in product design, since 2020' },
  { value: '5 industries', label: 'legal-tech, healthcare, e-commerce, construction, crypto' },
  { value: 'Mentor', label: 'leading mid-level designers at Existek' },
];

export const experience = [
  {
    role: 'Senior Product Designer — Existek',
    detail: 'Client discovery, mentoring mid-level designers, internal brand',
    period: '2020 — now',
  },
  {
    role: 'Product Designer — RIA.com',
    detail: 'Auto.RIA, Dom.RIA: prototypes, design system, micro-animations',
    period: '2017 — 2020',
  },
  {
    role: 'Web & Ad Designer, Animation Engineer',
    detail: 'Big Fish Games, 888.com, bwin, Flextronics',
    period: '2005 — 2017',
  },
];

export const earlierWork = [
  {
    period: '2017–20',
    title: 'Auto.RIA & Dom.RIA — web and mobile apps',
    kind: 'Product design · Marketplaces',
    note: 'On request',
  },
  {
    period: '2005–17',
    title: 'Games and ads for Big Fish Games, 888.com, bwin',
    kind: 'Web, ad design · Animation',
    note: 'On request',
  },
];

/**
 * Motion lab tiles. Put files in /public/motion/ and set `video` (mp4/webm loop)
 * and `poster` (first frame). Tiles without a video only show in `npm run dev`;
 * the whole section stays hidden on the live site until at least one has one.
 */
export const motion: { title: string; kind: string; video?: string; poster?: string }[] = [
  { title: 'Micro-interactions for Auto.RIA', kind: 'Product · Marketplace' },
  { title: 'BBQ.ua cart and checkout states', kind: 'Product · E-commerce' },
  { title: 'LegalFans sync onboarding', kind: 'Product · B2B SaaS' },
  { title: 'Game and ad animation, 2005–2017', kind: 'Archive reel' },
];
