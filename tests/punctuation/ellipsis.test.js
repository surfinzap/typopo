import {
  fixAposiopesisBetweenSentences,
  fixAposiopesisBetweenWords,
  fixAposiopesisEndingParagraph,
  fixAposiopesisStartingParagraph,
  fixAposiopesisStartingSentence,
  fixEllipsis,
  fixEllipsisAsLastItem,
  fixEllipsisBetweenSentences,
  fixEllipsisSpacingAroundCommas,
  replaceThreeCharsWithEllipsis,
  replaceTwoCharsWithEllipsis,
  replaceTwoPeriodsWithEllipsis,
} from "../../src/modules/punctuation/ellipsis.js";
import { createTestSuite } from "../test-helpers.js";

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

createTestSuite(
  "Replace periods/ellipses with a single ellipsis:\n",
  { ...singleEllipsisSet, ...singleEllipsisUnitSet },
  replaceThreeCharsWithEllipsis,
  singleEllipsisSet,
  fixEllipsis
);

const periodEllipsisComboSet = {
  "Sentence ending…":  "Sentence ending…",
  "Sentence ending……": "Sentence ending…",
  "Sentence ending….": "Sentence ending…",
  "Sentence ending.…": "Sentence ending…",
};

createTestSuite(
  "Replace combination of period/ellipsis with an ellipsis:\n",
  periodEllipsisComboSet,
  replaceTwoCharsWithEllipsis,
  {},
  fixEllipsis
);

const twoPeriodsBetweenWordsSet = {
  "Sentence .. another sentence": "Sentence … another sentence",
};

createTestSuite(
  "Replace two periods between words (spaces) with an ellipsis:\n",
  twoPeriodsBetweenWordsSet,
  replaceTwoPeriodsWithEllipsis,
  {},
  fixEllipsis
);

const ellipsisAroundCommasSet = {
  "We sell apples, oranges, …, pens.":  "We sell apples, oranges, …, pens.", // neutral
  "We sell apples, oranges,…, pens.":   "We sell apples, oranges, …, pens.",
  "We sell apples, oranges,… , pens.":  "We sell apples, oranges, …, pens.",
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.",
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // nbsp
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // hair_space
  "We sell apples, oranges, … , pens.": "We sell apples, oranges, …, pens.", // narrow_nbsp
};

createTestSuite(
  "Fix spacing, when ellipsis is used around commas:\n",
  ellipsisAroundCommasSet,
  fixEllipsisSpacingAroundCommas,
  {},
  fixEllipsis
);

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

createTestSuite(
  "Fix spacing, when ellipsis is used as a list item in the list:\n",
  { ...ellipsisListItemSet, ...ellipsisListItemUnitSet },
  fixEllipsisAsLastItem,
  ellipsisListItemSet,
  fixEllipsis
);

const aposiopesisParagraphStartSet = {
  "…да святить ся":                    "…да святить ся", // correct
  "… да святить ся":                   "…да святить ся",
  "… да святить ся\n… multiline test": "…да святить ся\n…multiline test",
};

createTestSuite(
  "Fix spacing, when aposiopesis is starting a paragraph:\n",
  aposiopesisParagraphStartSet,
  fixAposiopesisStartingParagraph,
  {},
  fixEllipsis
);

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

createTestSuite(
  "Fix spacing, when aposiopesis is starting a sentence:\n",
  { ...aposiopesisSentenceStartSet, ...aposiopesisSentenceStartUnitSet },
  fixAposiopesisStartingSentence,
  aposiopesisSentenceStartSet,
  fixEllipsis
);

const aposiopesisBetweenSentencesSet = {
  "Sentence ending… And another starting":  "Sentence ending… And another starting",
  "Sentence ending … And another starting": "Sentence ending… And another starting",
  "Sentence ending …And another starting":  "Sentence ending… And another starting",
};

createTestSuite(
  "Fix spacing, when aposiopesis is between sentences:\n",
  aposiopesisBetweenSentencesSet,
  fixAposiopesisBetweenSentences,
  {},
  fixEllipsis
);

const aposiopesisBetweenWordsSet = {
  "word… word": "word… word",
  "word…word":  "word… word",
  "word…Word":  "word… Word",
  "WORD…WORD":  "WORD… WORD",
};

createTestSuite(
  "Fix spacing, when aposiopesis is between words:\n",
  aposiopesisBetweenWordsSet,
  fixAposiopesisBetweenWords,
  {},
  fixEllipsis
);

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

createTestSuite(
  "Fix spacing, when ellipsis is between sentences:\n",
  { ...ellipsisBetweenSentencesSet, ...ellipsisBetweenSentencesUnitSet },
  fixEllipsisBetweenSentences,
  ellipsisBetweenSentencesSet,
  fixEllipsis
);

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

createTestSuite(
  "Fix spacing, when aposiopesis is ending a paragraph:\n",
  { ...aposiopesisEndingParagraphSet, ...aposiopesisEndingParagraphUnitSet },
  fixAposiopesisEndingParagraph,
  aposiopesisEndingParagraphSet,
  fixEllipsis
);

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
