# Agent Notes — Handoff Log

Newest entries at the top. See `AGENTS.md` for the handoff format.

---

## 2026-06-01 — Claude (bootstrap)

**Current goal:** Stand up the repo for Claude + Codex collaboration and seed a clean
static rebuild of the live Squarespace site.

**Files changed / created:**
- `index.html`, `styles.css`, `main.js` — clean static rebuild (header, hero,
  newsletter, social feed grid, visit/contact, footer).
- `assets/logo.png`, `assets/gallery/photo-01..10.jpeg` — localized from
  `images.squarespace-cdn.com` (no CDN dependency).
- `AGENTS.md`, `context.md`, `CLAUDE.md` — collaboration + project docs.
- `.gitignore` — ignores `reference/`, node/venv, secrets, OS cruft.
- `reference/index.html`, `reference/cart.html` — raw curl snapshot of the live site
  (gitignored, reference only).

**Commands run:** `git init -b main`; `git remote add origin git@github.com:heyitsjohnmontee/leweys-general-store.git`;
`curl` to snapshot the live site and download assets. (`wget --mirror` produced no
files on this mount — used `curl -o` instead.)

**Verified:** Served with `python3 -m http.server` and loaded the page — sections
render, assets load locally, no console errors. SSH auth to GitHub confirmed
(`heyitsjohnmontee`). Initial commit pushed to `origin/main`.

**Open questions (for John):**
- Where will this be hosted? (GitHub Pages vs. porting back to Squarespace.)
- Should the newsletter wire to a real provider (Mailchimp / Buttondown / Squarespace)?
- Is there a product catalog to build, or is the cart staying a placeholder?

**Next step:** Pick the first real improvement (likely: real newsletter integration or
a typography/brand pass), and split the work between Claude and Codex.
