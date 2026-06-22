#!/usr/bin/env node
// Validates every skills/<category>/<name>/SKILL.md against the repo convention.
// Dependency-free: parses just the YAML frontmatter we care about (name, description).
// Exits non-zero (and prints what's wrong) if anything is off, so CI can gate on it.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SKILLS_DIR = "skills";
const errors = [];

function fail(file, msg) {
  errors.push(`${file}: ${msg}`);
}

// Pull the first --- ... --- frontmatter block and return its raw lines.
function frontmatterLines(text, file) {
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
  return lines.slice(1, end);
}

// Read a top-level `key: value` from frontmatter lines (good enough for our flat schema).
function field(lines, key) {
  const prefix = `${key}:`;
  const line = lines.find((l) => l.startsWith(prefix));
  if (!line) return undefined;
  return line.slice(prefix.length).trim().replace(/^["']|["']$/g, "");
}

function validateSkill(category, name) {
  const file = join(SKILLS_DIR, category, name, "SKILL.md");
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    fail(join(SKILLS_DIR, category, name), "directory has no SKILL.md");
    return;
  }

  const fm = frontmatterLines(text, file);
  if (!fm) return;

  const nameField = field(fm, "name");
  const description = field(fm, "description");

  if (!nameField) fail(file, "frontmatter missing `name`");
  else if (nameField !== name)
    fail(file, `name "${nameField}" must match folder "${name}"`);

  if (!description) fail(file, "frontmatter missing `description`");
  else if (description.length < 20)
    fail(file, `description is too short (${description.length} chars) to be a useful trigger`);
}

const categories = readdirSync(SKILLS_DIR).filter((c) =>
  statSync(join(SKILLS_DIR, c)).isDirectory(),
);

let count = 0;
for (const category of categories) {
  const dir = join(SKILLS_DIR, category);
  for (const name of readdirSync(dir)) {
    if (!statSync(join(dir, name)).isDirectory()) continue;
    count++;
    validateSkill(category, name);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found in ${count} skill(s):\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ ${count} skills valid.`);
