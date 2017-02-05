/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

import constants from "./lib/constants";
import {removeEmptyLines} from "./lib/rhythm/lines";
import {fixNbsp} from "./lib/rhythm/nbsp";
import {fixSpaces} from "./lib/rhythm/spaces";
import {fixPeriod} from "./lib/punctuation/period";
import {fixEllipsis} from "./lib/punctuation/ellipsis";
import {fixHyphen} from "./lib/punctuation/hyphen";
import {fixDash} from "./lib/punctuation/dash";
import {fixDoubleQuotesAndPrimes} from "./lib/punctuation/double-quotes";
import {fixSingleQuotesPrimesAndApostrophes} from "./lib/punctuation/single-quotes";
import {replaceSymbols} from "./lib/symbols/replacements";
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
export function correct_typos(string, locale, configuration) {
	locale = (typeof locale === "undefined") ? "en" : locale;

	configuration = (typeof configuration === "undefined") ? {
		removeLines : true,
	} : configuration;

	string = excludeExceptions(string);

	if(configuration.removeLines) {
		string = removeEmptyLines(string);
	}
	string = fixSpaces(string);

	string = fixPeriod(string);
	string = fixEllipsis(string);
	string = fixDash(string, locale);
	string = fixHyphen(string);
	string = fixDoubleQuotesAndPrimes(string, locale);
	string = fixSingleQuotesPrimesAndApostrophes(string, locale);

	string = replaceSymbols(string);
	string = fixMultiplicationSign(string);

	string = fixCase(string);
	string = fixAbbreviations(string);

	string = fixNbsp(string);

	string = placeExceptions(string);

	return string;
}
