import { base } from "../../const.js";

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
  @returns {string} — output with fixed ellipsis
*/
export function replaceThreeCharsWithEllipsis(string) {
  return string.replace(new RegExp(`[${base.ellipsis}\\.]{3,}`, "g"), base.ellipsis);
}

//

/**
  Replace combination of period/ellipsis with an ellipsis

  Example:
  .…, …., …… → …

  @param {string} string — input text for identification
  @returns {string} — output with fixed ellipsis
*/
export function replaceTwoCharsWithEllipsis(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `\\.${base.ellipsis}|` +
      `${base.ellipsis}{2,}|` +
      `${base.ellipsis}\\.`,
      "g"
    ),
    base.ellipsis
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
export function replaceTwoPeriodsWithEllipsis(string) {
  return string.replace(
    new RegExp(`[${base.spaces}]\\.{2}[${base.spaces}]`, "g"),
    `${base.space}${base.ellipsis}${base.space}`
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
export function fixEllipsisSpacingAroundCommas(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(,)` +
      `([${base.spaces}]?)` +
      `(${base.ellipsis})` +
      `([${base.spaces}]?)` +
      `(,)`,
      "g"
    ),
    `$1 ${base.ellipsis}$5`
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
export function fixEllipsisAsLastItem(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(,)` +
      `([${base.spaces}]?)` +
      `(${base.ellipsis})` +
      `([${base.spaces}]?)` +
      `(\\B|[${base.closingBrackets}])` +
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
export function fixAposiopesisStartingParagraph(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(^${base.ellipsis})` +
      `([${base.spaces}])` +
      `([${base.lowercaseChars}${base.uppercaseChars}])`,
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
      `([^${locale.terminalQuotes}])` +
      `([${base.sentencePunctuation}])` +
      `([${base.spaces}]?)` +
      `([${base.ellipsis}])` +
      `([${base.spaces}]?)` +
      `([${base.lowercaseChars}])`,
      "g"
    ),
    "$1$2 $4$6"
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
export function fixAposiopesisBetweenSentences(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.lowercaseChars}])` +
      `([${base.spaces}])` +
      `([${base.ellipsis}])` +
      `([${base.spaces}]?)` +
      `([${base.uppercaseChars}])`,
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
export function fixAposiopesisBetweenWords(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.allChars}])` +
      `([${base.ellipsis}])` +
      `([${base.allChars}])`,
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
  @param {string} locale — locale option
  @returns {string} — output with fixed spacing
*/
export function fixEllipsisBetweenSentences(string, locale) {
  /* [4]	keep spaces around ellipsis when it is used at the beginning
            of the full sentence in the middle of the paragraph */
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.sentencePunctuation}${locale.terminalQuotes}])` +
      `([${base.spaces}]?)` +
      `(${base.ellipsis})` +
      `([${base.spaces}]?)` +
      `([${base.uppercaseChars}])`,
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
  @param {string} locale: locale option
  @returns {string} — output with fixed spacing
*/
export function fixAposiopesisEndingParagraph(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.lowercaseChars}])` +
      `([${base.spaces}])+` +
      `([${base.ellipsis}][${locale.rightDoubleQuote}${locale.rightSingleQuote}]?$)`,
      "gm"
    ),
    "$1$3"
  );
}

//

/**
  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with fixed ellipsis
*/
export function fixEllipsis(string, locale) {
  string = replaceThreeCharsWithEllipsis(string);
  string = fixEllipsisSpacingAroundCommas(string);
  string = fixEllipsisAsLastItem(string);
  string = fixAposiopesisStartingParagraph(string);
  string = fixAposiopesisStartingSentence(string, locale);
  string = fixAposiopesisBetweenSentences(string);
  string = fixAposiopesisBetweenWords(string);
  string = fixEllipsisBetweenSentences(string, locale);
  string = fixAposiopesisEndingParagraph(string, locale);
  string = replaceTwoCharsWithEllipsis(string);
  string = replaceTwoPeriodsWithEllipsis(string);
  return string;
}
