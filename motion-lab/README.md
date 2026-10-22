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
