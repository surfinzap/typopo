import { base } from "../../const.js";
import { addNbspAfterPreposition } from "../whitespace/nbsp.js";
import { m } from "../../markers.js";
import { fixQuotes, identifyQuotePairs } from "./quotes.js";
import {
  fixQuotedSentencePunctuation as fixQuotedSentencePunctuationFor,
  fixQuotedWordPunctuation as fixQuotedWordPunctuationFor,
  placeLocaleQuotes,
  removeExtraSpaceAfter,
  removeExtraSpaceBefore,
  replacePrimeWithQuotePair,
} from "./quotes/shared.js";

/**
  The double quote pair for a locale, in the shape ./quotes/shared.js expects.

  @param {object} locale: locale option
  @returns {{open: string, close: string}}
*/
function doubleQuotePair(locale) {
  return { open: locale.openingDoubleQuote, close: locale.closingDoubleQuote };
}

//

/**
  Remove extra punctuation before double quotes

  Example
  “Hey!,” she said" → “Hey!” she said

  Exceptions
  (cs/sk) Byl to “Karel IV.”, ktery neco…
  č., s., fol., str.,

  @param {string} string: input text for identification
  @returns {string} output with removed extra terminal punctuation
*/
export function removeExtraPunctuationBeforeQuotes(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
       `([^${base.romanNumerals}])` +
       `([${base.sentencePunctuation}])` +
       `([${base.sentencePausePunctuation}])` +
       `(${base.doubleQuoteAdepts})`, 
       "g"
    ), 
    "$1$2$4");
}

//

