import { base } from "../../const.js";

/**
 * Removes unwanted spaces around hyphens for single-character prefixes.
 *
 * This function fixes typographic errors where spaces appear around hyphens in
 * compound words with single-character prefixes (e.g., "e-shop", "e-mail").
 * It handles various Unicode space types including regular spaces, non-breaking
 * spaces, hair spaces, and narrow non-breaking spaces.
 *
 * **What it fixes:**
 * - Single-character prefix with space after hyphen: "e- shop" → "e-shop"
 * - Single-character prefix with space before hyphen: "e -shop" → "e-shop"
 * - Works with any Unicode space character type
 *
 * **What it intentionally does NOT fix:**
 * - Multi-character words with spaces around hyphens (to avoid false positives)
 * - Examples: "Ein- und Ausgang", "ein- und ausschalten" remain unchanged
 * - This prevents incorrect fixes in German compound words where spacing may be grammatically correct
 *
 * @param {string} string - The input text to process
 * @returns {string} The text with spaces around hyphens removed for single-character prefixes
 *
 * @example
 * fixSpaceAroundHyphen("e- shop")  // Returns: "e-shop"
 * fixSpaceAroundHyphen("e -shop")  // Returns: "e-shop"
 * fixSpaceAroundHyphen("e-shop")   // Returns: "e-shop" (already correct)
 * fixSpaceAroundHyphen("Ein- und Ausgang")  // Returns: "Ein- und Ausgang" (multi-char, no change)
 */
export function fixSpaceAroundHyphen(string) {
  // Fix hyphen with space after: "word- word" → "word-word"
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `\\b` +
      `([${base.allChars}])` + 
      `(-)` + 
      `([${base.spaces}])` + 
      `([${base.allChars}]{2,})`,
      "g"
    ), 
    `$1-$4`
  );

  // Fix hyphen with space before: "word -word" → "word-word"
  // prettier-ignore
  string = string.replace(
    new RegExp(
      `\\b` +
      `([${base.allChars}])` + 
      `([${base.spaces}])` + 
      `(-)` + 
      `([${base.allChars}])`,
      "g"
    ), 
    `$1-$4`
  );

  return string;
}

//

export function fixHyphen(string) {
  string = fixSpaceAroundHyphen(string);
  return string;
}
