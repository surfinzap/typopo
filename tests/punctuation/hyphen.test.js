import { fixHyphen, fixSpaceAroundHyphen } from "../../src/modules/punctuation/hyphen.js";
import { describe, it, expect } from "vitest";
import Locale from "../../src/locale/locale.js";

describe("Fix spaces around hyphen\n", () => {
  let testCase = {
    "e-shop":  "e-shop", // correct
    "e- shop": "e-shop",
    "e- shop": "e-shop", // nbsp
    "e- shop": "e-shop", // hairSpace
    "e- shop": "e-shop", // narrowNbsp
    "e -shop": "e-shop",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit tests", () => {
      expect(fixSpaceAroundHyphen(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module tests", () => {
      expect(fixHyphen(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});
