/**
 * Script to find questions that are present in the nosgestesclimat model
 * but not used in the app, and save them to questions-missing.txt.
 *
 * Run after an @incubateur-ademe/nosgestesclimat upgrade to spot new questions
 * that should potentially be added to the app.
 *
 * Usage:
 *   node scripts/find-missing-questions.mjs
 */

import { writeFileSync } from "fs";
import { join } from "path";

import { collectAppUsedKeys } from "./questions-utils.mjs";

// ---------------------------------------------------------------------------
// 1. Collect question dottedNames actually used in the app
// ---------------------------------------------------------------------------

/**
 * Mirror of AdemeQuestion.getSubQuestions():
 * For a mosaique parent key, return the resolved child keys.
 *
 * Each mosaique option is looked up as:
 *   1. `${parentKey} . ${option}`   (preferred)
 *   2. `${parentKeyWithoutLast} . ${option}`  (fallback, same logic as AdemeQuestion)
 */
function getMosaïqueChildKeys(parentKey, mosaïqueOptions, allRules) {
  const removeLastPart = (key) => key.slice(0, key.lastIndexOf(" . "));
  const children = [];
  for (const option of mosaïqueOptions) {
    let childKey = `${parentKey} . ${option}`;
    if (!allRules[childKey]) {
      childKey = `${removeLastPart(parentKey)} . ${option}`;
    }
    if (allRules[childKey]) {
      children.push(childKey);
    }
  }
  return children;
}

/**
 * Expand the set of directly-used keys to also include all sub-questions
 * (mosaique children) whose parent is in the used set.
 * This mirrors what AdemeQuestion does at runtime.
 */
function expandWithSubQuestions(usedKeys, allRules) {
  const expanded = new Set(usedKeys);
  for (const key of usedKeys) {
    const rule = allRules[key];
    if (!rule) continue;
    const mosaique = rule.mosaique ?? rule["mosaïque"];
    if (!mosaique?.options) continue;
    for (const childKey of getMosaïqueChildKeys(
      key,
      mosaique.options,
      allRules,
    )) {
      expanded.add(childKey);
    }
  }
  return expanded;
}

/**
 * Build the set of question keys that are "aide" alternatives in the model.
 *
 * In nosgestesclimat, when a rule has an `aide` field pointing to another rule,
 * that target rule is an optional fallback question shown only when the user
 * cannot answer the primary question (e.g. "no bill? enter your monthly spend").
 * These are intentionally NOT implemented as primary questions in the app.
 */
function collectAideAlternatives(allRules) {
  const aideTargets = new Set();
  for (const rule of Object.values(allRules)) {
    if (rule && rule.aide) {
      aideTargets.add(rule.aide);
    }
  }
  return aideTargets;
}

// ---------------------------------------------------------------------------
// 2. Sort helper (shared between the two output files)
// ---------------------------------------------------------------------------

const CATEGORY_ORDER = [
  "transport",
  "alimentation",
  "logement",
  "divers",
  "services sociétaux",
];

function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.category);
    const bi = CATEGORY_ORDER.indexOf(b.category);

    if (ai !== bi) {
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    }

    if (a.subcategory !== b.subcategory) {
      return a.subcategory.localeCompare(b.subcategory, "fr");
    }

    return a.dottedName.localeCompare(b.dottedName, "fr");
  });
}

// ---------------------------------------------------------------------------
// 3. Render a list of entries into a formatted text block
// ---------------------------------------------------------------------------

function renderEntries(entries) {
  let out = "";
  let currentCategory = "";
  let currentSubcategory = "";

  for (const { dottedName, question, category, subcategory } of entries) {
    if (category !== currentCategory) {
      currentCategory = category;
      out += `\n## ${category.toUpperCase()}\n\n`;
    }

    if (subcategory !== currentSubcategory && subcategory !== category) {
      currentSubcategory = subcategory;
      out += `\n### ${subcategory}\n\n`;
    }

    out += `- ${question}\n`;
    out += `  (${dottedName})\n\n`;
  }

  return out;
}

// ---------------------------------------------------------------------------
// 4. Main
// ---------------------------------------------------------------------------

