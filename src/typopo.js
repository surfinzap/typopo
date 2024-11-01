/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2024 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
import Locale from "./locale/locale";
import {removeEmptyLines} from "./modules/whitespace/lines";
import {fixNbsp} from "./modules/whitespace/nbsp";
import {fixSpaces} from "./modules/whitespace/spaces";
import {fixPeriod} from "./modules/punctuation/period";
import {fixEllipsis} from "./modules/punctuation/ellipsis";
import {fixHyphen} from "./modules/punctuation/hyphen";
import {fixDash} from "./modules/punctuation/dash";
import {fixDoubleQuotesAndPrimes} from "./modules/punctuation/double-quotes";
import {fixSingleQuotesPrimesAndApostrophes} from "./modules/punctuation/single-quotes";
import {fixMultiplicationSign} from "./modules/symbols/multiplication-sign";
import {fixSectionSign} from "./modules/symbols/section-sign";
import {fixCopyrights} from "./modules/symbols/copyrights";
import {fixPlusMinus} from "./modules/symbols/plus-minus";
import {fixMarks} from "./modules/symbols/marks";
import {fixExponents} from "./modules/symbols/exponents";
import {fixNumberSign} from "./modules/symbols/number-sign";
import {fixAbbreviations} from "./modules/words/abbreviations";
import {fixCase} from "./modules/words/case";
import {fixPubId} from "./modules/words/pub-id";
import {excludeExceptions,
        placeExceptions} from "./modules/words/exceptions";


/*
  Correct typos

  @param {string} string — input text for correction
  @param {locale} string — (optional, default: en) supported languages: en, sk, cs, rue.
  @param {configuration} object — (optional) configuration
  @returns {string} corrected output
*/
export function fixTypos(string, locale, configuration) {
  locale = (typeof locale === "undefined") ? "en-us" : locale;

  let currentLocale = new Locale(locale);

  configuration = (typeof configuration === "undefined") ? {
    removeLines : true,
    removeWhitespacesBeforeMarkdownList : true,
    keepMarkdownCodeBlocks : false,
  } : configuration;

  // exclude exceptions from fixing
  const { processedText, exceptions } = excludeExceptions(string, currentLocale);
  string = processedText;


  if(configuration.removeLines) {
    string = removeEmptyLines(string);
  }

  // ellipsis (since it can have different spacing around, it has to go before spaces cleanup)
  string = fixEllipsis(string, currentLocale);

  // spaces cleanup
  string = fixSpaces(string, currentLocale, configuration);

  // punctuation
  string = fixPeriod(string);
  string = fixDash(string, currentLocale);
  string = fixHyphen(string, currentLocale);
  string = fixSingleQuotesPrimesAndApostrophes(string, currentLocale, configuration);
  string = fixDoubleQuotesAndPrimes(string, currentLocale, configuration);

  // symbols
  string = fixMultiplicationSign(string, currentLocale);
  string = fixSectionSign(string, currentLocale);
  string = fixCopyrights(string, currentLocale);
  string = fixPlusMinus(string, currentLocale);
  string = fixMarks(string, currentLocale);
  string = fixExponents(string, currentLocale);
  string = fixNumberSign(string, currentLocale);

  // words
  string = fixCase(string, currentLocale);
  string = fixAbbreviations(string, currentLocale);
  string = fixPubId(string, currentLocale);

  // spaces
  string = fixNbsp(string, currentLocale);

  // place excluded exceptions
  string = placeExceptions(string, exceptions);

  return string;
}
