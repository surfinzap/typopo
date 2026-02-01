/**
 * Typopo - Fix frequent microtypography errors in multiple languages
 * @see https://typopo.org
 */

/**
 * Supported locale codes for typography fixes
 */
export type TypopoLocale = "en-us" | "de-de" | "sk" | "cs" | "rue";

/**
 * Configuration options for typography fixes
 */
export interface TypopoConfiguration {
  /**
   * If true, removes empty lines between paragraphs
   * @default true
   */
  removeLines?: boolean;
}

/**
 * Fixes microtypography errors in text across multiple languages
 *
 * @param text - Input text
 * @param locale - Language locale for typography rules. Defaults to "en-us" if not specified.
 *   - "en-us": English (United States)
 *   - "de-de": German (Germany)
 *   - "sk": Slovak
 *   - "cs": Czech
 *   - "rue": Rusyn
 * @param configuration - Optional configuration for typography fixes
 * @returns Text with typography fixes applied
 *
 * @example
 * ```typescript
 * import { fixTypos } from 'typopo';
 *
 * // Basic usage (uses en-us locale, removes empty lines)
 * const result = fixTypos('Your text here');
 *
 * // Specify locale
 * const germanText = fixTypos('Ihr Text hier', 'de-de');
 *
 * // With configuration
 * const customResult = fixTypos('Text', 'en-us', { removeLines: false });
 * ```
 */
export function fixTypos(
  text: string,
  locale?: TypopoLocale,
  configuration?: TypopoConfiguration
): string;
