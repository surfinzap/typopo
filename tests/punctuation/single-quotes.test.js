import {
  identifyContractedAnd,
  identifyContractedBeginnings,
  identifyContractedEnds,
  identifyInWordContractions,
  identifyContractedYears,
  identifySinglePrimes,
  identifyUnpairedLeftSingleQuote,
  identifyUnpairedRightSingleQuote,
  identifySingleQuotePairAroundSingleWord,
  identifySingleQuotePairs,
  replaceSinglePrimeWSingleQuote,
  identifyResidualApostrophes,
  placeLocaleSingleQuotes,
  swapSingleQuotesAndTerminalPunctuation,
  removeExtraSpaceAroundSinglePrime,
  fixSingleQuotesPrimesAndApostrophes,
} from "../../src/modules/punctuation/single-quotes.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { describe, it, expect } from "vitest";
import { createTestSuite } from "../test-utils.js";
import { keepMarkdownCodeBlocksSet } from "./double-quotes.test.js";

const configIgnoreMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: false,
};

const identifyContractedAndModuleSet = {
  "rock 'n' roll":   "rock ’n’ roll",
  "rock'n'roll":     "rock ’n’ roll",
  "rock 'n'roll":    "rock ’n’ roll",
  "rock'n' roll":    "rock ’n’ roll",
  "rock ‚n‘ roll":   "rock ’n’ roll",
  "rock ’nʼ roll":   "rock ’n’ roll",
  "rock ‛n′ roll":   "rock ’n’ roll",
  "rock ‹n› roll":   "rock ’n’ roll",
  "rock ´n` roll":   "rock ’n’ roll",
  "ROCK 'N' ROLL":   "ROCK ’N’ ROLL",
  "dead 'n' buried": "dead ’n’ buried",
  "drill 'n' bass":  "drill ’n’ bass",
  "drum 'n' bass":   "drum ’n’ bass",
  "pick 'n' mix":    "pick ’n’ mix",
  "fish 'n' chips":  "fish ’n’ chips",
  "salt 'n' shake":  "salt ’n’ shake",
  "mac 'n' cheese":  "mac ’n’ cheese",
  "pork 'n' beans":  "pork ’n’ beans",
  "drag 'n' drop":   "drag ’n’ drop",
  "rake 'n' scrape": "rake ’n’ scrape",
  "hook 'n' kill":   "hook ’n’ kill",
};

