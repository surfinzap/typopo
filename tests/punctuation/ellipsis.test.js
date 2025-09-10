import {
  replaceThreeCharsWithEllipsis,
  replaceTwoCharsWithEllipsis,
  replaceTwoPeriodsWithEllipsis,
  fixEllipsisSpacingAroundCommas,
  fixAposiopesisStartingParagraph,
  fixAposiopesisStartingSentence,
  fixAposiopesisBetweenSentences,
  fixAposiopesisBetweenWords,
  fixEllipsisBetweenSentences,
  fixAposiopesisEndingParagraph,
  fixEllipsis,
  fixEllipsisAsLastItem,
} from "../../src/modules/punctuation/ellipsis.js";
import { describe, it, expect } from "vitest";
import Locale from "../../src/locale/locale.js";

describe("Replace periods/ellipses with a single ellipsis:\n", () => {
  let testCase = {
    /* [1] replace 3 and more dots/ellipses with an ellipsis */
    "Sentence ... another sentence":   "Sentence … another sentence",
    "Sentence .... another sentence":  "Sentence … another sentence",
    "Sentence ..... another sentence": "Sentence … another sentence",
    "Sentence ending...":              "Sentence ending…",
    "Sentence ending....":             "Sentence ending…",
    "Sentence ending.....":            "Sentence ending…",
    "Sentence ending….....":           "Sentence ending…",
    "Sentence ending….…":              "Sentence ending…",
    "Sentence ending.….....":          "Sentence ending…",

    /* false positives */
    "Sentence ending.":  "Sentence ending.",
    "Sentence ending..": "Sentence ending..",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceThreeCharsWithEllipsis(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Replace combination of period/ellipsis with an ellipsis:\n", () => {
  let testCase = {
    "Sentence ending…":  "Sentence ending…",
    "Sentence ending……": "Sentence ending…",
    "Sentence ending….": "Sentence ending…",
    "Sentence ending.…": "Sentence ending…",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceTwoCharsWithEllipsis(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Replace two periods between words (spaces) with an ellipsis:\n", () => {
  let testCase = {
    "Sentence .. another sentence": "Sentence … another sentence",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceTwoPeriodsWithEllipsis(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when ellipsis is used around commas:\n", () => {
  let testCase = {
    "We sell apples, oranges, …, pens.":  "We sell apples, oranges, …, pens.", // neutral
    "We sell apples, oranges,…, pens.":   "We sell apples, oranges, …, pens.",
    "We sell apples, oranges,… , pens.":  "We sell apples, oranges, …, pens.",
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.",
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // nbsp
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // hair_space
    "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // narrow_nbsp
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixEllipsisSpacingAroundCommas(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when ellipsis is used as a list item int the list:\n", () => {
  let testCase = {
    "We sell apples, oranges,…": "We sell apples, oranges,…",

    "We sell apples, oranges, …": "We sell apples, oranges,…",

    "We sell apples, oranges,… ": "We sell apples, oranges,…",

    "We sell apples, oranges, … ": "We sell apples, oranges,…",

    // nbsp
    "We sell apples, oranges, … ": "We sell apples, oranges,…",

    // hair_space
    "We sell apples, oranges, … ": "We sell apples, oranges,…",

    // narrow_nbsp
    "We sell apples, oranges, … ": "We sell apples, oranges,…",

    "(apples, oranges,…)": "(apples, oranges,…)",

    "(apples, oranges, …)": "(apples, oranges,…)",

    "(apples, oranges, … )": "(apples, oranges,…)",

    "(apples, oranges,… )": "(apples, oranges,…)",

    // false positive
    "We sell apples, oranges, …, pens.": "We sell apples, oranges, …, pens.",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixEllipsisAsLastItem(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when aposiopesis is starting a paragraph:\n", () => {
  let testCase = {
    "…да святить ся":                    "…да святить ся", // correct
    "… да святить ся":                   "…да святить ся",
    "… да святить ся\n… multiline test": "…да святить ся\n…multiline test",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisStartingParagraph(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when aposiopesis is starting a sentence:\n", () => {
  let testCase = {
    "Sentence ended. …and we were there.":   "Sentence ended. …and we were there.", // neutral
    "Sentence ended. … and we were there.":  "Sentence ended. …and we were there.",
    "Sentence ended.… and we were there.":   "Sentence ended. …and we were there.",
    "Sentence ended! …and we were there.":   "Sentence ended! …and we were there.",
    "Sentence ended! … and we were there.":  "Sentence ended! …and we were there.",
    "Sentence ended!… and we were there.":   "Sentence ended! …and we were there.",
    "Sentence ended? … and we were there.":  "Sentence ended? …and we were there.",
    "Sentence ended?’ … and we were there.": "Sentence ended?’ …and we were there.",
    "Sentence ended?’… and we were there.":  "Sentence ended?’ …and we were there.",
    "Sentence ended?”… and we were there.":  "Sentence ended?” …and we were there.",
    "We sell apples, oranges, …, pens.":     "We sell apples, oranges, …, pens.", // false positive
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisStartingSentence(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when aposiopesis is between sentences:\n", () => {
  let testCase = {
    "Sentence ending… And another starting":  "Sentence ending… And another starting",
    "Sentence ending … And another starting": "Sentence ending… And another starting",
    "Sentence ending …And another starting":  "Sentence ending… And another starting",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisBetweenSentences(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when aposiopesis is between words:\n", () => {
  let testCase = {
    "word… word": "word… word",
    "word…word":  "word… word",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisBetweenWords(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when ellipsis is between sentences:\n", () => {
  let testCase = {
    "What are you saying. … She did not answer.": "What are you saying. … She did not answer.",
    "What are you saying. …She did not answer.":  "What are you saying. … She did not answer.",
    "What are you saying.…She did not answer.":   "What are you saying. … She did not answer.",

    "What are you saying! … She did not answer.": "What are you saying! … She did not answer.",
    "What are you saying! …She did not answer.":  "What are you saying! … She did not answer.",
    "What are you saying!…She did not answer.":   "What are you saying! … She did not answer.",

    "What are you saying? … She did not answer.": "What are you saying? … She did not answer.",
    "What are you saying? …She did not answer.":  "What are you saying? … She did not answer.",
    "What are you saying?…She did not answer.":   "What are you saying? … She did not answer.",

    "‘What are you saying?’ … She did not answer.": "‘What are you saying?’ … She did not answer.",
    "‘What are you saying?’ …She did not answer.":  "‘What are you saying?’ … She did not answer.",
    "‘What are you saying?’…She did not answer.":   "‘What are you saying?’ … She did not answer.",
    "“What are you saying?”…She did not answer.":   "“What are you saying?” … She did not answer.",

    /* false positive: keep spaces around aposiopesis, that is used in the middle of a sentence */
    "Sentence using … aposiopesis in the middle of a sentence.":
      "Sentence using … aposiopesis in the middle of a sentence.",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixEllipsisBetweenSentences(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix spacing, when aposiopesis is ending a paragraph:\n", () => {
  let testCase = {
    "Sentence ending…": "Sentence ending…",

    "Sentence ending …": "Sentence ending…",

    "Sentence ending     …": "Sentence ending…",

    "“Sentence ending …”": "“Sentence ending…”",

    "‘Sentence ending …’": "‘Sentence ending…’",

    "Sentence ending …\nSentence ending …": "Sentence ending…\nSentence ending…",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisEndingParagraph(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});
