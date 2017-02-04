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
function correct_typos(string, language, remove_lines) {
	language = typeof language === "undefined" ? "en" : language;
	remove_lines = typeof remove_lines === "undefined" ? true : remove_lines;

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

	if (remove_lines) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGJyb3dzZXJfdHlwb3BvLmpzIiwic3JjXFx0eXBvcG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUVBLE9BQU8sYUFBUDs7Ozs7Ozs7UUNpNUJnQixhLEdBQUEsYTtBQW41QmhCOzs7Ozs7Ozs7QUFXQTs7OztBQUlBLElBQUksZ0JBQWdCO0FBQ25CLFlBQVcsR0FEUTtBQUVuQixZQUFXLEdBRlE7QUFHbkIsWUFBVyxHQUhRO0FBSW5CLFlBQVcsR0FKUTtBQUtuQixhQUFZLEdBTE87QUFNbkIsYUFBWSxHQU5PO0FBT25CLFdBQVUsR0FQUztBQVFuQixXQUFVO0FBUlMsQ0FBcEI7QUFVQSxJQUFJLHNCQUFzQiw4REFBMUI7QUFDQSxJQUFJLHNCQUFzQiw4REFBMUI7QUFDQSxJQUFJLGtCQUFrQixzQkFBc0IsbUJBQTVDO0FBQ0EsSUFBSSwrQkFBK0IsUUFBUSxtQkFBM0M7QUFDQSxJQUFJLCtCQUErQixRQUFRLG1CQUEzQztBQUNBLElBQUksWUFBWSwrQkFBK0IsNEJBQS9DO0FBQ0E7Ozs7Ozs7Ozs7QUFVQSxJQUFJLHNCQUFzQixtQkFBMUI7QUFDQSxJQUFJLHNCQUFzQiwwREFBMUI7QUFDQSxJQUFJLFFBQVEsR0FBWjtBQUNBLElBQUksT0FBTyxHQUFYO0FBQ0EsSUFBSSxhQUFhLEdBQWpCLEMsQ0FBc0I7QUFDdEIsSUFBSSxjQUFjLEdBQWxCLEMsQ0FBdUI7QUFDdkIsSUFBSSxTQUFTLFFBQVEsSUFBUixHQUFlLFVBQWYsR0FBNEIsV0FBekM7QUFDQSxJQUFJLHVCQUF1QixRQUEzQjtBQUNBLElBQUksdUJBQXVCLFdBQVcsb0JBQXRDLEMsQ0FBNEQ7QUFDNUQsSUFBSSxtQkFBbUIsV0FBdkI7QUFDQSxJQUFJLG1CQUFtQixXQUF2QjtBQUNBLElBQUksV0FBVyxHQUFmO0FBQ0EsSUFBSSxTQUFTLEdBQWI7O0FBRUE7Ozs7QUFJQSxJQUFJLGtC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OlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBjb3JyZWN0X3R5cG9zIH0gZnJvbSAnLi90eXBvcG8nO1xuXG53aW5kb3cuY29ycmVjdF90eXBvcyA9IGNvcnJlY3RfdHlwb3M7XG4iLCIvKiFcbiAqIFR5cG9wbyAxLjQuMFxuICpcbiAqIENvcHlyaWdodCAyMDE1LTE3IEJyYcWIbyDFoGFuZGFsYVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNy0wMS0xNVxuICovXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0VmFyaWFibGVzICYgQ2hhcmFjdGVyIHJlcGxhY2VtZW50IHNldHNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG52YXIgZXNzZW50aWFsX3NldCA9IHtcblx0XCJcXFxcKENcXFxcKVwiOiBcIsKpXCIsXG5cdFwiXFxcXChjXFxcXClcIjogXCLCqVwiLFxuXHRcIlxcXFwoUlxcXFwpXCI6IFwiwq5cIixcblx0XCJcXFxcKHJcXFxcKVwiOiBcIsKuXCIsXG5cdFwiXFxcXChUTVxcXFwpXCI6IFwi4oSiXCIsXG5cdFwiXFxcXCh0bVxcXFwpXCI6IFwi4oSiXCIsXG5cdFwiXFxcXCtcXFxcLVwiOiBcIsKxXCIsXG5cdFwiXFxcXC1cXFxcK1wiOiBcIsKxXCIsXG59O1xudmFyIG5vbl9sYXRpbl9sb3dlcmNhc2UgPSBcIsOhw6TEjcSPw6nEm8OtxLrEvsWIw7PDtMO2xZHFlcWZxaHFpcO6w7zFscWvw73FvtCw0LHQstCz0pHQtNC10LfRltC40LnQutC70LzQvdC+0L/RgNGB0YLRg9GE0YrRi9GM0YbRh9C20YjRl9GJ0ZHRlNGO0Y/RhVwiO1xudmFyIG5vbl9sYXRpbl91cHBlcmNhc2UgPSBcIsOBw4TEjMSOw4nEmsONxLnEvcWHw5PDlMOWxZDFlMWYxaDFpMOaw5zFsMWuw53FvdCQ0JHQktCT0pDQlNCV0JfQhtCY0JnQmtCb0JzQndCe0J/QoNCh0KLQo9Ck0KrQq9Cs0KbQp9CW0KjQh9Cp0IHQhNCu0K/QpVwiO1xudmFyIG5vbl9sYXRpbl9jaGFycyA9IG5vbl9sYXRpbl9sb3dlcmNhc2UgKyBub25fbGF0aW5fdXBwZXJjYXNlO1xudmFyIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgPSBcImEtelwiICsgbm9uX2xhdGluX2xvd2VyY2FzZTtcbnZhciB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlID0gXCJBLVpcIiArIG5vbl9sYXRpbl91cHBlcmNhc2U7XG52YXIgYWxsX2NoYXJzID0gbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWU7XG4vKlxuXHQgKDM5KVx0XHRcdGR1bWIgc2luZ2xlIHF1b3RlXG5cdCAoODIxNilcdFx0bGVmdCBzaW5nbGUgcXVvdGF0aW9uIG1hcmtcblx0ICg4MjE3KVx0XHRyaWdodCBzaW5nbGUgcXVvdGF0aW9uIG1hcmtcblx0ICg3MDApXHRcdG1vZGlmaWVyIGxldHRlciBhcG9zdHJvcGhlOyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Nb2RpZmllcl9sZXR0ZXJfYXBvc3Ryb3BoZVxuXHQgKDgyMTkpXHRcdHNpbmdsZSBoaWdoLXJldmVyc2VkLTkgcXVvdGF0aW9uIG1hcmtcblx0ICg4MjQyKVx0XHRwcmltZVxuXHQgKDgyNDkpXHRcdHNpbmdsZSBsZWZ0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrXG5cdCAoODI1MClcdFx0c2luZ2xlIHJpZ2h0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrXG4qL1xudmFyIHNpbmdsZV9xdW90ZV9hZGVwdHMgPSBcIuKAmnwnfOKAmHzigJl8yrx84oCbfOKAsnzigLl84oC6XCI7XG52YXIgZG91YmxlX3F1b3RlX2FkZXB0cyA9IFwi4oCefOKAnHzigJ18XFxcInzCq3zCu3zigLN8LHsyLH184oCYezIsfXzigJl7Mix9fCd7Mix9fOKAuXsyLH184oC6ezIsfXzigLJ7Mix9XCI7XG52YXIgc3BhY2UgPSBcIiBcIjtcbnZhciBuYnNwID0gXCLCoFwiO1xudmFyIGhhaXJfc3BhY2UgPSBcIuKAilwiOyAvLyYjODIwMjtcbnZhciBuYXJyb3dfbmJzcCA9IFwi4oCvXCI7IC8vJiM4MjM5O1xudmFyIHNwYWNlcyA9IHNwYWNlICsgbmJzcCArIGhhaXJfc3BhY2UgKyBuYXJyb3dfbmJzcDtcbnZhciB0ZXJtaW5hbF9wdW5jdHVhdGlvbiA9IFwiXFwuXFwhXFw/XCI7XG52YXIgc2VudGVuY2VfcHVuY3R1YXRpb24gPSBcIlxcLFxcOlxcO1wiICsgdGVybWluYWxfcHVuY3R1YXRpb247IC8vIHRoZXJlIGlzIG5vIGVsbGlwc2lzIGluIHRoZSBzZXQgYXMgaXQgaXMgYmVpbmcgdXNlZCB0aHJvdWdob3V0IGEgc2VudGVuY2UgaW4gdGhlIG1pZGRsZS4gUmV0aGluayB0aGlzIGdyb3VwIHRvIHNwbGl0IGl0IGludG8gZW5kLXNlbnRlbmNlIHB1bmN0dWF0aW9uIGFuZCBtaWRkbGUgc2VudGVuY2UgcHVuY3R1YXRpb25cbnZhciBvcGVuaW5nX2JyYWNrZXRzID0gXCJcXFxcKFxcXFxbXFxcXHtcIjtcbnZhciBjbG9zaW5nX2JyYWNrZXRzID0gXCJcXFxcKVxcXFxdXFxcXH1cIjtcbnZhciBlbGxpcHNpcyA9IFwi4oCmXCI7XG52YXIgZGVncmVlID0gXCLCsFwiO1xuXG4vKlxuXHRTb3VyY2UgZm9yIHdlYl91cmxfcGF0dGVybiwgZW1haWxfYWRkcmVzc19wYXR0ZXJuXG5cdGh0dHA6Ly9ncmVwY29kZS5jb20vZmlsZS9yZXBvc2l0b3J5LmdyZXBjb2RlLmNvbS9qYXZhL2V4dC9jb20uZ29vZ2xlLmFuZHJvaWQvYW5kcm9pZC8yLjBfcjEvYW5kcm9pZC90ZXh0L3V0aWwvUmVnZXguamF2YSNSZWdleC4wV0VCX1VSTF9QQVRURVJOXG4qL1xudmFyIHdlYl91cmxfcGF0dGVybiA9IFwiKCg/OihodHRwfGh0dHBzfEh0dHB8SHR0cHN8cnRzcHxSdHNwKTpcXFxcL1xcXFwvKD86KD86W2EtekEtWjAtOVxcXFwkXFxcXC1cXFxcX1xcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXCxcXFxcO1xcXFw/XFxcXCZcXFxcPV18KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpezEsNjR9KD86XFxcXDooPzpbYS16QS1aMC05XFxcXCRcXFxcLVxcXFxfXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcXFxcLFxcXFw7XFxcXD9cXFxcJlxcXFw9XXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSl7MSwyNX0pP1xcXFxAKT8pP1wiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIigoPzooPzpbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCw2NH1cXFxcLikrXCIgKyAgLy8gbmFtZWQgaG9zdFxuICAgICAgICAgICAgICAgICAgICAgIFwiKD86XCIgKyAvLyBwbHVzIHRvcCBsZXZlbCBkb21haW5cbiAgICAgICAgICAgICAgICAgICAgICBcIig/OmFlcm98YXJwYXxhc2lhfGFbY2RlZmdpbG1ub3Fyc3R1d3h6XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86Yml6fGJbYWJkZWZnaGlqbW5vcnN0dnd5el0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OmNhdHxjb218Y29vcHxjW2FjZGZnaGlrbG1ub3J1dnh5el0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifGRbZWprbW96XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzplZHV8ZVtjZWdyc3R1XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8Zltpamttb3JdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OmdvdnxnW2FiZGVmZ2hpbG1ucHFyc3R1d3ldKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxoW2ttbnJ0dV1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86aW5mb3xpbnR8aVtkZWxtbm9xcnN0XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86am9ic3xqW2Vtb3BdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxrW2VnaGltbnJ3eXpdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifGxbYWJjaWtyc3R1dnldXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/Om1pbHxtb2JpfG11c2V1bXxtW2FjZGdoa2xtbm9wcXJzdHV2d3h5el0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/Om5hbWV8bmV0fG5bYWNlZmdpbG9wcnV6XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86b3JnfG9tKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpwcm98cFthZWZnaGtsbW5yc3R3eV0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHFhXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHJbZW91d11cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8c1thYmNkZWdoaWprbG1ub3J0dXZ5el1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86dGVsfHRyYXZlbHx0W2NkZmdoamtsbW5vcHJ0dnd6XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8dVthZ2ttc3l6XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInx2W2FjZWdpbnVdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHdbZnNdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHlbZXR1XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInx6W2Ftd10pKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzooPzoyNVswLTVdfDJbMC00XVwiICsgLy8gb3IgaXAgYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgIFwiWzAtOV18WzAtMV1bMC05XXsyfXxbMS05XVswLTldfFsxLTldKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxbMC0xXVswLTldezJ9fFsxLTldWzAtOV18WzEtOV18MClcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJbMC05XXsyfXxbMS05XVswLTldfFsxLTldfDApXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldfFswLTFdWzAtOV17Mn1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8WzEtOV1bMC05XXxbMC05XSkpKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIig/OlxcXFw6XFxcXGR7MSw1fSk/KVwiICsgLy8gcGx1cyBvcHRpb24gcG9ydCBudW1iZXIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKFxcXFwvKD86KD86W2EtekEtWjAtOVxcXFw7XFxcXC9cXFxcP1xcXFw6XFxcXEBcXFxcJlxcXFw9XFxcXCNcXFxcflwiICsgLy8gcGx1cyBvcHRpb24gcXVlcnkgcGFyYW1zXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXFxcLVxcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXFxcXCxcXFxcX10pfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKSopP1wiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIig/OlxcXFxifCQpXCI7IC8vIGFuZCBmaW5hbGx5LCBhIHdvcmQgYm91bmRhcnkgb3IgZW5kIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5wdXQuICBUaGlzIGlzIHRvIHN0b3AgZm9vLnN1cmUgZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoaW5nIGFzIGZvby5zdVxuXG5cblxudmFyIGVtYWlsX2FkZHJlc3NfcGF0dGVybiA9IFwiW2EtekEtWjAtOVxcXFwrXFxcXC5cXFxcX1xcXFwlXFxcXC1dezEsMjU2fVwiICtcbiAgICAgICAgICAgIFwiXFxcXEBcIiArXG4gICAgICAgICAgICBcIlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDY0fVwiICtcbiAgICAgICAgICAgIFwiKFwiICtcbiAgICAgICAgICAgICAgICBcIlxcXFwuXCIgK1xuICAgICAgICAgICAgICAgIFwiW2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsMjV9XCIgK1xuICAgICAgICAgICAgXCIpK1wiO1xuXG52YXIgZXhjZXB0aW9ucyA9IFtdO1xuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRFc2VudGlhbCByZXBsYWNlbWVudHNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiByZXBsYWNlX3N5bWJvbHMoc3RyaW5nKSB7XG5cdGZvciAodmFyIHJ1bGUgaW4gZXNzZW50aWFsX3NldCkge1xuXHRcdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChydWxlLCBcImdcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZXNzZW50aWFsX3NldFtydWxlXSk7XG5cdH1cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZykge1xuXHQvKiBbMV0gcmVwbGFjZSAzIGFuZCBtb3JlIGRvdHMgd2l0aCBhbiBlbGxpcHNpcyAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwuezMsfS9nLCBcIuKAplwiKTtcblxuXHQvKiBbMl0gcmVwbGFjZSAyIGRvdHMgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2VudGVjbmUgd2l0aCBhbiBhcG9zaW9wZXNpcyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiICsgc3BhY2VzICsgXCJdXFxcXC57Mn1bXCIgKyBzcGFjZXMgKyBcIl1cIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiDigKYgXCIpO1xuXG5cdC8qIFszXSByZXBsYWNlIDIgZG90cyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZWNuZSB3aXRoIGZ1bGwgc3RvcCAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwuezJ9L2csIFwiLlwiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC8gezIsfS9nLCBcIiBcIik7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0UXVvdGVzLCBwcmltZXMgJiBhcG9zdHJvcGhlc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2YgZG91YmxlIHF1b3RlcyBhbmQgZG91YmxlIHByaW1lc1xuXG5cdEFzc3VtcHRpb25zIGFuZCBMaW1pdGF0aW9uc1xuXHRUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBkb3VibGUgcXVvdGVzIGFyZSBhbHdheXMgdXNlZCBpbiBwYWlyLFxuXHRpLmUuIGF1dGhvcnMgZGlkIG5vdCBmb3JnZXQgdG8gY2xvc2UgZG91YmxlIHF1b3RlcyBpbiB0aGVpciB0ZXh0LlxuXG5cdEFsZ29yaXRobVxuXHRbMF0gUmVtb3ZlIGV4dHJhIHRlcm1pbmFsIHB1bmN0dWF0aW9uIGFyb3VuZCBkb3VibGUgcXVvdGVzXG5cdFsxXSBTd2FwIHJpZ2h0IGRvdWJsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cdCAgICAodGhpcyBjb21lcyBmaXJzdCBhcyBpdCBpcyBhIHF1aXRlIGNvbW1vbiBtaXN0YWtlIHRoYXQgbWF5IGV2ZW50dWFsbHlcblx0XHQgIGxlYWQgdG8gaW1wcm9wZXIgaWRlbnRpZmljYXRpb24gb2YgZG91YmxlIHByaW1lcylcblx0WzJdIElkZW50aWZ5IGluY2hlcywgYXJjc2Vjb25kcywgc2Vjb25kc1xuXHRbM10gSWRlbnRpZnkgY2xvc2VkIGRvdWJsZSBxdW90ZXNcblx0WzRdIElkZW50aWZ5IHRoZSByZXN0IGFzIHVuY2xvc2VkIGRvdWJsZSBxdW90ZXMgKGJlc3QtZWZmb3J0IHJlcGxhY2VtZW50KVxuXHRbNV0gRml4IHNwYWNpbmcgYXJvdW5kIHF1b3RlcyBhbmQgcHJpbWVzXG5cdFs2XSBTd2FwIGJhY2sgc29tZSBvZiB0aGUgZG91YmxlIHF1b3RlcyB3aXRoIGEgcHVuY3R1YXRpb25cblx0WzddIFJlbW92ZSBleHRyYSBwdW5jdHVhdGlvbiBhcm91bmQgcXVvdGVzXG5cdFs4XSBSZXBsYWNlIGFsbCBpZGVudGlmaWVkIHB1bmN0dWF0aW9uIHdpdGggYXBwcm9wcmlhdGUgcHVuY3R1YXRpb24gaW5cblx0ICAgIGdpdmVuIGxhbmd1YWdlXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHBhcmFtIHtzdHJpbmd9IGxhbmd1YWdlIOKAlCBsYW5ndWFnZSBvcHRpb25cblx0QHJldHVybnMge3N0cmluZ30gb3V0cHV0IHdpdGggcHJvcGVybHkgcmVwbGFjZXMgZG91YmxlIHFvdXRlcyBhbmQgZG91YmxlIHByaW1lc1xuKi9cbmZ1bmN0aW9uIGNvcnJlY3RfZG91YmxlX3F1b3Rlc19hbmRfcHJpbWVzKHN0cmluZywgbGFuZ3VhZ2UpIHtcblxuXHQvKiBbMF0gUmVtb3ZlIGV4dHJhIHRlcm1pbmFsIHB1bmN0dWF0aW9uIGFyb3VuZCBkb3VibGUgcXVvdGVzXG5cdFx0XHRcdFx0IGUuZy4g4oCcV2Ugd2lsbCBjb250aW51ZSB0b21vcnJvdy7igJ0uICovXG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBcIl0pKFwiKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpKFtcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMlwiKTtcblxuXHQvKiBbMV0gU3dhcCByaWdodCBkb3VibGUgcXVvdGUgYWRlcHRzIHdpdGggYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbiAqL1xuXHRwYXR0ZXJuID0gXCIoXCIrIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIikoW1wiICsgdGVybWluYWxfcHVuY3R1YXRpb24gKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCAnJDIkMScpO1xuXG5cdC8qIFsyXSBJZGVudGlmeSBpbmNoZXMsIGFyY3NlY29uZHMsIHNlY29uZHNcblx0XHRcdFx0IE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIGRvdWJsZV9xdW90ZV9hZGVwdHMgdmFyaWFibGVcblx0XHRcdFx0IGFzIGNvbW1hcyBhbmQgbG93LXBvc2l0aW9uZWQgcXVvdGVzIGFyZSBvbW1pdGVkKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhcXGQgPyko4oCcfOKAnXxcXFwifOKAs3zigJh7Mix9fOKAmXsyLH18J3syLH184oCyezIsfSkvZywgXCIkMXt7dHlwb3BvX19kb3VibGUtcHJpbWV9fVwiKTtcblxuXG5cdC8qIFszXSBJZGVudGlmeSBjbG9zZWQgZG91YmxlIHF1b3RlcyAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpKC4qPykoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuXHQvKiBbNC4xXSBJZGVudGlmeSB1bmNsb3NlZCBsZWZ0IGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSQyXCIpO1xuXG5cblx0LyogWzQuMl0gSWRlbnRpZnkgdW5jbG9zZWQgcmlnaHQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgZWxsaXBzaXMgKyBcIl0pKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fVwiKTtcblxuXG5cdC8qIFs0LjNdIFJlbW92ZSByZW1haW5pbmcgdW5pZGVudGlmaWVkIGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgc3BhY2VzICsgXCJdKShcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIikoW1wiICsgc3BhY2VzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzVdIEZpeCBzcGFjaW5nIGFyb3VuZCBxdW90ZXMgYW5kIHByaW1lICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pKCApL2csIFwiJDFcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oICkoe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIiQyXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKCApKHt7dHlwb3BvX19kb3VibGUtcHJpbWV9fSkvZywgXCIkMlwiKTtcblxuXG5cdC8qIFs2XSBTd2FwIGJhY2sgc29tZSBvZiB0aGUgZG91YmxlIHF1b3RlcyB3aXRoIGEgcHVuY3R1YXRpb25cblxuXHRcdCBJZGVhXG5cdFx0IEluIFsxXSB3ZSBoYXZlIHN3YXBwZWQgYWxsIGRvdWJsZSByaWdodCBxdW90ZXMgYnkgZGVmYXVsdCB3aXRoIGEgdGVybWluYWxcblx0XHQgcHVuY3R1YXRpb24uIEhvd2V2ZXIsIG5vdCBhbGwgZG91YmxlIHF1b3RlcyB3cmFwIHRoZSB3aG9sZSBzZW50ZW5jZSBhbmRcblx0XHQgdGhlcmUgYXJlIGNhc2VzIHdoZW4gZmV3IHdvcmRzIGFyZSBxdW90ZWQgd2l0aGluIGEgc2VudGVuY2UuIFRha2UgYSBsb29rIGF0XG5cdFx0IGV4YW1wbGVzOlxuXHRcdCDigJxTZW50ZW5jZSBxb3V0ZWQgYXMgYSB3aG9sZS7igJ0gKGZ1bGwgc3RvcCBpcyBwbGFjZWQgd2l0aGluIGRvdWJsZSBxdW90ZXMpXG5cdFx0IFRoaXMgaXMg4oCccXVvdGVkIGV4cHJlc3Npb24u4oCdIChmdWxsIHN0b3AgaXMgcGxhY2VkIG91dHNpZGUgZG91YmxlIHF1b3RlcylcblxuXHRcdCBBbGdvcml0aG1cblx0XHQgTWF0Y2ggYWxsIHRoZSBkb3VibGUgcXVvdGUgcGFpcnMgdGhhdCBkbyBub3QgcHJlY2VkZSBzZW50ZW5jZSBwdW5jdHVhdGlvblxuXHRcdCAoYW5kIHRodXMgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIHNlbnRlbmNlKSBhbmQgc3dhcCByaWdodCBkb3VibGUgd2l0aFxuXHRcdCBhIHRlcm1pbmFsIHB1bmN0dWF0aW9uLlxuXHRcdCAqL1xuXHRwYXR0ZXJuID0gXCIoW15cIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgXCJdW1wiICsgc3BhY2VzICsgXCJde3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0uKz8pKFtcIiArIHRlcm1pbmFsX3B1bmN0dWF0aW9uICsgXCJdKSh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pXCI7XG5cdC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzJDJcIik7XG5cblxuXHQvKiBbN10gUmVtb3ZlIGV4dHJhIGNvbW1hIGFmdGVyIHB1bmN0dWF0aW9uIGluIGRpcmVjdCBzcGVlY2gsXG5cdFx0XHRcdFx0IGUuZy4gXCLigJxIZXkhLOKAnSBzaGUgc2FpZFwiICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIFwiXSkoW1xcLF0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxXCIpO1xuXG5cblx0LyogWzhdIFB1bmN0dWF0aW9uIHJlcGxhY2VtZW50ICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIuKAs1wiKTtcblxuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdFx0Y2FzZSBcInJ1ZVwiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLCq1wiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIsK7XCIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInNrXCI6XG5cdFx0Y2FzZSBcImNzXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnlwiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnFwiKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJlblwiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJxcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJ1cIik7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2Ygc2luZ2xlIHF1b3Rlcywgc2luZ2xlIHByaW1lcyBhbmQgYXBvc3Ryb3BoZXNcblxuXHRBc3N1bXB0aW9ucyBhbmQgTGltaXRhdGlvbnNcblx0VGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgZG91YmxlIHF1b3RlcyBhcmUgYWx3YXlzIHVzZWQgaW4gcGFpcixcblx0aS5lLiBhdXRob3JzIGRpZCBub3QgZm9yZ2V0IHRvIGNsb3NlIGRvdWJsZSBxdW90ZXMgaW4gdGhlaXIgdGV4dC5cblx0RnVydGhlciwgc2luZ2xlIHF1b3RlcyBhcmUgdXNlZCBhcyBzZWNvbmRhcnkgYW5kIHRoZXkncmUgcHJvcGVybHkgc3BhY2VkLFxuXHRlLmcuIOKQoyd3b3JkIG9yIHNlbnRlbmNlIHBvcnRpb24n4pCjIChhbmQgbm90IGxpa2Ug4pCjJ+KQo3dvcmTikKMn4pCjKVxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgY29tbW9uIGFwb3N0cm9oZSBjb250cmFjdGlvbnNcblx0WzJdIElkZW50aWZ5IHNpbmdsZSBxdW90ZXNcblx0WzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcblx0WzRdIElkZW50aWZ5IHJlc2lkdWFsIGFwb3N0cm9waGVzIHRoYXQgaGF2ZSBsZWZ0XG5cdFs/XSBTd2FwIHJpZ2h0IHNpbmdsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHB1bnR1YXRpb25cblx0XHRcdChXZSB3ZXJlIHN3YXBwaW5nIHNpbmdsZSBxdW90ZXMgYXMgcGFydCBvZiBhbGdvcml0aG0gYSB3aGlsZSBhIGJhY2ssXG5cdFx0XHRidXQgc2luY2UgaXQgaXMgbW9yZSBwcm9iYWJsZSB0aGF0IHNpbmdsZSBxdW90ZXMgYXJlIGluIHRoZSBtaWRkbGUgb2YgdGhlXG5cdFx0XHRzZW50ZW5jZSwgd2UgaGF2YWUgZHJvcHBlZCBzd2FwcGluZyBhcyBhIHBhcnQgb2YgdGhlIGFsZ29yaXRobSlcblx0WzZdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuXHQgICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Ug4oCUIGxhbmd1YWdlIG9wdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKSB7XG5cblx0LyogWzEuMV0gSWRlbnRpZnkg4oCZbuKAmSBjb250cmFjdGlvbnMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIikobikoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQye3t0eXBvcG9fX2Fwb3N0cm9waGV9fVwiKTtcblxuXG5cdC8qIFsxLjJdIElkZW50aWZ5IGNvbW1vbiBjb250cmFjdGlvbnMgYXQgdGhlIGJlZ2lubmluZyBvciBhdCB0aGUgZW5kXG5cdFx0XHRcdFx0IG9mIHRoZSB3b3JkLCBlLmcuIEZpc2gg4oCZbuKAmSBDaGlwcywg4oCZZW0sIOKAmWNhdXNlLOKApiAqL1xuXHR2YXIgY29udHJhY3Rpb25fZXhhbXBsZXMgPSBcImVtfGNhdXNlfHR3YXN8dGlzfHRpbHxyb3VuZFwiXG5cdHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIikoXCIgKyBjb250cmFjdGlvbl9leGFtcGxlcyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQyXCIpO1xuXG5cblx0LyogWzEuM10gSWRlbnRpZnkgaW4td29yZCBjb250cmFjdGlvbnMsXG5cdFx0XHRcdFx0IGUuZy4gRG9u4oCZdCwgSeKAmW0sIE/igJlEb29sZSwgNjnigJllcnMgKi9cblx0dmFyIGNoYXJhY3Rlcl9hZGVwdHMgPSBcIjAtOVwiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWU7XG5cdHBhdHRlcm4gPSBcIihbXCIrIGNoYXJhY3Rlcl9hZGVwdHMgK1wiXSkoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpKFtcIisgY2hhcmFjdGVyX2FkZXB0cyArXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19hcG9zdHJvcGhlfX0kM1wiKTtcblxuXG5cdC8qIFsxLjRdIElkZW50aWZ5IHllYXIgY29udHJhY3Rpb25zXG5cdFx0IGUuZy4g4oCZNzBzLCBJTkNIRUJBIOKAmTg5LOKApiAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpKFswLTldezJ9KVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJcIik7XG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgc2luZ2xlIHF1b3RlcyB3aXRoaW4gZG91YmxlIHF1b3RlcyAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpKC4qPykoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbigkMCwgJDEsICQyLCAkMyl7XG5cblx0XHQvL2lkZW50aWZ5IHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuXHRcdHZhciBwYXR0ZXJuID0gXCIoICkoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXSlcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0kM1wiKTtcblxuXHRcdC8vaWRlbnRpZnkge3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuXHRcdHBhdHRlcm4gPSBcIihbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0pKFtcXC4sIT9dKT8oXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpKFsgXXxbXFwuLCE/XSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCIkMSQye3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSQ0XCIpO1xuXG5cdFx0Ly9pZGVudGlmeSBzaW5nbGUgcXVvdGUgcGFpcnNcblx0XHRwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19KSguKj8pKHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0kMnt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fVwiKTtcblxuXHRcdHJldHVybiAkMSArICQyICsgJDM7XG5cdH0pO1xuXG5cblx0LyogWzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcblx0XHRcdFx0IE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIHNpbmdsZV9xdW90ZV9hZGVwdHMgdmFyaWFibGVcblx0XHRcdFx0IGFzIGNvbW1hcyBhbmQgbG93LXBvc2l0aW9uZWQgcXVvdGVzIGFyZSBvbW1pdGVkKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyhcXGQpKCA/KSgnfOKAmHzigJl84oCbfOKAsikvZywgXCIkMXt7dHlwb3BvX19zaW5nbGUtcHJpbWV9fVwiKTtcblxuXG5cdC8qIFs0XSBJZGVudGlmeSByZXNpZHVhbCBhcG9zdHJvcGhlcyB0aGF0IGhhdmUgbGVmdCAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBzaW5nbGVfcXVvdGVfYWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX1cIik7XG5cblxuXG5cdC8qIFs1XSBQdW5jdHVhdGlvbiByZXBsYWNlbWVudCAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19zaW5nbGUtcHJpbWV9fSkvZywgXCLigLJcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fYXBvc3Ryb3BoZX19fHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fXx7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19L2csIFwi4oCZXCIpO1xuXG5cblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRjYXNlIFwicnVlXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oC5XCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigLpcIik7XG5cdFx0YnJlYWs7XG5cdGNhc2UgXCJza1wiOlxuXHRjYXNlIFwiY3NcIjpcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJpcIik7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmFwiKTtcblx0XHRicmVhaztcblx0Y2FzZSBcImVuXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCYXCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJlcIik7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gY29ycmVjdF9tdWx0aXBsZV9zaWduKHN0cmluZykge1xuXHRyZXR1cm4gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcucmVwbGFjZSgvKFsxLTldK1sgXXswLDF9W2Etd3pdKikoWyBdezAsMX1beHzDl11bIF17MCwxfSkoWzEtOV0rWyBdezAsMX1bYS13el0qKS9nLCBcIiQxIMOXICQzXCIpKTtcbn1cblxuXG5cbi8qXG5cdFJlcGxhY2VzIGh5cGhlbiB3aXRoIGVtIG9yIGVuIGRhc2hcblxuXHRBbGdvcml0aG1cblx0WzFdIFJlcGxhY2UgMyBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLS0pIHdpdGggYW4gZW0gZGFzaCAo4oCUKVxuXHRbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlClcblx0WzNdIFJlcGxhY2UgYW55IGh5cGhlbiBvciBkYXNoIHN1cnJvdW5kZWQgd2l0aCBzcGFjZXMgd2l0aCBhbiBlbSBkYXNoXG5cdFs0XSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoIHVzZWQgaW4gbnVtYmVyIHJhbmdlIHdpdGggYW4gZW4gZGFzaFxuXHRcdFx0YW5kIHNldCBwcm9wZXIgc3BhY2luZ1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBkYXNoZXMgaW5zdGVhZCBvZiBoeXBoZW5zXG4qL1xuZnVuY3Rpb24gcmVwbGFjZV9oeXBoZW5fd2l0aF9kYXNoKHN0cmluZywgbGFuZ3VhZ2UpIHtcblx0dmFyIGRhc2hlcyA9IFwiLeKAk+KAlFwiOyAvLyBpbmNsdWRpbmcgYSBoeXBoZW5cblxuXHQvKiBbMV0gUmVwbGFjZSAzIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tLSkgd2l0aCBhbiBlbSBkYXNoICjigJQpICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oLS0tKS9nLCBcIuKAlFwiKTtcblxuXG5cdC8qIFsyXSBSZXBsYWNlIDIgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0pIHdpdGggYW4gZW4gZGFzaCAo4oCUKSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKC0tKS9nLCBcIuKAk1wiKTtcblxuXG5cdC8qIFszXSBSZXBsYWNlIGFueSBoeXBoZW4gb3IgZGFzaCBzdXJyb3VuZGVkIHdpdGggc3BhY2VzIHdpdGggYW4gZW0gZGFzaCAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiICsgc3BhY2VzICsgXCJdW1wiICsgZGFzaGVzICsgXCJdW1wiICsgc3BhY2VzICsgXCJdXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgcmVwbGFjZW1lbnQgPSBuYXJyb3dfbmJzcCArIFwi4oCUXCIgKyBoYWlyX3NwYWNlO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cdC8qIFs0LjFdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgY2FyZGluYWwgbnVtYmVycyxcblx0XHRcdFx0XHQgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuXHRcdFx0XHRcdCBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG5cdHZhciBjYXJkaW5hbF9udW1iZXIgPSBcIlxcXFxkK1wiO1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoW1wiICsgc3BhY2VzICsgXCJdP1tcIiArIGRhc2hlcyArIFwiXVtcIiArIHNwYWNlcyArIFwiXT8pKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQx4oCTJDNcIik7XG5cblxuXHQvKiBbNC4yXSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoLCBwbGFjZWQgYmV0d2VlbiAyIG9yZGluYWwgbnVtYmVycyxcblx0XHRcdFx0XHQgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuXHRcdFx0XHRcdCBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG5cdHZhciBvcmRpbmFsX2luZGljYXRvciA9IFwiXCI7XG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0XHRjYXNlIFwicnVlXCI6XG5cdFx0Y2FzZSBcInNrXCI6XG5cdFx0Y2FzZSBcImNzXCI6XG5cdFx0XHRvcmRpbmFsX2luZGljYXRvciA9IFwiXFxcXC5cIjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJlblwiOlxuXHRcdFx0b3JkaW5hbF9pbmRpY2F0b3IgPSBcInN0fG5kfHJkfHRoXCI7XG5cdFx0XHRicmVhaztcblx0fVxuXHRwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoXCIgKyBvcmRpbmFsX2luZGljYXRvciArIFwiKShbXCIgKyBzcGFjZXMgKyBcIl0/W1wiICsgZGFzaGVzICsgXCJdW1wiICsgc3BhY2VzICsgXCJdPykoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoXCIgKyBvcmRpbmFsX2luZGljYXRvciArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMuKAkyQ0JDVcIik7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VfZGFzaF93aXRoX2h5cGhlbihzdHJpbmcpe1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdKShb4oCT4oCUXSkoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEtJDNcIik7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0Q29uc29saWRhdGlvbiBvZiBzcGFjZXNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBzcGFjZXMgKyBcIl0pKFtcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgY2xvc2luZ19icmFja2V0cyArIGRlZ3JlZSArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMlwiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBvcGVuaW5nX2JyYWNrZXRzICsgXCJdKShbXCIgKyBzcGFjZXMgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDFcIik7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfdHJhaWxpbmdfc3BhY2VzKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnRyaW0oKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGFkZF9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSkoW1wiICsgb3BlbmluZ19icmFja2V0cyArIFwiXSkoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSAkMiQzXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gYWRkX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pKFtcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgY2xvc2luZ19icmFja2V0cyArIFwiXSkoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyICQzXCIpO1xufVxuXG5cblxuLypcblx0UmVtb3ZlcyBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIHBhcmFncmFwaFxuXG5cdFRoaXMgY291bGQgYmUgZG9uZSB3aXRoIGEgb25lLWxpbmVyOlxuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcblxuXHRIb3dldmVyLCBpdCBhbHNvIHJlbW92ZXMgZW1wdHkgbGluZXMuIFNpbmNlLCB3ZSB3YW50IHRvIGhhbmRsZSB0aGlzIGNoYW5nZVxuXHRzZXBhcmF0ZWx5LCB3ZSBuZWVkIHRvXG5cdFsxXSBzcGxpdCB0aGUgbGluZXMgbWFudWFsbHlcblx0WzJdIGFuZCByZW1vdmUgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbmluZyBvZiBlYWNoIGxpbmVcblx0WzNdIGpvaW4gbGluZXMgdG9nZXRoZXIgdG8gYSBzaW5nbGUgc3RyaW5nXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgcGFyYWdyYXBoc1xuKi9cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZXNfYXRfcGFyYWdyYXBoX2JlZ2lubmluZyhzdHJpbmcpIHtcblx0LyogWzFdIHNwbGl0IHRoZSBsaW5lcyBtYW51YWxseSAqL1xuXHR2YXIgbGluZXMgPSBzdHJpbmcuc3BsaXQoL1xccj9cXG4vKTtcblxuXHQvKiBbMl0gYW5kIHJlbW92ZSBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2luaW5nIG9mIGVhY2ggbGluZSAqL1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGluZXNbaV0gPSBsaW5lc1tpXS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuXHR9XG5cblx0LyogWzNdIGpvaW4gbGluZXMgdG9nZXRoZXIgdG8gYSBzaW5nbGUgc3RyaW5nICovXG5cdHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xufVxuXG5cblxuLypcblx0UmVtb3ZlcyBlbXB0eSBsaW5lc1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCByZW1vdmVkIGVtcHR5IGxpbmVzXG4qL1xuZnVuY3Rpb24gcmVtb3ZlX2VtcHR5X2xpbmVzKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcbn1cblxuXG5cbi8qXG5cdENvbnNvbGlkYXRlcyB0aGUgdXNlIG9mIG5vbi1icmVha2luZyBzcGFjZXNcblxuXHQqIHJlbW92ZXMgY2hhcmFjdGVycyBiZXR3ZWVuIG11bHRpLWNoYXJhY3RlciB3b3Jkc1xuXHQqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBjYXJkaW5hbCBudW1iZXJzXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFyb3VuZCDDl1xuXHQqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBzaW5nbGUtY2hhcmFjdGVyIHByZXBvc2l0aW9uc1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0bHkgcGxhY2VkIG5vbi1icmVha2luZyBzcGFjZVxuKi9cbmZ1bmN0aW9uIGNvbnNvbGlkYXRlX25ic3Aoc3RyaW5nKSB7XG5cblx0Ly8gcmVtb3ZlcyBub24tYnJlYWtpbmcgc3BhY2VzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdezIsfSkoW1wiKyBuYnNwICsgbmFycm93X25ic3AgK1wiXSkoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdezIsfSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSAkM1wiKTtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpOyAvL2NhbGxpbmcgaXQgdHdpY2UgdG8gY2F0Y2ggb2RkL2V2ZW4gb2NjdXJlbmNlc1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIGNhcmRpbmFsIG51bWJlcnNcblx0cGF0dGVybiA9IFwiKFswLTldKykoICkoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdKylcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIHJlcGxhY2VtZW50ID0gXCIkMVwiICsgbmJzcCArIFwiJDNcIjtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYXJvdW5kIMOXXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBzcGFjZXMgKyBcIl0pKFvDl10pKFtcIiArIHNwYWNlcyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmVwbGFjZW1lbnQgPSBuYnNwICsgXCIkMlwiICsgbmJzcDtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXG5cdC8vIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBzaW5nbGUtY2hhcmFjdGVyIHByZXBvc2l0aW9uc1xuXHRwYXR0ZXJuID0gXCIoW8KgIF0pKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdfCYpKCApXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJlcGxhY2VtZW50ID0gXCIkMSQyXCIgKyBuYnNwO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpOyAvL2NhbGxpbmcgaXQgdHdpY2UgdG8gY2F0Y2ggb2RkL2V2ZW4gb2NjdXJlbmNlc1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciBzcGFjaW5nIGFyb3VuZCBlbGxpcHNpcyBhbmQgYXBvc2lvcGVzaXNcblxuXHRFbGxpcHNpcyAoYXMgYSBjaGFyYWN0ZXIpIGlzIHVzZWQgZm9yIDIgZGlmZmVyZW50IHB1cnBvc2VzOlxuXHQxLiBhcyBhbiBlbGxpcHNpcyB0byBvbW1pdCBhIHBpZWNlIG9mIGluZm9ybWF0aW9uIGRlbGliZXJhdGVseVxuXHQyLiBhcyBhbiBhcG9zaW9wZXNpczsgYSBmaWd1cmUgb2Ygc3BlZWNoIHdoZXJlaW4gYSBzZW50ZW5jZSBpc1xuXHRkZWxpYmVyYXRlbHkgYnJva2VuIG9mZiBhbmQgbGVmdCB1bmZpbmlzaGVkXG5cblx0c291cmNlc1xuXHRodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FbGxpcHNpc1xuXHRodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BcG9zaW9wZXNpc1xuXHRodHRwOi8vd3d3LmxpdGVlcmEuY3ovc2xvdm5pay92eXB1c3RrYVxuXG5cdEFsZ29yaXRobVxuXHRFbGxpcHNpcyAmIEFwb3Npb3Blc2lzIHJlcXVpcmUgZGlmZmVyZW50IHVzZSBvZiBzcGFjaW5nIGFyb3VuZCB0aGVtLFxuXHR0aGF0IGlzIHdoeSB3ZSBhcmUgY29ycmVjdGluZyBvbmx5IGZvbGxvd2luZyBjYXNlczpcblx0ZXJyb3JzOlxuXHRbMV0gY29ycmVjdCBzcGFjaW5nLCB3aGVuIGVsbGlwc2lzIHVzZWQgdXNlZCBhcm91bmQgY29tbWFzXG5cdFsyXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaFxuXHRbM10gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzRdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFyYWdyYXBoXG5cdFs1XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmFncmFwaFxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0ZWQgc3BhY2luZyBhcm91bmQgYXBvc2lvcGVzaXNcbiovXG5mdW5jdGlvbiBjb3JyZWN0X3NwYWNlc19hcm91bmRfZWxsaXBzaXMoc3RyaW5nKSB7XG5cblx0LyogWzFdIGNvcnJlY3Qgc3BhY2luZywgd2hlbiBlbGxpcHNpcyB1c2VkIHVzZWQgYXJvdW5kIGNvbW1hcyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiLFtcIiArIHNwYWNlcyArIFwiXT9cIiArIGVsbGlwc2lzICsgXCJbXCIgKyBzcGFjZXMgKyBcIl0/LFwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiLCDigKYsXCIpO1xuXG5cblx0LyogWzJdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSkoW1wiICsgc3BhY2VzICsgXCJdKShcIiArIGVsbGlwc2lzICsgXCJbXCIgKyBzcGFjZXMgKyBcIl1bXCIgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzNdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBcIl1bXCIgKyBzcGFjZXMgKyBcIl1cIiArIGVsbGlwc2lzICtcIikoW1wiICsgc3BhY2VzICsgXCJdKShbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNF0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihe4oCmKShbXCIgKyBzcGFjZXMgKyBcIl0pKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnbVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs1XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIFwiXSkoW1wiICsgc3BhY2VzICsgXCJdKShcIiArIGVsbGlwc2lzICsgXCIpKD8hWyBcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdENvcnJlY3RzIGFjY2lkZW50YWwgdXBwZXJjYXNlXG5cblx0QmVzdC1lZmZvcnQgZnVuY3Rpb24gdG8gZml4IG1vc3QgY29tbW9uIGFjY2lkZW50YWwgdXBwZXJjYXNlIGVycm9ycywgbmFtZWx5OlxuXHRbMV0gMiBmaXJzdCB1cHBlcmNhc2UgbGV0dGVycyAoaWUuIFVQcGVyY2FzZSlcblx0WzJdIFN3YXBwZWQgY2FzZXMgKGllLiB1UFBFUkNBU0UpXG5cblx0QWxnb3JpdGhtIGRvZXMgbm90IGZpeCBvdGhlciB1cHBlcmNhc2UgZXZlbnR1YWxpdGllcyxcblx0ZS5nLiBtaXhlZCBjYXNlIChVcHBFUmNhU2UpIGFzIHRoZXJlIGFyZSBtYW55IGNhc2VzIGZvciBjb3Jwb3JhdGUgYnJhbmRzXG5cdHRoYXQgY291bGQgcG90ZW50aWFsbHkgbWF0Y2ggdGhlIGFsZ29yaXRobSBhcyBmYWxzZSBwb3NpdGl2ZS5cblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGVkIGFjY2lkZW50YWwgdXBwZXJjYXNlXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9hY2NpZGVudGFsX3VwcGVyY2FzZShzdHJpbmcpIHtcblxuXHQvKiBbMV0gdHdvIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpLmUuIFVQcGVyY2FzZSkgKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIisgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdezIsMn1bXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXStcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0LyogWzIuMV0gU3dhcHBlZCBjYXNlcyAoMi1sZXR0ZXIgY2FzZXMsIGkuZS4gaVQpXG5cdFx0XHROb3RlIHRoYXQgdGhpcyBpcyBkaXZpZGVkIGludG8gMiBzZXBhcmF0ZSBjYXNlcyBhcyBcXGIgaW4gSmF2YVNjcmlwdCByZWdleFxuXHRcdFx0ZG9lcyBub3QgdGFrZSBub24tbGF0aW4gY2hhcmFjdGVycyBpbnRvIGEgY29zbmlkZXJhdGlvblxuXHQqL1xuXHRwYXR0ZXJuID0gXCJbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXVtcIisgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdXFxcXGJcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKHN0cmluZyl7XG5cdFx0cmV0dXJuIChzdHJpbmcuc3Vic3RyaW5nKDAsMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuXHR9KTtcblxuXHQvKiBbMi4yXSBTd2FwcGVkIGNhc2VzIChuLWxldHRlciBjYXNlcywgaS5lLiB1UFBFUkNBU0UpICovXG5cdHBhdHRlcm4gPSBcIltcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdK1tcIisgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdezIsfVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oc3RyaW5nKXtcblx0XHRyZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG5cdH0pO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0QWJicmV2aWF0aW9uc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG4vKlxuXHRJZGVudGlmaWVzIGRpZmZlcmVudGx5LXNwZWxsZWQgYWJicmV2aWF0aW9ucyBhbmQgcmVwbGFjZXMgaXQgd2l0aFxuXHRhIHRlbXAgdmFyaWFibGUsIHt7dHlwb3BvX19bYWJicl19fVxuXG5cdElkZW50aWZpZXMgZ2l2ZW4gYWJicmV2aWF0aW9uczpcblx0YS5tLiwgcC5tLiwgZS5nLiwgaS5lLlxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgZS5nLiwgaS5lLlxuXHRbMl0gSWRlbnRpZnkgYS5tLiwgcC5tLiAoZGlmZmVyZW50IG1hdGNoIHRvIGF2b2lkIGZhbHNlIHBvc2l0aXZlcyBzdWNoIGFzOlxuXHRcdFx0SSBhbSwgSGUgaXMgdGhlIFBNLilcblx0WzNdIEV4Y2x1ZGUgZmFsc2UgaWRlbnRpZmljYXRpb25zXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBpZGVudGlmeV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gSWRlbnRpZnkgZS5nLiwgaS5lLiAqL1xuXHR2YXIgYWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCIoXFxcXGJbXCIgKyBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCJdXFxcXC4/W1wiKyBzcGFjZXMgK1wiXT9bXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCJdXFxcXC4/KShbXCIrIHNwYWNlcyArXCJdPykoXFxcXGIpXCI7XG5cdFx0Ly8gY29uc29sZS5sb2cocGF0dGVybik7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IFwie3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cblxuXG5cdC8qIFsyXSBJZGVudGlmeSBhLm0uLCBwLm0uICovXG5cdGFiYnJldmlhdGlvbnMgPSBbXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwiKFxcXFxkKShbXCIgKyBzcGFjZXMgKyBcIl0/KShcXFxcYltcIiArIGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIl1cXFxcLj9bXCIrIHNwYWNlcyArXCJdP1tcIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIl1cXFxcLj8pKFtcIisgc3BhY2VzICtcIl0/KShcXFxcYnxcXFxcQilcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBcIiQxIHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19IFwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXG5cdC8qIFszXSBFeGNsdWRlIGZhbHNlIGlkZW50aWZpY2F0aW9uc1xuXHRcdCBSZWdleCBcXGIgZG9lcyBub3QgY2F0Y2ggbm9uLWxhdGluIGNoYXJhY3RlcnMgc28gd2UgbmVlZCB0byBleGNsdWRlIGZhbHNlXG5cdFx0IGlkZW50aWZpY2F0aW9uc1xuXHQqL1xuXHRhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiLCBcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIG5vbi1sYXRpbiBjaGFyYWN0ZXIgYXQgdGhlIGJlZ2lubmluZ1xuXHRcdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgbm9uX2xhdGluX2NoYXJzICsgXCJdKSh7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSlcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHRyZXBsYWNlbWVudCA9IFwiJDFcIiArIGFiYnJldmlhdGlvbnNbaV07XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXHRcdC8vIG5vbi1sYXRpbiBjaGFyYWN0ZXIgYXQgdGhlIGVuZFxuXHRcdHBhdHRlcm4gPSBcIih7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSApKFtcIiArIG5vbl9sYXRpbl9jaGFycyArIFwiXSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gYWJicmV2aWF0aW9uc1tpXSArIFwiJDJcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdFJlcGxhY2VzIGlkZW50aWZpZWQgdGVtcCBhYmJyZXZpYXRpb24gdmFyaWFibGUgbGlrZSB7e3R5cG9wb19fZWd9fSxcblx0d2l0aCB0aGVpciBhY3R1YWwgcmVwcmVzZW50YXRpb25cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30gY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIHBsYWNlX2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZykge1xuXHR2YXIgYWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwie3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX1cIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCIuXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCIuXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRFeGNlcHRpb25zXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG4vKlxuXHRJZGVudGlmaWVzIGV4Y2VwdGlvbnMgdGhhdCB3aWxsIGJlIG9tbWl0ZWQgZnJvbSBjb3JyZWN0aW9uIG9mIGFueSBzb3J0XG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBlbWFpbCBhZHJlc3Nlc1xuXHRbMl0gSWRlbnRpZnkgd2ViIFVSTHMgYW5kIElQc1xuXHRbM10gTWFyayB0aGVtIGFzIHRlbXBvcmFyeSBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19XG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGV4Y2VwdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGlkZW50aWZpZWQgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fVxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKSB7XG5cblx0LyogWzFdIElkZW50aWZ5IGVtYWlsIGFkcmVzc2VzICovXG5cdGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBlbWFpbF9hZGRyZXNzX3BhdHRlcm4pO1xuXG5cblx0LyogWzJdIElkZW50aWZ5IHdlYiBVUkxzIGFuZCBJUHMgKi9cblx0aWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIHdlYl91cmxfcGF0dGVybik7XG5cblxuXHQvKiBbM10gTWFyayB0aGVtIGFzIHRlbXBvcmFyeSBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19ICovXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZXhjZXB0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciByZXBsYWNlbWVudCA9IFwie3t0eXBvcG9fX2V4Y2VwdGlvbi1cIiArIGkgKyBcIn19XCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoZXhjZXB0aW9uc1tpXSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdElkZW50aWZpZXMgc2V0IG9mIGV4Y2VwdGlvbnMgZm9yIGdpdmVuIHBhdHRlcm5cblx0VXNlZCBhcyBoZWxwZXIgZnVuY3Rpb24gZm9yIGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvbiBvZiBleGNlcHRpb25zXG5cdEBwYXJhbSB7cGF0dGVybn0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gdG8gbWF0Y2ggZXhjZXB0aW9uXG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIHBhdHRlcm4pIHtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciBtYXRjaGVkX2V4Y2VwdGlvbnMgPSBzdHJpbmcubWF0Y2gocmUpO1xuXHRpZiAobWF0Y2hlZF9leGNlcHRpb25zICE9IG51bGwpIHtcblx0XHRleGNlcHRpb25zID0gZXhjZXB0aW9ucy5jb25jYXQobWF0Y2hlZF9leGNlcHRpb25zKTtcblx0fVxufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaWRlbnRpZmllZCBleGNlcHRpb25zIHdpdGggcmVhbCBvbmVzIGJ5IGNoYW5nZSB0aGVpclxuXHR0ZW1wb3JhcnkgcmVwcmVzZW50YXRpb24gaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX0gd2l0aCBpdHNcblx0Y29ycmVzcG9uZGluZyByZXByZXNlbnRhdGlvblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IG91dHB1dCB3aXRoIHBsYWNlZCBleGNlcHRpb25zXG4qL1xuZnVuY3Rpb24gcGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBleGNlcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcInt7dHlwb3BvX19leGNlcHRpb24tXCIgKyBpICsgXCJ9fVwiXG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gZXhjZXB0aW9uc1tpXTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRNYWluIHNjcmlwdFxuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG4vKlxuXHRDb3JyZWN0IHR5cG9zIGluIHRoZSBwcmVkZWZpbmVkIG9yZGVyXG5cblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBjb3JyZWN0aW9uXG5cdEBwYXJhbSB7bGFuZ3VhZ2V9IHN0cmluZyDigJQgbGFuZ3VhZ2Ugb3B0aW9uIHRvIGNvcnJlY3Qgc3BlY2lmaWMgdHlwb3M7IHN1cHBvcnRlZCBsYW5ndWFnZXM6IGVuLCBzaywgY3MsIHJ1ZS4gaWYgbm90IHNwZWNpZmllZCwgRW5nbGlzaCB0eXBvcyBhcmUgY29ycmVjdGVkXG5cdEBwYXJhbSB7cmVtb3ZlX2xpbmVzfSBib29sZWFuIOKAlCBvcHRpb25hbCBwYXJhbWV0ZXIgYWxsb3dpbmcgeW91IHRvIGNob29zZSB3aGV0aGVyIHRvIHJlbW92ZSBlbXB0eSBsaW5lcyBvciBub3Rcblx0QHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiovXG5leHBvcnQgZnVuY3Rpb24gY29ycmVjdF90eXBvcyhzdHJpbmcsIGxhbmd1YWdlLCByZW1vdmVfbGluZXMpIHtcblx0bGFuZ3VhZ2UgPSAodHlwZW9mIGxhbmd1YWdlID09PSBcInVuZGVmaW5lZFwiKSA/IFwiZW5cIiA6IGxhbmd1YWdlO1xuXHRyZW1vdmVfbGluZXMgPSAodHlwZW9mIHJlbW92ZV9saW5lcyA9PT0gXCJ1bmRlZmluZWRcIikgPyB0cnVlIDogcmVtb3ZlX2xpbmVzO1xuXG5cdHN0cmluZyA9IGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKTtcblx0c3RyaW5nID0gaWRlbnRpZnlfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKTsgLy8gbmVlZHMgdG8gZ28gYmVmb3JlIHB1bmN0dWF0aW9uIGZpeGVzXG5cblx0c3RyaW5nID0gcmVwbGFjZV9zeW1ib2xzKHN0cmluZywgZXNzZW50aWFsX3NldCk7XG5cdHN0cmluZyA9IHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nKTtcblxuXG5cdHN0cmluZyA9IGNvcnJlY3RfZG91YmxlX3F1b3Rlc19hbmRfcHJpbWVzKHN0cmluZywgbGFuZ3VhZ2UpO1xuXHRzdHJpbmcgPSBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKTtcblxuXHRzdHJpbmcgPSBjb3JyZWN0X211bHRpcGxlX3NpZ24oc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZW1vdmVfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSByZW1vdmVfdHJhaWxpbmdfc3BhY2VzKHN0cmluZyk7XG5cdHN0cmluZyA9IGFkZF9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gYWRkX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZXNfYXRfcGFyYWdyYXBoX2JlZ2lubmluZyhzdHJpbmcpO1xuXG5cdGlmKHJlbW92ZV9saW5lcykge1xuXHRcdHN0cmluZyA9IHJlbW92ZV9lbXB0eV9saW5lcyhzdHJpbmcpO1xuXHR9XG5cblx0c3RyaW5nID0gY29uc29saWRhdGVfbmJzcChzdHJpbmcpO1xuXHRzdHJpbmcgPSBjb3JyZWN0X3NwYWNlc19hcm91bmRfZWxsaXBzaXMoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZXBsYWNlX2h5cGhlbl93aXRoX2Rhc2goc3RyaW5nLCBsYW5ndWFnZSk7XG5cdHN0cmluZyA9IHJlcGxhY2VfZGFzaF93aXRoX2h5cGhlbihzdHJpbmcpO1xuXG5cdHN0cmluZyA9IGNvcnJlY3RfYWNjaWRlbnRhbF91cHBlcmNhc2Uoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSBwbGFjZV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpOyAvLyBuZWVkcyB0byBnbyBhZnRlciBwdW5jdHVhdGlvbiBmaXhlc1xuXHRzdHJpbmcgPSBwbGFjZV9leGNlcHRpb25zKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuIl19

//# sourceMappingURL=maps/typopo_browser.built.js.map
