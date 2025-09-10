import { base } from "../../const.js";

/**
 * Replaces occurrences of a specific mark in a string.
 *
 * Example: Company (tm) -> Company™
 *
 * @param {string} string - The input string where marks will be replaced.
 * @param {string} markPattern - The pattern for the mark (e.g., “tm” for trademark).
 * @param {string} replacementMark - The symbol to replace the pattern with (e.g., “™” for trademark).
 * @returns {string} - The string with the specified marks replaced.
 */
export function replaceMark(string, markPattern, replacementMark) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `([^0-9]|^)` +
      `([${base.spaces}]*)` +
      `(\\(${markPattern}\\)|${replacementMark})`,
      "gi"
    ),
    `$1${replacementMark}`
  );
}

//

/**
 * Fixes occurrences of registered trademark (®), service mark (℠) and trademark (™) in a given string.
 *
 * @param {string} string - The input string to be fixed.
 * @returns {string} - The string with marks replaced.
 */
export function fixMarks(string) {
  string = replaceMark(string, "r", base.registeredTrademark);
  string = replaceMark(string, "sm", base.serviceMark);
  string = replaceMark(string, "tm", base.trademark);

  return string;
}
