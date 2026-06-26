# Eval: deslop

Guards the slop-cleanup boundary. `deslop` cleans AI tells out of **code** (stray
comments, defensive try/catch on trusted paths, `any` casts, deep nesting).
`unslop` cleans AI tells out of **prose** (docs, PR descriptions, reports). The
split is code vs. writing.

## Should fire (deslop)
- "clean up the AI cruft in this diff before I open the PR"
- "deslop this branch — remove the over-defensive checks and the any casts"
- "this code has a bunch of useless comments and nested ifs, tidy it"
- "self-review pass: strip anything an experienced engineer wouldn't have written"

## Should NOT fire (→ unslop or other)
- "make this README sound less like it was written by AI" — _expected: unslop_
- "tighten the prose in this PR description" — _expected: unslop_
- "rewrite this design doc so it doesn't read as machine-generated" — _expected: unslop_
- "this function returns the wrong value, find the bug" — _expected: diagnosing-bugs_
- "is there a cheaper algorithm here?" — _expected: none (perf/review)_
