/**
 * Charset audit — a tripwire for silently dropped invisible characters.
 *
 * Several source and test files carry characters that are indistinguishable
 * from ordinary ASCII when read on screen:
 *
 *   U+00A0 non-breaking space      looks like a plain space
 *   U+200A hair space              looks like a plain space
 *   U+202F narrow non-breaking sp. looks like a plain space
 *   U+02BC modifier letter apos.   looks like ’ (and like ')
 *   U+2032 prime / U+2033 dbl pr.  look like ' and "
 *   U+00B4 acute accent            looks like '
 *
 * Copy-pasting a test case, reflowing a line, or letting a formatter
 * "clean up whitespace" can drop or substitute one of these without any
 * visible change to the diff — and the resulting test failure points at the
 * algorithm rather than at the test data.
 *
 * This module takes a census of every non-ASCII codepoint in the audited
 * files and compares it against a committed expectation table. Any change is
 * a deliberate act that has to be acknowledged by regenerating the table:
 *
 *   node tests/tools/charset-audit.js --update
 *
 * Scope is limited to the files involved in quote handling, since that is
 * where the hazard concentrates. Add paths to AUDITED_FILES to widen it.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const repoRoot = resolve(here, "..", "..");

export const EXPECTED_PATH = resolve(here, "charset-expected.json");

/*
  Repo-relative paths, POSIX separators.

  Audited: files where an invisible character is load-bearing and where the
  quote refactoring is active. src/const.js holds the only NBSP/hair-space/
  narrow-NBSP literals in src/ (everything else refers to base.nbsp & co.).

  Deliberately not audited: the quote source modules, whose non-ASCII lives in
  illustrative doc comments and would churn this table on every edit; and the
  other test files that carry NBSPs (dash, nbsp, multiplication-sign,
  abbreviations, pub-id, …) plus the 8 soft hyphens in symbols/copyrights.
  Add them here if a refactoring starts touching them.
*/
export const AUDITED_FILES = [
  "src/const.js",
  "tests/punctuation/double-quotes.test.js",
  "tests/punctuation/single-quotes.test.js",
  "tests/integration/typopo.test.js",
];

/**
 * Format a codepoint as a stable, greppable key, e.g. 160 → "U+00A0".
 *
 * @param {number} codePoint
 * @returns {string}
 */
export function formatCodePoint(codePoint) {
  return "U+" + codePoint.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Count every non-ASCII codepoint in a file.
 *
 * Iterating the string yields whole codepoints (not UTF-16 code units), so
 * characters outside the BMP are counted once rather than as a surrogate pair.
 *
 * @param {string} repoRelativePath
 * @returns {Object<string, number>} codepoint key → occurrence count, ordered by codepoint
 */
export function census(repoRelativePath) {
  const contents = readFileSync(resolve(repoRoot, repoRelativePath), "utf8");

  const counts = new Map();
  for (const character of contents) {
    const codePoint = character.codePointAt(0);
    if (codePoint < 128) continue;
    counts.set(codePoint, (counts.get(codePoint) ?? 0) + 1);
  }

  return Object.fromEntries(
    [...counts.entries()]
      .sort(([a], [b]) => a - b)
      .map(([codePoint, count]) => [formatCodePoint(codePoint), count])
  );
}

/**
 * Census every audited file.
 *
 * @returns {Object<string, Object<string, number>>} repo-relative path → census
 */
export function censusAll() {
  return Object.fromEntries(AUDITED_FILES.map((path) => [path, census(path)]));
}

/**
 * Read the committed expectation table.
 *
 * @returns {Object<string, Object<string, number>>}
 */
export function readExpected() {
  return JSON.parse(readFileSync(EXPECTED_PATH, "utf8"));
}

/* CLI: regenerate the expectation table after a deliberate change. */
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  if (!process.argv.includes("--update")) {
    console.error("Usage: node tests/tools/charset-audit.js --update");
    process.exit(1);
  }
  writeFileSync(EXPECTED_PATH, JSON.stringify(censusAll(), null, 2) + "\n", "utf8");
  console.log(`Updated ${EXPECTED_PATH}`);
}
