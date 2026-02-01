import { base } from "../../const.js";

/**
  Removes mutliple spaces between words 

  @param {string} string — input text for identification
  @returns {string} — output with removed spaces between words
*/
export function removeMultipleSpaces(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\S)` +
      `([${base.spaces}]{2,})` +
      `(\\S)`,
      "g"
    ),
    `$1 $3`
  );
}

//

/**
  Removes extra spaces and tabs at the beginning of each paragraph

  @param {string} string — input text for identification
  @returns {string} — output with removed spaces at the beginning of paragraphs
*/
export function removeSpacesAtParagraphBeginning(string) {
  return string
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s+/, ""))
    .join("\n");
}

//

/**
  Removes extra spaces and tabs at the end of each paragraph.

  @param {string} string — input text for identification
  @returns {string} — output with removed spaces at the end of paragraphs
  */
export function removeSpacesAtParagraphEnd(string) {
  return string
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+$/, ""))
    .join("\n");
}

//

export function removeSpaceBeforeSentencePausePunctuation(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.spaces}])` +
      `([${base.sentencePausePunctuation}])` +
      `([^\\-\\)]|$)`, 
      "g"
    ),
    `$2$3`
  );
}

//

/**
  Removes extra space before:
  - terminal punctuation
  - closing brackets
  - degree symbol (°)

  Examples:
  Hey . → Hey.
  Sentence and… ! → Sentence and…!
  Something (… ) something else → Something (…) something else
  5 ° → 5°

  @param {string} string — input text for identification
  @returns {string} — output with removed spaces before terminal punctuation
*/
export function removeSpaceBeforeTerminalPunctuation(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^${base.openingBrackets}])` +
      `([${base.spaces}])` +
      `([${base.terminalPunctuation}${base.closingBrackets}${base.degree}])`,
      "g"
    ),
    `$1$3`
  );
}

//

/**
  Removes extra spaces before ordinal indicator

  Examples:
  1 st → 1st
  2 nd → 2nd
  1 . spoj → 1. spoj

  @param {string} string — input text for identification
  @param {string} locale: locale option
  @returns {string} — output with removed spaces before ordinal indicator
*/
export function removeSpaceBeforeOrdinalIndicator(string, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\d)` +
      `([${base.spaces}]?)` +
      `(${locale.ordinalIndicator})` +
      `([${base.spaces}]|\\b)`, //to avoid cathing "4 th" in "4 there"
      "g"
    ),
    `$1$3$4`
  );
}

//

export function removeSpaceAfterOpeningBrackets(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.openingBrackets}])` +
      `([${base.spaces}])` +
      `([^${base.closingBrackets}])`,
      "g"
    ),
    `$1$3`
  );
}

/**
  Add a space before opening brackets

  Examples:
  Enclosed(in) the brackets. →
  Enclosed (in) the brackets.

  Enclosed[in] the brackets. →
  Enclosed [in] the brackets.

  Enclosed{in} the brackets. →
  Enclosed {in} the brackets.

  Exclusions:
  name(s) → name(s)
  NAME(S) → NAME(S)
  mass(es) → mass(es)
  MASS(ES) → MASS(ES)

  @param {string} string — input text for identification
  @returns {string} — output with a space before an opening bracket
*/
export function addSpaceBeforeOpeningBrackets(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}])` +
      `([${base.openingBrackets}])` +
      `([\\p{L}${base.ellipsis}])` +
      `([\\p{L}${base.ellipsis}${base.closingBrackets}])`,
      "gu"
    ),
    function ($0, $1, $2, $3, $4) {
      if (($3 == "s") | ($3 == "S") | ($3 + $4 == "es") | ($3 + $4 == "ES")) {
        return `${$1}${$2}${$3}${$4}`;
      } else {
        return `${$1}${base.space}${$2}${$3}${$4}`;
      }
    }
  );
}

//

/**
  Add a space after terminal punctuation

  Example:
  One sentence ended.Another started. →
  One sentence ended. Another started.

  @param {string} string — input text for identification
  @returns {string} — output with a space after terminal punctuation
*/
export function addSpaceAfterTerminalPunctuation(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}]{2,}|[${base.ellipsis}])` +
      `([${base.terminalPunctuation}])` +
      `([\\p{Lu}])`,
      "gu"
    ),
    `$1$2 $3`
  );
}

//

/**
  Add a space after sentence pause punctuation

  Example:
  One sentence ended,another started. →
  One sentence ended, another started.

  @param {string} string — input text for identification
  @returns {string} — output with a space after closing brackets
*/
export function addSpaceAfterSentencePause(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([\\p{L}]{2,}|[${base.ellipsis}])` +
      `([${base.sentencePausePunctuation}])` +
      `([\\p{L}])`,
      "gu"
    ),
    `$1$2 $3`
  );
}

//

/**
  Add a space after closing brackets

  Example:
  Enclosed (in)the brackets. → Enclosed (in) the brackets.

  @param {string} string — input text for identification
  @returns {string} — output with a space after closing brackets
*/
export function addSpaceAfterClosingBrackets(string) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.closingBrackets}])` +
      `([\\p{L}])`,
      "gu"
    ),
    `$1 $2`
  );
}

//

export function addSpaceBeforeSymbol(string, symbol) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^${base.spaces}${base.openingBrackets}${symbol}])` + 
      `(${symbol})`, 
      `g`
    ),
    `$1${base.space}$2`
  );
}

//

export function fixSpaces(string, locale) {
  string = removeMultipleSpaces(string);
  string = removeSpacesAtParagraphBeginning(string);
  string = removeSpacesAtParagraphEnd(string);
  string = removeSpaceBeforeSentencePausePunctuation(string);
  string = removeSpaceBeforeTerminalPunctuation(string);
  string = removeSpaceBeforeOrdinalIndicator(string, locale);
  string = removeSpaceAfterOpeningBrackets(string);
  string = addSpaceBeforeOpeningBrackets(string);
  string = addSpaceAfterTerminalPunctuation(string);
  string = addSpaceAfterClosingBrackets(string);
  string = addSpaceAfterSentencePause(string);
  return string;
}
