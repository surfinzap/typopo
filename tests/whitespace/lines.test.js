import { removeEmptyLines } from "../../src/modules/whitespace/lines.js";
import { describe, it, expect } from "vitest";

export const linesSet = {
  // Remove excessive empty lines between paragraphs
  "line\nline\n\nline\n\n\nline": "line\nline\nline\nline",
  "\n":                           "\n",
  "\n\n":                         "\n",
  "\n\n\n":                       "\n",
};

const unitSet = {
  "line\nline\r\nline\r\n\nline": "line\nline\nline\nline",
  "\n\r\n":                       "\n",
  // False positives
  " - she said":                  " - she said", // do not remove space at the beginning of paragraph
};

const moduleSet = {
  ...linesSet,
  ...unitSet,
};

describe("Remove empty lines\n", () => {
  Object.keys(moduleSet).forEach((key) => {
    it("module test", () => {
      expect(removeEmptyLines(key)).toBe(moduleSet[key]);
    });
  });
});
