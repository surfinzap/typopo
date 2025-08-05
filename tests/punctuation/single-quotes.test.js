import {
  identifyContractedAnd,
  identifyContractedBeginnings,
  identifyContractedEnds,
  identifyInWordContractions,
  identifyContractedYears,
  identifySinglePrimes,
  identifyStandaloneLeftSingleQuote,
  identifyStandaloneRightSingleQuote,
  identifySingleQuotePairAroundSingleWord,
  identifySingleQuotePairs,
  replaceSinglePrimeWSingleQuote,
  identifyResidualApostrophes,
  placeLocaleSingleQuotes,
  swapSingleQuotesAndTerminalPunctuation,
  removeExtraSpaceAroundSinglePrime,
  fixSingleQuotesPrimesAndApostrophes,
} from "../../src/modules/punctuation/single-quotes";
import Locale from "../../src/locale/locale";

import assert from "assert";

let configIgnoreMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: false,
};

let configKeepMarkdownCodeBlocks = {
  keepMarkdownCodeBlocks: true,
};

describe("Identify contracted and (’n’) as apostrophes (en-us):\n", () => {
  let moduleTestCase = {
    "rock 'n' roll": "rock ’n’ roll",

    "rock'n'roll": "rock ’n’ roll",

    "rock 'n'roll": "rock ’n’ roll",

    "rock'n' roll": "rock ’n’ roll",

    "rock ‚n‘ roll": "rock ’n’ roll",

    "rock ’nʼ roll": "rock ’n’ roll",

    "rock ‛n′ roll": "rock ’n’ roll",

    "rock ‹n› roll": "rock ’n’ roll",

    "rock ´n` roll": "rock ’n’ roll",

    "ROCK 'N' ROLL": "ROCK ’N’ ROLL",

    "dead 'n' buried": "dead ’n’ buried",

    "drill 'n' bass": "drill ’n’ bass",

    "drum 'n' bass": "drum ’n’ bass",

    "pick 'n' mix": "pick ’n’ mix",

    "fish 'n' chips": "fish ’n’ chips",

    "salt 'n' shake": "salt ’n’ shake",

    "mac 'n' cheese": "mac ’n’ cheese",

    "pork 'n' beans": "pork ’n’ beans",

    "drag 'n' drop": "drag ’n’ drop",

    "rake 'n' scrape": "rake ’n’ scrape",

    "hook 'n' kill": "hook ’n’ kill",
  };

  let unitTestCase = {
    ...moduleTestCase,

    //false positives
    "Press ‘n’ button": "Press ‘n’ button",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifyContractedAnd(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        unitTestCase[key]
      );
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Identify common contractions at the beginning of the word as apostrophes (en-us):\n", () => {
  let testCase = {
    "Just 'cause I wanna.": "Just ’cause I wanna.",

    "'Tis the season": "’Tis the season",

    "'sblood": "’sblood",

    "'mongst": "’mongst",

    "'prentice": "’prentice",

    "'slight": "’slight",

    "'Strewth": "’Strewth",

    "'Twixt": "’Twixt",

    "'shun": "’shun",

    "'slid": "’slid",

    "Find 'em!": "Find ’em!",

    "'Twas the Night Before Christmas": "’Twas the Night Before Christmas",

    "'Til The Season Comes 'Round Again": "’Til The Season Comes ’Round Again",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifyContractedBeginnings(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        testCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Identify common contractions at the end of the word as apostrophes (en-us):\n", () => {
  let testCase = {
    "nottin'": "nottin’",

    "gettin'": "gettin’",

    "NOTTIN'": "NOTTIN’",

    "GETTIN'": "GETTIN’",
  };

  let unitTestCase = {
    ...testCase,

    // false positive, when it’s not a contracted word
    "'something in'": "'something in'",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifyContractedEnds(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        unitTestCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Identify in-word contractions as apostrophes (en-us):\n", () => {
  let testCase = {
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

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifyInWordContractions(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        testCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Identify contracted years as apostrophes (en-us):\n", () => {
  let testCase = {
    "INCHEBA '89": "INCHEBA ’89",
    "in '70s":     "in ’70s",
    "Q1 '23":      "Q1 ’23",
  };

  let unitTestCase = {
    ...testCase,

    // false positive, when there is a wrongly spaced feet
    "12 '45″": "12 '45″",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifyContractedYears(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        unitTestCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Identify feet and arcminutes following a 1–3 numbers (en-us):\n", () => {
  let moduleTestCase = {
    "12 ' 45″": "12′ 45″",

    "12 ‘ 45″": "12′ 45″",

    "12 ’ 45″": "12′ 45″",

    "12 ‛ 45″": "12′ 45″",

    "12 ′ 45″": "12′ 45″",

    "12 ‛45″": "12′45″",

    //this is identified wrongly as 8217, right quotation mark in module tests
    "12 '45″": "12′45″",
  };

  let unitTestCase = {
    "12' 45″": "12′ 45″",

    "12‘ 45″": "12′ 45″",

    "12’ 45″": "12′ 45″",

    "12‛ 45″": "12′ 45″",

    "12′ 45″": "12′ 45″",

    "12 ′ 45″": "12 ′ 45″",

    "12'45″": "12′45″",

    "12 '45″": "12 ′45″",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifySinglePrimes(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        unitTestCase[key]
      );
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Identify standalone left single quote (en-us):\n", () => {
  let unitTestCase = {
    '" \'word"': '" {{typopo__left-single-quote--standalone}}word"',

    '" ‚word"': '" {{typopo__left-single-quote--standalone}}word"',

    " ‘word": " {{typopo__left-single-quote--standalone}}word",

    "–‘word": "–{{typopo__left-single-quote--standalone}}word",

    "—‘word": "—{{typopo__left-single-quote--standalone}}word",

    " ʼword": " {{typopo__left-single-quote--standalone}}word",

    " ‛word": " {{typopo__left-single-quote--standalone}}word",

    " ´word": " {{typopo__left-single-quote--standalone}}word",

    " `word": " {{typopo__left-single-quote--standalone}}word",

    " ′word": " {{typopo__left-single-quote--standalone}}word",

    " ‹word": " {{typopo__left-single-quote--standalone}}word",

    " ›word": " {{typopo__left-single-quote--standalone}}word",
  };

  let moduleTestCase = {
    // heads up! since it’s a standalone quote it’s fixed as apostrophe within a module

    "“ ‘word”": "“ ’word”",

    "“–‘word”": "“–’word”",

    "“—‘word”": "“—’word”",

    "“ ʼword”": "“ ’word”",

    "“ ‛word”": "“ ’word”",

    "“ ´word”": "“ ’word”",

    "“ `word”": "“ ’word”",

    "“ ′word”": "“ ’word”",

    "“ ‹word”": "“ ’word”",

    "“ ›word”": "“ ’word”",
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        identifyStandaloneLeftSingleQuote(key, new Locale("en-us")),
        unitTestCase[key]
      );
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Identify standalone right single quote (en-us):\n", () => {
  let unitTestCase = {
    '"word\'"': '"word{{typopo__right-single-quote--standalone}}"',

    '"word‚"': '"word{{typopo__right-single-quote--standalone}}"',

    "word‘": "word{{typopo__right-single-quote--standalone}}",

    wordʼ: "word{{typopo__right-single-quote--standalone}}",

    "word‛": "word{{typopo__right-single-quote--standalone}}",

    "word´": "word{{typopo__right-single-quote--standalone}}",

    "word`": "word{{typopo__right-single-quote--standalone}}",

    "word′": "word{{typopo__right-single-quote--standalone}}",

    "word‹": "word{{typopo__right-single-quote--standalone}}",

    "word›": "word{{typopo__right-single-quote--standalone}}",

    "word.'": "word.{{typopo__right-single-quote--standalone}}",

    "word!'": "word!{{typopo__right-single-quote--standalone}}",

    "word':": "word{{typopo__right-single-quote--standalone}}:",

    "word',": "word{{typopo__right-single-quote--standalone}},",

    "word' ": "word{{typopo__right-single-quote--standalone}} ",
  };

  let moduleTestCase = {
    // heads up! since it’s a standalone quote it’s fixed as apostrophe within a module

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
      assert.strictEqual(
        identifyStandaloneRightSingleQuote(key, new Locale("en-us")),
        unitTestCase[key]
      );
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Identify single quote pairs (en-us):\n", () => {
  let unitTestCase = {
    "{{typopo__left-single-quote--standalone}}word{{typopo__right-single-quote--standalone}}":
      "{{typopo__left-single-quote}}word{{typopo__right-single-quote}}",

    "{{typopo__left-single-quote--standalone}}word word{{typopo__right-single-quote--standalone}}":
      "{{typopo__left-single-quote}}word word{{typopo__right-single-quote}}",
  };

  let moduleTestCase = {
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
      assert.strictEqual(identifySingleQuotePairs(key, new Locale("en-us")), unitTestCase[key]);
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Identify single quote pairs around single word (en-us):\n", () => {
  let moduleTestCase = {
    "'word'": "‘word’",

    "'word' 'word'": "‘word’ ‘word’",

    "He said: “What about 'word', is that good?”": "He said: “What about ‘word’, is that good?”",

    "Press 'N' to get started": "Press ‘N’ to get started",
  };

  let unitTestCase = {
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
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifySingleQuotePairAroundSingleWord(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        unitTestCase[key]
      );
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Replace a single qoute & a single prime with a single quote pair (en-us):\n", () => {
  let unitTestCase = {
    "{{typopo__left-single-quote--standalone}}word{{typopo__single-prime}}":
      "{{typopo__left-single-quote}}word{{typopo__right-single-quote}}",

    "{{typopo__single-prime}}word{{typopo__right-single-quote--standalone}}":
      "{{typopo__left-single-quote}}word{{typopo__right-single-quote}}",

    // ...testFalsePositives,
  };

  let moduleTestCase = {
    "He said: “What about 'Localhost 3000', is that good?”":
      "He said: “What about ‘Localhost 3000’, is that good?”",

    "He said: “Here are 30 'bucks'”": "He said: “Here are 30 ‘bucks’”",

    // ...testFalsePositives,
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        replaceSinglePrimeWSingleQuote(key, new Locale("en-us")),
        unitTestCase[key]
      );
    });
  });

  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        moduleTestCase[key]
      );
    });
  });
});

describe("Identify residual apostrophes  (en-us):\n", () => {
  let testCase = {
    "Hers'": "Hers’",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        placeLocaleSingleQuotes(
          identifyResidualApostrophes(key, new Locale("en-us")),
          new Locale("en-us")
        ),
        testCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Remove extra space around a single prime:\n", () => {
  let testCase = {
    "12 ′ 45″": "12′ 45″",

    "12 ′45″": "12′45″",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      assert.strictEqual(
        removeExtraSpaceAroundSinglePrime(key, new Locale("en-us")),
        testCase[key]
      );
    });
  });

  Object.keys(testCase).forEach((key) => {
    it("module test", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Swap single quotes and terminal punctuation for a quoted part (en-us):\n", () => {
  let testCase = {
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
      assert.strictEqual(
        swapSingleQuotesAndTerminalPunctuation(key, new Locale("en-us")),
        testCase[key]
      );
    });
    // it("module test", () => {
    // 	assert.strictEqual(
    // 		fixSingleQuotesPrimesAndApostrophes(
    // 			key,
    // 			new Locale("en-us"),
    // 			configIgnoreMarkdownCodeBlocks
    // 		), testCase[key]);
    // });
  });
});

describe("Single quotes in default language (en-us)\n", () => {
  let testCase = {
    "Let's test this: “however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said”":
      "Let’s test this: “however, ‘quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,’ he said”",

    "Within double quotes “there are single 'quotes with mix’d punctuation', you see”.":
      "Within double quotes “there are single ‘quotes with mix’d punctuation’, you see”.",

    "And I ask you: “What’s the idea behind this—how do you call it—'one size fits all' approach?”":
      "And I ask you: “What’s the idea behind this—how do you call it—‘one size fits all’ approach?”",

    "Hej: “Vin mu povil, 'ta de jes' take vidil' i neviril”":
      "Hej: “Vin mu povil, ‘ta de jes’ take vidil’ i neviril”",

    "“double quotes 'and single quotes' within”": "“double quotes ‘and single quotes’ within”",

    "“double quotes 'and single quotes’ within”": "“double quotes ‘and single quotes’ within”",

    "“double quotes ‚and single quotes' within”": "“double quotes ‘and single quotes’ within”",

    "He said: “What about 'name' and 'other name'?”":
      "He said: “What about ‘name’ and ‘other name’?”",
  };

  Object.keys(testCase).forEach((key) => {
    it("module test (en)", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("en-us"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Single quotes in (sk, cs, de-de)\n", () => {
  let testCase = {
    "Let's test this: „however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said“":
      "Let’s test this: „however, ‚quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,‘ he said“",

    "Within double quotes „there are single 'quotes with mix’d punctuation', you see“.":
      "Within double quotes „there are single ‚quotes with mix’d punctuation‘, you see“.",

    "And I ask you: „What’s the idea behind this—how do you call it—'one size fits all' approach?“":
      "And I ask you: „What’s the idea behind this—how do you call it—‚one size fits all‘ approach?“",

    "Hej: „Vin mu povil, 'ta de jes' take vidil' i neviril“":
      "Hej: „Vin mu povil, ‚ta de jes’ take vidil‘ i neviril“",

    "„double quotes 'and single quotes' within“": "„double quotes ‚and single quotes‘ within“",

    "He said: „What about 'name' and 'other name'?“":
      "He said: „What about ‚name‘ and ‚other name‘?“",
  };

  Object.keys(testCase).forEach((key) => {
    it("should fix single quotes, primes and apostrophes in (sk, cs, de-de)", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(key, new Locale("sk"), configIgnoreMarkdownCodeBlocks),
        testCase[key]
      );
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(key, new Locale("cs"), configIgnoreMarkdownCodeBlocks),
        testCase[key]
      );
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(
          key,
          new Locale("de-de"),
          configIgnoreMarkdownCodeBlocks
        ),
        testCase[key]
      );
    });
  });
});

describe("Single quotes in (rue)\n", () => {
  let testCase = {
    "Let's test this: «however, 'quote this or nottin' rock 'n' roll this will be corrected for 69'ers,' he said»":
      "Let’s test this: «however, ‹quote this or nottin’ rock ’n’ roll this will be corrected for 69’ers,› he said»",

    "Within double quotes «there are single 'quotes with mix’d punctuation', you see».":
      "Within double quotes «there are single ‹quotes with mix’d punctuation›, you see».",

    "And I ask you: «What’s the idea behind this—how do you call it—'one size fits all' approach?»":
      "And I ask you: «What’s the idea behind this—how do you call it—‹one size fits all› approach?»",

    "Hej: «Vin mu povil, 'ta de jes' take vidil' i neviril»":
      "Hej: «Vin mu povil, ‹ta de jes’ take vidil› i neviril»",
  };

  Object.keys(testCase).forEach((key) => {
    it("should fix single quotes, primes and apostrophes in Rusyn", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(key, new Locale("rue"), configIgnoreMarkdownCodeBlocks),
        testCase[key]
      );
    });
  });
});

describe("Test if markdown ticks are kept (single quotes) (en-us):\n", () => {
  let testCase = {
    "```\ncode\n```": "```\ncode\n```",

    "\t```\ncode\n```": "\t```\ncode\n```",

    "\t\t```\ncode\n```": "\t\t```\ncode\n```",

    " ```\ncode\n```": " ```\ncode\n```",

    "  ```\ncode\n```": "  ```\ncode\n```",

    "``code``": "``code``",

    "``code code``": "``code code``",

    "``code`` ``code``": "``code`` ``code``",

    "`code`": "`code`",

    "`code code`": "`code code`",

    "`code` `code`": "`code` `code`",
  };

  Object.keys(testCase).forEach((key) => {
    it("keepMarkdownCodeBlocks: true” configuration", () => {
      assert.strictEqual(
        fixSingleQuotesPrimesAndApostrophes(key, new Locale("en-us"), configKeepMarkdownCodeBlocks),
        testCase[key]
      );
    });
  });
});
