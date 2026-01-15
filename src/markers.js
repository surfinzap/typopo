/**
 * Unicode Private Use Area markers for temporal replacements
 *
 * Unicode Allocation:
 * U+E000 - U+E0FF: Test tokens (tests/test-utils.js)
 * U+E100 - U+E1FF: Processing marks (this file)
 * U+E200 - U+F8FF: Exception markers (emails, URLs, filenames)
 *
 * These markers are used internally during text processing to temporarily
 * mark positions where specific characters should be placed.
 */

export const m = {
  /* Quotes, primes, apostrophes - U+E100 range */
  apos:        "\uE100",
  singlePrime: "\uE101",
  doublePrime: "\uE102",
  lsq:         "\uE103",
  rsq:         "\uE104",
  lsqUnpaired: "\uE105",
  rsqUnpaired: "\uE106",
  ldq:         "\uE107",
  rdq:         "\uE108",
  ldqUnpaired: "\uE109",
  rdqUnpaired: "\uE10A",

  /* Punctuation */
  enDash: "\uE10B",

  /* Markdown markers */
  tick: "\uE10C",
};

/**
 * Exception marker constants and helpers
 * Used for protecting emails, URLs, and filenames during processing
 */
const EXCEPTION_BASE = 0xe200;
const EXCEPTION_MAX = 0xf8ff;
export const MAX_EXCEPTIONS = EXCEPTION_MAX - EXCEPTION_BASE + 1; // 5,888

/**
 * Get a PUA marker character for a given exception index
 * @param {number} index - The exception index (0-based)
 * @returns {string} - A single PUA character marker
 * @throws {Error} - If index exceeds PUA limit
 */
export function getExceptionMarker(index) {
  const codePoint = EXCEPTION_BASE + index;
  if (codePoint > EXCEPTION_MAX) {
    throw new Error(
      `Exception index ${index} exceeds PUA limit (max ${MAX_EXCEPTIONS}). ` +
        `Text contains too many exceptions (emails/URLs/filenames). ` +
        `Consider processing the text in smaller chunks.`
    );
  }
  return String.fromCharCode(codePoint);
}

/**
 * Get the exception index from a PUA marker character
 * @param {string} marker - A single PUA character marker
 * @returns {number} - The exception index (0-based)
 */
export function getExceptionIndex(marker) {
  return marker.charCodeAt(0) - EXCEPTION_BASE;
}
