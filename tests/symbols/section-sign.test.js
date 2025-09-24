import { base } from "../../src/const.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";
import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";

import { describe, it, expect } from "vitest";

describe("Fix section sign (§):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);

    const transformedSymbolSet = transformSymbolSet(symbolSet, "sectionSign", localeName);

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`module test, ${base["sectionSign"]}, ${localeName}`, () => {
        expect(fixSectionSign(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});

describe("Fix paragraph sign (¶):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);

    const transformedSymbolSet = transformSymbolSet(symbolSet, "paragraphSign", localeName);

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`module test, ${base["paragraphSign"]}, ${localeName}`, () => {
        expect(fixSectionSign(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});
