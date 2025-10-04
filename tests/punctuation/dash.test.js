import {
  replaceThreeHyphensWithEmDash,
  replaceTwoHyphensWithEnDash,
  fixDashesBetweenWords,
  fixHyphenBetweenWordAndPunctuation,
  fixDashBetweenCardinalNumbers,
  fixDashBetweenPercentageRange,
  fixDashBetweenOrdinalNumbers,
  fixDash,
} from "../../src/modules/punctuation/dash.js";
import { createTestSuite } from "../test-utils.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";

const threeHyphensSet = {
  "and --- she said": "and — she said",
};

createTestSuite(
  "Replace 3 hyphens with an em dash",
  threeHyphensSet,
  replaceThreeHyphensWithEmDash,
  {}
);

const twoHyphensSet = {
  "and -- she said": "and – she said",
};

createTestSuite(
  "Replace 2 hyphens with an en dash",
  twoHyphensSet,
  replaceTwoHyphensWithEnDash,
  {}
);

const dashFalsePositives = {
  // False positive: compound words
  "e -shop": "e -shop",
  "e- shop": "e- shop",
  "e- shop": "e- shop", //nbsp
  "e- shop": "e- shop", //hairSpace
  "e- shop": "e- shop", //narrowNbsp

  // False positive: hyphen at the beginning of the paragraph
  "- she said":     "- she said",
  " - she said":    " - she said",
  "  - she said":   "  - she said",
  "\t- she said":   "\t- she said",
  "\t\t- she said": "\t\t- she said",

  "+-":                "+-",
  "{{test-variable}}": "{{test-variable}}",
};

const dashesBetweenWordsSet = {
  "and - she said":   "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",
  "and – she said":   "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",
  "and  –  she said": "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",
  "and — she said":   "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",
  "and  —  she said": "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",
  "and — she said":   "and${spaceBeforeDash}${dash}${spaceAfterDash}she said", //mixed spaces
  "and— she said":    "and${spaceBeforeDash}${dash}${spaceAfterDash}she said", //mixed spaces
  "and —she said":    "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",
  "and—she said":     "and${spaceBeforeDash}${dash}${spaceAfterDash}she said",

  "word - word":     "word${spaceBeforeDash}${dash}${spaceAfterDash}word", //nbsp
  "word - word":     "word${spaceBeforeDash}${dash}${spaceAfterDash}word", //hairSpace
  "word - word":     "word${spaceBeforeDash}${dash}${spaceAfterDash}word", //narrowNbsp
  "ptaškŷ -  čadič": "ptaškŷ${spaceBeforeDash}${dash}${spaceAfterDash}čadič", // non-latin chars
  "хотїв - нияке":   "хотїв${spaceBeforeDash}${dash}${spaceAfterDash}нияке", // non-latin chars

  "…the top 10 - and explore…":  "…the top 10${spaceBeforeDash}${dash}${spaceAfterDash}and explore…",
  "…the top 10 – and explore…":  "…the top 10${spaceBeforeDash}${dash}${spaceAfterDash}and explore…",
  "…the top 10 –  and explore…": "…the top 10${spaceBeforeDash}${dash}${spaceAfterDash}and explore…",
  "…the top 10–and explore…":    "…the top 10${spaceBeforeDash}${dash}${spaceAfterDash}and explore…",
  "…the top 10 — and explore…":  "…the top 10${spaceBeforeDash}${dash}${spaceAfterDash}and explore…",

  "…like to see - 7 wonders…":  "…like to see${spaceBeforeDash}${dash}${spaceAfterDash}7 wonders…",
  "…like to see – 7 wonders…":  "…like to see${spaceBeforeDash}${dash}${spaceAfterDash}7 wonders…",
  "…like to see –  7 wonders…": "…like to see${spaceBeforeDash}${dash}${spaceAfterDash}7 wonders…",
  "…like to see–7 wonders…":    "…like to see${spaceBeforeDash}${dash}${spaceAfterDash}7 wonders…",
  "…like to see — 7 wonders…":  "…like to see${spaceBeforeDash}${dash}${spaceAfterDash}7 wonders…",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix a dash, an en dash, an em dash and spacing between words`,
    transformDashSet({ ...dashesBetweenWordsSet, ...dashFalsePositives }, locale),
    fixDashesBetweenWords,
    {},
    fixDash,
    locale
  );
});

const hyphenWordPunctuationSet = {
  "so there is a dash -,":  "so there is a dash${spaceBeforeDash}${dash},",
  "so there is a dash-,":   "so there is a dash${spaceBeforeDash}${dash},",
  "so there is a dash -:":  "so there is a dash${spaceBeforeDash}${dash}:",
  "so there is a dash -;":  "so there is a dash${spaceBeforeDash}${dash};",
  "so there is a dash -.":  "so there is a dash${spaceBeforeDash}${dash}.",
  "so there is a dash -?":  "so there is a dash${spaceBeforeDash}${dash}?",
  "so there is a dash -!":  "so there is a dash${spaceBeforeDash}${dash}!",
  "so there is a dash -\n": "so there is a dash${spaceBeforeDash}${dash}\n",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix hyphen between word and punctuation`,
    transformDashSet({ ...hyphenWordPunctuationSet, ...dashFalsePositives }, locale),
    fixHyphenBetweenWordAndPunctuation,
    {},
    fixDash,
    locale
  );
});

