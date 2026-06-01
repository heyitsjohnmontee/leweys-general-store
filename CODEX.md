# CODEX.md

Operational context for Codex GPT-5.5 in this repo. Read this after `AGENTS.md`,
`context.md`, and `agent-notes.md`.

## Snapshot

This is a framework-free static rebuild of Lewandowski's General Store's
Squarespace site. The site is intentionally plain HTML/CSS/JS so it can remain
portable and GitHub Pages-compatible.

- `index.html` is the single page: header, hero, newsletter, static social feed,
  visit/contact, and footer.
- `styles.css` is the only stylesheet. It is mobile-first and uses CSS variables
  for the warm paper background, brick-red accent, typography, spacing, and radius.
- `main.js` is minimal vanilla JS: footer year, mobile menu toggle, and a
  front-end-only newsletter acknowledgement.
- `assets/` contains local images. Do not hotlink Squarespace CDN assets in
  shipped code.
- `reference/` contains raw live-site snapshots for lookup only. It is gitignored
  and should not be shipped.

## Working Rules

- Preserve the no-build, no-framework setup unless John explicitly agrees to a
  larger change.
- Avoid external CDN dependencies in shipped files; keep fonts as system fonts or
  add local assets. The one approved exception is the free, key-less OpenStreetMap
  `<iframe>` in "Find us downtown" (documented in `context.md`). Don't add others
  without John's OK.
- Treat the newsletter and cart as placeholders unless a real provider or checkout
  has been chosen.
- Keep changes small and focused. This repo has no test suite, so the useful check
  is serving the page and inspecting the changed area in a browser.
- Be careful with uncommitted work. Run `git status --short` before editing and do
  not overwrite another agent's changes.

## Commands

```bash
git status --short
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Environment Notes

- WSL path: `/mnt/f/John/Code/lewandowskis-sp`
- Windows path: `F:\John\Code\lewandowskis-sp`
- There is no package manifest, build step, or formal test command.
- `node` and `gh` may not be available in the WSL shell; prefer plain `git` and
  the static Python server.

## Current Improvement Backlog

- Wire the newsletter to a real provider.
- Decide whether the cart stays a placeholder or becomes real commerce.
- Replace the static social grid only if a maintainable feed approach is chosen.
- Add proper favicon/OG image assets.
- Watch for accidental external references when editing `index.html`; shipped
  code should stay self-contained.
