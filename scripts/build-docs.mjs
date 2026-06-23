#!/usr/bin/env node
// Generate the MkDocs source tree from the skills library.
//
// Output goes to site-src/ (NOT docs/ — that directory holds tracked specs).
// For each skills/<category>/<name>/SKILL.md we emit site-src/<category>/<name>.md
// (frontmatter stripped, description surfaced as a subtitle, cross-skill links
// rewritten for the flatter layout). We also generate a hero landing page and a
// per-category index page, so MkDocs builds clean section URLs (engineering/ etc.)
// and the nav stays in sync with whatever skills exist on disk.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");
const OUT_DIR = join(ROOT, "site-src");

// Section presentation: title, icon (Material icon shortcode), one-line blurb.
const CATEGORIES = {
  engineering: { title: "Engineering", icon: ":material-wrench:", blurb: "Writing, debugging, testing, and shipping code." },
  productivity: { title: "Productivity", icon: ":material-rocket-launch:", blurb: "Thinking, planning, and handing off work." },
  data: { title: "Data", icon: ":material-database:", blurb: "Pipelines, SQL, dbt, and dimensional modeling." },
  misc: { title: "Misc", icon: ":material-shape:", blurb: "Everything that doesn't fit a box yet." },
};
const catMeta = (c) => CATEGORIES[c] || { title: c, icon: ":material-folder:", blurb: "" };

/** Split a SKILL.md into {meta, body}. Minimal YAML — we only need name/description. */
function parseSkill(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].trim();
  }
  return { meta, body: match[2].trimStart() };
}

/**
 * Skills cross-link each other with paths shaped for the source tree, e.g.
 * `../tdd/SKILL.md` or `../../engineering/metamorphic-testing/SKILL.md`. Our
 * generated tree is flatter (site-src/<cat>/<name>.md), so resolve each link
 * against the source layout and re-point it at the corresponding generated page.
 * Links that don't resolve to a real skill are left untouched.
 */
function rewriteLinks(body, srcCategory, srcName) {
  const srcDir = join(SKILLS_DIR, srcCategory, srcName);
  return body.replace(/\]\(([^)]*?\/SKILL\.md)\)/g, (whole, link) => {
    if (/^https?:/.test(link)) return whole;
    const rel = relative(SKILLS_DIR, dirname(resolve(srcDir, link)));
    const parts = rel.split(/[\\/]/);
    if (parts.length !== 2) return whole;
    const [tgtCategory, tgtName] = parts;
    const newLink = relative(join(OUT_DIR, srcCategory), join(OUT_DIR, tgtCategory, `${tgtName}.md`))
      .split(/[\\/]/)
      .join("/");
    return `](${newLink})`;
  });
}

const listDirs = (dir) =>
  readdirSync(dir)
    .filter((d) => statSync(join(dir, d)).isDirectory())
    .sort();

// Fresh tree every run so deleted skills disappear from the site.
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const catalog = {}; // category -> [{name, description}]

for (const category of listDirs(SKILLS_DIR)) {
  const outDir = join(OUT_DIR, category);
  mkdirSync(outDir, { recursive: true });
  catalog[category] = [];

  for (const name of listDirs(join(SKILLS_DIR, category))) {
    let raw;
    try {
      raw = readFileSync(join(SKILLS_DIR, category, name, "SKILL.md"), "utf8");
    } catch {
      continue; // folder without a SKILL.md — skip
    }
    const { meta, body } = parseSkill(raw);
    const description = meta.description || "";
    catalog[category].push({ name, description });

    // Body already opens with "# Title"; inject the description as a subtitle.
    const page = rewriteLinks(body, category, name).replace(
      /^(#\s+.+\n)/,
      description ? `$1\n*${description}*\n` : "$1"
    );
    writeFileSync(join(outDir, `${name}.md`), page);
  }
}

const categories = listDirs(SKILLS_DIR).filter((c) => catalog[c]?.length);
const totalSkills = categories.reduce((n, c) => n + catalog[c].length, 0);

// --- per-category landing pages ---------------------------------------------
for (const category of categories) {
  const { title, blurb } = catMeta(category);
  const lines = [`# ${title}`, "", `*${blurb}*`, "", '<div class="grid cards" markdown>', ""];
  for (const { name, description } of catalog[category]) {
    lines.push(`-   **[${name}](${name}.md)**`, "", `    ---`, "", `    ${description}`, "");
  }
  lines.push("</div>", "");
  writeFileSync(join(OUT_DIR, category, "index.md"), lines.join("\n"));
}

// --- homepage : hero + category grid ----------------------------------------
const home = [];
home.push('<div class="hero" markdown>', "");
home.push("# skills");
home.push("");
home.push("**Reusable units of agent behavior for [Claude Code](https://claude.com/claude-code).**");
home.push("");
home.push(`A personal library — ${totalSkills} skills across ${categories.length} categories. Some original, some inspired by great public work. Use the search box or pick a category.`);
home.push("");
home.push("</div>", "");
home.push('<div class="grid cards" markdown>', "");
for (const category of categories) {
  const { title, icon, blurb } = catMeta(category);
  const n = catalog[category].length;
  home.push(`-   ${icon}{ .lg .middle } **${title}**`, "", "    ---", "");
  home.push(`    ${blurb}`, "");
  home.push(`    [:octicons-arrow-right-24: ${n} skill${n === 1 ? "" : "s"}](${category}/index.md)`, "");
}
home.push("</div>", "");
writeFileSync(join(OUT_DIR, "index.md"), home.join("\n"));

// --- custom styling ----------------------------------------------------------
mkdirSync(join(OUT_DIR, "stylesheets"), { recursive: true });
writeFileSync(
  join(OUT_DIR, "stylesheets", "extra.css"),
  `/* Brand colors — scoped to the scheme selectors so they beat Material's
   defaults (which are set at that specificity, not :root). */
[data-md-color-scheme="default"],
[data-md-color-scheme="slate"] {
  --md-primary-fg-color:        #5b50e5;
  --md-primary-fg-color--light: #7d74f0;
  --md-primary-fg-color--dark:  #3f37b0;
  --md-accent-fg-color:         #00bcd4;
}
.hero {
  text-align: center;
  padding: 2.5rem 0 1rem;
}
.hero h1 {
  font-weight: 800;
  font-size: 2.8rem;
  line-height: 1.1;
  background: linear-gradient(90deg, var(--md-primary-fg-color), var(--md-accent-fg-color));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.4rem;
}
.hero p { max-width: 40rem; margin: 0.4rem auto; }
.md-typeset .grid.cards > ul > li {
  border-radius: 0.6rem;
  transition: border-color .2s, box-shadow .2s, transform .2s;
}
.md-typeset .grid.cards > ul > li:hover {
  border-color: var(--md-accent-fg-color);
  box-shadow: 0 4px 20px rgba(0,0,0,.12);
  transform: translateY(-2px);
}
`
);

console.log(`Generated site-src/ — ${totalSkills} skills, ${categories.length} categories.`);
