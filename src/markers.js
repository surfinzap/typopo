/**
 * Unicode Private Use Area markers for temporal replacements
 *
 * Unicode Allocation:
 * U+E000 - U+E0FF: Test tokens (tests/test-utils.js)
 * U+E100 - U+E1FF: Processing marks (this file)
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
