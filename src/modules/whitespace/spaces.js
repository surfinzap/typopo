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
  Removes extra spaces and tabs at the beginning of each paragraph, unless user configures to keep spaces before beginning of the nested markdown lists
  
  [1] split the lines manually
  [2] if removeWhitespacesBeforeMarkdownList = false; keep the spaces before the markdown lists
  [3] otherwise remove other empty spaces or tabs at the beginning of the paragraph
  [4] join lines together to a single string

  @param {string} string — input text for identification
  @param {object} configuration — typopo configuration
  @returns {string} — output with removed spaces at the beginning of paragraphs
*/
export function removeSpacesAtParagraphBeginning(string, configuration) {
  /* [1] split the lines manually */
  let lines = string.split(/\r?\n/);

  let re = new RegExp("(^\\s+)([-\\*\\+\\>]*)", "g"); // identify whitespaces and markdown list and blockquote indicators -/*>

  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(re, function ($0, $1, $2) {
      /* [2] */
      if (configuration.removeWhitespacesBeforeMarkdownList == false && $2 != "") {
        return $1 + $2;
        /* [3] */
      } else {
        return $2;
      }
    });
  }

  /* [4] join lines together to a single string */
  return lines.join("\n");
}

//

/**
  Removes extra spaces and tabs at the end of each paragraph.

  [1] split the lines manually
  [2] remove empty spaces or tabs at the end of the paragraph
  [3] join lines together to a single string
  
  @param {string} string — input text for identification
  @returns {string} — output with removed spaces at the end of paragraphs
  */
export function removeSpacesAtParagraphEnd(string) {
  /* [1] split the lines manually */
  let lines = string.split(/\r?\n/);
  let re = new RegExp("(\\s+$)", "g");

  /* [2] remove empty spaces or tabs at the end of the paragraph*/
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(re, "");
  }

  /* [3] join lines together to a single string */
  return lines.join("\n");
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
      `([${base.spaces}])` +
      `([${base.terminalPunctuation}${base.closingBrackets}${base.degree}])`,
      "g"
    ),
    `$2`
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
      `([${base.spaces}])`,
      "g"
    ),
    `$1`
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
      `([${base.lowercaseChars}${base.uppercaseChars}])` +
      `([${base.openingBrackets}])` +
      `([${base.lowercaseChars}${base.uppercaseChars}${base.ellipsis}])` +
      `([${base.lowercaseChars}${base.uppercaseChars}${base.ellipsis}${base.closingBrackets}])`,
      "g"
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
      `([${base.lowercaseChars}${base.uppercaseChars}]{2,}|[${base.ellipsis}])` +
      `([${base.terminalPunctuation}])` +
      `([${base.uppercaseChars}])`,
      "g"
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
      `([${base.lowercaseChars}${base.uppercaseChars}]{2,}|[${base.ellipsis}])` +
      `([${base.sentencePausePunctuation}])` +
      `([${base.lowercaseChars}${base.uppercaseChars}])`,
      "g"
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
      `([${base.lowercaseChars}${base.uppercaseChars}])`,
      "g"
    ),
    `$1 $2`
  );
}

//

export function addSpaceBeforeSymbol(string, symbol) {
  // prettier-ignore
  return string.replace(
    new RegExp(`([^${base.spaces}${base.openingBrackets}])(${symbol})`, "g"),
    `$1${base.space}$2`
  );
}

//

export function fixSpaces(string, locale, configuration) {
  string = removeMultipleSpaces(string);
  string = removeSpacesAtParagraphBeginning(string, configuration);
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
