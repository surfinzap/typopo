// import loc from "../locale/locale.js";

import { cs } from "./cs.js";
import { enUS } from "./en-us.js";
import { rue } from "./rue.js";
import { sk } from "./sk.js";
import { deDE } from "./de-de.js";

const SUPPORTED_LOCALES = {
  "cs":    cs,
  "en-us": enUS,
  "rue":   rue,
  "sk":    sk,
  "de-de": deDE,
};

const DEFAULT_LOCALE = "en-us";

export default class Locale {
  constructor(localeID) {
    if (!SUPPORTED_LOCALES[localeID]) {
      console.warn(`Locale '${localeID}' not found, falling back to '${DEFAULT_LOCALE}'`);
      localeID = DEFAULT_LOCALE;
    }

    this.ID = localeID;

    this.leftSingleQuote = SUPPORTED_LOCALES[localeID].quotes.leftSingleQuote;
    this.rightSingleQuote = SUPPORTED_LOCALES[localeID].quotes.rightSingleQuote;
    this.leftDoubleQuote = SUPPORTED_LOCALES[localeID].quotes.leftDoubleQuote;
    this.rightDoubleQuote = SUPPORTED_LOCALES[localeID].quotes.rightDoubleQuote;
    this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote;

    this.dashWords = SUPPORTED_LOCALES[localeID].dashWords;

    this.spaceAfter = SUPPORTED_LOCALES[localeID].spaceAfter;
    this.spaceBefore = SUPPORTED_LOCALES[localeID].spaceBefore;

    this.ordinalIndicator = SUPPORTED_LOCALES[localeID].numbers.ordinalIndicator;
    this.romanOrdinalIndicator = SUPPORTED_LOCALES[localeID].numbers.romanOrdinalIndicator;
    this.ordinalDate = SUPPORTED_LOCALES[localeID].ordinalDate;

    this.abbreviationSpace = SUPPORTED_LOCALES[localeID].abbreviationSpace;

    /* Single-word abbreviations from all locales

       Make a list of Single-word abbreviations from all locales
    */
    this.singleWordAbbreviations = [];
    for (const locale in SUPPORTED_LOCALES) {
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        SUPPORTED_LOCALES[locale].singleWordAbbreviations
      );
    }

    /* multiple-word abbreviations from all locales

       Make a list of multiple-word abbreviations from all locales
    */
    this.multipleWordAbbreviations = [];
    for (const locale in SUPPORTED_LOCALES) {
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        SUPPORTED_LOCALES[locale].multipleWordAbbreviations
      );
    }
  }
}
