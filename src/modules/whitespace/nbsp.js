import { replaceWithOverlapHandling } from "../../utils/regex-overlap.js";
import { base } from "../../const.js";

//

export function removeNbspBetweenMultiCharWords(string) {
  // prettier-ignore
  return replaceWithOverlapHandling(
    string,
    new RegExp(
      `([${base.lowercaseChars}${base.uppercaseChars}]{2,})` +
      `([${base.nbsp}${base.narrowNbsp}])` +
      `([${base.lowercaseChars}${base.uppercaseChars}]{2,})`, 
      "g"
    ),
    `$1 $3`
  );
}

//

/**
  Replace a space with a non-breaking space after a single-letter preposition

  Examples:
  V obchode → V⎵obchode
  Skáče o tyči → Skáče o⎵tyči

  Counterexamples
  See test case

  Approach
  Split identification of 
  a) small letter prepositions (that can be placed anywhere in the sentence) 
  b) and capital letter prepositions (that are placed at the beginning of the sentence)
  Reason: capital letters in the mid-sentence are rather bound to a previous word and nbsp is fixed by addNbspBeforeSingleLetter
  c) “I” in English

  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with correctly placed non-breaking space
*/
export function addNbspAfterPreposition(string, locale) {
  // a) small letter prepositions
  // prettier-ignore
  string = replaceWithOverlapHandling(
    string,
    new RegExp(
      `(^|[${base.space}]|[^${base.allChars}${base.cardinalNumber}${base.apostrophe}${base.plus}${base.minus}${base.hyphen}])` +
      `([${base.lowercaseChars}])` +
      `([${base.space}])`,
      "g"
    ),
    `$1$2${base.nbsp}`
  );

  // b) capital letter prepositions at the beggining of the sentence
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(^|[${base.sentencePunctuation}` + 
          `${base.ellipsis}` + 
          `${base.copyright}` + 
          `${base.registeredTrademark}` + 
          `${base.soundRecordingCopyright}]` + 
          `)` +
      `([${base.spaces}]?)` +
      `([${base.uppercaseChars}])` +
      `([${base.spaces}])`,
      "g"
    ),
    `$1$2$3${base.nbsp}`
  );

  // c) "I" in English
  if (locale.locale == "en-us") {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `(^|[${base.spaces}])` +
        `(I)` +
        `([${base.spaces}])`, 
        "g"
      ),
      `$1$2${base.nbsp}`
    );
  }

  return string;
}

//

export function addNbspAfterAmpersand(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(`([${base.spaces}])(${base.ampersand})([${base.spaces}])`, "g"),
    ` $2${base.nbsp}`
  );
}

//

/**
  Add a non-breaking space after a cardinal number (up to 99) that precedes a word.

  Assumptions and Limitations
  We’ll identify and place nbsp for 1- or 2-digit cardinal numbers.

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with nbsp after cardinal numbers
*/
export function addNbspAfterCardinalNumber(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
        `([^${base.nbsp}${base.cardinalNumber}]|^)` +
        `(${base.cardinalNumber}{1,2})` +
        `([${base.spaces}])` +
        `([${base.allChars}])`, 
      "g"
    ),
      `$1` +
      `$2` +
      `${base.nbsp}` +
      `$4`
  );
}

//

/**
  Add a non-breaking space after on ordinal number (up to 99) that precedes a word.

  Assumptions and Limitations
  We’ll identify and place nbsp for 1- or 2-digit ordinal numbers.

  @param {string} string: input text for identification
  @param {string} locale: locale option
  @returns {string} output with nbsp after ordinal numbers
*/
export function addNbspAfterOrdinalNumber(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^${base.nbsp}${base.cardinalNumber}_%\\-]|^)` +
      `(${base.cardinalNumber}{1,2})` +
      `(${locale.ordinalIndicator})` +
      `([${base.spaces}]?)` +
      `([${base.allChars}])`,
      "g"
    ),
    `$1$2$3${base.nbsp}$5`
  );
}

//

