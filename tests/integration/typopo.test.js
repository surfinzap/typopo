import { fixTypos } from "../../src/typopo.js";
import assert from "assert";
import { join } from 'path';

// Try to load minified version for dual testing
let fixTyposMinified;
try {
  // Use require.resolve to get the absolute path in a CommonJS-compatible way
  const minifiedPath = join(__dirname, '../../dist/typopo_dist.min.js');
  const minified = require(minifiedPath);
  fixTyposMinified = minified.fixTypos;
} catch (error) {
  console.warn('Minified version not found, skipping minified tests:', error.message);
}

// Test runner helper that tests both source and minified versions
function testBothVersions(testName, testCases, locale, config) {
  describe(testName, () => {
    // Test source version
    describe("Source version", () => {
      Object.keys(testCases).forEach((key) => {
        it(`source: ${key.substring(0, 50)}${key.length > 50 ? '...' : ''}`, () => {
          assert.strictEqual(fixTypos(key, locale, config), testCases[key]);
        });
      });
    });

    // Test minified version if available
    if (fixTyposMinified) {
      describe("Minified version", () => {
        Object.keys(testCases).forEach((key) => {
          it(`minified: ${key.substring(0, 50)}${key.length > 50 ? '...' : ''}`, () => {
            assert.strictEqual(fixTyposMinified(key, locale, config), testCases[key]);
          });
        });
      });

      // Cross-comparison test - ensure both versions produce identical results
      describe("Source vs Minified consistency", () => {
        Object.keys(testCases).forEach((key) => {
          it(`consistency: ${key.substring(0, 50)}${key.length > 50 ? '...' : ''}`, () => {
            const sourceResult = fixTypos(key, locale, config);
            const minifiedResult = fixTyposMinified(key, locale, config);
            assert.strictEqual(sourceResult, minifiedResult, 
              `Source and minified versions produce different results for input: "${key}"`);
          });
        });
      });
    }
  });
}

// Test consistency of internal variables
let testInternalVariables = {
  /*
   We are using temporary {variables} in curly brackets as text replacement
   in some functions. Make sure that variables in curly brackets do not change
   in course of running algorithm.
   */
  "{{test-variable}}":                                    "{{test-variable}}",
  "{{test-variable}} at the beginning of the sentence.":  "{{test-variable}} at the beginning of the sentence.",
  "And {{test-variable}} in the middle of the sentence.": "And {{test-variable}} in the middle of the sentence.",
};

testBothVersions(
  "Test consistency of internal variables", 
  testInternalVariables, 
  "en-us"
);

// Test that exceptions remain intact
let testExceptions = {
  /*
   Exceptions

   This is list of exceptions that we want skip while correcting errors,
   namely:
   [1] URL address
   [2] IP address
   [3] Email adress

   Sidenote: List of tests is incomplete, however to identify
   all kinds of URLs, IPs or emails, we're adapting following implementation:
   http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
   */

  // [1] URL address
  "www.tota.sk":        "www.tota.sk",
  "http://www.tota.sk": "http://www.tota.sk",

  // [2] IP address
  "127.0.0.1": "127.0.0.1",

  // [3] Email address
  "mail@domain.com": "mail@domain.com",

  // test order of replacements
  "www.tota.sk and 127.0.0.1 and mail@domain.com":
    "www.tota.sk and 127.0.0.1 and mail@domain.com",
};

testBothVersions(
  "Test that exceptions remain intact", 
  testExceptions, 
  "en-us"
);

/* typopo configurations */
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

