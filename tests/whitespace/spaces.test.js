import {
  removeMultipleSpaces,
  removeSpacesAtParagraphBeginning,
  removeSpaceBeforeSentencePausePunctuation,
  removeSpaceBeforeTerminalPunctuation,
  removeSpaceBeforeOrdinalIndicator,
  removeSpaceAfterOpeningBrackets,
  addSpaceBeforeOpeningBrackets,
  addSpaceAfterTerminalPunctuation,
  addSpaceAfterSentencePause,
  addSpaceAfterClosingBrackets,
  removeSpacesAtParagraphEnd,
  addSpaceBeforeSymbol,
  fixSpaces,
} from "../../src/modules/whitespace/spaces.js";
import { createTestSuite } from "../test-utils.js";
import Locale, { supportedLocales } from "../../src/locale/locale.js";

const configRemoveWhitespacesBeforeParagraphs = {
  removeWhitespacesBeforeMarkdownList: true,
};

const configKeepWhitespacesBeforeMarkdownList = {
  removeWhitespacesBeforeMarkdownList: false,
};

const multipleSpacesSet = {
  /* Remove multiple spaces with a single one,
     even non-breaking spaces and others */
  "How  many spaces": "How many spaces",
  "How   many":       "How many",
  "How    many":      "How many",
  "How     many":     "How many",
  "How       many":   "How many", // test includes nbsp
  "How      many":    "How many", // test includes hairSpace
  "How       many":   "How many", // test includes narrowNbsp
  "Howč     čmany":   "Howč čmany", // non-latin character
};

createTestSuite(
  "Replace multiple spaces with a single one",
  multipleSpacesSet,
  removeMultipleSpaces,
  {},
  fixSpaces,
  supportedLocales
);

const removeSpacesBeforeTextSet = {
  " What if paragraph starts with extra space at the beginning?":
    "What if paragraph starts with extra space at the beginning?",

  "  What if paragraph starts with extra space at the beginning?":
    "What if paragraph starts with extra space at the beginning?",

  "   What if paragraph starts with extra space at the beginning?":
    "What if paragraph starts with extra space at the beginning?",

  "    What if paragraph starts with extra space at the beginning?":
    "What if paragraph starts with extra space at the beginning?", // including nbsp

  "\t\t\tWhat if paragraph starts with extra space at the beginning?":
    "What if paragraph starts with extra space at the beginning?", // including hairSpace

  "\t\tWhat if paragraph starts with extra space at the beginning?":
    "What if paragraph starts with extra space at the beginning?", // including narrowNbsp

  "One sentence ends. And next one continues as it should":
    "One sentence ends. And next one continues as it should",

  /* removing tabs as well*/
  "			What if sentence starts with tabs?": "What if sentence starts with tabs?",
  "		What if sentence starts with tabs?":  "What if sentence starts with tabs?",
  "	What if sentence starts with tabs?":   "What if sentence starts with tabs?",

  // double-check, that single new lines are not removed
  "If there is one line\nand another": "If there is one line\nand another",
};

const removeSpacesBeforeMarkdownListSet = {
  " - list":    "- list",
  "  - list":   "- list",
  "\t- list":   "- list",
  "\t\t- list": "- list",
  " * list":    "* list",
  "  * list":   "* list",
  "\t\t* list": "* list",
  "\t* list":   "* list",
  " * list":    "* list", //nbsp
  "* list":     "* list", //narrowNbsp
  " + list":    "+ list",
  "  + list":   "+ list",
  "\t+ list":   "+ list",
  "\t\t+ list": "+ list",
  " > list":    "> list",
  "  > list":   "> list",
  "\t> list":   "> list",
  "\t\t> list": "> list",
};

