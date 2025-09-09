// import loc from "../locale/locale.js";

import localeCs from "./cs.js";
import localeEnUs from "./en-us.js";
import localeRue from "./rue.js";
import localeSk from "./sk.js";
import localeDeDe from "./de-de.js";

const typopoLocale = {
  "cs":    localeCs,
  "en-us": localeEnUs,
  "rue":   localeRue,
  "sk":    localeSk,
  "de-de": localeDeDe,
};

export default class Locale {
  constructor(locale) {
    this.locale = locale;

    this.leftSingleQuote = typopoLocale[locale].quotes.leftSingleQuote;
    this.rightSingleQuote = typopoLocale[locale].quotes.rightSingleQuote;
    this.leftDoubleQuote = typopoLocale[locale].quotes.leftDoubleQuote;
    this.rightDoubleQuote = typopoLocale[locale].quotes.rightDoubleQuote;
    this.terminalQuotes = this.rightSingleQuote + this.rightDoubleQuote;

    this.ordinalIndicator = typopoLocale[locale].numbers.ordinalIndicator;
    this.romanOrdinalIndicator = typopoLocale[locale].numbers.romanOrdinalIndicator;

    /* Single-word abbreviations from all locales

       Make a list of Single-word abbreviations from all locales
    */
    this.singleWordAbbreviations = [];
    for (locale in typopoLocale) {
      this.singleWordAbbreviations = this.singleWordAbbreviations.concat(
        typopoLocale[locale].singleWordAbbreviations
      );
    }

    /* multiple-word abbreviations from all locales

       Make a list of multiple-word abbreviations from all locales
    */
    this.multipleWordAbbreviations = [];
    for (locale in typopoLocale) {
      this.multipleWordAbbreviations = this.multipleWordAbbreviations.concat(
        typopoLocale[locale].multipleWordAbbreviations
      );
    }
  }
}
