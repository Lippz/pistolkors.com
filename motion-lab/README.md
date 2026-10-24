# Motion lab

Sandbox for product UI loops for the case pages and the home page Motion lab. It's outside
`src/` and `public/`, so the site build never sees it. Only the exported videos go live.

## How an animation works

Animations are grouped by project: `motion-lab/<project>/<name>/index.html` (e.g. `linkhms/new-visit/`).
Each is one page on a stage the size of the Figma
frame (usually 1920×1080). Everything on it is a **pure function of time**: `render(t)` sets
every style that can change. That's why the scrubber, `?t=4.2` and the frame export always
show the same thing.

- `_lib/motion.js`: easing (`p`, `mix`, `io`, `outC`, `outQ`, `outBack`, `bump`) and
  `cursorPath(start, moves)` for a hand-like cursor.
- `_lib/cursor-hand.png`: the shared cursor.
- `_lib/player.js` + `player.css`: fits the stage to the window and adds the control bar.
- `export.mjs`: renders every frame with `renderAt(t)` and encodes mp4 + poster.
- `_template/`: a starter page (its paths assume `<project>/<name>/`).

### linkhms/

- `new-visit/`: the first full example (schedule → New Visit form → confirmed visit).
- `clinic-signup/`: Clinic Registration form → Complete Your Clinic Set Up (progress to 40%).
- `live-queue/`: Schedule → Live Queue (walk-ins, a separate queue), one visit completed and
  the next started, back to the unchanged schedule. `?figma` lays the queue out with the Figma sample data for D.
- `medical-record/`: Summary → History → Administration Chart → Vaccinations (an overdue
  dose given from the cell menu) → Summary, through the record's section menu. One patient, a
  5-month-old, so the data agrees across the four screens.
- `patient-photo/`: Records history → the photo placeholder next to the name opens the photo
  dialog: a wrong file format (error), the photo, Save (success), close, the photo next to the name.
