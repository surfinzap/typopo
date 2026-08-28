import { describe, expect, it } from "vitest";

import { base } from "../../../src/const.js";
import {
  replaceQuoteTokens,
  scanQuoteTokens,
} from "../../../src/modules/punctuation/quotes/scanner.js";

/**
 * Unlike the other quote suites, these are structural rather than
 * input → output text: the scanner's job is to produce a token list, and the
 * things worth pinning are the tokenization quirks that the pairing pass and
 * the old regexes both depend on.
 */

const scanDouble = (string) => scanQuoteTokens(string, base.doubleQuoteAdepts);
const rawsOf = (tokens) => tokens.map((token) => token.raw);

describe("scanQuoteTokens: finding double quote adepts", () => {
  it("finds nothing in text without quotes", () => {
    expect(scanDouble("plain text")).toEqual([]);
  });

  it("records position and adjacent characters", () => {
    const [token] = scanDouble('a"b');

    expect(token).toEqual({
      index:  1,
      raw:    '"',
      end:    2,
      line:   0,
      before: "a",
      after:  "b",
    });
  });

  it("reports empty context at the string edges", () => {
    const [token] = scanDouble('"');

    expect(token.before).toBe("");
    expect(token.after).toBe("");
  });

  it("treats a run of repeated adepts as one token", () => {
    /*
      base.doubleQuoteAdepts matches runs greedily, which is how ‘‘‘ or ,, are
      read as a single dumb double quote rather than several single ones.
    */
    expect(rawsOf(scanDouble("‘‘‘quoted‘‘‘"))).toEqual(["‘‘‘", "‘‘‘"]);
    expect(rawsOf(scanDouble(",,quoted,,"))).toEqual([",,", ",,"]);
    expect(rawsOf(scanDouble("``quoted''"))).toEqual(["``", "''"]);
  });

  it("treats adjacent straight quotes as separate tokens", () => {
    /* `"` is its own alternative in the pattern, not part of a run class. */
    expect(rawsOf(scanDouble('""'))).toEqual(['"', '"']);
  });

  it("finds mixed adept characters in document order", () => {
    expect(rawsOf(scanDouble('„one“ and "two" and «three»'))).toEqual([
      "„",
      "“",
      '"',
      '"',
      "«",
      "»",
    ]);
  });

  it("tracks which line each token starts on", () => {
    const tokens = scanDouble('"a"\n"b"\n\n"c"');

    expect(tokens.map((token) => token.line)).toEqual([0, 0, 1, 1, 3, 3]);
  });

  it("counts every line terminator", () => {
    const lineOf = (separator) => scanDouble(`"a"${separator}"b"`).map((token) => token.line);

    expect(lineOf("\n")).toEqual([0, 0, 1, 1]);
    expect(lineOf("\r")).toEqual([0, 0, 1, 1]);
    expect(lineOf("\u2028")).toEqual([0, 0, 1, 1]);
    expect(lineOf("\u2029")).toEqual([0, 0, 1, 1]);
  });

  it("counts CRLF as a single line break", () => {
    expect(scanDouble('"a"\r\n"b"').map((token) => token.line)).toEqual([0, 0, 1, 1]);
  });

  it("reports a line terminator as adjacent context", () => {
    const [, closing] = scanDouble('"a"\n"b"');

    expect(closing.after).toBe("\n");
  });

  it("requires at least two characters to read a run as one adept", () => {
    /* `,{2,}` and friends: a single comma is not a double quote adept. */
    expect(rawsOf(scanDouble(",,,quoted,,"))).toEqual([",,,", ",,"]);
    expect(rawsOf(scanDouble("a, b"))).toEqual([]);
  });
});

describe("replaceQuoteTokens: rewriting a scanned string", () => {
  it("replaces only the tokens given a replacement", () => {
    const string = '"quoted"';
    const tokens = scanDouble(string);

    expect(replaceQuoteTokens(string, tokens, ["<", ">"])).toBe("<quoted>");
  });

  it("leaves a token untouched when its replacement is null", () => {
    const string = '"a" "b"';
    const tokens = scanDouble(string);

    expect(replaceQuoteTokens(string, tokens, ["<", ">", null, null])).toBe('<a> "b"');
  });

  it("is a no-op when nothing is replaced", () => {
    const string = 'a "b" c';
    const tokens = scanDouble(string);

    expect(replaceQuoteTokens(string, tokens, [null, null])).toBe(string);
  });

  it("handles multi-character tokens shrinking to one marker", () => {
    const string = ",,quoted,,";
    const tokens = scanDouble(string);

    expect(replaceQuoteTokens(string, tokens, ["<", ">"])).toBe("<quoted>");
  });

  it("skips tokens the replacement list does not reach", () => {
    /* A short replacements array leaves the trailing tokens as they were. */
    const string = '"a" "b"';
    const tokens = scanDouble(string);

    expect(replaceQuoteTokens(string, tokens, ["<", ">"])).toBe('<a> "b"');
  });
});
