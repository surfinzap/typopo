import { describe, it, expect } from "vitest";
import Locale from "../src/locale/locale.js";

/**
 * Helper function to DRY up repetitive test patterns
 * @param {string} description - Test suite description
 * @param {Object} unitTestSet - Test cases for unit tests
 * @param {Function|null} unitFunction - Function to test for unit tests (optional, pass null to skip)
 * @param {Object} moduleTestSet - Test cases for module tests (optional, defaults to empty object)
 * @param {Function|null} moduleFunction - Function to test for module tests (optional)
 * @param {string|Array<string>} locales - Locale(s) for tests. Can be a single locale string, array of locales, or "en-us" by default
 * @param {Object} configuration - Configuration object to pass to functions (optional)
 */
export function createTestSuite(
  description,
  unitTestSet,
  unitFunction = null,
  moduleTestSet = {},
  moduleFunction = null,
  locales = "en-us",
  configuration = null
) {
  describe(description, () => {
    // If moduleTestSet is empty but moduleFunction is defined, use unitTestSet for module tests
    const effectiveModuleTestSet = Object.keys(moduleTestSet).length === 0 && moduleFunction
      ? unitTestSet
      : moduleTestSet;

    // Normalize locales to array
    const localeArray = Array.isArray(locales) ? locales : [locales];

    // Run tests for each locale
    localeArray.forEach((locale) => {
      // Unit tests
      if (unitFunction) {
        Object.keys(unitTestSet).forEach((key) => {
          const testName = localeArray.length > 1 ? `unit test, ${locale}` : "unit test";
          it(testName, () => {
            let result;
            if (unitFunction.length === 1) {
              result = unitFunction(key);
            } else if (unitFunction.length === 2 && configuration) {
              result = unitFunction(key, configuration);
            } else {
              result = unitFunction(key, new Locale(locale));
            }
            expect(result).toBe(unitTestSet[key]);
          });
        });
      }

      // Module tests
      if (moduleFunction && Object.keys(effectiveModuleTestSet).length > 0) {
        Object.keys(effectiveModuleTestSet).forEach((key) => {
          const testName = localeArray.length > 1 ? `module test, ${locale}` : "module test";
          it(testName, () => {
            let result;
            if (moduleFunction.length === 1) {
              result = moduleFunction(key);
            } else if (moduleFunction.length === 3 && configuration) {
              result = moduleFunction(key, new Locale(locale), configuration);
            } else {
              result = moduleFunction(key, new Locale(locale));
            }
            expect(result).toBe(effectiveModuleTestSet[key]);
          });
        });
      }
    });
  });
}
