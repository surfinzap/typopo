/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

import Locale from "./locale/locale";
import {removeEmptyLines} from "./lib/whitespace/lines";
import {fixNbsp} from "./lib/whitespace/nbsp";
import {fixSpaces} from "./lib/whitespace/spaces";
import {fixPeriod} from "./lib/punctuation/period";
import {fixEllipsis} from "./lib/punctuation/ellipsis";
import {fixHyphen} from "./lib/punctuation/hyphen";
import {fixDash} from "./lib/punctuation/dash";
import {fixDoubleQuotesAndPrimes} from "./lib/punctuation/double-quotes";
import {fixSingleQuotesPrimesAndApostrophes} from "./lib/punctuation/single-quotes";
import {fixSymbols} from "./lib/symbols/replacements";
import {fixMultiplicationSign} from "./lib/symbols/multiplication-sign";
import {fixAbbreviations} from "./lib/words/abbreviations";
import {fixCase} from "./lib/words/case";
import {excludeExceptions,
				placeExceptions} from "./lib/words/exceptions";


/*
	Correct typos

	@param {string} string — input text for correction
	@param {locale} string — (optional, default: en) supported languages: en, sk, cs, rue.
	@param {configuration} object — (optional) configuration
	@returns {string} corrected output
*/
export function fixTypos(string, locale, configuration) {
	currentLocale = (typeof locale === "undefined") ? "en-us" : locale;

	let currentLocale = new Locale(locale);

	configuration = (typeof configuration === "undefined") ? {
		removeLines : true,
	} : configuration;

	string = excludeExceptions(string, currentLocale);

	if(configuration.removeLines) {
		string = removeEmptyLines(string);
	}
	string = fixSpaces(string, currentLocale);

	string = fixPeriod(string);
	string = fixEllipsis(string, currentLocale);
	string = fixDash(string, currentLocale);
	string = fixHyphen(string, currentLocale);
	string = fixDoubleQuotesAndPrimes(string, currentLocale);
	string = fixSingleQuotesPrimesAndApostrophes(string, currentLocale);

	string = fixSymbols(string);
	string = fixMultiplicationSign(string, currentLocale);

	string = fixCase(string, currentLocale);
	string = fixAbbreviations(string, currentLocale);

	string = fixNbsp(string, currentLocale);

	string = placeExceptions(string);

	return string;
}
