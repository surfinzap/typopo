(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typopo = require('./typopo');

window.correct_typos = _typopo.correct_typos;

},{"./typopo":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.correct_typos = correct_typos;
/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

/*----------------------------------------------------------------------------*\
	Variables & Character replacement sets
\*----------------------------------------------------------------------------*/

var essential_set = {
	"\\(C\\)": "©",
	"\\(c\\)": "©",
	"\\(R\\)": "®",
	"\\(r\\)": "®",
	"\\(TM\\)": "™",
	"\\(tm\\)": "™",
	"\\+\\-": "±",
	"\\-\\+": "±"
};
var non_latin_lowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
var non_latin_uppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
var non_latin_chars = non_latin_lowercase + non_latin_uppercase;
var lowercase_chars_en_sk_cz_rue = "a-z" + non_latin_lowercase;
var uppercase_chars_en_sk_cz_rue = "A-Z" + non_latin_uppercase;
var all_chars = lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue;
/*
	 (39)			dumb single quote
	 (8216)		left single quotation mark
	 (8217)		right single quotation mark
	 (700)		modifier letter apostrophe; https://en.wikipedia.org/wiki/Modifier_letter_apostrophe
	 (8219)		single high-reversed-9 quotation mark
	 (8242)		prime
	 (8249)		single left-pointing angle quotation mark
	 (8250)		single right-pointing angle quotation mark
*/
var single_quote_adepts = "‚|'|‘|’|ʼ|‛|′|‹|›";
var double_quote_adepts = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}";
var space = " ";
var nbsp = " ";
var hair_space = " "; //&#8202;
var narrow_nbsp = " "; //&#8239;
var spaces = space + nbsp + hair_space + narrow_nbsp;
var terminal_punctuation = "\.\!\?";
var sentence_punctuation = "\,\:\;" + terminal_punctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
var opening_brackets = "\\(\\[\\{";
var closing_brackets = "\\)\\]\\}";
var ellipsis = "…";
var degree = "°";

/*
	Source for web_url_pattern, email_address_pattern
	http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
*/
var web_url_pattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" + "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" + "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" + "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" + // named host
"(?:" + // plus top level domain
"(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" + "|(?:biz|b[abdefghijmnorstvwyz])" + "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" + "|d[ejkmoz]" + "|(?:edu|e[cegrstu])" + "|f[ijkmor]" + "|(?:gov|g[abdefghilmnpqrstuwy])" + "|h[kmnrtu]" + "|(?:info|int|i[delmnoqrst])" + "|(?:jobs|j[emop])" + "|k[eghimnrwyz]" + "|l[abcikrstuvy]" + "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" + "|(?:name|net|n[acefgilopruz])" + "|(?:org|om)" + "|(?:pro|p[aefghklmnrstwy])" + "|qa" + "|r[eouw]" + "|s[abcdeghijklmnortuvyz]" + "|(?:tel|travel|t[cdfghjklmnoprtvwz])" + "|u[agkmsyz]" + "|v[aceginu]" + "|w[fs]" + "|y[etu]" + "|z[amw]))" + "|(?:(?:25[0-5]|2[0-4]" + // or ip address
"[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" + "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" + "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" + "|[1-9][0-9]|[0-9])))" + "(?:\\:\\d{1,5})?)" + // plus option port number +
"(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
"\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" + "(?:\\b|$)"; // and finally, a word boundary or end of
// input.  This is to stop foo.sure from
// matching as foo.su


var email_address_pattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" + "\\@" + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\." + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+";

var exceptions = [];

/*----------------------------------------------------------------------------*\
	Esential replacements
\*----------------------------------------------------------------------------*/

function replace_symbols(string) {
	for (var rule in essential_set) {
		var re = new RegExp(rule, "g");
		string = string.replace(re, essential_set[rule]);
	}
	return string;
}

function replace_periods_with_ellipsis(string) {
	/* [1] replace 3 and more dots with an ellipsis */
	string = string.replace(/\.{3,}/g, "…");

	/* [2] replace 2 dots in the middle of the sentecne with an aposiopesis */
	var pattern = "[" + spaces + "]\\.{2}[" + spaces + "]";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, " … ");

	/* [3] replace 2 dots at the end of the sentecne with full stop */
	string = string.replace(/\.{2}/g, ".");

	return string;
}

function remove_multiple_spaces(string) {
	return string.replace(/ {2,}/g, " ");
}

/*----------------------------------------------------------------------------*\
	Quotes, primes & apostrophes
\*----------------------------------------------------------------------------*/

/*
	Corrects improper use of double quotes and double primes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.

	Algorithm
	[0] Remove extra terminal punctuation around double quotes
	[1] Swap right double quote adepts with a punctuation
	    (this comes first as it is a quite common mistake that may eventually
		  lead to improper identification of double primes)
	[2] Identify inches, arcseconds, seconds
	[3] Identify closed double quotes
	[4] Identify the rest as unclosed double quotes (best-effort replacement)
	[5] Fix spacing around quotes and primes
	[6] Swap back some of the double quotes with a punctuation
	[7] Remove extra punctuation around quotes
	[8] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language option
	@returns {string} output with properly replaces double qoutes and double primes
*/
function correct_double_quotes_and_primes(string, language) {

	/* [0] Remove extra terminal punctuation around double quotes
 				 e.g. “We will continue tomorrow.”. */
	var pattern = "([" + sentence_punctuation + "])(" + double_quote_adepts + ")([" + sentence_punctuation + "])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2");

	/* [1] Swap right double quote adepts with a terminal punctuation */
	pattern = "(" + double_quote_adepts + ")([" + terminal_punctuation + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, '$2$1');

	/* [2] Identify inches, arcseconds, seconds
 			 Note: we’re not using double_quote_adepts variable
 			 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d ?)(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{{typopo__double-prime}}");

	/* [3] Identify closed double quotes */
	pattern = "(" + double_quote_adepts + ")(.*?)(" + double_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");

	/* [4.1] Identify unclosed left double quote */
	pattern = "(" + double_quote_adepts + ")([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2");

	/* [4.2] Identify unclosed right double quote */
	pattern = "([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + sentence_punctuation + ellipsis + "])(" + double_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__right-double-quote}}");

	/* [4.3] Remove remaining unidentified double quote */
	pattern = "([" + spaces + "])(" + double_quote_adepts + ")([" + spaces + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [5] Fix spacing around quotes and prime */
	string = string.replace(/({{typopo__left-double-quote}})( )/g, "$1");
	string = string.replace(/( )({{typopo__right-double-quote}})/g, "$2");
	string = string.replace(/( )({{typopo__double-prime}})/g, "$2");

	/* [6] Swap back some of the double quotes with a punctuation
 		 Idea
 	 In [1] we have swapped all double right quotes by default with a terminal
 	 punctuation. However, not all double quotes wrap the whole sentence and
 	 there are cases when few words are quoted within a sentence. Take a look at
 	 examples:
 	 “Sentence qouted as a whole.” (full stop is placed within double quotes)
 	 This is “quoted expression.” (full stop is placed outside double quotes)
 		 Algorithm
 	 Match all the double quote pairs that do not precede sentence punctuation
 	 (and thus must be used within a sentence) and swap right double with
 	 a terminal punctuation.
 	 */
	pattern = "([^" + sentence_punctuation + "][" + spaces + "]{{typopo__left-double-quote}}.+?)([" + terminal_punctuation + "])({{typopo__right-double-quote}})";
	// console.log(pattern);
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3$2");

	/* [7] Remove extra comma after punctuation in direct speech,
 				 e.g. "“Hey!,” she said" */
	pattern = "([" + sentence_punctuation + "])([\,])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1");

	/* [8] Punctuation replacement */
	string = string.replace(/({{typopo__double-prime}})/g, "″");

	switch (language) {
		case "rue":
			string = string.replace(/({{typopo__left-double-quote}})/g, "«");
			string = string.replace(/({{typopo__right-double-quote}})/g, "»");
			break;
		case "sk":
		case "cs":
			string = string.replace(/({{typopo__left-double-quote}})/g, "„");
			string = string.replace(/({{typopo__right-double-quote}})/g, "“");
			break;
		case "en":
			string = string.replace(/({{typopo__left-double-quote}})/g, "“");
			string = string.replace(/({{typopo__right-double-quote}})/g, "”");
			break;
	}

	return string;
}

/*
	Corrects improper use of single quotes, single primes and apostrophes

	Assumptions and Limitations
	This function assumes that double quotes are always used in pair,
	i.e. authors did not forget to close double quotes in their text.
	Further, single quotes are used as secondary and they're properly spaced,
	e.g. ␣'word or sentence portion'␣ (and not like ␣'␣word␣'␣)

	Algorithm
	[1] Identify common apostrohe contractions
	[2] Identify single quotes
	[3] Identify feet, arcminutes, minutes
	[4] Identify residual apostrophes that have left
	[?] Swap right single quote adepts with a puntuation
			(We were swapping single quotes as part of algorithm a while a back,
			but since it is more probable that single quotes are in the middle of the
			sentence, we havae dropped swapping as a part of the algorithm)
	[6] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language options
	@returns {string} — corrected output
*/
function correct_single_quotes_primes_and_apostrophes(string, language) {

	/* [1.1] Identify ’n’ contractions */
	var pattern = "(" + single_quote_adepts + ")(n)(" + single_quote_adepts + ")";
	var re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2{{typopo__apostrophe}}");

	/* [1.2] Identify common contractions at the beginning or at the end
 				 of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
	var contraction_examples = "em|cause|twas|tis|til|round";
	pattern = "(" + single_quote_adepts + ")(" + contraction_examples + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2");

	/* [1.3] Identify in-word contractions,
 				 e.g. Don’t, I’m, O’Doole, 69’ers */
	var character_adepts = "0-9" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue;
	pattern = "([" + character_adepts + "])(" + single_quote_adepts + ")([" + character_adepts + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__apostrophe}}$3");

	/* [1.4] Identify year contractions
 	 e.g. ’70s, INCHEBA ’89,… */
	pattern = "(" + single_quote_adepts + ")([0-9]{2})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}$2");

	/* [2] Identify single quotes within double quotes */
	pattern = "(" + double_quote_adepts + ")(.*?)(" + double_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function ($0, $1, $2, $3) {

		//identify {{typopo__left-single-quote--adept}}
		var pattern = "( )(" + single_quote_adepts + ")([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

		//identify {{typopo__right-single-quote--adept}}
		pattern = "([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([\.,!?])?(" + single_quote_adepts + ")([ ]|[\.,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

		//identify single quote pairs
		pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__right-single-quote--adept}})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

		return $1 + $2 + $3;
	});

	/* [3] Identify feet, arcminutes, minutes
 			 Note: we’re not using single_quote_adepts variable
 			 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");

	/* [4] Identify residual apostrophes that have left */
	pattern = "(" + single_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}");

	/* [5] Punctuation replacement */
	string = string.replace(/({{typopo__single-prime}})/g, "′");
	string = string.replace(/{{typopo__apostrophe}}|{{typopo__left-single-quote--adept}}|{{typopo__right-single-quote--adept}}/g, "’");

	switch (language) {
		case "rue":
			string = string.replace(/{{typopo__left-single-quote}}/g, "‹");
			string = string.replace(/{{typopo__right-single-quote}}/g, "›");
			break;
		case "sk":
		case "cs":
			string = string.replace(/{{typopo__left-single-quote}}/g, "‚");
			string = string.replace(/{{typopo__right-single-quote}}/g, "‘");
			break;
		case "en":
			string = string.replace(/{{typopo__left-single-quote}}/g, "‘");
			string = string.replace(/{{typopo__right-single-quote}}/g, "’");
	}

	return string;
}

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
	var pattern = "[" + spaces + "][" + dashes + "][" + spaces + "]";
	var re = new RegExp(pattern, "g");
	var replacement = narrow_nbsp + "—" + hair_space;
	string = string.replace(re, replacement);

	/* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
 				 with an en dash; including cases when there is an extra space
 				 from either one side or both sides of the dash */
	var cardinal_number = "\\d+";
	pattern = "(" + cardinal_number + ")([" + spaces + "]?[" + dashes + "][" + spaces + "]?)(" + cardinal_number + ")";
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
	pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + spaces + "]?[" + dashes + "][" + spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "$1$2–$4$5");

	return string;
}

