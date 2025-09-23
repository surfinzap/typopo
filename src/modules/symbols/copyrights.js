import { base } from "../../const.js";
import { fixSpacingAroundSymbol } from "./symbol-utils.js";

//

/**
 * Replaces occurrences of a copyright indication in a string followed by a year.
 *
 * Example: Company (c) 2017 -> Company © 2017
 *
 * @param {string} string - The input string where marks will be replaced.
 * @param {string} copyrightLetter - The pattern for the copyright (e.g., “p” for sound recording copyright).
 * @param {string} copyrightSign - The symbol to replace the pattern with (e.g., “©” for copyright).
 * @returns {string} - The string with the specified copyrights replaced.
 */
export function replaceCopyright(string, copyrightLetter, copyrightSign) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\(${copyrightLetter}\\))` +
      `([${base.spaces}]*)` +
      `(\\d)`,
      "gi"
    ),
    `${copyrightSign}$2$3`
  );
}

//

/**
 * Fixes occurrences of copyright (©), and sound recording copyright (℗) in a given string.
 *
 * @param {string} string - The input string to be fixed.
 * @returns {string} - The string with marks replaced.
 */
export function fixCopyrights(string, locale) {
  string = replaceCopyright(string, "c", base.copyright);
  string = fixSpacingAroundSymbol(string, base.copyright, locale.spaceAfter.copyright);
  string = replaceCopyright(string, "p", base.soundRecordingCopyright);
  string = fixSpacingAroundSymbol(string, base.soundRecordingCopyright, locale.spaceAfter.soundRecordingCopyright);
  return string;
}
