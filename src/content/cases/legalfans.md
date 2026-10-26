---
order: 2
featured: true
client: LegalFans
title: Automating content-leak takedowns for creators, operators and lawyers
accent: creators
summary: Three user groups, one workflow — detect stolen media, validate matches, launch legal action — without creators tracking leaks by hand.
lead: LegalFans helps creators and agencies protect their content. It finds stolen media across the web, has a human confirm every match, and turns each one into a legal takedown — so creators stop chasing leaks by hand.
industry: B2B SaaS
role: Senior Product Designer
timeline: 5 months
company: Existek
team: 4 developers
platforms: Web app + browser extension
tags: [Discovery, Multi-role flows, Design system]
part:
  - Discovery — three roles, creators, operators and lawyers, mapped into one pipeline from detection to takedown
  - Persona, user flow and low-fidelity wireframes tuned for non-technical creators
  - The operator check between AI detection and legal action, with a side-by-side comparison view
  - Creator app, guided browser-extension setup and the admin panel, end to end
cover: ../../assets/cases/legalfans/cover.webp
coverAlt: LegalFans logo over a blurred photo of a content creator talking to her phone camera in front of a ring light
coverLayers:
  background: ../../assets/cases/legalfans/cover-bg.webp
  logo: ../../assets/cases/legalfans/logo.svg
  logoWidth: 44
  themed: true
stats:
  label: The product today · per legalfans.com
  items:
    - value: 2,000+
      label: creators protected
    - value: 9.5M+
      label: leaks removed for clients
    - value: 35+
      label: platforms monitored
motion:
  video: /motion/legalfans-uploads.mp4
  poster: /motion/legalfans-uploads.jpg
  width: 2324
  height: 1520
  frame: false
  alt: "An admin's Uploads page on an iMac: in the grid of photos one card is taken out of search; the list view shows the same photo with its switch off, the help next to Search explains that the switch takes a photo out of search while it stays stored, the photo is switched back on, and the list turns back into the grid"
  caption: Every upload in one place, in or out of search
---
## Problem

### Creators were fighting leaks by hand — and losing

Leaked content means lost income, stress and damage to a creator’s reputation. Existing tools made creators find every copy and file every report themselves. Sites routinely ignored individual takedown requests, and few creators could afford lawyers.

> How might we detect, validate and remove leaked content automatically — with legal enforcement built in?

## Users and flow

### Three roles, one pipeline

<div class="cards">
<div data-icon="user"><b>Creators and agencies</b>Protect content and revenue without technical skills or spare time.</div>
<div data-icon="scan"><b>Operators</b>Review AI matches and remove false positives before anything goes legal.</div>
<div data-icon="scale"><b>Lawyers</b>Receive validated cases and send takedowns at volume.</div>
</div>

### Meet Emma, the primary user

<div class="persona">
<dl class="persona__id">
<div><dt>Name</dt><dd>Emma Carter, 28</dd></div>
<div><dt>Occupation</dt><dd>Full-time content creator</dd></div>
<div><dt>Location</dt><dd>Los Angeles, CA</dd></div>
</dl>
<p class="persona__bio">Three years in, Emma earns a steady income from subscriptions. Then she found her content leaked across the web, hurting both her revenue and her peace of mind. She has neither the time nor the technical skills to chase every copy herself.</p>
<div class="persona__cols">
<div>
<p class="persona__label">Goals</p>
<ul>
<li>Protect her content and income.</li>
<li>Find and remove leaks without doing it by hand.</li>
<li>Stay in control of her brand.</li>
</ul>
</div>
<div>
<p class="persona__label">Frustrations</p>
<ul>
<li>Manual takedowns are slow and rarely work.</li>
<li>Sites ignore her requests.</li>
<li>No legal help to fight back.</li>
</ul>
</div>
<div>
<p class="persona__label">How LegalFans helps</p>
<ul>
<li>Finds her leaked content automatically.</li>
<li>Turns each leak into a legal takedown.</li>
<li>Handles enforcement, so she doesn’t have to.</li>
</ul>
</div>
</div>
</div>

### Her path through the product

<ol class="flow">
<li><span>Creator</span>Connects her accounts</li>
<li><span>Creator</span>Adds her originals</li>
<li><span>AI</span>Scans the web for copies</li>
<li class="is-accent"><span>Operator</span>Validates each match</li>
<li class="is-accent"><span>Lawyer</span>Sends the takedown</li>
<li><span>Creator</span>Sees the leak removed</li>
</ol>

