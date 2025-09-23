import { replaceMark, fixMarks } from "../../src/modules/symbols/marks.js";
import { supportedLocales } from "../../src/locale/locale.js";
import { describe, it, expect } from "vitest";

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

function testMarks(testCase, markPattern, replacementMark) {
  supportedLocales.forEach(function (locale) {
    Object.keys(testCase).forEach((key) => {
      it(`unit test, ${replacementMark}, ${locale}`, () => {
        expect(replaceMark(key, markPattern, replacementMark)).toBe(testCase[key]);
      });

      it(`module test, ${replacementMark}, ${locale}`, () => {
        expect(fixMarks(key)).toBe(testCase[key]);
      });
    });
  });
}

describe("Fix registered trademark (®):\n", () => {
  testMarks(registeredTrademark, "r", "®");
});

describe("Fix service mark (℠):\n", () => {
  testMarks(serviceMark, "sm", "℠");
});

describe("Fix trademark (™):\n", () => {
  testMarks(trademark, "tm", "™");
});
