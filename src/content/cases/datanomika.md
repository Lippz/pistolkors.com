---
order: 5
client: Datanomika
title: A community platform that collects how everyday people see the world
summary: Anonymous polls meet crypto raffles — answer questions, earn tokens, win daily to annual draws.
lead: Datanomika is a poll platform that pairs traditional polling with cryptocurrency raffles. People answer anonymously by connecting a wallet, earn free tokens for every response and raise their chances in daily, weekly, monthly and annual draws.
industry: Community / Crypto
year: '2022'
role: UX/UI Designer, business analysis
timeline: 3 months
company: Existek
platforms: Web app + admin panel
tags: [Web3, Gamification, Admin panel]
cover: ../../assets/cases/datanomika/cover.webp
coverAlt: Datanomika main page — “Join a community of thoughts” with a 3D brain illustration
---

## Overview

### Polling, with a reason to come back

I took part in discovery as a business analyst, then designed the whole product — the public site and the admin panel — iterating with the customer until the final result.

- **Question of the day** — a single yes/no question gets people in, then they choose one, three or five more.
- **Rewards** — every answer earns tokens; tokens are entries in the draws.
- **Transparency** — blockchain keeps the draws and rewards verifiable.
- **Admin panel** — separate tools to manage draws, polls and questions, grouped into themes, with a dashboard of key metrics.

The project wound down when its funding ran out.

## User flow

### Give them something “for free”

The flow’s main purpose is to make users buy tokens. And how to force someone to do anything? Right — give them something “for free”.

The poll engine was created together with the raffle system: the more users interact with the questions, the higher their chances of winning a draw. Starting from the main page, they answer the question of the day, choose a poll size and answer additional questions to increase their chances. Then they connect a wallet and buy tokens to participate in the draw, with options to view the results and share their participation.

<div class="framed">

![User flow diagram: main page, question of the day, poll size, answers, poll results and stats, wallet connection, buying tokens and draw results](../../assets/cases/datanomika/user-flow.webp)

</div>

## Public site

### A step-by-step path to the draw

#### Main page

Users follow a step-by-step process to participate in polls and raffles.

1. **Question of the day** — users answer a daily question with “Yes” or “No” and can view the related statistics.
2. **Choose your poll** — users select from options like 1, 3 or 5 questions to answer.
3. **Participate in the draw** — users connect their cryptocurrency wallet, buy tokens with ETH or USDT and receive DTN tokens for raffle entries.
4. **Get your reward** — displays past raffle results, including draw type, date, transaction hash, DTN quantity and value.

<div class="framed">

![Main page: draw countdowns, the “Join a community of thoughts” hero with a 3D brain, then four steps — question of the day, choose your poll, participate in the draw and the rewards table](../../assets/cases/datanomika/main-page.webp)

</div>

#### Polls

- Users see polls divided by number of questions.
- They select a poll and provide their responses.
- Each completed poll response earns the user a set number of free tokens.
- Users may skip questions but won’t get any reward for them.
- Users accumulate tokens, which increase their chances in the upcoming draws.

<div class="carousel">

![Poll results: five question cards with the share of Yes and No answers, a skipped question and actions to see draw results, take another poll or participate in the draw](../../assets/cases/datanomika/poll-results.webp "Poll results")

![Draw results: a table of winners with place, date, transaction hash and DTN quantity, filtered by draw type, with a date picker](../../assets/cases/datanomika/draw-results.webp "Draw results")

</div>

#### Token info

This dashboard gives users an at-a-glance understanding of the token’s allocation and staking dynamics, enabling informed decisions about their investments and participation in the ecosystem.

A circular chart visualizes the distribution of DTN tokens. The line chart shows the quantity of DTN tokens staked and unstaked over time.

<div class="framed">

![Token dashboard: distribution of DTN tokens by purpose in a ring chart, and a staked versus unstaked line chart over six months](../../assets/cases/datanomika/token-dashboard.webp)

</div>

## Admin panel

### Tools for the poll engine and the raffle system

A separate module for managing the poll engine and the raffle system. It provides tools to create and edit draws, voting polls and questions, while offering visual data through charts and graphs.

The questions are divided into “buckets” that represent different themes — Social, Health, Education, Politics, Economics and so on. The dashboard delivers an overview of key metrics, efficient navigation and management of current and past activities.

<div class="carousel">

![Admin dashboard: sessions, visitors, shares, new users and average time tiles, a dynamics chart and a world map of visitors by time zone](../../assets/cases/datanomika/admin-dashboard.webp "Dashboard")

![Manage draws: the four draws with their jackpots and prizes, and a paged table of past results](../../assets/cases/datanomika/manage-draws.webp "Draws")

![Questions: a list grouped into buckets with search, filters and a menu to edit or disable a question](../../assets/cases/datanomika/questions.webp "Questions")

![Votings: the active governors’ vote with a countdown, and past votings expanded into respondent breakdowns by gender, generation and country](../../assets/cases/datanomika/votings.webp "Votings")

</div>
