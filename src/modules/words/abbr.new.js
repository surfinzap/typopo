// Constants
const CAPTURE_GROUPS_PER_ABBREVIATION = 3;

// Boundary pattern factories
function createPrecedingBoundary(locale, includeNbsp = false) {
  const chars = locale.allChars + locale.enDash + locale.emDash;
  const nbspPart = includeNbsp ? locale.nbsp : "";
  return `([^${chars}${nbspPart}\\.]|^)`;
}

function createFollowingBoundary(locale, type = "word") {
  if (type === "word") {
    return `([${locale.allChars}\\d]+)([^\\.]|$)`;
  }
  if (type === "nonLatin") {
    const chars =
      locale.allChars + locale.leftDoubleQuote + locale.leftSingleQuote + locale.backtick;
    return `([^${chars}\\p{Emoji}]|$)`;
  }
  if (type === "simple") {
    return `([${locale.allChars}]|\\D)`;
  }
  return `([^${locale.spaces}${locale.allChars}\\d]|$)`;
}

// Locale-specific spacing strategy
function getAbbreviationSpace(locale) {
  return locale.locale === "en-us" ? "" : locale.nbsp;
}

function getInitialSpace(locale) {
  return locale.locale === "en-us" ? "" : locale.nbsp;
}

// Replacement string builders
function buildAbbreviationReplacement(abbrCount, space, hasFollowingText = true) {
  let replacement = "$1";

  for (let i = 0; i < abbrCount - 1; i++) {
    replacement += "$" + (i * CAPTURE_GROUPS_PER_ABBREVIATION + 2) + "." + space;
  }

  const lastAbbrGroup = (abbrCount - 1) * CAPTURE_GROUPS_PER_ABBREVIATION + 2;
  const followingGroup = abbrCount * CAPTURE_GROUPS_PER_ABBREVIATION + 2;

  if (hasFollowingText) {
    replacement += "$" + lastAbbrGroup + ". $" + followingGroup;
  } else {
    replacement += "$" + lastAbbrGroup + ".$" + followingGroup;
  }

  return replacement;
}

// Pattern creation helpers
function createAbbreviationPatternsWithLocale(abbreviations, locale) {
  return abbreviations.map((abbr) => {
    const splitAbbreviation = abbr.split(" ");
    return splitAbbreviation.map((part) => `(${part})(\\.)([${locale.spaces}]?)`).join("");
  });
}

// Generic abbreviation processor
function processAbbreviations(
  string,
  patterns,
  boundaries,
  space,
  hasFollowingText = true,
  flags = "gi"
) {
  for (const pattern of patterns) {
    const fullPattern = boundaries.preceding + pattern + boundaries.following;
    const re = new RegExp(fullPattern, flags);
    const abbrCount = (pattern.match(/\(/g) || []).length / CAPTURE_GROUPS_PER_ABBREVIATION;
    const replacement = buildAbbreviationReplacement(abbrCount, space, hasFollowingText);

    string = string.replace(re, replacement);
  }
  return string;
}

/**
  Fixes spaces around initials for First and up to two Middle names
  It won't fix any other abbreviation.

  Algorithm
  [1] Identify and replace pattern "I. FullName"
  [2] Identify and replace pattern "I. I. FullName"
  [3] Identify and replace pattern "I. I. I. FullName"

  @param {string} input text for identification
  @returns {string} corrected output
*/
export function fixInitials(string, locale) {
  const initialSpace = getInitialSpace(locale);
  const initialPattern = `([${locale.uppercaseChars}][${locale.allChars}]?\\.)([${locale.spaces}]?)`;
  const fullNamePattern = `([${locale.allChars}]{2,}[^\\.])`;

  const patterns = [
    { pattern: initialPattern + fullNamePattern, replacement: `$1${locale.nbsp}$3` },
    { pattern: initialPattern + initialPattern + fullNamePattern, replacement: `$1${initialSpace}$3${locale.space}$5` },
    { pattern: initialPattern + initialPattern + initialPattern + fullNamePattern, replacement: `$1${initialSpace}$3${initialSpace}$5${locale.space}$7` }
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
  const abbrSpace = getAbbreviationSpace(locale);
  const abbreviationPatterns = createAbbreviationPatternsWithLocale(
    locale.multipleWordAbbreviations,
    locale
  );

  // [3] Fix multiple-word abbreviations before the word
  const beforeWordBoundaries = {
    preceding: createPrecedingBoundary(locale),
    following: createFollowingBoundary(locale, "simple"),
  };
  string = processAbbreviations(
    string,
    abbreviationPatterns,
    beforeWordBoundaries,
    abbrSpace,
    true,
    "gi"
  );

  // [4] Fix multiple-word abbreviations after the word or on their own
  const afterWordBoundaries = {
    preceding: createPrecedingBoundary(locale),
    following: createFollowingBoundary(locale, "nonLatin"),
  };
  string = processAbbreviations(
    string,
    abbreviationPatterns,
    afterWordBoundaries,
    abbrSpace,
    false,
    "giu"
  );

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
  const abbreviationPatterns = locale.singleWordAbbreviations.map(
    (abbr) => `(${abbr})(\\.)([${locale.spaces}]?)`
  );

  const precedingBoundary = createPrecedingBoundary(locale, true);
  const followingWordBoundary = createFollowingBoundary(locale, "word");
  const precedingWordPattern = `([${locale.allChars}\\d])([${locale.spaces}])`;
  const followingEndBoundary = `([^${locale.spaces}${locale.allChars}\\d]|$)`;

  // [2] Fix single-word abbreviations before the word
  for (const abbreviationPattern of abbreviationPatterns) {
    const pattern = precedingBoundary + abbreviationPattern + followingWordBoundary;
    const re = new RegExp(pattern, "gi");
    const replacement = "$1$2$3" + locale.nbsp + "$5$6";

    string = string.replace(re, replacement);
  }

  // [3] Fix single-word abbreviations after the word
  for (const abbreviationPattern of abbreviationPatterns) {
    const pattern = precedingWordPattern + abbreviationPattern + followingEndBoundary;
    const re = new RegExp(pattern, "gi");
    const replacement = "$1" + locale.nbsp + "$3$4$5$6";

    string = string.replace(re, replacement);
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
