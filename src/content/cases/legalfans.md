---
order: 1
featured: true
client: LegalFans
title: Automating content-leak takedowns for creators, operators and lawyers
accent: lawyers
summary: Three user groups, one workflow — detect stolen media, validate matches, launch legal action — without creators tracking leaks by hand.
lead: LegalFans helps creators and agencies protect their content. It finds stolen media across the web, has a human confirm every match, and turns each one into a legal takedown — so creators stop chasing leaks by hand.
industry: B2B SaaS
year: 2024–25
role: UX/UI Designer
timeline: 5 months
company: Existek
platforms: Web app + browser extension
tags: [Discovery, Multi-role flows, Design system]
cover: ../../assets/cases/legalfans/cover.webp
coverAlt: LegalFans statistics dashboard on a laptop and the admin panel on a desktop, on a blue background
stats:
  label: Results
  items:
    - value: 10,000+
      label: leaks detected in the first six months
    - value: 80%+
      label: successful takedown rate
    - value: 95%
      label: user satisfaction score
---

## Problem

### Creators were fighting leaks by hand — and losing

Leaked content means lost income, stress and damage to a creator’s reputation. Existing tools made creators find every copy and file every report themselves. Sites routinely ignored individual takedown requests, and few creators could afford lawyers.

> How might we detect, validate and remove leaked content automatically — with legal enforcement built in?

## Users and flow

### Three roles, one pipeline

<div class="cards">
<div><b>Creators and agencies</b>Protect content and revenue without technical skills or spare time.</div>
<div><b>Operators</b>Review AI matches and remove false positives before anything goes legal.</div>
<div><b>Lawyers</b>Receive validated cases and send takedowns at volume.</div>
</div>

### Meet Emma, the primary user

<div class="persona">
<dl class="persona__id">
<div><dt>Name</dt><dd>Emma Carter, 28</dd></div>
<div><dt>Occupation</dt><dd>Full-time content creator</dd></div>
<div><dt>Location</dt><dd>Los Angeles, CA</dd></div>
</dl>
<p class="persona__bio">Emma has been a content creator for over three years, building a loyal fanbase and generating a stable income through subscriptions. Recently, she discovered her content was being leaked on various websites without her consent, impacting her revenue and personal well-being. She lacks the time and technical knowledge to manually track and report these violations.</p>
<div class="persona__cols">
<div>
<p class="persona__label">Goals</p>
<ul>
<li>Protect her content and revenue from unauthorized distribution.</li>
<li>Find an easy, automated way to detect and remove leaked content.</li>
<li>Maintain control over her brand and digital presence.</li>
</ul>
</div>
<div>
<p class="persona__label">Frustrations</p>
<ul>
<li>Manual takedown processes are slow and ineffective.</li>
<li>Many websites ignore her removal requests.</li>
<li>Emma feels vulnerable and lacks legal resources to fight back.</li>
</ul>
</div>
<div>
<p class="persona__label">How LegalFans helps</p>
<ul>
<li>Automatically scans and detects unauthorized use of her content.</li>
<li>Provides a seamless way to initiate legal takedown requests.</li>
<li>Gives her peace of mind by handling the enforcement process.</li>
</ul>
</div>
</div>
</div>

### Her path through the product

<ol class="flow">
<li><span>01 · Creator</span>Signs in securely</li>
<li><span>02 · Creator</span>Links OnlyFans account</li>
<li><span>03 · Creator</span>Installs the extension</li>
<li><span>04 · AI</span>Scans the web for copies</li>
<li class="is-accent"><span>05 · Operator</span>Validates each match</li>
<li class="is-accent"><span>06 · Lawyer</span>Sends the takedown</li>
<li><span>07 · Result</span>Leak is removed</li>
</ol>

![Overall user flow split into creator, extension, operator and admin lanes](../../assets/cases/legalfans/06.webp)

*Overall flow across the creator app, the browser extension, operators and admins.*

### First wireframes of the core screens

<div class="carousel">

![Wireframe of the Statistics screen: leak counts, removal rate, a donut chart and upload dynamics](../../assets/cases/legalfans/wf-statistics.webp "Statistics")

![Wireframe of the My Account screen: profile, account type and password change](../../assets/cases/legalfans/wf-account.webp "My Account")

![Wireframe of the Magic Vault screen: a grid of uploaded media with search toggles](../../assets/cases/legalfans/wf-vault.webp "Magic Vault")

![Wireframe of a single leak: preview, other leaks and details](../../assets/cases/legalfans/wf-leak.webp "Leak details")

</div>

*Low-fidelity wireframes: the first pass focused on making every screen usable for non-technical creators.*

## Key decisions

