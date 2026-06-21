# Design — Personal Skills Repository

**Date:** 2026-06-21
**Status:** Approved, implemented

## Purpose

A personal, shareable library of Claude Code skills — partly ported/inspired by
public skill repos (Matt Pocock, Jeffrey), partly original skills distilled from
Kevin's own working style. Public GitHub repo named `skills`.

## Decisions (locked)

- **Distribution:** Plain `skills/` layout, structured so a `.claude-plugin/`
  manifest can be added later with zero restructuring. Decide plugin packaging
  later.
- **Categories:** Mirror Matt Pocock's scheme — `engineering`, `productivity`,
  `misc`.
- **Repo name:** `skills`. License: MIT.
- **Attribution:** Skills are written in our own voice (no verbatim copying).
  Each ported/inspired skill carries an `_inspired-by` note; sources are credited
  in a running **Thank Yous** section in the README.

## Structure

```
skills/
├── README.md            # what it is, install, catalog, Thank Yous
├── CLAUDE.md            # conventions for editing the repo
├── CONTEXT.md           # shared vocabulary
├── LICENSE              # MIT
├── .gitignore
├── docs/superpowers/specs/   # design docs (this file)
└── skills/
    ├── engineering/
    │   ├── tdd/
    │   ├── diagnosing-bugs/
    │   ├── finding-concurrency-bugs/
    │   ├── metamorphic-testing/
    │   ├── recon-before-action/
    │   └── fixing-and-merging-prs/
    ├── productivity/
    │   ├── grilling/
    │   ├── grill-with-docs/
    │   ├── handoff/
    │   └── boil-the-ocean/
    └── misc/
        └── writing-great-skills/
```

## Seed skills (11) and provenance

| Skill | Category | Source |
|---|---|---|
| grilling | productivity | inspired by Matt Pocock |
| grill-with-docs | productivity | inspired by Matt Pocock |
| handoff | productivity | inspired by Matt Pocock |
| boil-the-ocean | productivity | original (Kevin) |
| tdd | engineering | inspired by Matt Pocock |
| diagnosing-bugs | engineering | inspired by Matt Pocock |
| finding-concurrency-bugs | engineering | inspired by Jeffrey |
| metamorphic-testing | engineering | inspired by Jeffrey |
| recon-before-action | engineering | original (Kevin) |
| fixing-and-merging-prs | engineering | original (Kevin, vendored) |
| writing-great-skills | misc | inspired by Matt Pocock |

## Skill file convention

`skills/<category>/<name>/SKILL.md` with YAML frontmatter (`name`,
`description`, optional `disable-model-invocation`) and a Markdown body. See
`CLAUDE.md` for the full authoring rules.

## Out of scope (for now)

- Plugin/marketplace manifest.
- CI validation of skill frontmatter.
- Changesets / versioning.

These are easy follow-ons once the library has momentum.
