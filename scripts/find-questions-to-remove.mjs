/**
 * Script to find question keys referenced in the app but absent from the
 * @incubateur-ademe/nosgestesclimat model, and save them to questions-to-remove.txt.
 *
 * Counterpart of find-missing-questions.mjs:
 *   find-missing-questions.mjs    → model questions NOT in the app → questions-missing.txt
 *   find-questions-to-remove.mjs  → app question keys NOT in the model → questions-to-remove.txt
 *
 * Run this after refactoring screens or after a dependency upgrade to catch
 * stale / misspelled dottedNames before they cause silent runtime failures.
 *
 * Usage:
 *   node scripts/find-questions-to-remove.mjs
 */

import { writeFileSync } from "fs";
import { join } from "path";

import { collectAppUsedKeysWithFiles } from "./questions-utils.mjs";

// ---------------------------------------------------------------------------
// 1. Render helpers
// ---------------------------------------------------------------------------

const CATEGORY_ORDER = [
  "transport",
  "alimentation",
  "logement",
  "divers",
  "services sociétaux",
];

function sortMissingEntries(entries) {
  return [...entries].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);
    if (ai !== bi) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }
    return a.key.localeCompare(b.key, "fr");
  });
}

function renderMissingEntries(entries) {
  let out = "";
  let currentCategory = "";

  for (const { key, category, files } of entries) {
    if (category !== currentCategory) {
      currentCategory = category;
      out += `\n## ${category.toUpperCase()}\n\n`;
    }
    out += `- ${key}\n`;
    out += `  Referenced in:\n`;
    for (const file of files) {
      out += `    ${file}\n`;
    }
    out += "\n";
  }

  return out;
}

// ---------------------------------------------------------------------------
// 2. Main
// ---------------------------------------------------------------------------

async function checkMissingQuestions() {
  const cwd = process.cwd();

  // --- Load model ---
  console.log("Loading rules from @incubateur-ademe/nosgestesclimat...");
  const rules = await import(
    "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json",
    { with: { type: "json" } }
  ).then((m) => m.default);

  const modelKeys = new Set(Object.keys(rules));
  console.log(`Loaded ${modelKeys.size} rules from the model`);

  // --- Collect keys used in the app ---
  const srcDir = join(cwd, "src");
  console.log(`Scanning source files under ${srcDir}...`);
  const keyToFiles = collectAppUsedKeysWithFiles(srcDir, cwd);
  console.log(`Found ${keyToFiles.size} unique dottedName strings in the app`);

  // --- Identify missing keys ---
  const missingEntries = sortMissingEntries(
    [...keyToFiles.entries()]
      .filter(([key]) => !modelKeys.has(key))
      .map(([key, files]) => ({
        key,
        category: key.split(" . ")[0],
        files: [...files].sort(),
      })),
  );

  // --- Build output ---
  const toRemovePath = join(cwd, "questions-to-remove.txt");

  let output =
    "# Questions referenced in the app but absent from the model - Nos Gestes Climat\n\n" +
    "These dottedNames are referenced in the app source code but do not exist in\n" +
    "the @incubateur-ademe/nosgestesclimat model. Possible causes:\n" +
    "  - Typo / renamed rule after a model upgrade\n" +
    "  - Rule deleted from the model\n" +
    "  - Intermediate expression string mistakenly matched (review manually)\n\n";

  if (missingEntries.length === 0) {
    output += "✅ All dottedNames referenced in the app exist in the model.\n";
    writeFileSync(toRemovePath, output, "utf-8");
    console.log(
      `\n✅ All dottedNames exist in the model. Written to: ${toRemovePath}`,
    );
    return;
  }

  output +=
    `Total: ${missingEntries.length} dottedName(s) to remove (out of ${keyToFiles.size} referenced in the app)\n` +
    renderMissingEntries(missingEntries);

  writeFileSync(toRemovePath, output, "utf-8");
  console.log(`\n⚠️  Questions to remove written to: ${toRemovePath}`);

  // --- Console summary ---
  console.log(
    `\n⚠️  Found ${missingEntries.length} dottedName(s) referenced in the app that are NOT in the model:\n`,
  );

  let currentCategory = "";
  for (const { key, category, files } of missingEntries) {
    if (category !== currentCategory) {
      currentCategory = category;
      console.log(`── ${category.toUpperCase()} ──`);
    }
    console.log(`  - ${key}`);
    for (const file of files) {
      console.log(`      ${file}`);
    }
  }

  process.exit(1); // non-zero exit so CI can catch this
}

checkMissingQuestions().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
