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
import {fixSpaces} from "./lib/rhythm/spaces";
import {replaceSymbols} from "./lib/symbol-replacements";
import {fixPeriod} from "./lib/punctuation/period";
import {fixEllipsis} from "./lib/punctuation/ellipsis";
import {fixDoubleQuotesAndPrimes} from "./lib/punctuation/double-quotes";
import {fixSingleQuotesPrimesAndApostrophes} from "./lib/punctuation/single-quotes";
import {fixAbbreviations} from "./lib/words/abbreviations";


var exceptions = [];


function correct_multiple_sign(string) {
	return remove_multiple_spaces(string.replace(/([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, "$1 × $3"));
}



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



function replace_dash_with_hyphen(string){
	var pattern = "(["+ constants.lowercaseChars +"])([–—])(["+ constants.lowercaseChars +"])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}






/*----------------------------------------------------------------------------*\
	Consolidation of spaces
\*----------------------------------------------------------------------------*/











/*
	Consolidates the use of non-breaking spaces

	* removes characters between multi-character words
	* adds non-breaking spaces after cardinal numbers
	* adds non-breaking spaces around ×
	* adds non-breaking spaces after single-character prepositions

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
function consolidate_nbsp(string) {

	// removes non-breaking spaces between multi-character words
	var pattern = "(["+ constants.lowercaseChars + constants.uppercaseChars +"]{2,})(["+ constants.nbsp + constants.narrowNbsp +"])(["+ constants.lowercaseChars + constants.uppercaseChars +"]{2,})";
	var re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


	// adds non-breaking spaces after cardinal numbers
	pattern = "([0-9]+)( )(["+ constants.lowercaseChars + constants.uppercaseChars +"]+)";
	re = new RegExp(pattern, "g");
	var replacement = "$1" + constants.nbsp + "$3";
	string =  string.replace(re, replacement);


	// adds non-breaking spaces around ×
	pattern = "([" + constants.spaces + "])([×])([" + constants.spaces + "])";
	re = new RegExp(pattern, "g");
	replacement = constants.nbsp + "$2" + constants.nbsp;
	string = string.replace(re, replacement);


	// adds non-breaking spaces after single-character prepositions
	pattern = "([  ])([" + constants.lowercaseChars + constants.uppercaseChars + "]|&)( )";
	re = new RegExp(pattern, "g");
	replacement = "$1$2" + constants.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}





/*
	Corrects accidental uppercase

	Best-effort function to fix most common accidental uppercase errors, namely:
	[1] 2 first uppercase letters (ie. UPpercase)
	[2] Swapped cases (ie. uPPERCASE)

	Algorithm does not fix other uppercase eventualities,
	e.g. mixed case (UppERcaSe) as there are many cases for corporate brands
	that could potentially match the algorithm as false positive.

	@param {string} string — input text for identification
	@returns {string} — output with corrected accidental uppercase
*/
function correct_accidental_uppercase(string) {

	/* [1] two first uppercase letters (i.e. UPpercase) */
	var pattern = "["+ constants.uppercaseChars +"]{2,2}["+ constants.lowercaseChars +"]+";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
	});

	/* [2.1] Swapped cases (2-letter cases, i.e. iT)
			Note that this is divided into 2 separate cases as \b in JavaScript regex
			does not take non-latin characters into a cosnideration
	*/
	pattern = "["+ constants.lowercaseChars +"]["+ constants.uppercaseChars +"]\\b";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
	});

	/* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
	pattern = "["+ constants.lowercaseChars +"]+["+ constants.uppercaseChars +"]{2,}";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
	});

	return string;
}
















/*----------------------------------------------------------------------------*\
	Exceptions
\*----------------------------------------------------------------------------*/


/*
	Identifies exceptions that will be ommited from correction of any sort

	Algorithm
	[1] Identify email adresses
	[2] Identify web URLs and IPs
	[3] Mark them as temporary exceptions in format {{typopo__exception-[i]}}

	@param {string} input text for identification of exceptions
	@returns {string} — output with identified exceptions in format {{typopo__exception-[i]}}
*/
function identify_exceptions(string) {

	/* [1] Identify email adresses */
	identify_exception_set(string, constants.emailAddressPattern);


	/* [2] Identify web URLs and IPs */
	identify_exception_set(string, constants.webUrlPattern);


	/* [3] Mark them as temporary exceptions in format {{typopo__exception-[i]}} */
	for (var i = 0; i < exceptions.length; i++) {
		var replacement = "{{typopo__exception-" + i + "}}";
		string = string.replace(exceptions[i], replacement);
	}

	return string;
}



/*
	Identifies set of exceptions for given pattern
	Used as helper function for identify_exceptions(string)

	@param {string} input text for identification of exceptions
	@param {pattern} regular expression pattern to match exception
*/
function identify_exception_set(string, pattern) {
	var re = new RegExp(pattern, "g");
	var matched_exceptions = string.match(re);
	if (matched_exceptions != null) {
		exceptions = exceptions.concat(matched_exceptions);
	}
}



/*
	Replaces identified exceptions with real ones by change their
	temporary representation in format {{typopo__exception-[i]}} with its
	corresponding representation

	@param {string} input text with identified exceptions
	@returns {string} output with placed exceptions
*/
function place_exceptions(string) {
	for (var i = 0; i < exceptions.length; i++) {
		var pattern = "{{typopo__exception-" + i + "}}"
		var re = new RegExp(pattern, "g");
		var replacement = exceptions[i];
		string = string.replace(re, replacement);
	}

	return string;
}






/*----------------------------------------------------------------------------*\
	Main script
\*----------------------------------------------------------------------------*/



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

	string = identify_exceptions(string);


	if(configuration.removeLines) {
		string = removeEmptyLines(string);
	}

	string = replaceSymbols(string);
	string = fixSpaces(string);
	string = fixPeriod(string);
	string = fixEllipsis(string);
	string = fixDoubleQuotesAndPrimes(string, locale);
	string = fixSingleQuotesPrimesAndApostrophes(string, locale);

	string = fixAbbreviations(string);



	// string = correct_multiple_sign(string);



	string = consolidate_nbsp(string);


	string = replace_hyphen_with_dash(string, locale);
	string = replace_dash_with_hyphen(string);

	string = correct_accidental_uppercase(string);


	string = place_exceptions(string);



	return string;
}
