import {
  removeExtraSpacesAfterNumberSign,
  fixNumberSign,
} from "../../src/modules/symbols/number-sign.js";
import { createTestSuite } from "../test-helpers.js";

export const numberSignSet = {
  "word # 9":    "word #9",
  "word #    9": "word #9",
  "word # 9":    "word #9", //nbsp
  "word # 9":    "word #9", //hairSpace
  "word # 9":    "word #9", //narrowNbsp
};

const numberSignFalsePositive = {
  // false positive
  // do not fix position at the beginning of the paragraph as it may be markdown title
  "# 1 markdown title": "# 1 markdown title",

  // false positive
  // do not fix position at the beginning of the paragraph as it may be markdown title
  "## 1. Markdown title": "## 1. Markdown title",
};

createTestSuite(
  "Remove extra space before number sign\n",
  {
    ...numberSignSet,
    ...numberSignFalsePositive,
  },
  removeExtraSpacesAfterNumberSign,
  fixNumberSign
);
