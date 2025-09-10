import {
  removeExtraSpacesAfterNumberSign,
  fixNumberSign,
} from "../../src/modules/symbols/number-sign.js";
import { describe, it, expect } from "vitest";

describe("Remove extra space before number sign\n", () => {
  let testCase = {
    "word # 9": "word #9",

    "word #    9": "word #9",

    "word # 9": "word #9", //nbsp

    "word # 9": "word #9", //hairSpace

    "word # 9": "word #9", //narrowNbsp

    // false positive
    // do not fix position at the beginning of the paragraph as it may be markdown title
    "# 1 markdown title": "# 1 markdown title",

    // false positive
    // do not fix position at the beginning of the paragraph as it may be markdown title
    "## 1. Markdown title": "## 1. Markdown title",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(removeExtraSpacesAfterNumberSign(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNumberSign(key)).toBe(testCase[key]);
    });
  });
});
