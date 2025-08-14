import {
  removeExtraSpacesAfterNumberSign,
  fixNumberSign,
} from "../../src/modules/symbols/number-sign.js";
import assert from "assert";
import Locale from "../../src/locale/locale.js";

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
      assert.strictEqual(removeExtraSpacesAfterNumberSign(key, new Locale("en-us")), testCase[key]);
    });
    it("module test", () => {
      assert.strictEqual(fixNumberSign(key, new Locale("en-us")), testCase[key]);
    });
  });
});