/**
  Remove extra punctuation after double quotes

  Example
  “We will continue tomorrow.”. → “We will continue tomorrow.”

  Exceptions
  (cs/sk) Byl to “Karel IV.”, ktery neco…

  @param {string} string: input text for identification
  @returns {string} output with removed extra terminal punctuation
*/
export function removeExtraPunctuationAfterQuotes(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^${base.romanNumerals}])` +
      `([${base.sentencePunctuation}])` +
      `(${base.doubleQuoteAdepts})` +
      `([${base.sentencePunctuation}])`, 
      "g"
    ), 
    "$1$2$3");
}

//

/**
  Identify inches, arcseconds, seconds following a 1–3 numbers

  Algorithm
  [1] // swap quote adepts so they're not identified as a doble prime
  {quote adept} sentence 12{quote adept}. 
  {quote adept} sentence 12.{quote adept}
  
  [2] // identify inches following a number
  12′ 45" → 
  12′ 45″

  Double-quotes module impact
  Function falsely identifies inches, where we are expecting quotes, e.g.	
  "Konference 2020" in quotes → 
  “Konference 2020” in quotes 
  → this is corrected in replaceDoublePrimeWDoubleQuote

  Implementation note
  We’re not using base.doubleQuoteAdepts variable
  as commas, low-positioned quotes, guillemets are ommited

  @param {string} string: input text for identification
  @returns {string} output with identified double primes as a temporary variable string, e.g. ${m.doublePrime}
*/
export function identifyDoublePrimes(string) {
  // [1]
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([^0-9]|^)` +
      `(${base.doubleQuoteAdepts})` +
      `(.+?)` +
      `(\\d+)` +
      `(${base.doubleQuoteAdepts})` +
      `([${base.terminalPunctuation}${base.ellipsis}])`,
      "g"
    ),
      `$1` +
      `$2` +
      `$3` +
      `$4` +
      `$6` +
      `$5`
  )

  // [2]
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(\\b\\d{1,3})` +
      `([${base.spaces}]?)` +
      `(${base.doubleQuoteAdepts})` +
      `([^\\p{L}]|\\B)`,
      "gu"
    ),
      `$1` +
      `$2` +
      `${m.doublePrime}` +
      `$4`
  )

  return string;
}

//

/**
  Identify double quote pairs

  Single and double quotes are now paired in one pass, see identifyQuotePairs
  in ../quotes.js. This name is kept because the unit tests call it.

  @param {string} string: input text for identification
  @returns {string} output with identified quote pairs
*/
export function identifyDoubleQuotePairs(string) {
  return identifyQuotePairs(string);
}

//

/** 
  After identifying double quote pairs, identify unpaired left double quotes.

  Example
  There is a "unpaired left quote. →
  There is a “unpaired left quote.

  Assumptions and Limitations
  Double quote pairs have been identified in the analysed text already

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired left double quotes
*/
export function identifyUnpairedOpeningDoubleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
       `(${base.doubleQuoteAdepts})` +
       `([0-9\\p{L}])`,
       "gu"
    ),
    `${m.odqUnpaired}$2`
  );
}

//

/**
  After identifying double quote pairs, identify unpaired right double quotes.

  Example
  There is a unpaired" right quote. →
  There is a unpaired” right quote.

  Assumptions and Limitations
  Double quote pairs have been identified in the analysed text already

  @param {string} string: input text for identification
  @returns {string} output with identified unpaired right double quotes
*/
export function identifyUnpairedClosingDoubleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
       `([\\p{L}${base.sentencePunctuation}${base.ellipsis}])` +
       `(${base.doubleQuoteAdepts})`,
       "gu"
    ),
    `$1${m.cdqUnpaired}`
  );
}

//

/**
  Remove double quotes that cannot be identified whether they are left or right double quotes. 

  Example
  word " word → word word

  @param {string} string: input text for identification
  @returns {string} output with removed unidentified double quotes
*/
export function removeUnidentifiedDoubleQuote(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
       `([${base.spaces}])` +
       `(${base.doubleQuoteAdepts})` +
       `([${base.spaces}])`,
      "gu"
    ),
    "$1"
  );
}

//

/**
  Replace a double qoute & a double prime with a double quote pair

  Assumptions and Limitations
  This function follows previous functions that identify double primes or unpaired double quotes.
  So it may happen that previous functions falsely identify a double quote pair around situations such as:
  - It’s called “Localhost 3000” and it’s pretty fast.


  Algorithm 
  Find unpaired double quote and double prime in pair and change them to a double quote pair


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with a double quote pair
*/
export function replaceDoublePrimeWDoubleQuote(string) {
  return replacePrimeWithQuotePair(string, {
    openUnpaired:  m.odqUnpaired,
    closeUnpaired: m.cdqUnpaired,
    prime:         m.doublePrime,
    open:          m.odq,
    close:         m.cdq,
  });
}

//

/**
  Fix punctuation placement for single-word quoted content

  Single word = no spaces inside quotes (includes contractions, hyphenated words, numbers)

  Rules:
  - move periods `.`, commas `,`, semicolons `;`, colons `:` outside the quoted word
  - keep the position of `!`, `?`, and `…` as is (ambiguous context)

  Examples:
  “word.” → “word”.
  “it’s,” → “it’s”,
  “well-known;” → “well-known”;
  “2020:” → “2020”:
  “Wow!” → “Wow!” (unchanged—ambiguous)

  @param {string} string: input text for identification
  @param {object} locale: locale option
  @returns {string} output with corrected punctuation placement
*/
export function fixQuotedWordPunctuation(string, locale) {
  return fixQuotedWordPunctuationFor(string, doubleQuotePair(locale));
}

//

/**
  Fix punctuation placement for quoted sentence or fragment of words

  Rules:
  - move periods `.`, commas `,`, semicolons `;`, ellipses `…`exclamation `!` and question marks `?` inside the quoted part
  - move colons `:` and semicolons `;` outside the quoted part
 
  @param {string} string: input text for identification
  @param {object} locale: locale option
  @returns {string} output with corrected punctuation placement
 */
export function fixQuotedSentencePunctuation(string, locale) {
  return fixQuotedSentencePunctuationFor(string, doubleQuotePair(locale));
}

/**
  Replace all identified punctuation with appropriate punctuation in given language

  Context
  In double-quotes module, we first identify double quote and double prime adepts, and replace them temporaririly with labels as “${m.doublePrime}”. 
  This is the function in the sequence to swap temporary labels to desired quotes.


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} an output with locale-specific double quotes and double primes
*/
export function placeLocaleDoubleQuotes(string, locale) {
  return placeLocaleQuotes(string, [
    { pattern: m.doublePrime, replacement: base.doublePrime },
    { pattern: `[${m.odq}${m.odqUnpaired}]`, replacement: locale.openingDoubleQuote },
    { pattern: `[${m.cdq}${m.cdqUnpaired}]`, replacement: locale.closingDoubleQuote },
  ]);
}

//

/**
  Remove extra spaces around quotes and primes

  Example
  “ English ” →
  “English”

  12′ 45 ″ →
  12′ 45″

  Assumptions and Limitations
  The functions runs after all double quotes and double primes have been identified. 


  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with adjusted spacing around double quotes and double primes
*/
export function removeExtraSpacesAroundQuotes(string, locale) {
  string = removeExtraSpaceAfter(string, locale.openingDoubleQuote);
  string = removeExtraSpaceBefore(string, locale.closingDoubleQuote);
  string = removeExtraSpaceBefore(string, base.doublePrime);

  return string;
}

//

/**
  Add a missing space before a left double quote

  Example
  It’s a“nice” saying. →
  It’s a “nice” saying. // also fix nbsp after “a”

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with added space before left double quote
*/
export function addSpaceBeforeopeningDoubleQuote(string, locale) {
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.sentencePunctuation}\\p{L}])` +
      `([${locale.openingDoubleQuote}])`,
    "gu"),
    `$1 $2`
  );

  string = addNbspAfterPreposition(string, locale);

  return string;
}

