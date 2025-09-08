function getAbbreviationSpace(locale) {
  const ABBR_SPACE = {
    "en-us": "",
    "rue":   locale.nbsp,
    "sk":    locale.nbsp,
    "cs":    locale.nbsp,
    "de-de": locale.nbsp,
  };

  return ABBR_SPACE[locale.locale];
}

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
  const abbrSpace = getAbbreviationSpace(locale);
  const initialPattern = `([${locale.uppercaseChars}][${locale.allChars}]?\\.)([${locale.spaces}]?)`;
  const fullNamePattern = `([${locale.allChars}]{2,}[^\\.])`;

  const patterns = [
    // prettier-ignore
    { 
      // "I. FullName"
      pattern: `${initialPattern}${fullNamePattern}`, 
      replacement: `$1${locale.nbsp}$3` },
    {
      // "I. I. FullName"
      pattern:     `${initialPattern}${initialPattern}${fullNamePattern}`,
      replacement: `$1${abbrSpace}$3${locale.space}$5`,
    },
    {
      // "I. I. I. FullName"
      pattern:     `${initialPattern}${initialPattern}${initialPattern}${fullNamePattern}`,
      replacement: `$1${abbrSpace}$3${abbrSpace}$5${locale.space}$7`,
    },
  ];

  for (const { pattern, replacement } of patterns) {
    string = string.replace(new RegExp(pattern, "g"), replacement);
  }

  return string;
}

//

/**
  Fixes spaces between multiple-word abbreviations.
  Each locale has its own pattern for fixing abbreviations,
  please refer to the test suites.

  Algorithm
  [1] Set locale-specific space between abbreviations
  [2] Change multiple-word abbreviations from all locales abbr. patterns
  [3] Identify and fix multiple-word abbreviations before the word
  [4] Identify and fix multiple-word abbreviations after the word or on their own

  @param {string} input text for identification
  @returns {string} corrected output
*/
export function fixMultipleWordAbbreviations(string, locale) {
  /* Partial patterns for a composition */
  let precedingNonLatinBoundary = `([^${locale.allChars}${locale.enDash}${locale.emDash}]|^)`;
  let followingWord = `([${locale.allChars}]|\\D)`;
  let followingNonLatinBoundary = `([^${locale.allChars}${locale.leftDoubleQuote}${locale.leftSingleQuote}${locale.backtick}\\p{Emoji}]|$)`;

  /* [1] Set locale-specific space between abbreviations */
  const abbrSpace = getAbbreviationSpace(locale);

  /* [2] Change multiple-word abbreviations from all locales to abbr. patterns */
  let abbreviationPatterns = [];
  for (let i = 0; i < locale.multipleWordAbbreviations.length; i++) {
    let splitAbbreviation = locale.multipleWordAbbreviations[i].split(" ");
    let abbrevationPattern = "";
    for (let j = 0; j < splitAbbreviation.length; j++) {
      abbrevationPattern += `(${splitAbbreviation[j]})(\\.)([${locale.spaces}]?)`;
    }
    abbreviationPatterns[i] = abbrevationPattern;
  }

  /* [3] Identify multiple-word abbreviations before the word

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
      replacement += `$${j * 3 + 2}.${abbrSpace}`;
    }
    replacement += `$${(abbrCount - 1) * 3 + 2}. $${abbrCount * 3 + 2}`;

    string = string.replace(new RegExp(pattern, "gi"), replacement);
  }

  /* [4] Identify multiple-word abbreviations after the word

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
      replacement += `$${j * 3 + 2}.${abbrSpace}`;
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
    abbreviationPatterns[i] = `(${locale.singleWordAbbreviations[i]})(\\.)([${locale.spaces}]?)`;
  }

  /* [2] Identify single-word abbreviations before the word
   */
  // prettier-ignore
  let precedingNonLatinBoundary = `([^${locale.allChars}${locale.enDash}${locale.emDash}${locale.nbsp}\\.]|^)`;
  let followingWord = `([${locale.allChars}\\d]+)([^\\.]|$)`;

  for (let i = 0; i < abbreviationPatterns.length; i++) {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `${precedingNonLatinBoundary}${abbreviationPatterns[i]}${followingWord}`, 
        "gi"
      ), 
      `$1$2$3${locale.nbsp}$5$6`
    );
  }

  /* [3] Identify single-word abbreviations after the word
   */
  let precedingWord = `([${locale.allChars}\\d])([${locale.spaces}])`;
  let followingNonLatinBoundary = `([^${locale.spaces}${locale.allChars}\\d]|$)`;
  for (let i = 0; i < abbreviationPatterns.length; i++) {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `${precedingWord}${abbreviationPatterns[i]}${followingNonLatinBoundary}`, 
        "gi"
      ), 
      `$1${locale.nbsp}$3$4$5$6`
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