const keepSpacesBeforeMarkdownListSet = {
  " - list":    " - list",
  "   - list":  "   - list",
  "\t- list":   "\t- list",
  "\t\t- list": "\t\t- list",
  " * list":    " * list",
  "   * list":  "   * list",
  "\t\t* list": "\t\t* list",
  "\t* list":   "\t* list",
  " * list":    " * list", //nbsp
  " * list":    " * list", //narrowNbsp
  " > list":    " > list",
  "   > list":  "   > list",
  "\t\t> list": "\t\t> list",
  "\t> list":   "\t> list",
  " > list":    " > list", //nbsp
  " > list":    " > list", //narrowNbsp
};

createTestSuite(
  "Remove spaces and tabs at beginning of the paragraph",
  { ...removeSpacesBeforeTextSet, ...removeSpacesBeforeMarkdownListSet },
  (text) => removeSpacesAtParagraphBeginning(text, configRemoveWhitespacesBeforeParagraphs),
  {},
  (text, locale) => fixSpaces(text, locale, configRemoveWhitespacesBeforeParagraphs),
  supportedLocales
);

createTestSuite(
  "Remove spaces and tabs at beginning of the paragraph, but keep spaces and tabs at the beginning of markdown lists (indicated as -/*)",
  { ...removeSpacesBeforeTextSet, ...keepSpacesBeforeMarkdownListSet },
  (text) => removeSpacesAtParagraphBeginning(text, configKeepWhitespacesBeforeMarkdownList),
  {},
  (text, locale) => fixSpaces(text, locale, configKeepWhitespacesBeforeMarkdownList),
  supportedLocales
);

const spacesBeforeSentencePauseSet = {
  "Hey , man.":                     "Hey, man.",
  "Hey , man.":                     "Hey, man.", // nbsp
  "Hey , man.":                     "Hey, man.", // hairSpace
  "Hey , man.":                     "Hey, man.", // narrowNbsp
  "Sentence and… :":                "Sentence and…:",
  "Sentence and… , else":           "Sentence and…, else",
  "Sentence and… ; else":           "Sentence and…; else",
  "Keep space before emoticon :)":  "Keep space before emoticon :)", // false positive
  "Keep space before emoticon :-)": "Keep space before emoticon :-)", // false positive
};

createTestSuite(
  "Remove space before sentence pause-punctuation",
  spacesBeforeSentencePauseSet,
  removeSpaceBeforeSentencePausePunctuation,
  {},
  fixSpaces,
  supportedLocales
);

const spacesBeforeTerminalPunctuationSet = {
  "Hey.":                                "Hey.", // correct
  "Hey .":                               "Hey.",
  "Hey .":                               "Hey.", // nbsp
  "Hey .":                               "Hey.", // hairSpace
  "Hey .":                               "Hey.", // narrownbsp
  "Sentence and…!":                      "Sentence and…!", // correct
  "Sentence and… !":                     "Sentence and…!",
  "Sentence and…?":                      "Sentence and…?", // correct
  "Sentence and… ?":                     "Sentence and…?",
  "Something (…) something else":        "Something (…) something else", //correct
  "Something (… ) something else":       "Something (…) something else",
  "Something [… ] something else":       "Something […] something else",
  "(? )":                                "(?)",
  "(! )":                                "(!)",
  "It was good (It was bad !).":         "It was good (It was bad!).",
  "5°":                                  "5°", //correct
  "5 °":                                 "5°",
  // false positives
  "Sentence ended. …and we were there.": "Sentence ended. …and we were there.",

  // false positives, keep space in empty bracket set
  "[ ]": "[ ]",
  "[ ]": "[ ]",
  "( )": "( )",
  "{ }": "{ }",
};

createTestSuite(
  "Remove space before a terminal punctuation, closing brackets and a degree symbol",
  spacesBeforeTerminalPunctuationSet,
  removeSpaceBeforeTerminalPunctuation,
  {},
  fixSpaces,
  supportedLocales
);

const ordinalIndicatorEnUsSet = {
  "1 st":                  "1st",
  "2 nd":                  "2nd",
  "3 rd":                  "3rd",
  "4 th attempt":          "4th attempt",
  "104 th":                "104th",
  // false positives
  "Number 4 there you go": "Number 4 there you go",
};

