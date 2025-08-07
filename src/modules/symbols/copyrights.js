import { addSpaceBeforeSymbol } from "../whitespace/spaces";
import { addNbspAfterSymbol, replaceSpacesWithNbspAfterSymbol } from "../whitespace/nbsp";

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
export function replaceCopyright(string, copyrightLetter, copyrightSign, locale) {
  // prettier-ignore
  return string.replace(
    new RegExp(
      `(\\(${copyrightLetter}\\))` +
      `([${locale.spaces}]*)` +
      `(${locale.cardinalNumber})`,
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
export function consolidateSpaces(string, copyrightSign, locale) {
  string = addSpaceBeforeSymbol(string, copyrightSign, locale);
  string = addNbspAfterSymbol(string, copyrightSign, locale);
  string = replaceSpacesWithNbspAfterSymbol(string, copyrightSign, locale);
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
  string = replaceCopyright(string, "c", locale.copyright, locale);
  string = consolidateSpaces(string, locale.copyright, locale);
  string = replaceCopyright(string, "p", locale.soundRecordingCopyright, locale);
  string = consolidateSpaces(string, locale.soundRecordingCopyright, locale);
  return string;
}