async function extractQuestions() {
  const cwd = process.cwd();

  // --- Load model ---
  console.log("Loading rules from @incubateur-ademe/nosgestesclimat...");

  const rules = await import(
    "@incubateur-ademe/nosgestesclimat/public/co2-model.FR-lang.fr.json",
    { with: { type: "json" } }
  ).then((m) => m.default);

  console.log(`Loaded ${Object.keys(rules).length} rules from the model`);

  // --- Build full question list ---
  const allEntries = sortEntries(
    Object.entries(rules)
      .filter(([, rule]) => rule && rule.question)
      .map(([dottedName, rule]) => ({
        dottedName,
        question: rule.question,
        category: dottedName.split(" . ")[0],
        subcategory: dottedName.split(" . ").slice(0, 2).join(" . "),
      })),
  );

  console.log(`Found ${allEntries.length} questions in the model`);

  // --- Collect question keys used in the app ---
  const srcDir = join(cwd, "src");
  console.log(`Scanning source files under ${srcDir} …`);
  const directlyUsedKeys = collectAppUsedKeys(srcDir);
  console.log(
    `Found ${directlyUsedKeys.size} unique question keys directly referenced in the app`,
  );

  // Expand with mosaique sub-questions (mirrors AdemeQuestion.getSubQuestions())
  const usedKeys = expandWithSubQuestions(directlyUsedKeys, rules);
  const subQuestionCount = usedKeys.size - directlyUsedKeys.size;
  if (subQuestionCount > 0) {
    console.log(
      `Added ${subQuestionCount} sub-questions (mosaique children) → ${usedKeys.size} total used`,
    );
  }

  // --- Split into used / unused ---
  const unusedEntries = allEntries.filter(
    ({ dottedName }) => !usedKeys.has(dottedName),
  );
  const usedEntries = allEntries.filter(({ dottedName }) =>
    usedKeys.has(dottedName),
  );

  // --- Identify aide alternative questions among unused ---
  const aideAlternatives = collectAideAlternatives(rules);
  const genuinelyUnused = unusedEntries.filter(
    ({ dottedName }) => !aideAlternatives.has(dottedName),
  );
  const aideUnused = unusedEntries.filter(({ dottedName }) =>
    aideAlternatives.has(dottedName),
  );

  console.log(`  - Used in app           : ${usedEntries.length}`);
  console.log(`  - Missing (genuine)     : ${genuinelyUnused.length}`);
  console.log(`  - Missing (aide/fallback): ${aideUnused.length}`);

  // --- Write questions-missing.txt ---
  const output =
    "# Questions missing from the app - Nos Gestes Climat\n\n" +
    "These questions exist in the @incubateur-ademe/nosgestesclimat model but\n" +
    "are not referenced in the app. Review this list after a dependency upgrade\n" +
    "to spot new questions that should potentially be added.\n\n" +
    `Total: ${unusedEntries.length} missing questions (out of ${allEntries.length} in the model)\n` +
    `  - ${genuinelyUnused.length} genuinely missing (candidates to add to the app)\n` +
    `  - ${aideUnused.length} aide/fallback alternatives (optional, shown when user can't answer the primary question)\n` +
    "\n" +
    "═".repeat(72) +
    "\n" +
    `## GENUINELY MISSING (${genuinelyUnused.length})\n\n` +
    "Questions that exist in the model but have no corresponding screen in the app.\n" +
    "These are the main candidates to consider when upgrading the dependency.\n" +
    renderEntries(genuinelyUnused) +
    "\n" +
    "═".repeat(72) +
    "\n" +
    `## AIDE / FALLBACK ALTERNATIVES (${aideUnused.length})\n\n` +
    "These questions are referenced as `aide` by a primary question in the model.\n" +
    "They are optional fallbacks shown when the user cannot answer the primary\n" +
    'question (e.g. "no bill? enter your monthly spend instead").\n' +
    "They are intentionally absent from the app as standalone questions.\n" +
    renderEntries(aideUnused);

  const outputPath = join(cwd, "questions-missing.txt");
  writeFileSync(outputPath, output, "utf-8");
  console.log(`\n✅ Missing questions written to: ${outputPath}`);

  // --- Category summary ---
  console.log("\nSummary by category (model / genuinely missing):");
  const modelStats = {};
  const missingStats = {};
  for (const { category } of allEntries) {
    modelStats[category] = (modelStats[category] || 0) + 1;
  }
  for (const { category } of genuinelyUnused) {
    missingStats[category] = (missingStats[category] || 0) + 1;
  }
  for (const [cat, total] of Object.entries(modelStats)) {
    console.log(
      `  - ${cat}: ${total} total, ${missingStats[cat] ?? 0} genuinely missing`,
    );
  }
}

extractQuestions().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
