import {
  removeExtraPunctuationBeforeQuotes,
  removeExtraPunctuationAfterQuotes,
  swapQuotesAndTerminalPunctuation,
  identifyDoublePrimes,
  identifyDoubleQuotePairs,
  identifyStandaloneLeftDoubleQuote,
  identifyStandaloneRightDoubleQuote,
  removeUnidentifiedDoubleQuote,
  replaceDoublePrimeWDoubleQuote,
  placeLocaleDoubleQuotes,
  removeExtraCommaAfterSentencePunctuation,
  removeExtraSpacesAroundQuotes,
  addSpaceBeforeLeftDoubleQuote,
  addSpaceAfterRightDoubleQuote,
  fixDoubleQuotesAndPrimes,
} from "../../src/modules/punctuation/double-quotes.js";
import { describe, it, expect } from "vitest";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { base } from "../../src/const.js";
import { createTestSuite } from "../test-utils.js";

const doubleQuotesFalsePositives = {
  "č., s., fol., str.,":       "č., s., fol., str.,",
  "Byl to “Karel IV.”, ktery": "Byl to “Karel IV.”, ktery",
  "Hey.”":                     "Hey.”",
  "common to have “namespace pollution”, where completely unrelated code shares global variables.":
    "common to have “namespace pollution”, where completely unrelated code shares global variables.",
};

const removePunctuationBeforeQuotesSet = {
  /* extra comma after terminal punctuation, 
     as it it happens in direct speech */
  "${ldq}Hey!,${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?,${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.,${rdq} she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:,${rdq} she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;,${rdq} she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,,${rdq} she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!:${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?:${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.:${rdq} she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey::${rdq} she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;:${rdq} she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,:${rdq} she said": "${ldq}Hey,${rdq} she said",

  "${ldq}Hey!;${rdq} she said": "${ldq}Hey!${rdq} she said",
  "${ldq}Hey?;${rdq} she said": "${ldq}Hey?${rdq} she said",
  "${ldq}Hey.;${rdq} she said": "${ldq}Hey.${rdq} she said",
  "${ldq}Hey:;${rdq} she said": "${ldq}Hey:${rdq} she said",
  "${ldq}Hey;;${rdq} she said": "${ldq}Hey;${rdq} she said",
  "${ldq}Hey,;${rdq} she said": "${ldq}Hey,${rdq} she said",

  //false positive
  "${ldq}Hey!!${rdq} she said": "${ldq}Hey!!${rdq} she said",
  "${ldq}Hey?!${rdq} she said": "${ldq}Hey?!${rdq} she said",
  "${ldq}Hey.!${rdq} she said": "${ldq}Hey.!${rdq} she said",
  "${ldq}Hey:!${rdq} she said": "${ldq}Hey:!${rdq} she said",
  "${ldq}Hey;!${rdq} she said": "${ldq}Hey;!${rdq} she said",
  "${ldq}Hey,!${rdq} she said": "${ldq}Hey,!${rdq} she said",

  "${ldq}Hey!?${rdq} she said": "${ldq}Hey!?${rdq} she said",
  "${ldq}Hey??${rdq} she said": "${ldq}Hey??${rdq} she said",
  "${ldq}Hey.?${rdq} she said": "${ldq}Hey.?${rdq} she said",
  "${ldq}Hey:?${rdq} she said": "${ldq}Hey:?${rdq} she said",
  "${ldq}Hey;?${rdq} she said": "${ldq}Hey;?${rdq} she said",
  "${ldq}Hey,?${rdq} she said": "${ldq}Hey,?${rdq} she said",

  "${ldq}Hey!.${rdq} she said": "${ldq}Hey!.${rdq} she said",
  "${ldq}Hey?.${rdq} she said": "${ldq}Hey?.${rdq} she said",
  "${ldq}Hey:.${rdq} she said": "${ldq}Hey:.${rdq} she said",
  "${ldq}Hey;.${rdq} she said": "${ldq}Hey;.${rdq} she said",
  "${ldq}Hey,.${rdq} she said": "${ldq}Hey,.${rdq} she said",
};

// finished here, this seems like a duplicate function:
// removeExtraCommaAfterSentencePunctuation

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Remove punctuation before double quotes",
    transformDoubleQuoteSet(removePunctuationBeforeQuotesSet, localeName),
    removeExtraPunctuationBeforeQuotes,
    {},
    (text) => fixDoubleQuotesAndPrimes(text, new Locale(localeName)),
    localeName
  );
});

