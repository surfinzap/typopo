(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typopo = require('./typopo');

window.correct_typos = _typopo.correct_typos;

},{"./typopo":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*----------------------------------------------------------------------------*\
 Variables & Character replacement sets
\*----------------------------------------------------------------------------*/

var essentialSet = {
  "\\(C\\)": "©",
  "\\(c\\)": "©",
  "\\(P\\)": "Ⓟ",
  "\\(p\\)": "Ⓟ",
  "\\(R\\)": "®",
  "\\(r\\)": "®",
  "\\(TM\\)": "™",
  "\\(tm\\)": "™",
  "\\+\\-": "±",
  "\\-\\+": "±"
};
var nonLatinLowercase = "áäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
var nonLatinUppercase = "ÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
var nonLatinChars = nonLatinLowercase + nonLatinUppercase;
var lowercaseChars = "a-z" + nonLatinLowercase;
var uppercaseChars = "A-Z" + nonLatinUppercase;
var allChars = lowercaseChars + uppercaseChars;
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
var singleQuoteAdepts = "‚|'|‘|’|ʼ|‛|′|‹|›";
var doubleQuoteAdepts = "„|“|”|\"|«|»|″|,{2,}|‘{2,}|’{2,}|'{2,}|‹{2,}|›{2,}|′{2,}";
var space = " ";
var nbsp = " ";
var hairSpace = " "; //&#8202;
var narrowNbsp = " "; //&#8239;
var spaces = space + nbsp + hairSpace + narrowNbsp;
var terminalPunctuation = "\.\!\?";
var sentencePunctuation = "\,\:\;" + terminalPunctuation; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
var openingBrackets = "\\(\\[\\{";
var closingBrackets = "\\)\\]\\}";
var ellipsis = "…";
var degree = "°";

/*
 Source for webUrlPattern, emailAddressPattern
 http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
 */
var webUrlPattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" + "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" + "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" + "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" + // named host
"(?:" + // plus top level domain
"(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" + "|(?:biz|b[abdefghijmnorstvwyz])" + "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" + "|d[ejkmoz]" + "|(?:edu|e[cegrstu])" + "|f[ijkmor]" + "|(?:gov|g[abdefghilmnpqrstuwy])" + "|h[kmnrtu]" + "|(?:info|int|i[delmnoqrst])" + "|(?:jobs|j[emop])" + "|k[eghimnrwyz]" + "|l[abcikrstuvy]" + "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" + "|(?:name|net|n[acefgilopruz])" + "|(?:org|om)" + "|(?:pro|p[aefghklmnrstwy])" + "|qa" + "|r[eouw]" + "|s[abcdeghijklmnortuvyz]" + "|(?:tel|travel|t[cdfghjklmnoprtvwz])" + "|u[agkmsyz]" + "|v[aceginu]" + "|w[fs]" + "|y[etu]" + "|z[amw]))" + "|(?:(?:25[0-5]|2[0-4]" + // or ip address
"[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" + "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" + "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" + "|[1-9][0-9]|[0-9])))" + "(?:\\:\\d{1,5})?)" + // plus option port number +
"(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
"\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" + "(?:\\b|$)"; // and finally, a word boundary or end of
// input.  This is to stop foo.sure from
// matching as foo.su


var emailAddressPattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" + "\\@" + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" + "(" + "\\." + "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" + ")+";

exports.default = {
  essentialSet: essentialSet,
  nonLatinLowercase: nonLatinLowercase,
  nonLatinUppercase: nonLatinUppercase,
  nonLatinChars: nonLatinChars,
  lowercaseChars: lowercaseChars,
  uppercaseChars: uppercaseChars,
  allChars: allChars,
  singleQuoteAdepts: singleQuoteAdepts,
  doubleQuoteAdepts: doubleQuoteAdepts,
  space: space,
  nbsp: nbsp,
  hairSpace: hairSpace,
  narrowNbsp: narrowNbsp,
  spaces: spaces,
  terminalPunctuation: terminalPunctuation,
  sentencePunctuation: sentencePunctuation,
  openingBrackets: openingBrackets,
  closingBrackets: closingBrackets,
  ellipsis: ellipsis,
  degree: degree,
  webUrlPattern: webUrlPattern,
  emailAddressPattern: emailAddressPattern
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.removeEmptyLines = removeEmptyLines;
/*
	Removes empty lines

	@param {string} string — input text for identification
	@returns {string} — output with removed empty lines
*/
function removeEmptyLines(string) {
	return string.replace(/^\s+/gm, "");
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.correct_typos = correct_typos;

var _emptyLines = require("./lib/empty-lines");

var _constants = require("./lib/constants");

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * Typopo 1.4.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-15
 */

var exceptions = [];

/*----------------------------------------------------------------------------*\
	Esential replacements
\*----------------------------------------------------------------------------*/

function replace_symbols(string) {
	for (var rule in _constants2.default.essentialSet) {
		var re = new RegExp(rule, "g");
		string = string.replace(re, _constants2.default.essentialSet[rule]);
	}
	return string;
}

function replace_periods_with_ellipsis(string) {
	/* [1] replace 3 and more dots with an ellipsis */
	string = string.replace(/\.{3,}/g, "…");

	/* [2] replace 2 dots in the middle of the sentecne with an aposiopesis */
	var pattern = "[" + _constants2.default.spaces + "]\\.{2}[" + _constants2.default.spaces + "]";
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
	var pattern = "([" + _constants2.default.sentencePunctuation + "])(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.sentencePunctuation + "])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2");

	/* [1] Swap right double quote adepts with a terminal punctuation */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.terminalPunctuation + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, '$2$1');

	/* [2] Identify inches, arcseconds, seconds
 			 Note: we’re not using constants.doubleQuoteAdepts variable
 			 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d ?)(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{{typopo__double-prime}}");

	/* [3] Identify closed double quotes */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")(.*?)(" + _constants2.default.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2{{typopo__right-double-quote}}");

	/* [4.1] Identify unclosed left double quote */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__left-double-quote}}$2");

	/* [4.2] Identify unclosed right double quote */
	pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + _constants2.default.sentencePunctuation + _constants2.default.ellipsis + "])(" + _constants2.default.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__right-double-quote}}");

	/* [4.3] Remove remaining unidentified double quote */
	pattern = "([" + _constants2.default.spaces + "])(" + _constants2.default.doubleQuoteAdepts + ")([" + _constants2.default.spaces + "])";
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
	pattern = "([^" + _constants2.default.sentencePunctuation + "][" + _constants2.default.spaces + "]{{typopo__left-double-quote}}.+?)([" + _constants2.default.terminalPunctuation + "])({{typopo__right-double-quote}})";
	// console.log(pattern);
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3$2");

	/* [7] Remove extra comma after punctuation in direct speech,
 				 e.g. "“Hey!,” she said" */
	pattern = "([" + _constants2.default.sentencePunctuation + "])([\,])";
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
	var pattern = "(" + _constants2.default.singleQuoteAdepts + ")(n)(" + _constants2.default.singleQuoteAdepts + ")";
	var re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2{{typopo__apostrophe}}");

	/* [1.2] Identify common contractions at the beginning or at the end
 				 of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
	var contraction_examples = "em|cause|twas|tis|til|round";
	pattern = "(" + _constants2.default.singleQuoteAdepts + ")(" + contraction_examples + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2");

	/* [1.3] Identify in-word contractions,
 				 e.g. Don’t, I’m, O’Doole, 69’ers */
	var character_adepts = "0-9" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars;
	pattern = "([" + character_adepts + "])(" + _constants2.default.singleQuoteAdepts + ")([" + character_adepts + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{{typopo__apostrophe}}$3");

	/* [1.4] Identify year contractions
 	 e.g. ’70s, INCHEBA ’89,… */
	pattern = "(" + _constants2.default.singleQuoteAdepts + ")([0-9]{2})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{{typopo__apostrophe}}$2");

	/* [2] Identify single quotes within double quotes */
	pattern = "(" + _constants2.default.doubleQuoteAdepts + ")(.*?)(" + _constants2.default.doubleQuoteAdepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function ($0, $1, $2, $3) {

		//identify {{typopo__left-single-quote--adept}}
		var pattern = "( )(" + _constants2.default.singleQuoteAdepts + ")([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

		//identify {{typopo__right-single-quote--adept}}
		pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])([\.,!?])?(" + _constants2.default.singleQuoteAdepts + ")([ ]|[\.,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{{typopo__right-single-quote--adept}}$4");

		//identify single quote pairs
		pattern = "({{typopo__left-single-quote--adept}})(.*?)({{typopo__right-single-quote--adept}})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{{typopo__left-single-quote}}$2{{typopo__right-single-quote}}");

		return $1 + $2 + $3;
	});

	/* [3] Identify feet, arcminutes, minutes
 			 Note: we’re not using constants.singleQuoteAdepts variable
 			 as commas and low-positioned quotes are ommited*/
	string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{{typopo__single-prime}}");

	/* [4] Identify residual apostrophes that have left */
	pattern = "(" + _constants2.default.singleQuoteAdepts + ")";
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
	var pattern = "[" + _constants2.default.spaces + "][" + dashes + "][" + _constants2.default.spaces + "]";
	var re = new RegExp(pattern, "g");
	var replacement = _constants2.default.narrowNbsp + "—" + _constants2.default.hairSpace;
	string = string.replace(re, replacement);

	/* [4.1] Replace hyphen or dash, placed between 2 cardinal numbers,
 				 with an en dash; including cases when there is an extra space
 				 from either one side or both sides of the dash */
	var cardinal_number = "\\d+";
	pattern = "(" + cardinal_number + ")([" + _constants2.default.spaces + "]?[" + dashes + "][" + _constants2.default.spaces + "]?)(" + cardinal_number + ")";
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
	pattern = "(" + cardinal_number + ")(" + ordinal_indicator + ")([" + _constants2.default.spaces + "]?[" + dashes + "][" + _constants2.default.spaces + "]?)(" + cardinal_number + ")(" + ordinal_indicator + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "$1$2–$4$5");

	return string;
}

function replace_dash_with_hyphen(string) {
	var pattern = "([" + _constants2.default.lowercaseChars + "])([–—])([" + _constants2.default.lowercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}

/*----------------------------------------------------------------------------*\
	Consolidation of spaces
\*----------------------------------------------------------------------------*/