createTestSuite(
  "Remove space before ordinal indicator (en-us)",
  ordinalIndicatorEnUsSet,
  (text) => removeSpaceBeforeOrdinalIndicator(text, new Locale("en-us")),
  {},
  (text, locale) => fixSpaces(text, locale),
  "en-us"
);

const ordinalIndicatorOtherLocalesSet = {
  "1 . spoj":   "1. spoj",
  "154 . spoj": "154. spoj",
};

createTestSuite(
  "Remove space before ordinal indicator (sk, cs, rue, de-de)",
  ordinalIndicatorOtherLocalesSet,
  (text) => removeSpaceBeforeOrdinalIndicator(text, new Locale("sk")),
  {},
  (text, locale) => fixSpaces(text, locale),
  ["sk", "cs", "rue", "de-de"]
);

const spacesAfterOpeningBracketsSet = {
  "Something ( …) something else": "Something (…) something else",
  "Something [ …] something else": "Something […] something else",
  "word ( word) word":             "word (word) word",
  "( ?)":                          "(?)",
  "( !)":                          "(!)",
  "{ !}":                          "{!}",

  // false positives, keep space in empty bracket set
  "[ ]": "[ ]",
  "[ ]": "[ ]",
  "( )": "( )",
  "{ }": "{ }",
};

createTestSuite(
  "Remove space after opening brackets",
  spacesAfterOpeningBracketsSet,
  removeSpaceAfterOpeningBrackets,
  {},
  fixSpaces,
  supportedLocales
);

const spacesBeforeOpeningBracketsSet = {
  "Enclosed(in) the brackets.":   "Enclosed (in) the brackets.",
  "Enclosed[in] the brackets.":   "Enclosed [in] the brackets.",
  "quote[…] with parts left out": "quote […] with parts left out",
  "Enclosed{in} the brackets.":   "Enclosed {in} the brackets.",
  "name(s)":                      "name(s)", // false positive
  "NAME(S)":                      "NAME(S)", // false positive
  "mass(es)":                     "mass(es)", // false positive
  "MASS(ES)":                     "MASS(ES)", // false positive
};

createTestSuite(
  "Add space before opening brackets",
  spacesBeforeOpeningBracketsSet,
  addSpaceBeforeOpeningBrackets
);

const spacesAfterTerminalPunctuationSet = {
  "One sentence ended. Another started.": "One sentence ended. Another started.", // correct
  "One sentence ended.Another started.":  "One sentence ended. Another started.",
  "One sentence ended!Another started.":  "One sentence ended! Another started.",
  "One sentence ended…!Another started.": "One sentence ended…! Another started.",
  "One sentence ended?Another started.":  "One sentence ended? Another started.",

  // false positives
  "R-N.D.":            "R-N.D.",
  "the U.S.":          "the U.S.",
  "John Thune (S.D.)": "John Thune (S.D.)",
  "filename.js":       "filename.js",
};

createTestSuite(
  "Add space after terminal punctuation",
  spacesAfterTerminalPunctuationSet,
  addSpaceAfterTerminalPunctuation,
  {},
  (text, locale) => fixSpaces(text, locale),
  supportedLocales
);

const spacesAfterSentencePauseSet = {
  "One sentence ended, another started.": "One sentence ended, another started.", //correct
  "One sentence ended,another started.":  "One sentence ended, another started.",
  "One sentence ended,John started.":     "One sentence ended, John started.",
  "One sentence ended…,John started.":    "One sentence ended…, John started.",
  "One sentence ended:another started.":  "One sentence ended: another started.",
  "One sentence ended;another started.":  "One sentence ended; another started.",

  //false positives
  "R-N.D.":            "R-N.D.",
  "the U.S.":          "the U.S.",
  "John Thune (S.D.)": "John Thune (S.D.)",
  "filename.js":       "filename.js",
};

