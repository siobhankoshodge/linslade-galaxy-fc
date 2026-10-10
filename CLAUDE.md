# Linslade Galaxy FC — Project Context

## Site overview

- **Live site:** https://linsladegalaxyfc.co.uk
- **Repo:** `siobhankoshodge/linslade-galaxy-fc` (branch: `main`)
- **Hosting:** Netlify (auto-deploys from GitHub main, ~30s rebuild)
- **Owner:** Siobhan Kos-Hodge (site build), Philip Stanley (club secretary, admin user)

## Architecture

Static HTML site — no framework, no build step, vanilla JS only.

```
/admin/index.html     ← password-protected CMS
       ↓  Netlify Function (server-side session + private GitHub token)
/data/*.json          ← all content lives here
       ↓  fetch() at runtime
/pages (index, teams, fixtures, news, etc.)
```

**Admin URL:** `/admin/` — administrators use the shared admin password. The GitHub token stays private in Netlify environment variables. Setup guide is at `/admin/SETUP.md`.

## Data files (`/data/`)

| File | Controls |
|---|---|
| `news.json` | News articles |
| `fixtures.json` | Upcoming fixtures |
| `results.json` | Past results |
| `teams.json` | Manager, training, description per team |
| `sponsors.json` | Sponsor names, logos, URLs |
| `embeds.json` | FA Full-Time lrcodes per team |

## Current season: 2026/27

Terminology: mixed (not boys) for the 15 non-girls teams. Girls section has 8 teams.

## All 23 teams

### Mixed (15) — MKDDL / Chiltern Youth / BMSL TT Couriers
| Slug | Name |
|---|---|
| ajax | U18 Ajax |
| borussia | U16 Borussia |
| lazio | U16 Lazio |
| spartak | U16 Spartak |
| porto | U14 Porto |
| barca | U13 Barca |
| bayern | U13 Bayern |
| juve | U12 Juve |
| wanderers | U12 Wanderers |
| atletico | U11 Atletico |
| real | U11 Real |
| rojas | U11 Rojas |
| titans | U10 Titans |
| inter | U9 Inter |
| dynamo | U7 Dynamo |

### Girls (8) — Bedfordshire FA Girls Football League
| Slug | Name |
|---|---|
| pumas | U14 Pumas |
| jaguars | U14 Jaguars |
| lions | U14 Lions |
| panthers | U14 Panthers |
| lionesses | U13 Lionesses |
| tigers | U13 Tigers |
| bobcats | U12 Bobcats |
| meerkats | U9 Meerkats |

## Key conventions

- Team slugs are the canonical identifier used everywhere (data keys, URL params, JS maps)
- `article.html?id=<id>` — article detail page
- `team.html?team=<slug>` — team detail page
- Section values in data: `mixed` or `girls` (never `boys`)
- Footer copyright: © 2026/27 Linslade Galaxy FC

## Outstanding items

- **Admin environment:** Configure `GITHUB_ADMIN_TOKEN`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` in Netlify before deploying the secure admin update
- **FA Full-Time lrcodes:** All empty in `embeds.json`
  - MKDDL: Philip needs admin role from MKDDL secretary
  - Beds Girls League: Nicholas Snelson — nicholas.snelson@bedfordshirefa.com
  - Chiltern Youth Sunday (lazio, titans): contact league secretary
- **Formspree:** Contact, Join and Become a Coach forms use endpoint `https://formspree.io/f/maqroydl`; all notifications go to the single email configured in Formspree
- **SEO URLs:** Replace remaining Netlify-subdomain canonical, social and sitemap URLs with the live custom domain
