import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import { createRequire } from "module";
import { describe, expect, it } from "vitest";
import { fixTypos } from "../../src/typopo.js";
import { exponentSet } from "../symbols/exponents.test.js";
import { marksSet } from "../symbols/marks.test.js";
import { multiplicationSignSet } from "../symbols/multiplication-sign.test.js";
import { numberSignSet } from "../symbols/number-sign.test.js";
import { plusMinusSet } from "../symbols/plus-minus.test.js";
import { symbolSet, transformSymbolSet } from "../symbols/symbol-utils.test.js";
import { caseSet } from "../words/case.test.js";
import { pubIdSet } from "../words/pub-id.test.js";
import { exceptionsSet } from "../words/exceptions.test.js";
import { hyphenSet } from "../punctuation/hyphen.test.js";
import { periodSet } from "../punctuation/period.test.js";
import { linesSet } from "../whitespace/lines.test.js";
import { getDoubleQuoteSet } from "../punctuation/double-quotes.test.js";

let fixTyposMinified = null;
let fixTyposUmd = null;

if (!process.env.SOURCE_ONLY) {
  try {
    const requireFromModule = createRequire(import.meta.url);
    const minified = requireFromModule("../../dist/typopo.cjs");
    fixTyposMinified = minified.fixTypos;
    console.log("CJS version loaded for testing");
  } catch (error) {
    console.log(`CJS version not available (${error.message}), skipping CJS tests`);
  }

  try {
    // Load UMD version using jsdom simulation
    const umdCode = readFileSync("./dist/typopo.umd.js", "utf8");
    const dom = new JSDOM(`<script>${umdCode}</script>`, { runScripts: "dangerously" });
    fixTyposUmd = dom.window.typopo.fixTypos;
    console.log("UMD version loaded for testing");
  } catch (error) {
    console.log(`UMD version not available (${error.message}), skipping UMD tests`);
  }
} else {
  console.log("SOURCE_ONLY mode: skipping minified tests");
}

function runAllVersions(testCase, locale, config) {
  Object.keys(testCase).forEach((key) => {
    it(`source: ${key.substring(0, 30)}${key.length > 30 ? "..." : ""}`, () => {
      expect(fixTypos(key, locale, config)).toBe(testCase[key]);
    });
  });

  if (fixTyposMinified) {
    Object.keys(testCase).forEach((key) => {
      it(`cjs: ${key.substring(0, 30)}${key.length > 30 ? "..." : ""}`, () => {
        expect(fixTyposMinified(key, locale, config)).toBe(testCase[key]);
      });
    });
  }

  if (fixTyposUmd) {
    Object.keys(testCase).forEach((key) => {
      it(`umd: ${key.substring(0, 30)}${key.length > 30 ? "..." : ""}`, () => {
        expect(fixTyposUmd(key, locale, config)).toBe(testCase[key]);
      });
    });
  }
}

describe("Test consistency of internal variables", () => {
  let testCase = {
    /*
     We are using temporary {variables} in curly brackets as text replacement
     in some functions. Make sure that variables in curly brackets do not change
     in course of running algorithm.
     */
    "{{test-variable}}":                                    "{{test-variable}}",
    "{{test-variable}} at the beginning of the sentence.":  "{{test-variable}} at the beginning of the sentence.",
    "And {{test-variable}} in the middle of the sentence.": "And {{test-variable}} in the middle of the sentence.",
  };

  runAllVersions(testCase, "en-us");
});

describe("Test that exceptions remain intact", () => {
  let testCase = {
    /*
     Exceptions
     [1] URL address
     [2] IP address
     [3] Email adress

     implementation to identify  URLs, IPs or emails:
     http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
     */
    ...exceptionsSet,
  };

  runAllVersions(testCase, "en-us");
});

/* 
  typopo configurations 
*/
let configDefault = {
  removeLines:                         true,
  removeWhitespacesBeforeMarkdownList: true,
};

let configKeepLines = {
  removeLines:                         false,
  removeWhitespacesBeforeMarkdownList: true,
};

let configKeepWhitespacesBeforeMarkdownList = {
  removeLines:                         true,
  removeWhitespacesBeforeMarkdownList: false,
};

let configKeepMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: true,
  removeLines:            false,
};

