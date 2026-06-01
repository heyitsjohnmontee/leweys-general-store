# Agent Collaboration Rules

This repo is worked on by **two AI agents as equal collaborators**:

- **Claude** (Claude Code)
- **Codex** (GPT-5.5)

Plus the owner, **John** (`john-will-studio`).

There is no fixed architect/implementer split — either agent may plan, implement,
review, or test. Coordination happens through `agent-notes.md` and git, not through
roles.

## Workflow

1. Start by reading this file, `context.md`, and `agent-notes.md`.
2. Run `git status` before editing — see who touched what.
3. For anything non-trivial, write a short plan in `agent-notes.md` first.
4. Make small, focused changes with minimal diffs.
5. Preview your change (see Commands) before claiming it works.
6. Update `agent-notes.md` with the handoff (below) when you stop.

## Only one agent edits at a time

- Do **not** overwrite another agent's uncommitted work.
- If `git status` shows unexpected uncommitted changes, stop and note it in
  `agent-notes.md` rather than clobbering them.
- Prefer committing your own work before handing off so the tree is clean.

## Handoff Protocol

When you stop or hand work to the other agent, append an entry to `agent-notes.md`:

- **Date / agent** — who you are and when.
- **Current goal** — what you were trying to do.
- **Files changed** — what you touched.
- **Commands run** — especially anything with side effects.
- **Verified** — what you actually checked (and how), vs. what's assumed.
- **Open questions** — decisions that need John or the other agent.
- **Next step** — the single most useful thing to do next.

## Safety Rules

- Check `git status` before editing.
- Do not run destructive commands (`git reset --hard`, `rm -rf`, force-push)
  without explicit approval from John.
- Do not change secrets, `.env*` files, or deployment config without asking.
- Commit and push **only when John asks**, or as the agreed handoff step.
- Keep shipped code dependency-free and free of external CDN links (see `context.md`).

## Commands

```bash
# See the working tree state before editing
git status

# Preview the site locally (no build step) — then open http://localhost:8000
python3 -m http.server 8000

# Refresh the reference snapshot of the live Squarespace site (gitignored)
curl -sSL -A "Mozilla/5.0" https://www.leweysgeneralstore.com/ -o reference/index.html
```

There is no build system and no formal test suite. The smallest useful check is to
serve the site and load the page; verify the section you changed and watch the
browser console for errors.
