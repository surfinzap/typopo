/*
  Ellipsis (as a character) is used for 2 different purposes:
  1. as an ellipsis to ommit a piece of information deliberately
  2. as an aposiopesis; a figure of speech wherein a sentence is
  deliberately broken off and left unfinished

  sources
  https://en.wikipedia.org/wiki/Ellipsis
  https://en.wikipedia.org/wiki/Aposiopesis
  http://www.liteera.cz/slovnik/vypustka
*/

//

/**
  Replace 3 and more dots/ellipses with an ellipsis

  Example:
  Sentence ending…..... → Sentence ending…

  @param {string} string — input text for identification
  @param {string} locale — locale option
  @returns {string} — output with fixed ellipsis
*/
export function replaceThreeCharsWithEllipsis(string, locale) {
  return string.replace(new RegExp(`[${locale.ellipsis}\\.]{3,}`, "g"), locale.ellipsis);
}

//

/**
  Replace combination of period/ellipsis with an ellipsis

  Example:
  .…, …., …… → …

  @param {string} string — input text for identification
  @returns {string} — output with fixed ellipsis
*/
export function replaceTwoCharsWithEllipsis(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `\\.${locale.ellipsis}|` +
      `${locale.ellipsis}{2,}|` +
      `${locale.ellipsis}\\.`,
      "g"
    ),
    locale.ellipsis
  );
}

//

/**
  Replace two periods between words (spaces) with an ellipsis

  Example
  word .. word → word … word

  @param {string} string — input text for identification
  @returns {string} — output with fixed ellipsis
*/
export function replaceTwoPeriodsWithEllipsis(string, locale) {
  return string.replace(
    new RegExp(`[${locale.spaces}]\\.{2}[${locale.spaces}]`, "g"),
    `${locale.space}${locale.ellipsis}${locale.space}`
  );
}

//

/**
  Fix spacing, when ellipsis is used around commas

  Example:
  We sell apples, oranges,…, pens. → We sell apples, oranges, …, pens.
  We sell apples, oranges, … , pens. → We sell apples, oranges, …, pens.

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing around ellipsis
*/
export function fixEllipsisSpacingAroundCommas(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(,)` +
      `([${locale.spaces}]?)` +
      `(${locale.ellipsis})` +
      `([${locale.spaces}]?)` +
      `(,)`,
      "g"
    ),
    `$1 ${locale.ellipsis}$5`
  );
}

//

/**
  Fix spacing, when ellipsis is used as the last item in the list

  Example:
  We sell apples, oranges, … → We sell apples, oranges,…
  (apples, oranges, … ) → (apples, oranges,…)

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing around ellipsis
*/
export function fixEllipsisAsLastItem(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(,)` +
      `([${locale.spaces}]?)` +
      `(${locale.ellipsis})` +
      `([${locale.spaces}]?)` +
      `(\\B|[${locale.closingBrackets}])` +
      `([^,]|$)`,
      "g"
    ),
    "$1$3$5$6"
  );
}

//

/**
  Fix spacing, when aposiopesis is starting a paragraph

  Examples:
  … and we were there. → …and we were there.

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing
*/
export function fixAposiopesisStartingParagraph(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(^${locale.ellipsis})` +
      `([${locale.spaces}])` +
      `([${locale.lowercaseChars}${locale.uppercaseChars}])`,
      "gm"
    ),
    "$1$3"
  );
}

//

/**
  Fix spacing, when aposiopesis is starting a sentence

  Examples:
  Sentence ended. … and we were there. →
  Sentence ended. …and we were there.

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing
*/
export function fixAposiopesisStartingSentence(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.sentencePunctuation}${locale.terminalQuotes}])` +
      `([${locale.spaces}]?)` +
      `([${locale.ellipsis}])` +
      `([${locale.spaces}]?)` +
      `([${locale.lowercaseChars}])`,
      "g"
    ),
    "$1 $3$5"
  );
}

//

/**
  Fix spacing, when aposiopesis is between sentences
  Aposiopesis × Ellipsis between sentences? Ellipsis follows a finished sentece.

  Examples:
  Sentence ending … And another starting →
  Sentence ending… And another starting

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing
*/
export function fixAposiopesisBetweenSentences(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.lowercaseChars}])` +
      `([${locale.spaces}])` +
      `([${locale.ellipsis}])` +
      `([${locale.spaces}]?)` +
      `([${locale.uppercaseChars}])`,
      "g"
    ),
    "$1$3 $5"
  );
}

//

/**
  Fix spacing, when aposiopesis is between words
  This is a best effort guess, that we’re dealing with aposiopesis.

  Examples:
  word…word → word… word

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing
*/
export function fixAposiopesisBetweenWords(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.allChars}])` +
      `([${locale.ellipsis}])` +
      `([${locale.allChars}])`,
      "g"
    ),
    "$1$2 $3"
  );
}

//

/**
  Fix spacing, when ellipsis is between sentences
  Aposiopesis × Ellipsis between sentences? Ellipsis follows a finished sentece.

  Examples:
  What are you saying. …She did not answer. →
  What are you saying. … She did not answer.

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing
*/
export function fixEllipsisBetweenSentences(string, locale) {
  /* [4]	keep spaces around ellipsis when it is used at the beginning
            of the full sentence in the middle of the paragraph */
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.sentencePunctuation}${locale.terminalQuotes}])` +
      `([${locale.spaces}]?)` +
      `(${locale.ellipsis})` +
      `([${locale.spaces}]?)` +
      `([${locale.uppercaseChars}])`,
      "g"
    ),
    "$1 $3 $5"
  );
}

//

/**
  Fix spacing, when aposiopesis is ending a paragraph

  Examples:
  Sentence ending … → Sentence ending…

  @param {string} string — input text for identification
  @returns {string} — output with fixed spacing
*/
export function fixAposiopesisEndingParagraph(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${locale.lowercaseChars}])` +
      `([${locale.spaces}])+` +
      `([${locale.ellipsis}][${locale.rightDoubleQuote}${locale.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}

//

export function fixEllipsis(string, locale) {
  string = replaceThreeCharsWithEllipsis(string, locale);
  string = fixEllipsisSpacingAroundCommas(string, locale);
  string = fixEllipsisAsLastItem(string, locale);
  string = fixAposiopesisStartingParagraph(string, locale);
  string = fixAposiopesisStartingSentence(string, locale);
  string = fixAposiopesisBetweenSentences(string, locale);
  string = fixAposiopesisBetweenWords(string, locale);
  string = fixEllipsisBetweenSentences(string, locale);
  string = fixAposiopesisEndingParagraph(string, locale);
  string = replaceTwoCharsWithEllipsis(string, locale);
  string = replaceTwoPeriodsWithEllipsis(string, locale);
  return string;
}
