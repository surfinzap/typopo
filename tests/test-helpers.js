import { describe, it, expect } from "vitest";
import Locale from "../src/locale/locale.js";

/**
 * Helper function to DRY up repetitive test patterns
 * @param {string} description - Test suite description
 * @param {Object|Array} testSets - Test cases. Can be a single object or [mainSet, unitOnlySet]
 * @param {Function|null} unitFunction - Function to test for unit tests (optional, pass null to skip)
 * @param {Function|null} moduleFunction - Function to test for module tests (optional)
 * @param {string|Array<string>} locales - Locale(s) for tests. Can be a single locale string, array of locales, or "en-us" by default
 */
export function createTestSuite(
  description,
  testSets,
  unitFunction = null,
  moduleFunction = null,
  locales = "en-us"
) {
  describe(description, () => {
    // If testSets is an array, treat it as [mainSet, unitOnlySet]
    const isMultipleTestSets = Array.isArray(testSets);
    const mainTestSet = isMultipleTestSets ? testSets[0] : testSets;
    const unitTestSet = isMultipleTestSets ? { ...mainTestSet, ...testSets[1] } : mainTestSet;

    // Normalize locales to array
    const localeArray = Array.isArray(locales) ? locales : [locales];

    // Run tests for each locale
    localeArray.forEach((locale) => {
      // Unit tests (run on all test cases including unit-only ones)
      if (unitFunction) {
        Object.keys(unitTestSet).forEach((key) => {
          const testName = localeArray.length > 1 ? `unit test, ${locale}` : "unit test";
          it(testName, () => {
            const result =
              unitFunction.length === 1 ? unitFunction(key) : unitFunction(key, new Locale(locale));
            expect(result).toBe(unitTestSet[key]);
          });
        });
      }

      // Module tests (run only on main test set, skip unit-only tests)
      if (moduleFunction) {
        Object.keys(mainTestSet).forEach((key) => {
          const testName = localeArray.length > 1 ? `module test, ${locale}` : "module test";
          it(testName, () => {
            const result =
              moduleFunction.length === 1
                ? moduleFunction(key)
                : moduleFunction(key, new Locale(locale));
            expect(result).toBe(mainTestSet[key]);
          });
        });
      }
    });
  });
}
