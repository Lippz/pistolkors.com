import { url } from '../lib/url';
import { PRODUCT_SINCE, yearsSince, inWords } from '../lib/years';

export const site = {
  name: 'Pylyp Pistolkors',
  role: 'Senior Product Designer',
  location: 'Poznań, PL · Remote',
  description: `Senior Product Designer with ${inWords(yearsSince(PRODUCT_SINCE))} years in product design, coming from motion design: healthcare, legal-tech, e-commerce and construction.`,
  availability: 'Open to senior product design roles — Remote / Poznań, PL',
  email: 'ppistolkors@gmail.com',
  cv: url('/CV-Pylyp_Pistolkors-Senior_Product_Designer.pdf'),
  /** Practical details recruiters ask first. */
  details: [
    { label: 'English', value: 'Professional working proficiency', short: 'Professional English' },
    { label: 'Time zone', value: 'Warsaw (CET/CEST)', short: 'Warsaw time' },
    { label: 'Work authorisation', value: 'EU, no sponsorship needed', short: 'EU work authorisation' },
    { label: 'Contract', value: 'B2B or employment contract', short: 'B2B or employment' },
  ],
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
  { since: PRODUCT_SINCE, unit: 'yrs', label: 'in product design, since 2017' },
  { value: '+23%', label: 'BBQ.ua conversion rate, 1.7% → 2.1% year over year' },
  { value: '30+ clinics', label: 'run on LinkHMS, a hospital system I designed' },
];

export const experience = [
  {
    role: 'Senior Product Designer — Existek',
    detail: 'LinkHMS, our own product; client discovery, mentoring mid-level designers, internal brand',
    period: '2020 — now',
  },
  {
    role: 'Freelance Product Designer — PYP International',
    detail: 'BBQ.ua e-commerce redesign, alongside Existek',
    period: '2024 — 2025',
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

/**
 * Motion lab tiles. Put files in /public/motion/ and set `video` (mp4/webm loop)
 * and `poster` (first frame). Tiles without a video only show in `npm run dev`;
 * the whole section stays hidden on the live site until at least one has one.
 */
export const motion: { title: string; kind: string; video?: string; poster?: string }[] = [
  {
    title: 'LinkHMS schedule: book and confirm a visit',
    kind: 'Product · Healthcare',
    video: '/motion/linkhms-schedule.mp4',
    poster: '/motion/linkhms-schedule.jpg',
  },
  {
    title: 'LinkHMS finance overview: charts that answer',
    kind: 'Product · Healthcare',
    video: '/motion/linkhms-finance.mp4',
    poster: '/motion/linkhms-finance.jpg',
  },
  {
    title: 'LinkHMS patient photo: upload, error, save',
    kind: 'Product · Healthcare',
    video: '/motion/linkhms-photo.mp4',
    poster: '/motion/linkhms-photo.jpg',
  },
  {
    title: 'BBQ.ua add to cart: price, buy, mini cart',
    kind: 'Product · E-commerce',
    video: '/motion/bbq-cart.mp4',
    poster: '/motion/bbq-cart.jpg',
  },
];

/**
 * "How I work" block on the home page: one card per discipline. `proof` links
 * to the case (or section) where the discipline shows best.
 */
export const capabilities: {
  title: string;
  text: string;
  deliverables: string[];
  proof: { label: string; href: string };
}[] = [
  {
    title: 'Discovery & research',
    text: 'I start with the people who will use the product, not with screens.',
    deliverables: ['Research summary', 'Personas', 'User flows', 'Wireframes'],
    proof: { label: 'LinkHMS', href: '/work/linkhms/' },
  },
  {
    title: 'Product UI & systems',
    text: 'Complex, multi-role workflows made clear, on a system that scales.',
    deliverables: ['High-fidelity UI', 'Design system', 'Clickable prototypes', 'Dev-ready Figma'],
    proof: { label: 'LegalFans', href: '/work/legalfans/' },
  },
  {
    title: 'Motion & prototyping',
    text: 'Twenty years of animation, so interactions are shown, not described.',
    deliverables: ['Interaction prototypes', 'Motion loops', 'Coded demos'],
    proof: { label: 'Motion lab', href: '/#lab' },
  },
];

/**
 * "AI in my pipeline" block on the home page: the steps where agents work,
 * then the proof (a case and this site).
 */
export const ai = {
  steps: [
    {
      title: 'Explore',
      text: 'Agents draft layout and flow variants, so I compare more options before committing to one.',
      tools: ['Claude', 'ChatGPT', 'Figma Make'],
    },
    {
      title: 'Prototype',
      text: 'Interactions run in real code, so the team tests how the product behaves, not how it looks.',
      tools: ['Cursor', 'Claude Code', 'Codex'],
    },
    {
      title: 'Design system ↔ code',
      text: 'Through Figma MCP, tokens and components stay in step between Figma and code, and developers stay on the roadmap.',
      tools: ['Figma MCP', 'Claude Code'],
    },
    {
      title: 'Document',
      text: 'Specs, hand-off notes and component docs are drafted by AI and edited by me.',
      tools: ['Claude', 'ChatGPT'],
    },
  ],
  caseStudy: {
    label: 'LinkHMS',
    href: '/work/linkhms/#ai-in-the-process',
    text: 'The densest sections were prototyped in code, and the reworked design system reached the code base through agents, so developers stayed on the roadmap.',
  },
  site: 'Designed by me, built and maintained with Claude Code — from the case layouts to the micro-interactions: a headline that comes apart under the cursor, hover states and carousels that react to every move.',
};
