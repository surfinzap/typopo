#!/usr/bin/env node

import Locale from "../../src/locale/locale.js";
import { removeEmptyLines } from "../../src/modules/whitespace/lines.js";
import { fixNbsp } from "../../src/modules/whitespace/nbsp.js";
import { fixSpaces } from "../../src/modules/whitespace/spaces.js";
import { fixPeriod } from "../../src/modules/punctuation/period.js";
import { fixEllipsis } from "../../src/modules/punctuation/ellipsis.js";
import { fixHyphen } from "../../src/modules/punctuation/hyphen.js";
import { fixDash } from "../../src/modules/punctuation/dash.js";
import { fixDoubleQuotesAndPrimes } from "../../src/modules/punctuation/double-quotes.js";
import { fixSingleQuotesPrimesAndApostrophes } from "../../src/modules/punctuation/single-quotes.js";
import { fixMultiplicationSign } from "../../src/modules/symbols/multiplication-sign.js";
import { fixSectionSign } from "../../src/modules/symbols/section-sign.js";
import { fixCopyrights } from "../../src/modules/symbols/copyrights.js";
import { fixNumeroSign } from "../../src/modules/symbols/numero-sign.js";
import { fixPlusMinus } from "../../src/modules/symbols/plus-minus.js";
import { fixMarks } from "../../src/modules/symbols/marks.js";
import { fixExponents } from "../../src/modules/symbols/exponents.js";
import { fixNumberSign } from "../../src/modules/symbols/number-sign.js";
import { fixAbbreviations } from "../../src/modules/words/abbreviations.js";
import { fixCase } from "../../src/modules/words/case.js";
import { fixPubId } from "../../src/modules/words/pub-id.js";
import { excludeExceptions, placeExceptions } from "../../src/modules/words/exceptions.js";

//

//

const testString = "Before you ask the „How often“… question";
const testLocale = "de-de";

//

//