describe("Remove punctuation after double quotes (en-us):", () => {
  let testCase = {
    /* dot at the end of a direct speech ending with abbreviation */
    "“We will continue this tomorrow at 8:00 a.m.”.":
      "“We will continue this tomorrow at 8:00 a.m.”",
    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(removeExtraPunctuationAfterQuotes(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Identify inches, arcseconds, seconds following a 1–3 numbers (en-us):", () => {
  let testCase = {
    '12′ 45"':  "12′ 45″",
    "12′ 45“":  "12′ 45″",
    "12′ 45”":  "12′ 45″",
    "12′ 45″":  "12′ 45″",
    "12′ 45‘‘": "12′ 45″",
    "12′ 45’’": "12′ 45″",
    "12′ 45''": "12′ 45″",
    "12′ 45′′": "12′ 45″",
    "12''":     "12″",

    '3° 5′ 30"': "3° 5′ 30″",
    '12"3′00°':  "12″3′00°",

    'So it’s 12" × 12", right?': "So it’s 12″ × 12″, right?",

    'She said: “It’s a 12" inch!”': "She said: “It’s a 12″ inch!”",

    'It’s 12" × 12".': "It’s 12″ × 12″.",

    // identify swapped inches with terminal punctuation
    '"He was 12".': "“He was 12.”",

    'He was 12".': "He was 12″.",

    ...doubleQuotesFalsePositives,
  };

  let unitTestCase = {
    '12′ 45 "':  "12′ 45 ″",
    "12′ 45 “":  "12′ 45 ″",
    "12′ 45 ”":  "12′ 45 ″",
    "12′ 45 ″":  "12′ 45 ″",
    "12′ 45 ‘‘": "12′ 45 ″",
    "12′ 45 ’’": "12′ 45 ″",
    "12′ 45 ''": "12′ 45 ″",
    "12′ 45 ′′": "12′ 45 ″",
    "12 ''":     "12 ″",

    // false positive to exclude long numbers (temporary)
    '“Conference 2020" and “something in quotes”.': '“Conference 2020" and “something in quotes”.',

    // identify swapped inches with terminal punctuation
    '"He was 12".': '"He was 12."',

    // false positive
    'He was 12".': "He was 12″.",

    '"He was 12."': '"He was 12."',

    'It’s 12" x 12".': "It’s 12″ x 12″.",

    'It’s 12" × 12".': "It’s 12″ × 12″.",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(placeLocaleDoubleQuotes(identifyDoublePrimes(key), new Locale("en-us"))).toBe(
        unitTestCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Identify double quote pairs (en-us):", () => {
  let testCase = {
    '"quoted material"': "“quoted material”",

    '„quoted material"': "“quoted material”",

    "«quoted material«": "“quoted material”",

    "’’quoted material''": "“quoted material”",

    "‹‹quoted material››": "“quoted material”",

    ",,quoted material,,": "“quoted material”",

    "‘‘quoted material‘‘": "“quoted material”",

    "‘‘‘quoted material‘‘‘": "“quoted material”",

    "´´quoted material´´": "“quoted material”",

    "``quoted material``": "“quoted material”",

    'unquoted "quoted material" material': "unquoted “quoted material” material",

    '"quoted material" and "quoted material"': "“quoted material” and “quoted material”",

    // primes × double quotes
    '"Conference 2020" and "something in quotes".': "“Conference 2020” and “something in quotes”.",

    '"Gone in 60{{typopo__double-prime}}"': "“Gone in 60″”",

    '"2020"': "“2020”",

    '"202"': "“202”",

    // false positive
    '"starting quotes, primes 90{{typopo__double-prime}}, ending quotes"':
      "“starting quotes, primes 90″, ending quotes”",

    //jibberish inside quotes
    ",,idjsa ;frilj ;'f0d, if9,,": "“idjsa ;frilj ;'f0d, if9”",

    ...doubleQuotesFalsePositives,
  };

  let unitTestCase = {
    '" quoted material "': "“ quoted material ”",

    '"quoted material "': "“quoted material ”",

    '" quoted material"': "“ quoted material”",

    ...testCase,
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(placeLocaleDoubleQuotes(identifyDoubleQuotePairs(key), new Locale("en-us"))).toBe(
        unitTestCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Identify standalone left double quote (en-us):", () => {
  let testCase = {
    '"There is a standalone left quote.': "“There is a standalone left quote.",

    'There is a "standalone left quote.': "There is a “standalone left quote.",

    "There is a «standalone left quote.": "There is a “standalone left quote.",

    "There is a „standalone left quote.": "There is a “standalone left quote.",

    "There is a ,,standalone left quote.": "There is a “standalone left quote.",

    "There is a ‹‹standalone left quote.": "There is a “standalone left quote.",

    "There is a ‘‘standalone left quote.": "There is a “standalone left quote.",

    "There is ‘‘1 standalone left quote.": "There is “1 standalone left quote.",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(
        placeLocaleDoubleQuotes(identifyStandaloneLeftDoubleQuote(key), new Locale("en-us"))
      ).toBe(testCase[key]);
    });

    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Identify standalone right double quote (en-us):", () => {
  let testCase = {
    'There is a standalone" right quote.': "There is a standalone” right quote.",

    "There is a standalone« right quote.": "There is a standalone” right quote.",

    "There is a standalone„ right quote.": "There is a standalone” right quote.",

    "There is a standalone,, right quote.": "There is a standalone” right quote.",

    "There is a standalone›› right quote.": "There is a standalone” right quote.",

    "There is a standalone‘‘ right quote.": "There is a standalone” right quote.",

    'There is a STANDALONE" right quote.': "There is a STANDALONE” right quote.",

    'There is a standalone right quote."': "There is a standalone right quote.”",

    'There is a standalone right quote…"': "There is a standalone right quote…”",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(
        placeLocaleDoubleQuotes(identifyStandaloneRightDoubleQuote(key), new Locale("en-us"))
      ).toBe(testCase[key]);
    });

    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Remove unidentified double quotes (en-us):", () => {
  let testCase = {
    'word " word': "word word",

    "word « word": "word word",

    "word „ word": "word word",

    "word ,, word": "word word",

    "word ›› word": "word word",

    "word ‘‘ word": "word word",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(placeLocaleDoubleQuotes(removeUnidentifiedDoubleQuote(key), new Locale("en-us"))).toBe(
        testCase[key]
      );
    });

    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Replace a double qoute & a double prime with a double quote pair (en-us):", () => {
  let unitTestCase = {
    "{{typopo__left-double-quote--standalone}}word{{typopo__double-prime}}":
      "{{typopo__left-double-quote}}word{{typopo__right-double-quote}}",

    "{{typopo__double-prime}}word{{typopo__right-double-quote--standalone}}":
      "{{typopo__left-double-quote}}word{{typopo__right-double-quote}}",

    ...doubleQuotesFalsePositives,
  };

  let moduleTestCase = {
    'It’s called "Localhost 3000" and it’s pretty fast.':
      "It’s called “Localhost 3000” and it’s pretty fast.",

    'Here are 30 "bucks"': "Here are 30 “bucks”",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceDoublePrimeWDoubleQuote(key, new Locale("en-us"))).toBe(unitTestCase[key]);
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(moduleTestCase[key]);
    });
  });
});

