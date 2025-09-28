import { base } from "../../src/const.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { fixCopyrights, replaceCopyright } from "../../src/modules/symbols/copyrights.js";
import { createTestSuite } from "../test-utils.js";
import { symbolSet, transformSymbolSet } from "./symbol-utils.test.js";

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

supportedLocales.forEach((localeName) => {
  createTestSuite(
    `Fix copyright (©), ${localeName}:`,
    replaceCopyrightSet,
    (text) => replaceCopyright(text, "c", base.copyright),
    transformSymbolSet(symbolSet, "copyright", localeName),
    (text) => fixCopyrights(text, new Locale(localeName)),
    localeName
  );
});

supportedLocales.forEach((localeName) => {
  createTestSuite(
    `Fix sound recording copyright (℗), ${localeName}:`,
    replaceSoundRecordingCopyrightSet,
    (text) => replaceCopyright(text, "p", base.soundRecordingCopyright),
    transformSymbolSet(symbolSet, "soundRecordingCopyright", localeName),
    (text) => fixCopyrights(text, new Locale(localeName)),
    localeName
  );
});
