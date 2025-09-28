import { base } from "../../src/const.js";

// Utility to debug regex patterns
function debugRegexPattern(patternParts, flags = "g") {
  const pattern = patternParts.join("");
  const regex = new RegExp(pattern, flags);

  console.log("=".repeat(50));
  console.log("Pattern parts:", patternParts);
  console.log("Combined:", pattern);
  console.log("Regex:", regex);
  console.log("Source:", regex.source);

  return regex;
}

const pattern = [
  /*place regex pattern*/
];

debugRegexPattern(pattern, "g");
