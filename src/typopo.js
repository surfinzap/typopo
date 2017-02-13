/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

import Constants from "./lib/constants";
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
	locale = (typeof locale === "undefined") ? "en-us" : locale;

	const constants = new Constants(locale);

	configuration = (typeof configuration === "undefined") ? {
		removeLines : true,
	} : configuration;

	string = excludeExceptions(string, constants);

	if(configuration.removeLines) {
		string = removeEmptyLines(string);
	}
	string = fixSpaces(string, constants);

	string = fixPeriod(string);
	string = fixEllipsis(string, constants);
	string = fixDash(string, constants);
	string = fixHyphen(string, constants);
	string = fixDoubleQuotesAndPrimes(string, constants);
	string = fixSingleQuotesPrimesAndApostrophes(string, constants);

	string = fixSymbols(string);
	string = fixMultiplicationSign(string, constants);

	string = fixCase(string, constants);
	string = fixAbbreviations(string, constants);

	string = fixNbsp(string, constants);

	string = placeExceptions(string);

	return string;
}
