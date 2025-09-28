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
import Locale, { supportedLocales } from "../../src/locale/locale.js";
import { createTestSuite } from "../test-utils.js";
import { base } from "../../src/const.js";

const nbspBetweenMultiCharWordsSet = {
  "vo dvore":    "vo dvore",
  "Ku komore":   "Ku komore",
  "vo vo vo vo": "vo vo vo vo",
  "vo vo vo":    "vo vo vo",
  "ňa moja":     "ňa moja",
  "Ťa tvoja":    "Ťa tvoja",
};

createTestSuite(
  "Remove non-breaking space between multi-letter words",
  nbspBetweenMultiCharWordsSet,
  removeNbspBetweenMultiCharWords,
  {},
  fixNbsp,
  supportedLocales
);

const filenameFalsePositiveSet = {
  "url-to-image-5.jpg": "url-to-image-5.jpg",
  "url_to_image_5.jpg": "url_to_image_5.jpg",
  "url%to%image%5.jpg": "url%to%image%5.jpg",
  "url to image 5.jpg": "url to image 5.jpg",
  "URL-TO-IMAGE-5.JPG": "URL-TO-IMAGE-5.JPG",
  "URL_TO_IMAGE_5.JPG": "URL_TO_IMAGE_5.JPG",
  "URL%TO%IMAGE%5.JPG": "URL%TO%IMAGE%5.JPG",
  "URL TO IMAGE 5.JPG": "URL TO IMAGE 5.JPG",
};

const nbspAfterPrepositionSet = {
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

const nbspAfterPrepositionEnUsSet = {
  "When I talk":  "When I talk", // do not add nbsp before I
  "I was there.": "I was there.",
};

const nbspAfterPrepositionOtherSet = {
  "Vzorka I je fajn":  "Vzorka I je fajn", // remove 2nd nbsp
  "I v potoku.":       "I v potoku.",
  "When I was there.": "When I was there.",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    "Add non-breaking spaces after single-letter prepositions",
    {
      ...nbspAfterPrepositionSet,
      ...(locale === "en-us" ? nbspAfterPrepositionEnUsSet : nbspAfterPrepositionOtherSet),
    },
    addNbspAfterPreposition,
    {},
    fixNbsp,
    locale
  );
});

const nbspAfterAmpersandSet = {
  "Bed & Breakfast": "Bed & Breakfast",
};

createTestSuite(
  "Add a non-breaking space after “&”",
  nbspAfterAmpersandSet,
  addNbspAfterAmpersand,
  {},
  fixNbsp,
  supportedLocales
);

const nbspAfterCardinalNumberSet = {
  "5 mm":  "5 mm",
  "5 mm":  "5 mm", // nbsp
  "5 mm":  "5 mm", // hairSpace
  "5 mm":  "5 mm", // narrowNbsp
  "5 Kč":  "5 Kč",
  "15 mm": "15 mm",

  // false positive
  // no nbsp after 3+ digits
  "152 mm":     "152 mm",
  "2020 rokov": "2020 rokov",

  /* false positive,
   * a number is already bound with abbreviation
   * Na str.⎵5 je obsah → Na str.⎵5 je obsah
   * 									 !→ Na str. 5⎵je obsah
   */
  "Na str. 5 je obsah": "Na str. 5 je obsah",
};

createTestSuite(
  "Add a non-breaking space after a cardinal number",
  nbspAfterCardinalNumberSet,
  addNbspAfterCardinalNumber,
  {},
  fixNbsp,
  supportedLocales
);

