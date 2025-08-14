import { removeEmptyLines } from "../../src/modules/whitespace/lines.js";
import { describe, it, expect } from "vitest";

describe("Remove empty lines\n", () => {
  let testCase = {
    // Remove excessive empty lines between paragraphs
    "line\nline\n\nline\n\n\nline": "line\nline\nline\nline",
    "line\nline\r\nline\r\n\nline": "line\nline\nline\nline",

    // False positives
    " - she said": " - she said", // do not remove space at the beginning of paragraph
  };

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      expect(removeEmptyLines(key)).toBe(testCase[key]);
    });
  });
});