/* 
  Test cases 
*/
function getTestModules(localeName) {
  return {
    // punctuation
    ...hyphenSet,
    ...periodSet,
    ...getDoubleQuoteSet(localeName),

    // ellipsis
    "Sentence ..….. another sentence":      "Sentence … another sentence",
    "Sentence ended. … and we were there.": "Sentence ended. …and we were there.",

    // symbols
    ...transformSymbolSet(symbolSet, "copyright", localeName),
    ...transformSymbolSet(symbolSet, "soundRecordingCopyright", localeName),
    ...transformSymbolSet(symbolSet, "paragraphSign", localeName),
    ...transformSymbolSet(symbolSet, "sectionSign", localeName),
    ...transformSymbolSet(symbolSet, "numeroSign", localeName),
    ...numberSignSet,
    ...plusMinusSet,
    ...exponentSet,
    ...multiplicationSignSet,
    ...marksSet,

    // whitespace
    // lines are in keepLines and removeLines

    // words
    ...caseSet,
    ...pubIdSet,

    //tbd
    // spaces
    "Sentence and… ?":                         "Sentence and…?",
    "🥳 word 🥳 word 🥳":                      "🥳 word 🥳 word 🥳",
    "🥳 word 🥳 word 🥳":                      "🥳 word 🥳 word 🥳",
    // nbsp
    "v a v a v":                               "v a v a v",
    "The product X is missing the feature Y.": "The product X is missing the feature Y.",

    "Sputnik V":                       "Sputnik V",
    "Človek Č":                        "Človek Č",
    "© V Inc.":                        "© V Inc.",
    "bola to I. kapitola":             "bola to I. kapitola",
    "url_to_image_5.jpg":              "url_to_image_5.jpg",
    "pán Šťastný":                     "pán Šťastný",
    "pán ŠŤASTNÝ":                     "pán ŠŤASTNÝ",
    "One sentence ends. A bad apple.": "One sentence ends. A bad apple.",
    "One sentence ends? A bad apple.": "One sentence ends? A bad apple.",
    "One sentence ends! A bad apple.": "One sentence ends! A bad apple.",
    "sentence; C-level executive":     "sentence; C-level executive",
    "sentence: C-level executive":     "sentence: C-level executive",
    "sentence, C-level executive":     "sentence, C-level executive",
    "I’d say… A-player":               "I’d say… A-player",
    "sentence (brackets) A-player":    "sentence (brackets) A-player",
    "sentence [brackets] A-player":    "sentence [brackets] A-player",
    "sentence {brackets} A-player":    "sentence {brackets} A-player",
    "A × A":                           "A × A",

    // double primes
    'It’s 12" x 12".': "It’s 12″ × 12″.",
  };
}

let testRemoveLines = {
  ...linesSet,
};

let testKeepLines = {
  ...Object.fromEntries(Object.keys(linesSet).map((key) => [key, key])),
};

let testRemoveWhitespacesBeforeMarkdownList = {
  "  - list item":   "- list item",
  "  * list item":   "* list item",
  "\t\t- list item": "- list item",
  "\t\t* list item": "* list item",
};

let testKeepWhitespacesBeforeMarkdownList = {
  "  - list item":   "  - list item",
  "  * list item":   "  * list item",
  "\t\t- list item": "\t\t- list item",
  "\t\t* list item": "\t\t* list item",
};

let testModuleSingleQuotesEnUs = {
  // single quotes
  "Let's test this: “however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said”":
    "Let’s test this: “however, ‘quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,’ he said”",
  "I'''m":  "I’m",
  "I''''m": "I’m",
  "He said: “What about 'name' and 'other name'?”":
    "He said: “What about ‘name’ and ‘other name’?”",
  "Q1 '23 ": "Q1 ’23", // false positive
};

let testModuleSingleQuotesDeDe = {
  // single quotes
  "Let's test this: “however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said”":
    "Let’s test this: „however, ‚quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,‘ he said“",
  "I'''m":  "I’m",
  "I''''m": "I’m",
  "He said: “What about 'name' and 'other name'?”":
    "He said: „What about ‚name‘ and ‚other name‘?“",
};

let testModuleSingleQuotesSk = {
  ...testModuleSingleQuotesDeDe,
};

