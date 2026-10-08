---
order: 1
featured: true
client: LinkHMS
title: A hospital management system light enough for small clinics
accent: small clinics
summary: Existing HMS tools are heavy and built for big hospitals. Research with 12 healthcare professionals shaped a lean system in Central Africa that one doctor can run alone or a whole clinic team can share.
lead: LinkHMS is a cloud platform for hospitals and clinics in Central Africa. Most hospital systems are heavy, outdated and built for large institutions — I designed one that a single doctor can run alone, with every feature, and a whole clinic team can share — set up and in use from day one.
industry: HealthTech
year: 2024–26
role: UX/UI Designer
timeline: 30 months
company: Existek
platforms: Web app, desktop-first
tags: [User research, Scheduling, Data privacy]
cover: ../../assets/cases/linkhms/cover.webp
coverAlt: LinkHMS finance reports and the doctors schedule on two desktop monitors
stats:
  label: Research
  items:
    - value: '12'
      label: healthcare professionals surveyed
    - value: '5'
      label: in-depth interviews
    - value: '4'
      label: competing products analysed
---

## Problem

### Hospital software ignores the small clinic

Most HMS products are heavy, dated and aimed at large hospitals. Smaller clinics and solo practitioners are left juggling paper records and slow tools that were never meant for them.

<div class="cards">
<div><b>Challenge</b>Design a streamlined system that covers the core needs of most clinics and individual practitioners.</div>
<div><b>Solution</b>Combine and improve on the strongest features of competitors to simplify internal cooperation and patient–clinic interaction.</div>
</div>

## Research

### What makes a hospital system work

I surveyed 12 healthcare professionals, interviewed 5 of them and analysed 4 competing products to understand how they manage patients, scheduling and communication.

- Clinicians juggle several systems for records, appointments and communication.
- Staff value being able to tailor patient records and scheduling to their own workflow.
- Existing tools feel outdated, hard to use and unreliable.
- A clear dashboard for scheduling and patients is essential for quick decisions.

<div class="quotes">

> The old software we’re using is extremely slow and clunky. It takes forever to update patient records or schedule appointments, and half the time, the system crashes.
>
> Abdoulaye B., Doctor

> Handwritten records make managing appointments difficult and time-consuming. A modern system would save time and prevent mistakes.
>
> Priya S., Administrative Assistant

</div>

I grouped the findings in an affinity diagram, graded features by importance and built a persona — Kwame, a physical therapist working across several public and private clinics — to test every decision against.

## Process

### From sketches to a tested flow

I started with hand-drawn sketches to decide what each screen needed, then mapped the user flow and built a low-fidelity prototype in Figma. A usability study showed where the task flow broke down; a second round confirmed the fixes before any high-fidelity work.

![User flow covering registration, scheduling, patients, medical records and administration](../../assets/cases/linkhms/user-flow.webp)

<div class="carousel">

![Low-fidelity wireframe of the doctors schedule grid](../../assets/cases/linkhms/wf-schedule.webp "Schedule")

![Low-fidelity wireframe of the patients list](../../assets/cases/linkhms/wf-patients.webp "Patients")

![Low-fidelity wireframe of a patient summary with recent visits, tests, diagnoses and prescriptions](../../assets/cases/linkhms/wf-patient-summary.webp "Patient summary")

![Low-fidelity wireframe of a patient’s records history with a category menu](../../assets/cases/linkhms/wf-patient-records.webp "Patient records")

</div>

## Scope

### From the front desk to the finance office

LinkHMS covers a clinic’s whole day. The key decisions below zoom in on the flows where speed mattered most.

<div class="cards">
<div><b>Schedule and queue</b>Doctors’ appointments on a timeslot grid and a daily live queue by status: book, edit, cancel, start and complete visits.</div>
<div><b>Patients and records</b>A searchable patient registry and an electronic record for every patient to view and add clinical entries, with photo upload.</div>
<div><b>Visits and admissions</b>Document a visit — vitals, diagnoses, prescriptions, analyses, services — convert it to an admission and follow it through discharge.</div>
<div><b>Billing and claims</b>Itemised invoices, payments, printing and sending, and insurance claims tracked from draft through submission to the insurer’s decision.</div>
<div><b>Pharmacy</b>Prescription orders dispensed from stock and billed to the patient or the insurer, and a medicine inventory with CSV or Excel upload.</div>
<div><b>Laboratory</b>Lab orders tracked by status, results entered with attachments and sent to the patient, and custom test templates next to the built-in ones.</div>
<div><b>Reports</b>Operational reports on admissions, diagnoses, lab tests, patient flow and antenatal care, and finance reports on what was billed, collected and is outstanding.</div>
<div><b>Administration and HR</b>Departments, services, insurance providers with plan-based pricing, API keys, and staff accounts with roles and weekly schedules.</div>
<div><b>Settings and permissions</b>Account and clinic details, invoice text, working hours, subscription billing and view and edit permissions for every role.</div>
</div>