export function addNbspWithinOrdinalDate(string, locale) {
  // prettier-ignore
  let replacement = "";

  switch (locale.locale) {
    case "en-us":
    case "rue":
    case "sk":
    case "cs":
      replacement = `$1$2${base.nbsp}$4$5${base.nbsp}$7`;
      break;
    case "de-de":
      replacement = `$1$2${base.nbsp}$4$5${base.space}$7`;
      break;
  }

  return string.replace(
    new RegExp(
      `(${base.cardinalNumber})` +
        `(${locale.ordinalIndicator})` +
        `([${base.spaces}]?)` +
        `(${base.cardinalNumber})` +
        `(${locale.ordinalIndicator})` +
        `([${base.spaces}]?)` +
        `(${base.cardinalNumber})`,
      "g"
    ),
    replacement
  );
}

//

/**
  Fix non-breaking space after Ordinal Roman Number

  Examples:
  I. kapitola
  X. ročník
  8. V. 1945

  @param {string} string — input text for identification
  @returns {string} — output with correctly placed non-breaking space
*/
export function addNbspAfterRomanNumeral(string, locale) {
  // we can identify roman numeral effectively only if it has an ordinal indicator
  if (locale.romanOrdinalIndicator != "") {
    // prettier-ignore
    return string.replace(
      new RegExp(
        `(\\b)` +
        `([${base.romanNumerals}]+)` +
        `(${locale.romanOrdinalIndicator})` +
        `([${base.spaces}]?)` +
        `([${base.allChars}${base.cardinalNumber}])`,
        "g"
      ),
      `$1$2$3${base.nbsp}$5`
    );
  }

  return string;
}

//

/**
  Fix non-breaking space around name with regnal number

  Examples:
  Karel IV. → Karel⎵IV.
  Karel IV.⎵byl → Karel⎵IV. byl
  Charles IV → Charles⎵IV

  Unsupported:
  Charles I → Charles I
  (first emperor, English language; otherwise “When I am” would be incorrectly fixed)

  @param {string} string — input text for identification
  @returns {string} — output with correctly placed non-breaking space
*/
export function fixNbspForNameWithRegnalNumber(string, locale) {
  // prettier-ignore
  let pattern =
      `(\\b[${base.uppercaseChars}][${base.lowercaseChars}]+?)` +
      `([${base.spaces}])` +
      `([${base.romanNumerals}]+\\b)` +
      `(${locale.romanOrdinalIndicator})` +
      `([${base.nbsp}]?)`;
  let re = new RegExp(pattern, "g");

  return string.replace(re, function ($0, $1, $2, $3, $4, $5) {
    if ($5 == "" && $3 == "I") {
      return $1 + base.space + $3 + $4;
    } else if ($5 == "" && $3 != "I") {
      return $1 + base.nbsp + $3 + $4;
    } else if ($5 == base.nbsp && $3 == "I") {
      return $1 + base.space + $3 + $4 + $5;
    } else {
      return $1 + base.nbsp + $3 + $4 + base.space;
    }
  });
}

//