let testModuleSingleQuotesCs = {
  ...testModuleSingleQuotesDeDe,
};

let testModuleSingleQuotesRue = {
  // single quotes
  "Let's test this: “however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said”":
    "Let’s test this: «however, ‹quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,› he said»",
  "I'''m":  "I’m",
  "I''''m": "I’m",
  "He said: “What about 'name' and 'other name'?”":
    "He said: «What about ‹name› and ‹other name›?»",
};

let testModuleAbbreviationsEnUs = {
  // abbreviations
  "(e.g.)":                          "(e.g.)",
  "a.m.":                            "a.m.",
  "5 a.m.":                          "5 a.m.",
  "CH. CH. CH. Lambert":             "CH.CH.CH. Lambert",
  "the U.S.":                        "the U.S.",
  "e.g. 🥳":                         "e.g. 🥳",
  "i. e. 🥳":                        "i.e. 🥳",
  // punctuation trimming
  "č., s., fol., e.g., i.e., str.,": "č., s., fol., e.g., i.e., str.,",
};

let testModuleAbbreviationsDeDe = {
  // abbreviations
  "(e.g.)":                          "(e. g.)",
  "a.m.":                            "a. m.",
  "5 a.m.":                          "5 a. m.",
  "CH. CH. CH. Lambert":             "CH. CH. CH. Lambert",
  "the U.S.":                        "the U. S.",
  // punctuation trimming
  "č., s., fol., e.g., i.e., str.,": "č., s., fol., e. g., i. e., str.,",
};

let testModuleAbbreviationsSk = {
  ...testModuleAbbreviationsDeDe,
};

let testModuleAbbreviationsCs = {
  ...testModuleAbbreviationsDeDe,
};

let testModuleAbbreviationsRue = {
  ...testModuleAbbreviationsDeDe,
};

let testModuleNbsp = {
  "The product X is missing the feature Y.": "The product X is missing the feature Y.",

  "Sputnik V": "Sputnik V",
  "Človek Č":  "Človek Č",
  "© V Inc.":  "© V Inc.",

  // false positives
  "bola to I. kapitola":             "bola to I. kapitola",
  "pán Šťastný":                     "pán Šťastný",
  "pán ŠŤASTNÝ":                     "pán ŠŤASTNÝ",
  "One sentence ends. A bad apple.": "One sentence ends. A bad apple.",
  "One sentence ends? A bad apple.": "One sentence ends? A bad apple.",
  "One sentence ends! A bad apple.": "One sentence ends! A bad apple.",
  "sentence; C-level executive":     "sentence; C-level executive",
  "sentence: C-level executive":     "sentence: C-level executive",
  "sentence, C-level executive":     "sentence, C-level executive",
  "I’d say… A-player":               "I’d say… A-player",
  "sentence (brackets) A-player":    "sentence (brackets) A-player",
  "sentence [brackets] A-player":    "sentence [brackets] A-player",
  "sentence {brackets} A-player":    "sentence {brackets} A-player",
  "A × A":                           "A × A",

  // false positive for filenames
  "url-to-image-5.jpg": "url-to-image-5.jpg",

  "url_to_image_5.jpg": "url_to_image_5.jpg",

  "url%to%image%5.jpg": "url%to%image%5.jpg",

  "url to image 5.jpg": "url to image 5.jpg",

  "URL-TO-IMAGE-5.JPG": "URL-TO-IMAGE-5.JPG",

  "URL_TO_IMAGE_5.JPG": "URL_TO_IMAGE_5.JPG",

  "URL%TO%IMAGE%5.JPG": "URL%TO%IMAGE%5.JPG",

  "URL TO IMAGE 5.JPG": "URL TO IMAGE 5.JPG",
};

let testModuleNbspEnUs = {
  ...testModuleNbsp,
  // false positives
  "When I talk":                    "When I talk", // do not add nbsp before I
  "“qouted part” A capital letter": "“qouted part” A capital letter",
  "qouted part’ A capital letter":  "qouted part’ A capital letter",
};