const identifyContractedAndUnitSet = {
  ...identifyContractedAndModuleSet,
  //false positives
  "Press ‘n’ button": "Press ‘n’ button",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify contracted and (’n’) as apostrophes",
    transformSingleQuoteSet(identifyContractedAndUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedAnd(text), new Locale(localeName)),
    transformSingleQuoteSet(identifyContractedAndModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyContractedBeginningsSet = {
  "Just 'cause we wanna.":              "Just ’cause we wanna.",
  "'Tis the season":                    "’Tis the season",
  "'sblood":                            "’sblood",
  "'mongst":                            "’mongst",
  "'prentice":                          "’prentice",
  "'slight":                            "’slight",
  "'Strewth":                           "’Strewth",
  "'Twixt":                             "’Twixt",
  "'shun":                              "’shun",
  "'slid":                              "’slid",
  "Find 'em!":                          "Find ’em!",
  "'Twas the Night Before Christmas":   "’Twas the Night Before Christmas",
  "'Til The Season Comes 'Round Again": "’Til The Season Comes ’Round Again",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify common contractions at the beginning of the word as apostrophes",
    transformSingleQuoteSet(identifyContractedBeginningsSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedBeginnings(text), new Locale(localeName)),
    {},
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyContractedEndsModuleSet = {
  "nottin'": "nottin’",
  "gettin'": "gettin’",
  "NOTTIN'": "NOTTIN’",
  "GETTIN'": "GETTIN’",
};

const identifyContractedEndsUnitSet = {
  ...identifyContractedEndsModuleSet,
  // false positive, when it’s not a contracted word
  "'something in'": "'something in'",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify common contractions at the end of the word as apostrophes",
    transformSingleQuoteSet(identifyContractedEndsUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedEnds(text), new Locale(localeName)),
    transformSingleQuoteSet(identifyContractedEndsModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyInWordContractionsSet = {
  "69'ers":       "69’ers",
  "iPhone6's":    "iPhone6’s",
  "1990's":       "1990’s",
  "don't":        "don’t",
  "don''t":       "don’t",
  "don''’t":      "don’t",
  "Paul‘s Diner": "Paul’s Diner",
  "Paul’s Diner": "Paul’s Diner",
  "Paulʼs Diner": "Paul’s Diner",
  "Paul‛s Diner": "Paul’s Diner",
  "Paul`s Diner": "Paul’s Diner",
  "Paul‚s Diner": "Paul’s Diner",
  "Paul´s Diner": "Paul’s Diner",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify in-word contractions as apostrophes",
    transformSingleQuoteSet(identifyInWordContractionsSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyInWordContractions(text), new Locale(localeName)),
    {},
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyContractedYearsModuleSet = {
  "INCHEBA '89": "INCHEBA ’89",
  "in '70s":     "in ’70s",
  "Q1 '23":      "Q1 ’23",
};

const identifyContractedYearsUnitSet = {
  ...identifyContractedYearsModuleSet,
  // false positive, when there is a wrongly spaced feet
  "12 '45″": "12 '45″",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify contracted years as apostrophes",
    transformSingleQuoteSet(identifyContractedYearsUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifyContractedYears(text), new Locale(localeName)),
    transformSingleQuoteSet(identifyContractedYearsModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifySinglePrimesModuleSet = {
  "12 ' 45″": "12′ 45″",
  "12 ‘ 45″": "12′ 45″",
  "12 ’ 45″": "12′ 45″",
  "12 ‛ 45″": "12′ 45″",
  "12 ′ 45″": "12′ 45″",
  "12 ‛45″":  "12′45″",
  //this is identified wrongly as 8217, right quotation mark in module tests
  "12 '45″":  "12′45″",
};

const identifySinglePrimesUnitSet = {
  "12' 45″":  "12′ 45″",
  "12‘ 45″":  "12′ 45″",
  "12’ 45″":  "12′ 45″",
  "12‛ 45″":  "12′ 45″",
  "12′ 45″":  "12′ 45″",
  "12 ′ 45″": "12 ′ 45″",
  "12'45″":   "12′45″",
  "12 '45″":  "12 ′45″",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify feet and arcminutes following a 1–3 numbers",
    transformSingleQuoteSet(identifySinglePrimesUnitSet, localeName),
    (text) => placeLocaleSingleQuotes(identifySinglePrimes(text), new Locale(localeName)),
    transformSingleQuoteSet(identifySinglePrimesModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

const identifyUnpairedLeftSingleQuoteModuleSet = {
  // heads up! since it’s a unpaired quote it’s fixed as apostrophe within a module
  "${ldq}‘word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}–‘word${rdq}": "${ldq}–’word${rdq}",
  "${ldq}—‘word${rdq}": "${ldq}—’word${rdq}",
  "${ldq}ʼword${rdq}":  "${ldq}’word${rdq}",
  "${ldq}‛word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}´word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}`word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}′word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}‹word${rdq}":  "${ldq}’word${rdq}",
  "${ldq}›word${rdq}":  "${ldq}’word${rdq}",
};

const identifyUnpairedLeftSingleQuoteUnitSet = {
  '" \'word"': '" {{typopo__lsq--unpaired}}word"',
  '" ‚word"':  '" {{typopo__lsq--unpaired}}word"',
  " ‘word":    " {{typopo__lsq--unpaired}}word",
  "–‘word":    "–{{typopo__lsq--unpaired}}word",
  "—‘word":    "—{{typopo__lsq--unpaired}}word",
  " ʼword":    " {{typopo__lsq--unpaired}}word",
  " ‛word":    " {{typopo__lsq--unpaired}}word",
  " ´word":    " {{typopo__lsq--unpaired}}word",
  " `word":    " {{typopo__lsq--unpaired}}word",
  " ′word":    " {{typopo__lsq--unpaired}}word",
  " ‹word":    " {{typopo__lsq--unpaired}}word",
  " ›word":    " {{typopo__lsq--unpaired}}word",
};

supportedLocales.forEach((localeName) => {
  createTestSuite(
    "Identify unpaired left single quote",
    transformSingleQuoteSet(identifyUnpairedLeftSingleQuoteUnitSet, localeName),
    (text) => identifyUnpairedLeftSingleQuote(text),
    transformSingleQuoteSet(identifyUnpairedLeftSingleQuoteModuleSet, localeName),
    (text) => fixSingleQuotesPrimesAndApostrophes(text, new Locale(localeName)),
    localeName
  );
});

describe("Identify unpaired right single quote (en-us):", () => {
  const unitTestCase = {
    '"word\'"': '"word{{typopo__rsq--unpaired}}"',

    '"word‚"': '"word{{typopo__rsq--unpaired}}"',

    "word‘": "word{{typopo__rsq--unpaired}}",

    wordʼ: "word{{typopo__rsq--unpaired}}",

    "word‛": "word{{typopo__rsq--unpaired}}",

    "word´": "word{{typopo__rsq--unpaired}}",

    "word`": "word{{typopo__rsq--unpaired}}",

    "word′": "word{{typopo__rsq--unpaired}}",

    "word‹": "word{{typopo__rsq--unpaired}}",

    "word›": "word{{typopo__rsq--unpaired}}",

    "word.'": "word.{{typopo__rsq--unpaired}}",

    "word!'": "word!{{typopo__rsq--unpaired}}",

    "word':": "word{{typopo__rsq--unpaired}}:",

    "word',": "word{{typopo__rsq--unpaired}},",

    "word' ": "word{{typopo__rsq--unpaired}} ",
  };

  const moduleTestCase = {
    // heads up! since it’s a unpaired quote it’s fixed as apostrophe within a module

    "“word'”": "“word’”",

    "“word‚”": "“word’”",

    "“word‘”": "“word’”",

    "“wordʼ”": "“word’”",

    "“word‛”": "“word’”",

    "“word´”": "“word’”",

    "“word`”": "“word’”",

    "“word′”": "“word’”",

    "“word‹”": "“word’”",

    "“word›”": "“word’”",

    "“word.'”": "“word.’”",

    "“word!'”": "“word!’”",

    "“word':”": "“word’:”",

    "“word',”": "“word’,”",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(identifyUnpairedRightSingleQuote(key)).toBe(unitTestCase[key]);
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      expect(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        )
      ).toBe(moduleTestCase[key]);
    });
  });
});

describe("Identify single quote pairs (en-us):", () => {
  const unitTestCase = {
    "{{typopo__lsq--unpaired}}word{{typopo__rsq--unpaired}}": "{{typopo__lsq}}word{{typopo__rsq}}",

    "{{typopo__lsq--unpaired}}word word{{typopo__rsq--unpaired}}":
      "{{typopo__lsq}}word word{{typopo__rsq}}",
  };

  const moduleTestCase = {
    "He said: “What about 'word', is that good?”": "He said: “What about ‘word’, is that good?”",

    "He said: “What about 'word' 'word', is that good?”":
      "He said: “What about ‘word’ ‘word’, is that good?”",

    "He said: “What about 'word word', is that good?”":
      "He said: “What about ‘word word’, is that good?”",

    // this case is not covered, the value is false
    // the first right single quote is falsely an apostrophe
    // the second left single quote is falsely an apostrophe
    "He said: “What about 'word word' 'word word', is that good?”":
      "He said: “What about ‘word word’ ’word word’, is that good?”",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(identifySingleQuotePairs(key)).toBe(unitTestCase[key]);
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      expect(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        )
      ).toBe(moduleTestCase[key]);
    });
  });
});

describe("Identify single quote pairs around single word (en-us):", () => {
  const moduleTestCase = {
    "'word'": "‘word’",

    "'word' 'word'": "‘word’ ‘word’",

    "He said: “What about 'word', is that good?”": "He said: “What about ‘word’, is that good?”",

    "Press 'N' to get started": "Press ‘N’ to get started",
  };

  const unitTestCase = {
    ...moduleTestCase,

    // false positives
    "... don't'": "... don't'",

    "'don't ...": "'don't ...",

    // false positive
    // this function does fix multiple words within single quotes
    // limitation: contractions at the end of the word, e.g. jes'
    "'word word'": "'word word'",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(
        placeLocaleSingleQuotes(identifySingleQuotePairAroundSingleWord(key), new Locale("en-us"))
      ).toBe(unitTestCase[key]);
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      expect(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        )
      ).toBe(moduleTestCase[key]);
    });
  });
});

