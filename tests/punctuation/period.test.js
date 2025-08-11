import { fixPeriod } from "../../src/modules/punctuation/period.js";
import assert from "assert";
import Locale from "../../src/locale/locale.js";

describe("Replace 2 periods at the end of the sentecne with a single period\n", () => {
  let testCase = {
    "Sentence ending..":                     "Sentence ending.",
    "He is a vice president at Apple Inc..": "He is a vice president at Apple Inc.",

    //false positives
    "../../src/filename.ext": "../../src/filename.ext",
    "..\\..\\filename.ext":   "..\\..\\filename.ext",
    "../":                    "../",
    "..\\":                   "..\\",
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      assert.strictEqual(fixPeriod(key, new Locale("rue")), testCase[key]);
    });
  });
});
