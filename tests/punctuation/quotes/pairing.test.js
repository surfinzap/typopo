import { describe, expect, it } from "vitest";

import { base } from "../../../src/const.js";
import {
  CLOSE,
  OPEN,
  UNPAIRED,
  pairQuoteTokens,
} from "../../../src/modules/punctuation/quotes/pairing.js";
import { scanQuoteTokens } from "../../../src/modules/punctuation/quotes/scanner.js";

const rolesFor = (string) => pairQuoteTokens(scanQuoteTokens(string, base.doubleQuoteAdepts));

describe("pairQuoteTokens: matching quotes with a stack", () => {
  it("pairs nothing when there is nothing to pair", () => {
    expect(rolesFor("plain text")).toEqual([]);
  });

  it("leaves a lone quote unpaired", () => {
    expect(rolesFor('an "unpaired quote')).toEqual([UNPAIRED]);
  });

  it("pairs two quotes", () => {
    expect(rolesFor('a "quoted" word')).toEqual([OPEN, CLOSE]);
  });

  it("pairs quotes sequentially, not by nesting them", () => {
    /*
      Two consecutive pairs, the same reading the previous lazy regex produced.
      A nesting interpretation would make this OPEN, OPEN, CLOSE, CLOSE.
    */
    expect(rolesFor('"one" and "two"')).toEqual([OPEN, CLOSE, OPEN, CLOSE]);
  });

  it("leaves the odd one out unpaired", () => {
    expect(rolesFor('Three "quotes "in a "row')).toEqual([OPEN, CLOSE, UNPAIRED]);
  });

  it("pairs regardless of the spacing around the quotes", () => {
    /*
      Sloppy spacing must still pair — this is the ` " quoted material " ` case
      the module is explicitly built to repair, and the reason the pairing pass
      does not gate on whether a quote looks like it can open or close.
    */
    expect(rolesFor('" quoted material "')).toEqual([OPEN, CLOSE]);
  });

  describe("line boundaries", () => {
    it("refuses to pair across a line break", () => {
      /*
        A quotation belongs to one paragraph. Both quotes are left to the
        unpaired-quote rules, which is how hard-wrapped prose still renders
        correctly without pairing.
      */
      expect(rolesFor('"opened\nclosed"')).toEqual([UNPAIRED, UNPAIRED]);
    });

    it("still pairs quotes that share a line", () => {
      expect(rolesFor('"a"\n"b"')).toEqual([OPEN, CLOSE, OPEN, CLOSE]);
    });

    it("abandons an unclosable candidate and restarts on the next line", () => {
      /*
        The first quote can never be closed, since everything after it is on a
        later line. It is dropped, and pairing resumes from the second line.
      */
      expect(rolesFor('"dangling\n"a" b')).toEqual([UNPAIRED, OPEN, CLOSE]);
    });
  });
});
