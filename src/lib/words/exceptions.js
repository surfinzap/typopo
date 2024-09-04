let exceptions = [];

/**
 * Identifies and excludes following patterns
 * - email addresses 
 * - URLs
 * - filenames
 *
 * @param {string} text - The input text to process.
 * @param {Object} locale - An object containing the patterns for identifying exceptions.
 * @returns {string} - The processed text with identified exceptions replaced by placeholders.
 */
export function excludeExceptions(text, locale) {

  collectExceptions(text, locale.emailAddressPattern); 
  collectExceptions(text, locale.webUrlPattern);     
  collectExceptions(text, locale.filenamePattern);    

  return replaceExceptionsWithPlaceholders(text);
}



/**
 * Identifies and collects exceptions based on a given pattern.
 * 
 * @param {string} text - The input text to search for exceptions.
 * @param {string} pattern - A regex pattern to identify exceptions.
 */
function collectExceptions(text, pattern) {
  const regex = new RegExp(pattern, "gi");
  const matchedExceptions = text.match(regex);
  
  if (matchedExceptions) {
    exceptions = exceptions.concat(matchedExceptions);
  }
}



/**
 * Replaces the identified exceptions in the text with placeholders.
 * 
 * @param {string} text - The input text where exceptions are replaced with placeholders.
 * @returns {string} - The text with placeholders in place of exceptions.
 */
function replaceExceptionsWithPlaceholders(text) {
  return exceptions.reduce((updatedText, exception, index) => {
    const placeholder = `{{typopo__exception-${index}}}`;
    return updatedText.replace(exception, placeholder);
  }, text);
}



/**
 * Restores the original exceptions in the text by replacing the placeholders with the actual exceptions.
 * 
 * @param {string} text - The input text with placeholders.
 * @returns {string} - The text with the original exceptions restored.
 */
export function placeExceptions(text) {
  return exceptions.reduce((updatedText, exception, index) => {
    const placeholderPattern = new RegExp(`{{typopo__exception-${index}}}`, "g");
    return updatedText.replace(placeholderPattern, exception);
  }, text);
}