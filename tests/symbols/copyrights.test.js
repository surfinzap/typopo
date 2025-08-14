import { fixCopyrights } from "../../src/modules/symbols/copyrights.js";
import { describe, it, expect } from "vitest";
import Locale from "../../src/locale/locale.js";

const locales = ["en-us", "de-de", "sk", "cs", "rue"];

const copyright = {
  "(c)2017":          "© 2017",
  "(C)2017":          "© 2017",
  "Company (c)2017":  "Company © 2017",
  "Company (C)2017":  "Company © 2017",
  "Company(c) 2017":  "Company © 2017",
  "Company(C) 2017":  "Company © 2017",
  "Company (c) 2017": "Company © 2017",
  "Company (C) 2017": "Company © 2017",
  //multiple spaces around (c) are already sanitizaed, when fixCopyrights() is being called
  "Company© 2017":    "Company © 2017",
  "Company © 2017":   "Company © 2017",
  "Company ©2017":    "Company © 2017",
  "Sec­tion 7(c)":    "Sec­tion 7(c)", // false positive
};

const soundRecordingCopyright = {
  "(p)2017":          "℗ 2017",
  "(P)2017":          "℗ 2017",
  "Company (p)2017":  "Company ℗ 2017",
  "Company (P)2017":  "Company ℗ 2017",
  "Company(p) 2017":  "Company ℗ 2017",
  "Company(P) 2017":  "Company ℗ 2017",
  "Company (p) 2017": "Company ℗ 2017",
  "Company (P) 2017": "Company ℗ 2017",
  //multiple spaces around (p) are already sanitizaed, when fixCopyrights() is being called
  "Company℗ 2017":    "Company ℗ 2017",
  "Company ℗ 2017":   "Company ℗ 2017",
  "Company ℗2017":    "Company ℗ 2017",
  "Sec­tion 7(p)":    "Sec­tion 7(p)", // false positive
};

function testCopyrights(testCase, copyrightSign) {
  locales.forEach(function (locale) {
    Object.keys(testCase).forEach((key) => {
      it(`module test, ${copyrightSign}, ${locale}`, () => {
        expect(fixCopyrights(key, new Locale(locale))).toBe(testCase[key]);
      });
    });
  });
}

describe("Fix copyright (©):\n", () => {
  testCopyrights(copyright, "©");
});

describe("Fix sound recording copyright (℗):\n", () => {
  testCopyrights(soundRecordingCopyright, "℗");
});
