(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHR5cG9wby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O1FDbTVCZ0IsYSxHQUFBLGE7QUFuNUJoQjs7Ozs7Ozs7O0FBV0E7Ozs7QUFJQSxJQUFJLGdCQUFnQjtBQUNuQixZQUFXLEdBRFE7QUFFbkIsWUFBVyxHQUZRO0FBR25CLFlBQVcsR0FIUTtBQUluQixZQUFXLEdBSlE7QUFLbkIsYUFBWSxHQUxPO0FBTW5CLGFBQVksR0FOTztBQU9uQixXQUFVLEdBUFM7QUFRbkIsV0FBVTtBQVJTLENBQXBCO0FBVUEsSUFBSSxzQkFBc0IsOERBQTFCO0FBQ0EsSUFBSSxzQkFBc0IsOERBQTFCO0FBQ0EsSUFBSSxrQkFBa0Isc0JBQXNCLG1CQUE1QztBQUNBLElBQUksK0JBQStCLFFBQVEsbUJBQTNDO0FBQ0EsSUFBSSwrQkFBK0IsUUFBUSxtQkFBM0M7QUFDQSxJQUFJLFlBQVksK0JBQStCLDRCQUEvQztBQUNBOzs7Ozs7Ozs7O0FBVUEsSUFBSSxzQkFBc0IsbUJBQTFCO0FBQ0EsSUFBSSxzQkFBc0IsMERBQTFCO0FBQ0EsSUFBSSxRQUFRLEdBQVo7QUFDQSxJQUFJLE9BQU8sR0FBWDtBQUNBLElBQUksYUFBYSxHQUFqQixDLENBQXNCO0FBQ3RCLElBQUksY0FBYyxHQUFsQixDLENBQXVCO0FBQ3ZCLElBQUksU0FBUyxRQUFRLElBQVIsR0FBZSxVQUFmLEdBQTRCLFdBQXpDO0FBQ0EsSUFBSSx1QkFBdUIsUUFBM0I7QUFDQSxJQUFJLHVCQUF1QixXQUFXLG9CQUF0QyxDLENBQTREO0FBQzVELElBQUksbUJBQW1CLFdBQXZCO0FBQ0EsSUFBSSxtQkFBbUIsV0FBdkI7QUFDQSxJQUFJLFdBQVcsR0FBZjtBQUNBLElBQUksU0FBUyxHQUFiOztBQUVBOzs7O0FBSUEsSUFBSSxrQkFBa0IsK0ZBQ0EsMkVBREEsR0FFQSw2RUFGQSxHQUdBLDZDQUhBLEdBR2lEO0FBQ2pE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QUFDeEQsZUFBYztBQUQwQyxFQUF6QyxHQUVaLGFBRko7O0FBSUEsVUFBUyxvQkFBb0IsTUFBcEIsQ0FBVDtBQUNBLFVBQVMsOEJBQThCLE1BQTlCLENBQVQsQ0FSOEQsQ0FRZDs7QUFFaEQsVUFBUyxnQkFBZ0IsTUFBaEIsRUFBd0IsYUFBeEIsQ0FBVDtBQUNBLFVBQVMsOEJBQThCLE1BQTlCLENBQVQ7QUFDQSxVQUFTLHVCQUF1QixNQUF2QixDQUFUOztBQUdBLFVBQVMsaUNBQWlDLE1BQWpDLEVBQXlDLFFBQXpDLENBQVQ7QUFDQSxVQUFTLDZDQUE2QyxNQUE3QyxFQUFxRCxRQUFyRCxDQUFUOztBQUVBLFVBQVMsc0JBQXNCLE1BQXRCLENBQVQ7O0FBRUEsVUFBUyxnQ0FBZ0MsTUFBaEMsQ0FBVDtBQUNBLFVBQVMsK0JBQStCLE1BQS9CLENBQVQ7QUFDQSxVQUFTLHVCQUF1QixNQUF2QixDQUFUO0FBQ0EsVUFBUyw2QkFBNkIsTUFBN0IsQ0FBVDtBQUNBLFVBQVMsNEJBQTRCLE1BQTVCLENBQVQ7QUFDQSxVQUFTLHFDQUFxQyxNQUFyQyxDQUFUOztBQUVBLEtBQUcsY0FBYyxXQUFqQixFQUE4QjtBQUM3QixXQUFTLG1CQUFtQixNQUFuQixDQUFUO0FBQ0E7O0FBRUQsVUFBUyxpQkFBaUIsTUFBakIsQ0FBVDtBQUNBLFVBQVMsK0JBQStCLE1BQS9CLENBQVQ7O0FBRUEsVUFBUyx5QkFBeUIsTUFBekIsRUFBaUMsUUFBakMsQ0FBVDtBQUNBLFVBQVMseUJBQXlCLE1BQXpCLENBQVQ7O0FBRUEsVUFBUyw2QkFBNkIsTUFBN0IsQ0FBVDs7QUFFQSxVQUFTLDJCQUEyQixNQUEzQixDQUFULENBdkM4RCxDQXVDakI7QUFDN0MsVUFBUyxpQkFBaUIsTUFBakIsQ0FBVDs7QUFFQSxVQUFTLDhCQUE4QixNQUE5QixDQUFUOztBQUVBLFFBQU8sTUFBUDtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuICogVHlwb3BvIDEuNC4wXG4gKlxuICogQ29weXJpZ2h0IDIwMTUtMTcgQnJhxYhvIMWgYW5kYWxhXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqXG4gKiBEYXRlOiAyMDE3LTAxLTE1XG4gKi9cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRWYXJpYWJsZXMgJiBDaGFyYWN0ZXIgcmVwbGFjZW1lbnQgc2V0c1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbnZhciBlc3NlbnRpYWxfc2V0ID0ge1xuXHRcIlxcXFwoQ1xcXFwpXCI6IFwiwqlcIixcblx0XCJcXFxcKGNcXFxcKVwiOiBcIsKpXCIsXG5cdFwiXFxcXChSXFxcXClcIjogXCLCrlwiLFxuXHRcIlxcXFwoclxcXFwpXCI6IFwiwq5cIixcblx0XCJcXFxcKFRNXFxcXClcIjogXCLihKJcIixcblx0XCJcXFxcKHRtXFxcXClcIjogXCLihKJcIixcblx0XCJcXFxcK1xcXFwtXCI6IFwiwrFcIixcblx0XCJcXFxcLVxcXFwrXCI6IFwiwrFcIixcbn07XG52YXIgbm9uX2xhdGluX2xvd2VyY2FzZSA9IFwiw6HDpMSNxI/DqcSbw63EusS+xYjDs8O0w7bFkcWVxZnFocWlw7rDvMWxxa/DvcW+0LDQsdCy0LPSkdC00LXQt9GW0LjQudC60LvQvNC90L7Qv9GA0YHRgtGD0YTRitGL0YzRhtGH0LbRiNGX0YnRkdGU0Y7Rj9GFXCI7XG52YXIgbm9uX2xhdGluX3VwcGVyY2FzZSA9IFwiw4HDhMSMxI7DicSaw43EucS9xYfDk8OUw5bFkMWUxZjFoMWkw5rDnMWwxa7DncW90JDQkdCS0JPSkNCU0JXQl9CG0JjQmdCa0JvQnNCd0J7Qn9Cg0KHQotCj0KTQqtCr0KzQptCn0JbQqNCH0KnQgdCE0K7Qr9ClXCI7XG52YXIgbm9uX2xhdGluX2NoYXJzID0gbm9uX2xhdGluX2xvd2VyY2FzZSArIG5vbl9sYXRpbl91cHBlcmNhc2U7XG52YXIgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSA9IFwiYS16XCIgKyBub25fbGF0aW5fbG93ZXJjYXNlO1xudmFyIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgPSBcIkEtWlwiICsgbm9uX2xhdGluX3VwcGVyY2FzZTtcbnZhciBhbGxfY2hhcnMgPSBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZTtcbi8qXG5cdCAoMzkpXHRcdFx0ZHVtYiBzaW5nbGUgcXVvdGVcblx0ICg4MjE2KVx0XHRsZWZ0IHNpbmdsZSBxdW90YXRpb24gbWFya1xuXHQgKDgyMTcpXHRcdHJpZ2h0IHNpbmdsZSBxdW90YXRpb24gbWFya1xuXHQgKDcwMClcdFx0bW9kaWZpZXIgbGV0dGVyIGFwb3N0cm9waGU7IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01vZGlmaWVyX2xldHRlcl9hcG9zdHJvcGhlXG5cdCAoODIxOSlcdFx0c2luZ2xlIGhpZ2gtcmV2ZXJzZWQtOSBxdW90YXRpb24gbWFya1xuXHQgKDgyNDIpXHRcdHByaW1lXG5cdCAoODI0OSlcdFx0c2luZ2xlIGxlZnQtcG9pbnRpbmcgYW5nbGUgcXVvdGF0aW9uIG1hcmtcblx0ICg4MjUwKVx0XHRzaW5nbGUgcmlnaHQtcG9pbnRpbmcgYW5nbGUgcXVvdGF0aW9uIG1hcmtcbiovXG52YXIgc2luZ2xlX3F1b3RlX2FkZXB0cyA9IFwi4oCafCd84oCYfOKAmXzKvHzigJt84oCyfOKAuXzigLpcIjtcbnZhciBkb3VibGVfcXVvdGVfYWRlcHRzID0gXCLigJ584oCcfOKAnXxcXFwifMKrfMK7fOKAs3wsezIsfXzigJh7Mix9fOKAmXsyLH18J3syLH184oC5ezIsfXzigLp7Mix9fOKAsnsyLH1cIjtcbnZhciBzcGFjZSA9IFwiIFwiO1xudmFyIG5ic3AgPSBcIsKgXCI7XG52YXIgaGFpcl9zcGFjZSA9IFwi4oCKXCI7IC8vJiM4MjAyO1xudmFyIG5hcnJvd19uYnNwID0gXCLigK9cIjsgLy8mIzgyMzk7XG52YXIgc3BhY2VzID0gc3BhY2UgKyBuYnNwICsgaGFpcl9zcGFjZSArIG5hcnJvd19uYnNwO1xudmFyIHRlcm1pbmFsX3B1bmN0dWF0aW9uID0gXCJcXC5cXCFcXD9cIjtcbnZhciBzZW50ZW5jZV9wdW5jdHVhdGlvbiA9IFwiXFwsXFw6XFw7XCIgKyB0ZXJtaW5hbF9wdW5jdHVhdGlvbjsgLy8gdGhlcmUgaXMgbm8gZWxsaXBzaXMgaW4gdGhlIHNldCBhcyBpdCBpcyBiZWluZyB1c2VkIHRocm91Z2hvdXQgYSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlLiBSZXRoaW5rIHRoaXMgZ3JvdXAgdG8gc3BsaXQgaXQgaW50byBlbmQtc2VudGVuY2UgcHVuY3R1YXRpb24gYW5kIG1pZGRsZSBzZW50ZW5jZSBwdW5jdHVhdGlvblxudmFyIG9wZW5pbmdfYnJhY2tldHMgPSBcIlxcXFwoXFxcXFtcXFxce1wiO1xudmFyIGNsb3NpbmdfYnJhY2tldHMgPSBcIlxcXFwpXFxcXF1cXFxcfVwiO1xudmFyIGVsbGlwc2lzID0gXCLigKZcIjtcbnZhciBkZWdyZWUgPSBcIsKwXCI7XG5cbi8qXG5cdFNvdXJjZSBmb3Igd2ViX3VybF9wYXR0ZXJuLCBlbWFpbF9hZGRyZXNzX3BhdHRlcm5cblx0aHR0cDovL2dyZXBjb2RlLmNvbS9maWxlL3JlcG9zaXRvcnkuZ3JlcGNvZGUuY29tL2phdmEvZXh0L2NvbS5nb29nbGUuYW5kcm9pZC9hbmRyb2lkLzIuMF9yMS9hbmRyb2lkL3RleHQvdXRpbC9SZWdleC5qYXZhI1JlZ2V4LjBXRUJfVVJMX1BBVFRFUk5cbiovXG52YXIgd2ViX3VybF9wYXR0ZXJuID0gXCIoKD86KGh0dHB8aHR0cHN8SHR0cHxIdHRwc3xydHNwfFJ0c3ApOlxcXFwvXFxcXC8oPzooPzpbYS16QS1aMC05XFxcXCRcXFxcLVxcXFxfXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXFxcLFxcXFw7XFxcXD9cXFxcJlxcXFw9XXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSl7MSw2NH0oPzpcXFxcOig/OlthLXpBLVowLTlcXFxcJFxcXFwtXFxcXF9cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJcXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVxcXFwsXFxcXDtcXFxcP1xcXFwmXFxcXD1dfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKXsxLDI1fSk/XFxcXEApPyk/XCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKCg/Oig/OlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDY0fVxcXFwuKStcIiArICAvLyBuYW1lZCBob3N0XG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpcIiArIC8vIHBsdXMgdG9wIGxldmVsIGRvbWFpblxuICAgICAgICAgICAgICAgICAgICAgIFwiKD86YWVyb3xhcnBhfGFzaWF8YVtjZGVmZ2lsbW5vcXJzdHV3eHpdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpiaXp8YlthYmRlZmdoaWptbm9yc3R2d3l6XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86Y2F0fGNvbXxjb29wfGNbYWNkZmdoaWtsbW5vcnV2eHl6XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8ZFtlamttb3pdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OmVkdXxlW2NlZ3JzdHVdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxmW2lqa21vcl1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86Z292fGdbYWJkZWZnaGlsbW5wcXJzdHV3eV0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifGhba21ucnR1XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzppbmZvfGludHxpW2RlbG1ub3Fyc3RdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpqb2JzfGpbZW1vcF0pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifGtbZWdoaW1ucnd5el1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8bFthYmNpa3JzdHV2eV1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86bWlsfG1vYml8bXVzZXVtfG1bYWNkZ2hrbG1ub3BxcnN0dXZ3eHl6XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8KD86bmFtZXxuZXR8blthY2VmZ2lsb3BydXpdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzpvcmd8b20pXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/OnByb3xwW2FlZmdoa2xtbnJzdHd5XSlcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8cWFcIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8cltlb3V3XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxzW2FiY2RlZ2hpamtsbW5vcnR1dnl6XVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInwoPzp0ZWx8dHJhdmVsfHRbY2RmZ2hqa2xtbm9wcnR2d3pdKVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInx1W2Fna21zeXpdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHZbYWNlZ2ludV1cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8d1tmc11cIiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8eVtldHVdXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifHpbYW13XSkpXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifCg/Oig/OjI1WzAtNV18MlswLTRdXCIgKyAvLyBvciBpcCBhZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgXCJbMC05XXxbMC0xXVswLTldezJ9fFsxLTldWzAtOV18WzEtOV0pXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwifFswLTFdWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XXwwKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcIlswLTldezJ9fFsxLTldWzAtOV18WzEtOV18MClcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1bMC05XXsyfVwiICtcbiAgICAgICAgICAgICAgICAgICAgICBcInxbMS05XVswLTldfFswLTldKSkpXCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86XFxcXDpcXFxcZHsxLDV9KT8pXCIgKyAvLyBwbHVzIG9wdGlvbiBwb3J0IG51bWJlciArXG4gICAgICAgICAgICAgICAgICAgICAgXCIoXFxcXC8oPzooPzpbYS16QS1aMC05XFxcXDtcXFxcL1xcXFw/XFxcXDpcXFxcQFxcXFwmXFxcXD1cXFxcI1xcXFx+XCIgKyAvLyBwbHVzIG9wdGlvbiBxdWVyeSBwYXJhbXNcbiAgICAgICAgICAgICAgICAgICAgICBcIlxcXFwtXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcXFxcLFxcXFxfXSl8KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpKik/XCIgK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86XFxcXGJ8JClcIjsgLy8gYW5kIGZpbmFsbHksIGEgd29yZCBib3VuZGFyeSBvciBlbmQgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnB1dC4gIFRoaXMgaXMgdG8gc3RvcCBmb28uc3VyZSBmcm9tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hpbmcgYXMgZm9vLnN1XG5cblxuXG52YXIgZW1haWxfYWRkcmVzc19wYXR0ZXJuID0gXCJbYS16QS1aMC05XFxcXCtcXFxcLlxcXFxfXFxcXCVcXFxcLV17MSwyNTZ9XCIgK1xuICAgICAgICAgICAgXCJcXFxcQFwiICtcbiAgICAgICAgICAgIFwiW2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsNjR9XCIgK1xuICAgICAgICAgICAgXCIoXCIgK1xuICAgICAgICAgICAgICAgIFwiXFxcXC5cIiArXG4gICAgICAgICAgICAgICAgXCJbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCwyNX1cIiArXG4gICAgICAgICAgICBcIikrXCI7XG5cbnZhciBleGNlcHRpb25zID0gW107XG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEVzZW50aWFsIHJlcGxhY2VtZW50c1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIHJlcGxhY2Vfc3ltYm9scyhzdHJpbmcpIHtcblx0Zm9yICh2YXIgcnVsZSBpbiBlc3NlbnRpYWxfc2V0KSB7XG5cdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHJ1bGUsIFwiZ1wiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBlc3NlbnRpYWxfc2V0W3J1bGVdKTtcblx0fVxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKSB7XG5cdC8qIFsxXSByZXBsYWNlIDMgYW5kIG1vcmUgZG90cyB3aXRoIGFuIGVsbGlwc2lzICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC57Myx9L2csIFwi4oCmXCIpO1xuXG5cdC8qIFsyXSByZXBsYWNlIDIgZG90cyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzZW50ZWNuZSB3aXRoIGFuIGFwb3Npb3Blc2lzICovXG5cdHZhciBwYXR0ZXJuID0gXCJbXCIgKyBzcGFjZXMgKyBcIl1cXFxcLnsyfVtcIiArIHNwYWNlcyArIFwiXVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiIOKApiBcIik7XG5cblx0LyogWzNdIHJlcGxhY2UgMiBkb3RzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlY25lIHdpdGggZnVsbCBzdG9wICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC57Mn0vZywgXCIuXCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfbXVsdGlwbGVfc3BhY2VzKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csIFwiIFwiKTtcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRRdW90ZXMsIHByaW1lcyAmIGFwb3N0cm9waGVzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHVzZSBvZiBkb3VibGUgcXVvdGVzIGFuZCBkb3VibGUgcHJpbWVzXG5cblx0QXNzdW1wdGlvbnMgYW5kIExpbWl0YXRpb25zXG5cdFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGRvdWJsZSBxdW90ZXMgYXJlIGFsd2F5cyB1c2VkIGluIHBhaXIsXG5cdGkuZS4gYXV0aG9ycyBkaWQgbm90IGZvcmdldCB0byBjbG9zZSBkb3VibGUgcXVvdGVzIGluIHRoZWlyIHRleHQuXG5cblx0QWxnb3JpdGhtXG5cdFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcblx0WzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgcHVuY3R1YXRpb25cblx0ICAgICh0aGlzIGNvbWVzIGZpcnN0IGFzIGl0IGlzIGEgcXVpdGUgY29tbW9uIG1pc3Rha2UgdGhhdCBtYXkgZXZlbnR1YWxseVxuXHRcdCAgbGVhZCB0byBpbXByb3BlciBpZGVudGlmaWNhdGlvbiBvZiBkb3VibGUgcHJpbWVzKVxuXHRbMl0gSWRlbnRpZnkgaW5jaGVzLCBhcmNzZWNvbmRzLCBzZWNvbmRzXG5cdFszXSBJZGVudGlmeSBjbG9zZWQgZG91YmxlIHF1b3Rlc1xuXHRbNF0gSWRlbnRpZnkgdGhlIHJlc3QgYXMgdW5jbG9zZWQgZG91YmxlIHF1b3RlcyAoYmVzdC1lZmZvcnQgcmVwbGFjZW1lbnQpXG5cdFs1XSBGaXggc3BhY2luZyBhcm91bmQgcXVvdGVzIGFuZCBwcmltZXNcblx0WzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuXHRbN10gUmVtb3ZlIGV4dHJhIHB1bmN0dWF0aW9uIGFyb3VuZCBxdW90ZXNcblx0WzhdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuXHQgICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Ug4oCUIGxhbmd1YWdlIG9wdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBvdXRwdXQgd2l0aCBwcm9wZXJseSByZXBsYWNlcyBkb3VibGUgcW91dGVzIGFuZCBkb3VibGUgcHJpbWVzXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9kb3VibGVfcXVvdGVzX2FuZF9wcmltZXMoc3RyaW5nLCBsYW5ndWFnZSkge1xuXG5cdC8qIFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcblx0XHRcdFx0XHQgZS5nLiDigJxXZSB3aWxsIGNvbnRpbnVlIHRvbW9ycm93LuKAnS4gKi9cblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIFwiXSkoXCIrIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIikoW1wiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyXCIpO1xuXG5cdC8qIFsxXSBTd2FwIHJpZ2h0IGRvdWJsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHRlcm1pbmFsIHB1bmN0dWF0aW9uICovXG5cdHBhdHRlcm4gPSBcIihcIisgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKShbXCIgKyB0ZXJtaW5hbF9wdW5jdHVhdGlvbiArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsICckMiQxJyk7XG5cblx0LyogWzJdIElkZW50aWZ5IGluY2hlcywgYXJjc2Vjb25kcywgc2Vjb25kc1xuXHRcdFx0XHQgTm90ZTogd2XigJlyZSBub3QgdXNpbmcgZG91YmxlX3F1b3RlX2FkZXB0cyB2YXJpYWJsZVxuXHRcdFx0XHQgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9tbWl0ZWQqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxcZCA/KSjigJx84oCdfFxcXCJ84oCzfOKAmHsyLH184oCZezIsfXwnezIsfXzigLJ7Mix9KS9nLCBcIiQxe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19XCIpO1xuXG5cblx0LyogWzNdIElkZW50aWZ5IGNsb3NlZCBkb3VibGUgcXVvdGVzICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIikoLio/KShcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0kMnt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fVwiKTtcblxuXG5cdC8qIFs0LjFdIElkZW50aWZ5IHVuY2xvc2VkIGxlZnQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIikoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJcIik7XG5cblxuXHQvKiBbNC4yXSBJZGVudGlmeSB1bmNsb3NlZCByaWdodCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBlbGxpcHNpcyArIFwiXSkoXCIgKyBkb3VibGVfcXVvdGVfYWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19XCIpO1xuXG5cblx0LyogWzQuM10gUmVtb3ZlIHJlbWFpbmluZyB1bmlkZW50aWZpZWQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBzcGFjZXMgKyBcIl0pKFwiICsgZG91YmxlX3F1b3RlX2FkZXB0cyArIFwiKShbXCIgKyBzcGFjZXMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNV0gRml4IHNwYWNpbmcgYXJvdW5kIHF1b3RlcyBhbmQgcHJpbWUgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkoICkvZywgXCIkMVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyggKSh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiJDJcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oICkoe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIiQyXCIpO1xuXG5cblx0LyogWzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuXG5cdFx0IElkZWFcblx0XHQgSW4gWzFdIHdlIGhhdmUgc3dhcHBlZCBhbGwgZG91YmxlIHJpZ2h0IHF1b3RlcyBieSBkZWZhdWx0IHdpdGggYSB0ZXJtaW5hbFxuXHRcdCBwdW5jdHVhdGlvbi4gSG93ZXZlciwgbm90IGFsbCBkb3VibGUgcXVvdGVzIHdyYXAgdGhlIHdob2xlIHNlbnRlbmNlIGFuZFxuXHRcdCB0aGVyZSBhcmUgY2FzZXMgd2hlbiBmZXcgd29yZHMgYXJlIHF1b3RlZCB3aXRoaW4gYSBzZW50ZW5jZS4gVGFrZSBhIGxvb2sgYXRcblx0XHQgZXhhbXBsZXM6XG5cdFx0IOKAnFNlbnRlbmNlIHFvdXRlZCBhcyBhIHdob2xlLuKAnSAoZnVsbCBzdG9wIGlzIHBsYWNlZCB3aXRoaW4gZG91YmxlIHF1b3Rlcylcblx0XHQgVGhpcyBpcyDigJxxdW90ZWQgZXhwcmVzc2lvbi7igJ0gKGZ1bGwgc3RvcCBpcyBwbGFjZWQgb3V0c2lkZSBkb3VibGUgcXVvdGVzKVxuXG5cdFx0IEFsZ29yaXRobVxuXHRcdCBNYXRjaCBhbGwgdGhlIGRvdWJsZSBxdW90ZSBwYWlycyB0aGF0IGRvIG5vdCBwcmVjZWRlIHNlbnRlbmNlIHB1bmN0dWF0aW9uXG5cdFx0IChhbmQgdGh1cyBtdXN0IGJlIHVzZWQgd2l0aGluIGEgc2VudGVuY2UpIGFuZCBzd2FwIHJpZ2h0IGRvdWJsZSB3aXRoXG5cdFx0IGEgdGVybWluYWwgcHVuY3R1YXRpb24uXG5cdFx0ICovXG5cdHBhdHRlcm4gPSBcIihbXlwiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBcIl1bXCIgKyBzcGFjZXMgKyBcIl17e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fS4rPykoW1wiICsgdGVybWluYWxfcHVuY3R1YXRpb24gKyBcIl0pKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSlcIjtcblx0Ly8gY29uc29sZS5sb2cocGF0dGVybik7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDMkMlwiKTtcblxuXG5cdC8qIFs3XSBSZW1vdmUgZXh0cmEgY29tbWEgYWZ0ZXIgcHVuY3R1YXRpb24gaW4gZGlyZWN0IHNwZWVjaCxcblx0XHRcdFx0XHQgZS5nLiBcIuKAnEhleSEs4oCdIHNoZSBzYWlkXCIgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgXCJdKShbXFwsXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDFcIik7XG5cblxuXHQvKiBbOF0gUHVuY3R1YXRpb24gcmVwbGFjZW1lbnQgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fZG91YmxlLXByaW1lfX0pL2csIFwi4oCzXCIpO1xuXG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0XHRjYXNlIFwicnVlXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIsKrXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiwrtcIik7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwic2tcIjpcblx0XHRjYXNlIFwiY3NcIjpcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCeXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCcXCIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImVuXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnFwiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnVwiKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHVzZSBvZiBzaW5nbGUgcXVvdGVzLCBzaW5nbGUgcHJpbWVzIGFuZCBhcG9zdHJvcGhlc1xuXG5cdEFzc3VtcHRpb25zIGFuZCBMaW1pdGF0aW9uc1xuXHRUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBkb3VibGUgcXVvdGVzIGFyZSBhbHdheXMgdXNlZCBpbiBwYWlyLFxuXHRpLmUuIGF1dGhvcnMgZGlkIG5vdCBmb3JnZXQgdG8gY2xvc2UgZG91YmxlIHF1b3RlcyBpbiB0aGVpciB0ZXh0LlxuXHRGdXJ0aGVyLCBzaW5nbGUgcXVvdGVzIGFyZSB1c2VkIGFzIHNlY29uZGFyeSBhbmQgdGhleSdyZSBwcm9wZXJseSBzcGFjZWQsXG5cdGUuZy4g4pCjJ3dvcmQgb3Igc2VudGVuY2UgcG9ydGlvbifikKMgKGFuZCBub3QgbGlrZSDikKMn4pCjd29yZOKQoyfikKMpXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBjb21tb24gYXBvc3Ryb2hlIGNvbnRyYWN0aW9uc1xuXHRbMl0gSWRlbnRpZnkgc2luZ2xlIHF1b3Rlc1xuXHRbM10gSWRlbnRpZnkgZmVldCwgYXJjbWludXRlcywgbWludXRlc1xuXHRbNF0gSWRlbnRpZnkgcmVzaWR1YWwgYXBvc3Ryb3BoZXMgdGhhdCBoYXZlIGxlZnRcblx0Wz9dIFN3YXAgcmlnaHQgc2luZ2xlIHF1b3RlIGFkZXB0cyB3aXRoIGEgcHVudHVhdGlvblxuXHRcdFx0KFdlIHdlcmUgc3dhcHBpbmcgc2luZ2xlIHF1b3RlcyBhcyBwYXJ0IG9mIGFsZ29yaXRobSBhIHdoaWxlIGEgYmFjayxcblx0XHRcdGJ1dCBzaW5jZSBpdCBpcyBtb3JlIHByb2JhYmxlIHRoYXQgc2luZ2xlIHF1b3RlcyBhcmUgaW4gdGhlIG1pZGRsZSBvZiB0aGVcblx0XHRcdHNlbnRlbmNlLCB3ZSBoYXZhZSBkcm9wcGVkIHN3YXBwaW5nIGFzIGEgcGFydCBvZiB0aGUgYWxnb3JpdGhtKVxuXHRbNl0gUmVwbGFjZSBhbGwgaWRlbnRpZmllZCBwdW5jdHVhdGlvbiB3aXRoIGFwcHJvcHJpYXRlIHB1bmN0dWF0aW9uIGluXG5cdCAgICBnaXZlbiBsYW5ndWFnZVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSDigJQgbGFuZ3VhZ2Ugb3B0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIGNvcnJlY3Rfc2luZ2xlX3F1b3Rlc19wcmltZXNfYW5kX2Fwb3N0cm9waGVzKHN0cmluZywgbGFuZ3VhZ2UpIHtcblxuXHQvKiBbMS4xXSBJZGVudGlmeSDigJlu4oCZIGNvbnRyYWN0aW9ucyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKShuKShcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIilcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19XCIpO1xuXG5cblx0LyogWzEuMl0gSWRlbnRpZnkgY29tbW9uIGNvbnRyYWN0aW9ucyBhdCB0aGUgYmVnaW5uaW5nIG9yIGF0IHRoZSBlbmRcblx0XHRcdFx0XHQgb2YgdGhlIHdvcmQsIGUuZy4gRmlzaCDigJlu4oCZIENoaXBzLCDigJllbSwg4oCZY2F1c2Us4oCmICovXG5cdHZhciBjb250cmFjdGlvbl9leGFtcGxlcyA9IFwiZW18Y2F1c2V8dHdhc3x0aXN8dGlsfHJvdW5kXCJcblx0cGF0dGVybiA9IFwiKFwiICsgc2luZ2xlX3F1b3RlX2FkZXB0cyArIFwiKShcIiArIGNvbnRyYWN0aW9uX2V4YW1wbGVzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJcIik7XG5cblxuXHQvKiBbMS4zXSBJZGVudGlmeSBpbi13b3JkIGNvbnRyYWN0aW9ucyxcblx0XHRcdFx0XHQgZS5nLiBEb27igJl0LCBJ4oCZbSwgT+KAmURvb2xlLCA2OeKAmWVycyAqL1xuXHR2YXIgY2hhcmFjdGVyX2FkZXB0cyA9IFwiMC05XCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZTtcblx0cGF0dGVybiA9IFwiKFtcIisgY2hhcmFjdGVyX2FkZXB0cyArXCJdKShcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIikoW1wiKyBjaGFyYWN0ZXJfYWRlcHRzICtcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQzXCIpO1xuXG5cblx0LyogWzEuNF0gSWRlbnRpZnkgeWVhciBjb250cmFjdGlvbnNcblx0XHQgZS5nLiDigJk3MHMsIElOQ0hFQkEg4oCZODks4oCmICovXG5cdHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIikoWzAtOV17Mn0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMlwiKTtcblxuXG5cdC8qIFsyXSBJZGVudGlmeSBzaW5nbGUgcXVvdGVzIHdpdGhpbiBkb3VibGUgcXVvdGVzICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIikoLio/KShcIiArIGRvdWJsZV9xdW90ZV9hZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKCQwLCAkMSwgJDIsICQzKXtcblxuXHRcdC8vaWRlbnRpZnkge3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19XG5cdFx0dmFyIHBhdHRlcm4gPSBcIiggKShcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIikoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdKVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSQzXCIpO1xuXG5cdFx0Ly9pZGVudGlmeSB7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19XG5cdFx0cGF0dGVybiA9IFwiKFtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXSkoW1xcLiwhP10pPyhcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIikoWyBdfFtcXC4sIT9dKVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0JDIgPSAkMi5yZXBsYWNlKHJlLCBcIiQxJDJ7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19JDRcIik7XG5cblx0XHQvL2lkZW50aWZ5IHNpbmdsZSBxdW90ZSBwYWlyc1xuXHRcdHBhdHRlcm4gPSBcIih7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0pKC4qPykoe3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fSQye3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19XCIpO1xuXG5cdFx0cmV0dXJuICQxICsgJDIgKyAkMztcblx0fSk7XG5cblxuXHQvKiBbM10gSWRlbnRpZnkgZmVldCwgYXJjbWludXRlcywgbWludXRlc1xuXHRcdFx0XHQgTm90ZTogd2XigJlyZSBub3QgdXNpbmcgc2luZ2xlX3F1b3RlX2FkZXB0cyB2YXJpYWJsZVxuXHRcdFx0XHQgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9tbWl0ZWQqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxcZCkoID8pKCd84oCYfOKAmXzigJt84oCyKS9nLCBcIiQxe3t0eXBvcG9fX3NpbmdsZS1wcmltZX19XCIpO1xuXG5cblx0LyogWzRdIElkZW50aWZ5IHJlc2lkdWFsIGFwb3N0cm9waGVzIHRoYXQgaGF2ZSBsZWZ0ICovXG5cdHBhdHRlcm4gPSBcIihcIiArIHNpbmdsZV9xdW90ZV9hZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fVwiKTtcblxuXG5cblx0LyogWzVdIFB1bmN0dWF0aW9uIHJlcGxhY2VtZW50ICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3NpbmdsZS1wcmltZX19KS9nLCBcIuKAslwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19hcG9zdHJvcGhlfX18e3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19fHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0vZywgXCLigJlcIik7XG5cblxuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdGNhc2UgXCJydWVcIjpcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigLlcIik7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAulwiKTtcblx0XHRicmVhaztcblx0Y2FzZSBcInNrXCI6XG5cdGNhc2UgXCJjc1wiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmlwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCYXCIpO1xuXHRcdGJyZWFrO1xuXHRjYXNlIFwiZW5cIjpcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJhcIik7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmVwiKTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiBjb3JyZWN0X211bHRpcGxlX3NpZ24oc3RyaW5nKSB7XG5cdHJldHVybiByZW1vdmVfbXVsdGlwbGVfc3BhY2VzKHN0cmluZy5yZXBsYWNlKC8oWzEtOV0rWyBdezAsMX1bYS13el0qKShbIF17MCwxfVt4fMOXXVsgXXswLDF9KShbMS05XStbIF17MCwxfVthLXd6XSopL2csIFwiJDEgw5cgJDNcIikpO1xufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaHlwaGVuIHdpdGggZW0gb3IgZW4gZGFzaFxuXG5cdEFsZ29yaXRobVxuXHRbMV0gUmVwbGFjZSAzIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tLSkgd2l0aCBhbiBlbSBkYXNoICjigJQpXG5cdFsyXSBSZXBsYWNlIDIgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0pIHdpdGggYW4gZW4gZGFzaCAo4oCUKVxuXHRbM10gUmVwbGFjZSBhbnkgaHlwaGVuIG9yIGRhc2ggc3Vycm91bmRlZCB3aXRoIHNwYWNlcyB3aXRoIGFuIGVtIGRhc2hcblx0WzRdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2ggdXNlZCBpbiBudW1iZXIgcmFuZ2Ugd2l0aCBhbiBlbiBkYXNoXG5cdFx0XHRhbmQgc2V0IHByb3BlciBzcGFjaW5nXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGRhc2hlcyBpbnN0ZWFkIG9mIGh5cGhlbnNcbiovXG5mdW5jdGlvbiByZXBsYWNlX2h5cGhlbl93aXRoX2Rhc2goc3RyaW5nLCBsYW5ndWFnZSkge1xuXHR2YXIgZGFzaGVzID0gXCIt4oCT4oCUXCI7IC8vIGluY2x1ZGluZyBhIGh5cGhlblxuXG5cdC8qIFsxXSBSZXBsYWNlIDMgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0tKSB3aXRoIGFuIGVtIGRhc2ggKOKAlCkgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygtLS0pL2csIFwi4oCUXCIpO1xuXG5cblx0LyogWzJdIFJlcGxhY2UgMiBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLSkgd2l0aCBhbiBlbiBkYXNoICjigJQpICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oLS0pL2csIFwi4oCTXCIpO1xuXG5cblx0LyogWzNdIFJlcGxhY2UgYW55IGh5cGhlbiBvciBkYXNoIHN1cnJvdW5kZWQgd2l0aCBzcGFjZXMgd2l0aCBhbiBlbSBkYXNoICovXG5cdHZhciBwYXR0ZXJuID0gXCJbXCIgKyBzcGFjZXMgKyBcIl1bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBzcGFjZXMgKyBcIl1cIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciByZXBsYWNlbWVudCA9IG5hcnJvd19uYnNwICsgXCLigJRcIiArIGhhaXJfc3BhY2U7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblx0LyogWzQuMV0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCwgcGxhY2VkIGJldHdlZW4gMiBjYXJkaW5hbCBudW1iZXJzLFxuXHRcdFx0XHRcdCB3aXRoIGFuIGVuIGRhc2g7IGluY2x1ZGluZyBjYXNlcyB3aGVuIHRoZXJlIGlzIGFuIGV4dHJhIHNwYWNlXG5cdFx0XHRcdFx0IGZyb20gZWl0aGVyIG9uZSBzaWRlIG9yIGJvdGggc2lkZXMgb2YgdGhlIGRhc2ggKi9cblx0dmFyIGNhcmRpbmFsX251bWJlciA9IFwiXFxcXGQrXCI7XG5cdHBhdHRlcm4gPSBcIihcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShbXCIgKyBzcGFjZXMgKyBcIl0/W1wiICsgZGFzaGVzICsgXCJdW1wiICsgc3BhY2VzICsgXCJdPykoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDHigJMkM1wiKTtcblxuXG5cdC8qIFs0LjJdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgb3JkaW5hbCBudW1iZXJzLFxuXHRcdFx0XHRcdCB3aXRoIGFuIGVuIGRhc2g7IGluY2x1ZGluZyBjYXNlcyB3aGVuIHRoZXJlIGlzIGFuIGV4dHJhIHNwYWNlXG5cdFx0XHRcdFx0IGZyb20gZWl0aGVyIG9uZSBzaWRlIG9yIGJvdGggc2lkZXMgb2YgdGhlIGRhc2ggKi9cblx0dmFyIG9yZGluYWxfaW5kaWNhdG9yID0gXCJcIjtcblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRcdGNhc2UgXCJydWVcIjpcblx0XHRjYXNlIFwic2tcIjpcblx0XHRjYXNlIFwiY3NcIjpcblx0XHRcdG9yZGluYWxfaW5kaWNhdG9yID0gXCJcXFxcLlwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImVuXCI6XG5cdFx0XHRvcmRpbmFsX2luZGljYXRvciA9IFwic3R8bmR8cmR8dGhcIjtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHBhdHRlcm4gPSBcIihcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShcIiArIG9yZGluYWxfaW5kaWNhdG9yICsgXCIpKFtcIiArIHNwYWNlcyArIFwiXT9bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBzcGFjZXMgKyBcIl0/KShcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShcIiArIG9yZGluYWxfaW5kaWNhdG9yICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQy4oCTJDQkNVwiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZyl7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0pKFvigJPigJRdKShbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMS0kM1wiKTtcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRDb25zb2xpZGF0aW9uIG9mIHNwYWNlc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIHNwYWNlcyArIFwiXSkoW1wiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBjbG9zaW5nX2JyYWNrZXRzICsgZGVncmVlICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQyXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIG9wZW5pbmdfYnJhY2tldHMgKyBcIl0pKFtcIiArIHNwYWNlcyArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMVwiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcudHJpbSgpO1xufVxuXG5cblxuZnVuY3Rpb24gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKShbXCIgKyBvcGVuaW5nX2JyYWNrZXRzICsgXCJdKShbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQyJDNcIik7XG59XG5cblxuXG5mdW5jdGlvbiBhZGRfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSkoW1wiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBjbG9zaW5nX2JyYWNrZXRzICsgXCJdKShbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDIgJDNcIik7XG59XG5cblxuXG4vKlxuXHRSZW1vdmVzIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5uaW5nIG9mIGVhY2ggcGFyYWdyYXBoXG5cblx0VGhpcyBjb3VsZCBiZSBkb25lIHdpdGggYSBvbmUtbGluZXI6XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccysvZ20sIFwiXCIpO1xuXG5cdEhvd2V2ZXIsIGl0IGFsc28gcmVtb3ZlcyBlbXB0eSBsaW5lcy4gU2luY2UsIHdlIHdhbnQgdG8gaGFuZGxlIHRoaXMgY2hhbmdlXG5cdHNlcGFyYXRlbHksIHdlIG5lZWQgdG9cblx0WzFdIHNwbGl0IHRoZSBsaW5lcyBtYW51YWxseVxuXHRbMl0gYW5kIHJlbW92ZSBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2luaW5nIG9mIGVhY2ggbGluZVxuXHRbM10gam9pbiBsaW5lcyB0b2dldGhlciB0byBhIHNpbmdsZSBzdHJpbmdcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggcmVtb3ZlZCBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBwYXJhZ3JhcGhzXG4qL1xuZnVuY3Rpb24gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZykge1xuXHQvKiBbMV0gc3BsaXQgdGhlIGxpbmVzIG1hbnVhbGx5ICovXG5cdHZhciBsaW5lcyA9IHN0cmluZy5zcGxpdCgvXFxyP1xcbi8pO1xuXG5cdC8qIFsyXSBhbmQgcmVtb3ZlIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5pbmcgb2YgZWFjaCBsaW5lICovXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsaW5lc1tpXSA9IGxpbmVzW2ldLnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG5cdH1cblxuXHQvKiBbM10gam9pbiBsaW5lcyB0b2dldGhlciB0byBhIHNpbmdsZSBzdHJpbmcgKi9cblx0cmV0dXJuIGxpbmVzLmpvaW4oXCJcXG5cIik7XG59XG5cblxuXG4vKlxuXHRSZW1vdmVzIGVtcHR5IGxpbmVzXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgZW1wdHkgbGluZXNcbiovXG5mdW5jdGlvbiByZW1vdmVfZW1wdHlfbGluZXMoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccysvZ20sIFwiXCIpO1xufVxuXG5cblxuLypcblx0Q29uc29saWRhdGVzIHRoZSB1c2Ugb2Ygbm9uLWJyZWFraW5nIHNwYWNlc1xuXG5cdCogcmVtb3ZlcyBjaGFyYWN0ZXJzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIGNhcmRpbmFsIG51bWJlcnNcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYXJvdW5kIMOXXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RseSBwbGFjZWQgbm9uLWJyZWFraW5nIHNwYWNlXG4qL1xuZnVuY3Rpb24gY29uc29saWRhdGVfbmJzcChzdHJpbmcpIHtcblxuXHQvLyByZW1vdmVzIG5vbi1icmVha2luZyBzcGFjZXMgYmV0d2VlbiBtdWx0aS1jaGFyYWN0ZXIgd29yZHNcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl17Mix9KShbXCIrIG5ic3AgKyBuYXJyb3dfbmJzcCArXCJdKShbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl17Mix9KVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDNcIik7IC8vY2FsbGluZyBpdCB0d2ljZSB0byBjYXRjaCBvZGQvZXZlbiBvY2N1cmVuY2VzXG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgY2FyZGluYWwgbnVtYmVyc1xuXHRwYXR0ZXJuID0gXCIoWzAtOV0rKSggKShbXCIrIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0rKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgcmVwbGFjZW1lbnQgPSBcIiQxXCIgKyBuYnNwICsgXCIkM1wiO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXG5cdC8vIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhcm91bmQgw5dcblx0cGF0dGVybiA9IFwiKFtcIiArIHNwYWNlcyArIFwiXSkoW8OXXSkoW1wiICsgc3BhY2VzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXBsYWNlbWVudCA9IG5ic3AgKyBcIiQyXCIgKyBuYnNwO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG5cdHBhdHRlcm4gPSBcIihbwqAgXSkoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl18JikoIClcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmVwbGFjZW1lbnQgPSBcIiQxJDJcIiArIG5ic3A7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7IC8vY2FsbGluZyBpdCB0d2ljZSB0byBjYXRjaCBvZGQvZXZlbiBvY2N1cmVuY2VzXG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHNwYWNpbmcgYXJvdW5kIGVsbGlwc2lzIGFuZCBhcG9zaW9wZXNpc1xuXG5cdEVsbGlwc2lzIChhcyBhIGNoYXJhY3RlcikgaXMgdXNlZCBmb3IgMiBkaWZmZXJlbnQgcHVycG9zZXM6XG5cdDEuIGFzIGFuIGVsbGlwc2lzIHRvIG9tbWl0IGEgcGllY2Ugb2YgaW5mb3JtYXRpb24gZGVsaWJlcmF0ZWx5XG5cdDIuIGFzIGFuIGFwb3Npb3Blc2lzOyBhIGZpZ3VyZSBvZiBzcGVlY2ggd2hlcmVpbiBhIHNlbnRlbmNlIGlzXG5cdGRlbGliZXJhdGVseSBicm9rZW4gb2ZmIGFuZCBsZWZ0IHVuZmluaXNoZWRcblxuXHRzb3VyY2VzXG5cdGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0VsbGlwc2lzXG5cdGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Fwb3Npb3Blc2lzXG5cdGh0dHA6Ly93d3cubGl0ZWVyYS5jei9zbG92bmlrL3Z5cHVzdGthXG5cblx0QWxnb3JpdGhtXG5cdEVsbGlwc2lzICYgQXBvc2lvcGVzaXMgcmVxdWlyZSBkaWZmZXJlbnQgdXNlIG9mIHNwYWNpbmcgYXJvdW5kIHRoZW0sXG5cdHRoYXQgaXMgd2h5IHdlIGFyZSBjb3JyZWN0aW5nIG9ubHkgZm9sbG93aW5nIGNhc2VzOlxuXHRlcnJvcnM6XG5cdFsxXSBjb3JyZWN0IHNwYWNpbmcsIHdoZW4gZWxsaXBzaXMgdXNlZCB1c2VkIGFyb3VuZCBjb21tYXNcblx0WzJdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2UgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoXG5cdFszXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaFxuXHRbNF0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzVdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2UgYXQgdGhlIGVuZCBvZiB0aGUgcGFyYWdyYXBoXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RlZCBzcGFjaW5nIGFyb3VuZCBhcG9zaW9wZXNpc1xuKi9cbmZ1bmN0aW9uIGNvcnJlY3Rfc3BhY2VzX2Fyb3VuZF9lbGxpcHNpcyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gY29ycmVjdCBzcGFjaW5nLCB3aGVuIGVsbGlwc2lzIHVzZWQgdXNlZCBhcm91bmQgY29tbWFzICovXG5cdHZhciBwYXR0ZXJuID0gXCIsW1wiICsgc3BhY2VzICsgXCJdP1wiICsgZWxsaXBzaXMgKyBcIltcIiArIHNwYWNlcyArIFwiXT8sXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIsIOKApixcIik7XG5cblxuXHQvKiBbMl0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgXCJdKShbXCIgKyBzcGFjZXMgKyBcIl0pKFwiICsgZWxsaXBzaXMgKyBcIltcIiArIHNwYWNlcyArIFwiXVtcIiArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbM10gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBzZW50ZW5jZV9wdW5jdHVhdGlvbiArIFwiXVtcIiArIHNwYWNlcyArIFwiXVwiICsgZWxsaXBzaXMgK1wiKShbXCIgKyBzcGFjZXMgKyBcIl0pKFtcIiArIGxvd2VyY2FzZV9jaGFyc19lbl9za19jel9ydWUgK1wiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs0XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKF7igKYpKFtcIiArIHNwYWNlcyArIFwiXSkoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHVwcGVyY2FzZV9jaGFyc19lbl9za19jel9ydWUgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdtXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzVdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGF0IHRoZSBlbmQgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIHNlbnRlbmNlX3B1bmN0dWF0aW9uICsgXCJdKShbXCIgKyBzcGFjZXMgKyBcIl0pKFwiICsgZWxsaXBzaXMgKyBcIikoPyFbIFwiICsgc2VudGVuY2VfcHVuY3R1YXRpb24gKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICsgdXBwZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgYWNjaWRlbnRhbCB1cHBlcmNhc2VcblxuXHRCZXN0LWVmZm9ydCBmdW5jdGlvbiB0byBmaXggbW9zdCBjb21tb24gYWNjaWRlbnRhbCB1cHBlcmNhc2UgZXJyb3JzLCBuYW1lbHk6XG5cdFsxXSAyIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpZS4gVVBwZXJjYXNlKVxuXHRbMl0gU3dhcHBlZCBjYXNlcyAoaWUuIHVQUEVSQ0FTRSlcblxuXHRBbGdvcml0aG0gZG9lcyBub3QgZml4IG90aGVyIHVwcGVyY2FzZSBldmVudHVhbGl0aWVzLFxuXHRlLmcuIG1peGVkIGNhc2UgKFVwcEVSY2FTZSkgYXMgdGhlcmUgYXJlIG1hbnkgY2FzZXMgZm9yIGNvcnBvcmF0ZSBicmFuZHNcblx0dGhhdCBjb3VsZCBwb3RlbnRpYWxseSBtYXRjaCB0aGUgYWxnb3JpdGhtIGFzIGZhbHNlIHBvc2l0aXZlLlxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0ZWQgYWNjaWRlbnRhbCB1cHBlcmNhc2VcbiovXG5mdW5jdGlvbiBjb3JyZWN0X2FjY2lkZW50YWxfdXBwZXJjYXNlKHN0cmluZykge1xuXG5cdC8qIFsxXSB0d28gZmlyc3QgdXBwZXJjYXNlIGxldHRlcnMgKGkuZS4gVVBwZXJjYXNlKSAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl17MiwyfVtcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdK1wiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKHN0cmluZyl7XG5cdFx0cmV0dXJuIChzdHJpbmcuc3Vic3RyaW5nKDAsMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuXHR9KTtcblxuXHQvKiBbMi4xXSBTd2FwcGVkIGNhc2VzICgyLWxldHRlciBjYXNlcywgaS5lLiBpVClcblx0XHRcdE5vdGUgdGhhdCB0aGlzIGlzIGRpdmlkZWQgaW50byAyIHNlcGFyYXRlIGNhc2VzIGFzIFxcYiBpbiBKYXZhU2NyaXB0IHJlZ2V4XG5cdFx0XHRkb2VzIG5vdCB0YWtlIG5vbi1sYXRpbiBjaGFyYWN0ZXJzIGludG8gYSBjb3NuaWRlcmF0aW9uXG5cdCovXG5cdHBhdHRlcm4gPSBcIltcIisgbG93ZXJjYXNlX2NoYXJzX2VuX3NrX2N6X3J1ZSArXCJdW1wiKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl1cXFxcYlwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgZnVuY3Rpb24oc3RyaW5nKXtcblx0XHRyZXR1cm4gKHN0cmluZy5zdWJzdHJpbmcoMCwxKSArIHN0cmluZy5zdWJzdHJpbmcoMSkudG9Mb3dlckNhc2UoKSk7XG5cdH0pO1xuXG5cdC8qIFsyLjJdIFN3YXBwZWQgY2FzZXMgKG4tbGV0dGVyIGNhc2VzLCBpLmUuIHVQUEVSQ0FTRSkgKi9cblx0cGF0dGVybiA9IFwiW1wiKyBsb3dlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl0rW1wiKyB1cHBlcmNhc2VfY2hhcnNfZW5fc2tfY3pfcnVlICtcIl17Mix9XCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRBYmJyZXZpYXRpb25zXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG5cdElkZW50aWZpZXMgZGlmZmVyZW50bHktc3BlbGxlZCBhYmJyZXZpYXRpb25zIGFuZCByZXBsYWNlcyBpdCB3aXRoXG5cdGEgdGVtcCB2YXJpYWJsZSwge3t0eXBvcG9fX1thYmJyXX19XG5cblx0SWRlbnRpZmllcyBnaXZlbiBhYmJyZXZpYXRpb25zOlxuXHRhLm0uLCBwLm0uLCBlLmcuLCBpLmUuXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuXG5cdFsyXSBJZGVudGlmeSBhLm0uLCBwLm0uIChkaWZmZXJlbnQgbWF0Y2ggdG8gYXZvaWQgZmFsc2UgcG9zaXRpdmVzIHN1Y2ggYXM6XG5cdFx0XHRJIGFtLCBIZSBpcyB0aGUgUE0uKVxuXHRbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30gY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZykge1xuXG5cdC8qIFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuICovXG5cdHZhciBhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcIihcXFxcYltcIiArIGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIl1cXFxcLj9bXCIrIHNwYWNlcyArXCJdP1tcIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIl1cXFxcLj8pKFtcIisgc3BhY2VzICtcIl0/KShcXFxcYilcIjtcblx0XHQvLyBjb25zb2xlLmxvZyhwYXR0ZXJuKTtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gXCJ7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSBcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblxuXG5cblx0LyogWzJdIElkZW50aWZ5IGEubS4sIHAubS4gKi9cblx0YWJicmV2aWF0aW9ucyA9IFtcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCIoXFxcXGQpKFtcIiArIHNwYWNlcyArIFwiXT8pKFxcXFxiW1wiICsgYWJicmV2aWF0aW9uc1tpXVswXSArIFwiXVxcXFwuP1tcIisgc3BhY2VzICtcIl0/W1wiICsgYWJicmV2aWF0aW9uc1tpXVsxXSArIFwiXVxcXFwuPykoW1wiKyBzcGFjZXMgK1wiXT8pKFxcXFxifFxcXFxCKVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0XHRyZXBsYWNlbWVudCA9IFwiJDEge3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cblx0LyogWzNdIEV4Y2x1ZGUgZmFsc2UgaWRlbnRpZmljYXRpb25zXG5cdFx0IFJlZ2V4IFxcYiBkb2VzIG5vdCBjYXRjaCBub24tbGF0aW4gY2hhcmFjdGVycyBzbyB3ZSBuZWVkIHRvIGV4Y2x1ZGUgZmFsc2Vcblx0XHQgaWRlbnRpZmljYXRpb25zXG5cdCovXG5cdGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCIsIFwiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0Ly8gbm9uLWxhdGluIGNoYXJhY3RlciBhdCB0aGUgYmVnaW5uaW5nXG5cdFx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBub25fbGF0aW5fY2hhcnMgKyBcIl0pKHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19KVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gXCIkMVwiICsgYWJicmV2aWF0aW9uc1tpXTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cdFx0Ly8gbm9uLWxhdGluIGNoYXJhY3RlciBhdCB0aGUgZW5kXG5cdFx0cGF0dGVybiA9IFwiKHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19ICkoW1wiICsgbm9uX2xhdGluX2NoYXJzICsgXCJdKVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBhYmJyZXZpYXRpb25zW2ldICsgXCIkMlwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaWRlbnRpZmllZCB0ZW1wIGFiYnJldmlhdGlvbiB2YXJpYWJsZSBsaWtlIHt7dHlwb3BvX19lZ319LFxuXHR3aXRoIHRoZWlyIGFjdHVhbCByZXByZXNlbnRhdGlvblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gcGxhY2VfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKSB7XG5cdHZhciBhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiLCBcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCJ7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIi5cIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIi5cIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEV4Y2VwdGlvbnNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8qXG5cdElkZW50aWZpZXMgZXhjZXB0aW9ucyB0aGF0IHdpbGwgYmUgb21taXRlZCBmcm9tIGNvcnJlY3Rpb24gb2YgYW55IHNvcnRcblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGVtYWlsIGFkcmVzc2VzXG5cdFsyXSBJZGVudGlmeSB3ZWIgVVJMcyBhbmQgSVBzXG5cdFszXSBNYXJrIHRoZW0gYXMgdGVtcG9yYXJ5IGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX1cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb24gb2YgZXhjZXB0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19XG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gSWRlbnRpZnkgZW1haWwgYWRyZXNzZXMgKi9cblx0aWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIGVtYWlsX2FkZHJlc3NfcGF0dGVybik7XG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgd2ViIFVSTHMgYW5kIElQcyAqL1xuXHRpZGVudGlmeV9leGNlcHRpb25fc2V0KHN0cmluZywgd2ViX3VybF9wYXR0ZXJuKTtcblxuXG5cdC8qIFszXSBNYXJrIHRoZW0gYXMgdGVtcG9yYXJ5IGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX0gKi9cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBleGNlcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gXCJ7e3R5cG9wb19fZXhjZXB0aW9uLVwiICsgaSArIFwifX1cIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShleGNlcHRpb25zW2ldLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0SWRlbnRpZmllcyBzZXQgb2YgZXhjZXB0aW9ucyBmb3IgZ2l2ZW4gcGF0dGVyblxuXHRVc2VkIGFzIGhlbHBlciBmdW5jdGlvbiBmb3IgaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGV4Y2VwdGlvbnNcblx0QHBhcmFtIHtwYXR0ZXJufSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVybiB0byBtYXRjaCBleGNlcHRpb25cbiovXG5mdW5jdGlvbiBpZGVudGlmeV9leGNlcHRpb25fc2V0KHN0cmluZywgcGF0dGVybikge1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIG1hdGNoZWRfZXhjZXB0aW9ucyA9IHN0cmluZy5tYXRjaChyZSk7XG5cdGlmIChtYXRjaGVkX2V4Y2VwdGlvbnMgIT0gbnVsbCkge1xuXHRcdGV4Y2VwdGlvbnMgPSBleGNlcHRpb25zLmNvbmNhdChtYXRjaGVkX2V4Y2VwdGlvbnMpO1xuXHR9XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBpZGVudGlmaWVkIGV4Y2VwdGlvbnMgd2l0aCByZWFsIG9uZXMgYnkgY2hhbmdlIHRoZWlyXG5cdHRlbXBvcmFyeSByZXByZXNlbnRhdGlvbiBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fSB3aXRoIGl0c1xuXHRjb3JyZXNwb25kaW5nIHJlcHJlc2VudGF0aW9uXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgd2l0aCBpZGVudGlmaWVkIGV4Y2VwdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30gb3V0cHV0IHdpdGggcGxhY2VkIGV4Y2VwdGlvbnNcbiovXG5mdW5jdGlvbiBwbGFjZV9leGNlcHRpb25zKHN0cmluZykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2VwdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwie3t0eXBvcG9fX2V4Y2VwdGlvbi1cIiArIGkgKyBcIn19XCJcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBleGNlcHRpb25zW2ldO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdE1haW4gc2NyaXB0XG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbi8qXG5cdENvcnJlY3QgdHlwb3MgaW4gdGhlIHByZWRlZmluZWQgb3JkZXJcblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGNvcnJlY3Rpb25cblx0QHBhcmFtIHtsYW5ndWFnZX0gc3RyaW5nIOKAlCBsYW5ndWFnZSBvcHRpb24gdG8gY29ycmVjdCBzcGVjaWZpYyB0eXBvczsgc3VwcG9ydGVkIGxhbmd1YWdlczogZW4sIHNrLCBjcywgcnVlLiBpZiBub3Qgc3BlY2lmaWVkLCBFbmdsaXNoIHR5cG9zIGFyZSBjb3JyZWN0ZWRcblx0QHBhcmFtIHtyZW1vdmVfbGluZXN9IGJvb2xlYW4g4oCUIG9wdGlvbmFsIHBhcmFtZXRlciBhbGxvd2luZyB5b3UgdG8gY2hvb3NlIHdoZXRoZXIgdG8gcmVtb3ZlIGVtcHR5IGxpbmVzIG9yIG5vdFxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgY29ycmVjdGVkIG91dHB1dFxuKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JyZWN0X3R5cG9zKHN0cmluZywgbGFuZ3VhZ2UsIGNvbmZpZ3VyYXRpb24pIHtcblx0bGFuZ3VhZ2UgPSAodHlwZW9mIGxhbmd1YWdlID09PSBcInVuZGVmaW5lZFwiKSA/IFwiZW5cIiA6IGxhbmd1YWdlO1xuXG5cdGNvbmZpZ3VyYXRpb24gPSAodHlwZW9mIGNvbmZpZ3VyYXRpb24gPT09IFwidW5kZWZpbmVkXCIpID8ge1xuXHRcdHJlbW92ZUxpbmVzIDogdHJ1ZSxcblx0fSA6IGNvbmZpZ3VyYXRpb247XG5cblx0c3RyaW5nID0gaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpO1xuXHRzdHJpbmcgPSBpZGVudGlmeV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpOyAvLyBuZWVkcyB0byBnbyBiZWZvcmUgcHVuY3R1YXRpb24gZml4ZXNcblxuXHRzdHJpbmcgPSByZXBsYWNlX3N5bWJvbHMoc3RyaW5nLCBlc3NlbnRpYWxfc2V0KTtcblx0c3RyaW5nID0gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpO1xuXG5cblx0c3RyaW5nID0gY29ycmVjdF9kb3VibGVfcXVvdGVzX2FuZF9wcmltZXMoc3RyaW5nLCBsYW5ndWFnZSk7XG5cdHN0cmluZyA9IGNvcnJlY3Rfc2luZ2xlX3F1b3Rlc19wcmltZXNfYW5kX2Fwb3N0cm9waGVzKHN0cmluZywgbGFuZ3VhZ2UpO1xuXG5cdHN0cmluZyA9IGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKTtcblx0c3RyaW5nID0gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSBhZGRfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZyk7XG5cblx0aWYoY29uZmlndXJhdGlvbi5yZW1vdmVMaW5lcykge1xuXHRcdHN0cmluZyA9IHJlbW92ZV9lbXB0eV9saW5lcyhzdHJpbmcpO1xuXHR9XG5cblx0c3RyaW5nID0gY29uc29saWRhdGVfbmJzcChzdHJpbmcpO1xuXHRzdHJpbmcgPSBjb3JyZWN0X3NwYWNlc19hcm91bmRfZWxsaXBzaXMoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZXBsYWNlX2h5cGhlbl93aXRoX2Rhc2goc3RyaW5nLCBsYW5ndWFnZSk7XG5cdHN0cmluZyA9IHJlcGxhY2VfZGFzaF93aXRoX2h5cGhlbihzdHJpbmcpO1xuXG5cdHN0cmluZyA9IGNvcnJlY3RfYWNjaWRlbnRhbF91cHBlcmNhc2Uoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSBwbGFjZV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpOyAvLyBuZWVkcyB0byBnbyBhZnRlciBwdW5jdHVhdGlvbiBmaXhlc1xuXHRzdHJpbmcgPSBwbGFjZV9leGNlcHRpb25zKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuIl19

//# sourceMappingURL=maps/typopo.built.js.map
