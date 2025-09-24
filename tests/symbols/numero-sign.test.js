import { base } from "../../src/const.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";
import { fixNumeroSign } from "../../src/modules/symbols/numero-sign.js";
import { describe, it, expect } from "vitest";

describe("Fix paragraph sign (¶):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);

    const transformedSymbolSet = transformSymbolSet(symbolSet, "numeroSign", localeName);

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`module test, ${base["numeroSign"]}, ${localeName}`, () => {
        expect(fixNumeroSign(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});
