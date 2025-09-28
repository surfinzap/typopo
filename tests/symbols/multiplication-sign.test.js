import {
  fixMultiplicationSignBetweenNumbers,
  fixMultiplicationSignBetweenWords,
  fixMultiplicationSignBetweenNumberAndWord,
  fixNbspAroundMultiplicationSign,
  fixMultiplicationSign,
} from "../../src/modules/symbols/multiplication-sign.js";
import { createTestSuite } from "../test-utils.js";

const multiBetweenNumbers = {
  "5 x 4":   "5 × 4",
  "5 X 4":   "5 × 4",
  "5″ x 4″": "5″ × 4″",
  "5′ x 4′": "5′ × 4′",

  "5 mm x 5 mm":     "5 mm × 5 mm",
  "5 žien X 5 žien": "5 žien × 5 žien",
  "5cm x 5cm":       "5cm × 5cm",

  "5 x 4 x 3":          "5 × 4 × 3",
  "5″ x 4″ x 3″":       "5″ × 4″ × 3″",
  "5 mm x 5 mm x 5 mm": "5 mm × 5 mm × 5 mm",

  "4xenographs": "4xenographs", // false positive
  "0xd":         "0xd", //false positive, hex number
};

createTestSuite(
  "Fix multiplication sign between numbers",
  multiBetweenNumbers,
  fixMultiplicationSignBetweenNumbers,
  {},
  fixMultiplicationSign
);

const multiBetweenWords = {
  "š x v x h":       "š × v × h",
  "mm x mm":         "mm × mm",
  "Marciano x Clay": "Marciano × Clay",
  "žena x žena":     "žena × žena",

  "light xenons":      "light xenons", // false positive
  "František X Šalda": "František X Šalda", // false positive; noun abbr. in en-us
};

createTestSuite(
  "Fix multiplication sign between words",
  multiBetweenWords,
  fixMultiplicationSignBetweenWords,
  {},
  fixMultiplicationSign
);

const multiBetweenNumberWord = {
  "4 x object":   "4 × object",
  "4x object":    "4× object",
  "4X object":    "4× object",
  "4X žena":      "4× žena",
  "4 xenographs": "4 xenographs", // false positive
  "4xenographs":  "4xenographs", // false positive
  "0xd":          "0xd", //false positive, hex number
};

createTestSuite(
  "Fix multiplication sign between a number and a word",
  multiBetweenNumberWord,
  fixMultiplicationSignBetweenNumberAndWord,
  {},
  fixMultiplicationSign
);

const spaceAroundMulti = {
  "12x3":   "12 × 3",
  "12×3":   "12 × 3",
  "12″×3″": "12″ × 3″",
  "12′×3′": "12′ × 3′",
};
createTestSuite(
  "Fix nbsp around multiplication sign",
  spaceAroundMulti,
  fixNbspAroundMultiplicationSign,
  {},
  fixMultiplicationSign
);

export const multiplicationSignSet = {
  ...multiBetweenNumbers,
  ...multiBetweenWords,
  ...multiBetweenNumberWord,
  ...spaceAroundMulti,
};
