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

export const supportedLocales = Object.keys(SUPPORTED_LOCALES);

export default class Locale {
  constructor(localeID) {
    if (!SUPPORTED_LOCALES[localeID]) {
      console.warn(`Locale '${localeID}' not found, falling back to '${DEFAULT_LOCALE}'`);
      localeID = DEFAULT_LOCALE;
    }

    this.ID = localeID;

    this.openingSingleQuote = SUPPORTED_LOCALES[localeID].quotes.openingSingleQuote;
    this.closingSingleQuote = SUPPORTED_LOCALES[localeID].quotes.closingSingleQuote;
    this.openingDoubleQuote = SUPPORTED_LOCALES[localeID].quotes.openingDoubleQuote;
    this.closingDoubleQuote = SUPPORTED_LOCALES[localeID].quotes.closingDoubleQuote;
    this.terminalQuotes = this.closingSingleQuote + this.closingDoubleQuote;
    this.directSpeechIntro = SUPPORTED_LOCALES[localeID].directSpeechIntro;

    this.dashWords = SUPPORTED_LOCALES[localeID].dashWords;

    this.spaceAfter = SUPPORTED_LOCALES[localeID].spaceAfter;
    this.spaceBefore = SUPPORTED_LOCALES[localeID].spaceBefore;

    this.ordinalIndicator = SUPPORTED_LOCALES[localeID].numbers.ordinalIndicator;
    this.romanOrdinalIndicator = SUPPORTED_LOCALES[localeID].numbers.romanOrdinalIndicator;
    this.ordinalDate = SUPPORTED_LOCALES[localeID].ordinalDate;

    /* Single-word abbreviations from all locales

       Make a list of Single-word abbreviations from all locales
    */
    this.singleWordAbbreviations = [];
    for (const locale in SUPPORTED_LOCALES) {
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        SUPPORTED_LOCALES[locale].singleWordAbbreviations
      );
    }

    /* Multiple-word abbreviations from all locales

       Make a list of multiple-word abbreviations from all locales
    */
    this.multipleWordAbbreviations = [];
    for (const locale in SUPPORTED_LOCALES) {
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        SUPPORTED_LOCALES[locale].multipleWordAbbreviations
      );
    }

    /* Direct speech intro adepts from all locales

       Collect all unique direct speech intro characters from all locales and create a string to be used in regex.
    */
    const directSpeechIntros = [];
    for (const locale in SUPPORTED_LOCALES) {
      const intro = SUPPORTED_LOCALES[locale].directSpeechIntro;
      if (intro && !directSpeechIntros.includes(intro)) {
        directSpeechIntros.push(intro);
      }
    }
    this.directSpeechIntroAdepts = directSpeechIntros.join("");
  }
}
