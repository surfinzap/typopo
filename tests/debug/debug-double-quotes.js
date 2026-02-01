#!/usr/bin/env node

import Locale from "../../src/locale/locale.js";
import {
  removeExtraPunctuationBeforeQuotes,
  removeExtraPunctuationAfterQuotes,
  identifyDoublePrimes,
  identifyDoubleQuotePairs,
  identifyUnpairedOpeningDoubleQuote,
  identifyUnpairedClosingDoubleQuote,
  removeUnidentifiedDoubleQuote,
  replaceDoublePrimeWDoubleQuote,
  placeLocaleDoubleQuotes,
  removeExtraSpacesAroundQuotes,
  addSpaceBeforeopeningDoubleQuote,
  addSpaceAfterclosingDoubleQuote,
  fixDirectSpeechIntro,
  fixQuotedWordPunctuation,
  fixQuotedSentencePunctuation,
} from "../../src/modules/punctuation/double-quotes.js";

//

//

const testString = `Level 3 "with" multiple "quotes"`;
const testLocale = "rue";

//

//

function debugFixDoubleQuotes(inputString, locale = "en-us", configuration = {}) {
  console.log("=".repeat(80));
  console.log("DEBUG: Double Quotes Transformation");
  console.log("=".repeat(80));

  let currentLocale = new Locale(locale);

  configuration = {
    ...configuration,
  };

  console.log(`Input: "${inputString}"`);
  console.log(`Locale: ${locale}`);
  console.log(`Configuration:`, configuration);
  console.log("-".repeat(80));

  let string = inputString;
  let stepNumber = 1;

  function logStep(stepName, newString, oldString) {
    const changed = newString !== oldString;
    console.log(`${stepNumber}. ${stepName}`);
    console.log(`   Before: "${oldString}"`);
    console.log(`   After:  "${newString}"`);
    if (changed) {
      console.log(`   ✓ CHANGED`);
      // Show character codes for changed characters to see Unicode differences
      console.log(
        `   Before codes: [${Array.from(oldString)
          .map((c) => c.charCodeAt(0))
          .join(", ")}]`
      );
      console.log(
        `   After codes:  [${Array.from(newString)
          .map((c) => c.charCodeAt(0))
          .join(", ")}]`
      );
    } else {
      console.log(`   - no change`);
    }
    console.log();
    stepNumber++;
    return newString;
  }

  // Step 1: Remove extra punctuation before quotes
  const oldString1 = string;
  string = removeExtraPunctuationBeforeQuotes(string);
  logStep("removeExtraPunctuationBeforeQuotes", string, oldString1);

  // Step 2: Remove extra punctuation after quotes
  const oldString2 = string;
  string = removeExtraPunctuationAfterQuotes(string);
  logStep("removeExtraPunctuationAfterQuotes", string, oldString2);

  // Step 3: Identify double primes (inches, arcseconds, seconds)
  const oldString3 = string;
  string = identifyDoublePrimes(string);
  logStep("identifyDoublePrimes", string, oldString3);

  // Step 4: Identify double quote pairs
  const oldString4 = string;
  string = identifyDoubleQuotePairs(string);
  logStep("identifyDoubleQuotePairs", string, oldString4);

  // Step 5: Identify unpaired opening double quotes
  const oldString5 = string;
  string = identifyUnpairedOpeningDoubleQuote(string);
  logStep("identifyUnpairedOpeningDoubleQuote", string, oldString5);

  // Step 6: Identify unpaired closing double quotes
  const oldString6 = string;
  string = identifyUnpairedClosingDoubleQuote(string);
  logStep("identifyUnpairedClosingDoubleQuote", string, oldString6);

  // Step 7: Remove unidentified double quotes
  const oldString7 = string;
  string = removeUnidentifiedDoubleQuote(string);
  logStep("removeUnidentifiedDoubleQuote", string, oldString7);

  // Step 8: Replace double prime with double quote
  const oldString8 = string;
  string = replaceDoublePrimeWDoubleQuote(string);
  logStep("replaceDoublePrimeWDoubleQuote", string, oldString8);

  // Step 9: Place locale-specific double quotes
  const oldString9 = string;
  string = placeLocaleDoubleQuotes(string, currentLocale);
  logStep("placeLocaleDoubleQuotes", string, oldString9);

  // Step 10: Remove extra spaces around quotes
  const oldString10 = string;
  string = removeExtraSpacesAroundQuotes(string, currentLocale);
  logStep("removeExtraSpacesAroundQuotes", string, oldString10);

  // Step 11: Add space before opening double quote
  const oldString11 = string;
  string = addSpaceBeforeopeningDoubleQuote(string, currentLocale);
  logStep("addSpaceBeforeopeningDoubleQuote", string, oldString11);

  // Step 12: Add space after closing double quote
  const oldString12 = string;
  string = addSpaceAfterclosingDoubleQuote(string, currentLocale);
  logStep("addSpaceAfterclosingDoubleQuote", string, oldString12);

  // Step 13: Fix direct speech introduction
  const oldString13 = string;
  string = fixDirectSpeechIntro(string, currentLocale);
  logStep("fixDirectSpeechIntro", string, oldString13);

  // Step 14: Fix quoted word punctuation
  const oldString14 = string;
  string = fixQuotedWordPunctuation(string, currentLocale);
  logStep("fixQuotedWordPunctuation", string, oldString14);

  // Step 15: Fix quoted sentence punctuation
  const oldString15 = string;
  string = fixQuotedSentencePunctuation(string, currentLocale);
  logStep("fixQuotedSentencePunctuation", string, oldString15);

  console.log("=".repeat(80));
  console.log(`FINAL RESULT: "${string}"`);
  console.log("=".repeat(80));

  return string;
}

