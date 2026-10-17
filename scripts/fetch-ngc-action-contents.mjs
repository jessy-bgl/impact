/**
 * Downloads the content of every action page of nosgestesclimat.fr and saves
 * it to src/features/carbon-footprint/data/ngc-action-contents.json, keyed by
 * the model's action id (`meta.id`, the page's `ruleId`).
 *
 * The texts are not in the npm model: each page embeds them in its Next.js
 * data.
 *
 * Usage:
 *   node scripts/fetch-ngc-action-contents.mjs
 */

import { writeFileSync } from "fs";
import { join } from "path";

const SITE_URL = "https://nosgestesclimat.fr";
const OUTPUT_PATH = join(
  process.cwd(),
  "src/features/carbon-footprint/data/ngc-action-contents.json",
);

const fetchPage = async (path) => {
  const response = await fetch(`${SITE_URL}${path}`);
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.text();
};

/** The Next.js flight data the page streams in `self.__next_f.push` calls. */
const readFlightData = (html) => {
  const chunks = [];
  const pattern = /self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g;
  let match;
  while ((match = pattern.exec(html)) !== null) {
    const [kind, chunk] = JSON.parse(match[1]);
    if (kind === 1) chunks.push(chunk);
  }
  return chunks.join("");
};

/** The JSON object starting at `start`, read with string-aware brace matching. */
const readObjectAt = (text, start) => {
  let depth = 0;
  let inString = false;
  for (let i = start; i < text.length; i++) {
    const char = text[i];
    if (inString) {
      if (char === "\\") i++;
      else if (char === '"') inString = false;
    } else if (char === '"') inString = true;
    else if (char === "{") depth++;
    else if (char === "}" && --depth === 0)
      return JSON.parse(text.slice(start, i + 1));
  }
  throw new Error("Unterminated object");
};

/** Long strings are streamed as separate text rows (`<id>:T<hex length>,`). */
const resolveText = (flightData, value) => {
  const reference = /^\$([0-9a-f]+)$/.exec(value ?? "");
  if (!reference) return value;
  const header = `\n${reference[1]}:T`;
  const start = flightData.indexOf(header);
  if (start === -1) throw new Error(`Unresolved reference ${value}`);
  const comma = flightData.indexOf(",", start);
  const length = parseInt(flightData.slice(start + header.length, comma), 16);
  return Buffer.from(flightData.slice(comma + 1))
    .subarray(0, length)
    .toString("utf-8");
};

const readAction = (html) => {
  const flightData = readFlightData(html);
  const marker = '"eventName":"consulted","action":';
  const index = flightData.indexOf(marker);
  if (index === -1) throw new Error("No action data in the page");
  return {
    flightData,
    action: readObjectAt(flightData, index + marker.length),
  };
};

const BOLD = "**";
const isBlank = (char) => char === undefined || /\s/.test(char);

/**
 * Pairs the `**` of a line the way an author meant them, as markdown ignores a
 * `**` next to a space: `d’un** réseau dense**` becomes `d’un **réseau dense**`.
 * Empty or unmatched delimiters are dropped.
 */
const fixBoldLine = (line) => {
  const texts = line.split(BOLD);
  const delimiterCount = texts.length - 1;
  const pairs = [];
  const openers = [];

  for (let i = 0; i < delimiterCount; i++) {
    const previous = texts[i].at(-1);
    const next = texts[i + 1][0];
    // A `**` before a link text opens: `[**label**](url)`.
    const opensLink = previous === "[" || previous === "(";
    const canClose = !isBlank(previous) && !opensLink;
    const canOpen = !isBlank(next);
    // ` **word`: closes when the delimiters left can still pair together.
    const remainingCount = delimiterCount - i - 1;
    const closes =
      openers.length > 0 &&
      !opensLink &&
      (canClose || !canOpen || remainingCount % 2 === 0);
    if (closes) pairs.push([openers.pop(), i]);
    else openers.push(i);
  }

  const delimiters = Array(delimiterCount).fill("");
  for (const [opener, closer] of pairs) {
    const lead = texts[opener + 1].match(/^\s*/)[0];
    texts[opener + 1] = texts[opener + 1].slice(lead.length);
    const trail = texts[closer].match(/\s*$/)[0];
    texts[closer] = texts[closer].slice(0, texts[closer].length - trail.length);
    // `L**’empreinte**` opens inside a word: start the bold with the word.
    if (/^\p{P}/u.test(texts[opener + 1])) {
      const word = texts[opener].match(/\p{L}+$/u)?.[0] ?? "";
      texts[opener] = texts[opener].slice(
        0,
        texts[opener].length - word.length,
      );
      texts[opener + 1] = word + texts[opener + 1];
    }
    const isEmpty = texts
      .slice(opener + 1, closer + 1)
      .every((text) => text.trim() === "");
    delimiters[opener] = isEmpty ? lead : `${lead}${BOLD}`;
    delimiters[closer] = isEmpty ? trail : `${BOLD}${trail}`;
  }

  return texts.reduce((fixed, text, i) => fixed + delimiters[i - 1] + text);
};

/** Fixes the bold markup of the site, which is typed by hand. */
const fixBold = (markdown) =>
  markdown
    ?.replace(/^\*\*\n(?=\S)/gm, BOLD)
    .split("\n")
    .map((line) => fixBoldLine(line.replace(/^\*\*-\*\*\s/, "- ")))
    .join("\n");

const listActionPaths = (html) => [
  ...new Set(
    [...html.matchAll(/href="\/actions\/([a-z0-9-]+\/[a-z0-9-]+)/g)].map(
      (match) => match[1],
    ),
  ),
];

async function main() {
  const paths = listActionPaths(await fetchPage("/actions"));
  console.log(`Found ${paths.length} action pages`);

  const contents = {};
  for (const path of paths.sort()) {
    const { flightData, action } = readAction(
      await fetchPage(`/actions/${path}`),
    );
    contents[action.ruleId] = {
      path,
      description: fixBold(resolveText(flightData, action.longDescription)),
      tips: fixBold(resolveText(flightData, action.tips)) ?? undefined,
      benefits:
        fixBold(resolveText(flightData, action.financialIncentives)) ??
        undefined,
    };
    console.log(`  ✓ ${path}`);
  }

  writeFileSync(OUTPUT_PATH, `${JSON.stringify(contents, null, 2)}\n`);
  console.log(
    `\nWritten ${Object.keys(contents).length} actions to ${OUTPUT_PATH}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
