import { base } from "../../const.js";
import { m } from "../../markers.js";
import { fixQuotes } from "./quotes.js";
import {
  placeLocaleQuotes,
  removeExtraSpaceBefore,
  replacePrimeWithQuotePair,
} from "./quotes/shared.js";

/**
  Identify ’n’ contractions as apostrophes

  Example
  rock 'n' roll → rock ’n’ roll
  fish 'n' chips → fish ’n’ chips


  Exceptions
  Press 'N' to continue (should be identified as single quotes)


  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedAnd(string) {
  let commonContractions = [
    ["dead", "buried"],
    ["drill", "bass"],
    ["drum", "bass"],
    ["rock", "roll"],
    ["pick", "mix"],
    ["fish", "chips"],
    ["salt", "shake"],
    ["mac", "cheese"],
    ["pork", "beans"],
    ["drag", "drop"],
    ["rake", "scrape"],
    ["hook", "kill"],
  ];

  commonContractions.forEach((item) => {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `(${item[0]})` +
        `([${base.spaces}]?)` +
        `(${base.singleQuoteAdepts})` +
        `(n)` +
        `(${base.singleQuoteAdepts})` +
        `([${base.spaces}]?)` +
        `(${item[1]})`, 
      "gi"),
      `$1${base.nbsp}${m.apos}$4${m.apos}${base.nbsp}$7`
    );
  });

  return string;
}

//

/**
  Identify common contractions at the beginning of the word as apostrophes

  Example
  ’em, ’cause,… see list of words in the function

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedBeginnings(string) {
  let contractedWords =
    "cause|em|mid|midst|mongst|prentice|round|sblood|ssdeath|sfoot|sheart|shun|slid|slife|slight|snails|strewth|til|tis|twas|tween|twere|twill|twixt|twould";

  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${base.singleQuoteAdepts})` +
      `(${contractedWords})`, 
      "gi"
    ),
      `${m.apos}$2`
  );
}

//

/**
  Identify common contractions at the ends of the word as apostrophes

  Example
  contraction of an -ing form, e.g. nottin’

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedEnds(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\Bin)` +
      `(${base.singleQuoteAdepts})`,
      "gi"
    ),
      `$1${m.apos}`
  );
}

//

/**
  Identify in-word contractions as apostrophes

  Examples
  Don’t, I’m, O’Doole, 69’ers,…

  Implementation note
  "ʼ" MLA (U+02BC) is a letter to \p{L}, so it is kept out of both neighbours. It may
  still be the contraction mark (Paulʼs → Paul’s), but in a run such as
  `wordʼʼ` one U+02BC must not pass for the letter beside the other: the run
  is a double quote.

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyInWordContractions(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `((?!${base.modifierLetterApostrophe})[\\d\\p{L}])` +
        `(${base.singleQuoteAdepts})+` +
        `((?!${base.modifierLetterApostrophe})[\\p{L}])`,
      "gu"
    ),
      `$1${m.apos}$3`
  );
}

//

/**
  Identify contracted years

  Example
  in ’70s, the ’90s, Q1 ’23

  Assumptions and Limitations
  Only the two shapes that cannot be a quote are identified here:
  [1] a decade, '90s, which takes precedence over any quote reading
  [2] a year after a quarter or a similar code, Q1 '23, which would otherwise
      read as a wrongly spaced prime (12 '45″)

  Any other contracted year, INCHEBA '89, is left to pairing: if a mark later
  on the line closes it, it is a quote ('90 bottles' → ‘90 bottles’); if not,
  it is unpaired and degrades to an apostrophe (INCHEBA ’89).
  See Single marks need evidence to close in ./quotes/pairing.js.

  Exceptions
  12 '45″ // when there is a wrongly spaced feet

  @param {string} string: input text for identification
  @returns {string} output with identified contractions as apostrophes
*/
export function identifyContractedYears(string) {
  // [1] decades
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(?<![^\\s(])` +
      `(${base.singleQuoteAdepts})` +
      `(\\d0s)`,
      "gu"
    ),
      `${m.apos}$2`
  );

  // [2] a year after a capital letter and a digit
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([A-Z][0-9])` +
      `([${base.spaces}])` +
      `(${base.singleQuoteAdepts})` +
      `([\\d]{2})`,
      "gu"
    ),
      `$1$2${m.apos}$4`
  );
}

//

/**
  Identify the modifier letter apostrophe (U+02BC) as itself

  Example
  ta de jesʼ take → ta de jesʼ take
  kincʼa → kincʼa
  'ta de jesʼ take vidil' → ‚ta de jesʼ take vidil‘

  Scope
  U+02BC is on no keyboard layout, so it is typed on purpose almost only in
  transliteration, where it follows a letter: inside a word (kincʼa) or at its
  end (jesʼ, kedysʼ). Only those positions are identified. Anywhere else, e.g.
  at the start of a word, it is far more likely a mistyped quote, and it is
  left as a single quote adept for the rest of the algorithm.

  \p{L} matches U+02BC itself (category Lm), so the preceding letter excludes
  it explicitly.

  Ordering
  Runs right after identifyContractedAnd, which claims the mark in rock ’nʼ roll
  for an apostrophe, and before the other contraction identifiers, which would
  otherwise turn an in-word or word-final U+02BC into ’ (Paulʼs, nottinʼ).

  Runs of two or more are left alone: base.doubleQuoteAdepts treats a run of adepts as a double quote, which is the sloppy-input case that rule exists for, so wordʼʼ stays a double quote candidate.

  @param {string} string: input text for identification
  @returns {string} output with a modifier letter apostrophe after a letter identified
*/
export function identifyModifierApostrophe(string) {
  return string.replace(/(?<!ʼ)(?<=\p{L})ʼ(?!ʼ)/gu, m.mla);
}