function debugFixTypos(inputString, locale = "en-us", configuration = {}) {
  console.log("=".repeat(80));
  console.log("DEBUG: Typopo String Transformation");
  console.log("=".repeat(80));

  let currentLocale = new Locale(locale);

  configuration = {
    removeLines:                         true,
    removeWhitespacesBeforeMarkdownList: true,
    keepMarkdownCodeBlocks:              false,
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

  // Step 1: Exclude exceptions from fixing
  const { processedText, exceptions } = excludeExceptions(string);
  const oldString1 = string;
  string = processedText;
  logStep("excludeExceptions", string, oldString1);

  // Step 2: Remove empty lines (if configured)
  if (configuration.removeLines) {
    const oldString2 = string;
    string = removeEmptyLines(string);
    logStep("removeEmptyLines", string, oldString2);
  }

  // Step 3: Fix ellipsis (before spaces cleanup)
  const oldString3 = string;
  string = fixEllipsis(string, currentLocale);
  logStep("fixEllipsis", string, oldString3);

  // Step 4: Clean up spaces
  const oldString4 = string;
  string = fixSpaces(string, currentLocale, configuration);
  logStep("fixSpaces", string, oldString4);

  // Step 5: Fix punctuation - period
  const oldString5 = string;
  string = fixPeriod(string);
  logStep("fixPeriod", string, oldString5);

  // Step 6: Fix punctuation - dash
  const oldString6 = string;
  string = fixDash(string, currentLocale);
  logStep("fixDash", string, oldString6);

  // Step 7: Fix punctuation - hyphen
  const oldString7 = string;
  string = fixHyphen(string);
  logStep("fixHyphen", string, oldString7);

  // Step 8: Fix single quotes, primes, and apostrophes
  const oldString8 = string;
  string = fixSingleQuotesPrimesAndApostrophes(string, currentLocale, configuration);
  logStep("fixSingleQuotesPrimesAndApostrophes", string, oldString8);

  // Step 9: Fix double quotes and primes
  const oldString9 = string;
  string = fixDoubleQuotesAndPrimes(string, currentLocale, configuration);
  logStep("fixDoubleQuotesAndPrimes", string, oldString9);

  // Step 10: Fix multiplication sign
  const oldString10 = string;
  string = fixMultiplicationSign(string);
  logStep("fixMultiplicationSign", string, oldString10);

  // Step 11: Fix section sign
  const oldString11 = string;
  string = fixSectionSign(string, currentLocale);
  logStep("fixSectionSign", string, oldString11);

  // Step 12: Fix copyrights
  const oldString12 = string;
  string = fixCopyrights(string, currentLocale);
  logStep("fixCopyrights", string, oldString12);

  // Step 13: Fix numero sign
  const oldString13 = string;
  string = fixNumeroSign(string, currentLocale);
  logStep("fixNumeroSign", string, oldString13);

  // Step 14: Fix plus/minus
  const oldString14 = string;
  string = fixPlusMinus(string);
  logStep("fixPlusMinus", string, oldString14);

  // Step 15: Fix marks
  const oldString15 = string;
  string = fixMarks(string);
  logStep("fixMarks", string, oldString15);

  // Step 16: Fix exponents
  const oldString16 = string;
  string = fixExponents(string);
  logStep("fixExponents", string, oldString16);

  // Step 17: Fix number sign
  const oldString17 = string;
  string = fixNumberSign(string);
  logStep("fixNumberSign", string, oldString17);

  // Step 18: Fix case
  const oldString18 = string;
  string = fixCase(string);
  logStep("fixCase", string, oldString18);

  // Step 19: Fix publication ID
  const oldString19 = string;
  string = fixPubId(string);
  logStep("fixPubId", string, oldString19);

  // Step 20: Fix abbreviations
  const oldString20 = string;
  string = fixAbbreviations(string, currentLocale);
  logStep("fixAbbreviations", string, oldString20);

  // Step 21: Fix non-breaking spaces
  const oldString21 = string;
  string = fixNbsp(string, currentLocale);
  logStep("fixNbsp", string, oldString21);

  // Step 22: Place excluded exceptions
  const oldString22 = string;
  string = placeExceptions(string, exceptions);
  logStep("placeExceptions", string, oldString22);

  console.log("=".repeat(80));
  console.log(`FINAL RESULT: "${string}"`);
  console.log("=".repeat(80));

  return string;
}

function getTypoTransformationSteps(inputString, locale = "en-us", configuration = {}) {
  let currentLocale = new Locale(locale);

  configuration = {
    removeLines:                         true,
    removeWhitespacesBeforeMarkdownList: true,
    keepMarkdownCodeBlocks:              false,
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

  // Apply all the same transformations as debugFixTypos
  const { processedText, exceptions } = excludeExceptions(string);
  string = addStep("excludeExceptions", processedText, string);

  if (configuration.removeLines) {
    const oldString = string;
    string = removeEmptyLines(string);
    string = addStep("removeEmptyLines", string, oldString);
  }

  const oldString3 = string;
  string = fixEllipsis(string, currentLocale);
  string = addStep("fixEllipsis", string, oldString3);

  const oldString4 = string;
  string = fixSpaces(string, currentLocale, configuration);
  string = addStep("fixSpaces", string, oldString4);

  const oldString5 = string;
  string = fixPeriod(string);
  string = addStep("fixPeriod", string, oldString5);

  const oldString6 = string;
  string = fixDash(string, currentLocale);
  string = addStep("fixDash", string, oldString6);

  const oldString7 = string;
  string = fixHyphen(string);
  string = addStep("fixHyphen", string, oldString7);

  const oldString8 = string;
  string = fixSingleQuotesPrimesAndApostrophes(string, currentLocale, configuration);
  string = addStep("fixSingleQuotesPrimesAndApostrophes", string, oldString8);

  const oldString9 = string;
  string = fixDoubleQuotesAndPrimes(string, currentLocale, configuration);
  string = addStep("fixDoubleQuotesAndPrimes", string, oldString9);

  const oldString10 = string;
  string = fixMultiplicationSign(string);
  string = addStep("fixMultiplicationSign", string, oldString10);

  const oldString11 = string;
  string = fixSectionSign(string, currentLocale);
  string = addStep("fixSectionSign", string, oldString11);

  const oldString12 = string;
  string = fixCopyrights(string, currentLocale);
  string = addStep("fixCopyrights", string, oldString12);

  const oldString13 = string;
  string = fixNumeroSign(string, currentLocale);
  string = addStep("fixNumeroSign", string, oldString13);

  const oldString14 = string;
  string = fixPlusMinus(string);
  string = addStep("fixPlusMinus", string, oldString14);

  const oldString15 = string;
  string = fixMarks(string);
  string = addStep("fixMarks", string, oldString15);

  const oldString16 = string;
  string = fixExponents(string);
  string = addStep("fixExponents", string, oldString16);

  const oldString17 = string;
  string = fixNumberSign(string);
  string = addStep("fixNumberSign", string, oldString17);

  const oldString18 = string;
  string = fixCase(string);
  string = addStep("fixCase", string, oldString18);

  const oldString19 = string;
  string = fixPubId(string);
  string = addStep("fixPubId", string, oldString19);

  const oldString20 = string;
  string = fixAbbreviations(string, currentLocale);
  string = addStep("fixAbbreviations", string, oldString20);

  const oldString21 = string;
  string = fixNbsp(string, currentLocale);
  string = addStep("fixNbsp", string, oldString21);

  const oldString22 = string;
  string = placeExceptions(string, exceptions);
  string = addStep("placeExceptions", string, oldString22);

  return {
    input:         inputString,
    output:        string,
    locale:        locale,
    configuration: configuration,
    steps:         steps,
    changedSteps:  steps.filter((step) => step.changed),
  };
}

export { debugFixTypos, getTypoTransformationSteps };

/* 
  Console output
*/
// Example 1: Console output debug (detailed)
console.log("=== CONSOLE DEBUG EXAMPLE ===");
debugFixTypos(testString, testLocale);

console.log("\n\n=== PROGRAMMATIC API EXAMPLE ===");

// Example 2: Get steps as data structure
const result = getTypoTransformationSteps(testString, testLocale);

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
