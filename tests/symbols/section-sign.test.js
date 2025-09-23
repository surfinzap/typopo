import { base } from "../../src/const.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";
import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";

import { describe, it, expect } from "vitest";

describe("Fix section sign (§):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);
    const symbolValue = base.sectionSign;
    const spaceValue = locale.spaceAfter.sectionSign;

    const transformedSymbolSet = transformSymbolSet(symbolSet, symbolValue, spaceValue);

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`module test, ${symbolValue}, ${localeName}`, () => {
        expect(fixSectionSign(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});

describe("Fix paragraph sign (¶):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);
    const symbolValue = base.paragraphSign;
    const spaceValue = locale.spaceAfter.paragraphSign;

    const transformedSymbolSet = transformSymbolSet(symbolSet, symbolValue, spaceValue);

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`module test, ${symbolValue}, ${localeName}`, () => {
        expect(fixSectionSign(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});
