/*!
 * Typopo v2.5.8 (https://typopo.org)
 * Copyright 2015–2025 Braňo Šandala (https://brano.me)
 * Licensed under MIT (https://github.com/surfinzap/typopo/blob/main/LICENSE.txt)
 */
import Locale from "./locale/locale.js";
import { removeEmptyLines } from "./modules/whitespace/lines.js";
import { fixNbsp } from "./modules/whitespace/nbsp.js";
import { fixSpaces } from "./modules/whitespace/spaces.js";
import { fixPeriod } from "./modules/punctuation/period.js";
import { fixEllipsis } from "./modules/punctuation/ellipsis.js";
import { fixHyphen } from "./modules/punctuation/hyphen.js";
import { fixDash } from "./modules/punctuation/dash.js";
import { fixDoubleQuotesAndPrimes } from "./modules/punctuation/double-quotes.js";
import { fixSingleQuotesPrimesAndApostrophes } from "./modules/punctuation/single-quotes.js";
import { fixMultiplicationSign } from "./modules/symbols/multiplication-sign.js";
import { fixSectionSign } from "./modules/symbols/section-sign.js";
import { fixCopyrights } from "./modules/symbols/copyrights.js";
import { fixNumeroSign } from "./modules/symbols/numero-sign.js";
import { fixPlusMinus } from "./modules/symbols/plus-minus.js";
import { fixMarks } from "./modules/symbols/marks.js";
import { fixExponents } from "./modules/symbols/exponents.js";
import { fixNumberSign } from "./modules/symbols/number-sign.js";
import { fixAbbreviations } from "./modules/words/abbreviations.js";
import { fixCase } from "./modules/words/case.js";
import { fixPubId } from "./modules/words/pub-id.js";
import { excludeExceptions, placeExceptions } from "./modules/words/exceptions.js";

/*
  Correct typos

  @param {string} string — input text for correction
  @param {locale} string — (optional, default: en) supported languages: en, sk, cs, rue.
  @param {configuration} object — (optional) configuration
  @returns {string} corrected output
*/
export function fixTypos(string, locale, configuration) {
  locale = typeof locale === "undefined" ? "en-us" : locale;

  let currentLocale = new Locale(locale);

  configuration =
    typeof configuration === "undefined"
      ? {
          removeLines:                         true,
          removeWhitespacesBeforeMarkdownList: true,
          keepMarkdownCodeBlocks:              false,
        }
      : configuration;

  // exclude exceptions from fixing
  const { processedText, exceptions } = excludeExceptions(string);
  string = processedText;

  if (configuration.removeLines) {
    string = removeEmptyLines(string);
  }

  // ellipsis (since it can have different spacing around, it has to go before spaces cleanup)
  string = fixEllipsis(string, currentLocale);

  // spaces cleanup
  string = fixSpaces(string, currentLocale, configuration);

  // punctuation
  string = fixPeriod(string);
  string = fixDash(string, currentLocale);
  string = fixHyphen(string);
  string = fixSingleQuotesPrimesAndApostrophes(string, currentLocale, configuration);
  string = fixDoubleQuotesAndPrimes(string, currentLocale, configuration);

  // symbols
  string = fixMultiplicationSign(string);
  string = fixSectionSign(string, currentLocale);
  string = fixCopyrights(string, currentLocale);
  string = fixNumeroSign(string, currentLocale);
  string = fixPlusMinus(string);
  string = fixMarks(string);
  string = fixExponents(string);
  string = fixNumberSign(string);

  // words
  string = fixCase(string);
  string = fixAbbreviations(string, currentLocale);
  string = fixPubId(string);

  // spaces
  string = fixNbsp(string, currentLocale);

  // place excluded exceptions
  string = placeExceptions(string, exceptions);

  return string;
}
