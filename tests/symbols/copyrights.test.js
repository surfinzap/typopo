import { base } from "../../src/const.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { fixCopyrights, replaceCopyright } from "../../src/modules/symbols/copyrights.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";
import { describe, it, expect } from "vitest";

const replaceCopyrightSet = {
  "(c)2017":          "©2017",
  "(C)2017":          "©2017",
  "Company (c)2017":  "Company ©2017",
  "Company (C)2017":  "Company ©2017",
  "Company(c) 2017":  "Company© 2017",
  "Company(C) 2017":  "Company© 2017",
  "Company (c) 2017": "Company © 2017",
  "Company (C) 2017": "Company © 2017",
  "Sec­tion 7(c)":    "Sec­tion 7(c)", // false positive
  "Sec­tion 7(C)":    "Sec­tion 7(C)", // false positive
};

const replaceSoundRecordingCopyrightSet = {
  "(p)2017":          "℗2017",
  "(P)2017":          "℗2017",
  "Company (p)2017":  "Company ℗2017",
  "Company (P)2017":  "Company ℗2017",
  "Company(p) 2017":  "Company℗ 2017",
  "Company(P) 2017":  "Company℗ 2017",
  "Company (p) 2017": "Company ℗ 2017",
  "Company (P) 2017": "Company ℗ 2017",
  "Sec­tion 7(p)":    "Sec­tion 7(p)", // false positive
  "Sec­tion 7(P)":    "Sec­tion 7(P)", // false positive
};

function testCopyrightReplacement(testCase, copyrightLetter, copyrightSign) {
  supportedLocales.forEach(function (locale) {
    Object.keys(testCase).forEach((key) => {
      it(`unit test, ${copyrightSign}, ${locale}`, () => {
        expect(replaceCopyright(key, copyrightLetter, copyrightSign)).toBe(testCase[key]);
      });
    });
  });
}

describe("Replace (c) with copyright ©:\n", () => {
  testCopyrightReplacement(replaceCopyrightSet, "c", base.copyright);
});

describe("Replace (p) with copyright ℗:\n", () => {
  testCopyrightReplacement(replaceSoundRecordingCopyrightSet, "p", base.soundRecordingCopyright);
});

describe("Fix copyrights (©):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);

    const transformedSymbolSet = transformSymbolSet(symbolSet, "copyright", localeName);

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`Fix copyrights, ${base["copyright"]}, ${localeName}`, () => {
        expect(fixCopyrights(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});

describe.only("Fix sound recording copyrights (℗):\n", () => {
  supportedLocales.forEach((localeName) => {
    const locale = new Locale(localeName);

    const transformedSymbolSet = transformSymbolSet(
      symbolSet,
      "soundRecordingCopyright",
      localeName
    );

    Object.keys(transformedSymbolSet).forEach((key) => {
      it(`module test, ${base["soundRecordingCopyright"]}, ${localeName}`, () => {
        expect(fixCopyrights(key, locale)).toBe(transformedSymbolSet[key]);
      });
    });
  });
});