describe("Swap quotes and terminal punctuation for a quoted part (en-us):", () => {
  let testCase = {
    // quoted part at the
    // end of a sentence
    // end of a paragraph
    "Sometimes it can be only a “quoted part.”": "Sometimes it can be only a “quoted part”.",

    "Sometimes it can be only a “quoted” “part.”": "Sometimes it can be only a “quoted” “part”.",

    "Is it “Amores Perros”?": "Is it “Amores Perros”?",

    "Look for “Anguanga”.": "Look for “Anguanga”.",

    "“A whole sentence.” Only a “quoted part.”": "“A whole sentence.” Only a “quoted part”.",

    // quoted part at the
    // end of a sentence
    // middle of a paragraph
    "a “quoted part.” A “quoted part.”": "a “quoted part”. A “quoted part”.",

    "Only a “quoted part.” “A whole sentence.”": "Only a “quoted part”. “A whole sentence.”",

    // quoted part in the middle of a sentence
    // toto tu je asi zbytocny test
    "Only a “quoted part” in a sentence. “A whole sentence.”":
      "Only a “quoted part” in a sentence. “A whole sentence.”",

    // place punctuation within a quoted sentence that’s in the middle of the sentence.
    "Ask “What’s going on in here”? so you can dig deeper.":
      "Ask “What’s going on in here?” so you can dig deeper.",

    "Ask “Question”? and “Question”? and done.": "Ask “Question?” and “Question?” and done.",

    "Ask “Question”? and done.\nAsk “Question”? and done.":
      "Ask “Question?” and done.\nAsk “Question?” and done.",

    "Before you ask the “How often…” question": "Before you ask the “How often…” question",

    "Before you ask the “How often”… question": "Before you ask the “How often…” question",

    "“…example”": "“…example”",

    "abc “…example”": "abc “…example”",

    // Bracket before the ellipsis, false positive
    "Ask “what if (the thing)…”": "Ask “what if (the thing)…”",

    // place punctuation within a quoted sentence
    "He was ok. “He was ok”.": "He was ok. “He was ok.”",

    "He was ok. “He was ok”. He was ok.": "He was ok. “He was ok.” He was ok.",

    "He was ok? “He was ok”.": "He was ok? “He was ok.”",

    // swap a right quote and terminal punctuation for the whole sentence
    "“He was ok”.": "“He was ok.”",

    "“He was ok”.\n“He was ok”.": "“He was ok.”\n“He was ok.”",

    "“He was ok”. “He was ok”.": "“He was ok.” “He was ok.”",

    "“He was ok”. “He was ok”. “He was ok”.": "“He was ok.” “He was ok.” “He was ok.”",

    "“He was ok”. “He was ok”. “He was ok”. “He was ok”.":
      "“He was ok.” “He was ok.” “He was ok.” “He was ok.”",

    "“He was ok”?": "“He was ok?”",

    "“He was ok”. He was ok.": "“He was ok.” He was ok.",

    // ellipsis
    "“Types of”…": "“Types of…”",

    "“Types of”…\n“Types of”…": "“Types of…”\n“Types of…”",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(swapQuotesAndTerminalPunctuation(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

/* this is extra? */
describe("Remove extra comma after sentence punctuation in direct speech (en-us):", () => {
  let testCase = {
    "“Hey!,” she said": "“Hey!” she said",

    "“Hey?,” she said": "“Hey?” she said",

    "“Hey.,” she said": "“Hey.” she said",

    "“Hey,,” she said": "“Hey,” she said",

    "“Hey:,” she said": "“Hey:” she said",

    "“Hey;,” she said": "“Hey;” she said",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(removeExtraCommaAfterSentencePunctuation(key, new Locale("en-us"))).toBe(
        testCase[key]
      );
    });
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Remove extra spaces around quotes and primes (en-us):", () => {
  let testCase = {
    "“ Ups, an extra space at the beginning”": "“Ups, an extra space at the beginning”",

    "“Ups, an extra space at the end ”": "“Ups, an extra space at the end”",

    "“Sentence and… ”": "“Sentence and…”",

    "12′ 45 ″": "12′ 45″",

    "3° 5′ 30 ″": "3° 5′ 30″",

    "3° 5′ 30 ″ and": "3° 5′ 30″ and",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(removeExtraSpacesAroundQuotes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add a missing space before a left double quote (en-us):", () => {
  let testCase = {
    "It’s a very “nice” saying.": "It’s a very “nice” saying.",

    "It’s a“nice” saying.": "It’s a “nice” saying.", //add nbsp;

    "An unquoted sentence.“And a quoted one.”": "An unquoted sentence. “And a quoted one.”",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addSpaceBeforeLeftDoubleQuote(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add a missing space after a left double quote (en-us):", () => {
  let testCase = {
    "It’s a “nice”saying.": "It’s a “nice” saying.",

    "“A quoted sentence.”And an unquoted one.": "“A quoted sentence.” And an unquoted one.",

    "“A quoted sentence!”And an unquoted one.": "“A quoted sentence!” And an unquoted one.",

    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addSpaceAfterRightDoubleQuote(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Double quotes in default language (en-us)", () => {
  let testCase = {
    ...transformDoubleQuoteSet(doubleQuotesSet, "en-us"),
    ...doubleQuotesFalsePositives,
  };

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Double quotes in Slovak, Czech and German language (sk, cs, de-de)", () => {
  let testCase = {
    ...transformDoubleQuoteSet(doubleQuotesSet, "sk"),
  };

  Object.keys(testCase).forEach((key) => {
    it("module test (sk)", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("sk"))).toBe(testCase[key]);
    });

    it("module test (cs)", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("cs"))).toBe(testCase[key]);
    });

    it("module test (de-de)", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("de-de"))).toBe(testCase[key]);
    });
  });
});

describe("Double quotes in Rusyn language (rue)", () => {
  let testCase = {
    ...transformDoubleQuoteSet(doubleQuotesSet, "rue"),
  };

  Object.keys(testCase).forEach((key) => {
    it("module test (rue)", () => {
      expect(fixDoubleQuotesAndPrimes(key, new Locale("rue"))).toBe(testCase[key]);
    });
  });
});

export const keepMarkdownCodeBlocksSet = {
  "```\ncode\n```":    "```\ncode\n```",
  "``code``":          "``code``",
  "``code code``":     "``code code``",
  "``code`` ``code``": "``code`` ``code``",
  "`code`":            "`code`",
  "`code code`":       "`code code`",
  "`code` `code`":     "`code` `code`",
};

createTestSuite(
  "Test if markdown ticks are kept (double quotes) ",
  {},
  undefined,
  keepMarkdownCodeBlocksSet,
  (text, locale) =>
    fixDoubleQuotesAndPrimes(text, locale, {
      keepMarkdownCodeBlocks: true,
    }),
  supportedLocales
);

export const doubleQuotesSet = {
  ...removePunctuationBeforeQuotesSet,

  'He said: "Here${apos}s a 12" record."': "He said: ${ldq}Here${apos}s a 12″ record.${rdq}",
  'He said: "He was 12."':                 "He said: ${ldq}He was 12.${rdq}",
  'He said: "He was 12". And then he added: "Maybe he was 13".':
    "He said: ${ldq}He was 12.${rdq} And then he added: ${ldq}Maybe he was 13.${rdq}",
  'So it${apos}s 12" × 12", right?':              "So it${apos}s 12″ × 12″, right?",
  "An unquoted sentence.“And a quoted one.”":     "An unquoted sentence. ${ldq}And a quoted one.${rdq}",
  '"quoted material" and "extra':                 "${ldq}quoted material${rdq} and ${ldq}extra",
  "It was like “namespace pollution”.":           "It was like ${ldq}namespace pollution${rdq}.",
  "English „English„ „English„ English":          "English ${ldq}English${rdq} ${ldq}English${rdq} English",
  "“English double quotation marks“":             "${ldq}English double quotation marks${rdq}",
  "”English double quotation marks”":             "${ldq}English double quotation marks${rdq}",
  '"English double quotation marks"':             "${ldq}English double quotation marks${rdq}",
  '"Conference 2020" and "something in quotes".': "${ldq}Conference 2020${rdq} and ${ldq}something in quotes${rdq}.",
  'Here are 30 "bucks"':                          "Here are 30 ${ldq}bucks${rdq}",

  "Within double quotes “there are single ‘quotes with mixed punctuation’, you see.”":
    "Within double quotes ${ldq}there are single ‘quotes with mixed punctuation’, you see${rdq}.",
  "Before you ask the “How often…” question": "Before you ask the ${ldq}How often…${rdq} question",

  "He was like “Georgia”.":             "He was like ${ldq}Georgia${rdq}.",
  "He was ok. “He was ok”.":            "He was ok. ${ldq}He was ok.${rdq}",
  '"…"':                                "${ldq}…${rdq}",
  '"Ctrl+I and…"':                      "${ldq}Ctrl+I and…${rdq}",
  'Hela skríkla: "Tu je 12" platňa "!': "Hela skríkla: ${ldq}Tu je 12″ platňa!${rdq}",
  "He was ok. “He was ok ”.":           "He was ok. ${ldq}He was ok.${rdq}",
  "“…example”":                         "${ldq}…example${rdq}",
  "abc “…example”":                     "abc ${ldq}…example${rdq}",
};

export function transformDoubleQuoteSet(testSet, localeName) {
  const locale = new Locale(localeName);

  const transformed = {};
  // const testSet = { ...doubleQuotesSet, ...doubleQuotesFalsePositives };

  Object.keys(testSet).forEach((key) => {
    const transformedKey = key
      .replace(/\$\{ldq\}/g, locale.leftDoubleQuote)
      .replace(/\$\{rdq\}/g, locale.rightDoubleQuote)
      .replace(/‘/g, locale.leftSingleQuote)
      .replace(/’/g, locale.rightSingleQuote)
      .replace(/\$\{apos\}/g, base.apostrophe);
    const transformedValue = testSet[key]
      .replace(/\$\{ldq\}/g, locale.leftDoubleQuote)
      .replace(/\$\{rdq\}/g, locale.rightDoubleQuote)
      .replace(/‘/g, locale.leftSingleQuote)
      .replace(/’/g, locale.rightSingleQuote)
      .replace(/\$\{apos\}/g, base.apostrophe);
    transformed[transformedKey] = transformedValue;
  });

  return transformed;
}
