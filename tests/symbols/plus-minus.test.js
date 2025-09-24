import { fixPlusMinus } from "../../src/modules/symbols/plus-minus.js";
import { describe, it, expect } from "vitest";

export const plusMinusSet = {
  "+-": "±",
  "-+": "±",
};

describe("Fix plus-minus symbol ±\n", () => {
  Object.keys(plusMinusSet).forEach((key) => {
    it("", () => {
      expect(fixPlusMinus(key)).toBe(plusMinusSet[key]);
    });
  });
});
