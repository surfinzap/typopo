import { base } from "../../const.js";
import { m } from "../../markers.js";
import { CLOSE, OPEN, pairQuoteTokens } from "./quotes/pairing.js";
import { quoteAdepts, replaceQuoteTokens, scanQuoteTokens } from "./quotes/scanner.js";
import { fixQuotedSentencePunctuation, fixQuotedWordPunctuation } from "./quotes/shared.js";
import {
  identifyContractedAnd,
  identifyContractedBeginnings,
  identifyContractedEnds,
  identifyContractedYears,
  identifyInWordContractions,
  identifyModifierApostrophe,
  identifyResidualApostrophes,
  identifySinglePrimes,
  identifyUnpairedClosingSingleQuote,
  identifyUnpairedOpeningSingleQuote,
  placeLocaleSingleQuotes,
  removeExtraSpaceAroundSinglePrime,
  replaceSinglePrimeWSingleQuote,
} from "./single-quotes.js";
import {
  addSpaceAfterclosingDoubleQuote,
  addSpaceBeforeopeningDoubleQuote,
  fixDirectSpeechIntro,
  identifyDoublePrimes,
  identifyUnpairedClosingDoubleQuote,
  identifyUnpairedOpeningDoubleQuote,
  placeLocaleDoubleQuotes,
  removeExtraPunctuationAfterQuotes,
  removeExtraPunctuationBeforeQuotes,
  removeExtraSpacesAroundQuotes,
  removeUnidentifiedDoubleQuote,
  replaceDoublePrimeWDoubleQuote,
} from "./double-quotes.js";

/**
  Identify quote pairs, single and double alike

  Example
  "a 'quoted' word" → “a ‘quoted’ word”
  'a "quoted" word' → “a ‘quoted’ word”

  Assumptions and Limitations
  We assume that apostrophes and primes were identified in the previous run,
  so the markers they left are invisible to the scan.

  Algorithm
  [1] double quotes around a number followed by an identified double prime
      are a quote pair, e.g. "202″ → “202”. Stays a regex: it is a local
      pattern, not a pairing decision.
  [2] everything else is paired by scanning the remaining adepts of both kinds
      into one token stream and matching them with a stack (./quotes/scanner.js,
      ./quotes/pairing.js). The kind the author typed only decides which marks
      can pair; the nesting depth picks the glyphs: even depth takes the double
      quote markers, odd depth the single ones. Adepts left unpaired are
      untouched here — the unpaired-quote rules deal with them next.

  @param {string} string: input text for identification
  @returns {string} output with identified quote pairs
*/
export function identifyQuotePairs(string) {
  // [1] double quotes around a number
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(${base.doubleQuoteAdepts})` +
      `(\\d+)` +
      `(${m.doublePrime})`,
      "g"
    ),
      `${m.odq}` +
      `$2` +
      `${m.cdq}`
  );

  // [2] generic rule
  const tokens = scanQuoteTokens(string, quoteAdepts);
  const roles = pairQuoteTokens(tokens);

  const replacements = roles.map(({ role, depth }) => {
    const outer = depth % 2 === 0;
    if (role === OPEN) return outer ? m.odq : m.osq;
    if (role === CLOSE) return outer ? m.cdq : m.csq;
    return null;
  });

  return replaceQuoteTokens(string, tokens, replacements);
}

//

/**
  Correct improper use of quotes, primes and apostrophes

  Assumptions and Limitations
  A quotation belongs to one paragraph, so quotes are paired within a line.
  A single mark right after a letter is taken for an apostrophe unless it
  closes a pair, see ./quotes/pairing.js.

  Algorithm
  [1] Remove extra terminal punctuation around double quotes
  [2] Identify what is not a quote: apostrophes, a modifier letter apostrophe
      after a letter, primes
  [3] Identify quote pairs, both kinds in one pass
  [4] Identify unpaired quotes
  [5] Replace a quote & a prime with a quote pair
  [6] Identify residual apostrophes
  [7] Replace all identified punctuation with appropriate punctuation in given language
  [8] Fix punctuation placement for the inner pair, consolidate spaces around
      single primes
  [9] Consolidate spaces around double quotes and primes
  [10] Fix direct speech introduction
  [11] Fix punctuation placement for the outer pair

  Steps [8] to [11] keep the order the single and double quote passes ran in
  before they were merged.

  @param {string} string: input text for identification
  @param {object} locale: locale option
  @returns {string} corrected output
*/
export function fixQuotes(string, locale) {
  const outerPair = { open: locale.openingDoubleQuote, close: locale.closingDoubleQuote };
  const innerPair = { open: locale.openingSingleQuote, close: locale.closingSingleQuote };

  /* [1] Remove extra terminal punctuation around double quotes */
  string = removeExtraPunctuationBeforeQuotes(string);
  string = removeExtraPunctuationAfterQuotes(string);

  /* [2] Identify what is not a quote */
  string = identifyContractedAnd(string);
  /* Before the other contraction identifiers, or they would turn U+02BC into ’ */
  string = identifyModifierApostrophe(string);
  string = identifyContractedBeginnings(string);
  string = identifyInWordContractions(string);
  string = identifyContractedYears(string);
  string = identifyContractedEnds(string);
  /*
    Double primes before single ones: a run such as `12''` is a double prime,
    and a single prime marker would split it before the run could be read.
  */
  string = identifyDoublePrimes(string);
  string = identifySinglePrimes(string);

  /* [3] Identify quote pairs */
  string = identifyQuotePairs(string);

  /* [4] Identify unpaired quotes */
  string = identifyUnpairedOpeningDoubleQuote(string);
  string = identifyUnpairedClosingDoubleQuote(string);
  string = removeUnidentifiedDoubleQuote(string);
  string = identifyUnpairedOpeningSingleQuote(string);
  string = identifyUnpairedClosingSingleQuote(string);

  /* [5] Replace a quote & a prime with a quote pair */
  string = replaceDoublePrimeWDoubleQuote(string);
  string = replaceSinglePrimeWSingleQuote(string);

  /* [6] Identify residual apostrophes */
  string = identifyResidualApostrophes(string);

  /* [7] Replace all identified punctuation with appropriate punctuation in given language */
  string = placeLocaleDoubleQuotes(string, locale);
  string = placeLocaleSingleQuotes(string, locale);

  /* [8] Fix punctuation placement for the inner pair, consolidate spaces around single primes */
  string = fixQuotedWordPunctuation(string, innerPair);
  string = fixQuotedSentencePunctuation(string, innerPair, outerPair.close);
  string = removeExtraSpaceAroundSinglePrime(string);

  /* [9] Consolidate spaces around double quotes and primes */
  string = removeExtraSpacesAroundQuotes(string, locale);
  string = addSpaceBeforeopeningDoubleQuote(string, locale);
  string = addSpaceAfterclosingDoubleQuote(string, locale);

  /* [10] Fix direct speech introduction */
  string = fixDirectSpeechIntro(string, locale);

  /* [11] Fix punctuation placement for the outer pair */
  string = fixQuotedWordPunctuation(string, outerPair);
  string = fixQuotedSentencePunctuation(string, outerPair);

  return string;
}