//

/**
  Identify feet and arcminutes following a 1–3 numbers

  Example
  12' 45″ → 
  12′ 45″

  Single-quotes module impact
  Function falsely identifies feet, where we are expecting quotes, e.g.	
  'Konference 2020' in quotes → 
  ‘Konference 2020’ in quotes 
  → this is corrected in replaceSinglePrimeWSingleQuote

  Implementation note
  We’re not using base.singleQuoteAdepts variable as commas and low-positioned quotes are ommited

  @param {string} string: input text for identification
  @returns {string} output with identified single primes as a temporary variable string, e.g. ${m.singlePrime}
*/
export function identifySinglePrimes(string) {
  return string.replace(/(\d)( ?)('|‘|’|‛|′)/g, `$1$2${m.singlePrime}`);
}

//

/**
  Identify unpaired left single quote

  Algorithm
  Find left single quotes:
  - following a space, en dash or em dash
  - preceding a word

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired left single quote
*/
export function identifyUnpairedOpeningSingleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `(^|[${base.spaces}${base.emDash}${base.enDash}])` +
        `(${base.singleQuoteAdepts}|,)` +
        `([\\p{L}${base.ellipsis}${base.openingBrackets}\\{])`,
      "gu"
    ),
      `$1${m.osqUnpaired}$3`
  );
}

//

/**
  Identify unpaired right single quote

  Algorithm
  Find right single quotes:
  - following a word
  - optionally, following a sentence punctuation
  - optionally, preceding a space or a sentence punctuation

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired right single quote
*/
export function identifyUnpairedClosingSingleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}\\d${base.closingBrackets}])` +
      `([${base.sentencePunctuation}${base.ellipsis}])?` +
      `(${base.singleQuoteAdepts})` +
      `([ ${base.sentencePunctuation}])?`,
      "gu"
    ),
      `$1$2${m.csqUnpaired}$4`
  );
}

/**
  Identify residual apostrophes 

  Finds remaining single quote adepts and changes them to apostrophes.


  Limitation
  This function runs as last in the row identification function as it catches what’s left.

  @param {string} string: input text for identification
  @returns {string} output with identified single quote pairs
*/
export function identifyResidualApostrophes(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${base.singleQuoteAdepts})`,
      "g"
    ),
      `${m.apos}`
  );
}

//

/**
  Replace a single qoute & a single prime with a single quote pair

  Assumptions and Limitations
  This function follows previous functions that identify single primes or unpaired single quotes.
  So it may happen that previous functions falsely identify a single quote pair around situations such as:
  - He said: “What about 'Localhost 3000', is that good?”

  Algorithm 
  Find unpaired single quote and single prime in pair and change them to a single quote pair


  @param {string} string: input text for identification
  @returns {string} output with a single quote pair
*/
export function replaceSinglePrimeWSingleQuote(string) {
  return replacePrimeWithQuotePair(string, {
    openUnpaired:  m.osqUnpaired,
    closeUnpaired: m.csqUnpaired,
    prime:         m.singlePrime,
    open:          m.osq,
    close:         m.csq,
  });
}

//

/**
  Remove extra space around a single prime

  Example
  12 ′ 45″ →
  12′ 45″


  Assumptions and Limitations
  The functions runs after all single quotes and single primes have been identified. 


  @param {string} string: input text for identification
  @returns {string} output with adjusted spacing around single quotes and single primes
*/
export function removeExtraSpaceAroundSinglePrime(string) {
  return removeExtraSpaceBefore(string, base.singlePrime);
}

//

/**
  Replace all identified punctuation with appropriate punctuation in given language

  Context
  In single-quotes module, we first identify single quote and single prime adepts, and then we  replace them temporarily with labels as “${m.singlePrime}”. 
  This is the function in the sequence to swap temporary labels to desired quotes.
  

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} an output with locale-specific single quotes and single primes
*/
export function placeLocaleSingleQuotes(string, locale) {
  return placeLocaleQuotes(string, [
    { pattern: m.singlePrime, replacement: base.singlePrime },
    {
      pattern:     `[${m.apos}${m.osqUnpaired}${m.csqUnpaired}]`,
      replacement: base.apostrophe,
    },
    { pattern: m.mla, replacement: base.modifierLetterApostrophe },
    { pattern: m.osq, replacement: locale.openingSingleQuote },
    { pattern: m.csq, replacement: locale.closingSingleQuote },
  ]);
}

//

/**
  Corrects improper use of single quotes, single primes and apostrophes

  Single and double quotes are now fixed in one pass, see fixQuotes in
  ../quotes.js. This name is kept because the module test sets call it.

  @param {string} string: input text for identification
  @param {object} locale: locale option
  @returns {string} corrected output
*/
export function fixSingleQuotesPrimesAndApostrophes(string, locale) {
  return fixQuotes(string, locale);
}
