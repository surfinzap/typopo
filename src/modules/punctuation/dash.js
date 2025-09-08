import { replaceWithOverlapHandling } from "../../utils/regex-overlap.js";

//

export function replaceThreeHyphensWithEmDash(string) {
  return string.replace(/(---)/g, "—");
}

//

export function replaceTwoHyphensWithEnDash(string) {
  return string.replace(/(--)/g, "–");
}

//

/**
  Identify:
  - improperly used hyphen with spaces around
  - improperly used or spaced en dash 
  - improperly used or spaced em dash 
  between words and fix dash and spacing for given locale

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
  const DASH_REPLACEMENT = {
    "en-us": (locale) => `${locale.emDash}`,
    "rue":   (locale) => `${locale.hairSpace}${locale.emDash}${locale.hairSpace}`,
    "sk":    (locale) => `${locale.hairSpace}${locale.emDash}${locale.hairSpace}`,
    "cs":    (locale) => `${locale.nbsp}${locale.enDash}${locale.space}`,
    "de-de": (locale) => `${locale.hairSpace}${locale.enDash}${locale.hairSpace}`,
  };

  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.allChars}])` + 
      `(` +
        `[${locale.spaces}]*[${locale.enDash}${locale.emDash}][${locale.spaces}]*` + 
        `|` +
        `[${locale.spaces}]+[${locale.hyphen}][${locale.spaces}]+` +
      `)` +
      `([${locale.allChars}])`, 
      "g"
    ), 
    `$1${DASH_REPLACEMENT[locale.locale]?.(locale)}$3`
  );
}

//

/**
  Replace hyphen placed between a word and punctuation,
  or placed at the end of a paragaph.

  Examples (en-us):
  so there is a dash -, 	→ so there is a dash—,
  so there is a dash-, 		→ so there is a dash—,
  so there is a dash -?		→ so there is a dash—?
  so there is a dash -		→ so there is a dash—

  @param {string} string — input text for identification
  @returns {string} — output with locale-specific dash and spacing between a word and a punctuation.
*/
export function fixHyphenBetweenWordAndPunctuation(string, locale) {
  const HYPHEN_PUNCTUATION_REPLACEMENT = {
    "en-us": (locale) => `$1${locale.emDash}$5`,
    "rue":   (locale) => `$1${locale.hairSpace}${locale.emDash}$5`,
    "sk":    (locale) => `$1${locale.hairSpace}${locale.emDash}$5`,
    "cs":    (locale) => `$1${locale.nbsp}${locale.enDash}$5`,
    "de-de": (locale) => `$1${locale.hairSpace}${locale.enDash}$5`,
  };

  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.allChars}])` + 
      `([${locale.spaces}]?)` + 
      `(${locale.hyphen})` +
      `([${locale.spaces}]?)` + 
      `([${locale.sentencePunctuation}\\n\\r])`, 
      "g"
    ),
    HYPHEN_PUNCTUATION_REPLACEMENT[locale.locale]?.(locale) || "");
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
export function fixDashBetweenCardinalNumbers(string, locale) {
  /* [1] Match the pattern with overlap handling */
  // prettier-ignore
  string = replaceWithOverlapHandling(
    string, 
    new RegExp(
      `(${locale.cardinalNumber})` +
      `([${locale.spaces}]?` +
      `[${locale.hyphen}${locale.enDash}${locale.emDash}]` +
      `[${locale.spaces}]?)` +
      `(${locale.cardinalNumber})`, 
      "g"
    ), 
    `$1{{typopo__endash}}$3`
  );

  /* [2] Replace enDash adepts with actual enDashes */
  // prettier-ignore
  return string.replace(
    new RegExp(
      `{{typopo__endash}}`, 
      "g"
    ), locale.enDash
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
export function fixDashBetweenPercentageRange(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.percent}${locale.permille}${locale.permyriad}])` + 
      `([${locale.spaces}]?[${locale.hyphen}${locale.enDash}${locale.emDash}][${locale.spaces}]?)` + 
      `(${locale.cardinalNumber})`, 
      "g"
    ), 
    `$1${locale.enDash}$3`
  );
}

//

/**
 * 
  Replace hyphen or dash, placed between 2 ordinal numbers,
  with an en dash; including cases when there is an extra space
  from either one side or both sides of the dash

  @param {string} string — input text for identification
  @returns {string} — output with dash between ordinal numbers
*/
export function fixDashBetweenOrdinalNumbers(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${locale.cardinalNumber})` + 
      `(${locale.ordinalIndicator})` + 
      `([${locale.spaces}]?[${locale.hyphen}${locale.enDash}${locale.emDash}][${locale.spaces}]?)` + 
      `(${locale.cardinalNumber})` + 
      `(${locale.ordinalIndicator})`, 
      "gi"
    ), 
    `$1$2${locale.enDash}$4$5`
  );
}

//

/**
  Fixes dashes

  @param {string} string — input text for identification
  @returns {string} — output with fixed dashes
*/
export function fixDash(string, locale) {
  string = replaceThreeHyphensWithEmDash(string, locale);
  string = replaceTwoHyphensWithEnDash(string, locale);
  string = fixDashesBetweenWords(string, locale);
  string = fixHyphenBetweenWordAndPunctuation(string, locale);
  string = fixDashBetweenCardinalNumbers(string, locale);
  string = fixDashBetweenPercentageRange(string, locale);
  string = fixDashBetweenOrdinalNumbers(string, locale);
  return string;
}