createTestSuite(
  "Add a space after sentence pause punctuation",
  spacesAfterSentencePauseSet,
  addSpaceAfterSentencePause,
  {},
  (text, locale) => fixSpaces(text, locale),
  supportedLocales
);

const spacesAfterClosingBracketsSet = {
  "Enclosed (in) the brackets.":  "Enclosed (in) the brackets.", // correct
  "Enclosed (in)the brackets.":   "Enclosed (in) the brackets.",
  "Enclosed [in] the brackets.":  "Enclosed [in] the brackets.", // correct
  "Enclosed [in]the brackets.":   "Enclosed [in] the brackets.",
  "Enclosed {in} the brackets.":  "Enclosed {in} the brackets.", // correct
  "Enclosed {in}the brackets.":   "Enclosed {in} the brackets.",
  "quote […]with parts left out": "quote […] with parts left out",
};

createTestSuite(
  "Add a space after closing brackets",
  spacesAfterClosingBracketsSet,
  addSpaceAfterClosingBrackets,
  {},
  (text, locale) => fixSpaces(text, locale),
  supportedLocales
);

const trailingSpacesSet = {
  "trailing spaces    ":                          "trailing spaces",
  "trailing spaces    ":                          "trailing spaces", // nbsp
  "trailing spaces ":                             "trailing spaces", // hairSpace
  "trailing spaces  ":                            "trailing spaces", // narrowNbsp
  "trailing spaces\t\t":                          "trailing spaces", // narrowNbsp
  "trailing spaces.    ":                         "trailing spaces.",
  "trailing spaces;    ":                         "trailing spaces;",
  "first line    \nsecond line  ":                "first line\nsecond line",
  "first line    \nsecond line  \nthird line   ": "first line\nsecond line\nthird line",
  "Радостна комната —  ":                         "Радостна комната —",
};

createTestSuite(
  "Remove trailing spaces",
  trailingSpacesSet,
  removeSpacesAtParagraphEnd,
  {},
  (text, locale) => fixSpaces(text, locale),
  supportedLocales
);

const spacesBeforeSymbolSet = {
  "© 2017":        "© 2017",
  "(© 2017)":      "(© 2017)",
  "Company© 2017": "Company © 2017",

  // Punctuation contexts
  "text.©1": "text. ©1",
  "text,©1": "text, ©1",
  "text;©1": "text; ©1",
  "text:©1": "text: ©1",
  "text!©1": "text! ©1",
  "text?©1": "text? ©1",

  // Special character contexts
  "#©1":       "# ©1",
  "@©section": "@ ©section",
  "*©note":    "* ©note",
  "&©clause":  "& ©clause",
  "%©rate":    "% ©rate",
  "$©cost":    "$ ©cost",

  // Quote contexts
  '"text"©1': '"text" ©1',
  "'text'©1": "'text' ©1",
  "`code`©1": "`code` ©1",

  // Bracket edge cases
  "(©1)": "(©1)",
  "[©1]": "[©1]",
  "{©1}": "{©1}",

  // Start/end of string
  "©1 text":    "©1 text",
  "text ©1111": "text ©1111",
};

createTestSuite("Add space before a symbol, e.g. ©", spacesBeforeSymbolSet, (text) =>
  addSpaceBeforeSymbol(text, "©", new Locale("en-us"))
);

export const spacesSet = {
  ...multipleSpacesSet,
  ...removeSpacesBeforeTextSet,
  ...spacesBeforeSentencePauseSet,
  ...spacesBeforeTerminalPunctuationSet,
  // ...ordinalIndicator has unit tests only
  ...spacesAfterOpeningBracketsSet,
  ...spacesAfterTerminalPunctuationSet,
  ...spacesAfterSentencePauseSet,
  ...spacesAfterClosingBracketsSet,
  ...trailingSpacesSet,
  // spacesBeforeSymbol tested extensively with specific symbols
};