let testModuleNbspDeDe = {
  ...testModuleNbsp,
  "Vzorka I":         "Vzorka I",
  "Vzorka I je fajn": "Vzorka I je fajn", // remove nbsp after I
  "Vzorka I je fajn": "Vzorka I je fajn", // remove hairSpace after I
  "Vzorka I je fajn": "Vzorka I je fajn", // remove narrowNbsp after I

  // false positives
  "„qouted part“ A capital letter": "„qouted part“ A capital letter",
  "apostrophe’ A capital letter":   "apostrophe’ A capital letter",
};

let testModuleNbspSk = {
  ...testModuleNbspDeDe,
};

let testModuleNbspCs = {
  ...testModuleNbspDeDe,
};

let testModuleNbspRue = {
  ...testModuleNbsp,
  "Vzorka I":         "Vzorka I",
  "Vzorka I je fajn": "Vzorka I je fajn", // remove nbsp after I
  "Vzorka I je fajn": "Vzorka I je fajn", // remove hairSpace after I
  "Vzorka I je fajn": "Vzorka I je fajn", // remove narrowNbsp after I

  // false positives
  "«qouted part» A capital letter": "«qouted part» A capital letter",
  "apostrophe’ A capital letter":   "apostrophe’ A capital letter",
};

let testModuleCombinations = {
  /*
   Selected combination of rules processed within modules that may clash.
   */

  // Will it remove extra punctuation or will it keep the abbreviation as expected?
  "We will continue tomorrow at 8:00 a.m.!": "We will continue tomorrow at 8:00 a.m.!",
  // Will it remove extra dot?
  "We will continue tomorrow at 8:00 a.m..": "We will continue tomorrow at 8:00 a.m.",

  /*	Combination of resolving issues with ellipsis and brackets together.
      In scientific discourse, […] is used to signify deliberately omitted
      parts (e.g. of a quotation) */
  "quote [...]with parts left out":    "quote […] with parts left out",
  "quote[…] with parts left out":      "quote […] with parts left out",
  "quote [ ...] with parts left out":  "quote […] with parts left out",
  "quote [.... ] with parts left out": "quote […] with parts left out",
  "quote [ ….. ] with parts left out": "quote […] with parts left out",

  // combination of dash.js and nbsp.js for percent, permille, permyriad
  "20 ‱ – 30 ‱": "20‱–30‱",

  "Because of this, it’s common": "Because of this, it’s common",
};

/* 
  Tests 
*/
describe("Tests that all modules are plugged for en-us", () => {
  let testCase = {
    ...getTestModules("en-us"),
    ...testModuleCombinations,
    ...testModuleSingleQuotesEnUs,
    ...testModuleAbbreviationsEnUs,
    ...testModuleNbspEnUs,
  };

  describe("with default config", () => {
    let testCaseDefault = {
      ...testCase,
      ...testRemoveLines,
      ...testRemoveWhitespacesBeforeMarkdownList,
    };

    runAllVersions(testCaseDefault, "en-us", configDefault);
  });

  describe("with removeLines=false", () => {
    let testCaseKeepLines = {
      ...testCase,
      ...testKeepLines,
    };

    runAllVersions(testCaseKeepLines, "en-us", configKeepLines);
  });

  describe("with removeWhitespacesBeforeMarkdownList=false", () => {
    let testCaseKeepWhitespacesBeforeMarkdownList = {
      ...testCase,
      ...testKeepWhitespacesBeforeMarkdownList,
    };

    runAllVersions(
      testCaseKeepWhitespacesBeforeMarkdownList,
      "en-us",
      configKeepWhitespacesBeforeMarkdownList
    );
  });
});

describe("Tests that all modules are plugged for de-de", () => {
  let testCase = {
    ...getTestModules("de-de"),
    ...testModuleSingleQuotesDeDe,
    ...testModuleAbbreviationsDeDe,
    ...testModuleNbspDeDe,
  };

  describe("with default config", () => {
    let testCaseDefault = {
      ...testCase,
      ...testRemoveLines,
      ...testRemoveWhitespacesBeforeMarkdownList,
    };

    runAllVersions(testCaseDefault, "de-de", configDefault);
  });

  describe("with removeLines=false", () => {
    let testCaseKeepLines = {
      ...testCase,
      ...testKeepLines,
    };

    runAllVersions(testCaseKeepLines, "de-de", configKeepLines);
  });

  describe("with removeWhitespacesBeforeMarkdownList=false", () => {
    let testCaseKeepWhitespacesBeforeMarkdownList = {
      ...testCase,
      ...testKeepWhitespacesBeforeMarkdownList,
    };

    runAllVersions(
      testCaseKeepWhitespacesBeforeMarkdownList,
      "de-de",
      configKeepWhitespacesBeforeMarkdownList
    );
  });
});

