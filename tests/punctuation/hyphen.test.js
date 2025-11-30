import { supportedLocales } from "../../src/locale/locale.js";
import { fixHyphen, fixSpaceAroundHyphen } from "../../src/modules/punctuation/hyphen.js";
import { createTestSuite } from "../test-utils.js";

export const hyphenSet = {
  // fix only single-character prefixes
  "e-shop":  "e-shop", // correct
  "e- shop": "e-shop",
  "e- shop": "e-shop", // nbsp
  "e- shop": "e-shop", // hairSpace
  "e- shop": "e-shop", // narrowNbsp
  "e -shop": "e-shop",

  /* false positives
     don’t fix multi-character prefixes, they may be used currectly with the spacing
  */
 "Ein- und Ausgang" : "Ein- und Ausgang",
 "ein- und ausschalten" : "ein- und ausschalten",
 "Softwareentwicklung, -verkauf und -wartung": "Softwareentwicklung, -verkauf und -wartung"

};
createTestSuite("Fix spaces around hyphen", hyphenSet, fixSpaceAroundHyphen, {}, fixHyphen, supportedLocales);
