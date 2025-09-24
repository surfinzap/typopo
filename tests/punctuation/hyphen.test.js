import { fixHyphen, fixSpaceAroundHyphen } from "../../src/modules/punctuation/hyphen.js";
import { describe, it, expect } from "vitest";

export const hyphenSet = {
  "e-shop":  "e-shop", // correct
  "e- shop": "e-shop",
  "e- shop": "e-shop", // nbsp
  "e- shop": "e-shop", // hairSpace
  "e- shop": "e-shop", // narrowNbsp
  "e -shop": "e-shop",
};
describe("Fix spaces around hyphen\n", () => {
  Object.keys(hyphenSet).forEach((key) => {
    it("unit tests", () => {
      expect(fixSpaceAroundHyphen(key)).toBe(hyphenSet[key]);
    });
    it("module tests", () => {
      expect(fixHyphen(key)).toBe(hyphenSet[key]);
    });
  });
});
