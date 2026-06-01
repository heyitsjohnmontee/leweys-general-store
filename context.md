# Project Context — Lewandowski's General Store

The source of truth for *what* this project is and *why*. Read this before working.
For *how agents collaborate*, see `AGENTS.md`. For *Claude-Code-specific* operating
notes, see `CLAUDE.md`.

## The business

**Lewandowski's General Store** — a general store in **Southern Pines, North Carolina**.

- **Address:** 124 W Pennsylvania Ave, Southern Pines, NC 28387
- **Email:** skisgeneralstore@gmail.com
- **Instagram:** [@lewandowskis_sp](https://www.instagram.com/lewandowskis_sp/)
- **Live site:** https://www.leweysgeneralstore.com/

Brand voice is warm, plain-spoken, and unfussy: *"Welcome in. We're open. Take a
look around."* The visual identity centers on a square brick-red badge logo
(`assets/logo.png`).

## What this repo is

A **clean static rebuild** of the live site. The live site is hosted on
**Squarespace**, whose markup is machine-generated and depends on
`images.squarespace-cdn.com` — it can't be pushed to GitHub and hosted as-is. So
instead of mirroring Squarespace, we reimplement the site as clean, hand-editable,
framework-free HTML/CSS/JS and improve it from there.

- `index.html` — the single page (header, hero, newsletter, social feed, visit/contact, footer).
- `styles.css` — one stylesheet; CSS variables for brand colors/fonts; mobile-first.
- `main.js` — minimal vanilla JS (mobile menu toggle, newsletter stub, footer year).
- `assets/` — local copies of the logo and feed images (no CDN dependency).
- `reference/` — a raw `curl` snapshot of the live Squarespace page, kept **only** as a
  content/asset reference. It is **gitignored** and never shipped.

**Hosting is undecided.** Keep everything portable static (no build step) so it stays
GitHub Pages-compatible and easy to move. Don't add a framework or bundler without
discussing it with John first.

## Constraints

- **No external CDN dependencies** in shipped code — fonts and images are local or
  system fonts. (The live site's `squarespace-cdn.com` links are reference only.)
- **Framework-free**: plain HTML/CSS/JS. No React/Vue/Tailwind/build tooling unless agreed.
- **Mobile-first** and accessible (semantic HTML, skip link, `aria-*`, reduced-motion).
- **No build step**: the repo runs as static files straight from disk.

## Current state & known gaps

The rebuild reproduces the live site's content as of the initial snapshot. Open items
to improve (good first work):

- **Newsletter** is a front-end stub (`main.js`) — not wired to any email provider yet.
- **Cart** (`/cart`, header cart icon) is a placeholder; there's no real e-commerce/checkout.
- **Social feed** is a static grid of saved images, not a live Instagram feed.
- **No product catalog** is exposed on the live site yet; none is built here.
- **No favicon set** beyond reusing the logo; no proper OG image sizing.

Keep this section current as the site evolves.