const nbspAfterOrdinalNumberEnUsSet = {
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

createTestSuite(
  "Add a non-breaking space after an ordinal number",
  nbspAfterOrdinalNumberEnUsSet,
  addNbspAfterOrdinalNumber,
  {},
  fixNbsp
);

const nbspAfterOrdinalNumberOtherSet = {
  "1. dodatok":                  "1. dodatok",
  "1.dodatok":                   "1. dodatok",
  "1.štava":                     "1. štava",
  "12. dodatok":                 "12. dodatok",
  "12. január":                  "12. január",
  "21. Festival otrlého diváka": "21. Festival otrlého diváka",

  // false positives
  "10.00":                             "10.00",
  "Je to str. 5. Dalsia veta.":        "Je to str. 5. Dalsia veta.",
  "158. festival":                     "158. festival", // fp, 3+ digits
  "…dokonce i v roce 2021. Důsledky…": "…dokonce i v roce 2021. Důsledky…",
};

createTestSuite(
  "Add a non-breaking space after an ordinal number",
  nbspAfterOrdinalNumberOtherSet,
  addNbspAfterOrdinalNumber,
  {},
  fixNbsp,
  supportedLocales.filter((locale) => locale !== "en-us")
);

const nbspOrdinalDate = {
  "12. 1. 2017": "12.${ordinalDateFirstSpace}1.${ordinalDateSecondSpace}2017",
  "12.1.2017":   "12.${ordinalDateFirstSpace}1.${ordinalDateSecondSpace}2017",
  "10.00":       "10.00", // false positive for the example above
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    "Fix spaces with an ordinal date",
    transformNbspSet(nbspOrdinalDate, locale),
    addNbspWithinOrdinalDate,
    {},
    fixNbsp,
    locale
  );
});

const nbspAfterRomanNumeralSet = {
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

const nbspAfterRomanNumeralUnitSet = {
  "Karel IV.": "Karel IV.",
};

createTestSuite(
  "Add a non-breaking space after a roman numeral",
  { ...nbspAfterRomanNumeralSet, ...nbspAfterRomanNumeralUnitSet },
  addNbspAfterRomanNumeral,
  nbspAfterRomanNumeralSet,
  fixNbsp,
  supportedLocales.filter((locale) => locale !== "en-us")
);

const nbspNameRegnalNumberSet = {
  // Place non-breaking space between name and roman numeral
  "Karel IV${romanOrdinalIndicator} byl římsko-německý král.": "Karel IV${romanOrdinalIndicator} byl římsko-německý král.",
  "Karel IV${romanOrdinalIndicator} byl římsko-německý král.": "Karel IV${romanOrdinalIndicator} byl římsko-německý král.",
  "Karel IV${romanOrdinalIndicator}":                          "Karel IV${romanOrdinalIndicator}",
  "Karel X${romanOrdinalIndicator}":                           "Karel X${romanOrdinalIndicator}",
  //false positive
  "je to IV. cenová skupina":                                  "je to IV. cenová skupina",
  "Try Ctrl+I":                                                "Try Ctrl+I",
  // unsupported (It’s more common to use “I + verb” in text than citing regnal names so this case is unsupported for now)
  "Charles I.":                                                "Charles I.",
};

const nbspNameRegnalNumberUnitSet = {
  "When I talk to emerging product designers": "When I talk to emerging product designers",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    "Fix non-breaking space around a name with a regnal number",
    { ...transformNbspSet(nbspNameRegnalNumberSet, locale), ...nbspNameRegnalNumberUnitSet },
    fixNbspForNameWithRegnalNumber,
    transformNbspSet(nbspNameRegnalNumberSet, locale),
    fixNbsp,
    locale
  );
});

const spaceBeforePercentSet = {
  "20 %":      "20${spaceBeforePercent}%",
  "20 %–30 %": "20${spaceBeforePercent}%–30${spaceBeforePercent}%",
  "20 ‰":      "20${spaceBeforePercent}‰",
  "20 ‰–30 ‰": "20${spaceBeforePercent}‰–30${spaceBeforePercent}‰",
  "20 ‱":      "20${spaceBeforePercent}‱",
  "20 ‱–30 ‱": "20${spaceBeforePercent}‱–30${spaceBeforePercent}‱",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    "Add a locale-specific space before %, ‰, ‱",
    transformNbspSet(spaceBeforePercentSet, locale),
    fixSpaceBeforePercent,
    {},
    fixNbsp,
    locale
  );
});

const nbspBeforeSingleLetterSet = {
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
};

const nbspBeforeSingleLetterUnitSet = {
  "famous company — A Inc.":                         "famous company — A Inc.",
  "quoted part${rightDoubleQuote} A capital letter": "quoted part${rightDoubleQuote} A capital letter",
  "quoted part${rightSingleQuote} A capital letter": "quoted part${rightSingleQuote} A capital letter",
  "apostrophe${apostrophe} A capital letter":        "apostrophe${apostrophe} A capital letter",
};