const dashCardinalNumbersSet = {
  "5-6 eggs":                          "5–6 eggs",
  "15-16 eggs":                        "15–16 eggs",
  "5 -6 eggs":                         "5–6 eggs",
  "5- 6 eggs":                         "5–6 eggs",
  "5 - 6 eggs":                        "5–6 eggs",
  "5—6 eggs":                          "5–6 eggs",
  "5-12″ long":                        "5–12″ long",
  "In 5.25-10.75 range":               "In 5.25–10.75 range",
  "In 5,000.25-10,000.75 range":       "In 5,000.25–10,000.75 range",
  "v rozmedzí 5,25-10,75":             "v rozmedzí 5,25–10,75",
  "v rozmedzí 5 000,25-10 000,75":     "v rozmedzí 5 000,25–10 000,75",
  "2-3 Eier":                          "2–3 Eier",
  "2 -3 Eier":                         "2–3 Eier",
  "2- 3 Eier":                         "2–3 Eier",
  "2 - 3 Eier":                        "2–3 Eier",
  "2—3 Eier":                          "2–3 Eier",
  "im Bereich von 5.000,25-10.000,75": "im Bereich von 5.000,25–10.000,75",

  // date formats
  "2019-02-03":     "2019–02–03",
  "2019 - 02 - 03": "2019–02–03",
  "2019- 02 -03":   "2019–02–03",
  "2019-02":        "2019–02",
  "2019 -02":       "2019–02",
  "2019 - 02":      "2019–02",
  "2019- 02":       "2019–02",
  "19 - 02 - 03":   "19–02–03",
  "19- 02 -03":     "19–02–03",

  //telephone numbers
  "1–2–3":     "1–2–3", // correct
  "1 – 2 – 3": "1–2–3",
  "1– 2 –3":   "1–2–3",

  "1-2-3":     "1–2–3",
  "1 - 2 - 3": "1–2–3",
  "1- 2 -3":   "1–2–3",

  "1—2—3":     "1–2–3",
  "1 — 2 — 3": "1–2–3",
  "1— 2 —3":   "1–2–3",

  "154-123-4567": "154–123–4567",
};

createTestSuite(
  "Fix dash between cardinal numbers",
  dashCardinalNumbersSet,
  fixDashBetweenCardinalNumbers,
  {},
  fixDash,
  supportedLocales
);

const dashPercentageRangeSet = {
  "20%-30%":   "20%–30%",
  "20% -30%":  "20%–30%",
  "20% - 30%": "20%–30%",
  "20%- 30%":  "20%–30%",

  "20%–30%": "20%–30%",
  "20%—30%": "20%–30%",

  "20 %-30 %":   "20 %–30 %",
  "20 % -30 %":  "20 %–30 %",
  "20 % - 30 %": "20 %–30 %",
  "20 %- 30 %":  "20 %–30 %",

  "20 ‰ - 30 ‰": "20 ‰–30 ‰",
  "20 ‱ - 30 ‱": "20 ‱–30 ‱",
};

createTestSuite(
  "Fix dash between percentage range",
  dashPercentageRangeSet,
  fixDashBetweenPercentageRange,
  {},
  fixDash,
  "en-us"
);

const dashOrdinalNumbersEnUsSet = {
  "1st-5th August":   "1st–5th August",
  "1st -5th August":  "1st–5th August",
  "1st- 5th August":  "1st–5th August",
  "1st - 5th August": "1st–5th August",
};

createTestSuite(
  "Fix dash between ordinal numbers (en-us)",
  dashOrdinalNumbersEnUsSet,
  fixDashBetweenOrdinalNumbers,
  {},
  fixDash,
  "en-us"
);

const dashOrdinalNumbersOtherLocalesSet = {
  "1.-5. augusta":   "1.–5. augusta",
  "1. -5. augusta":  "1.–5. augusta",
  "1.- 5. augusta":  "1.–5. augusta",
  "1. - 5. augusta": "1.–5. augusta",
};

createTestSuite(
  "Fix dash between ordinal numbers (rue, sk, cs, de)",
  dashOrdinalNumbersOtherLocalesSet,
  fixDashBetweenOrdinalNumbers,
  {},
  fixDash,
  ["rue", "sk", "cs", "de-de"]
);

export const dashSet = {
  ...dashesBetweenWordsSet,
  ...hyphenWordPunctuationSet,
  ...dashCardinalNumbersSet,
};

export function transformDashSet(testSet, localeName) {
  const locale = new Locale(localeName);
  const replaceTokens = (str) =>
    str
      .replace(/\$\{spaceBeforeDash\}/g, locale.dashWords.spaceBefore)
      .replace(/\$\{dash\}/g, locale.dashWords.dash)
      .replace(/\$\{spaceAfterDash\}/g, locale.dashWords.spaceAfter);

  const transformed = {};

  Object.keys(testSet).forEach((key) => {
    transformed[replaceTokens(key)] = replaceTokens(testSet[key]);
  });

  return transformed;
}
