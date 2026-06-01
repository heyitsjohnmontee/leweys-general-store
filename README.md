# Lewandowski's General Store — Website

A clean, framework-free static rebuild of the website for **Lewandowski's General Store**,
124 W Pennsylvania Ave, downtown Southern Pines, NC.

It is plain HTML/CSS/JS with no build step and no backend — just static files
(`index.html`, `styles.css`, `main.js`, and `assets/`). It can be opened directly,
served by any static host, or published with GitHub Pages.

## Run it locally

No build or install needed. From the repo root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Customer Preview

This site is published with **GitHub Pages** (deployed from the `main` branch, root folder).
Once Pages is enabled, the live preview is at:

```
https://john-will-studio.github.io/leweys-general-store/
```

Notes:

- All CSS, JS, image, and asset paths are **relative**, so the site works correctly
  from the project URL above (under the `/leweys-general-store/` subpath).
- After you push a change to `main`, GitHub rebuilds the Pages site automatically;
  give it a minute, then refresh.
- The `<link rel="canonical">` and social-share tags point to the production domain
  (`https://www.leweysgeneralstore.com/`) on purpose — that's the site's real address.
  The GitHub Pages URL above is just for previewing/sharing the work in progress.

### Enabling GitHub Pages (one-time)

In the GitHub repo: **Settings → Pages → Build and deployment → Source: "Deploy from a
branch" → Branch: `main` / `/ (root)` → Save.** The published URL appears at the top of
that page once it builds.

## Project docs

- `context.md` — what the project is and the source-of-truth facts.
- `AGENTS.md` / `CLAUDE.md` / `CODEX.md` — collaboration + working notes for the AI agents.
- `CREDITS.md` — image credits/licensing.
- `agent-notes.md` — running handoff log of changes.