/* test cases */
let testModules = {
  // ellipsis
  "Sentence ..….. another sentence":      "Sentence … another sentence",
  "Sentence ended. … and we were there.": "Sentence ended. …and we were there.",

  // hyphen
  "e- shop": "e-shop",

  // section sign
  "under Law §1782":    "under Law § 1782",
  // copyright
  "Company (c)2017":    "Company © 2017",
  "( c ) 2017":         "© 2017",
  "( c     ) 2017":     "© 2017",
  "( c )2017":          "© 2017",
  "Company (c)  2017":  "Company © 2017",
  "Company (c)   2017": "Company © 2017",
  "Company  (c) 2017":  "Company © 2017",
  "Company   (c) 2017": "Company © 2017",
  "Company ©    2017":  "Company © 2017",

  // exponents
  "100 km3":            "100 km³",
  // plus-minus
  "+-":                 "±",
  // sound recording copyright
  "Company (p)2017":    "Company ℗ 2017",
  "( p ) 2017":         "℗ 2017",
  "( p     ) 2017":     "℗ 2017",
  "( p )2017":          "℗ 2017",
  "Company (p)  2017":  "Company ℗ 2017",
  "Company (p)   2017": "Company ℗ 2017",
  "Company  (p) 2017":  "Company ℗ 2017",
  "Company   (p) 2017": "Company ℗ 2017",
  "Company ℗    2017":  "Company ℗ 2017",
  //registered trademark
  "Company (r)":        "Company®",
  "Company ( r )":      "Company®",
  //service trademark
  "Company (sm)":       "Company℠",
  "Company ( sm )":     "Company℠",
  // trademark
  "Company (tm)":       "Company™",
  "Company ( tm )":     "Company™",
  // number sign
  "word # 9":           "word #9",

  // spaces
  "Sentence and… ?":    "Sentence and…?",
  "🥳 word 🥳 word 🥳": "🥳 word 🥳 word 🥳",
  "🥳 word 🥳 word 🥳": "🥳 word 🥳 word 🥳",
  // nbsp
  "v a v a v":          "v a v a v",
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

  // "the U.S. and" : "the U.S. and", not yet supported

  //case
  CMSko:    "CMSko",
  cAPSLOCK: "Capslock",

  // publication identifiers
  "ISSN 0000-0000":          "ISSN 0000-0000",
  "ISBN: 978-80-86102-81-8": "ISBN: 978-80-86102-81-8",

  // double primes
  'It’s 12" x 12".': "It’s 12″ × 12″.",
};

let testRemoveLines = {
  "remove\n\nlines": "remove\nlines",
};

