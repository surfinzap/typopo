import { readFileSync } from "fs";
import { JSDOM } from "jsdom";
import { createRequire } from "module";
import { describe, expect, it } from "vitest";

import { supportedLocales } from "../../src/locale/locale.js";
import { fixTypos } from "../../src/typopo.js";
import { getDoubleQuoteSet } from "../punctuation/double-quotes.test.js";
import { ellipsisSet } from "../punctuation/ellipsis.test.js";
import { hyphenSet } from "../punctuation/hyphen.test.js";
import { periodSet } from "../punctuation/period.test.js";
import { getSingleQuoteSet } from "../punctuation/single-quotes.test.js";
import { exponentSet } from "../symbols/exponents.test.js";
import { marksSet } from "../symbols/marks.test.js";
import { multiplicationSignSet } from "../symbols/multiplication-sign.test.js";
import { numberSignSet } from "../symbols/number-sign.test.js";
import { plusMinusSet } from "../symbols/plus-minus.test.js";
import { symbolSet, transformSymbolSet } from "../symbols/symbol-utils.test.js";
import { linesSet } from "../whitespace/lines.test.js";
import { getNbspSet } from "../whitespace/nbsp.test.js";
import { spacesSet } from "../whitespace/spaces.test.js";
import { abbreviationsSet, transformAbbrSet } from "../words/abbreviations.test.js";
import { caseSet } from "../words/case.test.js";
import { exceptionsSet } from "../words/exceptions.test.js";
import { pubIdSet } from "../words/pub-id.test.js";
import { dashSet, transformDashSet } from "../punctuation/dash.test.js";

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
    "{{test-variable}}": "{{test-variable}}",
    "{{test-variable}} at the beginning of the sentence.":
      "{{test-variable}} at the beginning of the sentence.",
    "And {{test-variable}} in the middle of the sentence.":
      "And {{test-variable}} in the middle of the sentence.",
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
const configDefault = {
  removeLines:                         true,
  removeWhitespacesBeforeMarkdownList: true,
};

const configKeepLines = {
  removeLines:                         false,
  removeWhitespacesBeforeMarkdownList: true,
};

const configKeepWhitespacesBeforeMarkdownList = {
  removeLines:                         true,
  removeWhitespacesBeforeMarkdownList: false,
};

const configKeepMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: true,
  removeLines:            false,
};

/* 
  Test cases 
*/

const moduleCombinations = {
  "We will continue tomorrow at 8:00 a.m.!": "We will continue tomorrow at 8:00 a.${abbrSpace}m.!",
  "We will continue tomorrow at 8:00 a.m..": "We will continue tomorrow at 8:00 a.${abbrSpace}m.",

  /*	Combination of resolving issues with ellipsis and brackets together. */
  "quote [...]with parts left out":    "quote […] with parts left out",
  "quote[…] with parts left out":      "quote […] with parts left out",
  "quote [ ...] with parts left out":  "quote […] with parts left out",
  "quote [.... ] with parts left out": "quote […] with parts left out",
  "quote [ ….. ] with parts left out": "quote […] with parts left out",

  "Because of this, it’s common": "Because of this, it’s common",
};

function getTestModules(localeName) {
  return {
    // punctuation
    ...hyphenSet,
    ...periodSet,
    ...ellipsisSet,
    ...getDoubleQuoteSet(localeName),
    ...getSingleQuoteSet(localeName),
    ...transformDashSet(dashSet, localeName),

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
    ...getNbspSet(localeName),
    ...spacesSet,

    // words
    ...transformAbbrSet(abbreviationsSet, localeName),
    ...caseSet,
    ...pubIdSet,

    // module combinations
    ...transformAbbrSet(moduleCombinations, localeName),
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

/* 
  Tests 
*/
supportedLocales.forEach((locale) => {
  describe(`Tests all modules for ${locale}`, () => {
    let testCase = {
      ...getTestModules(locale),
    };

    describe("with default config", () => {
      let testCaseDefault = {
        ...testCase,
        ...testRemoveLines,
        ...testRemoveWhitespacesBeforeMarkdownList,
      };

      runAllVersions(testCaseDefault, locale, configDefault);
    });

    describe("with removeLines=false", () => {
      let testCaseKeepLines = {
        ...testCase,
        ...testKeepLines,
      };

      runAllVersions(testCaseKeepLines, locale, configKeepLines);
    });

    describe("with removeWhitespacesBeforeMarkdownList=false", () => {
      let testCaseKeepWhitespacesBeforeMarkdownList = {
        ...testCase,
        ...testKeepWhitespacesBeforeMarkdownList,
      };

      runAllVersions(
        testCaseKeepWhitespacesBeforeMarkdownList,
        locale,
        configKeepWhitespacesBeforeMarkdownList
      );
    });
  });
});

describe("Markdown ticks are kept (integration test) (en-us):", () => {
  let testCase = {
    "```\ncode\n```":    "```\ncode\n```",
    "``code``":          "``code``",
    "``code code``":     "``code code``",
    "``code`` ``code``": "``code`` ``code``",
    "`code`":            "`code`",
    "`code code`":       "`code code`",
    "`code` `code`":     "`code` `code`",
    "e.g. `something`":  "e.g. `something`",
  };

  runAllVersions(testCase, "en-us", configKeepMarkdownCodeBlocks);
});