describe("Tests that all modules are plugged for sk", () => {
  let testCase = {
    ...getTestModules("sk"),
    ...testModuleSingleQuotesSk,
    ...testModuleAbbreviationsSk,
    ...testModuleNbspSk,
  };

  describe("with default config", () => {
    let testCaseDefault = {
      ...testCase,
      ...testRemoveLines,
      ...testRemoveWhitespacesBeforeMarkdownList,
    };

    runAllVersions(testCaseDefault, "sk", configDefault);
  });

  describe("with removeLines=false", () => {
    let testCaseKeepLines = {
      ...testCase,
      ...testKeepLines,
    };

    runAllVersions(testCaseKeepLines, "sk", configKeepLines);
  });

  describe("with removeWhitespacesBeforeMarkdownList=false", () => {
    let testCaseKeepWhitespacesBeforeMarkdownList = {
      ...testCase,
      ...testKeepWhitespacesBeforeMarkdownList,
    };

    runAllVersions(
      testCaseKeepWhitespacesBeforeMarkdownList,
      "sk",
      configKeepWhitespacesBeforeMarkdownList
    );
  });
});

describe("Tests that all modules are plugged for cs", () => {
  let testCase = {
    ...getTestModules("cs"),
    ...testModuleSingleQuotesCs,
    ...testModuleAbbreviationsCs,
    ...testModuleNbspCs,
  };

  describe("with default config", () => {
    let testCaseDefault = {
      ...testCase,
      ...testRemoveLines,
      ...testRemoveWhitespacesBeforeMarkdownList,
    };

    runAllVersions(testCaseDefault, "cs", configDefault);
  });

  describe("with removeLines=false", () => {
    let testCaseKeepLines = {
      ...testCase,
      ...testKeepLines,
    };

    runAllVersions(testCaseKeepLines, "cs", configKeepLines);
  });

  describe("with removeWhitespacesBeforeMarkdownList=false", () => {
    let testCaseKeepWhitespacesBeforeMarkdownList = {
      ...testCase,
      ...testKeepWhitespacesBeforeMarkdownList,
    };

    runAllVersions(
      testCaseKeepWhitespacesBeforeMarkdownList,
      "cs",
      configKeepWhitespacesBeforeMarkdownList
    );
  });
});

describe("Tests that all modules are plugged for rue", () => {
  let testCase = {
    ...getTestModules("rue"),
    ...testModuleSingleQuotesRue,
    ...testModuleAbbreviationsRue,
    ...testModuleNbspRue,
  };

  describe("with default config", () => {
    let testCaseDefault = {
      ...testCase,
      ...testRemoveLines,
      ...testRemoveWhitespacesBeforeMarkdownList,
    };

    runAllVersions(testCaseDefault, "rue", configDefault);
  });

  describe("with removeLines=false", () => {
    let testCaseKeepLines = {
      ...testCase,
      ...testKeepLines,
    };

    runAllVersions(testCaseKeepLines, "rue", configKeepLines);
  });

  describe("with removeWhitespacesBeforeMarkdownList=false", () => {
    let testCaseKeepWhitespacesBeforeMarkdownList = {
      ...testCase,
      ...testKeepWhitespacesBeforeMarkdownList,
    };

    runAllVersions(
      testCaseKeepWhitespacesBeforeMarkdownList,
      "rue",
      configKeepWhitespacesBeforeMarkdownList
    );
  });
});

describe("Test if markdown ticks are kept (integration test) (en-us):\n", () => {
  let testCase = {
    "```\ncode\n```": "```\ncode\n```",

    "``code``": "``code``",

    "``code code``": "``code code``",

    "``code`` ``code``": "``code`` ``code``",

    "`code`": "`code`",

    "`code code`": "`code code`",

    "`code` `code`": "`code` `code`",

    "e.g. `something`": "e.g. `something`",
  };

  runAllVersions(testCase, "en-us", configKeepMarkdownCodeBlocks);
});
