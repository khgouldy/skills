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
2. **Authored vs. vendored — pick one, up front.** Every skill is either
   *authored* (we maintain the body) or *vendored* (a verbatim copy of an
   upstream, pinned in `skills-lock.json`). Don't blur them: never hand-edit a
   vendored body, and never put an authored skill in the lockfile.
3. **Authored skills: our own prose.** Written here, in our voice — `original`,
   or `no upstream` when an idea came from someone with nothing installable to
   pull. If it draws on someone's idea, say so in the README **Thank Yous**.
4. **Vendored skills: verbatim, never edited.** Pull with
   `node scripts/vendor.mjs`; provenance is the lockfile entry
   (`source` · `skillPath` · `computedHash`), not a footer. To change one, change
   it upstream (or fork it into an authored skill) — don't edit it here.
5. **Keep it composable.** Prefer referencing an existing skill (`/grilling`)
   over duplicating its body.

## Adding an authored skill — checklist

- [ ] Create `skills/<category>/<name>/SKILL.md` with valid frontmatter.
- [ ] `name` matches the folder; `description` is a sharp "Use when…" sentence.
- [ ] Body is in our own voice.
- [ ] Add a row to the catalog table in `README.md` (Source: `original` or
      `authored · no upstream`).
- [ ] If it draws on someone's idea, add a **Thank Yous** line.
- [ ] If it competes with an existing skill over the same prompts, add an
      `evals/<name>.eval.md` with should-fire / should-NOT-fire cases.
- [ ] Run `node scripts/validate-skills.mjs` (frontmatter + invocation-dep rule).

## Vendoring a skill — checklist

A vendored skill is a verbatim upstream copy. We never write its body.

- [ ] Install once with the CLI to mint the lockfile entry, e.g.
      `npx skills add mattpocock/skills -s <name> --copy -y`
      (add `--full-depth` for deeply nested repos like `cursor/plugins`).
- [ ] If `scripts/vendor.mjs` can't reach the source by default, add it to
      `DEEP_SOURCES` there.
- [ ] Run `node scripts/vendor.mjs` to transplant content into
      `skills/<category>/<name>/` and refresh `skills-lock.json`.
- [ ] Add a catalog row in `README.md` (Source: `vendored · <owner>/<repo>`).
- [ ] Credit the source in **Thank Yous**.
- [ ] `node scripts/validate-skills.mjs`. Heads-up: the upstream's frontmatter
      `name` must equal the folder, and its invocation mode comes along verbatim
      (some upstreams are `disable-model-invocation: true`).

## Updating vendored skills

- `node scripts/vendor.mjs --check` — report any upstream drift (CI runs this
  weekly via `.github/workflows/check-upstream-drift.yml`).
- `node scripts/vendor.mjs` — re-pull all vendored skills and refresh the lock.

## Experiments — the `wip/` folder

Drafts and experiments live in top-level `wip/`, **not** under `skills/`. That
keeps them out of the live catalog, out of model invocation, and out of CI until
they're ready. Promote with `git mv wip/<name> skills/<category>/<name>`, then
validate, add a catalog row, and note provenance. See `wip/README.md`.

## Plugin packaging (later)

The repo is structured so it can become an installable Claude Code plugin by
dropping in a `.claude-plugin/` manifest. No restructuring of `skills/` is
required when that day comes.
