---
name: resolve-merge-conflicts
description: Use when a merge, rebase, or cherry-pick stops on conflicts and you need to resolve them correctly — understand both sides' intent before picking, never blindly accept one side. Triggers include "fix the merge conflicts", "this rebase is conflicting", conflict markers in files, or a PR that can't merge because it's behind.
---

# Resolve Merge Conflicts

A conflict means two changes touched the same place and git can't decide which
intent wins. Your job is to produce a result that honors *both* intents — not to
make the markers disappear. The dangerous failure is a clean-looking resolution
that silently drops one side's change.

## The method

1. **Know which operation you're in.** `merge`, `rebase`, and `cherry-pick`
   label "ours" and "theirs" differently — during a rebase, "ours" is the branch
   you're replaying *onto*, which is the opposite of a plain merge. Check
   `git status` so you don't reason backwards.

2. **Understand both sides before touching anything.** For each conflicted hunk,
   find out *why* each side changed it: `git log` / `git blame` on both branches,
   read the surrounding code. A conflict is a disagreement between two
   intentions; you can't reconcile intentions you haven't read.

3. **Resolve by intent, not by side.** The correct result is often *neither* a
   clean "ours" nor "theirs" but a combination: keep this side's rename *and*
   that side's new field. Blindly `--ours`/`--theirs` is the most common way to
   lose work.

4. **Watch for semantic conflicts git can't see.** Code can merge cleanly and
   still be broken — one side renamed a function, the other added a new caller of
   the old name in a non-conflicting hunk. After resolving the textual conflicts,
   build and run the tests.

5. **Remove every marker, verify, then continue.** Confirm no `<<<<<<<`,
   `=======`, `>>>>>>>` remain, compile/lint/test, then
   `git add` the files and `git rebase --continue` / `git merge --continue`.

## Red flags — STOP

- "I'll just accept incoming to make it merge" → **you're probably deleting the
  other side's work.** Resolve by intent.
- "The file has no markers now, so it's done" → **markers gone ≠ correct.** Run
  the tests; check for semantic conflicts.
- "I don't know why theirs changed this, but I'll keep mine" → **go read the
  history first.** Guessing on a conflict ships a bug.
- Resolving a huge tangled conflict in one pass → consider aborting
  (`git rebase --abort`) and redoing it in smaller steps, or rebasing onto an
  intermediate point.

## If you're in a multi-agent repo

Before resolving conflicts on a shared branch, confirm no other agent owns it
(see [fixing-and-merging-prs](../fixing-and-merging-prs/SKILL.md)'s ownership
gate). Force-pushing a rebased branch out from under another agent is its own
kind of conflict.

---

_Inspired by Warp's resolve-merge-conflicts skill (https://github.com/warpdotdev/common-skills). Prose is our own._
