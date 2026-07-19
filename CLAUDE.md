# Linslade Galaxy FC — Project Context

## Site overview

- **Live site:** https://spontaneous-sunflower-a85279.netlify.app (pending custom domain: linsladegalaxyfc.co.uk)
- **Repo:** `siobhankoshodge/linslade-galaxy-fc` (branch: `main`)
- **Hosting:** Netlify (auto-deploys from GitHub main, ~30s rebuild)
- **Owner:** Siobhan Kos-Hodge (site build), Philip Stanley (club secretary, admin user)

## Architecture

Static HTML site — no framework, no build step, vanilla JS only.

```
/admin/index.html     ← password-protected CMS (single HTML file)
       ↓  GitHub Contents API (PAT auth)
/data/*.json          ← all content lives here
       ↓  fetch() at runtime
/pages (index, teams, fixtures, news, etc.)
```

**Admin URL:** `/admin/` — login requires the admin password + a GitHub Personal Access Token (PAT). PAT is stored in sessionStorage only. Setup guide for Philip is at `/admin/SETUP.md`.

## Data files (`/data/`)

| File | Controls |
|---|---|
| `news.json` | News articles |
| `fixtures.json` | Upcoming fixtures |
| `results.json` | Past results |
| `teams.json` | Manager, training, description per team |
| `sponsors.json` | Sponsor names, logos, URLs |
| `embeds.json` | FA Full-Time lrcodes per team |
| `admin-config.json` | SHA-256 password hash (default: `galaxyfc` — must be changed) |

## Current season: 2026/27

Terminology: mixed (not boys) for the 15 non-girls teams. Girls section has 8 teams.

## All 25 teams

### Mixed (17) — MKDDL / Chiltern Youth Sunday
| Slug | Name |
|---|---|
| ajax | U17 Ajax |
| borussia | U16 Borussia |
| lazio | U16 Lazio |
| spartak | U16 Spartak |
| sporting | U16 Sporting |
| porto | U14 Porto |
| barca | U13 Barca |
| bayern | U13 Bayern |
| juve | U12 Juve |
| roma | U12 Roma |
| wanderers | U12 Wanderers |
| atletico | U11 Atletico |
| real | U11 Real |
| titans | U10 Titans |
| inter | U9 Inter |
| napoli | U8 Napoli |
| dynamo | U7 Dynamo |

### Girls (8) — Bedfordshire FA Girls Football League
| Slug | Name |
|---|---|
| lynxes | U15 Lynxes |
| jaguars | U14 Jaguars |
| lions | U14 Lions |
| panthers | U14 Panthers |
| lionesses | U13 Lionesses |
| bobcats | U12 Bobcats |
| leopards | U11 Leopards |
| meerkats | U9 Meerkats |

## Key conventions

- Team slugs are the canonical identifier used everywhere (data keys, URL params, JS maps)
- `article.html?id=<id>` — article detail page
- `team.html?team=<slug>` — team detail page
- Section values in data: `mixed` or `girls` (never `boys`)
- Footer copyright: © 2026/27 Linslade Galaxy FC

## Outstanding items

- **Admin password:** Default `galaxyfc` must be changed via Settings tab before Philip uses it
- **Philip's PAT:** He needs to create a fine-grained GitHub PAT (Contents read+write on this repo)
- **FA Full-Time lrcodes:** All empty in `embeds.json`
  - MKDDL: Philip needs admin role from MKDDL secretary
  - Beds Girls League: Nicholas Snelson — nicholas.snelson@bedfordshirefa.com
  - Chiltern Youth Sunday (lazio, titans): contact league secretary
- **Formspree:** Contact, Join and Become a Coach forms use endpoint `https://formspree.io/f/maqroydl`; all notifications go to the single email configured in Formspree
- **Custom domain:** linsladegalaxyfc.co.uk pending — once live, update OG image URLs in all `<head>` tags
- **Team profiles:** All 25 teams in `teams.json` still have TBC for manager/training/description
