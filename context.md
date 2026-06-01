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

Brand voice is warm, plain-spoken, and unfussy: *"Welcome in."* The visual identity
centers on a square brick-red badge logo (`assets/logo.png`).

**Positioning** (from `CONTENT_RESEARCH.md`, Codex's public-source research): not a
generic gift shop — *a downtown Southern Pines general store for gifts, antiques,
clothing, cards/paper goods, vintage finds, and useful oddities.* The site should sell
the in-person browsing experience: analog, warm, funny, handmade, nostalgic, and
changing often. Lean on concrete categories over broad "lifestyle" mood copy.

## What this repo is

A **clean static rebuild** of the live site. The live site is hosted on
**Squarespace**, whose markup is machine-generated and depends on
`images.squarespace-cdn.com` — it can't be pushed to GitHub and hosted as-is. So
instead of mirroring Squarespace, we reimplement the site as clean, hand-editable,
framework-free HTML/CSS/JS and improve it from there.

- `index.html` — the single page: header · hero (downtown photo) · "What you'll find"
  category grid · "New on the shelves" feed (lightbox) · "Why stop in" vibe · "Find us
  downtown" (Google/Apple Maps buttons, landmark bullets, embedded OpenStreetMap) · newsletter · footer.
- `styles.css` — one stylesheet; CSS variables for brand colors/fonts; mobile-first.
- `main.js` — vanilla JS (mobile menu toggle, newsletter stub, footer year, gallery lightbox).
- `robots.txt` / `sitemap.xml` — crawlability for the single homepage URL.
- `assets/` — local copies of the logo and feed images, plus
  `hero-downtown-southern-pines.jpg` (licensed, see `CREDITS.md`).
- `reference/` — a raw `curl` snapshot of the live Squarespace page, kept **only** as a
  content/asset reference. It is **gitignored** and never shipped.

The homepage `<head>` carries a canonical URL, absolute Open Graph tags, and
`Store` LocalBusiness JSON-LD with **verified facts only** (no hours/phone/reviews).
The H1 is the store name (entity clarity); "Welcome in." lives in the hero eyebrow.

**Hosting is undecided.** Keep everything portable static (no build step) so it stays
GitHub Pages-compatible and easy to move. Don't add a framework or bundler without
discussing it with John first.

## Constraints

- **Minimal external dependencies.** Fonts are system fonts; images/logo are local.
  The one intentional exception is the **OpenStreetMap embed** in "Find us downtown"
  (a free, no-API-key `<iframe>` to `openstreetmap.org` for a real interactive map) —
  approved by John as a better alternative to a hand-drawn map. Don't add other CDNs,
  trackers, or frameworks without asking. (The live site's `squarespace-cdn.com` links
  are reference only.)
- **Framework-free**: plain HTML/CSS/JS. No React/Vue/Tailwind/build tooling unless agreed.
- **Mobile-first** and accessible (semantic HTML, skip link, `aria-*`, reduced-motion).
- **No build step**: the repo runs as static files straight from disk.

## Current state & known gaps

The rebuild reproduces the live site's content as of the initial snapshot. Open items
to improve (good first work):

- **Newsletter** is a front-end stub (`main.js`) — not wired to any email provider yet.
- **Cart / e-commerce** — there's no online checkout, so the cart icon was **removed**
  from the nav (it linked to a non-existent `/cart`). Re-add a real cart only if/when
  commerce is actually wired up.
- **Social feed** is a curated grid of saved images with a lightbox, not a live
  Instagram feed. **3 dated promo images were pulled from the gallery** (the Jan 24
  grand-opening flyer `photo-05`, the "Grand Opening Postponed" shot `photo-09`, and the
  "Hours this week" overlay `photo-06`) so the homepage doesn't look stale — the files
  remain in `assets/gallery/` and can be restored. The "Hours this week" image also bakes
  in specific hours we've chosen not to publish until verified (see below).
- **No product catalog** is exposed on the live site yet; none is built here.
- **OG image** is the logo. A proper 1200×630 social/OG image (ideally a storefront shot
  like `photo-10`) is still a to-do — no image tooling (PIL/Node) is available in WSL to
  generate one here.
- **Search Console** verification token / analytics are not added (awaiting John's token
  and privacy sign-off).

### Unverified claims — confirm with John before treating as fact

Per `CONTENT_RESEARCH.md`, the site deliberately avoids publishing these until verified:

- **Regular hours** — none published; the Visit section points to Instagram for today's
  hours instead. Add real hours once confirmed.
- **Google rating / reviews** — not accessible at research time; no rating, count, or
  review quote is shown. Verify in Google Business Profile before adding a reviews block.
- **Category scope** — "antiques" and "clothing" are taken from the Moore Choices public
  listing; confirm John wants those emphasized and what "clothing" actually means.
- **Events / coffee / live music** — appeared around the Jan 24, 2026 grand opening; the
  site does not promise them as recurring. Add an events area only if it'll be kept current.
- **Parking / entrance notes** — the "Find us downtown" section intentionally omits parking
  and entrance specifics (per `DIRECTIONS_RESEARCH_FOR_CLAUDE.md`); add them once John
  confirms the best visitor guidance. "Belvedere Plaza" is from the Moore Choices listing —
  confirm it's the preferred location descriptor.
- **Map embed** — "Find us downtown" embeds a free, key-less **OpenStreetMap** `<iframe>`
  with a marker at **35.1743146, -79.3926703** (coordinates John verified against Google Maps;
  the Nominatim geocode was ~1 km off and was discarded). Same coords are in the JSON-LD
  `geo`/`hasMap`. Plus outbound Google/Apple Maps buttons. If John prefers Google Maps' look,
  that needs an Embed API key + billing setup.

Keep this section current as the site evolves.
