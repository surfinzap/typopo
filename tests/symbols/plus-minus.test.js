import { fixPlusMinus } from "../../src/modules/symbols/plus-minus.js";
import { createTestSuite } from "../test-utils.js";

export const plusMinusSet = {
  "+-": "±",
  "-+": "±",
};

createTestSuite("Fix plus-minus symbol ±", plusMinusSet, null, {}, fixPlusMinus);
