# wip — work in progress

A staging area for skills that aren't ready yet. Drafts, experiments, and
half-formed ideas live here while you try them out.

## Why it's outside `skills/`

Anything under `skills/` is a live skill: it's part of the catalog, can be
model-invoked, and is checked by CI (`scripts/validate-skills.mjs`). This folder
is deliberately **not** under `skills/`, so:

- experiments don't get auto-invoked before they're ready,
- incomplete frontmatter won't fail the build,
- you can iterate freely without polluting the real library.

## Layout

Drop a folder per experiment. The same `SKILL.md` shape is encouraged so
promotion is a clean move, but nothing here is enforced:

```
wip/
└── my-experiment/
    └── SKILL.md
```

## Promoting a skill

When an experiment proves itself:

1. Move it to the right category: `git mv wip/<name> skills/<category>/<name>`.
2. Make sure the frontmatter is valid — `name` matches the folder, a sharp
   `description`. Run `node scripts/validate-skills.mjs`.
3. Add a row to the catalog in the top-level `README.md`.
4. If it's inspired by someone, add the `_inspired-by` note + a Thank Yous line.

See [`CLAUDE.md`](../CLAUDE.md) and [`writing-great-skills`](../skills/misc/writing-great-skills/SKILL.md)
for the conventions.
