import { fixCase } from "../../src/modules/words/case.js";
import { createTestSuite } from "../test-helpers.js";

export const caseSet = {
  // Accidental uPPERCASE at the beginning of sentence
  "cAPSLOCK and what else.":                    "Capslock and what else.",
  "Previous sentence. cAPSLOCK and what else.": "Previous sentence. Capslock and what else.",
  "aĎIÉUБUГ and what else.":                    "Aďiéuбuг and what else.", // so it works for non-latin characters

  // Accidental uPPERCASE in the middle of a sentence
  "Press cAPSLOCK.":                             "Press Capslock.",
  "Central Europe and Cyrillic tests: aĎIÉUБUГ": "Central Europe and Cyrillic tests: Aďiéuбuг",

  // Accidental uPPERCASE in the brackets
  "There is (cAPSLOCK) in the brackets.": "There is (Capslock) in the brackets.",
  "There is [cAPSLOCK] in the brackets.": "There is [Capslock] in the brackets.",
  "There is {cAPSLOCK} in the brackets.": "There is {Capslock} in the brackets.",

  "Hey, JEnnifer!": "Hey, Jennifer!",

  // false positives
  "CMSko":          "CMSko",
  "FPs":            "FPs",
  "ČSNka":          "ČSNka",
  "BigONE":         "BigONE", // specific brand names
  "two Panzer IVs": "two Panzer IVs",
  "How about ABC?": "How about ABC?", // all caps
  "iPhone":         "iPhone", // mixed case brand

  "iOS":   "iOS", // desired case for a given brand name
  "macOS": "macOS", // desired case for a given brand name
  "kW":    "kW", // kilowatts
  "mA":    "mA", //milli amperes
};
createTestSuite(
  "Fix accidental uPPERCASE\n",
  caseSet,
  null,
  {},
  fixCase
);
