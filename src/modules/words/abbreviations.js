import { base } from "../../const.js";

/**
 Fixes spaces around initials for First and up to two Middle names
 It won’t fix any other abbreviation.
 
 Algorithm
 [1] Identify and replace pattern "I. FullName"
  [2] Identify and replace pattern "I. I. FullName"
  [3] Identify and replace pattern "I. I. I. FullName"

  @param {string} input text for identification
  @returns {string} corrected output
  */
export function fixInitials(string, locale) {
  const initialPattern = `([\\p{Lu}][\\p{L}]?\\.)([${base.spaces}]?)`;
  const fullNamePattern = `([\\p{L}]{2,}[^\\.])`;

  const patterns = [
    // prettier-ignore
    {
      // "I. FullName"
      pattern: `${initialPattern}${fullNamePattern}`,
      replacement: `$1${base.nbsp}$3` },
    {
      // "I. I. FullName"
      pattern:     `${initialPattern}${initialPattern}${fullNamePattern}`,
      replacement: `$1${locale.spaceAfter.abbreviation}$3${base.space}$5`,
    },
    {
      // "I. I. I. FullName"
      pattern:     `${initialPattern}${initialPattern}${initialPattern}${fullNamePattern}`,
      replacement: `$1${locale.spaceAfter.abbreviation}$3${locale.spaceAfter.abbreviation}$5${base.space}$7`,
    },
  ];

  for (const { pattern, replacement } of patterns) {
    string = string.replace(new RegExp(pattern, "gu"), replacement);
  }

  return string;
}

//

/**
  Fixes spaces between multiple-word abbreviations.
  Each locale has its own pattern for fixing abbreviations,
  please refer to the test suites:
  - dots after each abbreviated word
  - locale-specific space between abbreviated words
  - normal space after the last abbreviated word


  Algorithm
  [1] Change multiple-word abbreviations from all locales abbr. patterns
  [2] Identify and fix multiple-word abbreviations before the word
  [3] Identify and fix multiple-word abbreviations after the word or on their own

  @param {string} input text for identification
  @returns {string} corrected output
*/
export function fixMultipleWordAbbreviations(string, locale) {
  /* Partial patterns for a composition */
  let precedingNonLatinBoundary = `([^\\p{L}${base.enDash}${base.emDash}]|^)`;
  let followingWord = `([\\p{L}]|\\D)`;
  let followingNonLatinBoundary = `([^\\p{L}${locale.openingDoubleQuote}${locale.openingSingleQuote}${base.backtick}\\p{Emoji}]|$)`;

  /* [1] Change multiple-word abbreviations from all locales to abbr. patterns */
  let abbreviationPatterns = [];
  for (let i = 0; i < locale.multipleWordAbbreviations.length; i++) {
    let splitAbbreviation = locale.multipleWordAbbreviations[i].split(" ");
    let abbrevationPattern = "";
    for (let j = 0; j < splitAbbreviation.length; j++) {
      abbrevationPattern += `(${splitAbbreviation[j]})(\\.)([${base.spaces}]?)`;
    }
    abbreviationPatterns[i] = abbrevationPattern;
  }

  /* [2] Identify multiple-word abbreviations before the word

     Algorithm as follows:
     * build up pattern by setting preceding and following boundaries
     * build replacement of concatenating
       * preceding boundary
       * n-1 word abbreviations where locale-specific space will be
       * nth abbreviation the will follow with a normal space
       * following boundary
  */
  for (let i = 0; i < abbreviationPatterns.length; i++) {
    let pattern = `${precedingNonLatinBoundary}${abbreviationPatterns[i]}${followingWord}`;

    let replacement = "$1";
    let abbrCount = (abbreviationPatterns[i].match(/\(/g) || []).length / 3;
    for (let j = 0; j < abbrCount - 1; j++) {
      replacement += `$${j * 3 + 2}.${locale.spaceAfter.abbreviation}`;
    }
    replacement += `$${(abbrCount - 1) * 3 + 2}. $${abbrCount * 3 + 2}`;

    string = string.replace(new RegExp(pattern, "giu"), replacement);
  }

  /* [3] Identify multiple-word abbreviations after the word

     Algorithm follows:
     * build up pattern by setting preceding and following boundaries
     * build replacement of concatenating
       * preceding boundary
       * n-1 word abbreviations where locale-specific space will be
       * nth abbreviation the will follow with no space
       * following boundary
  */
  for (let i = 0; i < abbreviationPatterns.length; i++) {
    let pattern = `${precedingNonLatinBoundary}${abbreviationPatterns[i]}${followingNonLatinBoundary}`;

    let replacement = "$1";
    let abbrCount = (abbreviationPatterns[i].match(/\(/g) || []).length / 3;
    for (let j = 0; j < abbrCount - 1; j++) {
      replacement += `$${j * 3 + 2}.${locale.spaceAfter.abbreviation}`;
    }
    replacement += `$${(abbrCount - 1) * 3 + 2}.$${abbrCount * 3 + 2}`;

    string = string.replace(new RegExp(pattern, "giu"), replacement);
  }

  return string;
}

//

/**
  Fixes spaces between single-word abbreviations.
  Each locale has its own pattern for fixing abbreviations,
  please refer to the test suites.

  Algorithm
  [1] Change single-word abbreviations from all locales abbr. patterns
  [2] Identify and fix single-word abbreviations before the word
  [3] Identify and fix single-word abbreviations after the word or on their own

  @param {string} input text for identification
  @returns {string} corrected output
*/
export function fixSingleWordAbbreviations(string, locale) {
  /* [1] Change single-word abbreviations from all locales abbr. patterns */
  let abbreviationPatterns = [];
  for (let i = 0; i < locale.singleWordAbbreviations.length; i++) {
    abbreviationPatterns[i] = `(${locale.singleWordAbbreviations[i]})(\\.)([${base.spaces}]?)`;
  }

  /* [2] Identify single-word abbreviations before the word
   */
  // prettier-ignore
  let precedingNonLatinBoundary = `([^\\p{L}${base.enDash}${base.emDash}${base.nbsp}\\.]|^)`;
  let followingWord = `([\\p{L}\\d]+)([^\\.]|$)`;

  for (let i = 0; i < abbreviationPatterns.length; i++) {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `${precedingNonLatinBoundary}${abbreviationPatterns[i]}${followingWord}`,
        "giu"
      ),
      `$1$2$3${base.nbsp}$5$6`
    );
  }

  /* [3] Identify single-word abbreviations after the word
   */
  let precedingWord = `([\\p{L}\\d])([${base.spaces}])`;
  let followingNonLatinBoundary = `([^${base.spaces}\\p{L}\\d]|$)`;
  for (let i = 0; i < abbreviationPatterns.length; i++) {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `${precedingWord}${abbreviationPatterns[i]}${followingNonLatinBoundary}`,
        "giu"
      ),
      `$1${base.nbsp}$3$4$5$6`
    );
  }

  return string;
}

//

export function fixAbbreviations(string, locale) {
  string = fixInitials(string, locale);
  string = fixMultipleWordAbbreviations(string, locale);
  string = fixSingleWordAbbreviations(string, locale);

  return string;
}
