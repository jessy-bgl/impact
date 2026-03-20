/**
 * Shared utilities for the questions extraction scripts.
 *
 * Used by:
 *   - find-missing-questions.mjs    (model questions not in the app)
 *   - find-questions-to-remove.mjs  (app question keys not in the model)
 */

import { readdirSync, readFileSync } from "fs";
import { extname, relative } from "path";

/**
 * Recursively list all files under `dir` whose extensions are in `exts`.
 */
export function listFiles(dir, exts) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      results.push(...listFiles(full, exts));
    } else if (exts.includes(extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Extract nosgestesclimat rule name strings from source text.
 * Rule names look like:  "transport . voiture . km"
 * They always contain at least one " . " separator.
 */
export function extractRuleNames(source) {
  const pattern = /["'`]([\wÀ-ÿ][\wÀ-ÿ '\-]*(?:\s\.\s[\wÀ-ÿ][^"'`]*)*)["'`]/g;
  const found = new Set();
  let m;
  while ((m = pattern.exec(source)) !== null) {
    const candidate = m[1].trim();
    if (candidate.includes(" . ")) {
      found.add(candidate);
    }
  }
  return found;
}

/**
 * Scan all .ts/.tsx files under `srcDir` and return a Map:
 *   dottedName → Set<relativeFilePath>
 *
 * Relative paths are computed from `cwd`.
 */
export function collectAppUsedKeysWithFiles(srcDir, cwd) {
  const files = listFiles(srcDir, [".ts", ".tsx"]);
  /** @type {Map<string, Set<string>>} */
  const keyToFiles = new Map();
  for (const file of files) {
    const source = readFileSync(file, "utf-8");
    const relFile = relative(cwd, file);
    for (const key of extractRuleNames(source)) {
      if (!keyToFiles.has(key)) {
        keyToFiles.set(key, new Set());
      }
      keyToFiles.get(key).add(relFile);
    }
  }
  return keyToFiles;
}

/**
 * Scan all .ts/.tsx files under `srcDir` and return the set of dottedNames
 * referenced in the source code.
 */
export function collectAppUsedKeys(srcDir) {
  return new Set(collectAppUsedKeysWithFiles(srcDir, srcDir).keys());
}