function remove_space_before_punctuation(string) {
	var pattern = "([" + _constants2.default.spaces + "])([" + _constants2.default.sentencePunctuation + _constants2.default.closingBrackets + _constants2.default.degree + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$2");
}

function remove_space_after_punctuation(string) {
	var pattern = "([" + _constants2.default.openingBrackets + "])([" + _constants2.default.spaces + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1");
}

function remove_trailing_spaces(string) {
	return string.trim();
}

function add_space_before_punctuation(string) {
	var pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])([" + _constants2.default.openingBrackets + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}

function add_space_after_punctuation(string) {
	var pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])([" + _constants2.default.sentencePunctuation + _constants2.default.closingBrackets + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
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
	var pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]{2,})([" + _constants2.default.nbsp + _constants2.default.narrowNbsp + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]{2,})";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1 $3");
	string = string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


	// adds non-breaking spaces after cardinal numbers
	pattern = "([0-9]+)( )([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]+)";
	re = new RegExp(pattern, "g");
	var replacement = "$1" + _constants2.default.nbsp + "$3";
	string = string.replace(re, replacement);

	// adds non-breaking spaces around ×
	pattern = "([" + _constants2.default.spaces + "])([×])([" + _constants2.default.spaces + "])";
	re = new RegExp(pattern, "g");
	replacement = _constants2.default.nbsp + "$2" + _constants2.default.nbsp;
	string = string.replace(re, replacement);

	// adds non-breaking spaces after single-character prepositions
	pattern = "([  ])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "]|&)( )";
	re = new RegExp(pattern, "g");
	replacement = "$1$2" + _constants2.default.nbsp;
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
	var pattern = ",[" + _constants2.default.spaces + "]?" + _constants2.default.ellipsis + "[" + _constants2.default.spaces + "]?,";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, ", …,");

	/* [2] correct spacing for aposiopesis at the end of the sentence
 			 in the middle of the paragraph */
	pattern = "([" + _constants2.default.lowercaseChars + "])([" + _constants2.default.spaces + "])(" + _constants2.default.ellipsis + "[" + _constants2.default.spaces + "][" + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [3] correct spacing for aposiopesis at the beginning of the sentence
 			 in the middle of the paragraph */
	pattern = "([" + _constants2.default.sentencePunctuation + "][" + _constants2.default.spaces + "]" + _constants2.default.ellipsis + ")([" + _constants2.default.spaces + "])([" + _constants2.default.lowercaseChars + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/* [4] correct spacing for aposiopesis at the beginning of the sentence
 			 at the beginning of the paragraph */
	pattern = "(^…)([" + _constants2.default.spaces + "])([" + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
	re = new RegExp(pattern, "gm");
	string = string.replace(re, "$1$3");

	/* [5] correct spacing for aposiopesis at the end of the sentence
 			 at the end of the paragraph */
	pattern = "([" + _constants2.default.lowercaseChars + _constants2.default.sentencePunctuation + "])([" + _constants2.default.spaces + "])(" + _constants2.default.ellipsis + ")(?![ " + _constants2.default.sentencePunctuation + _constants2.default.lowercaseChars + _constants2.default.uppercaseChars + "])";
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
	var pattern = "[" + _constants2.default.uppercaseChars + "]{2,2}[" + _constants2.default.lowercaseChars + "]+";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	/* [2.1] Swapped cases (2-letter cases, i.e. iT)
 		Note that this is divided into 2 separate cases as \b in JavaScript regex
 		does not take non-latin characters into a cosnideration
 */
	pattern = "[" + _constants2.default.lowercaseChars + "][" + _constants2.default.uppercaseChars + "]\\b";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function (string) {
		return string.substring(0, 1) + string.substring(1).toLowerCase();
	});

	/* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
	pattern = "[" + _constants2.default.lowercaseChars + "]+[" + _constants2.default.uppercaseChars + "]{2,}";
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
		var pattern = "(\\b[" + abbreviations[i][0] + "]\\.?[" + _constants2.default.spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + _constants2.default.spaces + "]?)(\\b)";
		// console.log(pattern);
		var re = new RegExp(pattern, "gi");
		var replacement = "{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}

	/* [2] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\d)([" + _constants2.default.spaces + "]?)(\\b[" + abbreviations[i][0] + "]\\.?[" + _constants2.default.spaces + "]?[" + abbreviations[i][1] + "]\\.?)([" + _constants2.default.spaces + "]?)(\\b|\\B)";
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
		var pattern = "([" + _constants2.default.nonLatinChars + "])({{typopo__" + abbreviations[i] + "}})";
		var re = new RegExp(pattern, "g");
		replacement = "$1" + abbreviations[i];
		string = string.replace(re, replacement);

		// non-latin character at the end
		pattern = "({{typopo__" + abbreviations[i] + "}} )([" + _constants2.default.nonLatinChars + "])";
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
	identify_exception_set(string, _constants2.default.emailAddressPattern);

	/* [2] Identify web URLs and IPs */
	identify_exception_set(string, _constants2.default.webUrlPattern);

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

	string = replace_symbols(string);
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
		string = (0, _emptyLines.removeEmptyLines)(string);
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

},{"./lib/constants":2,"./lib/empty-lines":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGJyb3dzZXJfdHlwb3BvLmpzIiwic3JjXFxsaWJcXGNvbnN0YW50cy5qcyIsInNyY1xcbGliXFxlbXB0eS1saW5lcy5qcyIsInNyY1xcdHlwb3BvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQSxPQUFPLGFBQVA7Ozs7Ozs7O0FDRkE7Ozs7QUFJQSxJQUFNLGVBQWU7QUFDbkIsYUFBVyxHQURRO0FBRW5CLGFBQVcsR0FGUTtBQUdwQixhQUFXLEdBSFM7QUFJcEIsYUFBVyxHQUpTO0FBS25CLGFBQVcsR0FMUTtBQU1uQixhQUFXLEdBTlE7QUFPbkIsY0FBWSxHQVBPO0FBUW5CLGNBQVksR0FSTztBQVNuQixZQUFVLEdBVFM7QUFVbkIsWUFBVTtBQVZTLENBQXJCO0FBWUEsSUFBTSxvQkFBb0IsOERBQTFCO0FBQ0EsSUFBTSxvQkFBb0IsOERBQTFCO0FBQ0EsSUFBTSxnQkFBZ0Isb0JBQW9CLGlCQUExQztBQUNBLElBQU0saUJBQWlCLFFBQVEsaUJBQS9CO0FBQ0EsSUFBTSxpQkFBaUIsUUFBUSxpQkFBL0I7QUFDQSxJQUFNLFdBQVcsaUJBQWlCLGNBQWxDO0FBQ0E7Ozs7Ozs7Ozs7QUFVQSxJQUFNLG9CQUFvQixtQkFBMUI7QUFDQSxJQUFNLG9CQUFvQiwwREFBMUI7QUFDQSxJQUFNLFFBQVEsR0FBZDtBQUNBLElBQU0sT0FBTyxHQUFiO0FBQ0EsSUFBTSxZQUFZLEdBQWxCLEMsQ0FBdUI7QUFDdkIsSUFBTSxhQUFhLEdBQW5CLEMsQ0FBd0I7QUFDeEIsSUFBTSxTQUFTLFFBQVEsSUFBUixHQUFlLFNBQWYsR0FBMkIsVUFBMUM7QUFDQSxJQUFNLHNCQUFzQixRQUE1QjtBQUNBLElBQU0sc0JBQXNCLFdBQVcsbUJBQXZDLEMsQ0FBNEQ7QUFDNUQsSUFBTSxrQkFBa0IsV0FBeEI7QUFDQSxJQUFNLGtCQUFrQixXQUF4QjtBQUNBLElBQU0sV0FB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aUJBQWlCLE1BQWpCLENBQVQ7QUFDQSxVQUFTLCtCQUErQixNQUEvQixDQUFUOztBQUVBLFVBQVMseUJBQXlCLE1BQXpCLEVBQWlDLFFBQWpDLENBQVQ7QUFDQSxVQUFTLHlCQUF5QixNQUF6QixDQUFUOztBQUVBLFVBQVMsNkJBQTZCLE1BQTdCLENBQVQ7O0FBRUEsVUFBUywyQkFBMkIsTUFBM0IsQ0FBVCxDQXZDOEQsQ0F1Q2pCO0FBQzdDLFVBQVMsaUJBQWlCLE1BQWpCLENBQVQ7O0FBRUEsVUFBUyw4QkFBOEIsTUFBOUIsQ0FBVDs7QUFFQSxRQUFPLE1BQVA7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBjb3JyZWN0X3R5cG9zIH0gZnJvbSAnLi90eXBvcG8nO1xuXG53aW5kb3cuY29ycmVjdF90eXBvcyA9IGNvcnJlY3RfdHlwb3M7XG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcbiBWYXJpYWJsZXMgJiBDaGFyYWN0ZXIgcmVwbGFjZW1lbnQgc2V0c1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmNvbnN0IGVzc2VudGlhbFNldCA9IHtcbiAgXCJcXFxcKENcXFxcKVwiOiBcIsKpXCIsXG4gIFwiXFxcXChjXFxcXClcIjogXCLCqVwiLFxuXHRcIlxcXFwoUFxcXFwpXCI6IFwi4pOFXCIsXG5cdFwiXFxcXChwXFxcXClcIjogXCLik4VcIixcbiAgXCJcXFxcKFJcXFxcKVwiOiBcIsKuXCIsXG4gIFwiXFxcXChyXFxcXClcIjogXCLCrlwiLFxuICBcIlxcXFwoVE1cXFxcKVwiOiBcIuKEolwiLFxuICBcIlxcXFwodG1cXFxcKVwiOiBcIuKEolwiLFxuICBcIlxcXFwrXFxcXC1cIjogXCLCsVwiLFxuICBcIlxcXFwtXFxcXCtcIjogXCLCsVwiLFxufTtcbmNvbnN0IG5vbkxhdGluTG93ZXJjYXNlID0gXCLDocOkxI3Ej8OpxJvDrcS6xL7FiMOzw7TDtsWRxZXFmcWhxaXDusO8xbHFr8O9xb7QsNCx0LLQs9KR0LTQtdC30ZbQuNC50LrQu9C80L3QvtC/0YDRgdGC0YPRhNGK0YvRjNGG0YfQttGI0ZfRidGR0ZTRjtGP0YVcIjtcbmNvbnN0IG5vbkxhdGluVXBwZXJjYXNlID0gXCLDgcOExIzEjsOJxJrDjcS5xL3Fh8OTw5TDlsWQxZTFmMWgxaTDmsOcxbDFrsOdxb3QkNCR0JLQk9KQ0JTQldCX0IbQmNCZ0JrQm9Cc0J3QntCf0KDQodCi0KPQpNCq0KvQrNCm0KfQltCo0IfQqdCB0ITQrtCv0KVcIjtcbmNvbnN0IG5vbkxhdGluQ2hhcnMgPSBub25MYXRpbkxvd2VyY2FzZSArIG5vbkxhdGluVXBwZXJjYXNlO1xuY29uc3QgbG93ZXJjYXNlQ2hhcnMgPSBcImEtelwiICsgbm9uTGF0aW5Mb3dlcmNhc2U7XG5jb25zdCB1cHBlcmNhc2VDaGFycyA9IFwiQS1aXCIgKyBub25MYXRpblVwcGVyY2FzZTtcbmNvbnN0IGFsbENoYXJzID0gbG93ZXJjYXNlQ2hhcnMgKyB1cHBlcmNhc2VDaGFycztcbi8qXG4gKDM5KVx0XHRcdGR1bWIgc2luZ2xlIHF1b3RlXG4gKDgyMTYpXHRcdGxlZnQgc2luZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKDgyMTcpXHRcdHJpZ2h0IHNpbmdsZSBxdW90YXRpb24gbWFya1xuICg3MDApXHRcdG1vZGlmaWVyIGxldHRlciBhcG9zdHJvcGhlOyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Nb2RpZmllcl9sZXR0ZXJfYXBvc3Ryb3BoZVxuICg4MjE5KVx0XHRzaW5nbGUgaGlnaC1yZXZlcnNlZC05IHF1b3RhdGlvbiBtYXJrXG4gKDgyNDIpXHRcdHByaW1lXG4gKDgyNDkpXHRcdHNpbmdsZSBsZWZ0LXBvaW50aW5nIGFuZ2xlIHF1b3RhdGlvbiBtYXJrXG4gKDgyNTApXHRcdHNpbmdsZSByaWdodC1wb2ludGluZyBhbmdsZSBxdW90YXRpb24gbWFya1xuICovXG5jb25zdCBzaW5nbGVRdW90ZUFkZXB0cyA9IFwi4oCafCd84oCYfOKAmXzKvHzigJt84oCyfOKAuXzigLpcIjtcbmNvbnN0IGRvdWJsZVF1b3RlQWRlcHRzID0gXCLigJ584oCcfOKAnXxcXFwifMKrfMK7fOKAs3wsezIsfXzigJh7Mix9fOKAmXsyLH18J3syLH184oC5ezIsfXzigLp7Mix9fOKAsnsyLH1cIjtcbmNvbnN0IHNwYWNlID0gXCIgXCI7XG5jb25zdCBuYnNwID0gXCLCoFwiO1xuY29uc3QgaGFpclNwYWNlID0gXCLigIpcIjsgLy8mIzgyMDI7XG5jb25zdCBuYXJyb3dOYnNwID0gXCLigK9cIjsgLy8mIzgyMzk7XG5jb25zdCBzcGFjZXMgPSBzcGFjZSArIG5ic3AgKyBoYWlyU3BhY2UgKyBuYXJyb3dOYnNwO1xuY29uc3QgdGVybWluYWxQdW5jdHVhdGlvbiA9IFwiXFwuXFwhXFw/XCI7XG5jb25zdCBzZW50ZW5jZVB1bmN0dWF0aW9uID0gXCJcXCxcXDpcXDtcIiArIHRlcm1pbmFsUHVuY3R1YXRpb247IC8vIHRoZXJlIGlzIG5vIGVsbGlwc2lzIGluIHRoZSBzZXQgYXMgaXQgaXMgYmVpbmcgdXNlZCB0aHJvdWdob3V0IGEgc2VudGVuY2UgaW4gdGhlIG1pZGRsZS4gUmV0aGluayB0aGlzIGdyb3VwIHRvIHNwbGl0IGl0IGludG8gZW5kLXNlbnRlbmNlIHB1bmN0dWF0aW9uIGFuZCBtaWRkbGUgc2VudGVuY2UgcHVuY3R1YXRpb25cbmNvbnN0IG9wZW5pbmdCcmFja2V0cyA9IFwiXFxcXChcXFxcW1xcXFx7XCI7XG5jb25zdCBjbG9zaW5nQnJhY2tldHMgPSBcIlxcXFwpXFxcXF1cXFxcfVwiO1xuY29uc3QgZWxsaXBzaXMgPSBcIuKAplwiO1xuY29uc3QgZGVncmVlID0gXCLCsFwiO1xuXG4vKlxuIFNvdXJjZSBmb3Igd2ViVXJsUGF0dGVybiwgZW1haWxBZGRyZXNzUGF0dGVyblxuIGh0dHA6Ly9ncmVwY29kZS5jb20vZmlsZS9yZXBvc2l0b3J5LmdyZXBjb2RlLmNvbS9qYXZhL2V4dC9jb20uZ29vZ2xlLmFuZHJvaWQvYW5kcm9pZC8yLjBfcjEvYW5kcm9pZC90ZXh0L3V0aWwvUmVnZXguamF2YSNSZWdleC4wV0VCX1VSTF9QQVRURVJOXG4gKi9cbmNvbnN0IHdlYlVybFBhdHRlcm4gPSBcIigoPzooaHR0cHxodHRwc3xIdHRwfEh0dHBzfHJ0c3B8UnRzcCk6XFxcXC9cXFxcLyg/Oig/OlthLXpBLVowLTlcXFxcJFxcXFwtXFxcXF9cXFxcLlxcXFwrXFxcXCFcXFxcKlxcXFwnXFxcXChcXFxcKVwiICtcbiAgXCJcXFxcLFxcXFw7XFxcXD9cXFxcJlxcXFw9XXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSl7MSw2NH0oPzpcXFxcOig/OlthLXpBLVowLTlcXFxcJFxcXFwtXFxcXF9cIiArXG4gIFwiXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcXFxcLFxcXFw7XFxcXD9cXFxcJlxcXFw9XXwoPzpcXFxcJVthLWZBLUYwLTldezJ9KSl7MSwyNX0pP1xcXFxAKT8pP1wiICtcbiAgXCIoKD86KD86W2EtekEtWjAtOV1bYS16QS1aMC05XFxcXC1dezAsNjR9XFxcXC4pK1wiICsgIC8vIG5hbWVkIGhvc3RcbiAgXCIoPzpcIiArIC8vIHBsdXMgdG9wIGxldmVsIGRvbWFpblxuICBcIig/OmFlcm98YXJwYXxhc2lhfGFbY2RlZmdpbG1ub3Fyc3R1d3h6XSlcIiArXG4gIFwifCg/OmJpenxiW2FiZGVmZ2hpam1ub3JzdHZ3eXpdKVwiICtcbiAgXCJ8KD86Y2F0fGNvbXxjb29wfGNbYWNkZmdoaWtsbW5vcnV2eHl6XSlcIiArXG4gIFwifGRbZWprbW96XVwiICtcbiAgXCJ8KD86ZWR1fGVbY2VncnN0dV0pXCIgK1xuICBcInxmW2lqa21vcl1cIiArXG4gIFwifCg/OmdvdnxnW2FiZGVmZ2hpbG1ucHFyc3R1d3ldKVwiICtcbiAgXCJ8aFtrbW5ydHVdXCIgK1xuICBcInwoPzppbmZvfGludHxpW2RlbG1ub3Fyc3RdKVwiICtcbiAgXCJ8KD86am9ic3xqW2Vtb3BdKVwiICtcbiAgXCJ8a1tlZ2hpbW5yd3l6XVwiICtcbiAgXCJ8bFthYmNpa3JzdHV2eV1cIiArXG4gIFwifCg/Om1pbHxtb2JpfG11c2V1bXxtW2FjZGdoa2xtbm9wcXJzdHV2d3h5el0pXCIgK1xuICBcInwoPzpuYW1lfG5ldHxuW2FjZWZnaWxvcHJ1el0pXCIgK1xuICBcInwoPzpvcmd8b20pXCIgK1xuICBcInwoPzpwcm98cFthZWZnaGtsbW5yc3R3eV0pXCIgK1xuICBcInxxYVwiICtcbiAgXCJ8cltlb3V3XVwiICtcbiAgXCJ8c1thYmNkZWdoaWprbG1ub3J0dXZ5el1cIiArXG4gIFwifCg/OnRlbHx0cmF2ZWx8dFtjZGZnaGprbG1ub3BydHZ3el0pXCIgK1xuICBcInx1W2Fna21zeXpdXCIgK1xuICBcInx2W2FjZWdpbnVdXCIgK1xuICBcInx3W2ZzXVwiICtcbiAgXCJ8eVtldHVdXCIgK1xuICBcInx6W2Ftd10pKVwiICtcbiAgXCJ8KD86KD86MjVbMC01XXwyWzAtNF1cIiArIC8vIG9yIGlwIGFkZHJlc3NcbiAgXCJbMC05XXxbMC0xXVswLTldezJ9fFsxLTldWzAtOV18WzEtOV0pXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldXCIgK1xuICBcInxbMC0xXVswLTldezJ9fFsxLTldWzAtOV18WzEtOV18MClcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1cIiArXG4gIFwiWzAtOV17Mn18WzEtOV1bMC05XXxbMS05XXwwKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9XCIgK1xuICBcInxbMS05XVswLTldfFswLTldKSkpXCIgK1xuICBcIig/OlxcXFw6XFxcXGR7MSw1fSk/KVwiICsgLy8gcGx1cyBvcHRpb24gcG9ydCBudW1iZXIgK1xuICBcIihcXFxcLyg/Oig/OlthLXpBLVowLTlcXFxcO1xcXFwvXFxcXD9cXFxcOlxcXFxAXFxcXCZcXFxcPVxcXFwjXFxcXH5cIiArIC8vIHBsdXMgb3B0aW9uIHF1ZXJ5IHBhcmFtc1xuICBcIlxcXFwtXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcXFxcLFxcXFxfXSl8KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpKik/XCIgK1xuICBcIig/OlxcXFxifCQpXCI7IC8vIGFuZCBmaW5hbGx5LCBhIHdvcmQgYm91bmRhcnkgb3IgZW5kIG9mXG4vLyBpbnB1dC4gIFRoaXMgaXMgdG8gc3RvcCBmb28uc3VyZSBmcm9tXG4vLyBtYXRjaGluZyBhcyBmb28uc3VcblxuXG5jb25zdCBlbWFpbEFkZHJlc3NQYXR0ZXJuID0gXCJbYS16QS1aMC05XFxcXCtcXFxcLlxcXFxfXFxcXCVcXFxcLV17MSwyNTZ9XCIgK1xuICBcIlxcXFxAXCIgK1xuICBcIlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDY0fVwiICtcbiAgXCIoXCIgK1xuICBcIlxcXFwuXCIgK1xuICBcIlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDI1fVwiICtcbiAgXCIpK1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGVzc2VudGlhbFNldCxcbiAgbm9uTGF0aW5Mb3dlcmNhc2UsXG4gIG5vbkxhdGluVXBwZXJjYXNlLFxuICBub25MYXRpbkNoYXJzLFxuICBsb3dlcmNhc2VDaGFycyxcbiAgdXBwZXJjYXNlQ2hhcnMsXG4gIGFsbENoYXJzLFxuICBzaW5nbGVRdW90ZUFkZXB0cyxcbiAgZG91YmxlUXVvdGVBZGVwdHMsXG4gIHNwYWNlLFxuICBuYnNwLFxuICBoYWlyU3BhY2UsXG4gIG5hcnJvd05ic3AsXG4gIHNwYWNlcyxcbiAgdGVybWluYWxQdW5jdHVhdGlvbixcbiAgc2VudGVuY2VQdW5jdHVhdGlvbixcbiAgb3BlbmluZ0JyYWNrZXRzLFxuICBjbG9zaW5nQnJhY2tldHMsXG4gIGVsbGlwc2lzLFxuICBkZWdyZWUsXG4gIHdlYlVybFBhdHRlcm4sXG4gIGVtYWlsQWRkcmVzc1BhdHRlcm4sXG59XG4iLCIvKlxyXG5cdFJlbW92ZXMgZW1wdHkgbGluZXNcclxuXHJcblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cclxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggcmVtb3ZlZCBlbXB0eSBsaW5lc1xyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRW1wdHlMaW5lcyhzdHJpbmcpIHtcclxuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcclxufVxyXG4iLCIvKiFcbiAqIFR5cG9wbyAxLjQuMFxuICpcbiAqIENvcHlyaWdodCAyMDE1LTE3IEJyYcWIbyDFoGFuZGFsYVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKlxuICogRGF0ZTogMjAxNy0wMS0xNVxuICovXG5cbmltcG9ydCB7cmVtb3ZlRW1wdHlMaW5lc30gZnJvbSBcIi4vbGliL2VtcHR5LWxpbmVzXCI7XG5pbXBvcnQgY29uc3RhbnRzIGZyb20gJy4vbGliL2NvbnN0YW50cyc7XG5cblxudmFyIGV4Y2VwdGlvbnMgPSBbXTtcblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEVzZW50aWFsIHJlcGxhY2VtZW50c1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIHJlcGxhY2Vfc3ltYm9scyhzdHJpbmcpIHtcblx0Zm9yICh2YXIgcnVsZSBpbiBjb25zdGFudHMuZXNzZW50aWFsU2V0KSB7XG5cdFx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHJ1bGUsIFwiZ1wiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBjb25zdGFudHMuZXNzZW50aWFsU2V0W3J1bGVdKTtcblx0fVxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKSB7XG5cdC8qIFsxXSByZXBsYWNlIDMgYW5kIG1vcmUgZG90cyB3aXRoIGFuIGVsbGlwc2lzICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC57Myx9L2csIFwi4oCmXCIpO1xuXG5cdC8qIFsyXSByZXBsYWNlIDIgZG90cyBpbiB0aGUgbWlkZGxlIG9mIHRoZSBzZW50ZWNuZSB3aXRoIGFuIGFwb3Npb3Blc2lzICovXG5cdHZhciBwYXR0ZXJuID0gXCJbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdXFxcXC57Mn1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIg4oCmIFwiKTtcblxuXHQvKiBbM10gcmVwbGFjZSAyIGRvdHMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVjbmUgd2l0aCBmdWxsIHN0b3AgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL1xcLnsyfS9nLCBcIi5cIik7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvIHsyLH0vZywgXCIgXCIpO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdFF1b3RlcywgcHJpbWVzICYgYXBvc3Ryb3BoZXNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgdXNlIG9mIGRvdWJsZSBxdW90ZXMgYW5kIGRvdWJsZSBwcmltZXNcblxuXHRBc3N1bXB0aW9ucyBhbmQgTGltaXRhdGlvbnNcblx0VGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgZG91YmxlIHF1b3RlcyBhcmUgYWx3YXlzIHVzZWQgaW4gcGFpcixcblx0aS5lLiBhdXRob3JzIGRpZCBub3QgZm9yZ2V0IHRvIGNsb3NlIGRvdWJsZSBxdW90ZXMgaW4gdGhlaXIgdGV4dC5cblxuXHRBbGdvcml0aG1cblx0WzBdIFJlbW92ZSBleHRyYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbiBhcm91bmQgZG91YmxlIHF1b3Rlc1xuXHRbMV0gU3dhcCByaWdodCBkb3VibGUgcXVvdGUgYWRlcHRzIHdpdGggYSBwdW5jdHVhdGlvblxuXHQgICAgKHRoaXMgY29tZXMgZmlyc3QgYXMgaXQgaXMgYSBxdWl0ZSBjb21tb24gbWlzdGFrZSB0aGF0IG1heSBldmVudHVhbGx5XG5cdFx0ICBsZWFkIHRvIGltcHJvcGVyIGlkZW50aWZpY2F0aW9uIG9mIGRvdWJsZSBwcmltZXMpXG5cdFsyXSBJZGVudGlmeSBpbmNoZXMsIGFyY3NlY29uZHMsIHNlY29uZHNcblx0WzNdIElkZW50aWZ5IGNsb3NlZCBkb3VibGUgcXVvdGVzXG5cdFs0XSBJZGVudGlmeSB0aGUgcmVzdCBhcyB1bmNsb3NlZCBkb3VibGUgcXVvdGVzIChiZXN0LWVmZm9ydCByZXBsYWNlbWVudClcblx0WzVdIEZpeCBzcGFjaW5nIGFyb3VuZCBxdW90ZXMgYW5kIHByaW1lc1xuXHRbNl0gU3dhcCBiYWNrIHNvbWUgb2YgdGhlIGRvdWJsZSBxdW90ZXMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cdFs3XSBSZW1vdmUgZXh0cmEgcHVuY3R1YXRpb24gYXJvdW5kIHF1b3Rlc1xuXHRbOF0gUmVwbGFjZSBhbGwgaWRlbnRpZmllZCBwdW5jdHVhdGlvbiB3aXRoIGFwcHJvcHJpYXRlIHB1bmN0dWF0aW9uIGluXG5cdCAgICBnaXZlbiBsYW5ndWFnZVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSDigJQgbGFuZ3VhZ2Ugb3B0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IG91dHB1dCB3aXRoIHByb3Blcmx5IHJlcGxhY2VzIGRvdWJsZSBxb3V0ZXMgYW5kIGRvdWJsZSBwcmltZXNcbiovXG5mdW5jdGlvbiBjb3JyZWN0X2RvdWJsZV9xdW90ZXNfYW5kX3ByaW1lcyhzdHJpbmcsIGxhbmd1YWdlKSB7XG5cblx0LyogWzBdIFJlbW92ZSBleHRyYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbiBhcm91bmQgZG91YmxlIHF1b3Rlc1xuXHRcdFx0XHRcdCBlLmcuIOKAnFdlIHdpbGwgY29udGludWUgdG9tb3Jyb3cu4oCdLiAqL1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdKShcIisgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMlwiKTtcblxuXHQvKiBbMV0gU3dhcCByaWdodCBkb3VibGUgcXVvdGUgYWRlcHRzIHdpdGggYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbiAqL1xuXHRwYXR0ZXJuID0gXCIoXCIrIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyBjb25zdGFudHMudGVybWluYWxQdW5jdHVhdGlvbiArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsICckMiQxJyk7XG5cblx0LyogWzJdIElkZW50aWZ5IGluY2hlcywgYXJjc2Vjb25kcywgc2Vjb25kc1xuXHRcdFx0XHQgTm90ZTogd2XigJlyZSBub3QgdXNpbmcgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzIHZhcmlhYmxlXG5cdFx0XHRcdCBhcyBjb21tYXMgYW5kIGxvdy1wb3NpdGlvbmVkIHF1b3RlcyBhcmUgb21taXRlZCovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxkID8pKOKAnHzigJ18XFxcInzigLN84oCYezIsfXzigJl7Mix9fCd7Mix9fOKAsnsyLH0pL2csIFwiJDF7e3R5cG9wb19fZG91YmxlLXByaW1lfX1cIik7XG5cblxuXHQvKiBbM10gSWRlbnRpZnkgY2xvc2VkIGRvdWJsZSBxdW90ZXMgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKC4qPykoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0kMnt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fVwiKTtcblxuXG5cdC8qIFs0LjFdIElkZW50aWZ5IHVuY2xvc2VkIGxlZnQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJcIik7XG5cblxuXHQvKiBbNC4yXSBJZGVudGlmeSB1bmNsb3NlZCByaWdodCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgY29uc3RhbnRzLmVsbGlwc2lzICsgXCJdKShcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fVwiKTtcblxuXG5cdC8qIFs0LjNdIFJlbW92ZSByZW1haW5pbmcgdW5pZGVudGlmaWVkIGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs1XSBGaXggc3BhY2luZyBhcm91bmQgcXVvdGVzIGFuZCBwcmltZSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KSggKS9nLCBcIiQxXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKCApKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCIkMlwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyggKSh7e3R5cG9wb19fZG91YmxlLXByaW1lfX0pL2csIFwiJDJcIik7XG5cblxuXHQvKiBbNl0gU3dhcCBiYWNrIHNvbWUgb2YgdGhlIGRvdWJsZSBxdW90ZXMgd2l0aCBhIHB1bmN0dWF0aW9uXG5cblx0XHQgSWRlYVxuXHRcdCBJbiBbMV0gd2UgaGF2ZSBzd2FwcGVkIGFsbCBkb3VibGUgcmlnaHQgcXVvdGVzIGJ5IGRlZmF1bHQgd2l0aCBhIHRlcm1pbmFsXG5cdFx0IHB1bmN0dWF0aW9uLiBIb3dldmVyLCBub3QgYWxsIGRvdWJsZSBxdW90ZXMgd3JhcCB0aGUgd2hvbGUgc2VudGVuY2UgYW5kXG5cdFx0IHRoZXJlIGFyZSBjYXNlcyB3aGVuIGZldyB3b3JkcyBhcmUgcXVvdGVkIHdpdGhpbiBhIHNlbnRlbmNlLiBUYWtlIGEgbG9vayBhdFxuXHRcdCBleGFtcGxlczpcblx0XHQg4oCcU2VudGVuY2UgcW91dGVkIGFzIGEgd2hvbGUu4oCdIChmdWxsIHN0b3AgaXMgcGxhY2VkIHdpdGhpbiBkb3VibGUgcXVvdGVzKVxuXHRcdCBUaGlzIGlzIOKAnHF1b3RlZCBleHByZXNzaW9uLuKAnSAoZnVsbCBzdG9wIGlzIHBsYWNlZCBvdXRzaWRlIGRvdWJsZSBxdW90ZXMpXG5cblx0XHQgQWxnb3JpdGhtXG5cdFx0IE1hdGNoIGFsbCB0aGUgZG91YmxlIHF1b3RlIHBhaXJzIHRoYXQgZG8gbm90IHByZWNlZGUgc2VudGVuY2UgcHVuY3R1YXRpb25cblx0XHQgKGFuZCB0aHVzIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBzZW50ZW5jZSkgYW5kIHN3YXAgcmlnaHQgZG91YmxlIHdpdGhcblx0XHQgYSB0ZXJtaW5hbCBwdW5jdHVhdGlvbi5cblx0XHQgKi9cblx0cGF0dGVybiA9IFwiKFteXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl17e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fS4rPykoW1wiICsgY29uc3RhbnRzLnRlcm1pbmFsUHVuY3R1YXRpb24gKyBcIl0pKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSlcIjtcblx0Ly8gY29uc29sZS5sb2cocGF0dGVybik7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDMkMlwiKTtcblxuXG5cdC8qIFs3XSBSZW1vdmUgZXh0cmEgY29tbWEgYWZ0ZXIgcHVuY3R1YXRpb24gaW4gZGlyZWN0IHNwZWVjaCxcblx0XHRcdFx0XHQgZS5nLiBcIuKAnEhleSEs4oCdIHNoZSBzYWlkXCIgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdKShbXFwsXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDFcIik7XG5cblxuXHQvKiBbOF0gUHVuY3R1YXRpb24gcmVwbGFjZW1lbnQgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fZG91YmxlLXByaW1lfX0pL2csIFwi4oCzXCIpO1xuXG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0XHRjYXNlIFwicnVlXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIsKrXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiwrtcIik7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwic2tcIjpcblx0XHRjYXNlIFwiY3NcIjpcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCeXCIpO1xuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwi4oCcXCIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImVuXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnFwiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnVwiKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHVzZSBvZiBzaW5nbGUgcXVvdGVzLCBzaW5nbGUgcHJpbWVzIGFuZCBhcG9zdHJvcGhlc1xuXG5cdEFzc3VtcHRpb25zIGFuZCBMaW1pdGF0aW9uc1xuXHRUaGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBkb3VibGUgcXVvdGVzIGFyZSBhbHdheXMgdXNlZCBpbiBwYWlyLFxuXHRpLmUuIGF1dGhvcnMgZGlkIG5vdCBmb3JnZXQgdG8gY2xvc2UgZG91YmxlIHF1b3RlcyBpbiB0aGVpciB0ZXh0LlxuXHRGdXJ0aGVyLCBzaW5nbGUgcXVvdGVzIGFyZSB1c2VkIGFzIHNlY29uZGFyeSBhbmQgdGhleSdyZSBwcm9wZXJseSBzcGFjZWQsXG5cdGUuZy4g4pCjJ3dvcmQgb3Igc2VudGVuY2UgcG9ydGlvbifikKMgKGFuZCBub3QgbGlrZSDikKMn4pCjd29yZOKQoyfikKMpXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBjb21tb24gYXBvc3Ryb2hlIGNvbnRyYWN0aW9uc1xuXHRbMl0gSWRlbnRpZnkgc2luZ2xlIHF1b3Rlc1xuXHRbM10gSWRlbnRpZnkgZmVldCwgYXJjbWludXRlcywgbWludXRlc1xuXHRbNF0gSWRlbnRpZnkgcmVzaWR1YWwgYXBvc3Ryb3BoZXMgdGhhdCBoYXZlIGxlZnRcblx0Wz9dIFN3YXAgcmlnaHQgc2luZ2xlIHF1b3RlIGFkZXB0cyB3aXRoIGEgcHVudHVhdGlvblxuXHRcdFx0KFdlIHdlcmUgc3dhcHBpbmcgc2luZ2xlIHF1b3RlcyBhcyBwYXJ0IG9mIGFsZ29yaXRobSBhIHdoaWxlIGEgYmFjayxcblx0XHRcdGJ1dCBzaW5jZSBpdCBpcyBtb3JlIHByb2JhYmxlIHRoYXQgc2luZ2xlIHF1b3RlcyBhcmUgaW4gdGhlIG1pZGRsZSBvZiB0aGVcblx0XHRcdHNlbnRlbmNlLCB3ZSBoYXZhZSBkcm9wcGVkIHN3YXBwaW5nIGFzIGEgcGFydCBvZiB0aGUgYWxnb3JpdGhtKVxuXHRbNl0gUmVwbGFjZSBhbGwgaWRlbnRpZmllZCBwdW5jdHVhdGlvbiB3aXRoIGFwcHJvcHJpYXRlIHB1bmN0dWF0aW9uIGluXG5cdCAgICBnaXZlbiBsYW5ndWFnZVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSDigJQgbGFuZ3VhZ2Ugb3B0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIGNvcnJlY3Rfc2luZ2xlX3F1b3Rlc19wcmltZXNfYW5kX2Fwb3N0cm9waGVzKHN0cmluZywgbGFuZ3VhZ2UpIHtcblxuXHQvKiBbMS4xXSBJZGVudGlmeSDigJlu4oCZIGNvbnRyYWN0aW9ucyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKG4pKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQye3t0eXBvcG9fX2Fwb3N0cm9waGV9fVwiKTtcblxuXG5cdC8qIFsxLjJdIElkZW50aWZ5IGNvbW1vbiBjb250cmFjdGlvbnMgYXQgdGhlIGJlZ2lubmluZyBvciBhdCB0aGUgZW5kXG5cdFx0XHRcdFx0IG9mIHRoZSB3b3JkLCBlLmcuIEZpc2gg4oCZbuKAmSBDaGlwcywg4oCZZW0sIOKAmWNhdXNlLOKApiAqL1xuXHR2YXIgY29udHJhY3Rpb25fZXhhbXBsZXMgPSBcImVtfGNhdXNlfHR3YXN8dGlzfHRpbHxyb3VuZFwiXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShcIiArIGNvbnRyYWN0aW9uX2V4YW1wbGVzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19JDJcIik7XG5cblxuXHQvKiBbMS4zXSBJZGVudGlmeSBpbi13b3JkIGNvbnRyYWN0aW9ucyxcblx0XHRcdFx0XHQgZS5nLiBEb27igJl0LCBJ4oCZbSwgT+KAmURvb2xlLCA2OeKAmWVycyAqL1xuXHR2YXIgY2hhcmFjdGVyX2FkZXB0cyA9IFwiMC05XCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnM7XG5cdHBhdHRlcm4gPSBcIihbXCIrIGNoYXJhY3Rlcl9hZGVwdHMgK1wiXSkoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoW1wiKyBjaGFyYWN0ZXJfYWRlcHRzICtcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxe3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQzXCIpO1xuXG5cblx0LyogWzEuNF0gSWRlbnRpZnkgeWVhciBjb250cmFjdGlvbnNcblx0XHQgZS5nLiDigJk3MHMsIElOQ0hFQkEg4oCZODks4oCmICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShbMC05XXsyfSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQyXCIpO1xuXG5cblx0LyogWzJdIElkZW50aWZ5IHNpbmdsZSBxdW90ZXMgd2l0aGluIGRvdWJsZSBxdW90ZXMgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKC4qPykoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKCQwLCAkMSwgJDIsICQzKXtcblxuXHRcdC8vaWRlbnRpZnkge3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19XG5cdFx0dmFyIHBhdHRlcm4gPSBcIiggKShcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdKVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSQzXCIpO1xuXG5cdFx0Ly9pZGVudGlmeSB7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19XG5cdFx0cGF0dGVybiA9IFwiKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl0pKFtcXC4sIT9dKT8oXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoWyBdfFtcXC4sIT9dKVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0JDIgPSAkMi5yZXBsYWNlKHJlLCBcIiQxJDJ7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19JDRcIik7XG5cblx0XHQvL2lkZW50aWZ5IHNpbmdsZSBxdW90ZSBwYWlyc1xuXHRcdHBhdHRlcm4gPSBcIih7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0pKC4qPykoe3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fSQye3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19XCIpO1xuXG5cdFx0cmV0dXJuICQxICsgJDIgKyAkMztcblx0fSk7XG5cblxuXHQvKiBbM10gSWRlbnRpZnkgZmVldCwgYXJjbWludXRlcywgbWludXRlc1xuXHRcdFx0XHQgTm90ZTogd2XigJlyZSBub3QgdXNpbmcgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzIHZhcmlhYmxlXG5cdFx0XHRcdCBhcyBjb21tYXMgYW5kIGxvdy1wb3NpdGlvbmVkIHF1b3RlcyBhcmUgb21taXRlZCovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oXFxkKSggPykoJ3zigJh84oCZfOKAm3zigLIpL2csIFwiJDF7e3R5cG9wb19fc2luZ2xlLXByaW1lfX1cIik7XG5cblxuXHQvKiBbNF0gSWRlbnRpZnkgcmVzaWR1YWwgYXBvc3Ryb3BoZXMgdGhhdCBoYXZlIGxlZnQgKi9cblx0cGF0dGVybiA9IFwiKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX1cIik7XG5cblxuXG5cdC8qIFs1XSBQdW5jdHVhdGlvbiByZXBsYWNlbWVudCAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19zaW5nbGUtcHJpbWV9fSkvZywgXCLigLJcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fYXBvc3Ryb3BoZX19fHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fXx7e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlLS1hZGVwdH19L2csIFwi4oCZXCIpO1xuXG5cblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRjYXNlIFwicnVlXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oC5XCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigLpcIik7XG5cdFx0YnJlYWs7XG5cdGNhc2UgXCJza1wiOlxuXHRjYXNlIFwiY3NcIjpcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJpcIik7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmFwiKTtcblx0XHRicmVhaztcblx0Y2FzZSBcImVuXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCYXCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJlcIik7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuZnVuY3Rpb24gY29ycmVjdF9tdWx0aXBsZV9zaWduKHN0cmluZykge1xuXHRyZXR1cm4gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcucmVwbGFjZSgvKFsxLTldK1sgXXswLDF9W2Etd3pdKikoWyBdezAsMX1beHzDl11bIF17MCwxfSkoWzEtOV0rWyBdezAsMX1bYS13el0qKS9nLCBcIiQxIMOXICQzXCIpKTtcbn1cblxuXG5cbi8qXG5cdFJlcGxhY2VzIGh5cGhlbiB3aXRoIGVtIG9yIGVuIGRhc2hcblxuXHRBbGdvcml0aG1cblx0WzFdIFJlcGxhY2UgMyBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLS0pIHdpdGggYW4gZW0gZGFzaCAo4oCUKVxuXHRbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlClcblx0WzNdIFJlcGxhY2UgYW55IGh5cGhlbiBvciBkYXNoIHN1cnJvdW5kZWQgd2l0aCBzcGFjZXMgd2l0aCBhbiBlbSBkYXNoXG5cdFs0XSBSZXBsYWNlIGh5cGhlbiBvciBkYXNoIHVzZWQgaW4gbnVtYmVyIHJhbmdlIHdpdGggYW4gZW4gZGFzaFxuXHRcdFx0YW5kIHNldCBwcm9wZXIgc3BhY2luZ1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBkYXNoZXMgaW5zdGVhZCBvZiBoeXBoZW5zXG4qL1xuZnVuY3Rpb24gcmVwbGFjZV9oeXBoZW5fd2l0aF9kYXNoKHN0cmluZywgbGFuZ3VhZ2UpIHtcblx0dmFyIGRhc2hlcyA9IFwiLeKAk+KAlFwiOyAvLyBpbmNsdWRpbmcgYSBoeXBoZW5cblxuXHQvKiBbMV0gUmVwbGFjZSAzIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tLSkgd2l0aCBhbiBlbSBkYXNoICjigJQpICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oLS0tKS9nLCBcIuKAlFwiKTtcblxuXG5cdC8qIFsyXSBSZXBsYWNlIDIgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0pIHdpdGggYW4gZW4gZGFzaCAo4oCUKSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKC0tKS9nLCBcIuKAk1wiKTtcblxuXG5cdC8qIFszXSBSZXBsYWNlIGFueSBoeXBoZW4gb3IgZGFzaCBzdXJyb3VuZGVkIHdpdGggc3BhY2VzIHdpdGggYW4gZW0gZGFzaCAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVtcIiArIGRhc2hlcyArIFwiXVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1cIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciByZXBsYWNlbWVudCA9IGNvbnN0YW50cy5uYXJyb3dOYnNwICsgXCLigJRcIiArIGNvbnN0YW50cy5oYWlyU3BhY2U7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblx0LyogWzQuMV0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCwgcGxhY2VkIGJldHdlZW4gMiBjYXJkaW5hbCBudW1iZXJzLFxuXHRcdFx0XHRcdCB3aXRoIGFuIGVuIGRhc2g7IGluY2x1ZGluZyBjYXNlcyB3aGVuIHRoZXJlIGlzIGFuIGV4dHJhIHNwYWNlXG5cdFx0XHRcdFx0IGZyb20gZWl0aGVyIG9uZSBzaWRlIG9yIGJvdGggc2lkZXMgb2YgdGhlIGRhc2ggKi9cblx0dmFyIGNhcmRpbmFsX251bWJlciA9IFwiXFxcXGQrXCI7XG5cdHBhdHRlcm4gPSBcIihcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdP1tcIiArIGRhc2hlcyArIFwiXVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/KShcIiArIGNhcmRpbmFsX251bWJlciArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMeKAkyQzXCIpO1xuXG5cblx0LyogWzQuMl0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCwgcGxhY2VkIGJldHdlZW4gMiBvcmRpbmFsIG51bWJlcnMsXG5cdFx0XHRcdFx0IHdpdGggYW4gZW4gZGFzaDsgaW5jbHVkaW5nIGNhc2VzIHdoZW4gdGhlcmUgaXMgYW4gZXh0cmEgc3BhY2Vcblx0XHRcdFx0XHQgZnJvbSBlaXRoZXIgb25lIHNpZGUgb3IgYm90aCBzaWRlcyBvZiB0aGUgZGFzaCAqL1xuXHR2YXIgb3JkaW5hbF9pbmRpY2F0b3IgPSBcIlwiO1xuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdFx0Y2FzZSBcInJ1ZVwiOlxuXHRcdGNhc2UgXCJza1wiOlxuXHRcdGNhc2UgXCJjc1wiOlxuXHRcdFx0b3JkaW5hbF9pbmRpY2F0b3IgPSBcIlxcXFwuXCI7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiZW5cIjpcblx0XHRcdG9yZGluYWxfaW5kaWNhdG9yID0gXCJzdHxuZHxyZHx0aFwiO1xuXHRcdFx0YnJlYWs7XG5cdH1cblx0cGF0dGVybiA9IFwiKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFwiICsgb3JkaW5hbF9pbmRpY2F0b3IgKyBcIikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT9bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdPykoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoXCIgKyBvcmRpbmFsX2luZGljYXRvciArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkMuKAkyQ0JDVcIik7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VfZGFzaF93aXRoX2h5cGhlbihzdHJpbmcpe1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICtcIl0pKFvigJPigJRdKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxLSQzXCIpO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdENvbnNvbGlkYXRpb24gb2Ygc3BhY2VzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBjb25zdGFudHMuY2xvc2luZ0JyYWNrZXRzICsgY29uc3RhbnRzLmRlZ3JlZSArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMlwiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMub3BlbmluZ0JyYWNrZXRzICsgXCJdKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gcmVtb3ZlX3RyYWlsaW5nX3NwYWNlcyhzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy50cmltKCk7XG59XG5cblxuXG5mdW5jdGlvbiBhZGRfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKShbXCIgKyBjb25zdGFudHMub3BlbmluZ0JyYWNrZXRzICsgXCJdKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSAkMiQzXCIpO1xufVxuXG5cblxuZnVuY3Rpb24gYWRkX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKShbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIGNvbnN0YW50cy5jbG9zaW5nQnJhY2tldHMgKyBcIl0pKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDIgJDNcIik7XG59XG5cblxuXG4vKlxuXHRSZW1vdmVzIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5uaW5nIG9mIGVhY2ggcGFyYWdyYXBoXG5cblx0VGhpcyBjb3VsZCBiZSBkb25lIHdpdGggYSBvbmUtbGluZXI6XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZSgvXlxccysvZ20sIFwiXCIpO1xuXG5cdEhvd2V2ZXIsIGl0IGFsc28gcmVtb3ZlcyBlbXB0eSBsaW5lcy4gU2luY2UsIHdlIHdhbnQgdG8gaGFuZGxlIHRoaXMgY2hhbmdlXG5cdHNlcGFyYXRlbHksIHdlIG5lZWQgdG9cblx0WzFdIHNwbGl0IHRoZSBsaW5lcyBtYW51YWxseVxuXHRbMl0gYW5kIHJlbW92ZSBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2luaW5nIG9mIGVhY2ggbGluZVxuXHRbM10gam9pbiBsaW5lcyB0b2dldGhlciB0byBhIHNpbmdsZSBzdHJpbmdcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggcmVtb3ZlZCBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBwYXJhZ3JhcGhzXG4qL1xuZnVuY3Rpb24gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZykge1xuXHQvKiBbMV0gc3BsaXQgdGhlIGxpbmVzIG1hbnVhbGx5ICovXG5cdHZhciBsaW5lcyA9IHN0cmluZy5zcGxpdCgvXFxyP1xcbi8pO1xuXG5cdC8qIFsyXSBhbmQgcmVtb3ZlIGV4dHJhIHNwYWNlcyBhdCB0aGUgYmVnaW5pbmcgb2YgZWFjaCBsaW5lICovXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcblx0XHRsaW5lc1tpXSA9IGxpbmVzW2ldLnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG5cdH1cblxuXHQvKiBbM10gam9pbiBsaW5lcyB0b2dldGhlciB0byBhIHNpbmdsZSBzdHJpbmcgKi9cblx0cmV0dXJuIGxpbmVzLmpvaW4oXCJcXG5cIik7XG59XG5cblxuXG4vKlxuXHRDb25zb2xpZGF0ZXMgdGhlIHVzZSBvZiBub24tYnJlYWtpbmcgc3BhY2VzXG5cblx0KiByZW1vdmVzIGNoYXJhY3RlcnMgYmV0d2VlbiBtdWx0aS1jaGFyYWN0ZXIgd29yZHNcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgY2FyZGluYWwgbnVtYmVyc1xuXHQqIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhcm91bmQgw5dcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgc2luZ2xlLWNoYXJhY3RlciBwcmVwb3NpdGlvbnNcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGx5IHBsYWNlZCBub24tYnJlYWtpbmcgc3BhY2VcbiovXG5mdW5jdGlvbiBjb25zb2xpZGF0ZV9uYnNwKHN0cmluZykge1xuXG5cdC8vIHJlbW92ZXMgbm9uLWJyZWFraW5nIHNwYWNlcyBiZXR3ZWVuIG11bHRpLWNoYXJhY3RlciB3b3Jkc1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl17Mix9KShbXCIrIGNvbnN0YW50cy5uYnNwICsgY29uc3RhbnRzLm5hcnJvd05ic3AgK1wiXSkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXXsyLH0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDNcIik7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSAkM1wiKTsgLy9jYWxsaW5nIGl0IHR3aWNlIHRvIGNhdGNoIG9kZC9ldmVuIG9jY3VyZW5jZXNcblxuXG5cdC8vIGFkZHMgbm9uLWJyZWFraW5nIHNwYWNlcyBhZnRlciBjYXJkaW5hbCBudW1iZXJzXG5cdHBhdHRlcm4gPSBcIihbMC05XSspKCApKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl0rKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgcmVwbGFjZW1lbnQgPSBcIiQxXCIgKyBjb25zdGFudHMubmJzcCArIFwiJDNcIjtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYXJvdW5kIMOXXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShbw5ddKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXBsYWNlbWVudCA9IGNvbnN0YW50cy5uYnNwICsgXCIkMlwiICsgY29uc3RhbnRzLm5ic3A7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgc2luZ2xlLWNoYXJhY3RlciBwcmVwb3NpdGlvbnNcblx0cGF0dGVybiA9IFwiKFvCoCBdKShbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl18JikoIClcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmVwbGFjZW1lbnQgPSBcIiQxJDJcIiArIGNvbnN0YW50cy5uYnNwO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpOyAvL2NhbGxpbmcgaXQgdHdpY2UgdG8gY2F0Y2ggb2RkL2V2ZW4gb2NjdXJlbmNlc1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciBzcGFjaW5nIGFyb3VuZCBlbGxpcHNpcyBhbmQgYXBvc2lvcGVzaXNcblxuXHRFbGxpcHNpcyAoYXMgYSBjaGFyYWN0ZXIpIGlzIHVzZWQgZm9yIDIgZGlmZmVyZW50IHB1cnBvc2VzOlxuXHQxLiBhcyBhbiBlbGxpcHNpcyB0byBvbW1pdCBhIHBpZWNlIG9mIGluZm9ybWF0aW9uIGRlbGliZXJhdGVseVxuXHQyLiBhcyBhbiBhcG9zaW9wZXNpczsgYSBmaWd1cmUgb2Ygc3BlZWNoIHdoZXJlaW4gYSBzZW50ZW5jZSBpc1xuXHRkZWxpYmVyYXRlbHkgYnJva2VuIG9mZiBhbmQgbGVmdCB1bmZpbmlzaGVkXG5cblx0c291cmNlc1xuXHRodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9FbGxpcHNpc1xuXHRodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BcG9zaW9wZXNpc1xuXHRodHRwOi8vd3d3LmxpdGVlcmEuY3ovc2xvdm5pay92eXB1c3RrYVxuXG5cdEFsZ29yaXRobVxuXHRFbGxpcHNpcyAmIEFwb3Npb3Blc2lzIHJlcXVpcmUgZGlmZmVyZW50IHVzZSBvZiBzcGFjaW5nIGFyb3VuZCB0aGVtLFxuXHR0aGF0IGlzIHdoeSB3ZSBhcmUgY29ycmVjdGluZyBvbmx5IGZvbGxvd2luZyBjYXNlczpcblx0ZXJyb3JzOlxuXHRbMV0gY29ycmVjdCBzcGFjaW5nLCB3aGVuIGVsbGlwc2lzIHVzZWQgdXNlZCBhcm91bmQgY29tbWFzXG5cdFsyXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlIGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaFxuXHRbM10gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzRdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2UgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFyYWdyYXBoXG5cdFs1XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmFncmFwaFxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0ZWQgc3BhY2luZyBhcm91bmQgYXBvc2lvcGVzaXNcbiovXG5mdW5jdGlvbiBjb3JyZWN0X3NwYWNlc19hcm91bmRfZWxsaXBzaXMoc3RyaW5nKSB7XG5cblx0LyogWzFdIGNvcnJlY3Qgc3BhY2luZywgd2hlbiBlbGxpcHNpcyB1c2VkIHVzZWQgYXJvdW5kIGNvbW1hcyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiLFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/XCIgKyBjb25zdGFudHMuZWxsaXBzaXMgKyBcIltcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/LFwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiLCDigKYsXCIpO1xuXG5cblx0LyogWzJdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgXCJdKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShcIiArIGNvbnN0YW50cy5lbGxpcHNpcyArIFwiW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVtcIiArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFszXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVwiICsgY29uc3RhbnRzLmVsbGlwc2lzICtcIikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICtcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNF0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihe4oCmKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdtXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzVdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGVuZCBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGF0IHRoZSBlbmQgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl0pKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFwiICsgY29uc3RhbnRzLmVsbGlwc2lzICsgXCIpKD8hWyBcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBhY2NpZGVudGFsIHVwcGVyY2FzZVxuXG5cdEJlc3QtZWZmb3J0IGZ1bmN0aW9uIHRvIGZpeCBtb3N0IGNvbW1vbiBhY2NpZGVudGFsIHVwcGVyY2FzZSBlcnJvcnMsIG5hbWVseTpcblx0WzFdIDIgZmlyc3QgdXBwZXJjYXNlIGxldHRlcnMgKGllLiBVUHBlcmNhc2UpXG5cdFsyXSBTd2FwcGVkIGNhc2VzIChpZS4gdVBQRVJDQVNFKVxuXG5cdEFsZ29yaXRobSBkb2VzIG5vdCBmaXggb3RoZXIgdXBwZXJjYXNlIGV2ZW50dWFsaXRpZXMsXG5cdGUuZy4gbWl4ZWQgY2FzZSAoVXBwRVJjYVNlKSBhcyB0aGVyZSBhcmUgbWFueSBjYXNlcyBmb3IgY29ycG9yYXRlIGJyYW5kc1xuXHR0aGF0IGNvdWxkIHBvdGVudGlhbGx5IG1hdGNoIHRoZSBhbGdvcml0aG0gYXMgZmFsc2UgcG9zaXRpdmUuXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RlZCBhY2NpZGVudGFsIHVwcGVyY2FzZVxuKi9cbmZ1bmN0aW9uIGNvcnJlY3RfYWNjaWRlbnRhbF91cHBlcmNhc2Uoc3RyaW5nKSB7XG5cblx0LyogWzFdIHR3byBmaXJzdCB1cHBlcmNhc2UgbGV0dGVycyAoaS5lLiBVUHBlcmNhc2UpICovXG5cdHZhciBwYXR0ZXJuID0gXCJbXCIrIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdezIsMn1bXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdK1wiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKHN0cmluZyl7XG5cdFx0cmV0dXJuIChzdHJpbmcuc3Vic3RyaW5nKDAsMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuXHR9KTtcblxuXHQvKiBbMi4xXSBTd2FwcGVkIGNhc2VzICgyLWxldHRlciBjYXNlcywgaS5lLiBpVClcblx0XHRcdE5vdGUgdGhhdCB0aGlzIGlzIGRpdmlkZWQgaW50byAyIHNlcGFyYXRlIGNhc2VzIGFzIFxcYiBpbiBKYXZhU2NyaXB0IHJlZ2V4XG5cdFx0XHRkb2VzIG5vdCB0YWtlIG5vbi1sYXRpbiBjaGFyYWN0ZXJzIGludG8gYSBjb3NuaWRlcmF0aW9uXG5cdCovXG5cdHBhdHRlcm4gPSBcIltcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICtcIl1bXCIrIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdXFxcXGJcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKHN0cmluZyl7XG5cdFx0cmV0dXJuIChzdHJpbmcuc3Vic3RyaW5nKDAsMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuXHR9KTtcblxuXHQvKiBbMi4yXSBTd2FwcGVkIGNhc2VzIChuLWxldHRlciBjYXNlcywgaS5lLiB1UFBFUkNBU0UpICovXG5cdHBhdHRlcm4gPSBcIltcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICtcIl0rW1wiKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXXsyLH1cIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIGZ1bmN0aW9uKHN0cmluZyl7XG5cdFx0cmV0dXJuIChzdHJpbmcuc3Vic3RyaW5nKDAsMSkgKyBzdHJpbmcuc3Vic3RyaW5nKDEpLnRvTG93ZXJDYXNlKCkpO1xuXHR9KTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEFiYnJldmlhdGlvbnNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuLypcblx0SWRlbnRpZmllcyBkaWZmZXJlbnRseS1zcGVsbGVkIGFiYnJldmlhdGlvbnMgYW5kIHJlcGxhY2VzIGl0IHdpdGhcblx0YSB0ZW1wIHZhcmlhYmxlLCB7e3R5cG9wb19fW2FiYnJdfX1cblxuXHRJZGVudGlmaWVzIGdpdmVuIGFiYnJldmlhdGlvbnM6XG5cdGEubS4sIHAubS4sIGUuZy4sIGkuZS5cblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGUuZy4sIGkuZS5cblx0WzJdIElkZW50aWZ5IGEubS4sIHAubS4gKGRpZmZlcmVudCBtYXRjaCB0byBhdm9pZCBmYWxzZSBwb3NpdGl2ZXMgc3VjaCBhczpcblx0XHRcdEkgYW0sIEhlIGlzIHRoZSBQTS4pXG5cdFszXSBFeGNsdWRlIGZhbHNlIGlkZW50aWZpY2F0aW9uc1xuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKSB7XG5cblx0LyogWzFdIElkZW50aWZ5IGUuZy4sIGkuZS4gKi9cblx0dmFyIGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwiKFxcXFxiW1wiICsgYWJicmV2aWF0aW9uc1tpXVswXSArIFwiXVxcXFwuP1tcIisgY29uc3RhbnRzLnNwYWNlcyArXCJdP1tcIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIl1cXFxcLj8pKFtcIisgY29uc3RhbnRzLnNwYWNlcyArXCJdPykoXFxcXGIpXCI7XG5cdFx0Ly8gY29uc29sZS5sb2cocGF0dGVybik7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IFwie3t0eXBvcG9fX1wiICsgYWJicmV2aWF0aW9uc1tpXSArIFwifX0gXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cblxuXG5cdC8qIFsyXSBJZGVudGlmeSBhLm0uLCBwLm0uICovXG5cdGFiYnJldmlhdGlvbnMgPSBbXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwiKFxcXFxkKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdPykoXFxcXGJbXCIgKyBhYmJyZXZpYXRpb25zW2ldWzBdICsgXCJdXFxcXC4/W1wiKyBjb25zdGFudHMuc3BhY2VzICtcIl0/W1wiICsgYWJicmV2aWF0aW9uc1tpXVsxXSArIFwiXVxcXFwuPykoW1wiKyBjb25zdGFudHMuc3BhY2VzICtcIl0/KShcXFxcYnxcXFxcQilcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBcIiQxIHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19IFwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXG5cdC8qIFszXSBFeGNsdWRlIGZhbHNlIGlkZW50aWZpY2F0aW9uc1xuXHRcdCBSZWdleCBcXGIgZG9lcyBub3QgY2F0Y2ggbm9uLWxhdGluIGNoYXJhY3RlcnMgc28gd2UgbmVlZCB0byBleGNsdWRlIGZhbHNlXG5cdFx0IGlkZW50aWZpY2F0aW9uc1xuXHQqL1xuXHRhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiLCBcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdC8vIG5vbi1sYXRpbiBjaGFyYWN0ZXIgYXQgdGhlIGJlZ2lubmluZ1xuXHRcdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLm5vbkxhdGluQ2hhcnMgKyBcIl0pKHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19KVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gXCIkMVwiICsgYWJicmV2aWF0aW9uc1tpXTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cdFx0Ly8gbm9uLWxhdGluIGNoYXJhY3RlciBhdCB0aGUgZW5kXG5cdFx0cGF0dGVybiA9IFwiKHt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19ICkoW1wiICsgY29uc3RhbnRzLm5vbkxhdGluQ2hhcnMgKyBcIl0pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHRyZXBsYWNlbWVudCA9IGFiYnJldmlhdGlvbnNbaV0gKyBcIiQyXCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBpZGVudGlmaWVkIHRlbXAgYWJicmV2aWF0aW9uIHZhcmlhYmxlIGxpa2Uge3t0eXBvcG9fX2VnfX0sXG5cdHdpdGggdGhlaXIgYWN0dWFsIHJlcHJlc2VudGF0aW9uXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBwbGFjZV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpIHtcblx0dmFyIGFiYnJldmlhdGlvbnMgPSBbXCJlZ1wiLCBcImllXCIsIFwiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcInt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19XCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gYWJicmV2aWF0aW9uc1tpXVswXSArIFwiLlwiICsgYWJicmV2aWF0aW9uc1tpXVsxXSArIFwiLlwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuXG5cblxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qXFxcblx0RXhjZXB0aW9uc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuLypcblx0SWRlbnRpZmllcyBleGNlcHRpb25zIHRoYXQgd2lsbCBiZSBvbW1pdGVkIGZyb20gY29ycmVjdGlvbiBvZiBhbnkgc29ydFxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgZW1haWwgYWRyZXNzZXNcblx0WzJdIElkZW50aWZ5IHdlYiBVUkxzIGFuZCBJUHNcblx0WzNdIE1hcmsgdGhlbSBhcyB0ZW1wb3JhcnkgZXhjZXB0aW9ucyBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvbiBvZiBleGNlcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBpZGVudGlmaWVkIGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX1cbiovXG5mdW5jdGlvbiBpZGVudGlmeV9leGNlcHRpb25zKHN0cmluZykge1xuXG5cdC8qIFsxXSBJZGVudGlmeSBlbWFpbCBhZHJlc3NlcyAqL1xuXHRpZGVudGlmeV9leGNlcHRpb25fc2V0KHN0cmluZywgY29uc3RhbnRzLmVtYWlsQWRkcmVzc1BhdHRlcm4pO1xuXG5cblx0LyogWzJdIElkZW50aWZ5IHdlYiBVUkxzIGFuZCBJUHMgKi9cblx0aWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIGNvbnN0YW50cy53ZWJVcmxQYXR0ZXJuKTtcblxuXG5cdC8qIFszXSBNYXJrIHRoZW0gYXMgdGVtcG9yYXJ5IGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX0gKi9cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBleGNlcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gXCJ7e3R5cG9wb19fZXhjZXB0aW9uLVwiICsgaSArIFwifX1cIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShleGNlcHRpb25zW2ldLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0SWRlbnRpZmllcyBzZXQgb2YgZXhjZXB0aW9ucyBmb3IgZ2l2ZW4gcGF0dGVyblxuXHRVc2VkIGFzIGhlbHBlciBmdW5jdGlvbiBmb3IgaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGV4Y2VwdGlvbnNcblx0QHBhcmFtIHtwYXR0ZXJufSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVybiB0byBtYXRjaCBleGNlcHRpb25cbiovXG5mdW5jdGlvbiBpZGVudGlmeV9leGNlcHRpb25fc2V0KHN0cmluZywgcGF0dGVybikge1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIG1hdGNoZWRfZXhjZXB0aW9ucyA9IHN0cmluZy5tYXRjaChyZSk7XG5cdGlmIChtYXRjaGVkX2V4Y2VwdGlvbnMgIT0gbnVsbCkge1xuXHRcdGV4Y2VwdGlvbnMgPSBleGNlcHRpb25zLmNvbmNhdChtYXRjaGVkX2V4Y2VwdGlvbnMpO1xuXHR9XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBpZGVudGlmaWVkIGV4Y2VwdGlvbnMgd2l0aCByZWFsIG9uZXMgYnkgY2hhbmdlIHRoZWlyXG5cdHRlbXBvcmFyeSByZXByZXNlbnRhdGlvbiBpbiBmb3JtYXQge3t0eXBvcG9fX2V4Y2VwdGlvbi1baV19fSB3aXRoIGl0c1xuXHRjb3JyZXNwb25kaW5nIHJlcHJlc2VudGF0aW9uXG5cblx0QHBhcmFtIHtzdHJpbmd9IGlucHV0IHRleHQgd2l0aCBpZGVudGlmaWVkIGV4Y2VwdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30gb3V0cHV0IHdpdGggcGxhY2VkIGV4Y2VwdGlvbnNcbiovXG5mdW5jdGlvbiBwbGFjZV9leGNlcHRpb25zKHN0cmluZykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGV4Y2VwdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgcGF0dGVybiA9IFwie3t0eXBvcG9fX2V4Y2VwdGlvbi1cIiArIGkgKyBcIn19XCJcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBleGNlcHRpb25zW2ldO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdE1haW4gc2NyaXB0XG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbi8qXG5cdENvcnJlY3QgdHlwb3MgaW4gdGhlIHByZWRlZmluZWQgb3JkZXJcblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGNvcnJlY3Rpb25cblx0QHBhcmFtIHtsYW5ndWFnZX0gc3RyaW5nIOKAlCBsYW5ndWFnZSBvcHRpb24gdG8gY29ycmVjdCBzcGVjaWZpYyB0eXBvczsgc3VwcG9ydGVkIGxhbmd1YWdlczogZW4sIHNrLCBjcywgcnVlLiBpZiBub3Qgc3BlY2lmaWVkLCBFbmdsaXNoIHR5cG9zIGFyZSBjb3JyZWN0ZWRcblx0QHBhcmFtIHtyZW1vdmVfbGluZXN9IGJvb2xlYW4g4oCUIG9wdGlvbmFsIHBhcmFtZXRlciBhbGxvd2luZyB5b3UgdG8gY2hvb3NlIHdoZXRoZXIgdG8gcmVtb3ZlIGVtcHR5IGxpbmVzIG9yIG5vdFxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgY29ycmVjdGVkIG91dHB1dFxuKi9cbmV4cG9ydCBmdW5jdGlvbiBjb3JyZWN0X3R5cG9zKHN0cmluZywgbGFuZ3VhZ2UsIGNvbmZpZ3VyYXRpb24pIHtcblx0bGFuZ3VhZ2UgPSAodHlwZW9mIGxhbmd1YWdlID09PSBcInVuZGVmaW5lZFwiKSA/IFwiZW5cIiA6IGxhbmd1YWdlO1xuXG5cdGNvbmZpZ3VyYXRpb24gPSAodHlwZW9mIGNvbmZpZ3VyYXRpb24gPT09IFwidW5kZWZpbmVkXCIpID8ge1xuXHRcdHJlbW92ZUxpbmVzIDogdHJ1ZSxcblx0fSA6IGNvbmZpZ3VyYXRpb247XG5cblx0c3RyaW5nID0gaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpO1xuXHRzdHJpbmcgPSBpZGVudGlmeV9jb21tb25fYWJicmV2aWF0aW9ucyhzdHJpbmcpOyAvLyBuZWVkcyB0byBnbyBiZWZvcmUgcHVuY3R1YXRpb24gZml4ZXNcblxuXHRzdHJpbmcgPSByZXBsYWNlX3N5bWJvbHMoc3RyaW5nKTtcblx0c3RyaW5nID0gcmVwbGFjZV9wZXJpb2RzX3dpdGhfZWxsaXBzaXMoc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX211bHRpcGxlX3NwYWNlcyhzdHJpbmcpO1xuXG5cblx0c3RyaW5nID0gY29ycmVjdF9kb3VibGVfcXVvdGVzX2FuZF9wcmltZXMoc3RyaW5nLCBsYW5ndWFnZSk7XG5cdHN0cmluZyA9IGNvcnJlY3Rfc2luZ2xlX3F1b3Rlc19wcmltZXNfYW5kX2Fwb3N0cm9waGVzKHN0cmluZywgbGFuZ3VhZ2UpO1xuXG5cdHN0cmluZyA9IGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKTtcblx0c3RyaW5nID0gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSBhZGRfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gcmVtb3ZlX3NwYWNlc19hdF9wYXJhZ3JhcGhfYmVnaW5uaW5nKHN0cmluZyk7XG5cblx0aWYoY29uZmlndXJhdGlvbi5yZW1vdmVMaW5lcykge1xuXHRcdHN0cmluZyA9IHJlbW92ZUVtcHR5TGluZXMoc3RyaW5nKTtcblx0fVxuXG5cdHN0cmluZyA9IGNvbnNvbGlkYXRlX25ic3Aoc3RyaW5nKTtcblx0c3RyaW5nID0gY29ycmVjdF9zcGFjZXNfYXJvdW5kX2VsbGlwc2lzKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcmVwbGFjZV9oeXBoZW5fd2l0aF9kYXNoKHN0cmluZywgbGFuZ3VhZ2UpO1xuXHRzdHJpbmcgPSByZXBsYWNlX2Rhc2hfd2l0aF9oeXBoZW4oc3RyaW5nKTtcblxuXHRzdHJpbmcgPSBjb3JyZWN0X2FjY2lkZW50YWxfdXBwZXJjYXNlKHN0cmluZyk7XG5cblx0c3RyaW5nID0gcGxhY2VfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKTsgLy8gbmVlZHMgdG8gZ28gYWZ0ZXIgcHVuY3R1YXRpb24gZml4ZXNcblx0c3RyaW5nID0gcGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZyk7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cbiJdfQ==

//# sourceMappingURL=maps/typopo_browser.built.js.map
