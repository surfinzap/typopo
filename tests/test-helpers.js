import { describe, it, expect } from "vitest";
import Locale from "../src/locale/locale.js";

/**
 * Helper function to DRY up repetitive test patterns
 * @param {string} description - Test suite description
 * @param {Object|Array} testSets - Test cases. Can be a single object or [mainSet, unitOnlySet]
 * @param {Function} unitFunction - Function to test for unit tests
 * @param {Function|null} moduleFunction - Function to test for module tests (optional)
 * @param {string} locale - Locale for tests that need it (default: "en-us")
 */
export function createTestSuite(
  description,
  testSets,
  unitFunction,
  moduleFunction = null,
  locale = "en-us"
) {
  describe(description, () => {
    // If testSets is an array, treat it as [mainSet, unitOnlySet]
    const isMultipleTestSets = Array.isArray(testSets);
    const mainTestSet = isMultipleTestSets ? testSets[0] : testSets;
    const unitTestSet = isMultipleTestSets ? { ...mainTestSet, ...testSets[1] } : mainTestSet;

    // Unit tests (run on all test cases including unit-only ones)
    Object.keys(unitTestSet).forEach((key) => {
      it("unit test", () => {
        const result =
          unitFunction.length === 1 ? unitFunction(key) : unitFunction(key, new Locale(locale));
        expect(result).toBe(unitTestSet[key]);
      });
    });

    // Module tests (run only on main test set, skip unit-only tests)
    if (moduleFunction) {
      Object.keys(mainTestSet).forEach((key) => {
        it("module test", () => {
          const result =
            moduleFunction.length === 1
              ? moduleFunction(key)
              : moduleFunction(key, new Locale(locale));
          expect(result).toBe(mainTestSet[key]);
        });
      });
    }
  });
}
