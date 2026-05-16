#!/usr/bin/env node

import Locale from "../../src/locale/locale.js";
import {
  removeNbspBetweenMultiCharWords,
  addNbspAfterPreposition,
  addNbspAfterAmpersand,
  addNbspAfterCardinalNumber,
  addNbspAfterOrdinalNumber,
  addNbspWithinOrdinalDate,
  addNbspAfterRomanNumeral,
  fixNbspForNameWithRegnalNumber,
  fixSpaceBeforePercent,
  addNbspBeforeSingleLetter,
} from "../../src/modules/whitespace/nbsp.js";

//

//

const testString = `Content MDC`;
const testLocale = "en-us";

//

//

function debugFixNbsp(inputString, locale = "en-us", configuration = {}) {
  console.log("=".repeat(80));
  console.log("DEBUG: NBSP Transformation");
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

  // Step 1: Remove nbsp between multi-char words
  const oldString1 = string;
  string = removeNbspBetweenMultiCharWords(string);
  logStep("removeNbspBetweenMultiCharWords", string, oldString1);

  // Step 2: Add nbsp after preposition
  const oldString2 = string;
  string = addNbspAfterPreposition(string, currentLocale);
  logStep("addNbspAfterPreposition", string, oldString2);

  // Step 3: Add nbsp after ampersand
  const oldString3 = string;
  string = addNbspAfterAmpersand(string);
  logStep("addNbspAfterAmpersand", string, oldString3);

  // Step 4: Add nbsp after cardinal number
  const oldString4 = string;
  string = addNbspAfterCardinalNumber(string);
  logStep("addNbspAfterCardinalNumber", string, oldString4);

  // Step 5: Add nbsp after ordinal number
  const oldString5 = string;
  string = addNbspAfterOrdinalNumber(string, currentLocale);
  logStep("addNbspAfterOrdinalNumber", string, oldString5);

  // Step 6: Add nbsp within ordinal date
  const oldString6 = string;
  string = addNbspWithinOrdinalDate(string, currentLocale);
  logStep("addNbspWithinOrdinalDate", string, oldString6);

  // Step 7: Add nbsp after Roman numeral
  const oldString7 = string;
  string = addNbspAfterRomanNumeral(string, currentLocale);
  logStep("addNbspAfterRomanNumeral", string, oldString7);

  // Step 8: Fix nbsp for name with regnal number
  const oldString8 = string;
  string = fixNbspForNameWithRegnalNumber(string, currentLocale);
  logStep("fixNbspForNameWithRegnalNumber", string, oldString8);

  // Step 9: Fix space before percent
  const oldString9 = string;
  string = fixSpaceBeforePercent(string, currentLocale);
  logStep("fixSpaceBeforePercent", string, oldString9);

  // Step 10: Add nbsp before single letter
  const oldString10 = string;
  string = addNbspBeforeSingleLetter(string, currentLocale);
  logStep("addNbspBeforeSingleLetter", string, oldString10);

  console.log("=".repeat(80));
  console.log(`FINAL RESULT: "${string}"`);
  console.log("=".repeat(80));

  return string;
}

function getNbspTransformationSteps(inputString, locale = "en-us", configuration = {}) {
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
  string = removeNbspBetweenMultiCharWords(string);
  string = addStep("removeNbspBetweenMultiCharWords", string, oldString1);

  const oldString2 = string;
  string = addNbspAfterPreposition(string, currentLocale);
  string = addStep("addNbspAfterPreposition", string, oldString2);

  const oldString3 = string;
  string = addNbspAfterAmpersand(string);
  string = addStep("addNbspAfterAmpersand", string, oldString3);

  const oldString4 = string;
  string = addNbspAfterCardinalNumber(string);
  string = addStep("addNbspAfterCardinalNumber", string, oldString4);

  const oldString5 = string;
  string = addNbspAfterOrdinalNumber(string, currentLocale);
  string = addStep("addNbspAfterOrdinalNumber", string, oldString5);

  const oldString6 = string;
  string = addNbspWithinOrdinalDate(string, currentLocale);
  string = addStep("addNbspWithinOrdinalDate", string, oldString6);

  const oldString7 = string;
  string = addNbspAfterRomanNumeral(string, currentLocale);
  string = addStep("addNbspAfterRomanNumeral", string, oldString7);

  const oldString8 = string;
  string = fixNbspForNameWithRegnalNumber(string, currentLocale);
  string = addStep("fixNbspForNameWithRegnalNumber", string, oldString8);

  const oldString9 = string;
  string = fixSpaceBeforePercent(string, currentLocale);
  string = addStep("fixSpaceBeforePercent", string, oldString9);

  const oldString10 = string;
  string = addNbspBeforeSingleLetter(string, currentLocale);
  string = addStep("addNbspBeforeSingleLetter", string, oldString10);

  return {
    input:         inputString,
    output:        string,
    locale:        locale,
    configuration: configuration,
    steps:         steps,
    changedSteps:  steps.filter((step) => step.changed),
  };
}

export { debugFixNbsp, getNbspTransformationSteps };

/*
  Console output
*/
// Example 1: Console output debug (detailed)
console.log("=== CONSOLE DEBUG EXAMPLE ===");
debugFixNbsp(testString, testLocale);

console.log("\n\n=== PROGRAMMATIC API EXAMPLE ===");

// Example 2: Get steps as data structure
const result = getNbspTransformationSteps(testString, testLocale);

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
