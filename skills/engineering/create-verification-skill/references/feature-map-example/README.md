# Tally verification map

Tally is a fictional expense tracker with a web app and a CLI. This directory is
the maintained source for verifying what its users can do. Read this index
before driving the app, then use the matching feature file as the recipe.

## Baseline

- Start Tally with `make dev-verify`, which serves `http://127.0.0.1:4310`
  against a throwaway database named by `TALLY_DB=tally_verify_$RUN_ID`.
- Sign in as `verify@tally.test`. The seed creates two expenses, `Coffee` and
  `Train ticket`.
- Run `scripts/verify-doctor.sh` first. It must report the expected URL, the
  database name for this run, and the current commit.
- Never drive an instance this run did not start.

## Driving conventions

- Begin every recipe from the baseline unless its preconditions say otherwise.
- Find elements by role and accessible name, not by CSS class or position.
- Treat commands as literal. Keep quoted names and flags unchanged.
- Restore the seed after a recipe that changes data.

## Proof

- Capture the user action and the state that results, not only the last screen.
- Web proof is a screenshot plus an accessibility snapshot.
- CLI proof is the command, stdout, stderr, and exit code.
- A change to data also needs a second, read-only view of the stored value.
- Label every artifact with the feature ID and the entry point used.
- Report a path you could not reach with the command you tried and what was
  missing. Do not count it as verified through a different path.

## Feature file shape

Each file opens with an H1 and one paragraph on what the user can do, then these
four H2 sections in order:

1. `Sub-features`: short IDs, one line each.
2. `How to get to it (user POV)`: every entry point.
3. `Driving it with <harness>`: preconditions, then each user action paired
   with the exact command and the result to observe.
4. `Gotchas`: traps that waste or invalidate a run.

## Features

- [Add an expense](./add-expense.md): web form and CLI, validation, persistence.
