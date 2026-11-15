/**
 * Candidate-pool audit for the quotes refactoring.
 *
 * Purpose
 * Iteration 3a shrinks the set of characters that ever reach the pairing
 * stack. The obvious way to check that — assert no apostrophes reach the
 * scanner — is not achievable: a word-final apostrophe and a closing single
 * quote are the same character in the same position, and no rule separates
 * them. Counting surviving tokens is not useful either; it lumps legitimate
 * closing quotes in with apostrophes and reads far worse than reality.
 *
 * What this reports instead is the thing that actually breaks: a pairing whose
 * assigned role contradicts the token's own neighbours. pairQuoteTokens pairs
 * unconditionally and deliberately (see quotes/pairing.js), so an opening that
 * is not followed by content, or a closing that is not preceded by any, is a
 * pair the stack invented. That is the false-positive class Iteration 3c has
 * to hold down, and this is its measurement.
 *
 * The check is contextual rather than a list of known apostrophe words: the
 * shape generalises across locales and needs no upkeep.
 *
 * Scanning note
 * Since Iteration 3 the corpus is scanned with the combined adept pattern,
 * single and double marks in one stream, which is what the pipeline itself
 * now does. Runs such as `''` and ``` `` ``` are therefore claimed as double
 * adepts rather than read as pairs of single quotes, and the findings they
 * used to produce are gone.
 *
 * Modelling note
 * The pipeline below is step [2] of fixQuotes (src/modules/punctuation/quotes.js)
 * — the contraction identifiers, the U+02BC identification, then double and
 * single primes, in that order — because that is what reaches the scanner.
 *
 * Run:
 *   node tests/tools/pool-audit.js
 *
 * Exits non-zero only if a modifier letter apostrophe after a letter
 * (`jesʼ`, `kincʼa`) reaches the scanner. Elsewhere U+02BC is a mistyped single adept and is
 * expected in the pool (narrowed 2026-11-15). A run of two or
 * more is a double-quote candidate by design (3a), so `wordʼʼ` is not a
 * failure. The implausible-role count is a reading to track across
 * iterations, not a pass/fail gate.
 */

import { base } from "../../src/const.js";
import {
  identifyContractedAnd,
  identifyContractedBeginnings,
  identifyContractedEnds,
  identifyContractedYears,
  identifyInWordContractions,
  identifySinglePrimes,
  identifyModifierApostrophe,
} from "../../src/modules/punctuation/single-quotes.js";
import { identifyDoublePrimes } from "../../src/modules/punctuation/double-quotes.js";
import { pairQuoteTokens, OPEN, CLOSE } from "../../src/modules/punctuation/quotes/pairing.js";
import { quoteAdepts, scanQuoteTokens } from "../../src/modules/punctuation/quotes/scanner.js";
import { flattenCorpus } from "./quote-corpus.js";

const MODIFIER_LETTER_APOSTROPHE = "\u02BC";

/*
  What counts as plausible context, taken from the module's own unpaired-quote
  rules rather than invented here: identifyUnpairedOpeningSingleQuote accepts a
  letter, an ellipsis or an opening bracket after the mark, and
  identifyUnpairedClosingSingleQuote accepts a letter, a digit, a closing
  bracket or sentence punctuation before it. Mirroring them keeps this tool
  measuring pairing, not re-litigating what an opening looks like.
*/
const PLAUSIBLE_AFTER_OPEN = new RegExp(`[\\p{L}\\d${base.ellipsis}${base.openingBrackets}]`, "u");
const PLAUSIBLE_BEFORE_CLOSE = new RegExp(
  `[\\p{L}\\d${base.closingBrackets}${base.sentencePunctuation}${base.ellipsis}]`,
  "u"
);

/**
 * Apply the pre-pass a unified scanner would see, minus the pairing rules.
 *
 * @param {string} string
 * @returns {string}
 */
function prePass(string) {
  string = identifyContractedAnd(string);
  string = identifyModifierApostrophe(string);
  string = identifyContractedBeginnings(string);
  string = identifyInWordContractions(string);
  string = identifyContractedYears(string);
  string = identifyContractedEnds(string);
  string = identifyDoublePrimes(string);
  string = identifySinglePrimes(string);
  return string;
}

/**
 * Does a token's assigned role contradict its neighbours?
 *
 * An opening should be followed by content and a closing preceded by it. When
 * neither holds, the stack paired two marks that the surrounding text does not
 * support.
 *
 * @param {{before: string, after: string}} token
 * @param {string} role: OPEN or CLOSE
 * @returns {boolean}
 */
function isImplausible(token, role) {
  if (role === OPEN) return !PLAUSIBLE_AFTER_OPEN.test(token.after);
  if (role === CLOSE) return !PLAUSIBLE_BEFORE_CLOSE.test(token.before);
  return false;
}

const findings = [];
let modifierLetterHits = 0;
let pairedTokens = 0;

for (const { category, input } of flattenCorpus()) {
  const string = prePass(input);
  const tokens = scanQuoteTokens(string, quoteAdepts);
  if (tokens.length === 0) continue;

  const roles = pairQuoteTokens(tokens);

  tokens.forEach((token, index) => {
    /*
      Only a U+02BC after a letter is identified (2026-11-15); anywhere else it
      is a mistyped single adept and belongs in the pool.
    */
    const afterLetter = /\p{L}/u.test(token.before) && token.before !== MODIFIER_LETTER_APOSTROPHE;
    if (token.raw === MODIFIER_LETTER_APOSTROPHE && afterLetter) modifierLetterHits++;

    const { role } = roles[index];
    if (role !== OPEN && role !== CLOSE) return;
    pairedTokens++;
    if (isImplausible(token, role)) findings.push({ category, input, token, role });
  });
}

console.log("Candidate-pool audit");
console.log("====================");
console.log("");
console.log(`corpus inputs            ${flattenCorpus().length}`);
console.log(`tokens the stack paired  ${pairedTokens}`);
console.log(`implausible roles        ${findings.length}`);
console.log(`lone U+02BC reaching scanner  ${modifierLetterHits}`);
console.log("");

if (findings.length > 0) {
  console.log("Implausible roles — a pair the surrounding text does not support:");
  console.log("");
  for (const { category, input, token, role } of findings) {
    console.log(`  ${category}`);
    console.log(`    ${JSON.stringify(input)}`);
    console.log(
      `    ${JSON.stringify(token.raw)} at ${token.index} assigned ${role}, ` +
        `before ${JSON.stringify(token.before)} after ${JSON.stringify(token.after)}`
    );
    console.log("");
  }
}

if (modifierLetterHits > 0) {
  console.error(
    `FAIL: ${modifierLetterHits} lone modifier letter apostrophe(s) reached the scanner. ` +
      "identifyModifierApostrophe should have taken every one out of the pool."
  );
  process.exit(1);
}

console.log("OK: no lone modifier letter apostrophe reaches the scanner.");
