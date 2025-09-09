import { fixPlusMinus } from "../../src/modules/symbols/plus-minus.js";
import { describe, it, expect } from "vitest";

describe("Fix plus-minus symbol ±\n", () => {
  let testCase = {
    "+-": "±",
    "-+": "±",
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      expect(fixPlusMinus(key)).toBe(testCase[key]);
    });
  });
});
