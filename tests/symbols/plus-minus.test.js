import { fixPlusMinus } from "../../src/modules/symbols/plus-minus.js";
import assert from "assert";
import Locale from "../../src/locale/locale.js";

describe("Fix plus-minus symbol ±\n", () => {
  let testCase = {
    "+-": "±",
    "-+": "±",
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      assert.strictEqual(fixPlusMinus(key, new Locale("en-us")), testCase[key]);
    });
  });
});