### Three calls that shaped the product

#### AI finds, a human confirms

Fully automatic matching produced false positives, and a wrong takedown damages trust and creates legal risk. We added operator validation between detection and legal action, so every case a lawyer receives has already been checked by a person.

<div class="carousel">

![Comparison screen where the preview of the suspected copy is unavailable and the operator is asked to use the link](../../assets/cases/legalfans/cmp-unavailable.webp "Preview unavailable")

![Comparison screen with the original and the suspected copy side by side, and the Pictures match or do not match buttons](../../assets/cases/legalfans/cmp-match.webp "Both images side by side")

</div>

*Comparison view — the operator checks the original against the suspected copy before a case goes to a lawyer.*

#### A dashboard that answers one question: am I protected?

Creators don’t want to manage cases; they want to know they’re covered. The statistics view leads with leaks detected and removed, and keeps the legal detail one level down. Even the empty state explains what will appear there.

<div class="carousel">

![Statistics dashboard in its empty state: an illustration and a prompt to add media to the Magic Vault or install the extension](../../assets/cases/legalfans/stats-empty.webp "Empty state")

![Statistics dashboard with data: leaks detected and removed, removal percentage, top creator position, a donut chart and upload dynamics](../../assets/cases/legalfans/stats-filled.webp "Dashboard with data")

</div>

#### Guided setup for non-technical users

Connecting an account and installing an extension are where people give up. The extension walks creators through it step by step — connect, synchronise, done — and always shows how far along they are.

<div class="carousel">

![Extension welcome screen: connect an account or sign up](../../assets/cases/legalfans/ext-connect.webp "Connect or sign up")

![Extension screen showing the date of the last synchronisation and a Start Scan Now button](../../assets/cases/legalfans/ext-last-sync.webp "Last synchronisation")

![Extension screen while synchronising, with a 75% progress bar and a reminder not to close OnlyFans](../../assets/cases/legalfans/ext-progress.webp "Synchronisation in progress")

![Extension success screen: Synchronisation successful, with a Close Extension button](../../assets/cases/legalfans/ext-success.webp "Success")

</div>

## Final screens

### The creator view

<div class="carousel">

![Magic Vault grid with thumbnails, filters and a media counter](../../assets/cases/legalfans/cv-vault-grid.webp "Media grid")

![A single item in Magic Vault with its detected leaks](../../assets/cases/legalfans/cv-vault-details.webp "Item details")

</div>

*Magic Vault — where creators add and manage all their content.*

<div class="carousel">

![A single leak with a preview and other copies of the same content](../../assets/cases/legalfans/cv-leak-details.webp "Leak details")

![Keyword search across Google, Yahoo and Bing](../../assets/cases/legalfans/cv-keyword-search.webp "Keyword search")

</div>

*Leaks and keyword search — one leak in detail, plus search by keyword.*

<div class="carousel">

![My Platforms, adding a cam site or social](../../assets/cases/legalfans/cv-platforms-add.webp "Add a platform")

![My Platforms with credentials entered and the list of connected platforms](../../assets/cases/legalfans/cv-platforms-credentials.webp "Connected platforms")

</div>

*My Platforms — cam sites and socials the team monitors on the creator’s behalf.*

<div class="carousel">

![My Account with general profile information](../../assets/cases/legalfans/cv-account-info.webp "Profile")

![Subscription plans modal with Basic, Advanced and Premium](../../assets/cases/legalfans/cv-account-plans.webp "Subscription plans")

</div>

*My Account — profile and subscription upgrade.*

### The admin panel

<div class="carousel">

![Admin leaks list filtered by status](../../assets/cases/legalfans/ap-leaks.webp "Leaks list")

![Dialog for adding a leak manually, by link or file upload](../../assets/cases/legalfans/ap-leak-add.webp "Add a leak")

</div>

*Leaks — every detected copy in one list, with manual entry for anything the AI missed.*

<div class="carousel">

![Admin documents list with download and delete actions](../../assets/cases/legalfans/ap-documents.webp "Documents list")

![Dialog for uploading a document for a user](../../assets/cases/legalfans/ap-document-upload.webp "Upload a document")

</div>

*Documents — the legal paperwork behind each takedown.*

## Lessons

### What I’d keep, and what I learned

<ol class="rows">
<li>Automation needs a human checkpoint. Speed means nothing if a wrong takedown costs trust.</li>
<li>Legal processes differ by jurisdiction, so the flow has to bend without breaking the creator’s view.</li>
<li>Showing progress openly — even “still in review” — builds more trust than silence.</li>
</ol>

Next on the roadmap: more accurate AI detection, more platforms and faster legal processing through further automation.
