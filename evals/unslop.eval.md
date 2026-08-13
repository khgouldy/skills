# Eval: unslop

Guards AI-tell cleanup in **prose** vs **code**. `unslop` is docs, PR
descriptions, READMEs, comments-as-writing, release notes. Code structure,
defensive guards, `any` casts, nested ifs are `deslop`.

## Should fire
- "make this README sound less like it was written by AI"
- "tighten the prose in this PR description"
- "unslop this design doc"
- "rewrite the release notes so they don't read as machine-generated"
- "strip the AI voice from this user-facing error message"

## Should NOT fire
- "deslop this branch — remove the any casts and nested ifs" — _expected: deslop_
- "clean up the useless comments and over-defensive try/catch in the diff" — _expected: deslop_
- "this function returns the wrong value, find the bug" — _expected: diagnosing-bugs_
- "open a PR with a good description" — _expected: create-pr_ (then unslop only if prose is the ask)
- "we keep re-explaining the same style rule to agents" — _expected: feedback-to-infrastructure_