describe("Replace a single qoute & a single prime with a single quote pair (en-us):", () => {
  const unitTestCase = {
    "{{typopo__lsq--unpaired}}word{{typopo__single-prime}}": "{{typopo__lsq}}word{{typopo__rsq}}",

    "{{typopo__single-prime}}word{{typopo__rsq--unpaired}}": "{{typopo__lsq}}word{{typopo__rsq}}",
  };

  const moduleTestCase = {
    "He said: “What about 'Localhost 3000', is that good?”":
      "He said: “What about ‘Localhost 3000’, is that good?”",

    "He said: “Here are 30 'bucks'”": "He said: “Here are 30 ‘bucks’”",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceSinglePrimeWSingleQuote(key)).toBe(unitTestCase[key]);
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      expect(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        )
      ).toBe(moduleTestCase[key]);
    });
  });
});

describe("Identify residual apostrophes  (en-us):", () => {
  const testCase = {
    "Hers'": "Hers’",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(placeLocaleSingleQuotes(identifyResidualApostrophes(key), new Locale("en-us"))).toBe(
        testCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      expect(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        )
      ).toBe(testCase[key]);
    });
  });
});

describe("Remove extra space around a single prime:", () => {
  const testCase = {
    "12 ′ 45″": "12′ 45″",

    "12 ′45″": "12′45″",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(removeExtraSpaceAroundSinglePrime(key)).toBe(testCase[key]);
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      expect(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        )
      ).toBe(testCase[key]);
    });
  });
});

