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

const singleEllipsisSet = {
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
};

const singleEllipsisUnitSet = {
  /* false positives */
  "Sentence ending.":  "Sentence ending.",
  "Sentence ending..": "Sentence ending..",
};

describe("Replace periods/ellipses with a single ellipsis:\n", () => {
  const unitTest = { ...singleEllipsisSet, ...singleEllipsisUnitSet };
  Object.keys(unitTest).forEach((key) => {
    it("unit test", () => {
      expect(replaceThreeCharsWithEllipsis(key)).toBe(unitTest[key]);
    });
  });
  Object.keys(singleEllipsisSet).forEach((key) => {
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(singleEllipsisSet[key]);
    });
  });
});

const periodEllipsisComboSet = {
  "Sentence ending…":  "Sentence ending…",
  "Sentence ending……": "Sentence ending…",
  "Sentence ending….": "Sentence ending…",
  "Sentence ending.…": "Sentence ending…",
};

describe("Replace combination of period/ellipsis with an ellipsis:\n", () => {
  Object.keys(periodEllipsisComboSet).forEach((key) => {
    it("unit test", () => {
      expect(replaceTwoCharsWithEllipsis(key)).toBe(periodEllipsisComboSet[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(periodEllipsisComboSet[key]);
    });
  });
});

const twoPeriodsBetweenWordsSet = {
  "Sentence .. another sentence": "Sentence … another sentence",
};

describe("Replace two periods between words (spaces) with an ellipsis:\n", () => {
  Object.keys(twoPeriodsBetweenWordsSet).forEach((key) => {
    it("unit test", () => {
      expect(replaceTwoPeriodsWithEllipsis(key)).toBe(twoPeriodsBetweenWordsSet[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(twoPeriodsBetweenWordsSet[key]);
    });
  });
});

const ellipsisAroundCommasSet = {
  "We sell apples, oranges, …, pens.":  "We sell apples, oranges, …, pens.", // neutral
  "We sell apples, oranges,…, pens.":   "We sell apples, oranges, …, pens.",
  "We sell apples, oranges,… , pens.":  "We sell apples, oranges, …, pens.",
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.",
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // nbsp
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // hair_space
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // narrow_nbsp
};

describe("Fix spacing, when ellipsis is used around commas:\n", () => {
  Object.keys(ellipsisAroundCommasSet).forEach((key) => {
    it("unit test", () => {
      expect(fixEllipsisSpacingAroundCommas(key)).toBe(ellipsisAroundCommasSet[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(ellipsisAroundCommasSet[key]);
    });
  });
});

const ellipsisListItemSet = {
  "We sell apples, oranges,…":   "We sell apples, oranges,…",
  "We sell apples, oranges, …":  "We sell apples, oranges,…",
  "We sell apples, oranges,… ":  "We sell apples, oranges,…",
  "We sell apples, oranges, … ": "We sell apples, oranges,…",

  "We sell apples, oranges, … ": "We sell apples, oranges,…", // nbsp
  "We sell apples, oranges, … ": "We sell apples, oranges,…", // hairSpace
  "We sell apples, oranges, … ": "We sell apples, oranges,…", // narrowNbsp
  "(apples, oranges,…)":         "(apples, oranges,…)",
  "(apples, oranges, …)":        "(apples, oranges,…)",
  "(apples, oranges, … )":       "(apples, oranges,…)",
  "(apples, oranges,… )":        "(apples, oranges,…)",
};

const ellipsisListItemUnitSet = {
  // false positive
  "We sell apples, oranges, …, pens.": "We sell apples, oranges, …, pens.",
};

describe("Fix spacing, when ellipsis is used as a list item in the list:\n", () => {
  const unitTest = { ...ellipsisListItemSet, ...ellipsisListItemUnitSet };
  Object.keys(unitTest).forEach((key) => {
    it("unit test", () => {
      expect(fixEllipsisAsLastItem(key)).toBe(unitTest[key]);
    });
  });
  Object.keys(ellipsisListItemSet).forEach((key) => {
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(ellipsisListItemSet[key]);
    });
  });
});

const aposiopesisParagraphStartSet = {
  "…да святить ся":                    "…да святить ся", // correct
  "… да святить ся":                   "…да святить ся",
  "… да святить ся\n… multiline test": "…да святить ся\n…multiline test",
};

describe("Fix spacing, when aposiopesis is starting a paragraph:\n", () => {
  Object.keys(aposiopesisParagraphStartSet).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisStartingParagraph(key)).toBe(aposiopesisParagraphStartSet[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(aposiopesisParagraphStartSet[key]);
    });
  });
});

const aposiopesisSentenceStartSet = {
  "Sentence ended. …and we were there.":  "Sentence ended. …and we were there.", // neutral
  "Sentence ended. … and we were there.": "Sentence ended. …and we were there.",
  "Sentence ended.… and we were there.":  "Sentence ended. …and we were there.",
  "Sentence ended! …and we were there.":  "Sentence ended! …and we were there.",
  "Sentence ended! … and we were there.": "Sentence ended! …and we were there.",
  "Sentence ended!… and we were there.":  "Sentence ended! …and we were there.",
  "Sentence ended? … and we were there.": "Sentence ended? …and we were there.",
  "We sell apples, oranges, …, pens.":    "We sell apples, oranges, …, pens.", // false positive
};

const aposiopesisSentenceStartUnitSet = {
  "Sentence ended?’ … and we were there.": "Sentence ended?’ …and we were there.",
  "Sentence ended?’… and we were there.":  "Sentence ended?’ …and we were there.",
  "“Sentence ended?”… and we were there.": "“Sentence ended?” …and we were there.",
};

describe("Fix spacing, when aposiopesis is starting a sentence:\n", () => {
  const unitTest = { ...aposiopesisSentenceStartSet, ...aposiopesisSentenceStartUnitSet };
  Object.keys(unitTest).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisStartingSentence(key, new Locale("en-us"))).toBe(unitTest[key]);
    });
  });
  Object.keys(aposiopesisSentenceStartSet).forEach((key) => {
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(aposiopesisSentenceStartSet[key]);
    });
  });
});

