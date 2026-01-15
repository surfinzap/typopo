import { base } from "../../const.js";
import { getExceptionMarker } from "../../markers.js";

/**
 * Identifies and excludes following patterns
 * - email addresses
 * - URLs
 * - filenames
 *
 * @param {string} text - The input text to process.
 * @returns {Object} - Contains the processed text and the exceptions array.
 */
export function excludeExceptions(text) {
  let exceptions = [];

  collectExceptions(text, base.emailPattern, exceptions);
  collectExceptions(text, base.urlPattern, exceptions);
  collectExceptions(text, base.filenamePattern, exceptions);

  const processedText = replaceExceptionsWithPlaceholders(text, exceptions);

  return { processedText, exceptions };
}

//

/**
 * Identifies and collects exceptions based on a given pattern.
 *
 * @param {string} text - The input text to search for exceptions.
 * @param {string} pattern - A regex pattern to identify exceptions.
 * @param {Array} exceptions - The array of collected exceptions.
 * @returns {Array} - Updated exceptions array.
 */
function collectExceptions(text, pattern, exceptions) {
  // prettier-ignore
  const regex = new RegExp(pattern, "gi");
  const matchedExceptions = text.match(regex);

  if (matchedExceptions) {
    matchedExceptions.forEach((match) => exceptions.push(match));
  }

  return exceptions;
}

//

/**
 * Replaces the identified exceptions in the text with PUA marker placeholders.
 *
 * @param {string} text - The input text where exceptions are replaced with placeholders.
 * @param {Array} exceptions - The array of collected exceptions.
 * @returns {string} - The text with PUA marker placeholders in place of exceptions.
 */
function replaceExceptionsWithPlaceholders(text, exceptions) {
  return exceptions.reduce((updatedText, exception, index) => {
    const placeholder = getExceptionMarker(index);
    return updatedText.replace(exception, placeholder);
  }, text);
}

//

/**
 * Restores the original exceptions in the text by replacing the PUA marker placeholders with the actual exceptions.
 *
 * @param {string} text - The input text with PUA marker placeholders.
 * @param {Array} exceptions - The array of original exceptions.
 * @returns {string} - The text with the original exceptions restored.
 */
export function placeExceptions(text, exceptions) {
  return exceptions.reduce((updatedText, exception, index) => {
    const marker = getExceptionMarker(index);
    const placeholderPattern = new RegExp(marker, "g");
    return updatedText.replace(placeholderPattern, exception);
  }, text);
}
