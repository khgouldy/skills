---
name: create-verification-skill
description: Use when a project has no scripted way for an agent to launch the real app, use a feature the way a user would, and capture proof — "make a verification skill for this repo", "teach agents how to run and drive this app", /create-verification-skill. Generates a project-local verify-<app> skill plus a feature map. Not for a one-off UI check (control-ui) or for judging whether evidence matches a claim (definition-of-done).
disable-model-invocation: true
---

# Create a verification skill

Agents report success whether or not the feature works. The fix is a
project-local skill that tells any agent how to start this app, drive it like a
user, and capture evidence. This skill writes that skill. Its reader is an agent
arriving cold, mid-task, that has never seen the app.

Output goes to `.claude/skills/verify-<app>/` in the project (or wherever the
project keeps its skills).

## 1. Interview the repo, not the user

Answer from the codebase. Ask the user only what you cannot observe.

- **Surface.** What does a user touch: web UI, mobile app, CLI, API, desktop
  app? Pick the primary surface and list the others.
- **Run.** The repo's own documented dev command. Note ports, env vars, seed
  data, and how to sign in as a test user.
- **Drive.** Existing harnesses first: e2e specs, a debug port, curl-able
  endpoints, a simulator CLI. Only then a generic one: a browser driver for web,
  the simulator's accessibility tree for mobile, tmux for a CLI or TUI, plain
  HTTP for a service.
- **Observe.** What counts as evidence here: screenshots, accessibility
  snapshots, response bodies, logs, exit codes, database rows.
- **Isolate.** Whether two instances can run side by side (ports, data dirs,
  profiles). If they cannot, the generated skill must say so and refuse to drive
  an instance it did not start.

If the checkout does not build or start, fix that or report it exactly before
generating anything. A skill written against a broken base teaches wrong steps.

## 2. Write the skill

`verify-<app>/SKILL.md` needs frontmatter (`name`, and a `description` naming
the app, the surface, and when to reach for it) and these sections. Every
command and selector comes from this repo. Leave no placeholders.

- **Launch.** The exact start command, the signal that it is ready (a log line,
  a port answering), and teardown. A short-lived CLI has no server: build once,
  then run each drive in its own tmux session.
- **Doctor.** One read-only check that answers "is this instance worth
  driving?": process up, expected build, port owned by this run, auth valid.
  Agents run it first whenever something looks off.
- **Drive.** The harness recipe with real handles. Prefer accessible names,
  data attributes, prompt strings, and route paths over coordinates.
- **Evidence.** What to capture and where it goes. State the standard: use the
  real user path, not internal setters or test-only endpoints; capture the
  action and the resulting state; check side effects (rows written, messages
  sent) as well as what is on screen. If the safe path is a dry-run or test
  mode, observe what it skips instead of trusting its name.
- **Cleanup.** Stop what this run started and nothing else. Never kill by
  process name. Evidence survives cleanup at the location the skill names.
- **Helpers.** Any script the skill ships is executable, and the skill body
  shows how to call it.

## 3. Seed the feature map

Create `verify-<app>/features/README.md` and one file per user-facing feature.
Begin with the three to five that matter most, found from routes, commands,
menus, or docs. Follow the shape in
[`references/feature-map-example/`](references/feature-map-example/).

Each feature file answers, from the user's side: what the feature is, every way
to reach it, how to drive it with the harness, and what observable end state
proves it works. Keep implementation detail out. A proof that used one
convenient entry point is incomplete when the map lists others.

## 4. Prove it before handing it over

Follow the generated instructions yourself once, end to end: launch, doctor,
drive one mapped feature, capture evidence, clean up. Then confirm the evidence
still exists where the skill says it is. Fix what fails, and run cleanup after
every failed attempt so nothing strands a port or a process. A generated skill
nobody has executed is a draft.

## 5. Keep it honest

The feature map goes stale as soon as the app changes. Tell the user that
`/maintain-verification-skill` is the upkeep pass and that it works well on a
daily schedule.

## Red flags

- A selector, port, or command copied from an example instead of this repo
- "Verified" by calling an internal function or seeding the database directly
- A doctor check that writes anything
- Cleanup that deletes the screenshots it just took
- A feature file that explains the code instead of the user's path

---

_Inspired by Lauren Tan's create-verification-skill in the MIT-licensed [pstack](https://github.com/cursor/plugins/tree/main/pstack) plugin for Cursor. Prose is our own, retargeted at Claude Code project skills._
