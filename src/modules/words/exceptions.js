/**
 * Identifies and excludes following patterns
 * - email addresses 
 * - URLs
 * - filenames
 *
 * @param {string} text - The input text to process.
 * @param {Object} locale - An object containing the patterns to identify exceptions.
 * @returns {Object} - Contains the processed text and the exceptions array.
 */
export function excludeExceptions(text, locale) {
  let exceptions = []; 

  collectExceptions(text, locale.emailPattern, exceptions); 
  collectExceptions(text, locale.urlPattern, exceptions);     
  collectExceptions(text, locale.filenamePattern, exceptions);    

  const processedText = replaceExceptionsWithPlaceholders(text, exceptions);

  return { processedText, exceptions };
}



/**
 * Identifies and collects exceptions based on a given pattern.
 * 
 * @param {string} text - The input text to search for exceptions.
 * @param {string} pattern - A regex pattern to identify exceptions.
 * @param {Array} exceptions - The array of collected exceptions.
 * @returns {Array} - Updated exceptions array.
 */
function collectExceptions(text, pattern, exceptions) {
  const regex = new RegExp(pattern, "gi");
  const matchedExceptions = text.match(regex);

  if (matchedExceptions) {
    matchedExceptions.forEach(match => exceptions.push(match));
  }

  return exceptions;
}



/**
 * Replaces the identified exceptions in the text with placeholders.
 * 
 * @param {string} text - The input text where exceptions are replaced with placeholders.
 * @param {Array} exceptions - The array of collected exceptions.
 * @returns {string} - The text with placeholders in place of exceptions.
 */
function replaceExceptionsWithPlaceholders(text, exceptions) {
  return exceptions.reduce((updatedText, exception, index) => {
    const placeholder = `{{typopo__exception-${index}}}`;
    return updatedText.replace(exception, placeholder);
  }, text);
}





/**
 * Restores the original exceptions in the text by replacing the placeholders with the actual exceptions.
 * 
 * @param {string} text - The input text with placeholders.
 * @param {Array} exceptions - The array of original exceptions.
 * @returns {string} - The text with the original exceptions restored.
 */
export function placeExceptions(text, exceptions) {
  return exceptions.reduce((updatedText, exception, index) => {
    const placeholderPattern = new RegExp(`{{typopo__exception-${index}}}`, "g");
    return updatedText.replace(placeholderPattern, exception);
  }, text);
}
