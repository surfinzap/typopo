import { removeEmptyLines } from "../../src/modules/whitespace/lines.js";
import assert from "assert";

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
      assert.strictEqual(removeEmptyLines(key), testCase[key]);
    });
  });
});