function replace_dash_with_hyphen(string) {
	var pattern = "([" + lowercase_chars_en_sk_cz_rue + "])([–—])([" + lowercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}

/*----------------------------------------------------------------------------*\
	Consolidation of spaces
\*----------------------------------------------------------------------------*/

function remove_space_before_punctuation(string) {
	var pattern = "([" + spaces + "])([" + sentence_punctuation + closing_brackets + degree + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$2");
}

function remove_space_after_punctuation(string) {
	var pattern = "([" + opening_brackets + "])([" + spaces + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}

function remove_trailing_spaces(string) {
	return string.trim();
}

function add_space_before_punctuation(string) {
	var pattern = "([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([" + opening_brackets + "])([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}

function add_space_after_punctuation(string) {
	var pattern = "([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([" + sentence_punctuation + closing_brackets + "])([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}

/*
	Removes extra spaces at the beginning of each paragraph

	This could be done with a one-liner:
	return string.replace(/^\s+/gm, "");

	However, it also removes empty lines. Since, we want to handle this change
	separately, we need to
	[1] split the lines manually
	[2] and remove extra spaces at the begining of each line
	[3] join lines together to a single string

	@param {string} string — input text for identification
	@returns {string} — output with removed spaces at the beginning of paragraphs
*/
function remove_spaces_at_paragraph_beginning(string) {
	/* [1] split the lines manually */
	var lines = string.split(/\r?\n/);

	/* [2] and remove extra spaces at the begining of each line */
	for (var i = 0; i < lines.length; i++) {
		lines[i] = lines[i].replace(/^\s+/, "");
	}

	/* [3] join lines together to a single string */
	return lines.join("\n");
}

/*
	Removes empty lines

	@param {string} string — input text for identification
	@returns {string} — output with removed empty lines
*/
function remove_empty_lines(string) {
	return string.replace(/^\s+/gm, "");
}

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
	var pattern = "([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "]{2,})([" + nbsp + narrow_nbsp + "])([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "]{2,})";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $3");
	string = string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


	// adds non-breaking spaces after cardinal numbers
	pattern = "([0-9]+)( )([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "]+)";
	re = new RegExp(pattern, "g");
	var replacement = "$1" + nbsp + "$3";
	string = string.replace(re, replacement);

	// adds non-breaking spaces around ×
	pattern = "([" + spaces + "])([×])([" + spaces + "])";
	re = new RegExp(pattern, "g");
	replacement = nbsp + "$2" + nbsp;
	string = string.replace(re, replacement);

	// adds non-breaking spaces after single-character prepositions
	pattern = "([  ])([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "]|&)( )";
	re = new RegExp(pattern, "g");
	replacement = "$1$2" + nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}

/*
	Corrects improper spacing around ellipsis and aposiopesis

	Ellipsis (as a character) is used for 2 different purposes:
	1. as an ellipsis to ommit a piece of information deliberately
	2. as an aposiopesis; a figure of speech wherein a sentence is
	deliberately broken off and left unfinished

	sources
	https://en.wikipedia.org/wiki/Ellipsis
	https://en.wikipedia.org/wiki/Aposiopesis
	http://www.liteera.cz/slovnik/vypustka

	Algorithm
	Ellipsis & Aposiopesis require different use of spacing around them,
	that is why we are correcting only following cases:
	errors:
	[1] correct spacing, when ellipsis used used around commas
	[2] correct spacing for aposiopesis at the end of the sentence in the middle of the paragraph
	[3] correct spacing for aposiopesis at the beginning of the sentence in the middle of the paragraph
	[4] correct spacing for aposiopesis at the beginning of the sentence at the beginning of the paragraph
	[5] correct spacing for aposiopesis at the end of the sentence at the end of the paragraph

	@param {string} string — input text for identification
	@returns {string} — output with corrected spacing around aposiopesis
*/
function correct_spaces_around_ellipsis(string) {

	/* [1] correct spacing, when ellipsis used used around commas */
	var pattern = ",[" + spaces + "]?" + ellipsis + "[" + spaces + "]?,";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, ", …,");

	/* [2] correct spacing for aposiopesis at the end of the sentence
 			 in the middle of the paragraph */
	pattern = "([" + lowercase_chars_en_sk_cz_rue + "])([" + spaces + "])(" + ellipsis + "[" + spaces + "][" + uppercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [3] correct spacing for aposiopesis at the beginning of the sentence
 			 in the middle of the paragraph */
	pattern = "([" + sentence_punctuation + "][" + spaces + "]" + ellipsis + ")([" + spaces + "])([" + lowercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [4] correct spacing for aposiopesis at the beginning of the sentence
 			 at the beginning of the paragraph */
	pattern = "(^…)([" + spaces + "])([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "gm");
	string = string.replace(re, "$1$3");

	/* [5] correct spacing for aposiopesis at the end of the sentence
 			 at the end of the paragraph */
	pattern = "([" + lowercase_chars_en_sk_cz_rue + sentence_punctuation + "])([" + spaces + "])(" + ellipsis + ")(?![ " + sentence_punctuation + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

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
	var pattern = "[" + uppercase_chars_en_sk_cz_rue + "]{2,2}[" + lowercase_chars_en_sk_cz_rue + "]+";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	/* [2.1] Swapped cases (2-letter cases, i.e. iT)
 		Note that this is divided into 2 separate cases as \b in JavaScript regex
 		does not take non-latin characters into a cosnideration
 */
	pattern = "[" + lowercase_chars_en_sk_cz_rue + "][" + uppercase_chars_en_sk_cz_rue + "]\\b";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	/* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
	pattern = "[" + lowercase_chars_en_sk_cz_rue + "]+[" + uppercase_chars_en_sk_cz_rue + "]{2,}";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	return string;
}

/*----------------------------------------------------------------------------*\
	Abbreviations
\*----------------------------------------------------------------------------*/
/*
	Identifies differently-spelled abbreviations and replaces it with
	a temp variable, {{typopo__[abbr]}}

	Identifies given abbreviations:
	a.m., p.m., e.g., i.e.

	Algorithm
	[1] Identify e.g., i.e.
	[2] Identify a.m., p.m. (different match to avoid false positives such as:
			I am, He is the PM.)
	[3] Exclude false identifications

	@param {string} input text for identification
	@returns {string} corrected output
*/
function identify_common_abbreviations(string) {

	/* [1] Identify e.g., i.e. */
	var abbreviations = ["eg", "ie"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\b[" + abbreviations[i][0] + "]\\.?[" + spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + spaces + "]?)(\\b)";
		// console.log(pattern);
		var re = new RegExp(pattern, "gi");
		var replacement = "{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}

	/* [2] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\d)([" + spaces + "]?)(\\b[" + abbreviations[i][0] + "]\\.?[" + spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + spaces + "]?)(\\b|\\B)";
		var re = new RegExp(pattern, "gi");
		replacement = "$1 {{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}

	/* [3] Exclude false identifications
 	 Regex \b does not catch non-latin characters so we need to exclude false
 	 identifications
 */
	abbreviations = ["eg", "ie", "am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		// non-latin character at the beginning
		var pattern = "([" + non_latin_chars + "])({{typopo__" + abbreviations[i] + "}})";
		var re = new RegExp(pattern, "g");
		replacement = "$1" + abbreviations[i];
		string = string.replace(re, replacement);

		// non-latin character at the end
		pattern = "({{typopo__" + abbreviations[i] + "}} )([" + non_latin_chars + "])";
		re = new RegExp(pattern, "g");
		replacement = abbreviations[i] + "$2";
		string = string.replace(re, replacement);
	}

	return string;
}

