import {
  removeNbspBetweenMultiCharWords,
  addNbspAfterPreposition,
  addNbspAfterAmpersand,
  addNbspAfterCardinalNumber,
  addNbspAfterOrdinalNumber,
  addNbspWithinOrdinalDate,
  addNbspAfterRomanNumeral,
  fixNbspForNameWithRegnalNumber,
  fixSpaceBeforePercent,
  addNbspBeforeSingleLetter,
  addNbspAfterSymbol,
  replaceSpacesWithNbspAfterSymbol,
  fixNbsp,
} from "../../src/modules/whitespace/nbsp.js";
import { describe, it, expect } from "vitest";
import Locale from "../../src/locale/locale.js";

describe("Remove non-breaking space between multi-letter words\n", () => {
  let testCase = {
    "vo dvore":    "vo dvore",
    "Ku komore":   "Ku komore",
    "vo vo vo vo": "vo vo vo vo",
    "vo vo vo":    "vo vo vo",
    "ňa moja":     "ňa moja",
    "Ťa tvoja":    "Ťa tvoja",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(removeNbspBetweenMultiCharWords(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking spaces after single-letter prepositions\n", () => {
  let testAllLang = {
    "V potoku":         "V potoku",
    "Koniec. V potoku": "Koniec. V potoku",
    "Koniec? V potoku": "Koniec? V potoku",
    "Koniec! V potoku": "Koniec! V potoku",
    "Koniec… V potoku": "Koniec… V potoku",
    "Koniec: V potoku": "Koniec: V potoku",
    "Koniec; V potoku": "Koniec; V potoku",
    "Koniec, V potoku": "Koniec, V potoku",

    "© V Inc.": "© V Inc.",
    "® V Inc.": "® V Inc.",
    "℗ V Inc.": "℗ V Inc.",

    "Skáče o tyči":          "Skáče o tyči",
    "v obchode a v hospode": "v obchode a v hospode",
    "v a v a v":             "v a v a v",
    "a з коминів":           "a з коминів",
    "a я іду здоїти":        "a я іду здоїти",
    "a в хырбетї":           "a в хырбетї",
    "што є му вытыкане":     "што є му вытыкане",
    "ся ї не":               "ся ї не",
    "a s’a":                 "a s’a",

    // false positives
    "client’s customer":                       "client’s customer",
    "Ctrl+I and Ctrl+B or pasting an image.":  "Ctrl+I and Ctrl+B or pasting an image.",
    "Ctrl-I and Ctrl-B or pasting an image.":  "Ctrl-I and Ctrl-B or pasting an image.",
    "získává investici $25M na něco":          "získává investici $25M na něco", //no nbsp after $25M
    "starŷm kresli":                           "starŷm kresli", // non-latin chars in word
    "The product X is missing the feature Y.": "The product X is missing the feature Y.", // no nbsp after a single capital letter in the middle of the sentence
  };

  let testEnUS = {
    ...testAllLang,
    "I was there.":      "I was there.",
    "When I was there.": "When I was there.",
  };

  let testDeDeSkCsRue = {
    ...testAllLang,
    "I v potoku.":       "I v potoku.",
    "When I was there.": "When I was there.",
  };

  Object.keys(testEnUS).forEach((key) => {
    it("unit test (en-us)", () => {
      expect(addNbspAfterPreposition(key, new Locale("en-us"))).toBe(testEnUS[key]);
    });

    it("module test (en-us)", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testEnUS[key]);
    });
  });

  Object.keys(testDeDeSkCsRue).forEach((key) => {
    it("unit test (de-de)", () => {
      expect(addNbspAfterPreposition(key, new Locale("de-de"))).toBe(testDeDeSkCsRue[key]);
    });
    it("module test (de-de)", () => {
      expect(fixNbsp(key, new Locale("de-de"))).toBe(testDeDeSkCsRue[key]);
    });

    it("unit test (sk)", () => {
      expect(addNbspAfterPreposition(key, new Locale("sk"))).toBe(testDeDeSkCsRue[key]);
    });
    it("module test (sk)", () => {
      expect(fixNbsp(key, new Locale("sk"))).toBe(testDeDeSkCsRue[key]);
    });

    it("unit test (rue)", () => {
      expect(addNbspAfterPreposition(key, new Locale("rue"))).toBe(testDeDeSkCsRue[key]);
    });
    it("module test (rue)", () => {
      expect(fixNbsp(key, new Locale("rue"))).toBe(testDeDeSkCsRue[key]);
    });

    it("unit test (cs)", () => {
      expect(addNbspAfterPreposition(key, new Locale("cs"))).toBe(testDeDeSkCsRue[key]);
    });
    it("module test (cs)", () => {
      expect(fixNbsp(key, new Locale("cs"))).toBe(testDeDeSkCsRue[key]);
    });
  });
});

describe("Add non-breaking space after ampersand\n", () => {
  let testCase = {
    "Bed & Breakfast": "Bed & Breakfast",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addNbspAfterAmpersand(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space after cardinal number\n", () => {
  let testCase = {
    "5 mm":  "5 mm",
    "5 mm":  "5 mm", // nbsp
    "5 mm":  "5 mm", // hairSpace
    "5 mm":  "5 mm", // narrowNbsp
    "5 Kč":  "5 Kč",
    "15 mm": "15 mm",

    // false positive
    // no nbsp after 3+ digits
    "152 mm": "152 mm",

    "2020 rokov": "2020 rokov",

    /* false positive,
     * a number is already bound with abbreviation
     * Na str.⎵5 je obsah → Na str.⎵5 je obsah
     * 									 !→ Na str. 5⎵je obsah
     */
    "Na str. 5 je obsah": "Na str. 5 je obsah",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addNbspAfterCardinalNumber(key)).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space after ordinal number (en)\n", () => {
  let testCase = {
    "1st amendment":  "1st amendment",
    "2nd amendment":  "2nd amendment",
    "3rd amendment":  "3rd amendment",
    "4th amendment":  "4th amendment",
    "18th amendment": "18th amendment",
    "1st March":      "1st March",
    "2nd March":      "2nd March",
    "3rd March":      "3rd March",
    "15th March":     "15th March",

    // false positive, 3+ digits
    "158th amendment":  "158th amendment",
    "1158th amendment": "1158th amendment",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addNbspAfterOrdinalNumber(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space after ordinal number (sk, cs, rue, de-de)\n", () => {
  let testCase = {
    "1. dodatok":  "1. dodatok",
    "1.dodatok":   "1. dodatok",
    "1.štava":     "1. štava",
    "12. dodatok": "12. dodatok",
    "12. január":  "12. január",

    "21. Festival otrlého diváka": "21. Festival otrlého diváka",

    "10.00": "10.00", // false positive for the example above

    // false positive, nbsp bound with previous
    "Je to str. 5. Dalsia veta.": "Je to str. 5. Dalsia veta.",

    // false positive, 3+ digits
    "158. festival": "158. festival",

    "…dokonce i v roce 2021. Důsledky…": "…dokonce i v roce 2021. Důsledky…",

    "url-to-image-5.jpg": "url-to-image-5.jpg",

    "url_to_image_5.jpg": "url_to_image_5.jpg",

    "url%to%image%5.jpg": "url%to%image%5.jpg",

    // unsolved for now
    // "Přišlo jich 12. Dalsi veta.":
    // "Přišlo jich 12. Dalsi veta.",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test (sk)", () => {
      expect(addNbspAfterOrdinalNumber(key, new Locale("sk"))).toBe(testCase[key]);
    });
    it("unit test (cs)", () => {
      expect(addNbspAfterOrdinalNumber(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("unit test (de-de)", () => {
      expect(addNbspAfterOrdinalNumber(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("unit test (rue)", () => {
      expect(addNbspAfterOrdinalNumber(key, new Locale("rue"))).toBe(testCase[key]);
    });
    it("module test (sk)", () => {
      expect(fixNbsp(key, new Locale("sk"))).toBe(testCase[key]);
    });
    it("module test (cs)", () => {
      expect(fixNbsp(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("module test (de-de)", () => {
      expect(fixNbsp(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("module test (rue)", () => {
      expect(fixNbsp(key, new Locale("rue"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space within ordinal date (sk, cs, rue)\n", () => {
  let testCase = {
    "12. 1. 2017": "12. 1. 2017",
    "12.1.2017":   "12. 1. 2017",
    "10.00":       "10.00", // false positive for the example above
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addNbspWithinOrdinalDate(key, new Locale("sk"))).toBe(testCase[key]);
      expect(addNbspWithinOrdinalDate(key, new Locale("cs"))).toBe(testCase[key]);
      expect(addNbspWithinOrdinalDate(key, new Locale("rue"))).toBe(testCase[key]);
      expect(addNbspWithinOrdinalDate(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("sk"))).toBe(testCase[key]);
      expect(fixNbsp(key, new Locale("cs"))).toBe(testCase[key]);
      expect(fixNbsp(key, new Locale("rue"))).toBe(testCase[key]);
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space within ordinal date (de-de)\n", () => {
  let testCase = {
    /*  German standard orthography (Duden) recommends
        only one nbsp (or narrowNbsp) after the day
        and a regular interword space following the month*/
    "12.1.2019":   "12. 1. 2019",
    "12. 1. 2019": "12. 1. 2019",
    "10.00":       "10.00", // false positive for the example above
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(addNbspWithinOrdinalDate(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("de-de"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space after roman numeral (sk, cs, de-de, rue)\n", () => {
  let testCase = {
    "I. kapitola":         "I. kapitola",
    "bola to I. kapitola": "bola to I. kapitola",
    "III. kapitola":       "III. kapitola",
    "III.kapitola":        "III. kapitola",
    "X. ročník":           "X. ročník",
    "Bol to X. ročník.":   "Bol to X. ročník.",
    "V. ročník":           "V. ročník",
    "L. ročník":           "L. ročník",
    "D. ročník":           "D. ročník",
    "8. V. 1945":          "8. V. 1945",
    "8. V.1945":           "8. V. 1945",
    // false positives
    "Ch. G. D. Lambert":   "Ch. G. D. Lambert",
    "Ch. G. D. Lambert":   "Ch. G. D. Lambert",
    "G. D. Lambert":       "G. D. Lambert",
    "Ch. Ch. D. Lambert":  "Ch. Ch. D. Lambert",
    "CH. D. Lambert":      "CH. D. Lambert",
    "Ch. Ch. Šalda":       "Ch. Ch. Šalda",
    "CH. CH. Šalda":       "CH. CH. Šalda",
    "Ch.Ch. Šalda":        "Ch.Ch. Šalda",
    "CH.CH. Šalda":        "CH.CH. Šalda",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test (sk)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("sk"))).toBe(testCase[key]);
    });
    it("unit test (cs)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("unit test (de-de)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("unit test (rue)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("rue"))).toBe(testCase[key]);
    });
    it("module test (sk)", () => {
      expect(fixNbsp(key, new Locale("sk"))).toBe(testCase[key]);
    });
    it("module test (cs)", () => {
      expect(fixNbsp(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("module test (de-de)", () => {
      expect(fixNbsp(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("module test (rue)", () => {
      expect(fixNbsp(key, new Locale("rue"))).toBe(testCase[key]);
    });
  });
});

describe("Add non-breaking space after roman numeral (sk, cs, de-de, rue)\nExtra false positive", () => {
  let testCase = {
    // false positive
    "Karel IV.": "Karel IV.",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test (sk)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("sk"))).toBe(testCase[key]);
    });
    it("unit test (cs)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("cs"))).toBe(testCase[key]);
    });
    it("unit test (de-de)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("de-de"))).toBe(testCase[key]);
    });
    it("unit test (rue)", () => {
      expect(addNbspAfterRomanNumeral(key, new Locale("rue"))).toBe(testCase[key]);
    });
  });
});

describe("Fix non-breaking space around name with regnal number (sk, cs, de-de, rue)\n", () => {
  let moduleTestCase = {
    // Place non-breaking space between name and roman numeral
    "Karel IV. byl římsko-německý král.": "Karel IV. byl římsko-německý král.",
    "Karel IV. byl římsko-německý král.": "Karel IV. byl římsko-německý král.",
    "Karel IV.":                          "Karel IV.",
    //false positive
    "je to IV. cenová skupina":           "je to IV. cenová skupina",
  };

  let unitTestCase = {
    // correct placement in mix of languages
    "When I talk to emerging product designers": "When I talk to emerging product designers",
    ...moduleTestCase,
  };

  Object.keys(unitTestCase).forEach((key) => {
    it("unit test", () => {
      expect(fixNbspForNameWithRegnalNumber(key, new Locale("sk"))).toBe(unitTestCase[key]);
      expect(fixNbspForNameWithRegnalNumber(key, new Locale("cs"))).toBe(unitTestCase[key]);
      expect(fixNbspForNameWithRegnalNumber(key, new Locale("de-de")), unitTestCase[key]);
      expect(fixNbspForNameWithRegnalNumber(key, new Locale("rue"))).toBe(unitTestCase[key]);
    });
  });
  Object.keys(moduleTestCase).forEach((key) => {
    it("module test", () => {
      expect(fixNbsp(key, new Locale("sk"))).toBe(moduleTestCase[key]);
      expect(fixNbsp(key, new Locale("cs"))).toBe(moduleTestCase[key]);
      expect(fixNbsp(key, new Locale("de-de"))).toBe(moduleTestCase[key]);
      expect(fixNbsp(key, new Locale("rue"))).toBe(moduleTestCase[key]);
    });
  });
});

describe("Fix non-breaking space around name with regnal number (en-us)\n", () => {
  let testCase = {
    // Place non-breaking space between name and roman numeral
    "Charles IV was an emperor.": "Charles IV was an emperor.",
    "Charles IV was an emperor.": "Charles IV was an emperor.", // swapped nbsp
    "Charles IV":                 "Charles IV",
    "Charles X":                  "Charles X",

    // False positives
    "When I talk to emerging product designers": "When I talk to emerging product designers",
    "Try Ctrl+I":                                "Try Ctrl+I",
    "Sequoia Capital":                           "Sequoia Capital",

    // Unsupported
    // It’s more common to use “I + verb” in text than citing regnal names so this case is unsupported for now
    "Charles I": "Charles I",
  };

  Object.keys(testCase).forEach((key) => {
    it("unit test", () => {
      expect(fixNbspForNameWithRegnalNumber(key, new Locale("en-us"))).toBe(testCase[key]);
    });
    it("module test", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testCase[key]);
    });
  });
});

describe("Add nbsp before percent, permille, permyriad\n", () => {
  let testCaseSk = {
    "20 %":      "20 %",
    "20 %–30 %": "20 %–30 %",
    "20 ‰":      "20 ‰",
    "20 ‰–30 ‰": "20 ‰–30 ‰",
    "20 ‱":      "20 ‱",
    "20 ‱–30 ‱": "20 ‱–30 ‱",
  };

  let testCaseDeDe = {
    "20 %":      "20 %",
    "20 %–30 %": "20 %–30 %",
    "20 ‰":      "20 ‰",
    "20 ‰–30 ‰": "20 ‰–30 ‰",
    "20 ‱":      "20 ‱",
    "20 ‱–30 ‱": "20 ‱–30 ‱",
  };

  let testCaseEnUs = {
    "20 %":      "20%",
    "20 %–30 %": "20%–30%",
    "20 ‰":      "20‰",
    "20 ‰–30 ‰": "20‰–30‰",
    "20 ‱":      "20‱",
    "20 ‱–30 ‱": "20‱–30‱",
  };

  const testConfigs = [
    { testCase: testCaseSk, locale: "sk" },
    { testCase: testCaseDeDe, locale: "de-de" },
    { testCase: testCaseEnUs, locale: "en-us" },
  ];

  testConfigs.forEach(({ testCase, locale }) => {
    Object.keys(testCase).forEach((key) => {
      it("unit test", () => {
        expect(fixSpaceBeforePercent(key, new Locale(locale))).toBe(testCase[key]);
      });
      it("module test", () => {
        expect(fixNbsp(key, new Locale(locale))).toBe(testCase[key]);
      });
    });
  });
});

describe("Add nbsp before single capital letter in a sentence\n", () => {
  let testAllLang = {
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
    "famous company — A Inc.":         "famous company — A Inc.",
  };

  let testEnUs = {
    ...testAllLang,
    // false positives
    "When I talk":                    "When I talk", // do not add nbsp before I
    "“qouted part” A capital letter": "“qouted part” A capital letter",
    "‘qouted part’ A capital letter": "‘qouted part’ A capital letter",
  };

  let testDeDeSkCs = {
    ...testAllLang,
    "Vzorka I":         "Vzorka I",
    "Vzorka I je fajn": "Vzorka I je fajn", // remove nbsp after I
    "Vzorka I je fajn": "Vzorka I je fajn", // remove hairSpace after I
    "Vzorka I je fajn": "Vzorka I je fajn", // remove narrowNbsp after I

    // false positives
    "„qouted part“ A capital letter": "„qouted part“ A capital letter",
    "‚qouted part‘ A capital letter": "‚qouted part‘ A capital letter",
    "apostrophe’ A capital letter":   "apostrophe’ A capital letter",
  };

  let testRue = {
    ...testAllLang,
    "Vzorka I":         "Vzorka I",
    "Vzorka I je fajn": "Vzorka I je fajn", // remove nbsp after I
    "Vzorka I je fajn": "Vzorka I je fajn", // remove hairSpace after I
    "Vzorka I je fajn": "Vzorka I je fajn", // remove narrowNbsp after I

    // false positives
    "«qouted part» A capital letter": "«qouted part» A capital letter",
    "‹qouted part› A capital letter": "‹qouted part› A capital letter",
    "apostrophe’ A capital letter":   "apostrophe’ A capital letter",
  };

  Object.keys(testEnUs).forEach((key) => {
    it("unit tests (en-us)", () => {
      expect(addNbspBeforeSingleLetter(key, new Locale("en-us"))).toBe(testEnUs[key]);
    });
  });
  Object.keys(testDeDeSkCs).forEach((key) => {
    it("unit tests (de-de)", () => {
      expect(addNbspBeforeSingleLetter(key, new Locale("de-de"))).toBe(testDeDeSkCs[key]);
    });
  });
  Object.keys(testDeDeSkCs).forEach((key) => {
    it("unit tests (sk)", () => {
      expect(addNbspBeforeSingleLetter(key, new Locale("sk"))).toBe(testDeDeSkCs[key]);
    });
  });
  Object.keys(testDeDeSkCs).forEach((key) => {
    it("unit tests (cs)", () => {
      expect(addNbspBeforeSingleLetter(key, new Locale("cs"))).toBe(testDeDeSkCs[key]);
    });
  });
  Object.keys(testRue).forEach((key) => {
    it("unit tests (rue)", () => {
      expect(addNbspBeforeSingleLetter(key, new Locale("rue"))).toBe(testRue[key]);
    });
  });
  Object.keys(testEnUs).forEach((key) => {
    it("module tests (en-us)", () => {
      expect(fixNbsp(key, new Locale("en-us"))).toBe(testEnUs[key]);
    });
  });
  Object.keys(testDeDeSkCs).forEach((key) => {
    it("module tests (de-de)", () => {
      expect(fixNbsp(key, new Locale("de-de"))).toBe(testDeDeSkCs[key]);
    });
  });
  Object.keys(testDeDeSkCs).forEach((key) => {
    it("module tests (sk)", () => {
      expect(fixNbsp(key, new Locale("sk"))).toBe(testDeDeSkCs[key]);
    });
  });
  Object.keys(testDeDeSkCs).forEach((key) => {
    it("module tests (cs)", () => {
      expect(fixNbsp(key, new Locale("cs"))).toBe(testDeDeSkCs[key]);
    });
  });
  Object.keys(testRue).forEach((key) => {
    it("module tests (rue)", () => {
      expect(fixNbsp(key, new Locale("rue"))).toBe(testRue[key]);
    });
  });
});

describe("Add space after symbol, e.g. ©\n", () => {
  let testCase = {
    // in-depth tests are in the respective test files for symbols,
    // e.g. copyrights, numero-sign, section-sign
    "©2017":         "© 2017",
    "Company ©2017": "Company © 2017",
  };

  Object.keys(testCase).forEach((key) => {
    it("just unit tests", () => {
      expect(addNbspAfterSymbol(key, "©")).toBe(testCase[key]);
    });
  });
});

describe("Replaces various spaces with non-breaking space after symbol, e.g. ©\n", () => {
  let testCase = {
    // in-depth tests are in the respective test files for symbols,
    // e.g. copyrights, numero-sign, section-sign
    "Company © 2017":   "Company © 2017",
    "Company © 2017":   "Company © 2017", // hairSpace
    "Company © 2017":   "Company © 2017", // narrowNbsp
    "Company ©  2017":  "Company © 2017",
    "Company ©   2017": "Company © 2017",
  };

  Object.keys(testCase).forEach((key) => {
    it("just unit tests", () => {
      expect(replaceSpacesWithNbspAfterSymbol(key, "©")).toBe(testCase[key]);
    });
  });
});

export const nbspSet = {
  "v a v a v":                               "v a v a v",
  "The product X is missing the feature Y.": "The product X is missing the feature Y.",
  "Sputnik V":                               "Sputnik V",
  "Človek Č":                                "Človek Č",
  "© V Inc.":                                "© V Inc.",
  "bola to I. kapitola":                     "bola to I. kapitola",
  "pán Šťastný":                             "pán Šťastný",
  "pán ŠŤASTNÝ":                             "pán ŠŤASTNÝ",
  "One sentence ends. A bad apple.":         "One sentence ends. A bad apple.",
  "One sentence ends? A bad apple.":         "One sentence ends? A bad apple.",
  "One sentence ends! A bad apple.":         "One sentence ends! A bad apple.",
  "sentence; C-level executive":             "sentence; C-level executive",
  "sentence: C-level executive":             "sentence: C-level executive",
  "sentence, C-level executive":             "sentence, C-level executive",
  "I’d say… A-player":                       "I’d say… A-player",
  "sentence (brackets) A-player":            "sentence (brackets) A-player",
  "sentence [brackets] A-player":            "sentence [brackets] A-player",
  "sentence {brackets} A-player":            "sentence {brackets} A-player",
  "A × A":                                   "A × A",
  "© V Inc.":                                "© V Inc.",

  // false positives
  "bola to I. kapitola":             "bola to I. kapitola",
  "One sentence ends. A bad apple.": "One sentence ends. A bad apple.",
  "One sentence ends? A bad apple.": "One sentence ends? A bad apple.",
  "One sentence ends! A bad apple.": "One sentence ends! A bad apple.",
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

export function getNbspSet(localeName) {
  let transformed = { ...nbspSet };

  if (localeName === "en-us") {
    transformed = {
      ...transformed,
      "When I talk": "When I talk", // do not add nbsp before I
    };
  } else {
    transformed = {
      ...transformed,
      "Vzorka I je fajn": "Vzorka I je fajn", // remove 2nd nbsp
    };
  }
  return transformed;
}
