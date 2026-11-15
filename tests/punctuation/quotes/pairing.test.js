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

  describe("single marks need evidence to open", () => {
    /*
      A word-final apostrophe that no contraction rule caught sits after a
      letter, so it may close a pair but never opens one. The four orderings
      of such an apostrophe next to a pair, from the behaviour corpus.
    */
    it("does not let a word-final apostrophe shift a pair after it", () => {
      expect(rolesForBoth("Mňa kedys’ zvádzal 'to' svet")).toEqual([unpaired, open(0), close(0)]);
      expect(rolesForBoth("kedys’ a 'quoted bit' here")).toEqual([unpaired, open(0), close(0)]);
    });

    it("leaves a word-final apostrophe after a pair unpaired", () => {
      expect(rolesForBoth("Mňa 'to' zvádzal kedys’ svet")).toEqual([open(0), close(0), unpaired]);
      expect(rolesForBoth("a 'quoted bit' and kedys’ here")).toEqual([open(0), close(0), unpaired]);
    });

    it("closes early on a word-final apostrophe inside the pair", () => {
      /* The known limitation: this apostrophe and a closing quote look the same. */
      expect(rolesForBoth("'bol som tam kedys’ a vravím'")).toEqual([open(0), close(0), unpaired]);
    });

    it("does not hold double marks to it", () => {
      expect(rolesForBoth('a" tight open and close "b')).toEqual([open(0), close(0)]);
    });
  });

  describe("single marks need evidence to close", () => {
    /*
      A single mark after a space and before a letter or a digit reads as an
      opening or a word-initial apostrophe, such as a contracted year, so it
      never closes.
    */
    it("does not pair two word-initial marks", () => {
      expect(rolesForBoth("In '89 and '90 we moved")).toEqual([unpaired, unpaired]);
    });

    it("leaves the odd mark out unpaired rather than the last one", () => {
      expect(rolesForBoth("INCHEBA '89 was the 'year'")).toEqual([unpaired, open(0), close(0)]);
    });

    it("still closes on a mark after a letter", () => {
      expect(rolesForBoth("INCHEBA '89 was' the 'year'")).toEqual([
        open(0),
        close(0),
        open(0),
        close(0),
      ]);
    });

    it("does not hold double marks to it", () => {
      /* The second mark is after a space and before a letter, yet it closes. */
      expect(rolesForBoth('"a "b c')).toEqual([open(0), close(0)]);
    });
  });

  describe("depth", () => {
    it("gives an unpaired token no depth", () => {
      expect(rolesFor('"')).toEqual([unpaired]);
    });

    it("does not count an abandoned candidate towards the depth of a later pair", () => {
      /* '89 stays on the stack, unpaired; 'year' encloses nothing and sits at depth 0. */
      expect(rolesForBoth("'89 then 'year'")).toEqual([unpaired, open(0), close(0)]);
    });

    it("still counts a real enclosing pair", () => {
      expect(rolesForBoth("\"'89 then 'year'\"")).toEqual([
        open(0),
        unpaired,
        open(1),
        close(1),
        close(0),
      ]);
    });
  });
});
