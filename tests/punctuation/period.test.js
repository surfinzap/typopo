import { fixPeriod } from "../../src/modules/punctuation/period.js";
import { createTestSuite } from "../test-helpers.js";

export const periodSet = {
  "Sentence ending..":                     "Sentence ending.",
  "He is a vice president at Apple Inc..": "He is a vice president at Apple Inc.",

  //false positives
  "../../src/filename.ext": "../../src/filename.ext",
  "..\\..\\filename.ext":   "..\\..\\filename.ext",
  "../":                    "../",
  "..\\":                   "..\\",
};

createTestSuite(
  "Replace 2 periods at the end of the sentecne with a single period",
  periodSet,
  null,
  {},
  fixPeriod
);
