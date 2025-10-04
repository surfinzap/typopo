import {
  fixAbbreviations,
  fixInitials,
  fixMultipleWordAbbreviations,
  fixSingleWordAbbreviations,
} from "../../src/modules/words/abbreviations.js";
import { createTestSuite } from "../test-utils.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";

export function transformAbbrSet(testSet, localeName) {
  const locale = new Locale(localeName);
  const replaceTokens = (str) => str.replace(/\$\{abbrSpace\}/g, locale.spaceAfter.abbreviation);

  const transformed = {};
  Object.keys(testSet).forEach((key) => {
    transformed[replaceTokens(key)] = replaceTokens(testSet[key]);
  });

  return transformed;
}

const initialsSet = {
  "J. Novak":       "J. Novak", // essential case, nbsp missing
  "J.Novak":        "J. Novak", // space missing
  "J. Novak":       "J. Novak", // double-check NBSP in the middle
  "Ch. Lambert":    "Ch. Lambert", //double-letter as a first name initial
  "CH. Lambert":    "CH. Lambert", //double-letter initialized as a first name initial
  "Philip K. Dick": "Philip K. Dick", // one middle initial
  "Philip K.Dick":  "Philip K. Dick", // one middle initials

  // test cases for two-letter initials
  "F. X. Šalda":         "F.${abbrSpace}X. Šalda", //nbsp after 1st letter, normal space after 2nd one
  "F.X. Šalda":          "F.${abbrSpace}X. Šalda",
  "Ch. Ch. Šalda":       "Ch.${abbrSpace}Ch. Šalda",
  "CH. CH. Šalda":       "CH.${abbrSpace}CH. Šalda",
  // ch.ch gets exempted as URL. hopefully, no ones has such a name
  // "Ch.Ch. Šalda":  "Ch.${abbrSpace}Ch. Šalda",
  // "CH.CH. Šalda":  "CH.${abbrSpace}CH. Šalda",

  // test cases for three-letter initials
  // "Ch. G. D. Lambert":   "Ch.${abbrSpace}G.${abbrSpace}D. Lambert", // nbsp after 2 letter, normal space after third one
  "Ch. Ch. Ch. Lambert": "Ch.${abbrSpace}Ch.${abbrSpace}Ch. Lambert",
  "CH. CH. CH. Lambert": "CH.${abbrSpace}CH.${abbrSpace}CH. Lambert",

  // false positives, this function should leave them as they are
  "F. X.":    "F. X.",
  "F.X.":     "F.X.",
  "F. X. R.": "F. X. R.",
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix Initials`,
    transformAbbrSet(initialsSet, locale),
    (text) => fixInitials(text, new Locale(locale)),
    {},
    (text) => fixAbbreviations(text, new Locale(locale)),
    locale
  );
});

const multiWordAbbrSet = {
  // double-word abbreviations
  "hl. m. Praha":          "hl.${abbrSpace}m. Praha", // set proper nbsp
  "hl.m.Praha":            "hl.${abbrSpace}m. Praha", // include proper spaces
  "Hl.m.Praha":            "Hl.${abbrSpace}m. Praha", // catch capitalized exception
  "Je to hl. m. Praha.":   "Je to hl.${abbrSpace}m. Praha.", // in a sentence
  "Praha, hl. m.":         "Praha, hl.${abbrSpace}m.", // check for abbr at the end of statement
  "(hl. m. Praha)":        "(hl.${abbrSpace}m. Praha)", // bracket & quotes variations
  "(Praha, hl. m.)":       "(Praha, hl.${abbrSpace}m.)", // bracket & quotes variations
  "(hl. m.)":              "(hl.${abbrSpace}m.)", // bracket & quotes variations
  "hl. m.":                "hl.${abbrSpace}m.", // plain abbreviation
  "č., s., hl. m., str.,": "č., s., hl.${abbrSpace}m., str.,", // in a list of abbreviations
  "Dave Grohl. m. Praha":  "Dave Grohl. m. Praha", // false positive for not catching abbr. in a word
  "Sliačhl. m. Praha":     "Sliačhl. m. Praha", // false positive for not catching abbr. in a non-latin word

  // triple word abbreviations
  "im Jahr 200 v. u. Z. als der Hunger": "im Jahr 200 v.${abbrSpace}u.${abbrSpace}Z. als der Hunger",
  "im Jahr 200 v.u.Z. als der Hunger":   "im Jahr 200 v.${abbrSpace}u.${abbrSpace}Z. als der Hunger",
  "im Jahr 200 v. u. Z.":                "im Jahr 200 v.${abbrSpace}u.${abbrSpace}Z.",
  "im Jahr 200 v.u.Z.":                  "im Jahr 200 v.${abbrSpace}u.${abbrSpace}Z.",
  "v. u. Z.":                            "v.${abbrSpace}u.${abbrSpace}Z.",
  "v.u.Z.":                              "v.${abbrSpace}u.${abbrSpace}Z.",

  // random abbreviations to randomly check various localization
  "1000 pr. n. l.":                               "1000 pr.${abbrSpace}n.${abbrSpace}l.",
  "im Jahr 200 v. Chr.":                          "im Jahr 200 v.${abbrSpace}Chr.",
  "Das Tier, d. h. der Fisch, lebte noch lange.": "Das Tier, d.${abbrSpace}h. der Fisch, lebte noch lange.",
  "Das Tier (d. h. der Fisch) lebte noch lange.": "Das Tier (d.${abbrSpace}h. der Fisch) lebte noch lange.",
  "т. зн. незвыкле":                              "т.${abbrSpace}зн. незвыкле",

  "the U.S.":  "the U.${abbrSpace}S.",
  "the U. S.": "the U.${abbrSpace}S.",

  ", e.g. something":    ", e.${abbrSpace}g. something",
  "(e.g. something":     "(e.${abbrSpace}g. something",
  "a e.g. something":    "a e.${abbrSpace}g. something",
  "abc\ne.g. something": "abc\ne.${abbrSpace}g. something",
  "e.g. 100 km":         "e.${abbrSpace}g. 100 km",
  "(e.g.)":              "(e.${abbrSpace}g.)",
  "(e.g. )":             "(e.${abbrSpace}g.)",
  "e. g.":               "e.${abbrSpace}g.",
  "e.g. 🥳":             "e.${abbrSpace}g. 🥳",
  "i. e. 🥳":            "i.${abbrSpace}e. 🥳",
  "a i.e. something":    "a i.${abbrSpace}e. something",
  "i.e. 100 km":         "i.${abbrSpace}e. 100 km",

  "4.20 p.m.":                  "4.20 p.${abbrSpace}m.",
  "4.20 p.m. in the afternoon": "4.20 p.${abbrSpace}m. in the afternoon",

  // Throwing extra space
  "We will continue tomorrow at 8:00 a.m.!": "We will continue tomorrow at 8:00 a.${abbrSpace}m.!",
  "8 a.m. is the right time":                "8 a.${abbrSpace}m. is the right time",

  // false positives
  "2 PMs":                    "2 PMs",
  "She is the PM of the UK.": "She is the PM of the UK.", // false positive
  "brie cheese":              "brie cheese", // false positive
  "Pam Grier":                "Pam Grier", // false positive
  "najkrajšie":               "najkrajšie", // false positive for non-latin boundaries
  "nevieš":                   "nevieš", // false positive for non-latin boundaries
  "ieš":                      "ieš", // false positive for non-latin boundaries
  "či e-mail marketing":      "či e-mail marketing", // false positive for non-latin boundaries
  "(i.e.)":                   "(i.${abbrSpace}e.)",
};

const multiWordAbbrUnitModuleSet = {
  "e.g. “something”":                               "e.${abbrSpace}g. “something”",
  "e.g. ‘something’":                               "e.${abbrSpace}g. ‘something’",
  "“We will continue tomorrow at 8:00 a.m.”":       "“We will continue tomorrow at 8:00 a.${abbrSpace}m.”",
  "e.g. ```something```":                           "e.${abbrSpace}g. ```something```",
  "e.g. `something`":                               "e.${abbrSpace}g. `something`",
  "“e. g.”":                                        "“e.${abbrSpace}g.”",
  "‘e. g.’":                                        "‘e.${abbrSpace}g.’",
  "Das Tier – d. i. der Fisch – lebte noch lange.": "Das Tier – d.${abbrSpace}i. der Fisch – lebte noch lange.",
};

supportedLocales.forEach((locale) => {
  let unitTestSet = multiWordAbbrSet;
  if (locale === "en-us") {
    unitTestSet = {
      ...multiWordAbbrSet,
      ...multiWordAbbrUnitModuleSet,
    };
  }

  createTestSuite(
    `Fix multiple-word abbreviations`,
    transformAbbrSet(unitTestSet, locale),
    (text) => fixMultipleWordAbbreviations(text, new Locale(locale)),
    transformAbbrSet(multiWordAbbrSet, locale),
    (text) => fixAbbreviations(text, new Locale(locale)),
    locale
  );
});

const singleWordAbbrSet = {
  /* General pattern for these locales assumes nbsp after abbreviation
   */
  "č. 5 žije":                    "č. 5 žije", // set nbsp
  "č.5 žije":                     "č. 5 žije", // add nbsp
  "preč č. 5 žije":               "preč č. 5 žije", // identify abbreviation word ending in non-latin character
  "áno, č. 5 žije":               "áno, č. 5 žije", // identify abbreviation after sentence punctuation
  "Prines kvetináč. 5 je číslo.": "Prines kvetináč. 5 je číslo.", //false positive where abbreviation is part of the previous sentence
  "(pp. 10–25)":                  "(pp. 10–25)", // abbr. in brackets

  "str. 38":  "str. 38", // other abbreviation example
  "str. 7":   "str. 7", // other abbreviation example
  "str. p":   "str. p", // other abbreviation example
  "tzv. rýč": "tzv. rýč", // other abbreviation example

  "10 č.":   "10 č.", // abbreviation at the end of the word
  "10 p.":   "10 p.", // abbreviation at the end of the word
  "10 str.": "10 str.", // abbreviation at the end of the word
  "(10 p.)": "(10 p.)", // abbreviation at the end of the word & in brackets
};

const singleWordAbbrFalsePositiveSet = {
  "4.20 p.m.":         "4.20 p.m.", // false positive
  "the U.S. and":      "the U.S. and",
  "t. č. 555-729-458": "t. č. 555-729-458", // do not correct single-word abbr. that's part of the multiple-word abbr
  "t. č. dačo":        "t. č. dačo", // do not correct single-word abbr. that's part of the multiple-word abbr (word variation)
};

supportedLocales.forEach((locale) => {
  createTestSuite(
    `Fix Single-word abbreviations`,
    transformAbbrSet({ ...singleWordAbbrSet, ...singleWordAbbrFalsePositiveSet }, locale),
    (text) => fixSingleWordAbbreviations(text, new Locale(locale)),
    transformAbbrSet(singleWordAbbrSet, locale),
    (text) => fixAbbreviations(text, new Locale(locale)),
    locale
  );
});

export const abbreviationsSet = {
  ...initialsSet,
  ...multiWordAbbrSet,
  ...singleWordAbbrSet,
};
