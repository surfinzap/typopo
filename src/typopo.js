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
import {fixDoubleQuotesAndPrimes} from "./lib/punctuation/double-quotes";
import {fixSingleQuotesPrimesAndApostrophes} from "./lib/punctuation/single-quotes";
import {replaceSymbols} from "./lib/symbols/replacements";
import {fixMultiplicationSign} from "./lib/symbols/multiplication-sign";
import {fixAbbreviations} from "./lib/words/abbreviations";
import {fixCase} from "./lib/words/case";
import {excludeExceptions,
				placeExceptions} from "./lib/words/exceptions";





/*
	Replaces hyphen with em or en dash

	Algorithm
	[1] Replace 3 consecutive hyphens (---) with an em dash (—)
	[2] Replace 2 consecutive hyphens (--) with an en dash (—)
	[3] Replace any hyphen or dash surrounded with spaces with an em dash
	[4] Replace hyphen or dash used in number range with an en dash
			and set proper spacing

	@param {string} string — input text for identification
	@returns {string} — output with dashes instead of hyphens
*/
function replace_hyphen_with_dash(string, language) {
	var dashes = "-–—"; // including a hyphen

	/* [1] Replace 3 consecutive hyphens (---) with an em dash (—) */
	string = string.replace(/(---)/g, "—");


	/* [2] Replace 2 consecutive hyphens (--) with an en dash (—) */
	string = string.replace(/(--)/g, "–");


	/* [3] Replace any hyphen or dash surrounded with spaces with an em dash */
	var pattern = "[" + constants.spaces + "][" + dashes + "][" + constants.spaces + "]";
	var re = new RegExp(pattern, "g");
	var replacement = constants.narrowNbsp + "—" + constants.hairSpace;
	string = string.replace(re, replacement);

	/* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
					 with an en dash; including cases when there is an extra space
					 from either one side or both sides of the dash */
	var cardinal_number = "\\d+";
	pattern = "(" + cardinal_number + ")([" + constants.spaces + "]?[" + dashes + "][" + constants.spaces + "]?)(" + cardinal_number + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1–$3");


	/* [4.2] Replace hyphen or dash, placed between 2 ordinal numbers,
					 with an en dash; including cases when there is an extra space
					 from either one side or both sides of the dash */
	var ordinal_indicator = "";
	switch (language) {
		case "rue":
		case "sk":
		case "cs":
			ordinal_indicator = "\\.";
			break;
		case "en":
			ordinal_indicator = "st|nd|rd|th";
			break;
	}
	pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + constants.spaces + "]?[" + dashes + "][" + constants.spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "$1$2–$4$5");

	return string;
}








/*
	Correct typos in the predefined order


	@param {string} string — input text for correction
	@param {language} string — language option to correct specific typos; supported languages: en, sk, cs, rue. if not specified, English typos are corrected
	@param {remove_lines} boolean — optional parameter allowing you to choose whether to remove empty lines or not
	@returns {string} — corrected output
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
	string = replace_hyphen_with_dash(string, locale);
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
