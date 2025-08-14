import { fixPlusMinus } from "../../src/modules/symbols/plus-minus.js";
import { describe, it, expect } from "vitest";
import Locale from "../../src/locale/locale.js";

describe("Fix plus-minus symbol ±\n", () => {
  let testCase = {
    "+-": "±",
    "-+": "±",
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      expect(fixPlusMinus(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});
