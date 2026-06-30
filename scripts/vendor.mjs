#!/usr/bin/env node
// Re-vendors every skill tracked in skills-lock.json from its upstream, placing
// the verbatim content into this repo's canonical skills/<category>/<name>/ layout.
//
// Why this exists: `npx skills` installs into agent dirs (.claude/, .agents/, …),
// not our categorized library. So we vendor with the CLI into a temp dir, then
// transplant the content here and keep the CLI-generated hashes in skills-lock.json.
// `npx skills update` recomputes those hashes from upstream HEAD, which is how we
// detect drift — see --check.
//
// Usage:
//   node scripts/vendor.mjs            Refresh content + skills-lock.json from upstream.
//   node scripts/vendor.mjs --check    Report drift only; change nothing; exit 1 on drift.
//
// Dependency-free (Node built-ins only), to match validate-skills.mjs.

import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHECK = process.argv.includes("--check");
const SKILLS_DIR = "skills";
const LOCK = "skills-lock.json";

// Sources whose skills are nested deep enough that the CLI needs --full-depth.
const DEEP_SOURCES = new Set(["cursor/plugins"]);

// Find the local folder skills/<category>/<name> for a skill name (folders == names).
function localDir(name) {
  for (const category of readdirSync(SKILLS_DIR)) {
    const catDir = join(SKILLS_DIR, category);
    if (!statSync(catDir).isDirectory()) continue;
    const dir = join(catDir, name);
    try {
      if (statSync(dir).isDirectory()) return dir;
    } catch {
      /* not here */
    }
  }
  return null;
}

const lock = JSON.parse(readFileSync(LOCK, "utf8"));
const skills = lock.skills ?? {};

// Group skill names by upstream source so each source clones once.
const bySource = new Map();
for (const [name, entry] of Object.entries(skills)) {
  if (!bySource.has(entry.source)) bySource.set(entry.source, []);
  bySource.get(entry.source).push(name);
}

const tmp = mkdtempSync(join(tmpdir(), "skills-vendor-"));
const drifted = [];
let refreshed = 0;

try {
  for (const [source, names] of bySource) {
    const args = ["-y", "skills@latest", "add", source, "--copy", "-y"];
    if (DEEP_SOURCES.has(source)) args.push("--full-depth");
    for (const n of names) args.push("-s", n);
    console.log(`↓ ${source} (${names.length}): ${names.join(", ")}`);
    execFileSync("npx", args, { cwd: tmp, stdio: "ignore" });
  }

  const freshLock = JSON.parse(readFileSync(join(tmp, LOCK), "utf8")).skills ?? {};

  for (const [name, entry] of Object.entries(skills)) {
    const fresh = freshLock[name];
    if (!fresh) {
      console.warn(`  ! ${name}: not returned by upstream re-fetch — skipping`);
      continue;
    }
    const changed = fresh.computedHash !== entry.computedHash;
    if (changed) drifted.push(name);

    if (CHECK) continue;

    const dest = localDir(name);
    const src = join(tmp, ".agents", "skills", name);
    if (!dest) {
      console.warn(`  ! ${name}: no local folder under skills/*/ — skipping transplant`);
      continue;
    }
    rmSync(dest, { recursive: true, force: true });
    cpSync(src, dest, { recursive: true });
    skills[name] = fresh; // adopt fresh hash/skillPath
    refreshed++;
  }

  if (!CHECK) {
    lock.skills = Object.fromEntries(Object.entries(skills).sort(([a], [b]) => a.localeCompare(b)));
    writeFileSync(LOCK, JSON.stringify(lock, null, 2) + "\n");
    console.log(`\n✓ refreshed ${refreshed} skill(s); ${drifted.length} had upstream changes.`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

if (CHECK) {
  if (drifted.length) {
    console.error(`\n✗ ${drifted.length} skill(s) drifted from upstream:\n` + drifted.map((n) => `  - ${n}`).join("\n"));
    console.error(`\nRun: node scripts/vendor.mjs   (then review + commit)`);
    process.exit(1);
  }
  console.log(`✓ all ${Object.keys(skills).length} vendored skills match upstream.`);
}