- `reports/`: Reports · Finance Overview, a 1920×3068 page scrolled inside the 1080 stage (header and
  main menu stay). Hover across KPIs and charts, scroll to Attention Needed, INV-1188 opens Edit Invoice
  (Figma 180:40861, its items add up to the row's Net Total), then Reports in the main menu brings the page
  back at the top. Each click cuts to a skeleton of the next screen (SK seconds) before it fades in. `?figma&s=870` shows every Figma hover state at that scroll for D.
- `patient-portal/`: Patient portal, five screens (Figma 151:11645 and the four next to it). Home → My Tests
  (rows, the BMP's View) → the result (a short look at the flagged glucose) → the logo → Home → Book an Appointment (doctor
  dropdown, Tue 18, 14:00, the summary opens) → request received (the check draws itself) → Back to Home. Skeletons
  are built from the real layout of the next screen; hover is one registry, `HOV`, measured once from the DOM.

- `brand/`: brand and design system, 2900×2550 like the Figma frames (KK, page pp, frames "1"…"8" from 185:43920).
  The mark draws itself, fills, the blue floods out and shrinks into the app icon, the wordmarks and the light card
  arrive, then the camera tilts 5° onto the grid of cards and each card's content lands piece by piece. The cards are
  Figma exports (`assets/card-*.png`, composited on navy) cut into pieces by `assets/pieces.js`: blobs found in the
  export, by hand for tabs and headers. Holds 3 s, fades to navy.

- `flow/`: user flow, 2240×1260 like the Figma frames (KK, page pp, frames "1"…"6" from 153:27813). The four steps
  (Schedule → Patients → EMR → Records) appear and drop to the bottom; each step's wireframe is sketched in pencil, shaded in
  with a scribble mask, and the lit step passes along the arrow; then the steps rise into their places in the long flow,
  which grows out of them connector by connector. The long flow is the Figma SVG export (`assets/flow-long.svg`, one group
  per node) plus connector centerlines (`tools/connectors.txt`), built into `assets/flow.js` by `tools/build-flow.py`.
  `tools/frames.mjs <dir> 4.5 …` saves full-size stills for review.

### legalfans/

- `stats/`: Statistics, 1440×1024 like the Figma frames (KK 213:22508 empty, 213:22643 filled). A creator's
  empty state → ALL in the rail: the cards rise in, the numbers count up, the donut and the bars draw, the cursor rests on the
  red slice (tooltip 19) → back to the creator's empty state. Figma strokes take no layout space, so card paddings are the Figma
  padding minus the border. `?figma` hides the cursor for D; `tools/frames.mjs` saves stills.
- `vault/`: Magic Vault, 1440×1024 (KK 214:23437 grid, 214:23521 item). It starts on the "Waiting" item's
  Figma hover, opens the first kitten → ID-587945 with its 16 leaks → closes it; the close icon sits over the
  "Waiting" item, so the cursor settles back there and the last frame equals the first. No hover under the overlay. The dialog
  fades only over the dark overlay (in after it, out before it lifts), so it never shows the grid through itself.
  Strokes are an `::after` overlay (`.stroke`), as in Figma they sit inside the box.
- `platforms/`: My Platforms, 1440×1024 (KK 215:24572 empty, 215:24742 with credentials). The empty frame (Fansly and the
  username already picked) → the log-in toggle grows the form → email and password typed, the field in the Figma
  focused variant while it has focus → Submit and validate → the illustration gives way to the table: Fansly first
  (Added), then Onlyfans, LoyalFans and Friends2Follow one by one, the counter
  says "1 — 4 of 4" (Figma has "1 — 10 of 69") → a short dip back to the empty frame. `?figma&t=0` and `?figma=2` lay out
  the two Figma frames for D (the second with Figma's three rows and counter). The illustration is the Figma SVG export.
- `account/`: My Account, 1440×1024 (KK 216:25196 General Info, 216:25258 plans popup). Basic Plan → Upgrade → the
  popup's surface covers the page, then its content settles in, the three plans rising one by one → the cursor rests on
  Premium's Choose plan (its Figma hover, #00c8ff; the Premium card's Figma look is its hover too, off hover it is
  styled like Basic) → Cancel: the content goes, then the surface. Figma sizes "auto"
  line-height text to whole pixels rounded up (24 → 29, 48 → 57), so those are set explicitly. `?figma&t=0` and
  `?figma=2` lay out the two frames for D (the second has Figma's own cursor drawn in).
- `leaks/`: Keyword Search → a leak, 1440×1024 (KK 220:25783 search, 220:25706 Leaks (View)). Jessica's query → search: the
  progress sweeps and the hint points to the Leaks Tab → Leaks Tab opens JP-0001-DR, the other reddit copies listed one by
  one → Keyword Search in the menu brings back the search as at the start. The menu's on look moves with the screen.
  `?figma` (the fill at Figma's 151 px) and `?figma=2` lay out the two frames for D.
- `setup/`: the browser extension's guided setup, KK 221:26768 (Welcome) and the three next to it (Last Synchronisation,
  In Progress, Congratulations). The popup is 675×460, so the stage is 1350×920 and `.pop` is scaled ×2. Connect / Sign up →
  Start Scan Now in the same place → the button becomes the track and runs 0 → 100 % (75 % sits at Figma's 445 px; the label is centred on the track, Figma has it 40 px right); the
  spinner is eight SVG circles that stay in place, evenly spaced, and swell and shrink as the size pattern walks clockwise (the
  gradient turns with it; the largest is always just before the smallest; phase 0 is Figma's image) → the check (KK 222:27293): the disc swells in, the tick draws itself → Close Extension, and the popup opens on Welcome again. `?figma=1…4` freezes the frames for D.
- `flow/`: user flow research, 1440×1024 (KK, page LF, frames "1"…"6", 232:4117 → 233:4206). The high-level flow lights
  Statistics, which opens into its screen; Statistics, My Account, Magic Vault and Leak are sketched in pencil and shaded in one
  after another; the Leak screen shrinks back into Leaks, the four researched steps light up and move to their places in the
  detailed flow, which grows out of them connector by connector; then the high-level flow draws itself again (last frame = first).
  Nodes, texts and connector boxes come from Figma (`assets/data.js`, see `tools/README.md`); connector routes are rebuilt from
  their magnets. `tools/frames.mjs <dir> 4.5 …` saves stills, `tools/diff.py still ref out` diffs one against a Figma frame.
- `compare/`: the operator's Comparison, 1440×1024 (KK 238:8646 preview unavailable, 238:8686 both images). The copy's
  preview is unavailable → Skip for now: the pair slides out, the next one in, Remain rolls 25 → 24 → the cursor rests on
  Pictures Match and clicks (each press has a ripple from the click point) → the matched pair slides out the same way, the
  first one comes back and Remain rolls to 25 again (last frame = first). The sort arrow stays ↓ (Figma's second frame has ↑).
  Hover comes from the cursor. `?figma` and `?figma=2` lay out the two frames for D.
- `takedown/`: the admin's Leaks and Documents, 1440×1024 (KK 238:4547 Leaks, 238:4577 Add Leak Manually, 238:5311 Documents,
  238:5346 Upload Document). Add Leak → Northstar's file (the upload arrow becomes swap, as next to the file in Upload Document) → Save: three of Emma's leaks (-M, Found, not checked) push in on top,
  69 → 72 → Documents → Upload Document: the takedown notice for her Requested leak EC-0354-TG, the description types in →
  the new row's menu (Download, Delete) → Leaks in the menu brings back the list as at the start. The data agree across the
  two tables (dates, statuses, who). Figma's Upload Document frame has a broken backdrop (menu at full height), so the loop
  uses the real Documents page behind it. `?figma=1…4` lays out each frame with Figma's own data for D.

## Workflow

1. Copy `_template` to `motion-lab/<project>/<name>/`.
2. Pull the frames from Figma: screenshots go into `src/` (they're the references),
   and icons or cleaned backgrounds into `assets/`. Build the moving UI in HTML from
   the Figma tokens (`get_design_context`), not from pictures, so it can type, open and resize.
3. Preview: `.claude/launch.json` → `motion-lab`, or `npm run serve` in this folder, then open
   `http://localhost:4500/<project>/<name>/`.
4. Iterate:
   - **Space** play/pause · **← / →** 0.1 s (**Shift** 1 s) · click a marker to jump to it
   - **R** cycles the Figma references over the stage · **D** shows them as a difference,
     so anything off by a pixel lights up
   - `?t=4.2` opens paused at a moment · `?clean` hides the bar
   - Beats live in one `T` object with names, so timing changes are one-liners.
5. Export (run from the repo root):

   ```bash
   node motion-lab/export.mjs <project>/<name>
   ```

   This writes `public/motion/<project>-<name>.mp4` (H.264, 30 fps, seamless loop) and `.jpg`
   (the frame at the player's `poster` time). Options: `--fps 60`, `--crf 18`,
   `--poster 11.2`, `--out public/motion`. It needs `ffmpeg` and a Playwright Chromium; the
   script falls back to any Chromium already in `~/Library/Caches/ms-playwright`.
   Run `npm install` here once.

## Putting a loop on the site

- **Case page, under Results**: add to the case's frontmatter

  ```yaml
  motion:
    video: /motion/<project>-<name>.mp4
    poster: /motion/<project>-<name>.jpg
    alt: What happens in the loop, in one sentence
    caption: Short eyebrow line under it
  ```

  It plays while half of it is in view, opens full screen on click, and stays on the poster
  when the visitor prefers reduced motion.
- **Case page, in the text** (e.g. instead of a carousel): put this in the Markdown. The path is
  relative so it works under the GitHub Pages base path too; it plays and opens the same way.

  ```html
  <figure class="case-motion" data-lightbox-group>
  <video src="../../motion/<project>-<name>.mp4" poster="../../motion/<project>-<name>.jpg" width="1920" height="1080" muted loop playsinline preload="metadata" aria-label="…" data-label="…"></video>
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
