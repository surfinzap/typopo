import { fixHyphen, fixSpaceAroundHyphen } from "../../src/modules/punctuation/hyphen.js";
import { createTestSuite } from "../test-helpers.js";

export const hyphenSet = {
  "e-shop":  "e-shop", // correct
  "e- shop": "e-shop",
  "e- shop": "e-shop", // nbsp
  "e- shop": "e-shop", // hairSpace
  "e- shop": "e-shop", // narrowNbsp
  "e -shop": "e-shop",
};
createTestSuite("Fix spaces around hyphen", hyphenSet, fixSpaceAroundHyphen, {}, fixHyphen);