### From the first flow to the detailed one

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-flow.mp4" poster="../../motion/legalfans-flow.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="A first, high-level flow shows the creator, operator and admin lanes; Statistics opens into its low-fidelity wireframe, and the Statistics, My Account, Magic Vault and Leak wireframes are sketched in pencil and shaded in one after another; the Leak screen shrinks back into the flow, the four researched steps light up and move into a detailed flow that grows around them: sign-up, sources, the vault, leaks and search settings, the browser extension, the operator's match check and the admin sections" data-label="A first, high-level flow shows the creator, operator and admin lanes; Statistics opens into its low-fidelity wireframe, and the Statistics, My Account, Magic Vault and Leak wireframes are sketched in pencil and shaded in one after another; the Leak screen shrinks back into the flow, the four researched steps light up and move into a detailed flow that grows around them: sign-up, sources, the vault, leaks and search settings, the browser extension, the operator's match check and the admin sections"></video>
<figcaption class="eyebrow">From a first flow and its wireframes to the detailed flow</figcaption>
</figure>

The rest of this case follows Emma through these six steps.

## Setup

### Guided setup for non-technical users

Connecting an account and installing an extension are where people give up. The extension walks creators through it step by step — connect, synchronise, done — and always shows how far along they are.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-setup.mp4" poster="../../motion/legalfans-setup.jpg" width="1350" height="920" muted loop playsinline preload="metadata" aria-label="The extension welcomes the creator and offers to connect an OnlyFans account or sign up; after Connect it shows the last synchronisation, Monday 12 June, 2025, and Start Scan Now turns the button into a progress bar that runs to 100% while the circles above pulse and a note asks not to close OnlyFans; then a check draws itself, Synchronisation Successful, and Close Extension" data-label="The extension welcomes the creator and offers to connect an OnlyFans account or sign up; after Connect it shows the last synchronisation, Monday 12 June, 2025, and Start Scan Now turns the button into a progress bar that runs to 100% while the circles above pulse and a note asks not to close OnlyFans; then a check draws itself, Synchronisation Successful, and Close Extension"></video>
<figcaption class="eyebrow">Connect, synchronise, done</figcaption>
</figure>

On My Platforms she lists every other place she publishes, so the team knows where to look.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-platforms.mp4" poster="../../motion/legalfans-platforms.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="On My Platforms, a creator with no platforms yet has picked Fansly and a username; turning on log-in information opens email and password fields, and after Submit and validate the empty-state illustration gives way to the table: Fansly is added, then Onlyfans, LoyalFans and Friends2Follow join it one by one" data-label="On My Platforms, a creator with no platforms yet has picked Fansly and a username; turning on log-in information opens email and password fields, and after Submit and validate the empty-state illustration gives way to the table: Fansly is added, then Onlyfans, LoyalFans and Friends2Follow join it one by one"></video>
<figcaption class="eyebrow">Every platform the team watches on her behalf</figcaption>
</figure>

## Her content

### One vault for everything worth protecting

Detection needs originals to compare against. Whatever the extension syncs, and anything Emma uploads by hand, lands in the Magic Vault, and each item shows whether it has been scanned and how many leaks it has.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-vault.mp4" poster="../../motion/legalfans-vault.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="In the Magic Vault grid of thumbnails, filters and a media counter, the cursor rests on an item waiting for a scan, then opens a kitten photo: item ID-587945, manually uploaded and scanned, 16 leaks, with the platforms, claim IDs and statuses Resolved, Found and Cancelled; the dialog closes back to the grid" data-label="In the Magic Vault grid of thumbnails, filters and a media counter, the cursor rests on an item waiting for a scan, then opens a kitten photo: item ID-587945, manually uploaded and scanned, 16 leaks, with the platforms, claim IDs and statuses Resolved, Found and Cancelled; the dialog closes back to the grid"></video>
<figcaption class="eyebrow">All her content in one place, each item with its leaks</figcaption>
</figure>

## Detection

### AI scans, keyword search fills the gaps

Every item in the vault is matched against copies across the web. Emma can also search by keyword herself; each hit becomes a leak with its own page and status.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-leaks.mp4" poster="../../motion/legalfans-leaks.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="On Keyword Search, the query Jessica Sparkle + Onlyfans + xxx photo leak is searched across Google, Yahoo and Bing; while the progress runs, the hint points to the Leaks Tab, which opens leak JP-0001-DR: the preview found on reddit.com, its link, and the other leaks of the same image with statuses from Requested to Completed; Keyword Search in the menu brings back the search" data-label="On Keyword Search, the query Jessica Sparkle + Onlyfans + xxx photo leak is searched across Google, Yahoo and Bing; while the progress runs, the hint points to the Leaks Tab, which opens leak JP-0001-DR: the preview found on reddit.com, its link, and the other leaks of the same image with statuses from Requested to Completed; Keyword Search in the menu brings back the search"></video>
<figcaption class="eyebrow">From a keyword search to one leak in detail</figcaption>
</figure>

