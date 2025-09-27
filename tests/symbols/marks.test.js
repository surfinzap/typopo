import { replaceMark, fixMarks } from "../../src/modules/symbols/marks.js";
import { supportedLocales } from "../../src/locale/locale.js";
import { createTestSuite } from "../test-helpers.js";

const registeredTrademark = {
  "(r)":           "®",
  "(R)":           "®",
  "Company (r)":   "Company®",
  "Company ®":     "Company®",
  "Company  (r)":  "Company®",
  "Company  ®":    "Company®",
  "Company   (r)": "Company®",
  "Company   ®":   "Company®",
  // false positives
  "Item (R-1000)": "Item (R-1000)",
  "Section 7(r)":  "Section 7(r)",
};

const serviceMark = {
  "(sm)":           "℠",
  "(SM)":           "℠",
  "Company (sm)":   "Company℠",
  "Company ℠":      "Company℠",
  "Company  (sm)":  "Company℠",
  "Company  ℠":     "Company℠",
  "Company   (sm)": "Company℠",
  "Company   ℠":    "Company℠",
  // false positives
  "Item (SM-1000)": "Item (SM-1000)",
  "Section 7(s)":   "Section 7(s)",
};

const trademark = {
  "(tm)":           "™",
  "(TM)":           "™",
  "Company (tm)":   "Company™",
  "Company ™":      "Company™",
  "Company  (tm)":  "Company™",
  "Company  ™":     "Company™",
  "Company   (tm)": "Company™",
  "Company   ™":    "Company™",
  // false positives
  "Item (TM-1000)": "Item (TM-1000)",
  "Section 7(t)":   "Section 7(t)",
};

createTestSuite(
  "Fix registered trademark (®):\n",
  registeredTrademark,
  (text) => replaceMark(text, "r", "®"),
  fixMarks,
  supportedLocales
);

createTestSuite(
  "Fix service mark (℠):\n",
  serviceMark,
  (text) => replaceMark(text, "sm", "℠"),
  fixMarks,
  supportedLocales
);

createTestSuite(
  "Fix trademark (™):\n",
  trademark,
  (text) => replaceMark(text, "tm", "™"),
  fixMarks,
  supportedLocales
);

export const marksSet = {
  ...registeredTrademark,
  ...serviceMark,
  ...trademark,
};
