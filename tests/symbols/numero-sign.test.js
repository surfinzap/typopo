import { fixNumeroSign } from "../../src/modules/symbols/numero-sign.js";
import { describe, it, expect } from "vitest";

describe("Fix section sign (§)\n", () => {
  let testCase = {
    // Basic spacing fixes
    "Article№1":         "Article № 1",
    "Document№123":      "Document № 123",
    "Law№2023":          "Law № 2023",
    "Article №1":        "Article № 1",
    "Document №123":     "Document № 123",
    "Article № 1":       "Article № 1",
    "Article № 1":       "Article № 1", // hairSpace
    "Article № 1":       "Article № 1", // narrowNbsp
    "Document № 123":    "Document № 123",
    "Article №  1":      "Article № 1",
    "Document №   123":  "Document № 123",
    "Document №    123": "Document № 123", // mix

    "(№1)":            "(№ 1)",
    "[№123]":          "[№ 123]",
    "№1 is important": "№ 1 is important",
    "Order№12345":     "Order № 12345",
    "Files№1 and№2":   "Files № 1 and № 2",

    // Already correct
    "Article № 1":    "Article № 1",
    "Document № 123": "Document № 123",
  };

  Object.keys(testCase).forEach((key) => {
    it("", () => {
      expect(fixNumeroSign(key)).toBe(testCase[key]);
    });
  });
});
