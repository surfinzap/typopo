/**
 * Replaces occurrences of a specific mark in a string.
 * 
 * Example: Company (tm) -> Company™
 *
 * @param {string} string - The input string where marks will be replaced.
 * @param {string} markPattern - The pattern for the mark (e.g., “tm” for trademark).
 * @param {string} replacementMark - The symbol to replace the pattern with (e.g., “™” for trademark).
 * @param {Object} locale - An object w/ locale-specific symbols.
 * @returns {string} - The string with the specified marks replaced.
 */
export function replaceMark(string, markPattern, replacementMark, locale) {
  return string.replace(
    new RegExp(
      "([^0-9]|^)"
    + "([" + locale.spaces + "]*)"
    + "(\\(" + markPattern + "\\)|" + replacementMark + ")",
      "gi"
    ),
    "$1" + replacementMark
  );
}



/**
 * Fixes occurrences of registered trademark (®), service mark (℠) and trademark (™) in a given string.
 *
 * @param {string} string - The input string to be fixed.
 * @param {Object} locale - An object w/ locale-specific symbols 
 * @returns {string} - The string with marks replaced.
 */
export function fixMarks(string, locale) {

  string = replaceMark(string, "r", locale.registeredTrademark, locale);
  string = replaceMark(string, "sm", locale.serviceMark, locale);
  string = replaceMark(string, "tm", locale.trademark, locale);
  
  return string;
}