describe("Swap single quotes and terminal punctuation for a quoted part (en-us):", () => {
  const testCase = {
    // quoted part at the
    // end of a sentence
    // end of a paragraph
    "Sometimes it can be only a ‘quoted part.’": "Sometimes it can be only a ‘quoted part’.",

    "Sometimes it can be only a ‘quoted’ ‘part.’": "Sometimes it can be only a ‘quoted’ ‘part’.",

    "Is it ‘Amores Perros’?": "Is it ‘Amores Perros’?",

    "Look for ‘Anguanga’.": "Look for ‘Anguanga’.",

    "‘A whole sentence.’ Only a ‘quoted part.’": "‘A whole sentence.’ Only a ‘quoted part’.",

    // quoted part at the
    // end of a sentence
    // middle of a paragraph
    "a ‘quoted part.’ A ‘quoted part.’": "a ‘quoted part’. A ‘quoted part’.",

    "Only a ‘quoted part.’ ‘A whole sentence.’": "Only a ‘quoted part’. ‘A whole sentence.’",

    // quoted part in the middle of a sentence
    // toto tu je asi zbytocny test
    "Only a ‘quoted part’ in a sentence. ‘A whole sentence.’":
      "Only a ‘quoted part’ in a sentence. ‘A whole sentence.’",

    // place punctuation within a quoted sentence that’s in the middle of the sentence.
    "Ask ‘What’s going on in here’? so you can dig deeper.":
      "Ask ‘What’s going on in here?’ so you can dig deeper.",

    "Before you ask the ‘How often…’ question": "Before you ask the ‘How often…’ question",

    "‘…example’": "‘…example’",

    "abc ‘…example’": "abc ‘…example’",

    // place punctuation within a quoted sentence
    "He was ok. ‘He was ok’.": "He was ok. ‘He was ok.’",

    "He was ok. ‘He was ok’. He was ok.": "He was ok. ‘He was ok.’ He was ok.",

    "He was ok? ‘He was ok’.": "He was ok? ‘He was ok.’",

    // swap a right quote and terminal punctuation for the whole sentence
    "‘He was ok’.": "‘He was ok.’",

    "‘He was ok’?": "‘He was ok?’",

    "‘He was ok’. He was ok.": "‘He was ok.’ He was ok.",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(swapSingleQuotesAndTerminalPunctuation(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    // This would need to support unpaired single quotes. There is a conflict how apostrophes are identified earlier
    // also it would need a different handling of Rusyn constractions
    // it("module test", () => {
    //   expect(
    //     fixSingleQuotesPrimesAndApostrophes(
    //       key,
    //       new Locale("en-us"),
    //       configIgnoreMarkdownCodeBlocks
    //     )
    //   ).toBe(testCase[key]);
    // });
  });
});

createTestSuite(
  "Test if markdown ticks are kept (single quotes) ",
  {},
  undefined,
  keepMarkdownCodeBlocksSet,
  (text, locale) =>
    fixSingleQuotesPrimesAndApostrophes(text, locale, {
      keepMarkdownCodeBlocks: true,
    }),
  supportedLocales
);

export const singleQuotesSet = {
  ...identifyContractedAndModuleSet,
  ...identifyContractedBeginningsSet,
  ...identifyContractedEndsModuleSet,
  ...identifyInWordContractionsSet,
  ...identifyContractedYearsModuleSet,
  ...identifySinglePrimesModuleSet,
  ...identifyUnpairedLeftSingleQuoteModuleSet,

  "Let's test this: ${ldq}however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said${rdq}":
    "Let’s test this: ${ldq}however, ${lsq}quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,${rsq} he said${rdq}",

  "Within double quotes ${ldq}there are single 'quotes with mix’d punctuation', you see${rdq}.":
    "Within double quotes ${ldq}there are single ${lsq}quotes with mix’d punctuation${rsq}, you see${rdq}.",

  "Hej: ${ldq}Vin mu povil, 'ta de jes' take vidil' i neviril${rdq}":
    "Hej: ${ldq}Vin mu povil, ${lsq}ta de jes’ take vidil${rsq} i neviril${rdq}",

  "${ldq}double quotes 'and single quotes' within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "${ldq}double quotes 'and single quotes’ within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "${ldq}double quotes ‚and single quotes' within${rdq}":
    "${ldq}double quotes ${lsq}and single quotes${rsq} within${rdq}",

  "He said: ${ldq}What about 'name' and 'other name'?${rdq}":
    "He said: ${ldq}What about ${lsq}name${rsq} and ${lsq}other name${rsq}?${rdq}",

  "Press 'N' to get started": "Press ${lsq}N${rsq} to get started",

  "12 ′45″": "12′45″",

  "Q1 '23": "Q1 ’23",

  "I''''m": "I’m",
};

export function transformSingleQuoteSet(testSet, localeName) {
  const locale = new Locale(localeName);
  const replaceTokens = (str) =>
    str
      .replace(/\$\{ldq\}/g, locale.leftDoubleQuote)
      .replace(/\$\{rdq\}/g, locale.rightDoubleQuote)
      .replace(/\$\{lsq\}/g, locale.leftSingleQuote)
      .replace(/\$\{rsq\}/g, locale.rightSingleQuote);
  // .replace(/\$\{apos\}/g, base.apostrophe);

  const transformed = {};

  Object.keys(testSet).forEach((key) => {
    transformed[replaceTokens(key)] = replaceTokens(testSet[key]);
  });

  return transformed;
}

describe("Single quotes (module test) ", () => {
  supportedLocales.forEach((localeName) => {
    const testCase = transformSingleQuoteSet(singleQuotesSet, localeName);

    Object.keys(testCase).forEach((key) => {
      it(`module test, locale: (${localeName})`, () => {
        expect(
          fixSingleQuotesPrimesAndApostrophes(
            key,
            new Locale(localeName),
            configIgnoreMarkdownCodeBlocks
          )
        ).toBe(testCase[key]);
      });
    });
  });
});