const nbspBeforeSingleLetterEnUsSet = {
  "When I talk": "When I talk", // do not add nbsp before I
};

const nbspBeforeSingleLetterOtherSet = {
  "Vzorka I":         "Vzorka I",
  "Vzorka I je fajn": "Vzorka I je fajn", // remove nbsp after I
  "Vzorka I je fajn": "Vzorka I je fajn", // remove hairSpace after I
  "Vzorka I je fajn": "Vzorka I je fajn", // remove narrowNbsp after I
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    "Add a non-breaking space before a single capital letter in a sentence",
    {
      ...nbspBeforeSingleLetterSet,
      ...transformNbspSet(nbspBeforeSingleLetterUnitSet, locale),
      ...(locale === "en-us" ? nbspBeforeSingleLetterEnUsSet : nbspBeforeSingleLetterOtherSet),
    },
    addNbspBeforeSingleLetter,
    {},
    fixNbsp,
    locale
  );
});

const nbspAfterSymbolSet = {
  // in-depth tests are in the respective test files for symbols,
  // e.g. copyrights, numero-sign, section-sign
  "©2017":         "© 2017",
  "Company ©2017": "Company © 2017",
};

createTestSuite(
  "Add a space after a symbol, e.g. ©",
  nbspAfterSymbolSet,
  (text) => addNbspAfterSymbol(text, "©"),
  {},
  null,
  supportedLocales
);

const oneNbspAfterSymbolSet = {
  // in-depth tests are in the respective test files for symbols,
  // e.g. copyrights, numero-sign, section-sign
  "Company © 2017":   "Company © 2017",
  "Company © 2017":   "Company © 2017", // hairSpace
  "Company © 2017":   "Company © 2017", // narrowNbsp
  "Company ©  2017":  "Company © 2017",
  "Company ©   2017": "Company © 2017",
};

createTestSuite(
  "Add a space after a symbol, e.g. ©",
  oneNbspAfterSymbolSet,
  (text) => replaceSpacesWithNbspAfterSymbol(text, "©"),
  {},
  null,
  supportedLocales
);

export const nbspSet = {
  ...nbspBetweenMultiCharWordsSet,
  ...nbspAfterPrepositionSet,
  ...nbspAfterAmpersandSet,
  ...nbspAfterCardinalNumberSet,
  ...nbspOrdinalDate,
  ...nbspNameRegnalNumberSet,
  ...spaceBeforePercentSet,
  ...nbspBeforeSingleLetterSet,
  ...filenameFalsePositiveSet,
};

export function transformNbspSet(testSet, localeName) {
  const locale = new Locale(localeName);

  let transformed = {};

  Object.keys(testSet).forEach((key) => {
    const transformedKey = key
      .replace(/\$\{romanOrdinalIndicator\}/g, locale.romanOrdinalIndicator)
      .replace(/\\./g, ".")
      .replace(/\$\{rightDoubleQuote\}/g, locale.rightDoubleQuote)
      .replace(/\$\{rightSingleQuote\}/g, locale.rightSingleQuote)
      .replace(/\$\{apostrophe\}/g, base.apostrophe);
    const transformedValue = testSet[key]
      .replace(/\$\{ordinalDateFirstSpace\}/g, locale.ordinalDate.firstSpace)
      .replace(/\$\{ordinalDateSecondSpace\}/g, locale.ordinalDate.secondSpace)
      .replace(/\$\{romanOrdinalIndicator\}/g, locale.romanOrdinalIndicator)
      .replace(/\\./g, ".")
      .replace(/\$\{spaceBeforePercent\}/g, locale.spaceBefore.percent)
      .replace(/\$\{rightDoubleQuote\}/g, locale.rightDoubleQuote)
      .replace(/\$\{rightSingleQuote\}/g, locale.rightSingleQuote)
      .replace(/\$\{apostrophe\}/g, base.apostrophe);
    transformed[transformedKey] = transformedValue;
  });

  return transformed;
}
