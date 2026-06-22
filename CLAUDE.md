# CLAUDE.md — Working in this repo

This repository is a library of Claude Code **skills**. If you are editing or
adding skills here, follow these conventions.

## Layout

```
skills/<category>/<skill-name>/SKILL.md
```

Categories are `engineering`, `productivity`, and `misc`. See `CONTEXT.md` for
what each means and for the shared vocabulary.

## SKILL.md format

Every skill is a folder containing a single `SKILL.md`:

```yaml
---
name: skill-name              # kebab-case, matches the folder name
description: <one sharp sentence describing WHEN to use this skill>
disable-model-invocation: true   # OPTIONAL — only for user-invoked slash commands
---

# Skill Title

<body: the instructions Claude follows when this skill is active>
```

- `name` **must** equal the folder name.
- `description` is the trigger surface for model-invoked skills. Write it so
  Claude can tell from the description alone whether the skill applies. Lead
  with "Use when…" and include concrete trigger phrases where helpful.
- Omit `disable-model-invocation` for model-invoked skills (the default).

## Authoring rules

1. **One purpose per skill.** If a skill is doing two things, split it or make
   it a composition that chains two smaller skills.
2. **Write our own prose.** When a skill is inspired by someone else's, capture
   the idea in our own words — do not copy text. Add an `_inspired-by` note at
   the bottom and credit the source in the README **Thank Yous**.
3. **Record provenance.** End each skill with a short note: original, vendored,
   or inspired-by (with a link).
4. **Keep it composable.** Prefer referencing an existing skill (`/grilling`)
   over duplicating its body.

## Adding a skill — checklist

- [ ] Create `skills/<category>/<name>/SKILL.md` with valid frontmatter.
- [ ] `name` matches the folder; `description` is a sharp "Use when…" sentence.
- [ ] Body is in our own voice; provenance note at the bottom.
- [ ] Add a row to the catalog table in `README.md`.
- [ ] If it's a port/inspiration from a new source, add a **Thank Yous** line.

## Experiments — the `wip/` folder

Drafts and experiments live in top-level `wip/`, **not** under `skills/`. That
keeps them out of the live catalog, out of model invocation, and out of CI until
they're ready. Promote with `git mv wip/<name> skills/<category>/<name>`, then
validate, add a catalog row, and note provenance. See `wip/README.md`.

## Plugin packaging (later)

The repo is structured so it can become an installable Claude Code plugin by
dropping in a `.claude-plugin/` manifest. No restructuring of `skills/` is
required when that day comes.
