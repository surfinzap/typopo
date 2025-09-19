import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";
import { describe, it, expect } from "vitest";

describe("Fix section sign (§)\n", () => {
  let testCase = {
    "under Law§1782":    "under Law § 1782",
    "(e.g.§§13–21)":     "(e.g. §§ 13–21)",
    "(§§13–21)":         "(§§ 13–21)",
    "(§13–21)":          "(§ 13–21)",
    "under Law §1782":   "under Law § 1782",
    "(e.g. §§13–21)":    "(e.g. §§ 13–21)",
    "under Law § 1782":  "under Law § 1782",
    "(e.g. §§ 13–21)":   "(e.g. §§ 13–21)",
    "(e.g. §§ 13–21)":   "(e.g. §§ 13–21)", // hairSpace
    "(e.g. §§ 13–21)":   "(e.g. §§ 13–21)", // narrowNbsp
    "(e.g. §§   13–21)": "(e.g. §§ 13–21)",
    "(e.g. §§  13–21)":  "(e.g. §§ 13–21)",

    "under Law¶1782":    "under Law ¶ 1782",
    "(e.g.¶¶13–21)":     "(e.g. ¶¶ 13–21)",
    "(¶¶13–21)":         "(¶¶ 13–21)",
    "(¶13–21)":          "(¶ 13–21)",
    "under Law ¶1782":   "under Law ¶ 1782",
    "(e.g. ¶¶13–21)":    "(e.g. ¶¶ 13–21)",
    "under Law ¶ 1782":  "under Law ¶ 1782",
    "(e.g. ¶¶ 13–21)":   "(e.g. ¶¶ 13–21)",
    "(e.g. ¶¶ 13–21)":   "(e.g. ¶¶ 13–21)", // hairSpace
    "(e.g. ¶¶ 13–21)":   "(e.g. ¶¶ 13–21)", // narrowNbsp
    "(e.g. ¶¶   13–21)": "(e.g. ¶¶ 13–21)",
    "(e.g. ¶¶  13–21)":  "(e.g. ¶¶ 13–21)",

    // Punctuation contexts
    "text.§1": "text. § 1",
    "text,§1": "text, § 1",
    "text;§1": "text; § 1",
    "text:§1": "text: § 1",
    "text!§1": "text! § 1",
    "text?§1": "text? § 1",

    // Special character contexts
    "#§1":       "# § 1",
    "@§section": "@ § section",
    "*§note":    "* § note",
    "&§clause":  "& § clause",
    "%§rate":    "% § rate",
    "$§cost":    "$ § cost",

    // Quote contexts
    '"text"§1': '"text" § 1',
    "'text'§1": "'text' § 1",
    "`code`§1": "`code` § 1",

    // Bracket edge cases
    "(§1)": "(§ 1)",
    "[§1]": "[§ 1]",
    "{§1}": "{§ 1}",

    // Start/end of string
    "§1 text": "§ 1 text",
    "text §1": "text § 1",

    // Complex legal reference patterns
    "Title42§1983": "Title42 § 1983", // US legal style
    "Art.5§3":      "Art.5 § 3", // article reference
    "Ch.1§2(a)":    "Ch.1 § 2(a)", // complex reference
    "USC§1001":     "USC § 1001", // code reference
    "CFR§123.45":   "CFR § 123.45", // regulation reference
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      expect(fixSectionSign(key)).toBe(testCase[key]);
    });
  });
});
