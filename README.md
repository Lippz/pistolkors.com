# pistolkors.com

Portfolio of Pylyp Pistolkors, Senior Product Designer. Static site built with [Astro](https://astro.build), hosted on GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into dist/
npm run preview  # serve dist/ locally
```

## Deploy

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`.

One-time setup on GitHub:

1. Create a repository and push this folder to `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. **Settings → Pages → Custom domain:** `pistolkors.com`, then tick **Enforce HTTPS** once the certificate is issued.

DNS at your domain registrar (remove the old Framer records first):

| Type  | Name | Value                      |
| ----- | ---- | -------------------------- |
| A     | @    | 185.199.108.153            |
| A     | @    | 185.199.109.153            |
| A     | @    | 185.199.110.153            |
| A     | @    | 185.199.111.153            |
| CNAME | www  | `<your-github-username>.github.io` |

`public/CNAME` already contains the domain. Old Framer URLs (`/case-studies/…`, `/resume`) redirect to the new pages.

## Content

| What                          | Where                            |
| ----------------------------- | -------------------------------- |
| Case studies                  | `src/content/cases/*.md`         |
| Case images                   | `src/assets/cases/<case>/`       |
| Contacts, facts, experience   | `src/data/site.ts`               |
| Motion lab tiles              | `motion` in `src/data/site.ts`   |
| CV                            | `public/pylyp-pistolkors-cv.pdf` |
| Colours, type, spacing        | `src/styles/global.css` (`:root`; dark theme in the two blocks below it — keep them identical) |

### Add a case study

Copy an existing file in `src/content/cases/`. The frontmatter is validated by `src/content.config.ts`, so a missing field fails the build with a clear message.

- `format: story` — a written case. Use the heading convention below.
- `format: slides` — a short written intro plus presentation slides listed in `slides:`.
- `featured: true` — shown as a large row on the home page.
- `order` — position on the home page and in “Next case”.
- `hover` — optional second frame the home-page card fades to on hover.

Heading convention inside a story:

```md
## Problem                       <- section label "01 — Problem", appears in the table of contents
### Creators were fighting …     <- big section title
#### AI finds, a human confirms  <- key decision, numbered automatically
```

Also available: `<div class="cards">`, `<ol class="flow">`, `<ol class="rows">` and `<div class="pair">` (two images side by side). An italic-only line right after an image becomes its caption.

Images are resized and served as responsive WebP automatically. Keep sources at 2400 px wide or less.

Every image in a case opens in the image viewer (`src/components/Lightbox.astro`) on click: ←/→ and swipe step through the case's images, click toggles fit / 100%, Esc or Back closes. An italic-only line right after an image is shown as its caption; slides use their figcaption. Nothing to configure.

### Motion lab

Put a short muted loop (MP4, under ~3 MB) and a poster frame in `public/motion/`, then set `video` and `poster` on a tile in `src/data/site.ts`. Tiles without a video only show in `npm run dev`; the section and its menu link stay hidden on the live site until at least one tile has a video.
