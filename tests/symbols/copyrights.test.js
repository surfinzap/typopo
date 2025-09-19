import { fixCopyrights } from "../../src/modules/symbols/copyrights.js";
import { describe, it, expect } from "vitest";

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
  "Company ©  2017":  "Company © 2017",
  "Company ©   2017": "Company © 2017",
  "Company ©2017":    "Company © 2017",
  "Sec­tion 7(c)":    "Sec­tion 7(c)", // false positive

  // Punctuation contexts
  "text.©1": "text. © 1",
  "text,©1": "text, © 1",
  "text;©1": "text; © 1",
  "text:©1": "text: © 1",
  "text!©1": "text! © 1",
  "text?©1": "text? © 1",

  // Special character contexts
  "#©1":       "# © 1",
  "@©section": "@ © section",
  "*©note":    "* © note",
  "&©clause":  "& © clause",
  "%©rate":    "% © rate",
  "$©cost":    "$ © cost",

  // Quote contexts
  '"text"©1': '"text" © 1',
  "'text'©1": "'text' © 1",
  "`code`©1": "`code` © 1",

  // Bracket edge cases
  "(©1)": "(© 1)",
  "[©1]": "[© 1]",
  "{©1}": "{© 1}",

  // Start/end of string
  "©1 text": "© 1 text",
  "text ©1": "text © 1",
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
  "Company ℗  2017":  "Company ℗ 2017",
  "Company ℗   2017": "Company ℗ 2017",
  "Company ℗2017":    "Company ℗ 2017",
  "Sec­tion 7(p)":    "Sec­tion 7(p)", // false positive

  // Punctuation contexts
  "text.℗1": "text. ℗ 1",
  "text,℗1": "text, ℗ 1",
  "text;℗1": "text; ℗ 1",
  "text:℗1": "text: ℗ 1",
  "text!℗1": "text! ℗ 1",
  "text?℗1": "text? ℗ 1",

  // Special character contexts
  "#℗1":       "# ℗ 1",
  "@℗section": "@ ℗ section",
  "*℗note":    "* ℗ note",
  "&℗clause":  "& ℗ clause",
  "%℗rate":    "% ℗ rate",
  "$℗cost":    "$ ℗ cost",

  // Quote contexts
  '"text"℗1': '"text" ℗ 1',
  "'text'℗1": "'text' ℗ 1",
  "`code`℗1": "`code` ℗ 1",

  // Bracket edge cases
  "(℗1)": "(℗ 1)",
  "[℗1]": "[℗ 1]",
  "{℗1}": "{℗ 1}",

  // Start/end of string
  "℗1 text": "℗ 1 text",
  "text ℗1": "text ℗ 1",
};

function testCopyrights(testCase, copyrightSign) {
  locales.forEach(function (locale) {
    Object.keys(testCase).forEach((key) => {
      it(`module test, ${copyrightSign}, ${locale}`, () => {
        expect(fixCopyrights(key)).toBe(testCase[key]);
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
