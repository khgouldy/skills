#!/usr/bin/env node
// Validates every skills/<category>/<name>/SKILL.md against the repo convention.
// Dependency-free: parses just the YAML frontmatter we care about.
//
// Two kinds of check:
//   1. Frontmatter — name matches folder, description present and non-trivial.
//   2. Invocation dependency — a user-invoked skill must not *invoke* another
//      user-invoked skill (the agent can't see a user-invoked target to resolve
//      it, so the instruction dangles). See CONTEXT.md and writing-great-skills.
//
// Exits non-zero (and prints what's wrong) if anything is off, so CI can gate.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = "skills";
const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

// Pull the first --- ... --- frontmatter block; return { lines, body } or null.
function parse(text, file) {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== "---") {
    fail(file, "missing YAML frontmatter (file must start with '---')");
    return null;
  }
  const end = lines.indexOf("---", 1);
  if (end === -1) {
    fail(file, "frontmatter is not closed with a second '---'");
    return null;
  }
  return { fm: lines.slice(1, end), body: lines.slice(end + 1) };
}

// Read a top-level `key: value` from frontmatter lines (flat schema only).
function field(lines, key) {
  const line = lines.find((l) => l.startsWith(`${key}:`));
  if (!line) return undefined;
  return line.slice(key.length + 1).trim().replace(/^["']|["']$/g, "");
}

// ---- Pass 1: scan every skill into a registry -----------------------------

const registry = new Map(); // name -> { category, file, mode, body }

for (const category of readdirSync(SKILLS_DIR).filter((c) => statSync(join(SKILLS_DIR, c)).isDirectory())) {
  const dir = join(SKILLS_DIR, category);
  for (const name of readdirSync(dir)) {
    if (!statSync(join(dir, name)).isDirectory()) continue;
    const file = join(dir, name, "SKILL.md");
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      fail(join(dir, name), "directory has no SKILL.md");
      continue;
    }
    const parsed = parse(text, file);
    if (!parsed) continue;

    const nameField = field(parsed.fm, "name");
    const description = field(parsed.fm, "description");
    const mode = field(parsed.fm, "disable-model-invocation") === "true" ? "user" : "model";

    if (!nameField) fail(file, "frontmatter missing `name`");
    else if (nameField !== name) fail(file, `name "${nameField}" must match folder "${name}"`);
    if (!description) fail(file, "frontmatter missing `description`");
    else if (description.length < 20)
      fail(file, `description is too short (${description.length} chars) to be a useful trigger`);

    registry.set(name, { category, file, mode, body: parsed.body });
  }
}

// ---- Pass 2: invocation-dependency rule -----------------------------------
// Flag a user-invoked skill whose body *invokes* (not merely links to) another
// user-invoked skill. We treat a line as an invocation when it carries an
// imperative cue (run / invoke / launch / start) AND references a skill — either
// as a [text](.../<name>/SKILL.md) link or a /slash-command. Plain "pairs with"
// links carry no cue word, so they're correctly ignored.

const INVOKE_CUE = /\b(run|invoke|launch|start)\b/i;
const LINK_REF = /\(([^)]*?\/)?([a-z0-9][a-z0-9-]*)\/SKILL\.md\)/gi;
const SLASH_REF = /(?:^|[\s(`])\/([a-z][a-z0-9-]+)/g;

for (const [name, skill] of registry) {
  if (skill.mode !== "user") continue;
  for (const line of skill.body) {
    if (!INVOKE_CUE.test(line)) continue;
    const targets = new Set();
    for (const m of line.matchAll(LINK_REF)) targets.add(m[2]);
    for (const m of line.matchAll(SLASH_REF)) targets.add(m[1]);
    for (const target of targets) {
      if (target === name) continue;
      const dep = registry.get(target);
      if (dep && dep.mode === "user")
        fail(
          skill.file,
          `user-invoked skill invokes user-invoked "${target}" — the agent can't ` +
            `resolve a hidden target. Make "${target}" model-invoked, or don't invoke it here.`,
        );
    }
  }
}

// ---- Report ----------------------------------------------------------------

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found in ${registry.size} skill(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${registry.size} skills valid (frontmatter + invocation deps).`);