//

/**
  Add a missing space after a right double quote

  Example
  It’s a “nice”saying. →
  It’s a “nice” saying.

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with added space after a right double quote
*/
export function addSpaceAfterclosingDoubleQuote(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.closingDoubleQuote}])` +
      `([\\p{L}])`,
    "gu"),
    `$1 $2`
  );
}

//

/**
  Fix direct speech introduction

  Example
  She said - “Hello” - and left. →
  She said: “Hello” and left. (cs/sk/de-de)
  She said, “Hello” and left. (en-us)

  1. Consolidate the use of dashes (hyphen, en dash, em dash) and direct speech introduction
  2. Fix extra spacing between direct speech intro and opening double quotes
  3. Remove trailing dashes after closing quotes
  4. Remove dashes starting before opening double quotes 

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with fixed direct speech introduction
*/
export function fixDirectSpeechIntro(string, locale) {
  const dashes = `${base.hyphen}${base.enDash}${base.emDash}`;

  // 1. Consolidate the use of dashes (hyphen, en dash, em dash) and direct speech introduction
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([\\p{L}])` +
      `[${locale.directSpeechIntroAdepts}]?` +
      `[${base.spaces}]*` +
      `[${dashes}]` +
      `[${base.spaces}]*` +
      `([${locale.openingDoubleQuote}].+?[${locale.closingDoubleQuote}])`,
      "gu"
    ),
    `$1${locale.directSpeechIntro} $2`
  );

  // 2. Fix extra spacing between direct speech intro and opening double quotes
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([\\p{L}])` +
      `[${locale.directSpeechIntroAdepts}]` +
      `[${base.spaces}]*` +
      `([${locale.openingDoubleQuote}].+?[${locale.closingDoubleQuote}])`,
      "gu"
    ),
    `$1${locale.directSpeechIntro} $2`
  );

  // 3. Remove trailing dashes after closing quotes
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${locale.openingDoubleQuote}].+?[${locale.closingDoubleQuote}])` +
      `[${base.spaces}]*` +
      `[${dashes}]` +
      `[${base.spaces}]*` +
      `([\\p{L}])`,
      "gu"
    ),
    `$1 $2`
  );

  // 4. At the beginning of the paragraph, remove dashes before opening double quotes
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `^` +
      `[${base.spaces}]*` +
      `[${dashes}]` +
      `[${base.spaces}]*` +
      `([${locale.openingDoubleQuote}].+?[${locale.closingDoubleQuote}])`,
      "g"
    ),
    `$1`
  );

  // 5. Following the terminal punctuation, remove dashes before opening double quotes
  // . - “word” → . “word”
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.terminalPunctuation}${base.ellipsis}])` +
      `[${base.spaces}]+` +
      `[${dashes}]` +
      `[${base.spaces}]*` +
      `([${locale.openingDoubleQuote}].+?[${locale.closingDoubleQuote}])`,
      "g"
    ),
    `$1 $2`
  );

  return string;
}

/**
  Correct improper use of double quotes and double primes

  Single and double quotes are now fixed in one pass, see fixQuotes in
  ../quotes.js. This name is kept because the module test sets call it.

  @param {string} string: input text for identification
  @param {object} locale: locale option
  @returns {string} corrected output
*/
export function fixDoubleQuotesAndPrimes(string, locale) {
  return fixQuotes(string, locale);
}
