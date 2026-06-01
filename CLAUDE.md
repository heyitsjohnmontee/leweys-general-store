# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in
this repository.

## What this is

A clean, framework-free static rebuild of **Lewandowski's General Store**'s website
(a general store in Southern Pines, NC). The live site is on Squarespace; this repo
reimplements it as hand-editable HTML/CSS/JS so it can live in git and be improved.
See `context.md` for the full project brief and `AGENTS.md` for the collaboration
rules (Claude and Codex GPT-5.5 work here as equal collaborators).

## Environment

- Developed on **Windows via WSL**. Repo path: `/mnt/f/John/Code/lewandowskis-sp`
  (`F:\John\Code\lewandowskis-sp` on Windows).
- **`node` and `gh` are NOT available in the WSL shell** (Node is installed Windows-side
  only). Use **`python3 -m http.server`** to preview and plain **`git`** (not `gh`) for
  GitHub operations.
- **GitHub:** remote `origin` =
  `git@github.com:john-will-studio/leweys-general-store.git`. SSH auth already works as
  `john-will-studio` via `~/.ssh/id_ed25519` (the key set up for `F:\John\Code\gnt`;
  the GitHub account was renamed from `heyitsjohnmontee`).
- No package manifest, build step, or test suite — it's static files served as-is.

## Project layout

```
index.html      Single page: header · hero · newsletter · social feed · visit/contact · footer
styles.css      One stylesheet; CSS variables for brand colors/fonts; mobile-first
main.js         Vanilla JS: mobile menu toggle, newsletter stub, footer year
assets/         logo.png + gallery/photo-NN.jpeg (local copies — no CDN dependency)
reference/      Raw curl snapshot of the live Squarespace page (GITIGNORED, reference only)
AGENTS.md       Two-agent collaboration rules + handoff protocol
context.md      Project brief / source of truth
agent-notes.md  Running handoff log between sessions/agents
```

## Running / previewing

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

No build step. Edit a file, refresh the browser. Verify the section you changed and
check the browser console for errors before claiming a change works.

## Conventions & gotchas

- **Minimal external deps, no frameworks** in shipped code — keep it portable static
  (hosting is undecided; must stay GitHub Pages-compatible). Fonts are system fonts.
  The one approved exception is the free, key-less **OpenStreetMap `<iframe>`** in the
  "Find us downtown" section (see `context.md`). Don't add other CDNs/trackers without asking.
- **`reference/` is gitignored** — never commit it and never ship its Squarespace markup.
  It exists only to look up original copy and asset URLs.
- The live site's images come from `images.squarespace-cdn.com`; the localized copies in
  `assets/` were pulled from there. To add more, download into `assets/` rather than
  hotlinking the CDN.
- The **newsletter** and **cart** are front-end stubs — there's no backend yet. Don't
  imply they work end-to-end.
- This repo's mount can drop `wget --mirror` output silently; prefer `curl -o` for fetches.

## Workflow (shared with Codex)

Before starting work:

1. Read `AGENTS.md`, `context.md`, and `agent-notes.md`.
2. Run `git status`.
3. Make small, focused changes; preview locally.
4. Update `agent-notes.md` with the handoff entry when you stop.

Commit/push only when John asks or as the agreed handoff step. End commit messages with
the required `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer.