## Key decisions

### Ten flows that run a clinic

#### Set up a clinic with a guided tour

There is one LinkHMS for everyone: a doctor working alone gets every feature, and a clinic team shares the same system with roles. After sign-up, a guided tour walks through the first set-up: it creates a department, a service and a user, ticking them off in a “Let’s set up your clinic” checklist, and the home screen keeps the remaining steps in view. The tour can be skipped and restarted at any time from the menu.

<div class="carousel">

![Clinic registration form with Google sign-in, clinic details and terms](../../assets/cases/linkhms/clinic-registration.webp "Clinic registration")

![Home screen after sign-up with quick actions, a clinic set-up progress bar and next steps](../../assets/cases/linkhms/clinic-setup.webp "Clinic set-up")

</div>

![Clinic onboarding tour: a welcome message, then creating a department, a service and a user with tooltips and a set-up checklist, ending with a congratulations message and a hint on how to restart the tour](../../assets/cases/linkhms/tour-clinic.webp)

*The onboarding tour — departments first, then the services they offer and the people who provide them: twelve screens from the welcome message to “You’re all set”.*

#### Book an appointment in a few clicks

Receptionists create an appointment for a specific doctor in just a few clicks, straight from the schedule.

<div class="carousel">

![Doctors schedule grid with colour-coded appointment statuses and a new appointment slot](../../assets/cases/linkhms/schedule.webp "Schedule")

![New Visit dialog with patient details, doctor, date and a service search](../../assets/cases/linkhms/new-visit.webp "New visit")

</div>

#### A live queue for walk-in patients

Not every patient books ahead. The Live Queue shows the day’s visits by status — waiting, ongoing, completed or cancelled — with urgent cases marked in red, and every row can start or complete a visit, convert it to an admission or open the patient’s profile. A walk-in is added in one dialog that finds the patient by name or phone number.

<div class="carousel">

![Live Queue: today’s visits with urgency, doctor, service and status, and a row menu to start or complete a visit, convert it to an admission, edit or cancel it](../../assets/cases/linkhms/live-queue.webp "Live Queue")

![New Visit dialog for a live queue visit: patient details, insurance information, urgency, doctor, service, price and visit type](../../assets/cases/linkhms/live-queue-new-visit.webp "New walk-in visit")

</div>

#### Patients at the centre, with the right to be forgotten

The patient is the main entity of the system. Every record can be removed completely on the patient’s request, in line with the data-privacy needs raised in research.

<div class="carousel">

![Patients list with search, filters, CSV upload and a row menu with Edit and Delete](../../assets/cases/linkhms/patients-list.webp "Patients list")

![Delete Patient dialog warning that the action is permanent and asking for confirmation](../../assets/cases/linkhms/delete-patient.webp "Delete patient")

</div>

#### A patient photo without leaving the record

A photo is added right from the patient’s record: upload a file or take one with the device camera, check it, then save. If the file has the wrong format, the dialog says which formats work, and it warns before unsaved changes are lost.

<div class="carousel">

![Patient photo dialog over the record with a placeholder, Upload Photo and Open Camera buttons and a disabled Save](../../assets/cases/linkhms/photo-empty.webp "Empty")

![Patient photo dialog with a chosen photo, a delete icon, Take New and an active Save button](../../assets/cases/linkhms/photo-selected.webp "Photo chosen")

![Patient photo dialog after saving, with a success message](../../assets/cases/linkhms/photo-saved.webp "Saved")

![Patient photo dialog with an invalid file format error listing the accepted formats](../../assets/cases/linkhms/photo-error.webp "Wrong format")

</div>

#### A medical record you can scan in seconds

The electronic medical record is split into sections and subsections, so a doctor jumps straight to what matters in an emergency.

<div class="carousel">

![Patient summary with recent visits, samples and tests, diagnoses and prescriptions](../../assets/cases/linkhms/patient-summary.webp "Summary")

![Patient records history with a category menu and colour-coded record types](../../assets/cases/linkhms/patient-records.webp "Records")

</div>

#### One visit, two bills

Insurance is handled item by item. When a claim is created, everything the patient’s plan covers or needs to authorise goes to the insurer as a single claim, and anything not covered is billed to the patient on a separate invoice. The insurer’s decision is then recorded line by line, and the claim keeps both invoices and a change log in one place.

<div class="carousel">

![Billing claims list with filters by status, type and insurance provider, totals and colour-coded statuses](../../assets/cases/linkhms/billing-claims.webp "Claims")

![New Claim, step two: linking the claim to a visit and adding services and medications, with a note on how covered and not covered items are billed](../../assets/cases/linkhms/billing-new-claim.webp "New claim")

