import { url } from '../lib/url';
import { PRODUCT_SINCE, yearsSince, inWords } from '../lib/years';

export const site = {
  name: 'Pylyp Pistolkors',
  role: 'Senior Product Designer',
  location: 'Poznań, PL · Remote',
  description: `Senior Product Designer with over 20 years in visual and motion design and ${inWords(yearsSince(PRODUCT_SINCE))} as a senior product designer: legal-tech, healthcare, e-commerce and marketplaces.`,
  availability: 'Open to senior product design roles — Remote / Poznań, PL',
  email: 'ppistolkors@gmail.com',
  cv: url('/CV-Pylyp_Pistolkors-Senior_Product_Designer.pdf'),
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
  { value: '5 industries', label: 'healthcare, legal-tech, e-commerce, construction, crypto' },
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
  skills: string[];
  deliverables: string[];
  proof: { label: string; href: string };
}[] = [
  {
    title: 'Discovery & research',
    text: 'I start with the people who will use the product, not with screens.',
    skills: [
      'Surveys and user interviews',
      'Competitor analysis',
      'Personas and user journeys',
      'Business analysis with the client',
      'Information architecture',
    ],
    deliverables: ['Research summary', 'Personas', 'User flows', 'Wireframes'],
    proof: { label: 'LinkHMS', href: '/work/linkhms/' },
  },
  {
    title: 'Product UI & systems',
    text: 'Complex, multi-role workflows made clear, on a system that scales.',
    skills: [
      'B2B SaaS, ERP and dashboards',
      'Several user roles in one product',
      'E-commerce and checkout',
      'Design tokens and component libraries',
      'Responsive web and mobile',
    ],
    deliverables: ['High-fidelity UI', 'Design system', 'Clickable prototypes', 'Dev-ready Figma'],
    proof: { label: 'LegalFans', href: '/work/legalfans/' },
  },
  {
    title: 'Motion & prototyping',
    text: 'Twenty years of animation, so interactions are shown, not described.',
    skills: [
      'Micro-interactions',
      'Interactive prototypes',
      'Motion design and animation',
      'Prototypes in code with AI tools',
      'Hand-off with working behaviour',
    ],
    deliverables: ['Interaction prototypes', 'Motion loops', 'Coded demos'],
    proof: { label: 'Motion lab', href: '/#lab' },
  },
];
