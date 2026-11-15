/**
 * Behaviour snapshot for the quotes refactoring.
 *
 * Runs every input in tests/tools/quote-corpus.js through fixTypos for every
 * supported locale and renders the result as a stable text file. The file is
 * committed, so each refactoring iteration produces a reviewable diff of what
 * actually changed — including on inputs no test covers.
 *
 * Compare against the committed snapshot (exits non-zero on any difference):
 *   node tests/tools/behaviour-snapshot.js
 *
 * Accept the current behaviour as the new baseline:
 *   node tests/tools/behaviour-snapshot.js --update
 *
 * A non-empty diff is not automatically a regression, and not automatically
 * fine either. It is a decision. Read it before accepting it.
 *
 * Plain text rather than JSON, on purpose: it stays diffable in a terminal and
 * in review, which is the entire point of the artifact.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { supportedLocales } from "../../src/locale/locale.js";
import { fixTypos } from "../../src/typopo.js";
import { flattenCorpus } from "./quote-corpus.js";

const here = dirname(fileURLToPath(import.meta.url));

/*
  Lives under tests/, not temp/ — temp/ is gitignored, and a baseline that is
  not committed cannot be diffed across iterations or survive a fresh checkout.
*/
export const SNAPSHOT_PATH = resolve(here, "quote-behaviour.snapshot.txt");

/*
  Codepoints rendered as \uXXXX rather than as themselves.

  Two groups: characters with no visible form (spaces, PUA processing markers),
  and characters that look like ASCII punctuation at a glance. A snapshot whose
  whole job is to make small changes obvious must not hide a nbsp→space or a
  ’→' substitution behind an identical-looking glyph.
*/
const ESCAPED_CODEPOINTS = new Set([
  0x00a0, // no-break space
  0x00ad, // soft hyphen
  0x02bc, // modifier letter apostrophe
  0x2009, // thin space
  0x200a, // hair space
  0x200b, // zero width space
  0x202f, // narrow no-break space
  0x2032, // prime
  0x2033, // double prime
  0x2060, // word joiner
  0xfeff, // zero width no-break space
]);

/**
 * Render a string so that every meaningful character difference is visible.
 *
 * Newlines become a literal \n so one case stays on one line; invisible and
 * ASCII-confusable characters become \uXXXX; Private Use Area codepoints
 * (processing markers that leaked through) become \uXXXX so they are
 * impossible to miss.
 *
 * @param {string} value
 * @returns {string}
 */
export function escapeForSnapshot(value) {
  let out = "";
  for (const character of value) {
    const codePoint = character.codePointAt(0);
    const isPua = codePoint >= 0xe000 && codePoint <= 0xf8ff;
    const isControl = codePoint < 0x20;

    if (character === "\n") {
      out += "\\n";
    } else if (isControl || isPua || ESCAPED_CODEPOINTS.has(codePoint)) {
      out += "\\u" + codePoint.toString(16).toUpperCase().padStart(4, "0");
    } else {
      out += character;
    }
  }
  return out;
}

/**
 * Build the full snapshot text.
 *
 * @returns {string}
 */
export function renderSnapshot() {
  const localeColumnWidth = Math.max(...supportedLocales.map((locale) => locale.length));

  const lines = [
    "# Quote behaviour snapshot",
    "#",
    "# Generated: node tests/tools/behaviour-snapshot.js --update",
    "# Corpus:    tests/tools/quote-corpus.js",
    "#",
    "# Records what typopo currently does, not what it should do. A diff here",
    "# is a change in behaviour that needs a decision, not necessarily a bug.",
    "#",
    "# Invisible and ASCII-confusable characters are shown as \\uXXXX; newlines",
    "# as \\n. Private Use Area codepoints indicate a processing marker that",
    "# escaped the pipeline and are always a bug.",
    "",
  ];

  let currentCategory = null;
  for (const { category, input } of flattenCorpus()) {
    if (category !== currentCategory) {
      lines.push(`## ${category}`, "");
      currentCategory = category;
    }

    lines.push(`in  ${escapeForSnapshot(input)}`);
    for (const locale of supportedLocales) {
      const output = fixTypos(input, locale);
      lines.push(`    ${locale.padEnd(localeColumnWidth)}  ${escapeForSnapshot(output)}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

/* CLI */
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const current = renderSnapshot();

  if (process.argv.includes("--update")) {
    writeFileSync(SNAPSHOT_PATH, current, "utf8");
    console.log(`Wrote ${SNAPSHOT_PATH}`);
    process.exit(0);
  }

  if (!existsSync(SNAPSHOT_PATH)) {
    console.error(`No snapshot at ${SNAPSHOT_PATH}. Create one with --update.`);
    process.exit(1);
  }

  const committed = readFileSync(SNAPSHOT_PATH, "utf8");
  if (committed === current) {
    console.log("Quote behaviour snapshot: no change.");
    process.exit(0);
  }

  const committedLines = committed.split("\n");
  const currentLines = current.split("\n");
  const changed = [];
  for (let i = 0; i < Math.max(committedLines.length, currentLines.length); i++) {
    if (committedLines[i] !== currentLines[i]) {
      changed.push({ line: i + 1, before: committedLines[i], after: currentLines[i] });
    }
  }

  console.error(`Quote behaviour snapshot: ${changed.length} line(s) differ.\n`);
  for (const { line, before, after } of changed) {
    console.error(`  line ${line}`);
    console.error(`    - ${before ?? "(absent)"}`);
    console.error(`    + ${after ?? "(absent)"}`);
  }
  console.error(
    "\nReview each change. Accept with: node tests/tools/behaviour-snapshot.js --update"
  );
  process.exit(1);
}