## Validation

### AI finds, a human confirms

Fully automatic matching produced false positives, and a wrong takedown damages trust and creates legal risk. We added operator validation between detection and legal action, so every case a lawyer receives has already been checked by a person.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-compare.mp4" poster="../../motion/legalfans-compare.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="On the Comparison screen, with 25 pairs remaining, the suspected copy's preview is unavailable, so the operator clicks Skip for now; the next pair slides in with the original and the copy side by side, 24 remaining, and the operator clicks Pictures match" data-label="On the Comparison screen, with 25 pairs remaining, the suspected copy's preview is unavailable, so the operator clicks Skip for now; the next pair slides in with the original and the copy side by side, 24 remaining, and the operator clicks Pictures match"></video>
<figcaption class="eyebrow">The operator checks every match before it goes legal</figcaption>
</figure>

## Takedown

### Validated cases go legal

Only confirmed leaks reach the legal team. From there each one moves through the same statuses, Found, Requested, Pending and Completed or Canceled, so the team sees where every takedown stands and filters the list down to the stage that needs work. Copies the scan missed don't wait for the next one: the team adds them by hand, one link at a time or as a CSV or XLS file with an agency's whole list.

The paperwork behind each takedown is kept with the creator it belongs to. Emma never has to file anything herself.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-takedown.mp4" poster="../../motion/legalfans-takedown.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="On the admin's Leaks list, every copy has an owner, an operator, a platform, a found date and a status from Found to Completed; Add Leak Manually takes Northstar Talent's file for Emma Carter, and three of her leaks the scan missed join the top of the list as Found; in Documents, the takedown notice for her Telegram leak EC-0354-TG is uploaded for @emma.carter with its description, joins the top of the list, and its menu offers Download and Delete" data-label="On the admin's Leaks list, every copy has an owner, an operator, a platform, a found date and a status from Found to Completed; Add Leak Manually takes Northstar Talent's file for Emma Carter, and three of her leaks the scan missed join the top of the list as Found; in Documents, the takedown notice for her Telegram leak EC-0354-TG is uploaded for @emma.carter with its description, joins the top of the list, and its menu offers Download and Delete"></video>
<figcaption class="eyebrow">Every takedown by status, and the paperwork behind it</figcaption>
</figure>

## Result

### A dashboard that answers one question: am I protected?

Creators don’t want to manage cases; they want to know they’re covered. The statistics view leads with leaks detected and removed, and keeps the legal detail one level down. Even the empty state explains what will appear there.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-stats.mp4" poster="../../motion/legalfans-stats.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="A creator with no data yet sees the empty statistics view, which suggests adding media to the Magic Vault or installing the extension; switching to all creators fills the dashboard: leaks detected and removed, removal percentage, top creator position, total media, the current leaks donut and upload dynamics, and the red slice shows 19 leaks found" data-label="A creator with no data yet sees the empty statistics view, which suggests adding media to the Magic Vault or installing the extension; switching to all creators fills the dashboard: leaks detected and removed, removal percentage, top creator position, total media, the current leaks donut and upload dynamics, and the red slice shows 19 leaks found"></video>
<figcaption class="eyebrow">From the empty state to the dashboard with data</figcaption>
</figure>

Everything else, like her profile and subscription, stays out of the way in My Account.

<figure class="case-motion" data-lightbox-group>
<video src="../../motion/legalfans-account.mp4" poster="../../motion/legalfans-account.jpg" width="1440" height="1024" muted loop playsinline preload="metadata" aria-label="On My Account, a creator on the Basic Plan with the next charge on 02.12.2025 clicks Upgrade; the subscription plans open, Basic, Advanced and Premium at $69, $129 and $149 a license, the cursor rests on Premium's Choose plan, and Cancel closes the plans back to the account" data-label="On My Account, a creator on the Basic Plan with the next charge on 02.12.2025 clicks Upgrade; the subscription plans open, Basic, Advanced and Premium at $69, $129 and $149 a license, the cursor rests on Premium's Choose plan, and Cancel closes the plans back to the account"></video>
<figcaption class="eyebrow">From the Basic plan to the upgrade options</figcaption>
</figure>

## Lessons

### What I’d keep, and what I learned

<ol class="rows">
<li>Automation needs a human checkpoint. Speed means nothing if a wrong takedown costs trust.</li>
<li>Legal processes differ by jurisdiction, so the flow has to bend without breaking the creator’s view.</li>
<li>Showing progress openly — even “still in review” — builds more trust than silence.</li>
</ol>

Next on the roadmap: more accurate AI detection, more platforms and faster legal processing through further automation.