function getDoubleQuotesTransformationSteps(inputString, locale = "en-us", configuration = {}) {
  let currentLocale = new Locale(locale);

  configuration = {
    ...configuration,
  };

  let string = inputString;
  let steps = [];

  function addStep(stepName, newString, oldString) {
    const changed = newString !== oldString;
    steps.push({
      step:        stepName,
      before:      oldString,
      after:       newString,
      changed:     changed,
      beforeCodes: Array.from(oldString).map((c) => c.charCodeAt(0)),
      afterCodes:  Array.from(newString).map((c) => c.charCodeAt(0)),
    });
    return newString;
  }

  // Apply all transformations
  const oldString1 = string;
  string = removeExtraPunctuationBeforeQuotes(string);
  string = addStep("removeExtraPunctuationBeforeQuotes", string, oldString1);

  const oldString2 = string;
  string = removeExtraPunctuationAfterQuotes(string);
  string = addStep("removeExtraPunctuationAfterQuotes", string, oldString2);

  const oldString3 = string;
  string = identifyDoublePrimes(string);
  string = addStep("identifyDoublePrimes", string, oldString3);

  const oldString4 = string;
  string = identifyDoubleQuotePairs(string);
  string = addStep("identifyDoubleQuotePairs", string, oldString4);

  const oldString5 = string;
  string = identifyUnpairedOpeningDoubleQuote(string);
  string = addStep("identifyUnpairedOpeningDoubleQuote", string, oldString5);

  const oldString6 = string;
  string = identifyUnpairedClosingDoubleQuote(string);
  string = addStep("identifyUnpairedClosingDoubleQuote", string, oldString6);

  const oldString7 = string;
  string = removeUnidentifiedDoubleQuote(string);
  string = addStep("removeUnidentifiedDoubleQuote", string, oldString7);

  const oldString8 = string;
  string = replaceDoublePrimeWDoubleQuote(string);
  string = addStep("replaceDoublePrimeWDoubleQuote", string, oldString8);

  const oldString9 = string;
  string = placeLocaleDoubleQuotes(string, currentLocale);
  string = addStep("placeLocaleDoubleQuotes", string, oldString9);

  const oldString10 = string;
  string = removeExtraSpacesAroundQuotes(string, currentLocale);
  string = addStep("removeExtraSpacesAroundQuotes", string, oldString10);

  const oldString11 = string;
  string = addSpaceBeforeopeningDoubleQuote(string, currentLocale);
  string = addStep("addSpaceBeforeopeningDoubleQuote", string, oldString11);

  const oldString12 = string;
  string = addSpaceAfterclosingDoubleQuote(string, currentLocale);
  string = addStep("addSpaceAfterclosingDoubleQuote", string, oldString12);

  const oldString13 = string;
  string = fixDirectSpeechIntro(string, currentLocale);
  string = addStep("fixDirectSpeechIntro", string, oldString13);

  const oldString14 = string;
  string = fixQuotedWordPunctuation(string, currentLocale);
  string = addStep("fixQuotedWordPunctuation", string, oldString14);

  const oldString15 = string;
  string = fixQuotedSentencePunctuation(string, currentLocale);
  string = addStep("fixQuotedSentencePunctuation", string, oldString15);

  return {
    input:         inputString,
    output:        string,
    locale:        locale,
    configuration: configuration,
    steps:         steps,
    changedSteps:  steps.filter((step) => step.changed),
  };
}

export { debugFixDoubleQuotes, getDoubleQuotesTransformationSteps };

/*
  Console output
*/
// Example 1: Console output debug (detailed)
console.log("=== CONSOLE DEBUG EXAMPLE ===");
debugFixDoubleQuotes(testString, testLocale);

console.log("\n\n=== PROGRAMMATIC API EXAMPLE ===");

// Example 2: Get steps as data structure
const result = getDoubleQuotesTransformationSteps(testString, testLocale);

console.log(`Input:  ${result.input}`);
console.log(`Output: ${result.output}`);
console.log(`\nOnly changed steps:`);

result.changedSteps.forEach((step, index) => {
  console.log(`${index + 1}. ${step.step}`);
  console.log(`   "${step.before}" → "${step.after}"`);

  // Show specific character differences
  const beforeChars = Array.from(step.before);
  const afterChars = Array.from(step.after);
  const differences = [];

  for (let i = 0; i < Math.max(beforeChars.length, afterChars.length); i++) {
    const beforeChar = beforeChars[i] || "";
    const afterChar = afterChars[i] || "";
    const beforeCode = beforeChar ? beforeChar.charCodeAt(0) : null;
    const afterCode = afterChar ? afterChar.charCodeAt(0) : null;

    if (beforeCode !== afterCode) {
      differences.push({
        position:   i,
        before:     beforeChar,
        after:      afterChar,
        beforeCode: beforeCode,
        afterCode:  afterCode,
      });
    }
  }

  if (differences.length > 0) {
    console.log("   Character differences:");
    differences.forEach((diff) => {
      console.log(
        `     Position ${diff.position}: "${diff.before}" (${diff.beforeCode}) → "${diff.after}" (${diff.afterCode})`
      );
    });
  }
  console.log();
});
