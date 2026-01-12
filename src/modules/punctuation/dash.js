import { replaceWithOverlapHandling } from "../../utils/regex-overlap.js";
import { base } from "../../const.js";

//

/**
  Identify:
  - improperly used hyphen with spaces around
  - improperly used or spaced en dash 
  - improperly used or spaced em dash 
  between words, or, between a word and a nummber and fix dash and spacing for given locale

  Example
  see tests

  Exceptions
  - improperly spaced dash in words such as "e-shop", e.g. "e -shop" (we fix this in hyphen.js)
  - hyphens at the beginning of the paragraph that indicate unordered list

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with fixed dashes and spaces between words
*/
export function fixDashesBetweenWords(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}\\d])` +
      `(` +
        `[${base.spaces}]*[${base.enDash}${base.emDash}]{1,3}[${base.spaces}]*` +
        `|` +
        `[${base.spaces}]+[${base.hyphen}]{1,3}[${base.spaces}]+` +
      `)` +
      `([\\p{L}\\d])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}${locale.dashWords.spaceAfter}$3`
  );
}

//

/**
  Replace hyphen or dash placed between a word and punctuation,
  or placed at the end of a paragaph.

  Examples (en-us):
  so there is a dash -, 	→ so there is a dash—,
  so there is a dash-, 		→ so there is a dash—,
  so there is a dash -?		→ so there is a dash—?
  so there is a dash -		→ so there is a dash—

  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with locale-specific dash and spacing between a word and a punctuation.
*/
export function fixDashBetweenWordAndPunctuation(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}])` +
      `([${base.spaces}]?)` +
      `([${base.hyphen}${base.enDash}${base.emDash}]{1,3})` +
      `([${base.spaces}]?)` +
      `([${base.sentencePunctuation}\\n\\r])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}$5`
  );
}

//

/**
  Replace hyphen or dash, placed between words and brackets,
  with locale-specific dash and spacing.

  Examples (en-us):
  word-(bracket   → word—(bracket
  bracket)-word   → bracket)—word
  word-)          → word—)
  (-word          → (—word
  word)-(word     → word)—(word

  Special case - dashes entirely within brackets preserve dash type, only remove spaces:
  ( - )           → (-)
  [ – ]           → [–]
  { — }           → {—}

  @param {string} string — input text for identification
  @param {string} locale — locale option
  @returns {string} — output with locale-specific dash and spacing between words and brackets
*/
export function fixDashBetweenWordAndBrackets(string, locale) {
  // Dashes entirely within brackets
  // Only remove spaces, but preserve the original dash type
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.openingBrackets}])` +
      `[${base.spaces}]*` +
      `([${base.hyphen}${base.enDash}${base.emDash}]+)` +
      `[${base.spaces}]*` +
      `([${base.closingBrackets}])`,
      "gu"
    ),
    `$1$2$3`
  );

  // Fix word followed by dash followed by opening bracket
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([\\p{L}])` +
      `[${base.spaces}]*` +
      `[${base.hyphen}${base.enDash}${base.emDash}]{1,3}` +
      `[${base.spaces}]*` +
      `([${base.openingBrackets}])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}${locale.dashWords.spaceAfter}$2`
  );

  // Fix closing bracket followed by dash followed by word
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.closingBrackets}])` +
      `[${base.spaces}]*` +
      `[${base.hyphen}${base.enDash}${base.emDash}]{1,3}` +
      `[${base.spaces}]*` +
      `([\\p{L}])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}${locale.dashWords.spaceAfter}$2`
  );

  // Fix word followed by dash followed by closing bracket
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([\\p{L}])` +
      `[${base.spaces}]*` +
      `[${base.hyphen}${base.enDash}${base.emDash}]{1,3}` +
      `[${base.spaces}]*` +
      `([${base.closingBrackets}])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}${locale.dashWords.spaceAfter}$2`
  );

  // Fix opening bracket followed by dash followed by word
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.openingBrackets}])` +
      `[${base.spaces}]*` +
      `[${base.hyphen}${base.enDash}${base.emDash}]{1,3}` +
      `[${base.spaces}]*` +
      `([\\p{L}])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}${locale.dashWords.spaceAfter}$2`
  );

  // Fix closing bracket followed by dash followed by opening bracket
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([${base.closingBrackets}])` +
      `[${base.spaces}]*` +
      `[${base.hyphen}${base.enDash}${base.emDash}]` +
      `[${base.spaces}]*` +
      `([${base.openingBrackets}])`,
      "gu"
    ),
    `$1${locale.dashWords.spaceBefore}${locale.dashWords.dash}${locale.dashWords.spaceAfter}$2`
  );

  return string;
}

//

/**
  Replace hyphen or dash, placed between 2 cardinal numbers,
  with an en dash; including cases when there is an extra space
  from either one side or both sides of the dash

  Algorithm is split in two passes, to prevent the loops of matching the already fixed en dash.
  [1] Match the pattern with overlap handling
  [2] Replace enDash adepts with actual enDashes

  @param {string} string — input text for identification
  @returns {string} — output with en dash between cardinal numbers
*/
export function fixDashBetweenCardinalNumbers(string) {
  /* [1] Match the pattern with overlap handling */
  // prettier-ignore
  string = replaceWithOverlapHandling(
    string,
    new RegExp(
      `(\\d)` +
      `([${base.spaces}]?` +
      `[${base.hyphen}${base.enDash}${base.emDash}]{1,3}` +
      `[${base.spaces}]?)` +
      `(\\d)`,
      "gu"
    ),
    `$1{{typopo__endash}}$3`
  );

  /* [2] Replace enDash adepts with actual enDashes */
  // prettier-ignore
  return string.replace(
    new RegExp(
      `{{typopo__endash}}`, 
      "g"
    ),
    base.enDash
  );
}

//

/**
  Replace hyphen or dash, placed between percentage range,
  with an en dash; including cases when there is an extra space
  from either one side or both sides of the dash

  @param {string} string — input text for identification
  @returns {string} — output with en dash between percentage range
*/
export function fixDashBetweenPercentageRange(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.percent}${base.permille}${base.permyriad}])` +
      `([${base.spaces}]?[${base.hyphen}${base.enDash}${base.emDash}]{1,3}[${base.spaces}]?)` +
      `(\\d)`,
      "gu"
    ),
    `$1${base.enDash}$3`
  );
}

//

/**
 * 
  Replace hyphen or dash, placed between 2 ordinal numbers,
  with an en dash; including cases when there is an extra space
  from either one side or both sides of the dash

  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with dash between ordinal numbers
*/
export function fixDashBetweenOrdinalNumbers(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\d)` +
      `(${locale.ordinalIndicator})` +
      `([${base.spaces}]?[${base.hyphen}${base.enDash}${base.emDash}]{1,3}[${base.spaces}]?)` +
      `(\\d)` +
      `(${locale.ordinalIndicator})`,
      "giu"
    ),
    `$1$2${base.enDash}$4$5`
  );
}

//

/**
  Fixes dashes

  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with fixed dashes
*/
export function fixDash(string, locale) {
  string = fixDashesBetweenWords(string, locale);
  string = fixDashBetweenWordAndPunctuation(string, locale);
  string = fixDashBetweenWordAndBrackets(string, locale);
  string = fixDashBetweenCardinalNumbers(string);
  string = fixDashBetweenPercentageRange(string);
  string = fixDashBetweenOrdinalNumbers(string, locale);
  return string;
}
