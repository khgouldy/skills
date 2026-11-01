# grok-bot/ — mirror of Grok Bot user-created skills

This folder is a **read-only mirror** of keving's user-created Grok Bot skills,
which live on the Grok Bot box at `/home/box/agent-data/workflows/<skill>/SKILL.md`.
The box is the source of truth; edit skills there (via Grok Bot), not here.

It sits outside `skills/`, so `scripts/validate-skills.mjs` and
`scripts/link-skills.mjs` ignore it — these are Grok Bot skills, not Claude Code ones.

## Layout
One folder per skill, copied verbatim: `grok-bot/<skill-name>/SKILL.md` (+ any helper files).

## Syncing
Run from a machine that can see the box workflows dir (the box itself, or a copy of it):

```bash
scripts/sync-grok-bot.sh /path/to/workflows   # default: /home/box/agent-data/workflows
```

From the Mac mini, a Grok Bot agent copies the workflows over (CopyFromBox) into a
temp dir, then runs the script against it. The script rsyncs each skill folder
into `grok-bot/` on a non-main branch (`SKILL.md` only, with a warning for every other file skipped; no dotfiles, env/key files or symlinks; no deletions of skills removed upstream — prune by hand),
skips box-internal files like `.library-fingerprint`, and commits if anything changed.

Provenance: original (keving's Grok Bot skills).

Note: mirrored skills are copied verbatim. Any rule conflicts between them (e.g. merge
policy in `bead-dispatch-sop` vs `feature-pipeline`) must be fixed on the box, not here.
