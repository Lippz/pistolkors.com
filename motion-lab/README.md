# Motion lab

Sandbox for product UI loops for the case pages and the home page Motion lab. It's outside
`src/` and `public/`, so the site build never sees it. Only the exported videos go live.

## How an animation works

Each animation is one page, `motion-lab/<name>/index.html`, on a stage the size of the Figma
frame (usually 1920×1080). Everything on it is a **pure function of time**: `render(t)` sets
every style that can change. That's why the scrubber, `?t=4.2` and the frame export always
show the same thing.

- `_lib/motion.js`: easing (`p`, `mix`, `io`, `outC`, `outQ`, `outBack`, `bump`) and
  `cursorPath(start, moves)` for a hand-like cursor.
- `_lib/player.js` + `player.css`: fits the stage to the window and adds the control bar.
- `export.mjs`: renders every frame with `renderAt(t)` and encodes mp4 + poster.
- `_template/`: a starter page.
- `linkhms-new-visit/`: the first full example (schedule → New Visit form → confirmed visit).
- `linkhms-clinic-signup/`: Clinic Registration form → Complete Your Clinic Set Up (progress to 40%).
- `linkhms-live-queue/`: Schedule → Live Queue (walk-ins, a separate queue), one visit completed and
  the next started, back to the unchanged schedule. `?figma` lays the queue out with the Figma sample data for D.
- `linkhms-medical-record/`: Summary → History → Administration Chart → Vaccinations (an overdue
  dose given from the cell menu) → Summary, through the record's section menu. One patient, a
  5-month-old, so the data agrees across the four screens.
- `linkhms-patient-photo/`: Records history → the photo placeholder next to the name opens the photo
  dialog: a wrong file format (error), the photo, Save (success), close, the photo next to the name.
- `linkhms-reports/`: Reports · Finance Overview, a 1920×3068 page scrolled inside the 1080 stage (header and
  main menu stay). Hover across KPIs and charts, scroll to Attention Needed, INV-1188 opens Edit Invoice
  (Figma 180:40861, its items add up to the row's Net Total), then Reports in the main menu brings the page
  back at the top. Each click cuts to a skeleton of the next screen (SK seconds) before it fades in. `?figma&s=870` shows every Figma hover state at that scroll for D.
- `linkhms-patient-portal/`: Patient portal, five screens (Figma 151:11645 and the four next to it). Home → My Tests
  (rows, the BMP's View) → the result (a short look at the flagged glucose) → the logo → Home → Book an Appointment (doctor
  dropdown, Tue 18, 14:00, the summary opens) → request received (the check draws itself) → Back to Home. Skeletons
  are built from the real layout of the next screen; hover is one registry, `HOV`, measured once from the DOM.

- `linkhms-brand/`: brand and design system, 2900×2550 like the Figma frames (KK, page pp, frames "1"…"8" from 185:43920).
  The mark draws itself, fills, the blue floods out and shrinks into the app icon, the wordmarks and the light card
  arrive, then the camera tilts 5° onto the grid of cards and each card's content lands piece by piece. The cards are
  Figma exports (`assets/card-*.png`, composited on navy) cut into pieces by `assets/pieces.js`: blobs found in the
  export, by hand for tabs and headers. Holds 3 s, fades to navy.

- `linkhms-flow/`: user flow, 2240×1260 like the Figma frames (KK, page pp, frames "1"…"6" from 153:27813). The four steps
  (Schedule → Patients → EMR → Records) appear and drop to the bottom; each step's wireframe is sketched in pencil, shaded in
  with a scribble mask, and the lit step passes along the arrow; then the steps rise into their places in the long flow,
  which grows out of them connector by connector. The long flow is the Figma SVG export (`assets/flow-long.svg`, one group
  per node) plus connector centerlines (`tools/connectors.txt`), built into `assets/flow.js` by `tools/build-flow.py`.
  `tools/frames.mjs <dir> 4.5 …` saves full-size stills for review.

## Workflow

1. Copy `_template` to `motion-lab/<name>/`.
2. Pull the frames from Figma: screenshots go into `<name>/src/` (they're the references),
   and icons or cleaned backgrounds into `<name>/assets/`. Build the moving UI in HTML from
   the Figma tokens (`get_design_context`), not from pictures, so it can type, open and resize.
3. Preview: `.claude/launch.json` → `motion-lab`, or `npm run serve` in this folder, then open
   `http://localhost:4500/<name>/`.
4. Iterate:
   - **Space** play/pause · **← / →** 0.1 s (**Shift** 1 s) · click a marker to jump to it
   - **R** cycles the Figma references over the stage · **D** shows them as a difference,
     so anything off by a pixel lights up
   - `?t=4.2` opens paused at a moment · `?clean` hides the bar
   - Beats live in one `T` object with names, so timing changes are one-liners.
5. Export (run from the repo root):

   ```bash
   node motion-lab/export.mjs <name>
   ```

   This writes `public/motion/<name>.mp4` (H.264, 30 fps, seamless loop) and `<name>.jpg`
   (the frame at the player's `poster` time). Options: `--fps 60`, `--crf 18`,
   `--poster 11.2`, `--out public/motion`. It needs `ffmpeg` and a Playwright Chromium; the
   script falls back to any Chromium already in `~/Library/Caches/ms-playwright`.
   Run `npm install` here once.

## Putting a loop on the site

- **Case page, under Results**: add to the case's frontmatter

  ```yaml
  motion:
    video: /motion/<name>.mp4
    poster: /motion/<name>.jpg
    alt: What happens in the loop, in one sentence
    caption: Short eyebrow line under it
  ```

  It plays while half of it is in view, opens full screen on click, and stays on the poster
  when the visitor prefers reduced motion.
- **Case page, in the text** (e.g. instead of a carousel): put this in the Markdown. The path is
  relative so it works under the GitHub Pages base path too; it plays and opens the same way.

  ```html
  <figure class="case-motion" data-lightbox-group>
  <video src="../../motion/<name>.mp4" poster="../../motion/<name>.jpg" width="1920" height="1080" muted loop playsinline preload="metadata" aria-label="…" data-label="…"></video>
  <figcaption class="eyebrow">Short eyebrow line</figcaption>
  </figure>
  ```
- **Home page Motion lab**: add a tile to `motion` in `src/data/site.ts`.

## Habits that paid off

- Match Figma first, then animate: check every key frame with **D** against its reference.
- Keep data consistent across the story (the slot clicked = the doctor and time in the form,
  the phone in the form = the phone on the booked visit).
- Hover follows the cursor: derive it from `cursorAt(t)` sampled over the last ~0.14 s, not
  from fixed times, so it stays right when you change the path.
- `clip-path` reveals cut shadows; give the clip negative insets.
- Keep `poster: 0`. The page shows the poster until the loop starts at frame 0, so any other
  frame reads as a jump; the reduced-motion view sees the first frame too.
