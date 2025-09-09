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
import { describe, it, expect } from "vitest";
import Locale from "../../src/locale/locale.js";

describe("Replace 3 hyphens with an em dash\n", () => {
  let testCase = {
    "and --- she said": "and — she said",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceThreeHyphensWithEmDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Replace 2 hyphens with an en dash\n", () => {
  let testCase = {
    "and -- she said": "and – she said",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(replaceTwoHyphensWithEnDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

let dashFalsePositives = {
  /*
      False positive: compound words
    */
  "e -shop": "e -shop",
  "e- shop": "e- shop",
  "e- shop": "e- shop", //nbsp
  "e- shop": "e- shop", //hairSpace
  "e- shop": "e- shop", //narrowNbsp

  /*
      False positive: hyphen at the beginning of the paragraph
    */
  "- she said":     "- she said",
  " - she said":    " - she said",
  "  - she said":   "  - she said",
  "\t- she said":   "\t- she said",
  "\t\t- she said": "\t\t- she said",
};

describe("Fix a dash, an en dash, an em dash and spacing between words (en-us)\n", () => {
  let testCase = {
    ...dashFalsePositives,

    "and - she said":   "and—she said",
    "and – she said":   "and—she said",
    "and  –  she said": "and—she said",
    "and — she said":   "and—she said",
    "and  —  she said": "and—she said",
    "and — she said":   "and—she said", //mixed spaces
    "and— she said":    "and—she said", //mixed spaces
    "and —she said":    "and—she said",
    "and—she said":     "and—she said",

    "word - word":     "word—word", //nbsp
    "word - word":     "word—word", //hairSpace
    "word - word":     "word—word", //narrowNbsp
    "ptaškŷ -  čadič": "ptaškŷ—čadič", // non-latin chars
    "хотїв - нияке":   "хотїв—нияке", // non-latin chars

    "…the top 10 - and explore…":  "…the top 10—and explore…",
    "…the top 10 – and explore…":  "…the top 10—and explore…",
    "…the top 10 –  and explore…": "…the top 10—and explore…",
    "…the top 10–and explore…":    "…the top 10—and explore…",
    "…the top 10 — and explore…":  "…the top 10—and explore…",

    "…like to see - 7 wonders…":  "…like to see—7 wonders…",
    "…like to see – 7 wonders…":  "…like to see—7 wonders…",
    "…like to see –  7 wonders…": "…like to see—7 wonders…",
    "…like to see–7 wonders…":    "…like to see—7 wonders…",
    "…like to see — 7 wonders…":  "…like to see—7 wonders…",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixDashesBetweenWords(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix a dash, an en dash, an em dash and spacing between words (rue, sk)\n", () => {
  let testCase = {
    ...dashFalsePositives,

    "ptaškŷ - čadič":   "ptaškŷ — čadič",
    "ptaškŷ - čadič":   "ptaškŷ — čadič",
    "ptaškŷ – čadič":   "ptaškŷ — čadič",
    "ptaškŷ  –  čadič": "ptaškŷ — čadič",
    "ptaškŷ — čadič":   "ptaškŷ — čadič",
    "ptaškŷ  —  čadič": "ptaškŷ — čadič",
    "ptaškŷ — čadič":   "ptaškŷ — čadič", //mixed spaces
    "ptaškŷ— čadič":    "ptaškŷ — čadič", //mixed spaces
    "ptaškŷ —čadič":    "ptaškŷ — čadič",
    "ptaškŷ—čadič":     "ptaškŷ — čadič",

    "хотїв - нияке":   "хотїв — нияке",
    "хотїв - нияке":   "хотїв — нияке",
    "хотїв – нияке":   "хотїв — нияке",
    "хотїв  –  нияке": "хотїв — нияке",
    "хотїв — нияке":   "хотїв — нияке",
    "хотїв  —  нияке": "хотїв — нияке",
    "хотїв — нияке":   "хотїв — нияке", //mixed spaces
    "хотїв— нияке":    "хотїв — нияке", //mixed spaces
    "хотїв —нияке":    "хотїв — нияке",
    "хотїв—нияке":     "хотїв — нияке",

    "word - word":     "word — word", //nbsp
    "word - word":     "word — word", //hairSpace
    "word - word":     "word — word", //narrowNbsp
    "ptaškŷ -  čadič": "ptaškŷ — čadič", // non-latin chars

    "…the top 10 - and explore…":  "…the top 10 — and explore…",
    "…the top 10 – and explore…":  "…the top 10 — and explore…",
    "…the top 10 –  and explore…": "…the top 10 — and explore…",
    "…the top 10–and explore…":    "…the top 10 — and explore…",
    "…the top 10 — and explore…":  "…the top 10 — and explore…",

    "…like to see - 7 wonders…":  "…like to see — 7 wonders…",
    "…like to see – 7 wonders…":  "…like to see — 7 wonders…",
    "…like to see –  7 wonders…": "…like to see — 7 wonders…",
    "…like to see–7 wonders…":    "…like to see — 7 wonders…",
    "…like to see — 7 wonders…":  "…like to see — 7 wonders…",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test (rue)", () => {
      expect(fixDashesBetweenWords(key, new Locale("rue"))).toBe(testCase[key]);
    });
    it("unit test (sk)", () => {
      expect(fixDashesBetweenWords(key, new Locale("sk"))).toBe(testCase[key]);
    });
    it("module test (rue)", () => {
      expect(fixDash(key, new Locale("rue"))).toBe(testCase[key]);
    });
    it("module test (sk)", () => {
      expect(fixDash(key, new Locale("sk"))).toBe(testCase[key]);
    });
  });
});

describe("Fix a dash, an en dash, an em dash and spacing between words (cs)\n", () => {
  let testCase = {
    ...dashFalsePositives,

    "domů - čadič":   "domů – čadič",
    "domů - čadič":   "domů – čadič",
    "domů – čadič":   "domů – čadič",
    "domů  –  čadič": "domů – čadič",
    "domů — čadič":   "domů – čadič",
    "domů  —  čadič": "domů – čadič",
    "domů — čadič":   "domů – čadič", //mixed spaces
    "domů— čadič":    "domů – čadič", //mixed spaces
    "domů —čadič":    "domů – čadič",
    "domů—čadič":     "domů – čadič",

    "word - word":     "word – word", //nbsp
    "word - word":     "word – word", //hairSpace
    "word - word":     "word – word", //narrowNbsp
    "ptaškŷ -  čadič": "ptaškŷ – čadič", // non-latin chars
    "хотїв - нияке":   "хотїв – нияке", // non-latin chars

    "…the top 10 - and explore…":  "…the top 10 – and explore…",
    "…the top 10 – and explore…":  "…the top 10 – and explore…",
    "…the top 10 –  and explore…": "…the top 10 – and explore…",
    "…the top 10–and explore…":    "…the top 10 – and explore…",
    "…the top 10 — and explore…":  "…the top 10 – and explore…",

    "…like to see - 7 wonders…":  "…like to see – 7 wonders…",
    "…like to see – 7 wonders…":  "…like to see – 7 wonders…",
    "…like to see –  7 wonders…": "…like to see – 7 wonders…",
    "…like to see–7 wonders…":    "…like to see – 7 wonders…",
    "…like to see — 7 wonders…":  "…like to see – 7 wonders…",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test (cs)", () => {
      expect(fixDashesBetweenWords(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("module test (cs)", () => {
      expect(fixDash(key, new Locale("cs"))).toBe(testCase[key]);
    });
  });
});

describe("Fix a dash, an en dash, an em dash and spacing between words (de-de)\n", () => {
  let testCase = {
    ...dashFalsePositives,

    "und - sie sagte":   "und – sie sagte",
    "und - sie sagte":   "und – sie sagte",
    "und – sie sagte":   "und – sie sagte",
    "und  –  sie sagte": "und – sie sagte",
    "und — sie sagte":   "und – sie sagte",
    "und  —  sie sagte": "und – sie sagte",
    "und — sie sagte":   "und – sie sagte", //mixed spaces
    "und— sie sagte":    "und – sie sagte", //mixed spaces
    "und —sie sagte":    "und – sie sagte",
    "und—sie sagte":     "und – sie sagte",

    "word - word":     "word – word", //nbsp
    "word - word":     "word – word", //hairSpace
    "word - word":     "word – word", //narrowNbsp
    "ptaškŷ -  čadič": "ptaškŷ – čadič", // non-latin chars
    "хотїв - нияке":   "хотїв – нияке", // non-latin chars

    "…the top 10 - and explore…":  "…the top 10 – and explore…",
    "…the top 10 – and explore…":  "…the top 10 – and explore…",
    "…the top 10 –  and explore…": "…the top 10 – and explore…",
    "…the top 10–and explore…":    "…the top 10 – and explore…",
    "…the top 10 — and explore…":  "…the top 10 – and explore…",

    "…like to see - 7 wonders…":  "…like to see – 7 wonders…",
    "…like to see – 7 wonders…":  "…like to see – 7 wonders…",
    "…like to see –  7 wonders…": "…like to see – 7 wonders…",
    "…like to see–7 wonders…":    "…like to see – 7 wonders…",
    "…like to see — 7 wonders…":  "…like to see – 7 wonders…",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test (de-de)", () => {
      expect(fixDashesBetweenWords(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("module test (de-de)", () => {
      expect(fixDash(key, new Locale("de-de"))).toBe(testCase[key]);
    });
  });
});

describe("Fix hyphen between word and punctuation (en-us)\n", () => {
  let testCase = {
    "so there is a dash -,":  "so there is a dash—,",
    "so there is a dash-,":   "so there is a dash—,",
    "so there is a dash -:":  "so there is a dash—:",
    "so there is a dash -;":  "so there is a dash—;",
    "so there is a dash -.":  "so there is a dash—.",
    "so there is a dash -?":  "so there is a dash—?",
    "so there is a dash -!":  "so there is a dash—!",
    "so there is a dash -\n": "so there is a dash—\n",

    //false positives
    "e-shop":            "e-shop",
    "e- shop":           "e- shop", // this individual method shouldn't catch that
    "+-":                "+-",
    "{{test-variable}}": "{{test-variable}}",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixHyphenBetweenWordAndPunctuation(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix hyphen between word and punctuation (sk, rue)\n", () => {
  let testCase = {
    "so there is a dash -,":  "so there is a dash —,", //hairSpace
    "so there is a dash -.":  "so there is a dash —.",
    "so there is a dash -\n": "so there is a dash —\n",

    //false positives
    "e-shop":            "e-shop",
    "e- shop":           "e- shop", // this individual method shouldn't catch that
    "+-":                "+-",
    "{{test-variable}}": "{{test-variable}}",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixHyphenBetweenWordAndPunctuation(key, new Locale("sk"))).toBe(testCase[key]);
      expect(fixHyphenBetweenWordAndPunctuation(key, new Locale("rue"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("sk"))).toBe(testCase[key]);
      expect(fixDash(key, new Locale("rue"))).toBe(testCase[key]);
    });
  });
});

describe("Fix hyphen between word and punctuation (cs)\n", () => {
  let testCase = {
    "so there is a dash -,":  "so there is a dash –,", //nbsp + enDash
    "so there is a dash -.":  "so there is a dash –.",
    "so there is a dash -\n": "so there is a dash –\n",

    //false positives
    "e-shop":            "e-shop",
    "e- shop":           "e- shop", // this individual method shouldn't catch that
    "+-":                "+-",
    "{{test-variable}}": "{{test-variable}}",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixHyphenBetweenWordAndPunctuation(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("cs"))).toBe(testCase[key]);
    });
  });
});

describe("Fix hyphen between word and punctuation (de-de)\n", () => {
  let testCase = {
    "so there is a dash -,":  "so there is a dash –,", //hairSpace + enDash
    "so there is a dash -.":  "so there is a dash –.",
    "so there is a dash -\n": "so there is a dash –\n",

    //false positives
    "e-shop":            "e-shop",
    "e- shop":           "e- shop", // this individual method shouldn't catch that
    "+-":                "+-",
    "{{test-variable}}": "{{test-variable}}",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixHyphenBetweenWordAndPunctuation(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("de-de"))).toBe(testCase[key]);
    });
  });
});

