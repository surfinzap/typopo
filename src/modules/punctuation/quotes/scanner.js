/**
  Quote scanning: turn a string into a list of quote-adept tokens.

  How scanQuoteTokens works
  It runs the adept pattern over the string with matchAll and turns every hit
  into a token: where it starts and ends, the raw text matched (a greedy run
  such as `‘‘‘` or `,,` stays one token), whether it is a double or a single
  adept, the 0-based line it sits on (counted by walking the text skipped since
  the previous token), and the single characters immediately before and after
  it. Tokens come back in document order; the string itself is not modified.
*/

import { base } from "../../../const.js";

export const DOUBLE = "double";
export const SINGLE = "single";

/**
  The combined adept pattern, for scanning single and double quotes as one
  stream.

  The double alternatives come first on purpose. JS alternation is
  leftmost-first at every position, so a run such as `''`, `,,` or ``` `` ```
  matches the double alternative as a single token, and only a lone mark falls
  through to the single alternative. Putting the single adepts first would
  break every run into two tokens.
*/
export const quoteAdepts = `(?:${base.doubleQuoteAdepts})|(?:${base.singleQuoteAdepts})`;

/*
  A token is a double adept when its whole raw text is one. Deriving the kind
  from the matched text rather than from which alternative fired keeps
  scanQuoteTokens working for callers that pass a single adept set: a token
  scanned with base.singleQuoteAdepts is a lone mark, which is never a double.
*/
const DOUBLE_ADEPT = new RegExp(`^(?:${base.doubleQuoteAdepts})$`, "u");

/**
  Find every quote adept in a string.

  @param {string} string: text to scan
  @param {string} adeptPattern: alternation pattern of quote adepts, e.g.
    base.doubleQuoteAdepts for double quotes alone, or quoteAdepts for both
  @returns {Array<{index: number, raw: string, end: number, kind: string, line: number, before: string, after: string}>}
    tokens in document order, where
    - index/end delimit the token in the source string
    - kind is DOUBLE or SINGLE
    - line is the 0-based line the token starts on
    - before/after are the adjacent characters, "" at the string edges
*/
export function scanQuoteTokens(string, adeptPattern) {
  const regex = new RegExp(adeptPattern, "gu");
  const tokens = [];

  let line = 0;
  let scannedUpTo = 0;

  for (const match of string.matchAll(regex)) {
    const index = match.index;
    const raw = match[0];

    /*
      Advance the line counter over the text skipped since the last token, considering different line terminators.
    */
    for (let i = scannedUpTo; i < index; i++) {
      const character = string[i];
      if (character === "\r") {
        line++;
        if (string[i + 1] === "\n") i++;
      } else if (character === "\n" || character === "\u2028" || character === "\u2029") {
        line++;
      }
    }

    const end = index + raw.length;
    tokens.push({
      index,
      raw,
      end,
      kind:   DOUBLE_ADEPT.test(raw) ? DOUBLE : SINGLE,
      line,
      before: index > 0 ? string[index - 1] : "",
      after:  end < string.length ? string[end] : "",
    });

    scannedUpTo = end;
  }

  return tokens;
}

/**
  Rebuild a string with tokens replaced.

  How it works
  It walks the tokens in order and copies the untouched text between them
  straight from the source, appending the replacement in place of each token
  that has one. A null/undefined replacement is skipped entirely, so that
  token's original text is carried over with the surrounding slice. Whatever
  follows the last replaced token is appended at the end. Indexes are read
  from the original string throughout, so replacements of different lengths
  never shift later tokens.

  @param {string} string: the string the tokens were scanned from
  @param {Array<{index: number, end: number}>} tokens: tokens in document order
  @param {Array<string|null>} replacements: parallel to tokens; a string
    replaces that token, null leaves it untouched
  @returns {string} the rewritten string
*/
export function replaceQuoteTokens(string, tokens, replacements) {
  let out = "";
  let copiedUpTo = 0;

  tokens.forEach((token, i) => {
    const replacement = replacements[i];
    if (replacement === null || replacement === undefined) return;

    out += string.slice(copiedUpTo, token.index) + replacement;
    copiedUpTo = token.end;
  });

  return out + string.slice(copiedUpTo);
}
