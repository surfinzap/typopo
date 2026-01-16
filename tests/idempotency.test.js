import { describe, expect, it } from "vitest";

import { supportedLocales } from "../src/locale/locale.js";
import { fixTypos } from "../src/typopo.js";
import { getTestModules } from "./integration/typopo.test.js";

function testIdempotency(testSet, locale = "en-us", config = {}) {
  Object.keys(testSet).forEach((input) => {
    const firstPass = fixTypos(input, locale, config);
    const secondPass = fixTypos(firstPass, locale, config);

    it(`should be idempotent: ${input}`, () => {
      expect(secondPass).toBe(firstPass);
    });
  });
}

describe("Idempotency Tests - All Modules", () => {
  supportedLocales.forEach((locale) => {
    describe(`Locale: ${locale}`, () => {
      testIdempotency(getTestModules(locale), locale);
    });
  });
});
