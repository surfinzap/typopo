import { base } from "../../const.js";
import { addSpaceBeforeSymbol } from "../whitespace/spaces.js";
import { addNbspAfterSymbol, replaceSpacesWithNbspAfterSymbol } from "../whitespace/nbsp.js";

//

/**
 * Replaces occurrences of a copyright indication in a string followed by a year.
 *
 * Example: Company (c) 2017 -> Company © 2017
 *
 * @param {string} string - The input string where marks will be replaced.
 * @param {string} copyrightLetter - The pattern for the copyright (e.g., “p” for sound recording copyright).
 * @param {string} copyrightSign - The symbol to replace the pattern with (e.g., “©” for copyright).
 * @param {Object} locale - An object w/ locale-specific symbols.
 * @returns {string} - The string with the specified copyrights replaced.
 */
export function replaceCopyright(string, copyrightLetter, copyrightSign) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\(${copyrightLetter}\\))` +
      `([${base.spaces}]*)` +
      `(${base.cardinalNumber})`,
      "gi"
    ),
    `${copyrightSign}$2$3`
  );
}

//

/**
 * Consolidates spaces around copyright sign
 *
 * @param {string} string - The input string where marks will be replaced.
 * @param {string} copyrightSign - The sign of choice, either © or ℗
 * @param {Object} locale - An object w/ locale-specific symbols.
 * @returns {string} - The string with the consolidated spaces around the copyright sign
 */
export function consolidateSpaces(string, copyrightSign) {
  string = addSpaceBeforeSymbol(string, copyrightSign);
  string = addNbspAfterSymbol(string, copyrightSign);
  string = replaceSpacesWithNbspAfterSymbol(string, copyrightSign);
  return string;
}

//

/**
 * Fixes occurrences of copyright (©), and sound recording copyright (℗) in a given string.
 *
 * @param {string} string - The input string to be fixed.
 * @param {Object} locale - An object w/ locale-specific symbols
 * @returns {string} - The string with marks replaced.
 */
export function fixCopyrights(string, locale) {
  string = replaceCopyright(string, "c", base.copyright, locale);
  string = consolidateSpaces(string, base.copyright, locale);
  string = replaceCopyright(string, "p", base.soundRecordingCopyright, locale);
  string = consolidateSpaces(string, base.soundRecordingCopyright, locale);
  return string;
}
