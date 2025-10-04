import { describe, it, expect } from "vitest";
import Locale from "../src/locale/locale.js";
import { base } from "../src/const.js";

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
    const effectiveModuleTestSet =
      Object.keys(moduleTestSet).length === 0 && moduleFunction ? unitTestSet : moduleTestSet;

    // Normalize locales to array
    const localeArray = Array.isArray(locales) ? locales : [locales];

    // Run tests for each locale
    localeArray.forEach((locale) => {
      // Unit tests
      if (unitFunction) {
        Object.keys(unitTestSet).forEach((key) => {
          const testName = `unit test (${locale})`;
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
          const testName = `module test (${locale})`;
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

/**
 * Helper function to escape regex special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string safe for use in RegExp
 */
function escapeRegex(str) {
  return str.replace(/[{}()[\]\\.$^*+?|]/g, "\\$&");
}

/**
 * Generic test set transformation function with locale-specific token replacement
 * @param {Object} testSet - Object with test cases (input -> expected output)
 * @param {string} localeName - Locale identifier (e.g., "en-us", "cs", "sk")
 * @param {Object} options - Optional configuration
 * @param {string} options.symbolName - Symbol name from base constants (e.g., "copyright")
 * @param {Array<Object>} options.additionalSets - Additional test sets to merge before transformation
 * @returns {Object} Transformed test set with locale-specific replacements
 */
export function transformTestSet(testSet, localeName, options = {}) {
  const locale = new Locale(localeName);
  const { symbolName, additionalSets = [] } = options;

  // Merge all additional test sets
  const mergedTestSet = additionalSets.reduce((acc, set) => ({ ...acc, ...set }), { ...testSet });

  const tokenMap = {
    // Quotes
    "${ldq}":  locale.leftDoubleQuote,
    "${rdq}":  locale.rightDoubleQuote,
    "${lsq}":  locale.leftSingleQuote,
    "${rsq}":  locale.rightSingleQuote,
    "${apos}": base.apostrophe,

    // Dashes
    "${spaceBeforeDash}": locale.dashWords.spaceBefore,
    "${dash}":            locale.dashWords.dash,
    "${spaceAfterDash}":  locale.dashWords.spaceAfter,

    // Symbols (only if symbolName provided)
    ...(symbolName && {
      "${symbol}": base[symbolName],
      "${space}":  locale.spaceAfter[symbolName],
    }),

    // Abbreviations
    "${abbrSpace}": locale.spaceAfter.abbreviation,

    // Non-breaking spaces
    "${ordinalDateFirstSpace}":  locale.ordinalDate.firstSpace,
    "${ordinalDateSecondSpace}": locale.ordinalDate.secondSpace,
    "${romanOrdinalIndicator}":  locale.romanOrdinalIndicator,
    "${spaceBeforePercent}":     locale.spaceBefore.percent,
  };

  const replaceTokens = (str) => {
    // First replace all tokens
    const tokenReplaced = Object.entries(tokenMap).reduce(
      (result, [token, value]) => result.replace(new RegExp(escapeRegex(token), "g"), value),
      str
    );
    // Then handle escaped dots (this must happen after token replacement)
    return tokenReplaced.replace(/\\\./g, ".");
  };

  const transformed = {};
  Object.keys(mergedTestSet).forEach((key) => {
    transformed[replaceTokens(key)] = replaceTokens(mergedTestSet[key]);
  });

  return transformed;
}