/**
  Fix nbsp before % (percent), ‰ (permille) and ‱ (permyriad)

  Locale differences
  - en-us prefers no space (https://www.chicagomanualofstyle.org/qanda/data/faq/topics/Numbers/faq0005.html)
  - de-de prefers narrow nbsp for perecent used as noun (https://german.stackexchange.com/questions/41550/what-does-din-5008-exactly-say-about-percent-character)
  - sk, cs, rue prefers nbsp for percent used as noun

  In sk, cs, rue, de-de, when percent is used as an adjective, there is no space between a number and a percent sign. This algorithm does not cover this use case, just tries to fix a space if there is one. 


  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with correctly added non-breaking space
*/
export function fixSpaceBeforePercent(string, locale) {
  const SPACE_REPLACEMENT = {
    "en-us": ``,
    "sk":    `${base.nbsp}`,
    "cs":    `${base.nbsp}`,
    "rue":   `${base.nbsp}`,
    "de-de": `${base.narrowNbsp}`,
  };

  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\d)` +
      `([${base.spaces}])` +
      `([${base.percent}${base.permille}${base.permyriad}])`,
      "g"
    ),
    `$1${SPACE_REPLACEMENT[locale.locale]}$3`
  );
}

//

/**
  Add/Swap non-breaking space before a single capital letter in a sentence

  Examples:
  The product X is missing the feature Y.
  Sputnik V
  © V Inc.
  Človek Č

  Counter examples:
  When I talk to emerging product designers (capital I in English language)
  Dear Christopher
  pán Šťastný
  pán ŠŤASTNÝ
  One sentence ends. A bad apple. (single letter before sentence punctuation)
  sentence; C-level executive (single letter befor sentence punctuation)
  I’d say… A-player.
  sentence (brackets) A-player
  “qouted part” A capital letter
  A × A (this should be fixed in multiplication sign, but maybe irrelevant)
  famous company — A Inc. (this should be fixed in dash.js)


  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with correctly added non-breaking space
*/
export function addNbspBeforeSingleLetter(string, locale) {
  let uppercaseChars = base.uppercaseChars;

  if (locale.locale == "en-us") {
    // remove “I” from the list to avoid placing nbsp before “something I do”
    uppercaseChars = uppercaseChars.replace(/A-Z/g, "A-HJ-Z");
  }

  // prettier-ignore
  let pattern = 
    `([^${base.sentencePunctuation}${base.ellipsis}${base.closingBrackets}${locale.rightDoubleQuote}${locale.rightSingleQuote}${base.apostrophe}${base.multiplicationSign}${base.emDash}${base.enDash}])` +
    `([${base.spaces}])` +
    `([${uppercaseChars}])` +
    `(([${base.spaces}])|(\\.$|$))`;

  let re = new RegExp(pattern, "g");

  return string.replace(re, function ($0, $1, $2, $3, $4, $5) {
    if (locale.locale == "en-us") {
      // don't make changes after "I" in en-us
      return $1 + base.nbsp + $3 + $4;
    } else if ($3 == "I" && ($5 == base.nbsp || $5 == base.hairSpace || $5 == base.narrowNbsp)) {
      // replace nbsp after "I" in other languages
      return $1 + base.nbsp + $3 + base.space;
    } else {
      // just add nbsp before single word capital letter in the rest of the cases
      return $1 + base.nbsp + $3 + $4;
    }
  });
}

//

/**
  Helper function that adds nbsp after symbols
  in their respective *.js files

  @param {string} string — input text for identification
  @returns {string} — output with correctly added non-breaking space
*/
export function addNbspAfterSymbol(string, symbol) {
  // prettier-ignore
  return string.replace(
    new RegExp(`(${symbol})([^${base.spaces}])`, "g"),
    `$1${base.nbsp}$2`
  );
}

//

/**
  Helper function that fixes various spaces for nbsp after symbols
  in their respective *.js files

  @param {string} string — input text for identification
  @returns {string} — output with correctly placed non-breaking space
*/
export function replaceSpacesWithNbspAfterSymbol(string, symbol) {
  // prettier-ignore
  return string.replace(
    new RegExp(`(${symbol})([${base.spaces}])`, "g"),
    `$1${base.nbsp}`
  );
}

//

/**
  Consolidates the use of non-breaking spaces

  @param {string} string — input text for identification
  @returns {string} — output with correctly placed non-breaking space
*/
export function fixNbsp(string, locale) {
  string = removeNbspBetweenMultiCharWords(string);
  string = addNbspAfterPreposition(string, locale);
  string = addNbspAfterAmpersand(string);
  string = addNbspAfterCardinalNumber(string);
  string = addNbspAfterOrdinalNumber(string, locale);
  string = addNbspWithinOrdinalDate(string, locale);
  string = addNbspAfterRomanNumeral(string, locale);
  string = addNbspBeforeSingleLetter(string, locale);
  string = fixNbspForNameWithRegnalNumber(string, locale);
  string = fixSpaceBeforePercent(string, locale);

  return string;
}
