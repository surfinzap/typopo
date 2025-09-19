import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";
import { describe, it, expect } from "vitest";

describe("Fix section sign (§)\n", () => {
  let testCase = {
    "under Law§1782":   "under Law § 1782",
    "(e.g.§§13–21)":    "(e.g. §§ 13–21)",
    "(§§13–21)":        "(§§ 13–21)",
    "(§13–21)":         "(§ 13–21)",
    "under Law §1782":  "under Law § 1782",
    "(e.g. §§13–21)":   "(e.g. §§ 13–21)",
    "under Law § 1782": "under Law § 1782",
    "(e.g. §§ 13–21)":  "(e.g. §§ 13–21)",
    "(e.g. §§ 13–21)":  "(e.g. §§ 13–21)", // hairSpace
    "(e.g. §§ 13–21)":  "(e.g. §§ 13–21)", // narrowNbsp

    "under Law¶1782":   "under Law ¶ 1782",
    "(e.g.¶¶13–21)":    "(e.g. ¶¶ 13–21)",
    "(¶¶13–21)":        "(¶¶ 13–21)",
    "(¶13–21)":         "(¶ 13–21)",
    "under Law ¶1782":  "under Law ¶ 1782",
    "(e.g. ¶¶13–21)":   "(e.g. ¶¶ 13–21)",
    "under Law ¶ 1782": "under Law ¶ 1782",
    "(e.g. ¶¶ 13–21)":  "(e.g. ¶¶ 13–21)",
    "(e.g. ¶¶ 13–21)":  "(e.g. ¶¶ 13–21)", // hairSpace
    "(e.g. ¶¶ 13–21)":  "(e.g. ¶¶ 13–21)", // narrowNbsp
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      expect(fixSectionSign(key)).toBe(testCase[key]);
    });
  });
});
