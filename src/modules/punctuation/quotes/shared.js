import { base } from "../../../const.js";

/**
  Logic shared by the single-quote and double-quote modules.

  The two modules were built independently and converged on the same
  algorithms, expressed twice. Everything here is a single implementation
  parametrized by the quote pair it operates on, so a fix lands in one place
  instead of needing to be mirrored.

  A “quote pair” throughout this file is `{ open, close }` holding the
  locale-specific glyphs — e.g. `{ open: "“", close: "”" }` for en-us double
  quotes, `{ open: "‚", close: "‘" }` for cs single quotes.
*/

//

/**
  Fix punctuation placement for single-word quoted content

  Single word = no spaces inside quotes (includes contractions, hyphenated words, numbers)

  Rules:
  - move periods `.`, commas `,`, semicolons `;`, colons `:` outside the quoted word
  - keep the position of `!`, `?`, and `…` as is (ambiguous context)

  Examples:
  “word.” → “word”.
  “it’s,” → “it’s”,
  “well-known;” → “well-known”;
  “2020:” → “2020”:
  “Wow!” → “Wow!” (unchanged—ambiguous)

  @param {string} string: input text for identification
  @param {{open: string, close: string}} pair: quote pair to operate on
  @returns {string} output with corrected punctuation placement
*/
export function fixQuotedWordPunctuation(string, pair) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${pair.open})` +
      `([^${base.spaces}${pair.close}]+?)` +
      `([^${base.romanNumerals}${base.sentencePunctuation}])` +
      `([${base.sentencePunctuation}]{1,})` +
      `(${pair.close})`,
      "g"
    ),
    (match, leftQuote, content, notRoman, punct, rightQuote) => {
      if (punct.length === 1 && /[.,;:]/.test(punct)) {
        return leftQuote + content + notRoman + rightQuote + punct;
      }
      return match; // Return unchanged for everything else
    }
  );
}

//

/**
  Fix punctuation placement for quoted sentence or fragment of words

  Rules:
  - move periods `.`, commas `,`, semicolons `;`, ellipses `…`exclamation `!` and question marks `?` inside the quoted part
  - move colons `:` and semicolons `;` outside the quoted part

  Nesting
  When `outerClose` is given, the quoted part is treated as possibly nested
  inside another quote pair (single quotes inside double quotes). Two extra
  rules then apply:
  - the move-inside rule does not fire when the outer closing quote follows,
    since that case is handled by the rule below instead
  - terminal punctuation moves back outside when the quoted fragment ends a
    quoted sentence, e.g. `…fragment.’”` → `…fragment’.”`

  Omitting `outerClose` yields the plain, non-nested behaviour.

  @param {string} string: input text for identification
  @param {{open: string, close: string}} pair: quote pair to operate on
  @param {string} [outerClose]: closing quote of the enclosing pair, if any
  @returns {string} output with corrected punctuation placement
 */
export function fixQuotedSentencePunctuation(string, pair, outerClose) {
  const isNested = typeof outerClose !== "undefined";

  // move everything inside
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `(${pair.open})` +
      `(.+)` +
      `([${base.spaces}])(?!${pair.open})` +
      `([^${base.romanNumerals}]{2,})` +
      `(${pair.close})` +
      `([${base.sentencePunctuation}${base.ellipsis}])` +
      (isNested ? `([^${outerClose}])` : ``),
      "g"
    ),
    `$1` +
    `$2` +
    `$3` +
    `$4` +
    `$6` +
    `$5` +
    (isNested ? `$7` : ``)
  );

  // move colons and semicolons outside
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `([:;])` +
      `(${pair.close})`,
      "g"
    ),
    `$2$1`
  );

  // move terminal punctuation (.?!…) outside when quoted fragment is at the end of a quoted sentence
  if (isNested) {
    // prettier-ignore
    string = string.replace(
      new RegExp(
        `([${base.terminalPunctuation}${base.ellipsis}])` +
        `(${pair.close})` +
        `(${outerClose})`,
        "g"
      ),
      `$2$1$3`
    );
  }

  return string;
}

//

/**
  Replace a quote & a prime in pair with a quote pair

  Assumptions and Limitations
  This function follows previous functions that identify primes or unpaired
  quotes. So it may happen that previous functions falsely identify a quote
  pair around situations such as:
  - It’s called “Localhost 3000” and it’s pretty fast.

  Algorithm
  Find unpaired quote and prime in pair and change them to a quote pair

  @param {string} string: input text for identification
  @param {{openUnpaired: string, closeUnpaired: string, prime: string, open: string, close: string}} marks: processing markers to match and emit
  @returns {string} output with a quote pair
*/
export function replacePrimeWithQuotePair(string, marks) {
  // prettier-ignore
  return string
    .replace(
      new RegExp(
        `(${marks.openUnpaired})` +
        `(.*?)` +
        `(${marks.prime})`,
        "g"
      ),
      `${marks.open}` +
      `$2` +
      `${marks.close}`
    )
    .replace(
      new RegExp(
        `(${marks.prime})` +
        `(.*?)` +
        `(${marks.closeUnpaired})`,
        "g"
      ),
      `${marks.open}` +
      `$2` +
      `${marks.close}`
    );
}

//

/**
  Replace all identified punctuation with appropriate punctuation in given language

  Context
  The quote modules first identify quote and prime adepts and replace them
  temporarily with processing markers. This applies the swap from those
  markers to the desired characters, in order.

  @param {string} string: input text for identification
  @param {Array<{pattern: string, replacement: string}>} replacements: marker pattern → output character, applied in order
  @returns {string} an output with locale-specific quotes and primes
*/
export function placeLocaleQuotes(string, replacements) {
  return replacements.reduce(
    (text, { pattern, replacement }) => text.replace(new RegExp(pattern, "gu"), replacement),
    string
  );
}

//

/**
  Remove a space before a given character

  Example
  12′ 45 ″ →
  12′ 45″

  Assumptions and Limitations
  Runs after all quotes and primes have been identified.

  @param {string} string: input text for identification
  @param {string} character: the character a preceding space is removed from
  @returns {string} output with adjusted spacing
*/
export function removeExtraSpaceBefore(string, character) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([${base.spaces}])` +
      `(${character})`,
    "g"),
    `$2`
  );
}

//

/**
  Remove a space after a given character

  Example
  “ English” →
  “English”

  @param {string} string: input text for identification
  @param {string} character: the character a following space is removed from
  @returns {string} output with adjusted spacing
*/
export function removeExtraSpaceAfter(string, character) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(${character})` +
      `([${base.spaces}])`,
    "g"),
    `$1`
  );
}