![Claim details: patient, insurer, visit and dates, items with coverage and the insurer’s decision, and separate insurance and patient invoices](../../assets/cases/linkhms/billing-claim-decision.webp "Insurer’s decision")

![Edit Invoice: balance and payments, linked claim, insurance provider, invoice items, discount and the details printed on the invoice](../../assets/cases/linkhms/billing-invoice.webp "Invoice")

</div>

#### Reports that point to the problem

Finance reports open on six numbers — billed, collected, outstanding, collection rate, average invoice and denied claims — followed by the trend, revenue by department, the payment mix and the claim pipeline. Clicking a tile or a chart segment filters the “Attention needed” table of flagged invoices below, and each invoice opens in one click.

![Finance overview report: KPI tiles, billed versus collected trend, revenue by department, payment method mix, claim pipeline, top ten rankings and a table of invoices that need attention](../../assets/cases/linkhms/finance-overview.webp)

#### Six roles, each with the right access

Admins, doctors, nurses, receptionists, lab workers and pharmacists each get their own set of permissions. Access is set per section and sub-section, with view and edit rights apart, and can always be reset to the defaults.

<div class="carousel">

![Settings, Permissions tab: six roles with the number of active users in each](../../assets/cases/linkhms/roles.webp "Roles")

![Receptionist permissions: sections and sub-sections with separate view and edit checkboxes and a Reset Permissions button](../../assets/cases/linkhms/role-permissions.webp "Receptionist")

</div>

#### A subscription that grows with the team

The price is counted per seat: an administrator, plus every doctor, nurse, receptionist or lab worker added in HR. A doctor working alone pays for one seat and still gets every feature; a clinic adds seats as it hires. The plan screen compares monthly and annual billing side by side, and a notice warns that a newly added user is charged on the next invoice.

<div class="carousel">

![Subscription payment summary: seats per role with totals, a notice that new users are charged on the next invoice and a link to manage users in HR](../../assets/cases/linkhms/subscription-summary.webp "Payment summary")

![Subscription plan: seats per role priced monthly and annually side by side, with the current plan marked and an upgrade to annual billing](../../assets/cases/linkhms/subscription-plan.webp "Monthly or annual")

</div>

## Patient portal

### The same record, from the patient’s side

Patients sign in with their email and a six-digit one-time code. The home screen gathers their prescriptions, conditions, appointments and test results, and booking takes a single page: clinic, specialty, doctor and service with its price, then a day in the coming week and a free timeslot. A test result lists every parameter against its reference range, flags what is out of range and downloads as a PDF. The portal works on phones too.

<div class="carousel">

![Patient portal home with cards for prescriptions, conditions, appointments, tests, booking and a consultation feature marked as coming soon](../../assets/cases/linkhms/portal-home.webp "Home")

![Book an Appointment: clinic, specialty, doctor and service with price, a choice of day in the next seven days, available timeslots and a summary before sending the request](../../assets/cases/linkhms/portal-booking.webp "Book an appointment")

![Test result for a basic metabolic panel: patient, order and test info, and a results table with units, reference values and flagged values, with a PDF download](../../assets/cases/linkhms/portal-test-result.webp "Test result")

</div>

## Visual identity

### Calm, clinical, recognisable

A distinct identity set LinkHMS apart from dated competitors. The UI takes its cue from modern healthcare facilities: clean, minimal and patient-centric.

![LinkHMS logo in colour and white, and the app icon on white and blue](../../assets/cases/linkhms/brand-logo.webp)

![Icon sets: an outline set for the product on the left and a duotone set with a soft gradient for the landing page on the right](../../assets/cases/linkhms/brand-icons.webp)

*A variety of Google Icons was also used.*

## Design system

### Small pieces, used everywhere

To keep the interface consistent as it grows, I defined design tokens for numeric values, colour and type, and built every component on top of them.

<div class="pair">

![Numeric tokens for spacing and corner radius, and colour tokens: neutrals and ten accent hues in twelve steps](../../assets/cases/linkhms/design-tokens.webp)

![Typography: Roboto Flex for the interface and Manrope for buttons, with the full size scale](../../assets/cases/linkhms/design-typography.webp)

</div>

The components follow the atomic approach: small elements first, then the blocks assembled from them.

<div class="pair">

![Atoms: buttons, tags, record type chips and small status labels](../../assets/cases/linkhms/design-atoms.webp)

![Molecules and organisms: filters, tabs, page titles, a search field, a date picker, a section menu, metric cards and text inputs](../../assets/cases/linkhms/design-molecules-organisms.webp)

</div>

## Next steps

### There is no limit to perfection

What started with registration, scheduling, patients and the medical record grew over two and a half years into a full clinic system: a live queue, admissions with beds and discharge, billing and insurance claims, a pharmacy, a laboratory, reports and a patient portal. Next in line is consultation with a doctor right from the portal — its card is already waiting on the portal’s home screen, marked “Coming soon”.
