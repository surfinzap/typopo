import { describe, expect, it } from "vitest";

import { base } from "../../../src/const.js";
import {
  CLOSE,
  OPEN,
  UNPAIRED,
  pairQuoteTokens,
} from "../../../src/modules/punctuation/quotes/pairing.js";
import { quoteAdepts, scanQuoteTokens } from "../../../src/modules/punctuation/quotes/scanner.js";

const rolesFor = (string) => pairQuoteTokens(scanQuoteTokens(string, base.doubleQuoteAdepts));
const rolesForBoth = (string) => pairQuoteTokens(scanQuoteTokens(string, quoteAdepts));

const open = (depth) => ({ role: OPEN, depth });
const close = (depth) => ({ role: CLOSE, depth });
const unpaired = { role: UNPAIRED, depth: null };

describe("pairQuoteTokens: matching quotes with a stack", () => {
  it("pairs nothing when there is nothing to pair", () => {
    expect(rolesFor("plain text")).toEqual([]);
  });

  it("leaves a lone quote unpaired", () => {
    expect(rolesFor('an "unpaired quote')).toEqual([unpaired]);
  });

  it("pairs two quotes", () => {
    expect(rolesFor('a "quoted" word')).toEqual([open(0), close(0)]);
  });

  it("pairs quotes sequentially, not by nesting them", () => {
    /*
      Two consecutive pairs, the same reading the previous lazy regex produced.
      A nesting interpretation would make this OPEN, OPEN, CLOSE, CLOSE.
    */
    expect(rolesFor('"one" and "two"')).toEqual([open(0), close(0), open(0), close(0)]);
  });

  it("leaves the odd one out unpaired", () => {
    expect(rolesFor('Three "quotes "in a "row')).toEqual([open(0), close(0), unpaired]);
  });

  it("pairs regardless of the spacing around the quotes", () => {
    /*
      Sloppy spacing must still pair — this is the ` " quoted material " ` case
      the module is explicitly built to repair, and the reason the pairing pass
      does not gate on whether a quote looks like it can open or close.
    */
    expect(rolesFor('" quoted material "')).toEqual([open(0), close(0)]);
  });

  describe("line boundaries", () => {
    it("refuses to pair across a line break", () => {
      /*
        A quotation belongs to one paragraph. Both quotes are left to the
        unpaired-quote rules, which is how hard-wrapped prose still renders
        correctly without pairing.
      */
      expect(rolesFor('"opened\nclosed"')).toEqual([unpaired, unpaired]);
    });

    it("still pairs quotes that share a line", () => {
      expect(rolesFor('"a"\n"b"')).toEqual([open(0), close(0), open(0), close(0)]);
    });

    it("abandons an unclosable candidate and restarts on the next line", () => {
      /*
        The first quote can never be closed, since everything after it is on a
        later line. It is dropped, and pairing resumes from the second line.
      */
      expect(rolesFor('"dangling\n"a" b')).toEqual([unpaired, open(0), close(0)]);
    });
  });

  describe("nesting single and double quotes in one stream", () => {
    /*
      The depth, not the kind, is what the rendering reads afterwards — which
      is why these two inputs produce the same depths from opposite kinds.
    */
    it("nests a single pair inside a double pair", () => {
      expect(rolesForBoth("\"quoted sentence 'inner sequence' sentence\"")).toEqual([
        open(0),
        open(1),
        close(1),
        close(0),
      ]);
    });

    it("nests a double pair inside a single pair", () => {
      expect(rolesForBoth("'quoted sentence \"inner sequence\" sentence'")).toEqual([
        open(0),
        open(1),
        close(1),
        close(0),
      ]);
    });

    it("nests a third level", () => {
      expect(rolesForBoth('"He said \'the "best" one\' yesterday"')).toEqual([
        open(0),
        open(1),
        open(2),
        close(2),
        close(1),
        close(0),
      ]);
    });

    it("reads two marks of the same kind as a pair, never as nesting", () => {
      /*
        `"a "b" c"` is genuinely ambiguous and nothing in the text resolves it.
        A same-kind mark always closes rather than nests, so this stays two
        adjacent pairs, as it was before single quotes joined the stream.
      */
      expect(rolesForBoth('"a "b" c"')).toEqual([open(0), close(0), open(0), close(0)]);
    });
  });

  describe("crossing", () => {
    it("keeps the same-kind pair and abandons what it crossed", () => {
      /*
        The author closed the outer quote before the inner one. The third mark
        is followed by a space, so it does not read as an opening: it closes
        the double pair, and the two singles fall to the unpaired-quote rules.
        Giving up on both pairs instead would leave the double quotes spaced on
        either side, where removeUnidentifiedDoubleQuote deletes them outright.
      */
      expect(rolesForBoth("She said \" a 'good deal \" yesterday'")).toEqual([
        open(0),
        unpaired,
        close(0),
        unpaired,
      ]);
    });

    it("prefers a deeper level when the mark reads as an opening", () => {
      /* The tie-break: `"b` opens, `" y` closes. Same token positions. */
      expect(rolesForBoth('"a \'b "c" d\' e"')).toEqual([
        open(0),
        open(1),
        open(2),
        close(2),
        close(1),
        close(0),
      ]);
    });
  });

  describe("depth is not reported for what never paired", () => {
    it("gives an unpaired token no depth", () => {
      expect(rolesFor('"')).toEqual([unpaired]);
    });
  });
});
