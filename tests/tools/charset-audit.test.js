import { describe, it, expect } from "vitest";
import { AUDITED_FILES, census, readExpected } from "./charset-audit.js";

/**
 * Guards against silently dropped or substituted invisible characters —
 * non-breaking spaces, hair spaces, modifier letter apostrophes, primes.
 *
 * When a failure here is the *intended* result of a change, acknowledge it:
 *   node tests/tools/charset-audit.js --update
 *
 * When it is not, the diff below names the exact codepoint that moved, which
 * is far quicker to act on than the algorithm-level test failure it causes.
 */
describe("Charset audit: invisible characters in quote-related files", () => {
  const expected = readExpected();

  it("audits every file listed in the expectation table, and vice versa", () => {
    expect(Object.keys(expected).sort()).toEqual([...AUDITED_FILES].sort());
  });

  AUDITED_FILES.forEach((path) => {
    it(`${path} has the expected non-ASCII codepoint census`, () => {
      expect(census(path)).toEqual(expected[path]);
    });
  });
});
