/**
 * Replace text using regex with support for overlapping matches
 *
 * This utility handles cases where regex matches can overlap, such as:
 * - "1-2-3" where both "1-2" and "2-3" need to be matched
 * - Multiple consecutive patterns that share common elements
 *
 * The function uses a convergence approach: it keeps applying the replacement
 * until no more changes occur, ensuring all overlapping matches are handled.
 *
 * @param {string} string - Input text to process
 * @param {RegExp} regex - Regular expression for matching (should have 'g' flag)
 * @param {string|function} replacement - Replacement string or function
 * @returns {string} - Text with all overlapping matches replaced
 *
 * @example
 * // Replace overlapping dashes
 * replaceWithOverlapHandling("1-2-3", /(\d)-(\d)/g, "$1–$2")
 * // Result: "1–2–3"
 *
 * @example
 * // Replace overlapping multiplication signs
 * replaceWithOverlapHandling("a x b x c", /(\w) x (\w)/g, "$1×$2")
 * // Result: "a×b×c"
 */
export function replaceWithOverlapHandling(string, regex, replacement) {
  const MAX_ITER = 50;
  let iterations = 0;
  let result = string;
  let previousResult = "";

  // Keep applying replacements until no more changes occur
  while (result !== previousResult && iterations < MAX_ITER) {
    previousResult = result;
    result = result.replace(regex, replacement);
    iterations++;
  }

  return result;
}
