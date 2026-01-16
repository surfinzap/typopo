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
 * Test token markers using Unicode Private Use Area
 *
 * Unicode Allocation:
 * U+E000 - U+E0FF: Test tokens (this file) - locale-dependent test placeholders
 * U+E100 - U+E1FF: Processing marks (src/markers.js) - internal processing markers
 *
 * These test tokens are replaced by transformTestSet() with locale-specific characters.
 * This allows test cases to use template literals while maintaining locale independence.
 */
export const t = {
  // Quotes
  odq:  "\uE000",
  cdq:  "\uE001",
  osq:  "\uE002",
  csq:  "\uE003",
  apos: "\uE004",

  // Direct speech
  directSpeechIntro: "\uE005",

  // Dashes
  spaceBeforeDash: "\uE010",
  dash:            "\uE011",
  spaceAfterDash:  "\uE012",

  // Symbols
  symbol: "\uE020",
  space:  "\uE021",

  // Abbreviations
  abbrSpace: "\uE030",

  // Ordinal dates
  ordinalDateFirstSpace:  "\uE040",
  ordinalDateSecondSpace: "\uE041",
  romanOrdinalIndicator:  "\uE042",
  spaceBeforePercent:     "\uE043",
};

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
    // Unicode test tokens (from test-constants.js) - U+E000 range
    [t.odq]:                    locale.openingDoubleQuote,
    [t.cdq]:                    locale.closingDoubleQuote,
    [t.osq]:                    locale.openingSingleQuote,
    [t.csq]:                    locale.closingSingleQuote,
    [t.apos]:                   base.apostrophe,
    [t.directSpeechIntro]:      locale.directSpeechIntro,
    [t.spaceBeforeDash]:        locale.dashWords.spaceBefore,
    [t.dash]:                   locale.dashWords.dash,
    [t.spaceAfterDash]:         locale.dashWords.spaceAfter,
    [t.abbrSpace]:              locale.spaceAfter.abbreviation,
    [t.ordinalDateFirstSpace]:  locale.ordinalDate.firstSpace,
    [t.ordinalDateSecondSpace]: locale.ordinalDate.secondSpace,
    [t.romanOrdinalIndicator]:  locale.romanOrdinalIndicator,
    [t.spaceBeforePercent]:     locale.spaceBefore.percent,
    ...(symbolName && {
      [t.symbol]: base[symbolName],
      [t.space]:  locale.spaceAfter[symbolName],
    }),
  };

  const replaceTokens = (str) => {
    // First replace all tokens
    const tokenReplaced = Object.entries(tokenMap).reduce((result, [token, value]) => {
      return result.split(token).join(value);
    }, str);
    // Then handle escaped dots (this must happen after token replacement)
    return tokenReplaced.replace(/\\\./g, ".");
  };

  const transformed = {};
  Object.keys(mergedTestSet).forEach((key) => {
    transformed[replaceTokens(key)] = replaceTokens(mergedTestSet[key]);
  });

  return transformed;
}