let testKeepLines = {
  "keep\n\nlines": "keep\n\nlines",
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

let testModuleDoubleQuotesEnUs = {
  // double quotes
  "English „English„ „English„ English": "English “English” “English” English",
  'He said: "Here’s a 12" record."':  "He said: “Here’s a 12″ record.”",
  '12′ 45"':                            "12′ 45″",
  '3° 5′ 30"':                          "3° 5′ 30″",
  "12\"3'00°":                           "12″3′00°",

  'He was ok. "He was ok ".': "He was ok. “He was ok.”",

  "Ask “what if (the thing)…”": "Ask “what if (the thing)…”",
};

let testModuleDoubleQuotesDeDe = {
  // double quotes
  "English „English„ „English„ English": "English „English“ „English“ English",
  'He said: "Here’s a 12" record."':  "He said: „Here’s a 12″ record.“",
  '12′ 45"':                            "12′ 45″",
  '3° 5′ 30"':                          "3° 5′ 30″",
  "12\"3'00°":                           "12″3′00°",
};

let testModuleDoubleQuotesSk = {
  ...testModuleDoubleQuotesDeDe,
};

let testModuleDoubleQuotesCs = {
  ...testModuleDoubleQuotesDeDe,
};

let testModuleDoubleQuotesRue = {
  // double quotes
  "English „English„ „English„ English": "English «English» «English» English",
  'He said: "Here’s a 12" record."':  "He said: «Here’s a 12″ record.»",
  '12′ 45"':                            "12′ 45″",
  '3° 5′ 30"':                          "3° 5′ 30″",
  "12\"3'00°":                           "12″3′00°",
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
  "20 ‱ – 30 ‱": "20 ‱–30 ‱",
};

// Test all modules for en-us
let testCaseEnUs = {
  ...testModules,
  ...testModuleCombinations,
  ...testModuleDoubleQuotesEnUs,
  ...testModuleSingleQuotesEnUs,
  ...testModuleAbbreviationsEnUs,
  ...testModuleNbspEnUs,
};

testBothVersions(
  "Tests that all modules are plugged for en-us (default config)",
  { ...testCaseEnUs, ...testRemoveLines, ...testRemoveWhitespacesBeforeMarkdownList },
  "en-us",
  configDefault
);

testBothVersions(
  "Tests that all modules are plugged for en-us (keepLines=true)",
  { ...testCaseEnUs, ...testKeepLines },
  "en-us", 
  configKeepLines
);

testBothVersions(
  "Tests that all modules are plugged for en-us (removeWhitespacesBeforeMarkdownList=false)",
  { ...testCaseEnUs, ...testKeepWhitespacesBeforeMarkdownList },
  "en-us",
  configKeepWhitespacesBeforeMarkdownList
);

// Test all modules for de-de
let testCaseDeDe = {
  ...testModules,
  ...testModuleDoubleQuotesDeDe,
  ...testModuleSingleQuotesDeDe,
  ...testModuleAbbreviationsDeDe,
  ...testModuleNbspDeDe,
};

testBothVersions(
  "Tests that all modules are plugged for de-de (default config)", 
  { ...testCaseDeDe, ...testRemoveLines, ...testRemoveWhitespacesBeforeMarkdownList },
  "de-de",
  configDefault
);

testBothVersions(
  "Tests that all modules are plugged for de-de (keepLines=true)",
  { ...testCaseDeDe, ...testKeepLines },
  "de-de",
  configKeepLines
);

testBothVersions(
  "Tests that all modules are plugged for de-de (removeWhitespacesBeforeMarkdownList=false)",
  { ...testCaseDeDe, ...testKeepWhitespacesBeforeMarkdownList },
  "de-de",
  configKeepWhitespacesBeforeMarkdownList
);

// Test all modules for sk
let testCaseSk = {
  ...testModules,
  ...testModuleDoubleQuotesSk,
  ...testModuleSingleQuotesSk,
  ...testModuleAbbreviationsSk,
  ...testModuleNbspSk,
};

testBothVersions(
  "Tests that all modules are plugged for sk (default config)",
  { ...testCaseSk, ...testRemoveLines, ...testRemoveWhitespacesBeforeMarkdownList },
  "sk",
  configDefault
);

testBothVersions(
  "Tests that all modules are plugged for sk (keepLines=true)",
  { ...testCaseSk, ...testKeepLines },
  "sk",
  configKeepLines
);

testBothVersions(
  "Tests that all modules are plugged for sk (removeWhitespacesBeforeMarkdownList=false)",
  { ...testCaseSk, ...testKeepWhitespacesBeforeMarkdownList },
  "sk",
  configKeepWhitespacesBeforeMarkdownList
);

// Test all modules for cs
let testCaseCs = {
  ...testModules,
  ...testModuleDoubleQuotesCs,
  ...testModuleSingleQuotesCs,
  ...testModuleAbbreviationsCs,
  ...testModuleNbspCs,
};

testBothVersions(
  "Tests that all modules are plugged for cs (default config)",
  { ...testCaseCs, ...testRemoveLines, ...testRemoveWhitespacesBeforeMarkdownList },
  "cs",
  configDefault
);

testBothVersions(
  "Tests that all modules are plugged for cs (keepLines=true)",
  { ...testCaseCs, ...testKeepLines },
  "cs", 
  configKeepLines
);

testBothVersions(
  "Tests that all modules are plugged for cs (removeWhitespacesBeforeMarkdownList=false)",
  { ...testCaseCs, ...testKeepWhitespacesBeforeMarkdownList },
  "cs",
  configKeepWhitespacesBeforeMarkdownList
);

// Test all modules for rue
let testCaseRue = {
  ...testModules,
  ...testModuleDoubleQuotesRue,
  ...testModuleSingleQuotesRue,
  ...testModuleAbbreviationsRue,
  ...testModuleNbspRue,
};

testBothVersions(
  "Tests that all modules are plugged for rue (default config)",
  { ...testCaseRue, ...testRemoveLines, ...testRemoveWhitespacesBeforeMarkdownList },
  "rue",
  configDefault
);

testBothVersions(
  "Tests that all modules are plugged for rue (keepLines=true)",
  { ...testCaseRue, ...testKeepLines },
  "rue",
  configKeepLines
);

testBothVersions(
  "Tests that all modules are plugged for rue (removeWhitespacesBeforeMarkdownList=false)",
  { ...testCaseRue, ...testKeepWhitespacesBeforeMarkdownList },
  "rue",
  configKeepWhitespacesBeforeMarkdownList
);

let testMarkdownCodeBlocks = {
  "```\ncode\n```": "```\ncode\n```",
  "``code``": "``code``",
  "``code code``": "``code code``",
  "``code`` ``code``": "``code`` ``code``",
  "`code`": "`code`",
  "`code code`": "`code code`",
  "`code` `code`": "`code` `code`",
  "e.g. `something`": "e.g. `something`",
};

testBothVersions(
  "Test if markdown ticks are kept (integration test) (en-us)",
  testMarkdownCodeBlocks,
  "en-us",
  configKeepMarkdownCodeBlocks
);