const aposiopesisBetweenSentencesSet = {
  "Sentence ending… And another starting":  "Sentence ending… And another starting",
  "Sentence ending … And another starting": "Sentence ending… And another starting",
  "Sentence ending …And another starting":  "Sentence ending… And another starting",
};

describe("Fix spacing, when aposiopesis is between sentences:\n", () => {
  Object.keys(aposiopesisBetweenSentencesSet).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisBetweenSentences(key)).toBe(aposiopesisBetweenSentencesSet[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(aposiopesisBetweenSentencesSet[key]);
    });
  });
});

const aposiopesisBetweenWordsSet = {
  "word… word": "word… word",
  "word…word":  "word… word",
  "word…Word":  "word… Word",
  "WORD…WORD":  "WORD… WORD",
};

describe("Fix spacing, when aposiopesis is between words:\n", () => {
  Object.keys(aposiopesisBetweenWordsSet).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisBetweenWords(key)).toBe(aposiopesisBetweenWordsSet[key]);
    });
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(aposiopesisBetweenWordsSet[key]);
    });
  });
});

const ellipsisBetweenSentencesSet = {
  "What are you saying. … She did not answer.": "What are you saying. … She did not answer.",
  "What are you saying. …She did not answer.":  "What are you saying. … She did not answer.",
  "What are you saying.…She did not answer.":   "What are you saying. … She did not answer.",

  "What are you saying! … She did not answer.": "What are you saying! … She did not answer.",
  "What are you saying! …She did not answer.":  "What are you saying! … She did not answer.",
  "What are you saying!…She did not answer.":   "What are you saying! … She did not answer.",

  "What are you saying? … She did not answer.": "What are you saying? … She did not answer.",
  "What are you saying? …She did not answer.":  "What are you saying? … She did not answer.",
  "What are you saying?…She did not answer.":   "What are you saying? … She did not answer.",

  // false positive: keep spaces around aposiopesis, that is used in the middle of a sentence
  "Sentence using … aposiopesis in the middle of a sentence.":
    "Sentence using … aposiopesis in the middle of a sentence.",
};

const ellipsisBetweenSentencesUnitSet = {
  "‘What are you saying?’ … She did not answer.": "‘What are you saying?’ … She did not answer.",
  "‘What are you saying?’ …She did not answer.":  "‘What are you saying?’ … She did not answer.",
  "‘What are you saying?’…She did not answer.":   "‘What are you saying?’ … She did not answer.",
  "“What are you saying?”…She did not answer.":   "“What are you saying?” … She did not answer.",
};

describe("Fix spacing, when ellipsis is between sentences:\n", () => {
  const unitTest = { ...ellipsisBetweenSentencesSet, ...ellipsisBetweenSentencesUnitSet };

  Object.keys(unitTest).forEach((key) => {
    it("unit test", () => {
      expect(fixEllipsisBetweenSentences(key, new Locale("en-us"))).toBe(unitTest[key]);
    });
  });
  Object.keys(ellipsisBetweenSentencesSet).forEach((key) => {
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(ellipsisBetweenSentencesSet[key]);
    });
  });
});

const aposiopesisEndingParagraphSet = {
  "Sentence ending…":                     "Sentence ending…",
  "Sentence ending …":                    "Sentence ending…",
  "Sentence ending     …":                "Sentence ending…",
  "Sentence ending …\nSentence ending …": "Sentence ending…\nSentence ending…",
};

const aposiopesisEndingParagraphUnitSet = {
  "“Sentence ending …”": "“Sentence ending…”",
  "‘Sentence ending …’": "‘Sentence ending…’",
};

describe("Fix spacing, when aposiopesis is ending a paragraph:\n", () => {
  const unitTest = { ...aposiopesisEndingParagraphSet, ...aposiopesisEndingParagraphUnitSet };

  Object.keys(unitTest).forEach((key) => {
    it("unit test", () => {
      expect(fixAposiopesisEndingParagraph(key, new Locale("en-us"))).toBe(unitTest[key]);
    });
  });
  Object.keys(aposiopesisEndingParagraphSet).forEach((key) => {
    it("module test", () => {
      expect(fixEllipsis(key, new Locale("en-us"))).toBe(aposiopesisEndingParagraphSet[key]);
    });
  });
});

export const ellipsisSet = {
  ...singleEllipsisSet,
  ...periodEllipsisComboSet,
  ...twoPeriodsBetweenWordsSet,
  ...ellipsisAroundCommasSet,
  ...ellipsisListItemSet,
  ...aposiopesisParagraphStartSet,
  ...aposiopesisSentenceStartSet,
  ...aposiopesisBetweenSentencesSet,
  ...aposiopesisBetweenWordsSet,
  ...ellipsisBetweenSentencesSet,
  ...aposiopesisEndingParagraphSet,
};
