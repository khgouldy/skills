#!/usr/bin/env node
// Symlink every skills/<category>/<name>/ into agent skill directories so
// global installs stay in sync with this repo.
//
// Usage:
//   node scripts/link-skills.mjs           # ~/.claude/skills
//   node scripts/link-skills.mjs --dry-run
//   node scripts/link-skills.mjs --also agent-hub
//
// Idempotent: rewrites existing symlinks that point into this repo; refuses to
// clobber a real directory or a symlink that points elsewhere.

import { readdirSync, statSync, lstatSync, readlinkSync, symlinkSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const dryRun = process.argv.includes("--dry-run");
const alsoHub = process.argv.includes("--also") && process.argv.includes("agent-hub");

const targets = [join(homedir(), ".claude", "skills")];
if (alsoHub) {
  // Sibling of this repo: ../agent-hub/skills
  targets.push(resolve(ROOT, "..", "agent-hub", "skills"));
}

function listSkills() {
  const out = [];
  for (const category of readdirSync(SKILLS_DIR)) {
    const catPath = join(SKILLS_DIR, category);
    if (!statSync(catPath).isDirectory()) continue;
    for (const name of readdirSync(catPath)) {
      const skillPath = join(catPath, name);
      if (!statSync(skillPath).isDirectory()) continue;
      if (!existsSync(join(skillPath, "SKILL.md"))) continue;
      out.push({ name, path: skillPath });
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

const norm = (p) => resolve(p).toLowerCase();
const skillsRoot = norm(SKILLS_DIR);

function ensureLink(destDir, name, srcPath) {
  const dest = join(destDir, name);
  const srcNorm = norm(srcPath);
  let action = "create";
  try {
    const st = lstatSync(dest);
    if (st.isSymbolicLink()) {
      const cur = readlinkSync(dest);
      const curResolved = resolve(dirname(dest), cur);
      if (norm(curResolved) === srcNorm || norm(cur) === srcNorm) return "ok";
      // Replace only if it already points into this repo's skills tree
      if (norm(curResolved).startsWith(skillsRoot) || cur.includes("/skills/skills/")) {
        action = "relink";
        if (!dryRun) unlinkSync(dest);
      } else {
        return `skip (symlink → ${cur})`;
      }
    } else if (st.isDirectory()) {
      return "skip (real directory)";
    } else {
      return "skip (file)";
    }
  } catch {
    // missing or broken symlink
    try {
      if (!dryRun) unlinkSync(dest);
      action = "relink";
    } catch {
      action = "create";
    }
  }
  if (!dryRun) symlinkSync(srcPath, dest);
  return action;
}

const skills = listSkills();
console.log(`${dryRun ? "[dry-run] " : ""}Linking ${skills.length} skills…`);

let created = 0;
let ok = 0;
let skipped = 0;
for (const destDir of targets) {
  if (!existsSync(destDir)) {
    console.warn(`  ! missing target dir: ${destDir}`);
    continue;
  }
  console.log(`\n→ ${destDir}`);
  for (const { name, path: srcPath } of skills) {
    const result = ensureLink(destDir, name, srcPath);
    if (result === "ok") {
      ok++;
    } else if (result === "create" || result === "relink") {
      created++;
      console.log(`  ${result}: ${name}`);
    } else {
      skipped++;
      console.log(`  ${result}: ${name}`);
    }
  }
}

console.log(`\nDone. create/relink=${created} ok=${ok} skip=${skipped}${dryRun ? " (dry-run)" : ""}`);