/*
	Replaces identified temp abbreviation variable like {{typopo__eg}},
	with their actual representation

	@param {string} input text for identification
	@returns {string} corrected output
*/
function place_common_abbreviations(string) {
	var abbreviations = ["eg", "ie", "am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "{{typopo__" + abbreviations[i] + "}}";
		var re = new RegExp(pattern, "g");
		var replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
		string = string.replace(re, replacement);
	}

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
	identify_exception_set(string, email_address_pattern);

	/* [2] Identify web URLs and IPs */
	identify_exception_set(string, web_url_pattern);

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
		var pattern = "{{typopo__exception-" + i + "}}";
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
function correct_typos(string, language, configuration) {
	language = typeof language === "undefined" ? "en" : language;

	configuration = typeof configuration === "undefined" ? {
		removeLines: true
	} : configuration;

	string = identify_exceptions(string);
	string = identify_common_abbreviations(string); // needs to go before punctuation fixes

	string = replace_symbols(string, essential_set);
	string = replace_periods_with_ellipsis(string);
	string = remove_multiple_spaces(string);

	string = correct_double_quotes_and_primes(string, language);
	string = correct_single_quotes_primes_and_apostrophes(string, language);

	string = correct_multiple_sign(string);

	string = remove_space_before_punctuation(string);
	string = remove_space_after_punctuation(string);
	string = remove_trailing_spaces(string);
	string = add_space_before_punctuation(string);
	string = add_space_after_punctuation(string);
	string = remove_spaces_at_paragraph_beginning(string);

	if (configuration.removeLines) {
		string = remove_empty_lines(string);
	}

	string = consolidate_nbsp(string);
	string = correct_spaces_around_ellipsis(string);

	string = replace_hyphen_with_dash(string, language);
	string = replace_dash_with_hyphen(string);

	string = correct_accidental_uppercase(string);

	string = place_common_abbreviations(string); // needs to go after punctuation fixes
	string = place_exceptions(string);

	string = replace_periods_with_ellipsis(string);

	return string;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGJyb3dzZXJfdHlwb3BvLmpzIiwic3JjXFx0eXBvcG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLE9BQU8sYUFBUDs7Ozs7Ozs7UUNpNUJnQixhLEdBQUEsYTtBQW41QmhCOzs7Ozs7Ozs7QUFXQTs7OztBQUlBLElBQUksZ0JBQWdCO0FBQ25CLFlBQVcsR0FEUTtBQUVuQixZQUFXLEdBRlE7QUFHbkIsWUFBVyxHQUhRO0FBSW5CLFlBQVcsR0FKUTtBQUtuQixhQUFZLEdBTE87QUFNbkIsYUFBWSxHQU5PO0FBT25CLFdBQVUsR0FQUztBQVFuQixXQUFVO0FBUlMsQ0FBcEI7QUFVQSxJQUFJLHNCQUFzQiw4REFBMUI7QUFDQSxJQUFJLHNCQUFzQiw4REFBMUI7QUFDQSxJQUFJLGtCQUFrQixzQkFBc0IsbUJBQTVDO0FBQ0EsSUFBSSwrQkFBK0IsUUFBUSxtQkFBM0M7QUFDQSxJQUFJLCtCQUErQixRQUFRLG1CQUEzQztBQUNBLElBQUksWUFBWSwrQkFBK0IsNEJBQS9DO0FBQ0E7Ozs7Ozs7Ozs7QUFVQSxJQUFJLHNCQUFzQixtQkFBMUI7QUFDQSxJQUFJLHNCQUFzQiwwREFBMUI7QUFDQSxJQUFJLFFBQVEsR0FBWjtBQUNBLElBQUksT0FBTyxHQUFYO0FBQ0EsSUFBSSxhQUFhLEdBQWpCLEMsQ0FBc0I7QUFDdEIsSUFBSSxjQUFjLEdBQWxCLEMsQ0FBdUI7QUFDdkIsSUFBSSxTQUFTLFFBQVEsSUFBUixHQUFlLFVBQWYsR0FBNEIsV0FBekM7QUFDQSxJQUFJLHVCQUF1QixRQUEzQjtBQUNBLElBQUksdUJBQXVCLFdBQVcsb0JBQXRDLEMsQ0FBNEQ7QUFDNUQsSUFBSSxtQkFBbUIsV0FBdkI7QUFDQSxJQUFJLG1CQUFtQixXQUF2QjtBQUNBLElBQUksV0FBVyxHQUFmO0FBQ0EsSUFBSSxTQUFTLEdBQWI7O0FBRUE7Ozs7QUFJQSxJQUFJLGtC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dCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgY29ycmVjdF90eXBvcyB9IGZyb20gJy4vdHlwb3BvJztcblxud2luZG93LmNvcnJlY3RfdHlwb3MgPSBjb3JyZWN0X3R5cG9zO1xuIiwiLyohXG4gKiBUeXBvcG8gMS40LjBcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNS0xNyBCcmHFiG8gxaBhbmRhbGFcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTctMDEtMTVcbiAqL1xuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdFZhcmlhYmxlcyAmIENoYXJhY3RlciByZXBsYWNlbWVudCBzZXRzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxudmFyIGVzc2VudGlhbF9zZXQgPSB7XG5cdFwiXFxcXChDXFxcXClcIjogXCLCqVwiLFxuXHRcIlxcXFwoY1xcXFwpXCI6IFwiwqlcIixcblx0XCJcXFxcKFJcXFxcKVwiOiBcIsKuXCIsXG5cdFwiXFxcXChyXFxcXClcIjogXCLCrlwiLFxuXHRcIlxcXFwoVE1cXFxcKVwiOiBcIuKEolwiLFxuXHRcIlxcXFwodG1cXFxcKVwiOiBcIuKEolwiLFxuXHRcIlxcXFwrXFxcXC1cIjogXCLCsVwiLFxuXHRcIlxcXFwtXFxcXCtcIjogXCLCsVwiLFxufTtcbnZhciBub25fbGF0aW5fbG93ZXJjYXNlID0gXCLDocOkxI3Ej8OpxJvDrcS6xL7FiMOzw7TDtsWRxZXFmcWhxaXDusO8xbHFr8O9xb7QsNCx0LLQs9KR0LTQtdC30ZbQuNC50LrQu9C80L3QvtC/0YDRgdGC0YPRhNGK0YvRjNGG0YfQttGI0ZfRidGR0ZTRjtGP0YVcIjtcbnZhciBub25fbGF0aW5fdXBwZXJjYXNlID0gXCLDgcOExIzEjsOJxJrDjcS5xL3Fh8OTw5TDlsWQxZTFmMWgxaTDmsOcxbDFrsOdxb3QkNCR0JLQk9KQ0JTQldCX0IbQmNCZ0JrQm9Cc0J3QntCf0KDQodCi0KPQpNCq0KvQrNCm0KfQltCo0IfQqdCB0ITQrtCv0KVcIjtcbnZhciBub25fbGF0aW5fY2hhcnMgPSBub25fbGF0aW5fbG93ZXJjYXNlICsgbm9uX2xhdGluX3VwcGVyY2FzZTtcbnZhciBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlID0gXCJhLXpcIiArIG5vbl9sYXRpbl9sb3dlcmNhc2U7XG52YXIgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSA9IFwiQS1aXCIgKyBub25fbGF0aW5fdXBwZXJjYXNlO1xudmFyIGFsbF9jaGFycyA9IGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlO1xuLypcblx0ICgzOSlcdFx0XHRkdW1iIHNpbmdsZSBxdW90ZVxuXHQgKDgyMTYpXHRcdGxlZnQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrXG5cdCAoODIxNylcdFx0cmlnaHQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrXG5cdCAoNzAwKVx0XHRtb2RpZmllciBsZXR0ZXIgYXBvc3Ryb3BoZTsgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTW9kaWZpZXJfbGV0dGVyX2Fwb3N0cm9waGVcblx0ICg4MjE5KVx0XHRzaW5nbGUgaGlnaC1yZXZlcnNlZC05IHF1b3RhdGlvbiBtYXJrXG5cdCAoODI0MilcdFx0cHJpbWVcblx0ICg4MjQ5KVx0XHRzaW5nbGUgbGVmdC1wb2ludGluZyBhbmdsZSBxdW90YXRpb24gbWFya1xuXHQgKDgyNTApXHRcdHNpbmdsZSByaWdodC1wb2ludGluZyBhbmdsZSBxdW90YXRpb24gbWFya1xuKi9cbnZhciBzaW5nbGVfcXVvdGVfYWRlcHRzID0gXCLigJp8J3zigJh84oCZfMq8fOKAm3zigLJ84oC5fOKAulwiO1xudmFyIGRvdWJsZV9xdW90ZV9hZGVwdHMgPSBcIuKAnnzigJx84oCdfFxcXCJ8wqt8wrt84oCzfCx7Mix9fOKAmHsyLH184oCZezIsfXwnezIsfXzigLl7Mix9fOKAunsyLH184oCyezIsfVwiO1xudmFyIHNwYWNlID0gXCIgXCI7XG52YXIgbmJzcCA9IFwiwqBcIjtcbnZhciBoYWlyX3NwYWNlID0gXCLigIpcIjsgLy8mIzgyMDI7XG52YXIgbmFycm93X25ic3AgPSBcIuKAr1wiOyAvLyYjODIzOTtcbnZhciBzcGFjZXMgPSBzcGFjZSArIG5ic3AgKyBoYWlyX3NwYWNlICsgbmFycm93X25ic3A7XG52YXIgdGVybWluYWxfcHVuY3R1YXRpb24gPSBcIlxcLlxcIVxcP1wiO1xudmFyIHNlbnRlbmNlX3B1bmN0dWF0aW9uID0gXCJcXCxcXDpcXDtcIiArIHRlcm1pbmFsX3B1bmN0dWF0aW9uOyAvLyB0aGVyZSBpcyBubyBlbGxpcHNpcyBpbiB0aGUgc2V0IGFzIGl0IGlzIGJlaW5nIHVzZWQgdGhyb3VnaG91dCBhIHNlbnRlbmNlIGluIHRoZSBtaWRkbGUuIFJldGhpbmsgdGhpcyBncm91cCB0byBzcGxpdCBpdCBpbnRvIGVuZC1zZW50ZW5jZSBwdW5jdHVhdGlvbiBhbmQgbWlkZGxlIHNlbnRlbmNlIHB1bmN0dWF0aW9uXG52YXIgb3BlbmluZ19icmFja2V0cyA9IFwiXFxcXChcXFxcW1xcXFx7XCI7XG52YXIgY2xvc2luZ19icmFja2V0cyA9IFwiXFxcXClcXFxcXVxcXFx9XCI7XG52YXIgZWxsaXBzaXMgPSBcIuKAplwiO1xudmFyIGRlZ3JlZSA9IFwiwrBcIjtcblxuLypcblx0U291cmNlIGZvciB3ZWJfdXJsX3BhdHRlcm4sIGVtYWlsX2FkZHJlc3NfcGF0dGVyblxuXHRodHRwOi8vZ3JlcGNvZGUuY29tL2ZpbGUvcmVwb3NpdG9yeS5ncmVwY29kZS5jb20vamF2YS9leHQvY29tLmdvb2dsZS5hbmRyb2lkL2FuZHJvaWQvMi4wX3IxL2FuZHJvaWQvdGV4dC91dGlsL1JlZ2V4LmphdmEjUmVnZXguMFdFQl9VUkxfUEFUVEVSTlxuKi9cbnZhciB3ZWJfdXJsX3BhdHRlcm4gPSBcIigoPzooaHR0cHxodHRwc3xIdHRwfEh0dHBzfHJ0c3B8UnRzcCk6XFxcXC9cXFxcLyg/Oig/OlthLXpBLVowLTlcXFxcJFxcXFwtXFxcXF9cXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcXFwsXFxcXDtcXFxcP1xcXFwmXFxcXD1dfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKXsxLDY0fSg/OlxcXFw6KD86W2EtekEtWjAtOVxcXFwkXFxcXC1cXFxcX1wiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXFxcXCxcXFxcO1xcXFw/XFxcXCZcXFxcPV18KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpezEsMjV9KT9cXFxcQCk/KT9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCIoKD86KD86W2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsNjR9XFxcXC4pK1wiICsgIC8vIG5hbWVkIGhvc3RcbiAgICAgICAgICAgICAgICAgICAgICBcIig/OlwiICsgLy8gcGx1cyB0b3AgbGV2ZWwgZG9tYWluXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzphZXJvfGFycGF8YXNpYXxhW2NkZWZnaWxtbm9xcnN0dXd4el0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OmJpenxiW2FiZGVmZ2hpam1ub3JzdHZ3eXpdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpjYXR8Y29tfGNvb3B8Y1thY2RmZ2hpa2xtbm9ydXZ4eXpdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxkW2Vqa21vel1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86ZWR1fGVbY2VncnN0dV0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifGZbaWprbW9yXVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpnb3Z8Z1thYmRlZmdoaWxtbnBxcnN0dXd5XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8aFtrbW5ydHVdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OmluZm98aW50fGlbZGVsbW5vcXJzdF0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OmpvYnN8altlbW9wXSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8a1tlZ2hpbW5yd3l6XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxsW2FiY2lrcnN0dXZ5XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzptaWx8bW9iaXxtdXNldW18bVthY2RnaGtsbW5vcHFyc3R1dnd4eXpdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpuYW1lfG5ldHxuW2FjZWZnaWxvcHJ1el0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/Om9yZ3xvbSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86cHJvfHBbYWVmZ2hrbG1ucnN0d3ldKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxxYVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxyW2VvdXddXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHNbYWJjZGVnaGlqa2xtbm9ydHV2eXpdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OnRlbHx0cmF2ZWx8dFtjZGZnaGprbG1ub3BydHZ3el0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHVbYWdrbXN5el1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8dlthY2VnaW51XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInx3W2ZzXVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInx5W2V0dV1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8elthbXddKSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86KD86MjVbMC01XXwyWzAtNF1cIiArIC8vIG9yIGlwIGFkZHJlc3NcbiAgICAgICAgICAgICAgICAgICAgICBcIlswLTldfFswLTFdWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XSlcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8WzAtMV1bMC05XXsyfXxbMS05XVswLTldfFsxLTldfDApXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldfFswLTFdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XXwwKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9XCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifFsxLTldWzAtOV18WzAtOV0pKSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpcXFxcOlxcXFxkezEsNX0pPylcIiArIC8vIHBsdXMgb3B0aW9uIHBvcnQgbnVtYmVyICtcbiAgICAgICAgICAgICAgICAgICAgICBcIihcXFxcLyg/Oig/OlthLXpBLVowLTlcXFxcO1xcXFwvXFxcXD9cXFxcOlxcXFxAXFxcXCZcXFxcPVxcXFwjXFxcXH5cIiArIC8vIHBsdXMgb3B0aW9uIHF1ZXJ5IHBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXC1cXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVxcXFwsXFxcXF9dKXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSkqKT9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpcXFxcYnwkKVwiOyAvLyBhbmQgZmluYWxseSwgYSB3b3JkIGJvdW5kYXJ5IG9yIGVuZCBvZlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlucHV0LiAgVGhpcyBpcyB0byBzdG9wIGZvby5zdXJlIGZyb21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaGluZyBhcyBmb28uc3VcblxuXG5cbnZhciBlbWFpbF9hZGRyZXNzX3BhdHRlcm4gPSBcIlthLXpBLVowLTlcXFxcK1xcXFwuXFxcXF9cXFxcJVxcXFwtXXsxLDI1Nn1cIiArXG4gICAgICAgICAgICBcIlxcXFxAXCIgK1xuICAgICAgICAgICAgXCJbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCw2NH1cIiArXG4gICAgICAgICAgICBcIihcIiArXG4gICAgICAgICAgICAgICAgXCJcXFxcLlwiICtcbiAgICAgICAgICAgICAgICBcIlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDI1fVwiICtcbiAgICAgICAgICAgIFwiKStcIjtcblxudmFyIGV4Y2VwdGlvbnMgPSBbXTtcblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0RXNlbnRpYWwgcmVwbGFjZW1lbnRzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gcmVwbGFjZV9zeW1ib2xzKHN0cmluZykge1xuXHRmb3IgKHZhciBydWxlIGluIGVzc2VudGlhbF9zZXQpIHtcblx0XHRcdHZhciByZSA9IG5ldyBSZWdFeHAocnVsZSwgXCJnXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGVzc2VudGlhbF9zZXRbcnVsZV0pO1xuXHR9XG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZXBsYWNlX3BlcmlvZHNfd2l0aF9lbGxpcHNpcyhzdHJpbmcpIHtcblx0LyogWzFdIHJlcGxhY2UgMyBhbmQgbW9yZSBkb3RzIHdpdGggYW4gZWxsaXBzaXMgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcLnszLH0vZywgXCLigKZcIik7XG5cblx0LyogWzJdIHJlcGxhY2UgMiBkb3RzIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNlbnRlY25lIHdpdGggYW4gYXBvc2lvcGVzaXMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIiArIHNwYWNlcyArIFwiXVxcXFwuezJ9W1wiICsgc3BhY2VzICsgXCJdXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIg4oCmIFwiKTtcblxuXHQvKiBbM10gcmVwbGFjZSAyIGRvdHMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVjbmUgd2l0aCBmdWxsIHN0b3AgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcLnsyfS9nLCBcIi5cIik7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgXCIgXCIpO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdFF1b3RlcywgcHJpbWVzICYgYXBvc3Ryb3BoZXNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgdXNlIG9mIGRvdWJsZSBxdW90ZXMgYW5kIGRvdWJsZSBwcmltZXNcblxuXHRBc3N1bXB0aW9ucyBhbmQgTGltaXRhdGlvbnNcblx0VGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgZG91YmxlIHF1b3RlcyBhcmUgYWx3YXlzIHVzZWQgaW4gcGFpcixcblx0aS5lLiBhdXRob3JzIGRpZCBub3QgZm9yZ2V0IHRvIGNsb3NlIGRvdWJsZSBxdW90ZXMgaW4gdGhlaXIgdGV4dC5cblxuXHRBbGdvcml0aG1cblx0WzBdIFJlbW92ZSBleHRyYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbiBhcm91bmQgZG91YmxlIHF1b3Rlc1xuXHRbMV0gU3dhcCByaWdodCBkb3VibGUgcXVvdGUgYWRlcHRzIHdpdGggYSBwdW5jdHVhdGlvblxuXHQgICAgKHRoaXMgY29tZXMgZmlyc3QgYXMgaXQgaXMgYSBxdWl0ZSBjb21tb24gbWlzdGFrZSB0aGF0IG1heSBldmVudHVhbGx5XG5cdFx0ICBsZWFkIHRvIGltcHJvcGVyIGlkZW50aWZpY2F0aW9uIG9mIGRvdWJsZSBwcmltZXMpXG5cdFsyXSBJZGVudGlmeSBpbmNoZXMsIGFyY3NlY29uZHMsIHNlY29uZHNcblx0WzNdIElkZW50aWZ5IGNsb3NlZCBkb3VibGUgcXVvdGVzXG5cdFs0XSBJZGVudGlmeSB0aGUgcmVzdCBhcyB1bmNsb3NlZCBkb3VibGUgcXVvdGVzIChiZXN0LWVmZm9ydCByZXBsYWNlbWVudClcblx0WzVdIEZpeCBzcGFjaW5nIGFyb3VuZCBxdW90ZXMgYW5kIHByaW1lc1xuXHRbNl0gU3dhcCBiYWNrIHNvbWUgb2YgdGhlIGRvdWJsZSBxdW90ZXMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cdFs3XSBSZW1vdmUgZXh0cmEgcHVuY3R1YXRpb24gYXJvdW5kIHF1b3Rlc1xuXHRbOF0gUmVwbGFjZSBhbGwgaWRlbnRpZmllZCBwdW5jdHVhdGlvbiB3aXRoIGFwcHJvcHJpYXRlIHB1bmN0dWF0aW9uIGluXG5cdCAgICBnaXZlbiBsYW5ndWFnZVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSDigJQgbGFuZ3VhZ2Ugb3B0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IG91dHB1dCB3aXRoIHByb3Blcmx5IHJlcGxhY2VzIGRvdWJsZSBxb3V0ZXMgYW5kIGRvdWJsZSBwcmltZXNcbiovXG5mdW5jdGlvbiBjb3JyZWN0X2RvdWJsZV9xdW90ZXNfYW5kX3ByaW1lcyhzdHJpbmcsIGxhbmd1YWdlKSB7XG5cblx0LyogWzBdIFJlbW92ZSBleHRyYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbiBhcm91bmQgZG91YmxlIHF1b3Rlc1xuXHRcdFx0XHRcdCBlLmcuIOKAnFdlIHdpbGwgY29udGludWUgdG9tb3Jyb3cu4oCdLiAqL1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgXCJdKShcIisgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKShbXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDJcIik7XG5cblx0LyogWzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgdGVybWluYWwgcHVuY3R1YXRpb24gKi9cblx0cGF0dGVybiA9IFwiKFwiKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpKFtcIiArIHRlcm1pbmFsX3B1bmN0dWF0aW9uICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgJyQyJDEnKTtcblxuXHQvKiBbMl0gSWRlbnRpZnkgaW5jaGVzLCBhcmNzZWNvbmRzLCBzZWNvbmRzXG5cdFx0XHRcdCBOb3RlOiB3ZeKAmXJlIG5vdCB1c2luZyBkb3VibGVfcXVvdGVfYWRlcHRzIHZhcmlhYmxlXG5cdFx0XHRcdCBhcyBjb21tYXMgYW5kIGxvdy1wb3NpdGlvbmVkIHF1b3RlcyBhcmUgb21taXRlZCovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxkID8pKOKAnHzigJ18XFxcInzigLN84oCYezIsfXzigJl7Mix9fCd7Mix9fOKAsnsyLH0pL2csIFwiJDF7e3R5cG9wb19fZG91YmxlLXByaW1lfX1cIik7XG5cblxuXHQvKiBbM10gSWRlbnRpZnkgY2xvc2VkIGRvdWJsZSBxdW90ZXMgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKSguKj8pKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSQye3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19XCIpO1xuXG5cblx0LyogWzQuMV0gSWRlbnRpZnkgdW5jbG9zZWQgbGVmdCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKShbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0kMlwiKTtcblxuXG5cdC8qIFs0LjJdIElkZW50aWZ5IHVuY2xvc2VkIHJpZ2h0IGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIGVsbGlwc2lzICsgXCJdKShcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuXHQvKiBbNC4zXSBSZW1vdmUgcmVtYWluaW5nIHVuaWRlbnRpZmllZCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIHNwYWNlcyArIFwiXSkoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpKFtcIiArIHNwYWNlcyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs1XSBGaXggc3BhY2luZyBhcm91bmQgcXVvdGVzIGFuZCBwcmltZSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KSggKS9nLCBcIiQxXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKCApKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCIkMlwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyggKSh7e3R5cG9wb19fZG91YmxlLXByaW1lfX0pL2csIFwiJDJcIik7XG5cblxuXHQvKiBbNl0gU3dhcCBiYWNrIHNvbWUgb2YgdGhlIGRvdWJsZSBxdW90ZXMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cblx0XHQgSWRlYVxuXHRcdCBJbiBbMV0gd2UgaGF2ZSBzd2FwcGVkIGFsbCBkb3VibGUgcmlnaHQgcXVvdGVzIGJ5IGRlZmF1bHQgd2l0aCBhIHRlcm1pbmFsXG5cdFx0IHB1bmN0dWF0aW9uLiBIb3dldmVyLCBub3QgYWxsIGRvdWJsZSBxdW90ZXMgd3JhcCB0aGUgd2hvbGUgc2VudGVuY2UgYW5kXG5cdFx0IHRoZXJlIGFyZSBjYXNlcyB3aGVuIGZldyB3b3JkcyBhcmUgcXVvdGVkIHdpdGhpbiBhIHNlbnRlbmNlLiBUYWtlIGEgbG9vayBhdFxuXHRcdCBleGFtcGxlczpcblx0XHQg4oCcU2VudGVuY2UgcW91dGVkIGFzIGEgd2hvbGUu4oCdIChmdWxsIHN0b3AgaXMgcGxhY2VkIHdpdGhpbiBkb3VibGUgcXVvdGVzKVxuXHRcdCBUaGlzIGlzIOKAnHF1b3RlZCBleHByZXNzaW9uLuKAnSAoZnVsbCBzdG9wIGlzIHBsYWNlZCBvdXRzaWRlIGRvdWJsZSBxdW90ZXMpXG5cblx0XHQgQWxnb3JpdGhtXG5cdFx0IE1hdGNoIGFsbCB0aGUgZG91YmxlIHF1b3RlIHBhaXJzIHRoYXQgZG8gbm90IHByZWNlZGUgc2VudGVuY2UgcHVuY3R1YXRpb25cblx0XHQgKGFuZCB0aHVzIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBzZW50ZW5jZSkgYW5kIHN3YXAgcmlnaHQgZG91YmxlIHdpdGhcblx0XHQgYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbi5cblx0XHQgKi9cblx0cGF0dGVybiA9IFwiKFteXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIFwiXVtcIiArIHNwYWNlcyArIFwiXXt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19Lis/KShbXCIgKyB0ZXJtaW5hbF9wdW5jdHVhdGlvbiArIFwiXSkoe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KVwiO1xuXHQvLyBjb25zb2xlLmxvZyhwYXR0ZXJuKTtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMyQyXCIpO1xuXG5cblx0LyogWzddIFJlbW92ZSBleHRyYSBjb21tYSBhZnRlciBwdW5jdHVhdGlvbiBpbiBkaXJlY3Qgc3BlZWNoLFxuXHRcdFx0XHRcdCBlLmcuIFwi4oCcSGV5ISzigJ0gc2hlIHNhaWRcIiAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBcIl0pKFtcXCxdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMVwiKTtcblxuXG5cdC8qIFs4XSBQdW5jdHVhdGlvbiByZXBsYWNlbWVudCAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19kb3VibGUtcHJpbWV9fSkvZywgXCLigLNcIik7XG5cblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRcdGNhc2UgXCJydWVcIjpcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwiwqtcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLCu1wiKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJza1wiOlxuXHRcdGNhc2UgXCJjc1wiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJ5cIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJxcIik7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiZW5cIjpcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCcXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCdXCIpO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgdXNlIG9mIHNpbmdsZSBxdW90ZXMsIHNpbmdsZSBwcmltZXMgYW5kIGFwb3N0cm9waGVzXG5cblx0QXNzdW1wdGlvbnMgYW5kIExpbWl0YXRpb25zXG5cdFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGRvdWJsZSBxdW90ZXMgYXJlIGFsd2F5cyB1c2VkIGluIHBhaXIsXG5cdGkuZS4gYXV0aG9ycyBkaWQgbm90IGZvcmdldCB0byBjbG9zZSBkb3VibGUgcXVvdGVzIGluIHRoZWlyIHRleHQuXG5cdEZ1cnRoZXIsIHNpbmdsZSBxdW90ZXMgYXJlIHVzZWQgYXMgc2Vjb25kYXJ5IGFuZCB0aGV5J3JlIHByb3Blcmx5IHNwYWNlZCxcblx0ZS5nLiDikKMnd29yZCBvciBzZW50ZW5jZSBwb3J0aW9uJ+KQoyAoYW5kIG5vdCBsaWtlIOKQoyfikKN3b3Jk4pCjJ+KQoylcblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGNvbW1vbiBhcG9zdHJvaGUgY29udHJhY3Rpb25zXG5cdFsyXSBJZGVudGlmeSBzaW5nbGUgcXVvdGVzXG5cdFszXSBJZGVudGlmeSBmZWV0LCBhcmNtaW51dGVzLCBtaW51dGVzXG5cdFs0XSBJZGVudGlmeSByZXNpZHVhbCBhcG9zdHJvcGhlcyB0aGF0IGhhdmUgbGVmdFxuXHRbP10gU3dhcCByaWdodCBzaW5nbGUgcXVvdGUgYWRlcHRzIHdpdGggYSBwdW50dWF0aW9uXG5cdFx0XHQoV2Ugd2VyZSBzd2FwcGluZyBzaW5nbGUgcXVvdGVzIGFzIHBhcnQgb2YgYWxnb3JpdGhtIGEgd2hpbGUgYSBiYWNrLFxuXHRcdFx0YnV0IHNpbmNlIGl0IGlzIG1vcmUgcHJvYmFibGUgdGhhdCBzaW5nbGUgcXVvdGVzIGFyZSBpbiB0aGUgbWlkZGxlIG9mIHRoZVxuXHRcdFx0c2VudGVuY2UsIHdlIGhhdmFlIGRyb3BwZWQgc3dhcHBpbmcgYXMgYSBwYXJ0IG9mIHRoZSBhbGdvcml0aG0pXG5cdFs2XSBSZXBsYWNlIGFsbCBpZGVudGlmaWVkIHB1bmN0dWF0aW9uIHdpdGggYXBwcm9wcmlhdGUgcHVuY3R1YXRpb24gaW5cblx0ICAgIGdpdmVuIGxhbmd1YWdlXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIOKAlCBsYW5ndWFnZSBvcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gY29ycmVjdF9zaW5nbGVfcXVvdGVzX3ByaW1lc19hbmRfYXBvc3Ryb3BoZXMoc3RyaW5nLCBsYW5ndWFnZSkge1xuXG5cdC8qIFsxLjFdIElkZW50aWZ5IOKAmW7igJkgY29udHJhY3Rpb25zICovXG5cdHZhciBwYXR0ZXJuID0gXCIoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpKG4pKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMnt7dHlwb3BvX19hcG9zdHJvcGhlfX1cIik7XG5cblxuXHQvKiBbMS4yXSBJZGVudGlmeSBjb21tb24gY29udHJhY3Rpb25zIGF0IHRoZSBiZWdpbm5pbmcgb3IgYXQgdGhlIGVuZFxuXHRcdFx0XHRcdCBvZiB0aGUgd29yZCwgZS5nLiBGaXNoIOKAmW7igJkgQ2hpcHMsIOKAmWVtLCDigJljYXVzZSzigKYgKi9cblx0dmFyIGNvbnRyYWN0aW9uX2V4YW1wbGVzID0gXCJlbXxjYXVzZXx0d2FzfHRpc3x0aWx8cm91bmRcIlxuXHRwYXR0ZXJuID0gXCIoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpKFwiICsgY29udHJhY3Rpb25fZXhhbXBsZXMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMlwiKTtcblxuXG5cdC8qIFsxLjNdIElkZW50aWZ5IGluLXdvcmQgY29udHJhY3Rpb25zLFxuXHRcdFx0XHRcdCBlLmcuIERvbuKAmXQsIEnigJltLCBP4oCZRG9vbGUsIDY54oCZZXJzICovXG5cdHZhciBjaGFyYWN0ZXJfYWRlcHRzID0gXCIwLTlcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlO1xuXHRwYXR0ZXJuID0gXCIoW1wiKyBjaGFyYWN0ZXJfYWRlcHRzICtcIl0pKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKShbXCIrIGNoYXJhY3Rlcl9hZGVwdHMgK1wiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDNcIik7XG5cblxuXHQvKiBbMS40XSBJZGVudGlmeSB5ZWFyIGNvbnRyYWN0aW9uc1xuXHRcdCBlLmcuIOKAmTcwcywgSU5DSEVCQSDigJk4OSzigKYgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKShbMC05XXsyfSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQyXCIpO1xuXG5cblx0LyogWzJdIElkZW50aWZ5IHNpbmdsZSBxdW90ZXMgd2l0aGluIGRvdWJsZSBxdW90ZXMgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKSguKj8pKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oJDAsICQxLCAkMiwgJDMpe1xuXG5cdFx0Ly9pZGVudGlmeSB7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX1cblx0XHR2YXIgcGF0dGVybiA9IFwiKCApKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKShbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0pXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0JDIgPSAkMi5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19JDNcIik7XG5cblx0XHQvL2lkZW50aWZ5IHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX1cblx0XHRwYXR0ZXJuID0gXCIoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdKShbXFwuLCE/XSk/KFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKShbIF18W1xcLiwhP10pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwiJDEkMnt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0kNFwiKTtcblxuXHRcdC8vaWRlbnRpZnkgc2luZ2xlIHF1b3RlIHBhaXJzXG5cdFx0cGF0dGVybiA9IFwiKHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSkoLio/KSh7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19KVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0JDIgPSAkMi5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX1cIik7XG5cblx0XHRyZXR1cm4gJDEgKyAkMiArICQzO1xuXHR9KTtcblxuXG5cdC8qIFszXSBJZGVudGlmeSBmZWV0LCBhcmNtaW51dGVzLCBtaW51dGVzXG5cdFx0XHRcdCBOb3RlOiB3ZeKAmXJlIG5vdCB1c2luZyBzaW5nbGVfcXVvdGVfYWRlcHRzIHZhcmlhYmxlXG5cdFx0XHRcdCBhcyBjb21tYXMgYW5kIGxvdy1wb3NpdGlvbmVkIHF1b3RlcyBhcmUgb21taXRlZCovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxkKSggPykoJ3zigJh84oCZfOKAm3zigLIpL2csIFwiJDF7e3R5cG9wb19fc2luZ2xlLXByaW1lfX1cIik7XG5cblxuXHQvKiBbNF0gSWRlbnRpZnkgcmVzaWR1YWwgYXBvc3Ryb3BoZXMgdGhhdCBoYXZlIGxlZnQgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19XCIpO1xuXG5cblxuXHQvKiBbNV0gUHVuY3R1YXRpb24gcmVwbGFjZW1lbnQgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fc2luZ2xlLXByaW1lfX0pL2csIFwi4oCyXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2Fwb3N0cm9waGV9fXx7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX18e3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fS9nLCBcIuKAmVwiKTtcblxuXG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0Y2FzZSBcInJ1ZVwiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAuVwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oC6XCIpO1xuXHRcdGJyZWFrO1xuXHRjYXNlIFwic2tcIjpcblx0Y2FzZSBcImNzXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCaXCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJhcIik7XG5cdFx0YnJlYWs7XG5cdGNhc2UgXCJlblwiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmFwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCZXCIpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpIHtcblx0cmV0dXJuIHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nLnJlcGxhY2UoLyhbMS05XStbIF17MCwxfVthLXd6XSopKFsgXXswLDF9W3h8w5ddWyBdezAsMX0pKFsxLTldK1sgXXswLDF9W2Etd3pdKikvZywgXCIkMSDDlyAkM1wiKSk7XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBoeXBoZW4gd2l0aCBlbSBvciBlbiBkYXNoXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBSZXBsYWNlIDMgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0tKSB3aXRoIGFuIGVtIGRhc2ggKOKAlClcblx0WzJdIFJlcGxhY2UgMiBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLSkgd2l0aCBhbiBlbiBkYXNoICjigJQpXG5cdFszXSBSZXBsYWNlIGFueSBoeXBoZW4gb3IgZGFzaCBzdXJyb3VuZGVkIHdpdGggc3BhY2VzIHdpdGggYW4gZW0gZGFzaFxuXHRbNF0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCB1c2VkIGluIG51bWJlciByYW5nZSB3aXRoIGFuIGVuIGRhc2hcblx0XHRcdGFuZCBzZXQgcHJvcGVyIHNwYWNpbmdcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggZGFzaGVzIGluc3RlYWQgb2YgaHlwaGVuc1xuKi9cbmZ1bmN0aW9uIHJlcGxhY2VfaHlwaGVuX3dpdGhfZGFzaChzdHJpbmcsIGxhbmd1YWdlKSB7XG5cdHZhciBkYXNoZXMgPSBcIi3igJPigJRcIjsgLy8gaW5jbHVkaW5nIGEgaHlwaGVuXG5cblx0LyogWzFdIFJlcGxhY2UgMyBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLS0pIHdpdGggYW4gZW0gZGFzaCAo4oCUKSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKC0tLSkvZywgXCLigJRcIik7XG5cblxuXHQvKiBbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlCkgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygtLSkvZywgXCLigJNcIik7XG5cblxuXHQvKiBbM10gUmVwbGFjZSBhbnkgaHlwaGVuIG9yIGRhc2ggc3Vycm91bmRlZCB3aXRoIHNwYWNlcyB3aXRoIGFuIGVtIGRhc2ggKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIiArIHNwYWNlcyArIFwiXVtcIiArIGRhc2hlcyArIFwiXVtcIiArIHNwYWNlcyArIFwiXVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIHJlcGxhY2VtZW50ID0gbmFycm93X25ic3AgKyBcIuKAlFwiICsgaGFpcl9zcGFjZTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXHQvKiBbNC4xXSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoLCBwbGFjZWQgYmV0d2VlbiAyIGNhcmRpbmFsIG51bWJlcnMsXG5cdFx0XHRcdFx0IHdpdGggYW4gZW4gZGFzaDsgaW5jbHVkaW5nIGNhc2VzIHdoZW4gdGhlcmUgaXMgYW4gZXh0cmEgc3BhY2Vcblx0XHRcdFx0XHQgZnJvbSBlaXRoZXIgb25lIHNpZGUgb3IgYm90aCBzaWRlcyBvZiB0aGUgZGFzaCAqL1xuXHR2YXIgY2FyZGluYWxfbnVtYmVyID0gXCJcXFxcZCtcIjtcblx0cGF0dGVybiA9IFwiKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFtcIiArIHNwYWNlcyArIFwiXT9bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBzcGFjZXMgKyBcIl0/KShcIiArIGNhcmRpbmFsX251bWJlciArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMeKAkyQzXCIpO1xuXG5cblx0LyogWzQuMl0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCwgcGxhY2VkIGJldHdlZW4gMiBvcmRpbmFsIG51bWJlcnMsXG5cdFx0XHRcdFx0IHdpdGggYW4gZW4gZGFzaDsgaW5jbHVkaW5nIGNhc2VzIHdoZW4gdGhlcmUgaXMgYW4gZXh0cmEgc3BhY2Vcblx0XHRcdFx0XHQgZnJvbSBlaXRoZXIgb25lIHNpZGUgb3IgYm90aCBzaWRlcyBvZiB0aGUgZGFzaCAqL1xuXHR2YXIgb3JkaW5hbF9pbmRpY2F0b3IgPSBcIlwiO1xuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdFx0Y2FzZSBcInJ1ZVwiOlxuXHRcdGNhc2UgXCJza1wiOlxuXHRcdGNhc2UgXCJjc1wiOlxuXHRcdFx0b3JkaW5hbF9pbmRpY2F0b3IgPSBcIlxcXFwuXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiZW5cIjpcblx0XHRcdG9yZGluYWxfaW5kaWNhdG9yID0gXCJzdHxuZHxyZHx0aFwiO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0cGF0dGVybiA9IFwiKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFwiICsgb3JkaW5hbF9pbmRpY2F0b3IgKyBcIikoW1wiICsgc3BhY2VzICsgXCJdP1tcIiArIGRhc2hlcyArIFwiXVtcIiArIHNwYWNlcyArIFwiXT8pKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFwiICsgb3JkaW5hbF9pbmRpY2F0b3IgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDLigJMkNCQ1XCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZXBsYWNlX2Rhc2hfd2l0aF9oeXBoZW4oc3RyaW5nKXtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXSkoW+KAk+KAlF0pKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxLSQzXCIpO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdENvbnNvbGlkYXRpb24gb2Ygc3BhY2VzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgc3BhY2VzICsgXCJdKShbXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIGNsb3NpbmdfYnJhY2tldHMgKyBkZWdyZWUgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDJcIik7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgb3BlbmluZ19icmFja2V0cyArIFwiXSkoW1wiICsgc3BhY2VzICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX3RyYWlsaW5nX3NwYWNlcyhzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy50cmltKCk7XG59XG5cblxuXG5mdW5jdGlvbiBhZGRfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pKFtcIiArIG9wZW5pbmdfYnJhY2tldHMgKyBcIl0pKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDIkM1wiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGFkZF9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKShbXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIGNsb3NpbmdfYnJhY2tldHMgKyBcIl0pKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMiAkM1wiKTtcbn1cblxuXG5cbi8qXG5cdFJlbW92ZXMgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgZWFjaCBwYXJhZ3JhcGhcblxuXHRUaGlzIGNvdWxkIGJlIGRvbmUgd2l0aCBhIG9uZS1saW5lcjpcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzKy9nbSwgXCJcIik7XG5cblx0SG93ZXZlciwgaXQgYWxzbyByZW1vdmVzIGVtcHR5IGxpbmVzLiBTaW5jZSwgd2Ugd2FudCB0byBoYW5kbGUgdGhpcyBjaGFuZ2Vcblx0c2VwYXJhdGVseSwgd2UgbmVlZCB0b1xuXHRbMV0gc3BsaXQgdGhlIGxpbmVzIG1hbnVhbGx5XG5cdFsyXSBhbmQgcmVtb3ZlIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5pbmcgb2YgZWFjaCBsaW5lXG5cdFszXSBqb2luIGxpbmVzIHRvZ2V0aGVyIHRvIGEgc2luZ2xlIHN0cmluZ1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCByZW1vdmVkIHNwYWNlcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHBhcmFncmFwaHNcbiovXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VzX2F0X3BhcmFncmFwaF9iZWdpbm5pbmcoc3RyaW5nKSB7XG5cdC8qIFsxXSBzcGxpdCB0aGUgbGluZXMgbWFudWFsbHkgKi9cblx0dmFyIGxpbmVzID0gc3RyaW5nLnNwbGl0KC9cXHI/XFxuLyk7XG5cblx0LyogWzJdIGFuZCByZW1vdmUgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbmluZyBvZiBlYWNoIGxpbmUgKi9cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuXHRcdGxpbmVzW2ldID0gbGluZXNbaV0ucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcblx0fVxuXG5cdC8qIFszXSBqb2luIGxpbmVzIHRvZ2V0aGVyIHRvIGEgc2luZ2xlIHN0cmluZyAqL1xuXHRyZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbn1cblxuXG5cbi8qXG5cdFJlbW92ZXMgZW1wdHkgbGluZXNcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggcmVtb3ZlZCBlbXB0eSBsaW5lc1xuKi9cbmZ1bmN0aW9uIHJlbW92ZV9lbXB0eV9saW5lcyhzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzKy9nbSwgXCJcIik7XG59XG5cblxuXG4vKlxuXHRDb25zb2xpZGF0ZXMgdGhlIHVzZSBvZiBub24tYnJlYWtpbmcgc3BhY2VzXG5cblx0KiByZW1vdmVzIGNoYXJhY3RlcnMgYmV0d2VlbiBtdWx0aS1jaGFyYWN0ZXIgd29yZHNcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgY2FyZGluYWwgbnVtYmVyc1xuXHQqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhcm91bmQgw5dcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgc2luZ2xlLWNoYXJhY3RlciBwcmVwb3NpdGlvbnNcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGx5IHBsYWNlZCBub24tYnJlYWtpbmcgc3BhY2VcbiovXG5mdW5jdGlvbiBjb25zb2xpZGF0ZV9uYnNwKHN0cmluZykge1xuXG5cdC8vIHJlbW92ZXMgbm9uLWJyZWFraW5nIHNwYWNlcyBiZXR3ZWVuIG11bHRpLWNoYXJhY3RlciB3b3Jkc1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXXsyLH0pKFtcIisgbmJzcCArIG5hcnJvd19uYnNwICtcIl0pKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXXsyLH0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDNcIik7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSAkM1wiKTsgLy9jYWxsaW5nIGl0IHR3aWNlIHRvIGNhdGNoIG9kZC9ldmVuIG9jY3VyZW5jZXNcblxuXG5cdC8vIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBjYXJkaW5hbCBudW1iZXJzXG5cdHBhdHRlcm4gPSBcIihbMC05XSspKCApKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXSspXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciByZXBsYWNlbWVudCA9IFwiJDFcIiArIG5ic3AgKyBcIiQzXCI7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFyb3VuZCDDl1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgc3BhY2VzICsgXCJdKShbw5ddKShbXCIgKyBzcGFjZXMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJlcGxhY2VtZW50ID0gbmJzcCArIFwiJDJcIiArIG5ic3A7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgc2luZ2xlLWNoYXJhY3RlciBwcmVwb3NpdGlvbnNcblx0cGF0dGVybiA9IFwiKFvCoCBdKShbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXXwmKSggKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXBsYWNlbWVudCA9IFwiJDEkMlwiICsgbmJzcDtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTsgLy9jYWxsaW5nIGl0IHR3aWNlIHRvIGNhdGNoIG9kZC9ldmVuIG9jY3VyZW5jZXNcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgc3BhY2luZyBhcm91bmQgZWxsaXBzaXMgYW5kIGFwb3Npb3Blc2lzXG5cblx0RWxsaXBzaXMgKGFzIGEgY2hhcmFjdGVyKSBpcyB1c2VkIGZvciAyIGRpZmZlcmVudCBwdXJwb3Nlczpcblx0MS4gYXMgYW4gZWxsaXBzaXMgdG8gb21taXQgYSBwaWVjZSBvZiBpbmZvcm1hdGlvbiBkZWxpYmVyYXRlbHlcblx0Mi4gYXMgYW4gYXBvc2lvcGVzaXM7IGEgZmlndXJlIG9mIHNwZWVjaCB3aGVyZWluIGEgc2VudGVuY2UgaXNcblx0ZGVsaWJlcmF0ZWx5IGJyb2tlbiBvZmYgYW5kIGxlZnQgdW5maW5pc2hlZFxuXG5cdHNvdXJjZXNcblx0aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRWxsaXBzaXNcblx0aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQXBvc2lvcGVzaXNcblx0aHR0cDovL3d3dy5saXRlZXJhLmN6L3Nsb3ZuaWsvdnlwdXN0a2FcblxuXHRBbGdvcml0aG1cblx0RWxsaXBzaXMgJiBBcG9zaW9wZXNpcyByZXF1aXJlIGRpZmZlcmVudCB1c2Ugb2Ygc3BhY2luZyBhcm91bmQgdGhlbSxcblx0dGhhdCBpcyB3aHkgd2UgYXJlIGNvcnJlY3Rpbmcgb25seSBmb2xsb3dpbmcgY2FzZXM6XG5cdGVycm9yczpcblx0WzFdIGNvcnJlY3Qgc3BhY2luZywgd2hlbiBlbGxpcHNpcyB1c2VkIHVzZWQgYXJvdW5kIGNvbW1hc1xuXHRbMl0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzNdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2UgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoXG5cdFs0XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaFxuXHRbNV0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGhcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGVkIHNwYWNpbmcgYXJvdW5kIGFwb3Npb3Blc2lzXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9zcGFjZXNfYXJvdW5kX2VsbGlwc2lzKHN0cmluZykge1xuXG5cdC8qIFsxXSBjb3JyZWN0IHNwYWNpbmcsIHdoZW4gZWxsaXBzaXMgdXNlZCB1c2VkIGFyb3VuZCBjb21tYXMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIixbXCIgKyBzcGFjZXMgKyBcIl0/XCIgKyBlbGxpcHNpcyArIFwiW1wiICsgc3BhY2VzICsgXCJdPyxcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiwg4oCmLFwiKTtcblxuXG5cdC8qIFsyXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pKFtcIiArIHNwYWNlcyArIFwiXSkoXCIgKyBlbGxpcHNpcyArIFwiW1wiICsgc3BhY2VzICsgXCJdW1wiICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFszXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgXCJdW1wiICsgc3BhY2VzICsgXCJdXCIgKyBlbGxpcHNpcyArXCIpKFtcIiArIHNwYWNlcyArIFwiXSkoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzRdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoXuKApikoW1wiICsgc3BhY2VzICsgXCJdKShbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ21cIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNV0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgYXQgdGhlIGVuZCBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBcIl0pKFtcIiArIHNwYWNlcyArIFwiXSkoXCIgKyBlbGxpcHNpcyArIFwiKSg/IVsgXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBhY2NpZGVudGFsIHVwcGVyY2FzZVxuXG5cdEJlc3QtZWZmb3J0IGZ1bmN0aW9uIHRvIGZpeCBtb3N0IGNvbW1vbiBhY2NpZGVudGFsIHVwcGVyY2FzZSBlcnJvcnMsIG5hbWVseTpcblx0WzFdIDIgZmlyc3QgdXBwZXJjYXNlIGxldHRlcnMgKGllLiBVUHBlcmNhc2UpXG5cdFsyXSBTd2FwcGVkIGNhc2VzIChpZS4gdVBQRVJDQVNFKVxuXG5cdEFsZ29yaXRobSBkb2VzIG5vdCBmaXggb3RoZXIgdXBwZXJjYXNlIGV2ZW50dWFsaXRpZXMsXG5cdGUuZy4gbWl4ZWQgY2FzZSAoVXBwRVJjYVNlKSBhcyB0aGVyZSBhcmUgbWFueSBjYXNlcyBmb3IgY29ycG9yYXRlIGJyYW5kc1xuXHR0aGF0IGNvdWxkIHBvdGVudGlhbGx5IG1hdGNoIHRoZSBhbGdvcml0aG0gYXMgZmFsc2UgcG9zaXRpdmUuXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RlZCBhY2NpZGVudGFsIHVwcGVyY2FzZVxuKi9cbmZ1bmN0aW9uIGNvcnJlY3RfYWNjaWRlbnRhbF91cHBlcmNhc2Uoc3RyaW5nKSB7XG5cblx0LyogWzFdIHR3byBmaXJzdCB1cHBlcmNhc2UgbGV0dGVycyAoaS5lLiBVUHBlcmNhc2UpICovXG5cdHZhciBwYXR0ZXJuID0gXCJbXCIrIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXXsyLDJ9W1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0rXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oc3RyaW5nKXtcblx0XHRyZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG5cdH0pO1xuXG5cdC8qIFsyLjFdIFN3YXBwZWQgY2FzZXMgKDItbGV0dGVyIGNhc2VzLCBpLmUuIGlUKVxuXHRcdFx0Tm90ZSB0aGF0IHRoaXMgaXMgZGl2aWRlZCBpbnRvIDIgc2VwYXJhdGUgY2FzZXMgYXMgXFxiIGluIEphdmFTY3JpcHQgcmVnZXhcblx0XHRcdGRvZXMgbm90IHRha2Ugbm9uLWxhdGluIGNoYXJhY3RlcnMgaW50byBhIGNvc25pZGVyYXRpb25cblx0Ki9cblx0cGF0dGVybiA9IFwiW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl1bXCIrIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXVxcXFxiXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0LyogWzIuMl0gU3dhcHBlZCBjYXNlcyAobi1sZXR0ZXIgY2FzZXMsIGkuZS4gdVBQRVJDQVNFKSAqL1xuXHRwYXR0ZXJuID0gXCJbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXStbXCIrIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXXsyLH1cIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKHN0cmluZyl7XG5cdFx0cmV0dXJuIChzdHJpbmcuc3Vic3RyaW5nKDAsMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuXHR9KTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEFiYnJldmlhdGlvbnNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcblx0SWRlbnRpZmllcyBkaWZmZXJlbnRseS1zcGVsbGVkIGFiYnJldmlhdGlvbnMgYW5kIHJlcGxhY2VzIGl0IHdpdGhcblx0YSB0ZW1wIHZhcmlhYmxlLCB7e3R5cG9wb19fW2FiYnJdfX1cblxuXHRJZGVudGlmaWVzIGdpdmVuIGFiYnJldmlhdGlvbnM6XG5cdGEubS4sIHAubS4sIGUuZy4sIGkuZS5cblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGUuZy4sIGkuZS5cblx0WzJdIElkZW50aWZ5IGEubS4sIHAubS4gKGRpZmZlcmVudCBtYXRjaCB0byBhdm9pZCBmYWxzZSBwb3NpdGl2ZXMgc3VjaCBhczpcblx0XHRcdEkgYW0sIEhlIGlzIHRoZSBQTS4pXG5cdFszXSBFeGNsdWRlIGZhbHNlIGlkZW50aWZpY2F0aW9uc1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKSB7XG5cblx0LyogWzFdIElkZW50aWZ5IGUuZy4sIGkuZS4gKi9cblx0dmFyIGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwiKFxcXFxiW1wiICsgYWJicmV2aWF0aW9uc1tpXVswXSArIFwiXVxcXFwuP1tcIisgc3BhY2VzICtcIl0/W1wiICsgYWJicmV2aWF0aW9uc1tpXVsxXSArIFwiXVxcXFwuPykoW1wiKyBzcGFjZXMgK1wiXT8pKFxcXFxiKVwiO1xuXHRcdC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBcInt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19IFwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgYS5tLiwgcC5tLiAqL1xuXHRhYmJyZXZpYXRpb25zID0gW1wiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcIihcXFxcZCkoW1wiICsgc3BhY2VzICsgXCJdPykoXFxcXGJbXCIgKyBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCJdXFxcXC4/W1wiKyBzcGFjZXMgK1wiXT9bXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCJdXFxcXC4/KShbXCIrIHNwYWNlcyArXCJdPykoXFxcXGJ8XFxcXEIpXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gXCIkMSB7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSBcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblxuXHQvKiBbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblx0XHQgUmVnZXggXFxiIGRvZXMgbm90IGNhdGNoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzIHNvIHdlIG5lZWQgdG8gZXhjbHVkZSBmYWxzZVxuXHRcdCBpZGVudGlmaWNhdGlvbnNcblx0Ki9cblx0YWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBub24tbGF0aW4gY2hhcmFjdGVyIGF0IHRoZSBiZWdpbm5pbmdcblx0XHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIG5vbl9sYXRpbl9jaGFycyArIFwiXSkoe3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0pXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBcIiQxXCIgKyBhYmJyZXZpYXRpb25zW2ldO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblx0XHQvLyBub24tbGF0aW4gY2hhcmFjdGVyIGF0IHRoZSBlbmRcblx0XHRwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gKShbXCIgKyBub25fbGF0aW5fY2hhcnMgKyBcIl0pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHRyZXBsYWNlbWVudCA9IGFiYnJldmlhdGlvbnNbaV0gKyBcIiQyXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBpZGVudGlmaWVkIHRlbXAgYWJicmV2aWF0aW9uIHZhcmlhYmxlIGxpa2Uge3t0eXBvcG9fX2VnfX0sXG5cdHdpdGggdGhlaXIgYWN0dWFsIHJlcHJlc2VudGF0aW9uXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBwbGFjZV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpIHtcblx0dmFyIGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCIsIFwiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcInt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19XCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gYWJicmV2aWF0aW9uc1tpXVswXSArIFwiLlwiICsgYWJicmV2aWF0aW9uc1tpXVsxXSArIFwiLlwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0RXhjZXB0aW9uc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuLypcblx0SWRlbnRpZmllcyBleGNlcHRpb25zIHRoYXQgd2lsbCBiZSBvbW1pdGVkIGZyb20gY29ycmVjdGlvbiBvZiBhbnkgc29ydFxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgZW1haWwgYWRyZXNzZXNcblx0WzJdIElkZW50aWZ5IHdlYiBVUkxzIGFuZCBJUHNcblx0WzNdIE1hcmsgdGhlbSBhcyB0ZW1wb3JhcnkgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvbiBvZiBleGNlcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBpZGVudGlmaWVkIGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX1cbiovXG5mdW5jdGlvbiBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZykge1xuXG5cdC8qIFsxXSBJZGVudGlmeSBlbWFpbCBhZHJlc3NlcyAqL1xuXHRpZGVudGlmeV9leGNlcHRpb25fc2V0KHN0cmluZywgZW1haWxfYWRkcmVzc19wYXR0ZXJuKTtcblxuXG5cdC8qIFsyXSBJZGVudGlmeSB3ZWIgVVJMcyBhbmQgSVBzICovXG5cdGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCB3ZWJfdXJsX3BhdHRlcm4pO1xuXG5cblx0LyogWzNdIE1hcmsgdGhlbSBhcyB0ZW1wb3JhcnkgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fSAqL1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2VwdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBcInt7dHlwb3BvX19leGNlcHRpb24tXCIgKyBpICsgXCJ9fVwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKGV4Y2VwdGlvbnNbaV0sIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRJZGVudGlmaWVzIHNldCBvZiBleGNlcHRpb25zIGZvciBnaXZlbiBwYXR0ZXJuXG5cdFVzZWQgYXMgaGVscGVyIGZ1bmN0aW9uIGZvciBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZylcblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb24gb2YgZXhjZXB0aW9uc1xuXHRAcGFyYW0ge3BhdHRlcm59IHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuIHRvIG1hdGNoIGV4Y2VwdGlvblxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBwYXR0ZXJuKSB7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgbWF0Y2hlZF9leGNlcHRpb25zID0gc3RyaW5nLm1hdGNoKHJlKTtcblx0aWYgKG1hdGNoZWRfZXhjZXB0aW9ucyAhPSBudWxsKSB7XG5cdFx0ZXhjZXB0aW9ucyA9IGV4Y2VwdGlvbnMuY29uY2F0KG1hdGNoZWRfZXhjZXB0aW9ucyk7XG5cdH1cbn1cblxuXG5cbi8qXG5cdFJlcGxhY2VzIGlkZW50aWZpZWQgZXhjZXB0aW9ucyB3aXRoIHJlYWwgb25lcyBieSBjaGFuZ2UgdGhlaXJcblx0dGVtcG9yYXJ5IHJlcHJlc2VudGF0aW9uIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19IHdpdGggaXRzXG5cdGNvcnJlc3BvbmRpbmcgcmVwcmVzZW50YXRpb25cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCB3aXRoIGlkZW50aWZpZWQgZXhjZXB0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSBvdXRwdXQgd2l0aCBwbGFjZWQgZXhjZXB0aW9uc1xuKi9cbmZ1bmN0aW9uIHBsYWNlX2V4Y2VwdGlvbnMoc3RyaW5nKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZXhjZXB0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCJ7e3R5cG9wb19fZXhjZXB0aW9uLVwiICsgaSArIFwifX1cIlxuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IGV4Y2VwdGlvbnNbaV07XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0TWFpbiBzY3JpcHRcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuLypcblx0Q29ycmVjdCB0eXBvcyBpbiB0aGUgcHJlZGVmaW5lZCBvcmRlclxuXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgY29ycmVjdGlvblxuXHRAcGFyYW0ge2xhbmd1YWdlfSBzdHJpbmcg4oCUIGxhbmd1YWdlIG9wdGlvbiB0byBjb3JyZWN0IHNwZWNpZmljIHR5cG9zOyBzdXBwb3J0ZWQgbGFuZ3VhZ2VzOiBlbiwgc2ssIGNzLCBydWUuIGlmIG5vdCBzcGVjaWZpZWQsIEVuZ2xpc2ggdHlwb3MgYXJlIGNvcnJlY3RlZFxuXHRAcGFyYW0ge3JlbW92ZV9saW5lc30gYm9vbGVhbiDigJQgb3B0aW9uYWwgcGFyYW1ldGVyIGFsbG93aW5nIHlvdSB0byBjaG9vc2Ugd2hldGhlciB0byByZW1vdmUgZW1wdHkgbGluZXMgb3Igbm90XG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGNvcnJlY3RfdHlwb3Moc3RyaW5nLCBsYW5ndWFnZSwgY29uZmlndXJhdGlvbikge1xuXHRsYW5ndWFnZSA9ICh0eXBlb2YgbGFuZ3VhZ2UgPT09IFwidW5kZWZpbmVkXCIpID8gXCJlblwiIDogbGFuZ3VhZ2U7XG5cblx0Y29uZmlndXJhdGlvbiA9ICh0eXBlb2YgY29uZmlndXJhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikgPyB7XG5cdFx0cmVtb3ZlTGluZXMgOiB0cnVlLFxuXHR9IDogY29uZmlndXJhdGlvbjtcblxuXHRzdHJpbmcgPSBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZyk7XG5cdHN0cmluZyA9IGlkZW50aWZ5X2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZyk7IC8vIG5lZWRzIHRvIGdvIGJlZm9yZSBwdW5jdHVhdGlvbiBmaXhlc1xuXG5cdHN0cmluZyA9IHJlcGxhY2Vfc3ltYm9scyhzdHJpbmcsIGVzc2VudGlhbF9zZXQpO1xuXHRzdHJpbmcgPSByZXBsYWNlX3BlcmlvZHNfd2l0aF9lbGxpcHNpcyhzdHJpbmcpO1xuXHRzdHJpbmcgPSByZW1vdmVfbXVsdGlwbGVfc3BhY2VzKHN0cmluZyk7XG5cblxuXHRzdHJpbmcgPSBjb3JyZWN0X2RvdWJsZV9xdW90ZXNfYW5kX3ByaW1lcyhzdHJpbmcsIGxhbmd1YWdlKTtcblx0c3RyaW5nID0gY29ycmVjdF9zaW5nbGVfcXVvdGVzX3ByaW1lc19hbmRfYXBvc3Ryb3BoZXMoc3RyaW5nLCBsYW5ndWFnZSk7XG5cblx0c3RyaW5nID0gY29ycmVjdF9tdWx0aXBsZV9zaWduKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSByZW1vdmVfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3RyYWlsaW5nX3NwYWNlcyhzdHJpbmcpO1xuXHRzdHJpbmcgPSBhZGRfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IGFkZF9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSByZW1vdmVfc3BhY2VzX2F0X3BhcmFncmFwaF9iZWdpbm5pbmcoc3RyaW5nKTtcblxuXHRpZihjb25maWd1cmF0aW9uLnJlbW92ZUxpbmVzKSB7XG5cdFx0c3RyaW5nID0gcmVtb3ZlX2VtcHR5X2xpbmVzKHN0cmluZyk7XG5cdH1cblxuXHRzdHJpbmcgPSBjb25zb2xpZGF0ZV9uYnNwKHN0cmluZyk7XG5cdHN0cmluZyA9IGNvcnJlY3Rfc3BhY2VzX2Fyb3VuZF9lbGxpcHNpcyhzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlcGxhY2VfaHlwaGVuX3dpdGhfZGFzaChzdHJpbmcsIGxhbmd1YWdlKTtcblx0c3RyaW5nID0gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZyk7XG5cblx0c3RyaW5nID0gY29ycmVjdF9hY2NpZGVudGFsX3VwcGVyY2FzZShzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHBsYWNlX2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZyk7IC8vIG5lZWRzIHRvIGdvIGFmdGVyIHB1bmN0dWF0aW9uIGZpeGVzXG5cdHN0cmluZyA9IHBsYWNlX2V4Y2VwdGlvbnMoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZXBsYWNlX3BlcmlvZHNfd2l0aF9lbGxpcHNpcyhzdHJpbmcpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG4iXX0=

//# sourceMappingURL=maps/typopo_browser.built.js.map
