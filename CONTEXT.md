# Context — Shared Vocabulary

A small glossary so the docs, skills, and commit messages all mean the same thing.

## Skill

A self-contained unit of reusable agent behavior. Physically, a folder under
`skills/<category>/<skill-name>/` containing a `SKILL.md` file. The `SKILL.md`
holds YAML frontmatter (`name`, `description`, optional flags) followed by a
Markdown body of instructions the agent follows when the skill is active.

## Invocation modes

- **Model-invoked** — Claude decides to fire the skill on its own, based on the
  `description`. These are the workhorses. Their `description` is the entire
  trigger surface, so it must be sharp and specific. No special flag is needed;
  model invocation is the default.
- **User-invoked** — the human runs it explicitly as a slash command
  (`/skill-name`). Marked with `disable-model-invocation: true` so Claude won't
  fire it automatically. Use for skills that should only run on demand.

## Categories

We mirror the convention popularized by Matt Pocock's skills repo:

- **engineering** — craft discipline applied to code: testing, debugging,
  concurrency, methodology.
- **productivity** — how work gets shaped and moved: planning, interrogation,
  handoffs.
- **misc** — everything else, including meta-skills (skills about skills) and
  repo hygiene.

## Composition

Skills can call other skills. A small skill is often just a directive that
chains two larger ones (e.g. `grill-with-docs` = `grilling` + doc capture).
Prefer composing existing skills over duplicating their content.

## Provenance

Every skill records where it came from. Ported or inspired-by skills carry an
`_inspired-by` note at the bottom of their `SKILL.md`, and the source is
credited in the README **Thank Yous**. Original skills are marked as such.
