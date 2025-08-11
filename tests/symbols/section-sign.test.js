import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";
import assert from "assert";
import Locale from "../../src/locale/locale.js";

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
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      assert.strictEqual(fixSectionSign(key, new Locale("en-us")), testCase[key]);
    });
  });
});
