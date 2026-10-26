import { url } from '../lib/url';
import { PRODUCT_SINCE, yearsSince, inWords } from '../lib/years';
import artemOpolskyi from '../assets/site/artem-opolskyi.webp';
import tanyaTritelnitskaya from '../assets/site/tanya-tritelnitskaya.webp';
import lucMallinger from '../assets/site/luc-mallinger.webp';

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
 * Interactions tiles (the section was called Motion lab). Put files in /public/motion/ and set `video` (mp4/webm loop)
 * and `poster` (first frame). Tiles without a video only show in `npm run dev`;
 * the whole section stays hidden on the live site until at least one has one.
 */
export const motion: { title: string; kind: string; video?: string; poster?: string }[] = [
  {
    title: 'LinkHMS schedule: from an empty slot to a confirmed visit',
    kind: 'Product · Healthcare',
    video: '/motion/linkhms-new-visit.mp4',
    poster: '/motion/linkhms-new-visit.jpg',
  },
  {
    title: 'LinkHMS finance overview: reports that point to the problem',
    kind: 'Product · Healthcare',
    video: '/motion/linkhms-reports.mp4',
    poster: '/motion/linkhms-reports.jpg',
  },
  {
    title: 'LinkHMS patient portal: test results and a booking, from the patient’s side',
    kind: 'Product · Healthcare',
    video: '/motion/linkhms-patient-portal.mp4',
    poster: '/motion/linkhms-patient-portal.jpg',
  },
  {
    title: 'LegalFans extension: connect, synchronise, done',
    kind: 'Product · B2B SaaS',
    video: '/motion/legalfans-setup.mp4',
    poster: '/motion/legalfans-setup.jpg',
  },
  {
    title: 'LegalFans uploads: every photo in one place, in or out of search',
    kind: 'Product · B2B SaaS',
    video: '/motion/legalfans-uploads-screen.mp4',
    poster: '/motion/legalfans-uploads-screen.jpg',
  },
];

/**
 * Testimonials on the home page. An entry with `placeholder: true` only shows in
 * `npm run dev`; the whole section stays hidden on the live site until at least one
 * real quote is in. Replace a placeholder with the real words and drop the flag.
 * `photo` is a square image from src/assets/site/, shown as a round avatar.
 */
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  photo?: ImageMetadata;
  proof?: { label: string; href: string };
  placeholder?: boolean;
}[] = [
  {
    quote:
      'I really liked working with Pylyp. He is a very good designer and he notices small details that other people often miss. At the same time, he always thinks about the user and whether the design really makes sense, not only if it looks nice. He is easy to work with, he is open to feedback, and he often came with ideas that were better than what we had before.',
    name: 'Artem Opolskyi',
    role: 'Project Manager, Existek',
    photo: artemOpolskyi,
  },
  {
    quote:
      'We’ve been working with Pylyp for over a year now, and he’s been excellent throughout. He consistently delivers high-quality work with quick turnaround times, has a great understanding of our often complex requirements, and knows when to take the initiative to suggest improvements that make the final result even better.',
    name: 'Luc Mallinger',
    role: 'CEO, SortFlow',
    photo: lucMallinger,
  },
  {
    quote:
      'Working with Pylyp was a real pleasure, and I think we were all lucky to have such a smart, creative and interesting person on the team. I always felt comfortable working with him. I love that he is principled and, at the same time, flexible. I’m truly grateful for the great collaboration and for all our conversations.',
    name: 'Tanya Tritelnitskaya',
    role: 'Front-End Engineer, Existek',
    photo: tanyaTritelnitskaya,
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
    proof: { label: 'Interactions', href: '/#lab' },
  },
];

/**
 * "AI pipeline" block on the home page: the steps where agents work,
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
