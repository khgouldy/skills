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
  model invocation is the default. The cost: a model-invoked description is
  loaded into the agent's context so it can match against it — every one of them
  spends tokens. Keep descriptions tight.
- **User-invoked** — the human runs it explicitly as a slash command
  (`/skill-name`). Marked with `disable-model-invocation: true`. Its description
  is **excluded from the agent's manifest**, so the agent cannot see or fire it —
  only a human can. Saves context tokens, but shifts discovery onto the human's
  memory. Use for skills that should only run on demand (interactive sessions,
  expensive or intrusive operations).

### The dependency rule (important)

Because a user-invoked skill's description is hidden from the agent:

- A user-invoked skill **may** invoke a *model-invoked* skill (the agent can see
  the target and resolve it).
- A user-invoked skill **may not** invoke another *user-invoked* skill — the
  agent can't see the target to fire it, so the instruction dangles.

So when a user-invoked "wrapper" skill composes a reusable "engine" skill, the
engine must be **model-invoked**. (This is why `grilling` is model-invoked even
though you usually run it on demand: the user-invoked `grill-with-docs` composes
it.)

A reader-facing "pairs with" link is *not* an invocation — it's documentation,
and is fine between any two skills.

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