describe("Fix dash between cardinal numbers\n", () => {
  let testCase = {
    "5-6 eggs":                          "5–6 eggs",
    "15-16 eggs":                        "15–16 eggs",
    "5 -6 eggs":                         "5–6 eggs",
    "5- 6 eggs":                         "5–6 eggs",
    "5 - 6 eggs":                        "5–6 eggs",
    "5—6 eggs":                          "5–6 eggs",
    "5-12″ long":                        "5–12″ long",
    "In 5.25-10.75 range":               "In 5.25–10.75 range",
    "In 5,000.25-10,000.75 range":       "In 5,000.25–10,000.75 range",
    "v rozmedzí 5,25-10,75":             "v rozmedzí 5,25–10,75",
    "v rozmedzí 5 000,25-10 000,75":     "v rozmedzí 5 000,25–10 000,75",
    "2-3 Eier":                          "2–3 Eier",
    "2 -3 Eier":                         "2–3 Eier",
    "2- 3 Eier":                         "2–3 Eier",
    "2 - 3 Eier":                        "2–3 Eier",
    "2—3 Eier":                          "2–3 Eier",
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

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixDashBetweenCardinalNumbers(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix dash between percentage range\n", () => {
  let testCase = {
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

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixDashBetweenPercentageRange(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix dash between ordinal numbers (en-us)\n", () => {
  let testCase = {
    "1st-5th August":   "1st–5th August",
    "1st -5th August":  "1st–5th August",
    "1st- 5th August":  "1st–5th August",
    "1st - 5th August": "1st–5th August",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixDashBetweenOrdinalNumbers(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Fix dash between ordinal numbers (rue, sk, cs, de)\n", () => {
  let testCase = {
    "1.-5. augusta":   "1.–5. augusta",
    "1. -5. augusta":  "1.–5. augusta",
    "1.- 5. augusta":  "1.–5. augusta",
    "1. - 5. augusta": "1.–5. augusta",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixDashBetweenOrdinalNumbers(key, new Locale("rue"))).toBe(testCase[key]);
      expect(fixDashBetweenOrdinalNumbers(key, new Locale("sk"))).toBe(testCase[key]);
      expect(fixDashBetweenOrdinalNumbers(key, new Locale("cs"))).toBe(testCase[key]);
      expect(fixDashBetweenOrdinalNumbers(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixDash(key, new Locale("rue"))).toBe(testCase[key]);
      expect(fixDash(key, new Locale("sk"))).toBe(testCase[key]);
      expect(fixDash(key, new Locale("cs"))).toBe(testCase[key]);
      expect(fixDash(key, new Locale("de-de"))).toBe(testCase[key]);
    });
  });
});
