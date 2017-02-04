(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./lib/constants":1,"./lib/empty-lines":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGxpYlxcY29uc3RhbnRzLmpzIiwic3JjXFxsaWJcXGVtcHR5LWxpbmVzLmpzIiwic3JjXFx0eXBvcG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQ0FBOzs7O0FBSUEsSUFBTSxlQUFlO0FBQ25CLGFBQVcsR0FEUTtBQUVuQixhQUFXLEdBRlE7QUFHcEIsYUFBVyxHQUhTO0FBSXBCLGFBQVcsR0FKUztBQUtuQixhQUFXLEdBTFE7QUFNbkIsYUFBVyxHQU5RO0FBT25CLGNBQVksR0FQTztBQVFuQixjQUFZLEdBUk87QUFTbkIsWUFBVSxHQVRTO0FBVW5CLFlBQVU7QUFWUyxDQUFyQjtBQVlBLElBQU0sb0JBQW9CLDhEQUExQjtBQUNBLElBQU0sb0JBQW9CLDhEQUExQjtBQUNBLElBQU0sZ0JBQWdCLG9CQUFvQixpQkFBMUM7QUFDQSxJQUFNLGlCQUFpQixRQUFRLGlCQUEvQjtBQUNBLElBQU0saUJBQWlCLFFBQVEsaUJBQS9CO0FBQ0EsSUFBTSxXQUFXLGlCQUFpQixjQUFsQztBQUNBOzs7Ozs7Ozs7O0FBVUEsSUFBTSxvQkFBb0IsbUJBQTFCO0FBQ0EsSUFBTSxvQkFBb0IsMERBQTFCO0FBQ0EsSUFBTSxRQUFRLEdBQWQ7QUFDQSxJQUFNLE9BQU8sR0FBYjtBQUNBLElBQU0sWUFBWSxHQUFsQixDLENBQXVCO0FBQ3ZCLElBQU0sYUFBYSxHQUFuQixDLENBQXdCO0FBQ3hCLElBQU0sU0FBUyxRQUFRLElBQVIsR0FBZSxTQUFmLEdBQTJCLFVBQTFDO0FBQ0EsSUFBTSxzQkFBc0IsUUFBNUI7QUFDQSxJQUFNLHNCQUFzQixXQUFXLG1CQUF2QyxDLENBQTREO0FBQzVELElBQU0sa0JBQWtCLFdBQXhCO0FBQ0EsSUFBTSxrQkFBa0IsV0FBeEI7QUFDQSxJQUFNLFdBQVcsR0FBakI7QUFDQSxJQUFNLFNBQVMsR0FBZjs7QUFFQTs7OztBQUlBLElBQU0sZ0JB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QSxVQUFTLHlCQUF5QixNQUF6QixFQUFpQyxRQUFqQyxDQUFUO0FBQ0EsVUFBUyx5QkFBeUIsTUFBekIsQ0FBVDs7QUFFQSxVQUFTLDZCQUE2QixNQUE3QixDQUFUOztBQUVBLFVBQVMsMkJBQTJCLE1BQTNCLENBQVQsQ0F2QzhELENBdUNqQjtBQUM3QyxVQUFTLGlCQUFpQixNQUFqQixDQUFUOztBQUVBLFVBQVMsOEJBQThCLE1BQTlCLENBQVQ7O0FBRUEsUUFBTyxNQUFQO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG4gVmFyaWFibGVzICYgQ2hhcmFjdGVyIHJlcGxhY2VtZW50IHNldHNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5jb25zdCBlc3NlbnRpYWxTZXQgPSB7XG4gIFwiXFxcXChDXFxcXClcIjogXCLCqVwiLFxuICBcIlxcXFwoY1xcXFwpXCI6IFwiwqlcIixcblx0XCJcXFxcKFBcXFxcKVwiOiBcIuKThVwiLFxuXHRcIlxcXFwocFxcXFwpXCI6IFwi4pOFXCIsXG4gIFwiXFxcXChSXFxcXClcIjogXCLCrlwiLFxuICBcIlxcXFwoclxcXFwpXCI6IFwiwq5cIixcbiAgXCJcXFxcKFRNXFxcXClcIjogXCLihKJcIixcbiAgXCJcXFxcKHRtXFxcXClcIjogXCLihKJcIixcbiAgXCJcXFxcK1xcXFwtXCI6IFwiwrFcIixcbiAgXCJcXFxcLVxcXFwrXCI6IFwiwrFcIixcbn07XG5jb25zdCBub25MYXRpbkxvd2VyY2FzZSA9IFwiw6HDpMSNxI/DqcSbw63EusS+xYjDs8O0w7bFkcWVxZnFocWlw7rDvMWxxa/DvcW+0LDQsdCy0LPSkdC00LXQt9GW0LjQudC60LvQvNC90L7Qv9GA0YHRgtGD0YTRitGL0YzRhtGH0LbRiNGX0YnRkdGU0Y7Rj9GFXCI7XG5jb25zdCBub25MYXRpblVwcGVyY2FzZSA9IFwiw4HDhMSMxI7DicSaw43EucS9xYfDk8OUw5bFkMWUxZjFoMWkw5rDnMWwxa7DncW90JDQkdCS0JPSkNCU0JXQl9CG0JjQmdCa0JvQnNCd0J7Qn9Cg0KHQotCj0KTQqtCr0KzQptCn0JbQqNCH0KnQgdCE0K7Qr9ClXCI7XG5jb25zdCBub25MYXRpbkNoYXJzID0gbm9uTGF0aW5Mb3dlcmNhc2UgKyBub25MYXRpblVwcGVyY2FzZTtcbmNvbnN0IGxvd2VyY2FzZUNoYXJzID0gXCJhLXpcIiArIG5vbkxhdGluTG93ZXJjYXNlO1xuY29uc3QgdXBwZXJjYXNlQ2hhcnMgPSBcIkEtWlwiICsgbm9uTGF0aW5VcHBlcmNhc2U7XG5jb25zdCBhbGxDaGFycyA9IGxvd2VyY2FzZUNoYXJzICsgdXBwZXJjYXNlQ2hhcnM7XG4vKlxuICgzOSlcdFx0XHRkdW1iIHNpbmdsZSBxdW90ZVxuICg4MjE2KVx0XHRsZWZ0IHNpbmdsZSBxdW90YXRpb24gbWFya1xuICg4MjE3KVx0XHRyaWdodCBzaW5nbGUgcXVvdGF0aW9uIG1hcmtcbiAoNzAwKVx0XHRtb2RpZmllciBsZXR0ZXIgYXBvc3Ryb3BoZTsgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTW9kaWZpZXJfbGV0dGVyX2Fwb3N0cm9waGVcbiAoODIxOSlcdFx0c2luZ2xlIGhpZ2gtcmV2ZXJzZWQtOSBxdW90YXRpb24gbWFya1xuICg4MjQyKVx0XHRwcmltZVxuICg4MjQ5KVx0XHRzaW5nbGUgbGVmdC1wb2ludGluZyBhbmdsZSBxdW90YXRpb24gbWFya1xuICg4MjUwKVx0XHRzaW5nbGUgcmlnaHQtcG9pbnRpbmcgYW5nbGUgcXVvdGF0aW9uIG1hcmtcbiAqL1xuY29uc3Qgc2luZ2xlUXVvdGVBZGVwdHMgPSBcIuKAmnwnfOKAmHzigJl8yrx84oCbfOKAsnzigLl84oC6XCI7XG5jb25zdCBkb3VibGVRdW90ZUFkZXB0cyA9IFwi4oCefOKAnHzigJ18XFxcInzCq3zCu3zigLN8LHsyLH184oCYezIsfXzigJl7Mix9fCd7Mix9fOKAuXsyLH184oC6ezIsfXzigLJ7Mix9XCI7XG5jb25zdCBzcGFjZSA9IFwiIFwiO1xuY29uc3QgbmJzcCA9IFwiwqBcIjtcbmNvbnN0IGhhaXJTcGFjZSA9IFwi4oCKXCI7IC8vJiM4MjAyO1xuY29uc3QgbmFycm93TmJzcCA9IFwi4oCvXCI7IC8vJiM4MjM5O1xuY29uc3Qgc3BhY2VzID0gc3BhY2UgKyBuYnNwICsgaGFpclNwYWNlICsgbmFycm93TmJzcDtcbmNvbnN0IHRlcm1pbmFsUHVuY3R1YXRpb24gPSBcIlxcLlxcIVxcP1wiO1xuY29uc3Qgc2VudGVuY2VQdW5jdHVhdGlvbiA9IFwiXFwsXFw6XFw7XCIgKyB0ZXJtaW5hbFB1bmN0dWF0aW9uOyAvLyB0aGVyZSBpcyBubyBlbGxpcHNpcyBpbiB0aGUgc2V0IGFzIGl0IGlzIGJlaW5nIHVzZWQgdGhyb3VnaG91dCBhIHNlbnRlbmNlIGluIHRoZSBtaWRkbGUuIFJldGhpbmsgdGhpcyBncm91cCB0byBzcGxpdCBpdCBpbnRvIGVuZC1zZW50ZW5jZSBwdW5jdHVhdGlvbiBhbmQgbWlkZGxlIHNlbnRlbmNlIHB1bmN0dWF0aW9uXG5jb25zdCBvcGVuaW5nQnJhY2tldHMgPSBcIlxcXFwoXFxcXFtcXFxce1wiO1xuY29uc3QgY2xvc2luZ0JyYWNrZXRzID0gXCJcXFxcKVxcXFxdXFxcXH1cIjtcbmNvbnN0IGVsbGlwc2lzID0gXCLigKZcIjtcbmNvbnN0IGRlZ3JlZSA9IFwiwrBcIjtcblxuLypcbiBTb3VyY2UgZm9yIHdlYlVybFBhdHRlcm4sIGVtYWlsQWRkcmVzc1BhdHRlcm5cbiBodHRwOi8vZ3JlcGNvZGUuY29tL2ZpbGUvcmVwb3NpdG9yeS5ncmVwY29kZS5jb20vamF2YS9leHQvY29tLmdvb2dsZS5hbmRyb2lkL2FuZHJvaWQvMi4wX3IxL2FuZHJvaWQvdGV4dC91dGlsL1JlZ2V4LmphdmEjUmVnZXguMFdFQl9VUkxfUEFUVEVSTlxuICovXG5jb25zdCB3ZWJVcmxQYXR0ZXJuID0gXCIoKD86KGh0dHB8aHR0cHN8SHR0cHxIdHRwc3xydHNwfFJ0c3ApOlxcXFwvXFxcXC8oPzooPzpbYS16QS1aMC05XFxcXCRcXFxcLVxcXFxfXFxcXC5cXFxcK1xcXFwhXFxcXCpcXFxcJ1xcXFwoXFxcXClcIiArXG4gIFwiXFxcXCxcXFxcO1xcXFw/XFxcXCZcXFxcPV18KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpezEsNjR9KD86XFxcXDooPzpbYS16QS1aMC05XFxcXCRcXFxcLVxcXFxfXCIgK1xuICBcIlxcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXFxcXCxcXFxcO1xcXFw/XFxcXCZcXFxcPV18KD86XFxcXCVbYS1mQS1GMC05XXsyfSkpezEsMjV9KT9cXFxcQCk/KT9cIiArXG4gIFwiKCg/Oig/OlthLXpBLVowLTldW2EtekEtWjAtOVxcXFwtXXswLDY0fVxcXFwuKStcIiArICAvLyBuYW1lZCBob3N0XG4gIFwiKD86XCIgKyAvLyBwbHVzIHRvcCBsZXZlbCBkb21haW5cbiAgXCIoPzphZXJvfGFycGF8YXNpYXxhW2NkZWZnaWxtbm9xcnN0dXd4el0pXCIgK1xuICBcInwoPzpiaXp8YlthYmRlZmdoaWptbm9yc3R2d3l6XSlcIiArXG4gIFwifCg/OmNhdHxjb218Y29vcHxjW2FjZGZnaGlrbG1ub3J1dnh5el0pXCIgK1xuICBcInxkW2Vqa21vel1cIiArXG4gIFwifCg/OmVkdXxlW2NlZ3JzdHVdKVwiICtcbiAgXCJ8Zltpamttb3JdXCIgK1xuICBcInwoPzpnb3Z8Z1thYmRlZmdoaWxtbnBxcnN0dXd5XSlcIiArXG4gIFwifGhba21ucnR1XVwiICtcbiAgXCJ8KD86aW5mb3xpbnR8aVtkZWxtbm9xcnN0XSlcIiArXG4gIFwifCg/OmpvYnN8altlbW9wXSlcIiArXG4gIFwifGtbZWdoaW1ucnd5el1cIiArXG4gIFwifGxbYWJjaWtyc3R1dnldXCIgK1xuICBcInwoPzptaWx8bW9iaXxtdXNldW18bVthY2RnaGtsbW5vcHFyc3R1dnd4eXpdKVwiICtcbiAgXCJ8KD86bmFtZXxuZXR8blthY2VmZ2lsb3BydXpdKVwiICtcbiAgXCJ8KD86b3JnfG9tKVwiICtcbiAgXCJ8KD86cHJvfHBbYWVmZ2hrbG1ucnN0d3ldKVwiICtcbiAgXCJ8cWFcIiArXG4gIFwifHJbZW91d11cIiArXG4gIFwifHNbYWJjZGVnaGlqa2xtbm9ydHV2eXpdXCIgK1xuICBcInwoPzp0ZWx8dHJhdmVsfHRbY2RmZ2hqa2xtbm9wcnR2d3pdKVwiICtcbiAgXCJ8dVthZ2ttc3l6XVwiICtcbiAgXCJ8dlthY2VnaW51XVwiICtcbiAgXCJ8d1tmc11cIiArXG4gIFwifHlbZXR1XVwiICtcbiAgXCJ8elthbXddKSlcIiArXG4gIFwifCg/Oig/OjI1WzAtNV18MlswLTRdXCIgKyAvLyBvciBpcCBhZGRyZXNzXG4gIFwiWzAtOV18WzAtMV1bMC05XXsyfXxbMS05XVswLTldfFsxLTldKVxcXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XVwiICtcbiAgXCJ8WzAtMV1bMC05XXsyfXxbMS05XVswLTldfFsxLTldfDApXFxcXC4oPzoyNVswLTVdfDJbMC00XVswLTldfFswLTFdXCIgK1xuICBcIlswLTldezJ9fFsxLTldWzAtOV18WzEtOV18MClcXFxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1bMC05XXsyfVwiICtcbiAgXCJ8WzEtOV1bMC05XXxbMC05XSkpKVwiICtcbiAgXCIoPzpcXFxcOlxcXFxkezEsNX0pPylcIiArIC8vIHBsdXMgb3B0aW9uIHBvcnQgbnVtYmVyICtcbiAgXCIoXFxcXC8oPzooPzpbYS16QS1aMC05XFxcXDtcXFxcL1xcXFw/XFxcXDpcXFxcQFxcXFwmXFxcXD1cXFxcI1xcXFx+XCIgKyAvLyBwbHVzIG9wdGlvbiBxdWVyeSBwYXJhbXNcbiAgXCJcXFxcLVxcXFwuXFxcXCtcXFxcIVxcXFwqXFxcXCdcXFxcKFxcXFwpXFxcXCxcXFxcX10pfCg/OlxcXFwlW2EtZkEtRjAtOV17Mn0pKSopP1wiICtcbiAgXCIoPzpcXFxcYnwkKVwiOyAvLyBhbmQgZmluYWxseSwgYSB3b3JkIGJvdW5kYXJ5IG9yIGVuZCBvZlxuLy8gaW5wdXQuICBUaGlzIGlzIHRvIHN0b3AgZm9vLnN1cmUgZnJvbVxuLy8gbWF0Y2hpbmcgYXMgZm9vLnN1XG5cblxuY29uc3QgZW1haWxBZGRyZXNzUGF0dGVybiA9IFwiW2EtekEtWjAtOVxcXFwrXFxcXC5cXFxcX1xcXFwlXFxcXC1dezEsMjU2fVwiICtcbiAgXCJcXFxcQFwiICtcbiAgXCJbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCw2NH1cIiArXG4gIFwiKFwiICtcbiAgXCJcXFxcLlwiICtcbiAgXCJbYS16QS1aMC05XVthLXpBLVowLTlcXFxcLV17MCwyNX1cIiArXG4gIFwiKStcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBlc3NlbnRpYWxTZXQsXG4gIG5vbkxhdGluTG93ZXJjYXNlLFxuICBub25MYXRpblVwcGVyY2FzZSxcbiAgbm9uTGF0aW5DaGFycyxcbiAgbG93ZXJjYXNlQ2hhcnMsXG4gIHVwcGVyY2FzZUNoYXJzLFxuICBhbGxDaGFycyxcbiAgc2luZ2xlUXVvdGVBZGVwdHMsXG4gIGRvdWJsZVF1b3RlQWRlcHRzLFxuICBzcGFjZSxcbiAgbmJzcCxcbiAgaGFpclNwYWNlLFxuICBuYXJyb3dOYnNwLFxuICBzcGFjZXMsXG4gIHRlcm1pbmFsUHVuY3R1YXRpb24sXG4gIHNlbnRlbmNlUHVuY3R1YXRpb24sXG4gIG9wZW5pbmdCcmFja2V0cyxcbiAgY2xvc2luZ0JyYWNrZXRzLFxuICBlbGxpcHNpcyxcbiAgZGVncmVlLFxuICB3ZWJVcmxQYXR0ZXJuLFxuICBlbWFpbEFkZHJlc3NQYXR0ZXJuLFxufVxuIiwiLypcclxuXHRSZW1vdmVzIGVtcHR5IGxpbmVzXHJcblxyXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXHJcblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgZW1wdHkgbGluZXNcclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVtcHR5TGluZXMoc3RyaW5nKSB7XHJcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzKy9nbSwgXCJcIik7XHJcbn1cclxuIiwiLyohXG4gKiBUeXBvcG8gMS40LjBcbiAqXG4gKiBDb3B5cmlnaHQgMjAxNS0xNyBCcmHFiG8gxaBhbmRhbGFcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTctMDEtMTVcbiAqL1xuXG5pbXBvcnQge3JlbW92ZUVtcHR5TGluZXN9IGZyb20gXCIuL2xpYi9lbXB0eS1saW5lc1wiO1xuaW1wb3J0IGNvbnN0YW50cyBmcm9tICcuL2xpYi9jb25zdGFudHMnO1xuXG5cbnZhciBleGNlcHRpb25zID0gW107XG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRFc2VudGlhbCByZXBsYWNlbWVudHNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiByZXBsYWNlX3N5bWJvbHMoc3RyaW5nKSB7XG5cdGZvciAodmFyIHJ1bGUgaW4gY29uc3RhbnRzLmVzc2VudGlhbFNldCkge1xuXHRcdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChydWxlLCBcImdcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgY29uc3RhbnRzLmVzc2VudGlhbFNldFtydWxlXSk7XG5cdH1cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZykge1xuXHQvKiBbMV0gcmVwbGFjZSAzIGFuZCBtb3JlIGRvdHMgd2l0aCBhbiBlbGxpcHNpcyAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFwuezMsfS9nLCBcIuKAplwiKTtcblxuXHQvKiBbMl0gcmVwbGFjZSAyIGRvdHMgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2VudGVjbmUgd2l0aCBhbiBhcG9zaW9wZXNpcyAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVxcXFwuezJ9W1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiIOKApiBcIik7XG5cblx0LyogWzNdIHJlcGxhY2UgMiBkb3RzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlY25lIHdpdGggZnVsbCBzdG9wICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXC57Mn0vZywgXCIuXCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfbXVsdGlwbGVfc3BhY2VzKHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyB7Mix9L2csIFwiIFwiKTtcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRRdW90ZXMsIHByaW1lcyAmIGFwb3N0cm9waGVzXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXG5cbi8qXG5cdENvcnJlY3RzIGltcHJvcGVyIHVzZSBvZiBkb3VibGUgcXVvdGVzIGFuZCBkb3VibGUgcHJpbWVzXG5cblx0QXNzdW1wdGlvbnMgYW5kIExpbWl0YXRpb25zXG5cdFRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGRvdWJsZSBxdW90ZXMgYXJlIGFsd2F5cyB1c2VkIGluIHBhaXIsXG5cdGkuZS4gYXV0aG9ycyBkaWQgbm90IGZvcmdldCB0byBjbG9zZSBkb3VibGUgcXVvdGVzIGluIHRoZWlyIHRleHQuXG5cblx0QWxnb3JpdGhtXG5cdFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcblx0WzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgcHVuY3R1YXRpb25cblx0ICAgICh0aGlzIGNvbWVzIGZpcnN0IGFzIGl0IGlzIGEgcXVpdGUgY29tbW9uIG1pc3Rha2UgdGhhdCBtYXkgZXZlbnR1YWxseVxuXHRcdCAgbGVhZCB0byBpbXByb3BlciBpZGVudGlmaWNhdGlvbiBvZiBkb3VibGUgcHJpbWVzKVxuXHRbMl0gSWRlbnRpZnkgaW5jaGVzLCBhcmNzZWNvbmRzLCBzZWNvbmRzXG5cdFszXSBJZGVudGlmeSBjbG9zZWQgZG91YmxlIHF1b3Rlc1xuXHRbNF0gSWRlbnRpZnkgdGhlIHJlc3QgYXMgdW5jbG9zZWQgZG91YmxlIHF1b3RlcyAoYmVzdC1lZmZvcnQgcmVwbGFjZW1lbnQpXG5cdFs1XSBGaXggc3BhY2luZyBhcm91bmQgcXVvdGVzIGFuZCBwcmltZXNcblx0WzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuXHRbN10gUmVtb3ZlIGV4dHJhIHB1bmN0dWF0aW9uIGFyb3VuZCBxdW90ZXNcblx0WzhdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuXHQgICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Ug4oCUIGxhbmd1YWdlIG9wdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBvdXRwdXQgd2l0aCBwcm9wZXJseSByZXBsYWNlcyBkb3VibGUgcW91dGVzIGFuZCBkb3VibGUgcHJpbWVzXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9kb3VibGVfcXVvdGVzX2FuZF9wcmltZXMoc3RyaW5nLCBsYW5ndWFnZSkge1xuXG5cdC8qIFswXSBSZW1vdmUgZXh0cmEgdGVybWluYWwgcHVuY3R1YXRpb24gYXJvdW5kIGRvdWJsZSBxdW90ZXNcblx0XHRcdFx0XHQgZS5nLiDigJxXZSB3aWxsIGNvbnRpbnVlIHRvbW9ycm93LuKAnS4gKi9cblx0dmFyIHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSkoXCIrIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKShbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDJcIik7XG5cblx0LyogWzFdIFN3YXAgcmlnaHQgZG91YmxlIHF1b3RlIGFkZXB0cyB3aXRoIGEgdGVybWluYWwgcHVuY3R1YXRpb24gKi9cblx0cGF0dGVybiA9IFwiKFwiKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgY29uc3RhbnRzLnRlcm1pbmFsUHVuY3R1YXRpb24gKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCAnJDIkMScpO1xuXG5cdC8qIFsyXSBJZGVudGlmeSBpbmNoZXMsIGFyY3NlY29uZHMsIHNlY29uZHNcblx0XHRcdFx0IE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyB2YXJpYWJsZVxuXHRcdFx0XHQgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9tbWl0ZWQqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxcZCA/KSjigJx84oCdfFxcXCJ84oCzfOKAmHsyLH184oCZezIsfXwnezIsfXzigLJ7Mix9KS9nLCBcIiQxe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19XCIpO1xuXG5cblx0LyogWzNdIElkZW50aWZ5IGNsb3NlZCBkb3VibGUgcXVvdGVzICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKSguKj8pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19JDJ7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuXHQvKiBbNC4xXSBJZGVudGlmeSB1bmNsb3NlZCBsZWZ0IGRvdWJsZSBxdW90ZSAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIikoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSQyXCIpO1xuXG5cblx0LyogWzQuMl0gSWRlbnRpZnkgdW5jbG9zZWQgcmlnaHQgZG91YmxlIHF1b3RlICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIGNvbnN0YW50cy5lbGxpcHNpcyArIFwiXSkoXCIgKyBjb25zdGFudHMuZG91YmxlUXVvdGVBZGVwdHMgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX1cIik7XG5cblxuXHQvKiBbNC4zXSBSZW1vdmUgcmVtYWluaW5nIHVuaWRlbnRpZmllZCBkb3VibGUgcXVvdGUgKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbNV0gRml4IHNwYWNpbmcgYXJvdW5kIHF1b3RlcyBhbmQgcHJpbWUgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkoICkvZywgXCIkMVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyggKSh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pL2csIFwiJDJcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oICkoe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIiQyXCIpO1xuXG5cblx0LyogWzZdIFN3YXAgYmFjayBzb21lIG9mIHRoZSBkb3VibGUgcXVvdGVzIHdpdGggYSBwdW5jdHVhdGlvblxuXG5cdFx0IElkZWFcblx0XHQgSW4gWzFdIHdlIGhhdmUgc3dhcHBlZCBhbGwgZG91YmxlIHJpZ2h0IHF1b3RlcyBieSBkZWZhdWx0IHdpdGggYSB0ZXJtaW5hbFxuXHRcdCBwdW5jdHVhdGlvbi4gSG93ZXZlciwgbm90IGFsbCBkb3VibGUgcXVvdGVzIHdyYXAgdGhlIHdob2xlIHNlbnRlbmNlIGFuZFxuXHRcdCB0aGVyZSBhcmUgY2FzZXMgd2hlbiBmZXcgd29yZHMgYXJlIHF1b3RlZCB3aXRoaW4gYSBzZW50ZW5jZS4gVGFrZSBhIGxvb2sgYXRcblx0XHQgZXhhbXBsZXM6XG5cdFx0IOKAnFNlbnRlbmNlIHFvdXRlZCBhcyBhIHdob2xlLuKAnSAoZnVsbCBzdG9wIGlzIHBsYWNlZCB3aXRoaW4gZG91YmxlIHF1b3Rlcylcblx0XHQgVGhpcyBpcyDigJxxdW90ZWQgZXhwcmVzc2lvbi7igJ0gKGZ1bGwgc3RvcCBpcyBwbGFjZWQgb3V0c2lkZSBkb3VibGUgcXVvdGVzKVxuXG5cdFx0IEFsZ29yaXRobVxuXHRcdCBNYXRjaCBhbGwgdGhlIGRvdWJsZSBxdW90ZSBwYWlycyB0aGF0IGRvIG5vdCBwcmVjZWRlIHNlbnRlbmNlIHB1bmN0dWF0aW9uXG5cdFx0IChhbmQgdGh1cyBtdXN0IGJlIHVzZWQgd2l0aGluIGEgc2VudGVuY2UpIGFuZCBzd2FwIHJpZ2h0IGRvdWJsZSB3aXRoXG5cdFx0IGEgdGVybWluYWwgcHVuY3R1YXRpb24uXG5cdFx0ICovXG5cdHBhdHRlcm4gPSBcIihbXlwiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJde3t0eXBvcG9fX2xlZnQtZG91YmxlLXF1b3RlfX0uKz8pKFtcIiArIGNvbnN0YW50cy50ZXJtaW5hbFB1bmN0dWF0aW9uICsgXCJdKSh7e3R5cG9wb19fcmlnaHQtZG91YmxlLXF1b3RlfX0pXCI7XG5cdC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzJDJcIik7XG5cblxuXHQvKiBbN10gUmVtb3ZlIGV4dHJhIGNvbW1hIGFmdGVyIHB1bmN0dWF0aW9uIGluIGRpcmVjdCBzcGVlY2gsXG5cdFx0XHRcdFx0IGUuZy4gXCLigJxIZXkhLOKAnSBzaGUgc2FpZFwiICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXSkoW1xcLF0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxXCIpO1xuXG5cblx0LyogWzhdIFB1bmN0dWF0aW9uIHJlcGxhY2VtZW50ICovXG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX2RvdWJsZS1wcmltZX19KS9nLCBcIuKAs1wiKTtcblxuXHRzd2l0Y2ggKGxhbmd1YWdlKSB7XG5cdFx0Y2FzZSBcInJ1ZVwiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLCq1wiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIsK7XCIpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcInNrXCI6XG5cdFx0Y2FzZSBcImNzXCI6XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19sZWZ0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnlwiKTtcblx0XHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8oe3t0eXBvcG9fX3JpZ2h0LWRvdWJsZS1xdW90ZX19KS9nLCBcIuKAnFwiKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJlblwiOlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fbGVmdC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJxcIik7XG5cdFx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKHt7dHlwb3BvX19yaWdodC1kb3VibGUtcXVvdGV9fSkvZywgXCLigJ1cIik7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG4vKlxuXHRDb3JyZWN0cyBpbXByb3BlciB1c2Ugb2Ygc2luZ2xlIHF1b3Rlcywgc2luZ2xlIHByaW1lcyBhbmQgYXBvc3Ryb3BoZXNcblxuXHRBc3N1bXB0aW9ucyBhbmQgTGltaXRhdGlvbnNcblx0VGhpcyBmdW5jdGlvbiBhc3N1bWVzIHRoYXQgZG91YmxlIHF1b3RlcyBhcmUgYWx3YXlzIHVzZWQgaW4gcGFpcixcblx0aS5lLiBhdXRob3JzIGRpZCBub3QgZm9yZ2V0IHRvIGNsb3NlIGRvdWJsZSBxdW90ZXMgaW4gdGhlaXIgdGV4dC5cblx0RnVydGhlciwgc2luZ2xlIHF1b3RlcyBhcmUgdXNlZCBhcyBzZWNvbmRhcnkgYW5kIHRoZXkncmUgcHJvcGVybHkgc3BhY2VkLFxuXHRlLmcuIOKQoyd3b3JkIG9yIHNlbnRlbmNlIHBvcnRpb24n4pCjIChhbmQgbm90IGxpa2Ug4pCjJ+KQo3dvcmTikKMn4pCjKVxuXG5cdEFsZ29yaXRobVxuXHRbMV0gSWRlbnRpZnkgY29tbW9uIGFwb3N0cm9oZSBjb250cmFjdGlvbnNcblx0WzJdIElkZW50aWZ5IHNpbmdsZSBxdW90ZXNcblx0WzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcblx0WzRdIElkZW50aWZ5IHJlc2lkdWFsIGFwb3N0cm9waGVzIHRoYXQgaGF2ZSBsZWZ0XG5cdFs/XSBTd2FwIHJpZ2h0IHNpbmdsZSBxdW90ZSBhZGVwdHMgd2l0aCBhIHB1bnR1YXRpb25cblx0XHRcdChXZSB3ZXJlIHN3YXBwaW5nIHNpbmdsZSBxdW90ZXMgYXMgcGFydCBvZiBhbGdvcml0aG0gYSB3aGlsZSBhIGJhY2ssXG5cdFx0XHRidXQgc2luY2UgaXQgaXMgbW9yZSBwcm9iYWJsZSB0aGF0IHNpbmdsZSBxdW90ZXMgYXJlIGluIHRoZSBtaWRkbGUgb2YgdGhlXG5cdFx0XHRzZW50ZW5jZSwgd2UgaGF2YWUgZHJvcHBlZCBzd2FwcGluZyBhcyBhIHBhcnQgb2YgdGhlIGFsZ29yaXRobSlcblx0WzZdIFJlcGxhY2UgYWxsIGlkZW50aWZpZWQgcHVuY3R1YXRpb24gd2l0aCBhcHByb3ByaWF0ZSBwdW5jdHVhdGlvbiBpblxuXHQgICAgZ2l2ZW4gbGFuZ3VhZ2VcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcGFyYW0ge3N0cmluZ30gbGFuZ3VhZ2Ug4oCUIGxhbmd1YWdlIG9wdGlvbnNcblx0QHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiovXG5mdW5jdGlvbiBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKSB7XG5cblx0LyogWzEuMV0gSWRlbnRpZnkg4oCZbuKAmSBjb250cmFjdGlvbnMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKShuKShcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMnt7dHlwb3BvX19hcG9zdHJvcGhlfX1cIik7XG5cblxuXHQvKiBbMS4yXSBJZGVudGlmeSBjb21tb24gY29udHJhY3Rpb25zIGF0IHRoZSBiZWdpbm5pbmcgb3IgYXQgdGhlIGVuZFxuXHRcdFx0XHRcdCBvZiB0aGUgd29yZCwgZS5nLiBGaXNoIOKAmW7igJkgQ2hpcHMsIOKAmWVtLCDigJljYXVzZSzigKYgKi9cblx0dmFyIGNvbnRyYWN0aW9uX2V4YW1wbGVzID0gXCJlbXxjYXVzZXx0d2FzfHRpc3x0aWx8cm91bmRcIlxuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoXCIgKyBjb250cmFjdGlvbl9leGFtcGxlcyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2Fwb3N0cm9waGV9fSQyXCIpO1xuXG5cblx0LyogWzEuM10gSWRlbnRpZnkgaW4td29yZCBjb250cmFjdGlvbnMsXG5cdFx0XHRcdFx0IGUuZy4gRG9u4oCZdCwgSeKAmW0sIE/igJlEb29sZSwgNjnigJllcnMgKi9cblx0dmFyIGNoYXJhY3Rlcl9hZGVwdHMgPSBcIjAtOVwiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzO1xuXHRwYXR0ZXJuID0gXCIoW1wiKyBjaGFyYWN0ZXJfYWRlcHRzICtcIl0pKFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFtcIisgY2hhcmFjdGVyX2FkZXB0cyArXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMXt7dHlwb3BvX19hcG9zdHJvcGhlfX0kM1wiKTtcblxuXG5cdC8qIFsxLjRdIElkZW50aWZ5IHllYXIgY29udHJhY3Rpb25zXG5cdFx0IGUuZy4g4oCZNzBzLCBJTkNIRUJBIOKAmTg5LOKApiAqL1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoWzAtOV17Mn0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcInt7dHlwb3BvX19hcG9zdHJvcGhlfX0kMlwiKTtcblxuXG5cdC8qIFsyXSBJZGVudGlmeSBzaW5nbGUgcXVvdGVzIHdpdGhpbiBkb3VibGUgcXVvdGVzICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5kb3VibGVRdW90ZUFkZXB0cyArIFwiKSguKj8pKFwiICsgY29uc3RhbnRzLmRvdWJsZVF1b3RlQWRlcHRzICsgXCIpXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbigkMCwgJDEsICQyLCAkMyl7XG5cblx0XHQvL2lkZW50aWZ5IHt7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuXHRcdHZhciBwYXR0ZXJuID0gXCIoICkoXCIgKyBjb25zdGFudHMuc2luZ2xlUXVvdGVBZGVwdHMgKyBcIikoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXSlcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwiJDF7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0kM1wiKTtcblxuXHRcdC8vaWRlbnRpZnkge3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fVxuXHRcdHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdKShbXFwuLCE/XSk/KFwiICsgY29uc3RhbnRzLnNpbmdsZVF1b3RlQWRlcHRzICsgXCIpKFsgXXxbXFwuLCE/XSlcIjtcblx0XHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdCQyID0gJDIucmVwbGFjZShyZSwgXCIkMSQye3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fSQ0XCIpO1xuXG5cdFx0Ly9pZGVudGlmeSBzaW5nbGUgcXVvdGUgcGFpcnNcblx0XHRwYXR0ZXJuID0gXCIoe3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlLS1hZGVwdH19KSguKj8pKHt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGUtLWFkZXB0fX0pXCI7XG5cdFx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHQkMiA9ICQyLnJlcGxhY2UocmUsIFwie3t0eXBvcG9fX2xlZnQtc2luZ2xlLXF1b3RlfX0kMnt7dHlwb3BvX19yaWdodC1zaW5nbGUtcXVvdGV9fVwiKTtcblxuXHRcdHJldHVybiAkMSArICQyICsgJDM7XG5cdH0pO1xuXG5cblx0LyogWzNdIElkZW50aWZ5IGZlZXQsIGFyY21pbnV0ZXMsIG1pbnV0ZXNcblx0XHRcdFx0IE5vdGU6IHdl4oCZcmUgbm90IHVzaW5nIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyB2YXJpYWJsZVxuXHRcdFx0XHQgYXMgY29tbWFzIGFuZCBsb3ctcG9zaXRpb25lZCBxdW90ZXMgYXJlIG9tbWl0ZWQqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKFxcZCkoID8pKCd84oCYfOKAmXzigJt84oCyKS9nLCBcIiQxe3t0eXBvcG9fX3NpbmdsZS1wcmltZX19XCIpO1xuXG5cblx0LyogWzRdIElkZW50aWZ5IHJlc2lkdWFsIGFwb3N0cm9waGVzIHRoYXQgaGF2ZSBsZWZ0ICovXG5cdHBhdHRlcm4gPSBcIihcIiArIGNvbnN0YW50cy5zaW5nbGVRdW90ZUFkZXB0cyArIFwiKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCJ7e3R5cG9wb19fYXBvc3Ryb3BoZX19XCIpO1xuXG5cblxuXHQvKiBbNV0gUHVuY3R1YXRpb24gcmVwbGFjZW1lbnQgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLyh7e3R5cG9wb19fc2luZ2xlLXByaW1lfX0pL2csIFwi4oCyXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX2Fwb3N0cm9waGV9fXx7e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGUtLWFkZXB0fX18e3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZS0tYWRlcHR9fS9nLCBcIuKAmVwiKTtcblxuXG5cdHN3aXRjaCAobGFuZ3VhZ2UpIHtcblx0Y2FzZSBcInJ1ZVwiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAuVwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oC6XCIpO1xuXHRcdGJyZWFrO1xuXHRjYXNlIFwic2tcIjpcblx0Y2FzZSBcImNzXCI6XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoL3t7dHlwb3BvX19sZWZ0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCaXCIpO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fcmlnaHQtc2luZ2xlLXF1b3RlfX0vZywgXCLigJhcIik7XG5cdFx0YnJlYWs7XG5cdGNhc2UgXCJlblwiOlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC97e3R5cG9wb19fbGVmdC1zaW5nbGUtcXVvdGV9fS9nLCBcIuKAmFwiKTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgve3t0eXBvcG9fX3JpZ2h0LXNpbmdsZS1xdW90ZX19L2csIFwi4oCZXCIpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbmZ1bmN0aW9uIGNvcnJlY3RfbXVsdGlwbGVfc2lnbihzdHJpbmcpIHtcblx0cmV0dXJuIHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nLnJlcGxhY2UoLyhbMS05XStbIF17MCwxfVthLXd6XSopKFsgXXswLDF9W3h8w5ddWyBdezAsMX0pKFsxLTldK1sgXXswLDF9W2Etd3pdKikvZywgXCIkMSDDlyAkM1wiKSk7XG59XG5cblxuXG4vKlxuXHRSZXBsYWNlcyBoeXBoZW4gd2l0aCBlbSBvciBlbiBkYXNoXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBSZXBsYWNlIDMgY29uc2VjdXRpdmUgaHlwaGVucyAoLS0tKSB3aXRoIGFuIGVtIGRhc2ggKOKAlClcblx0WzJdIFJlcGxhY2UgMiBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLSkgd2l0aCBhbiBlbiBkYXNoICjigJQpXG5cdFszXSBSZXBsYWNlIGFueSBoeXBoZW4gb3IgZGFzaCBzdXJyb3VuZGVkIHdpdGggc3BhY2VzIHdpdGggYW4gZW0gZGFzaFxuXHRbNF0gUmVwbGFjZSBoeXBoZW4gb3IgZGFzaCB1c2VkIGluIG51bWJlciByYW5nZSB3aXRoIGFuIGVuIGRhc2hcblx0XHRcdGFuZCBzZXQgcHJvcGVyIHNwYWNpbmdcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggZGFzaGVzIGluc3RlYWQgb2YgaHlwaGVuc1xuKi9cbmZ1bmN0aW9uIHJlcGxhY2VfaHlwaGVuX3dpdGhfZGFzaChzdHJpbmcsIGxhbmd1YWdlKSB7XG5cdHZhciBkYXNoZXMgPSBcIi3igJPigJRcIjsgLy8gaW5jbHVkaW5nIGEgaHlwaGVuXG5cblx0LyogWzFdIFJlcGxhY2UgMyBjb25zZWN1dGl2ZSBoeXBoZW5zICgtLS0pIHdpdGggYW4gZW0gZGFzaCAo4oCUKSAqL1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvKC0tLSkvZywgXCLigJRcIik7XG5cblxuXHQvKiBbMl0gUmVwbGFjZSAyIGNvbnNlY3V0aXZlIGh5cGhlbnMgKC0tKSB3aXRoIGFuIGVuIGRhc2ggKOKAlCkgKi9cblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLygtLSkvZywgXCLigJNcIik7XG5cblxuXHQvKiBbM10gUmVwbGFjZSBhbnkgaHlwaGVuIG9yIGRhc2ggc3Vycm91bmRlZCB3aXRoIHNwYWNlcyB3aXRoIGFuIGVtIGRhc2ggKi9cblx0dmFyIHBhdHRlcm4gPSBcIltcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHR2YXIgcmVwbGFjZW1lbnQgPSBjb25zdGFudHMubmFycm93TmJzcCArIFwi4oCUXCIgKyBjb25zdGFudHMuaGFpclNwYWNlO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cdC8qIFs0LjFdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgY2FyZGluYWwgbnVtYmVycyxcblx0XHRcdFx0XHQgd2l0aCBhbiBlbiBkYXNoOyBpbmNsdWRpbmcgY2FzZXMgd2hlbiB0aGVyZSBpcyBhbiBleHRyYSBzcGFjZVxuXHRcdFx0XHRcdCBmcm9tIGVpdGhlciBvbmUgc2lkZSBvciBib3RoIHNpZGVzIG9mIHRoZSBkYXNoICovXG5cdHZhciBjYXJkaW5hbF9udW1iZXIgPSBcIlxcXFxkK1wiO1xuXHRwYXR0ZXJuID0gXCIoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT9bXCIgKyBkYXNoZXMgKyBcIl1bXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdPykoXCIgKyBjYXJkaW5hbF9udW1iZXIgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDHigJMkM1wiKTtcblxuXG5cdC8qIFs0LjJdIFJlcGxhY2UgaHlwaGVuIG9yIGRhc2gsIHBsYWNlZCBiZXR3ZWVuIDIgb3JkaW5hbCBudW1iZXJzLFxuXHRcdFx0XHRcdCB3aXRoIGFuIGVuIGRhc2g7IGluY2x1ZGluZyBjYXNlcyB3aGVuIHRoZXJlIGlzIGFuIGV4dHJhIHNwYWNlXG5cdFx0XHRcdFx0IGZyb20gZWl0aGVyIG9uZSBzaWRlIG9yIGJvdGggc2lkZXMgb2YgdGhlIGRhc2ggKi9cblx0dmFyIG9yZGluYWxfaW5kaWNhdG9yID0gXCJcIjtcblx0c3dpdGNoIChsYW5ndWFnZSkge1xuXHRcdGNhc2UgXCJydWVcIjpcblx0XHRjYXNlIFwic2tcIjpcblx0XHRjYXNlIFwiY3NcIjpcblx0XHRcdG9yZGluYWxfaW5kaWNhdG9yID0gXCJcXFxcLlwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImVuXCI6XG5cdFx0XHRvcmRpbmFsX2luZGljYXRvciA9IFwic3R8bmR8cmR8dGhcIjtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHBhdHRlcm4gPSBcIihcIiArIGNhcmRpbmFsX251bWJlciArIFwiKShcIiArIG9yZGluYWxfaW5kaWNhdG9yICsgXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0/W1wiICsgZGFzaGVzICsgXCJdW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT8pKFwiICsgY2FyZGluYWxfbnVtYmVyICsgXCIpKFwiICsgb3JkaW5hbF9pbmRpY2F0b3IgKyBcIilcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ2lcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDLigJMkNCQ1XCIpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG5cblxuXG5mdW5jdGlvbiByZXBsYWNlX2Rhc2hfd2l0aF9oeXBoZW4oc3RyaW5nKXtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdKShb4oCT4oCUXSkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMS0kM1wiKTtcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRDb25zb2xpZGF0aW9uIG9mIHNwYWNlc1xuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZykge1xuXHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgY29uc3RhbnRzLmNsb3NpbmdCcmFja2V0cyArIGNvbnN0YW50cy5kZWdyZWUgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDJcIik7XG59XG5cblxuXG5mdW5jdGlvbiByZW1vdmVfc3BhY2VfYWZ0ZXJfcHVuY3R1YXRpb24oc3RyaW5nKSB7XG5cdHZhciBwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLm9wZW5pbmdCcmFja2V0cyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMVwiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIHJlbW92ZV90cmFpbGluZ19zcGFjZXMoc3RyaW5nKSB7XG5cdHJldHVybiBzdHJpbmcudHJpbSgpO1xufVxuXG5cblxuZnVuY3Rpb24gYWRkX3NwYWNlX2JlZm9yZV9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSkoW1wiICsgY29uc3RhbnRzLm9wZW5pbmdCcmFja2V0cyArIFwiXSkoW1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDIkM1wiKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGFkZF9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpIHtcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNlbnRlbmNlUHVuY3R1YXRpb24gKyBjb25zdGFudHMuY2xvc2luZ0JyYWNrZXRzICsgXCJdKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJldHVybiBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQyICQzXCIpO1xufVxuXG5cblxuLypcblx0UmVtb3ZlcyBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIHBhcmFncmFwaFxuXG5cdFRoaXMgY291bGQgYmUgZG9uZSB3aXRoIGEgb25lLWxpbmVyOlxuXHRyZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrL2dtLCBcIlwiKTtcblxuXHRIb3dldmVyLCBpdCBhbHNvIHJlbW92ZXMgZW1wdHkgbGluZXMuIFNpbmNlLCB3ZSB3YW50IHRvIGhhbmRsZSB0aGlzIGNoYW5nZVxuXHRzZXBhcmF0ZWx5LCB3ZSBuZWVkIHRvXG5cdFsxXSBzcGxpdCB0aGUgbGluZXMgbWFudWFsbHlcblx0WzJdIGFuZCByZW1vdmUgZXh0cmEgc3BhY2VzIGF0IHRoZSBiZWdpbmluZyBvZiBlYWNoIGxpbmVcblx0WzNdIGpvaW4gbGluZXMgdG9nZXRoZXIgdG8gYSBzaW5nbGUgc3RyaW5nXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIHJlbW92ZWQgc3BhY2VzIGF0IHRoZSBiZWdpbm5pbmcgb2YgcGFyYWdyYXBoc1xuKi9cbmZ1bmN0aW9uIHJlbW92ZV9zcGFjZXNfYXRfcGFyYWdyYXBoX2JlZ2lubmluZyhzdHJpbmcpIHtcblx0LyogWzFdIHNwbGl0IHRoZSBsaW5lcyBtYW51YWxseSAqL1xuXHR2YXIgbGluZXMgPSBzdHJpbmcuc3BsaXQoL1xccj9cXG4vKTtcblxuXHQvKiBbMl0gYW5kIHJlbW92ZSBleHRyYSBzcGFjZXMgYXQgdGhlIGJlZ2luaW5nIG9mIGVhY2ggbGluZSAqL1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGluZXNbaV0gPSBsaW5lc1tpXS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuXHR9XG5cblx0LyogWzNdIGpvaW4gbGluZXMgdG9nZXRoZXIgdG8gYSBzaW5nbGUgc3RyaW5nICovXG5cdHJldHVybiBsaW5lcy5qb2luKFwiXFxuXCIpO1xufVxuXG5cblxuLypcblx0Q29uc29saWRhdGVzIHRoZSB1c2Ugb2Ygbm9uLWJyZWFraW5nIHNwYWNlc1xuXG5cdCogcmVtb3ZlcyBjaGFyYWN0ZXJzIGJldHdlZW4gbXVsdGktY2hhcmFjdGVyIHdvcmRzXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIGNhcmRpbmFsIG51bWJlcnNcblx0KiBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYXJvdW5kIMOXXG5cdCogYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG5cblx0QHBhcmFtIHtzdHJpbmd9IHN0cmluZyDigJQgaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30g4oCUIG91dHB1dCB3aXRoIGNvcnJlY3RseSBwbGFjZWQgbm9uLWJyZWFraW5nIHNwYWNlXG4qL1xuZnVuY3Rpb24gY29uc29saWRhdGVfbmJzcChzdHJpbmcpIHtcblxuXHQvLyByZW1vdmVzIG5vbi1icmVha2luZyBzcGFjZXMgYmV0d2VlbiBtdWx0aS1jaGFyYWN0ZXIgd29yZHNcblx0dmFyIHBhdHRlcm4gPSBcIihbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdezIsfSkoW1wiKyBjb25zdGFudHMubmJzcCArIGNvbnN0YW50cy5uYXJyb3dOYnNwICtcIl0pKFtcIisgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl17Mix9KVwiO1xuXHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gIHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxICQzXCIpO1xuXHRzdHJpbmcgPSAgc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEgJDNcIik7IC8vY2FsbGluZyBpdCB0d2ljZSB0byBjYXRjaCBvZGQvZXZlbiBvY2N1cmVuY2VzXG5cblxuXHQvLyBhZGRzIG5vbi1icmVha2luZyBzcGFjZXMgYWZ0ZXIgY2FyZGluYWwgbnVtYmVyc1xuXHRwYXR0ZXJuID0gXCIoWzAtOV0rKSggKShbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArXCJdKylcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0dmFyIHJlcGxhY2VtZW50ID0gXCIkMVwiICsgY29uc3RhbnRzLm5ic3AgKyBcIiQzXCI7XG5cdHN0cmluZyA9ICBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFyb3VuZCDDl1xuXHRwYXR0ZXJuID0gXCIoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoW8OXXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0cmVwbGFjZW1lbnQgPSBjb25zdGFudHMubmJzcCArIFwiJDJcIiArIGNvbnN0YW50cy5uYnNwO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXG5cblx0Ly8gYWRkcyBub24tYnJlYWtpbmcgc3BhY2VzIGFmdGVyIHNpbmdsZS1jaGFyYWN0ZXIgcHJlcG9zaXRpb25zXG5cdHBhdHRlcm4gPSBcIihbwqAgXSkoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdfCYpKCApXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHJlcGxhY2VtZW50ID0gXCIkMSQyXCIgKyBjb25zdGFudHMubmJzcDtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTsgLy9jYWxsaW5nIGl0IHR3aWNlIHRvIGNhdGNoIG9kZC9ldmVuIG9jY3VyZW5jZXNcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgaW1wcm9wZXIgc3BhY2luZyBhcm91bmQgZWxsaXBzaXMgYW5kIGFwb3Npb3Blc2lzXG5cblx0RWxsaXBzaXMgKGFzIGEgY2hhcmFjdGVyKSBpcyB1c2VkIGZvciAyIGRpZmZlcmVudCBwdXJwb3Nlczpcblx0MS4gYXMgYW4gZWxsaXBzaXMgdG8gb21taXQgYSBwaWVjZSBvZiBpbmZvcm1hdGlvbiBkZWxpYmVyYXRlbHlcblx0Mi4gYXMgYW4gYXBvc2lvcGVzaXM7IGEgZmlndXJlIG9mIHNwZWVjaCB3aGVyZWluIGEgc2VudGVuY2UgaXNcblx0ZGVsaWJlcmF0ZWx5IGJyb2tlbiBvZmYgYW5kIGxlZnQgdW5maW5pc2hlZFxuXG5cdHNvdXJjZXNcblx0aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRWxsaXBzaXNcblx0aHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQXBvc2lvcGVzaXNcblx0aHR0cDovL3d3dy5saXRlZXJhLmN6L3Nsb3ZuaWsvdnlwdXN0a2FcblxuXHRBbGdvcml0aG1cblx0RWxsaXBzaXMgJiBBcG9zaW9wZXNpcyByZXF1aXJlIGRpZmZlcmVudCB1c2Ugb2Ygc3BhY2luZyBhcm91bmQgdGhlbSxcblx0dGhhdCBpcyB3aHkgd2UgYXJlIGNvcnJlY3Rpbmcgb25seSBmb2xsb3dpbmcgY2FzZXM6XG5cdGVycm9yczpcblx0WzFdIGNvcnJlY3Qgc3BhY2luZywgd2hlbiBlbGxpcHNpcyB1c2VkIHVzZWQgYXJvdW5kIGNvbW1hc1xuXHRbMl0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGhcblx0WzNdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2UgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoXG5cdFs0XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNlbnRlbmNlIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaFxuXHRbNV0gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgZW5kIG9mIHRoZSBzZW50ZW5jZSBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGhcblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggY29ycmVjdGVkIHNwYWNpbmcgYXJvdW5kIGFwb3Npb3Blc2lzXG4qL1xuZnVuY3Rpb24gY29ycmVjdF9zcGFjZXNfYXJvdW5kX2VsbGlwc2lzKHN0cmluZykge1xuXG5cdC8qIFsxXSBjb3JyZWN0IHNwYWNpbmcsIHdoZW4gZWxsaXBzaXMgdXNlZCB1c2VkIGFyb3VuZCBjb21tYXMgKi9cblx0dmFyIHBhdHRlcm4gPSBcIixbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdP1wiICsgY29uc3RhbnRzLmVsbGlwc2lzICsgXCJbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdPyxcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiwg4oCmLFwiKTtcblxuXG5cdC8qIFsyXSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBpbiB0aGUgbWlkZGxlIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIFwiXSkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoXCIgKyBjb25zdGFudHMuZWxsaXBzaXMgKyBcIltcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1bXCIgKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgKyBcIl0pXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBcIiQxJDNcIik7XG5cblxuXHQvKiBbM10gY29ycmVjdCBzcGFjaW5nIGZvciBhcG9zaW9wZXNpcyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZW50ZW5jZVxuXHRcdFx0XHQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgcGFyYWdyYXBoICovXG5cdHBhdHRlcm4gPSBcIihbXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIFwiXVtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl1cIiArIGNvbnN0YW50cy5lbGxpcHNpcyArXCIpKFtcIiArIGNvbnN0YW50cy5zcGFjZXMgKyBcIl0pKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgXCIkMSQzXCIpO1xuXG5cblx0LyogWzRdIGNvcnJlY3Qgc3BhY2luZyBmb3IgYXBvc2lvcGVzaXMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgc2VudGVuY2Vcblx0XHRcdFx0IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHBhcmFncmFwaCAqL1xuXHRwYXR0ZXJuID0gXCIoXuKApikoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXSkoW1wiICsgY29uc3RhbnRzLmxvd2VyY2FzZUNoYXJzICsgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICsgXCJdKVwiO1xuXHRyZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnbVwiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXG5cdC8qIFs1XSBjb3JyZWN0IHNwYWNpbmcgZm9yIGFwb3Npb3Blc2lzIGF0IHRoZSBlbmQgb2YgdGhlIHNlbnRlbmNlXG5cdFx0XHRcdCBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhZ3JhcGggKi9cblx0cGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy5zZW50ZW5jZVB1bmN0dWF0aW9uICsgXCJdKShbXCIgKyBjb25zdGFudHMuc3BhY2VzICsgXCJdKShcIiArIGNvbnN0YW50cy5lbGxpcHNpcyArIFwiKSg/IVsgXCIgKyBjb25zdGFudHMuc2VudGVuY2VQdW5jdHVhdGlvbiArIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArIGNvbnN0YW50cy51cHBlcmNhc2VDaGFycyArIFwiXSlcIjtcblx0cmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIFwiJDEkM1wiKTtcblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0Q29ycmVjdHMgYWNjaWRlbnRhbCB1cHBlcmNhc2VcblxuXHRCZXN0LWVmZm9ydCBmdW5jdGlvbiB0byBmaXggbW9zdCBjb21tb24gYWNjaWRlbnRhbCB1cHBlcmNhc2UgZXJyb3JzLCBuYW1lbHk6XG5cdFsxXSAyIGZpcnN0IHVwcGVyY2FzZSBsZXR0ZXJzIChpZS4gVVBwZXJjYXNlKVxuXHRbMl0gU3dhcHBlZCBjYXNlcyAoaWUuIHVQUEVSQ0FTRSlcblxuXHRBbGdvcml0aG0gZG9lcyBub3QgZml4IG90aGVyIHVwcGVyY2FzZSBldmVudHVhbGl0aWVzLFxuXHRlLmcuIG1peGVkIGNhc2UgKFVwcEVSY2FTZSkgYXMgdGhlcmUgYXJlIG1hbnkgY2FzZXMgZm9yIGNvcnBvcmF0ZSBicmFuZHNcblx0dGhhdCBjb3VsZCBwb3RlbnRpYWxseSBtYXRjaCB0aGUgYWxnb3JpdGhtIGFzIGZhbHNlIHBvc2l0aXZlLlxuXG5cdEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcg4oCUIGlucHV0IHRleHQgZm9yIGlkZW50aWZpY2F0aW9uXG5cdEByZXR1cm5zIHtzdHJpbmd9IOKAlCBvdXRwdXQgd2l0aCBjb3JyZWN0ZWQgYWNjaWRlbnRhbCB1cHBlcmNhc2VcbiovXG5mdW5jdGlvbiBjb3JyZWN0X2FjY2lkZW50YWxfdXBwZXJjYXNlKHN0cmluZykge1xuXG5cdC8qIFsxXSB0d28gZmlyc3QgdXBwZXJjYXNlIGxldHRlcnMgKGkuZS4gVVBwZXJjYXNlKSAqL1xuXHR2YXIgcGF0dGVybiA9IFwiW1wiKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXXsyLDJ9W1wiKyBjb25zdGFudHMubG93ZXJjYXNlQ2hhcnMgK1wiXStcIjtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0LyogWzIuMV0gU3dhcHBlZCBjYXNlcyAoMi1sZXR0ZXIgY2FzZXMsIGkuZS4gaVQpXG5cdFx0XHROb3RlIHRoYXQgdGhpcyBpcyBkaXZpZGVkIGludG8gMiBzZXBhcmF0ZSBjYXNlcyBhcyBcXGIgaW4gSmF2YVNjcmlwdCByZWdleFxuXHRcdFx0ZG9lcyBub3QgdGFrZSBub24tbGF0aW4gY2hhcmFjdGVycyBpbnRvIGEgY29zbmlkZXJhdGlvblxuXHQqL1xuXHRwYXR0ZXJuID0gXCJbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdW1wiKyBjb25zdGFudHMudXBwZXJjYXNlQ2hhcnMgK1wiXVxcXFxiXCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0LyogWzIuMl0gU3dhcHBlZCBjYXNlcyAobi1sZXR0ZXIgY2FzZXMsIGkuZS4gdVBQRVJDQVNFKSAqL1xuXHRwYXR0ZXJuID0gXCJbXCIrIGNvbnN0YW50cy5sb3dlcmNhc2VDaGFycyArXCJdK1tcIisgY29uc3RhbnRzLnVwcGVyY2FzZUNoYXJzICtcIl17Mix9XCI7XG5cdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCBmdW5jdGlvbihzdHJpbmcpe1xuXHRcdHJldHVybiAoc3RyaW5nLnN1YnN0cmluZygwLDEpICsgc3RyaW5nLnN1YnN0cmluZygxKS50b0xvd2VyQ2FzZSgpKTtcblx0fSk7XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRBYmJyZXZpYXRpb25zXG5cXCotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cbi8qXG5cdElkZW50aWZpZXMgZGlmZmVyZW50bHktc3BlbGxlZCBhYmJyZXZpYXRpb25zIGFuZCByZXBsYWNlcyBpdCB3aXRoXG5cdGEgdGVtcCB2YXJpYWJsZSwge3t0eXBvcG9fX1thYmJyXX19XG5cblx0SWRlbnRpZmllcyBnaXZlbiBhYmJyZXZpYXRpb25zOlxuXHRhLm0uLCBwLm0uLCBlLmcuLCBpLmUuXG5cblx0QWxnb3JpdGhtXG5cdFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuXG5cdFsyXSBJZGVudGlmeSBhLm0uLCBwLm0uIChkaWZmZXJlbnQgbWF0Y2ggdG8gYXZvaWQgZmFsc2UgcG9zaXRpdmVzIHN1Y2ggYXM6XG5cdFx0XHRJIGFtLCBIZSBpcyB0aGUgUE0uKVxuXHRbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb25cblx0QHJldHVybnMge3N0cmluZ30gY29ycmVjdGVkIG91dHB1dFxuKi9cbmZ1bmN0aW9uIGlkZW50aWZ5X2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZykge1xuXG5cdC8qIFsxXSBJZGVudGlmeSBlLmcuLCBpLmUuICovXG5cdHZhciBhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcIihcXFxcYltcIiArIGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIl1cXFxcLj9bXCIrIGNvbnN0YW50cy5zcGFjZXMgK1wiXT9bXCIgKyBhYmJyZXZpYXRpb25zW2ldWzFdICsgXCJdXFxcXC4/KShbXCIrIGNvbnN0YW50cy5zcGFjZXMgK1wiXT8pKFxcXFxiKVwiO1xuXHRcdC8vIGNvbnNvbGUubG9nKHBhdHRlcm4pO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnaVwiKTtcblx0XHR2YXIgcmVwbGFjZW1lbnQgPSBcInt7dHlwb3BvX19cIiArIGFiYnJldmlhdGlvbnNbaV0gKyBcIn19IFwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXG5cblxuXHQvKiBbMl0gSWRlbnRpZnkgYS5tLiwgcC5tLiAqL1xuXHRhYmJyZXZpYXRpb25zID0gW1wiYW1cIiwgXCJwbVwiXTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhYmJyZXZpYXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcIihcXFxcZCkoW1wiICsgY29uc3RhbnRzLnNwYWNlcyArIFwiXT8pKFxcXFxiW1wiICsgYWJicmV2aWF0aW9uc1tpXVswXSArIFwiXVxcXFwuP1tcIisgY29uc3RhbnRzLnNwYWNlcyArXCJdP1tcIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIl1cXFxcLj8pKFtcIisgY29uc3RhbnRzLnNwYWNlcyArXCJdPykoXFxcXGJ8XFxcXEIpXCI7XG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdpXCIpO1xuXHRcdHJlcGxhY2VtZW50ID0gXCIkMSB7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSBcIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblxuXHQvKiBbM10gRXhjbHVkZSBmYWxzZSBpZGVudGlmaWNhdGlvbnNcblx0XHQgUmVnZXggXFxiIGRvZXMgbm90IGNhdGNoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzIHNvIHdlIG5lZWQgdG8gZXhjbHVkZSBmYWxzZVxuXHRcdCBpZGVudGlmaWNhdGlvbnNcblx0Ki9cblx0YWJicmV2aWF0aW9ucyA9IFtcImVnXCIsIFwiaWVcIiwgXCJhbVwiLCBcInBtXCJdO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFiYnJldmlhdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHQvLyBub24tbGF0aW4gY2hhcmFjdGVyIGF0IHRoZSBiZWdpbm5pbmdcblx0XHR2YXIgcGF0dGVybiA9IFwiKFtcIiArIGNvbnN0YW50cy5ub25MYXRpbkNoYXJzICsgXCJdKSh7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSlcIjtcblx0XHR2YXIgcmUgPSBuZXcgUmVnRXhwKHBhdHRlcm4sIFwiZ1wiKTtcblx0XHRyZXBsYWNlbWVudCA9IFwiJDFcIiArIGFiYnJldmlhdGlvbnNbaV07XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmUsIHJlcGxhY2VtZW50KTtcblxuXHRcdC8vIG5vbi1sYXRpbiBjaGFyYWN0ZXIgYXQgdGhlIGVuZFxuXHRcdHBhdHRlcm4gPSBcIih7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fSApKFtcIiArIGNvbnN0YW50cy5ub25MYXRpbkNoYXJzICsgXCJdKVwiO1xuXHRcdHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0cmVwbGFjZW1lbnQgPSBhYmJyZXZpYXRpb25zW2ldICsgXCIkMlwiO1xuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlLCByZXBsYWNlbWVudCk7XG5cdH1cblxuXHRyZXR1cm4gc3RyaW5nO1xufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaWRlbnRpZmllZCB0ZW1wIGFiYnJldmlhdGlvbiB2YXJpYWJsZSBsaWtlIHt7dHlwb3BvX19lZ319LFxuXHR3aXRoIHRoZWlyIGFjdHVhbCByZXByZXNlbnRhdGlvblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvblxuXHRAcmV0dXJucyB7c3RyaW5nfSBjb3JyZWN0ZWQgb3V0cHV0XG4qL1xuZnVuY3Rpb24gcGxhY2VfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKSB7XG5cdHZhciBhYmJyZXZpYXRpb25zID0gW1wiZWdcIiwgXCJpZVwiLCBcImFtXCIsIFwicG1cIl07XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWJicmV2aWF0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBwYXR0ZXJuID0gXCJ7e3R5cG9wb19fXCIgKyBhYmJyZXZpYXRpb25zW2ldICsgXCJ9fVwiO1xuXHRcdHZhciByZSA9IG5ldyBSZWdFeHAocGF0dGVybiwgXCJnXCIpO1xuXHRcdHZhciByZXBsYWNlbWVudCA9IGFiYnJldmlhdGlvbnNbaV1bMF0gKyBcIi5cIiArIGFiYnJldmlhdGlvbnNbaV1bMV0gKyBcIi5cIjtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKlxcXG5cdEV4Y2VwdGlvbnNcblxcKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cbi8qXG5cdElkZW50aWZpZXMgZXhjZXB0aW9ucyB0aGF0IHdpbGwgYmUgb21taXRlZCBmcm9tIGNvcnJlY3Rpb24gb2YgYW55IHNvcnRcblxuXHRBbGdvcml0aG1cblx0WzFdIElkZW50aWZ5IGVtYWlsIGFkcmVzc2VzXG5cdFsyXSBJZGVudGlmeSB3ZWIgVVJMcyBhbmQgSVBzXG5cdFszXSBNYXJrIHRoZW0gYXMgdGVtcG9yYXJ5IGV4Y2VwdGlvbnMgaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX1cblxuXHRAcGFyYW0ge3N0cmluZ30gaW5wdXQgdGV4dCBmb3IgaWRlbnRpZmljYXRpb24gb2YgZXhjZXB0aW9uc1xuXHRAcmV0dXJucyB7c3RyaW5nfSDigJQgb3V0cHV0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19XG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfZXhjZXB0aW9ucyhzdHJpbmcpIHtcblxuXHQvKiBbMV0gSWRlbnRpZnkgZW1haWwgYWRyZXNzZXMgKi9cblx0aWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIGNvbnN0YW50cy5lbWFpbEFkZHJlc3NQYXR0ZXJuKTtcblxuXG5cdC8qIFsyXSBJZGVudGlmeSB3ZWIgVVJMcyBhbmQgSVBzICovXG5cdGlkZW50aWZ5X2V4Y2VwdGlvbl9zZXQoc3RyaW5nLCBjb25zdGFudHMud2ViVXJsUGF0dGVybik7XG5cblxuXHQvKiBbM10gTWFyayB0aGVtIGFzIHRlbXBvcmFyeSBleGNlcHRpb25zIGluIGZvcm1hdCB7e3R5cG9wb19fZXhjZXB0aW9uLVtpXX19ICovXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZXhjZXB0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciByZXBsYWNlbWVudCA9IFwie3t0eXBvcG9fX2V4Y2VwdGlvbi1cIiArIGkgKyBcIn19XCI7XG5cdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoZXhjZXB0aW9uc1tpXSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cbi8qXG5cdElkZW50aWZpZXMgc2V0IG9mIGV4Y2VwdGlvbnMgZm9yIGdpdmVuIHBhdHRlcm5cblx0VXNlZCBhcyBoZWxwZXIgZnVuY3Rpb24gZm9yIGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKVxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IGZvciBpZGVudGlmaWNhdGlvbiBvZiBleGNlcHRpb25zXG5cdEBwYXJhbSB7cGF0dGVybn0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm4gdG8gbWF0Y2ggZXhjZXB0aW9uXG4qL1xuZnVuY3Rpb24gaWRlbnRpZnlfZXhjZXB0aW9uX3NldChzdHJpbmcsIHBhdHRlcm4pIHtcblx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdHZhciBtYXRjaGVkX2V4Y2VwdGlvbnMgPSBzdHJpbmcubWF0Y2gocmUpO1xuXHRpZiAobWF0Y2hlZF9leGNlcHRpb25zICE9IG51bGwpIHtcblx0XHRleGNlcHRpb25zID0gZXhjZXB0aW9ucy5jb25jYXQobWF0Y2hlZF9leGNlcHRpb25zKTtcblx0fVxufVxuXG5cblxuLypcblx0UmVwbGFjZXMgaWRlbnRpZmllZCBleGNlcHRpb25zIHdpdGggcmVhbCBvbmVzIGJ5IGNoYW5nZSB0aGVpclxuXHR0ZW1wb3JhcnkgcmVwcmVzZW50YXRpb24gaW4gZm9ybWF0IHt7dHlwb3BvX19leGNlcHRpb24tW2ldfX0gd2l0aCBpdHNcblx0Y29ycmVzcG9uZGluZyByZXByZXNlbnRhdGlvblxuXG5cdEBwYXJhbSB7c3RyaW5nfSBpbnB1dCB0ZXh0IHdpdGggaWRlbnRpZmllZCBleGNlcHRpb25zXG5cdEByZXR1cm5zIHtzdHJpbmd9IG91dHB1dCB3aXRoIHBsYWNlZCBleGNlcHRpb25zXG4qL1xuZnVuY3Rpb24gcGxhY2VfZXhjZXB0aW9ucyhzdHJpbmcpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBleGNlcHRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHBhdHRlcm4gPSBcInt7dHlwb3BvX19leGNlcHRpb24tXCIgKyBpICsgXCJ9fVwiXG5cdFx0dmFyIHJlID0gbmV3IFJlZ0V4cChwYXR0ZXJuLCBcImdcIik7XG5cdFx0dmFyIHJlcGxhY2VtZW50ID0gZXhjZXB0aW9uc1tpXTtcblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZSwgcmVwbGFjZW1lbnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0cmluZztcbn1cblxuXG5cblxuXG5cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSpcXFxuXHRNYWluIHNjcmlwdFxuXFwqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblxuXG4vKlxuXHRDb3JyZWN0IHR5cG9zIGluIHRoZSBwcmVkZWZpbmVkIG9yZGVyXG5cblxuXHRAcGFyYW0ge3N0cmluZ30gc3RyaW5nIOKAlCBpbnB1dCB0ZXh0IGZvciBjb3JyZWN0aW9uXG5cdEBwYXJhbSB7bGFuZ3VhZ2V9IHN0cmluZyDigJQgbGFuZ3VhZ2Ugb3B0aW9uIHRvIGNvcnJlY3Qgc3BlY2lmaWMgdHlwb3M7IHN1cHBvcnRlZCBsYW5ndWFnZXM6IGVuLCBzaywgY3MsIHJ1ZS4gaWYgbm90IHNwZWNpZmllZCwgRW5nbGlzaCB0eXBvcyBhcmUgY29ycmVjdGVkXG5cdEBwYXJhbSB7cmVtb3ZlX2xpbmVzfSBib29sZWFuIOKAlCBvcHRpb25hbCBwYXJhbWV0ZXIgYWxsb3dpbmcgeW91IHRvIGNob29zZSB3aGV0aGVyIHRvIHJlbW92ZSBlbXB0eSBsaW5lcyBvciBub3Rcblx0QHJldHVybnMge3N0cmluZ30g4oCUIGNvcnJlY3RlZCBvdXRwdXRcbiovXG5leHBvcnQgZnVuY3Rpb24gY29ycmVjdF90eXBvcyhzdHJpbmcsIGxhbmd1YWdlLCBjb25maWd1cmF0aW9uKSB7XG5cdGxhbmd1YWdlID0gKHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJ1bmRlZmluZWRcIikgPyBcImVuXCIgOiBsYW5ndWFnZTtcblxuXHRjb25maWd1cmF0aW9uID0gKHR5cGVvZiBjb25maWd1cmF0aW9uID09PSBcInVuZGVmaW5lZFwiKSA/IHtcblx0XHRyZW1vdmVMaW5lcyA6IHRydWUsXG5cdH0gOiBjb25maWd1cmF0aW9uO1xuXG5cdHN0cmluZyA9IGlkZW50aWZ5X2V4Y2VwdGlvbnMoc3RyaW5nKTtcblx0c3RyaW5nID0gaWRlbnRpZnlfY29tbW9uX2FiYnJldmlhdGlvbnMoc3RyaW5nKTsgLy8gbmVlZHMgdG8gZ28gYmVmb3JlIHB1bmN0dWF0aW9uIGZpeGVzXG5cblx0c3RyaW5nID0gcmVwbGFjZV9zeW1ib2xzKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlcGxhY2VfcGVyaW9kc193aXRoX2VsbGlwc2lzKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9tdWx0aXBsZV9zcGFjZXMoc3RyaW5nKTtcblxuXG5cdHN0cmluZyA9IGNvcnJlY3RfZG91YmxlX3F1b3Rlc19hbmRfcHJpbWVzKHN0cmluZywgbGFuZ3VhZ2UpO1xuXHRzdHJpbmcgPSBjb3JyZWN0X3NpbmdsZV9xdW90ZXNfcHJpbWVzX2FuZF9hcG9zdHJvcGhlcyhzdHJpbmcsIGxhbmd1YWdlKTtcblxuXHRzdHJpbmcgPSBjb3JyZWN0X211bHRpcGxlX3NpZ24oc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZW1vdmVfc3BhY2VfYmVmb3JlX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZV9hZnRlcl9wdW5jdHVhdGlvbihzdHJpbmcpO1xuXHRzdHJpbmcgPSByZW1vdmVfdHJhaWxpbmdfc3BhY2VzKHN0cmluZyk7XG5cdHN0cmluZyA9IGFkZF9zcGFjZV9iZWZvcmVfcHVuY3R1YXRpb24oc3RyaW5nKTtcblx0c3RyaW5nID0gYWRkX3NwYWNlX2FmdGVyX3B1bmN0dWF0aW9uKHN0cmluZyk7XG5cdHN0cmluZyA9IHJlbW92ZV9zcGFjZXNfYXRfcGFyYWdyYXBoX2JlZ2lubmluZyhzdHJpbmcpO1xuXG5cdGlmKGNvbmZpZ3VyYXRpb24ucmVtb3ZlTGluZXMpIHtcblx0XHRzdHJpbmcgPSByZW1vdmVFbXB0eUxpbmVzKHN0cmluZyk7XG5cdH1cblxuXHRzdHJpbmcgPSBjb25zb2xpZGF0ZV9uYnNwKHN0cmluZyk7XG5cdHN0cmluZyA9IGNvcnJlY3Rfc3BhY2VzX2Fyb3VuZF9lbGxpcHNpcyhzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHJlcGxhY2VfaHlwaGVuX3dpdGhfZGFzaChzdHJpbmcsIGxhbmd1YWdlKTtcblx0c3RyaW5nID0gcmVwbGFjZV9kYXNoX3dpdGhfaHlwaGVuKHN0cmluZyk7XG5cblx0c3RyaW5nID0gY29ycmVjdF9hY2NpZGVudGFsX3VwcGVyY2FzZShzdHJpbmcpO1xuXG5cdHN0cmluZyA9IHBsYWNlX2NvbW1vbl9hYmJyZXZpYXRpb25zKHN0cmluZyk7IC8vIG5lZWRzIHRvIGdvIGFmdGVyIHB1bmN0dWF0aW9uIGZpeGVzXG5cdHN0cmluZyA9IHBsYWNlX2V4Y2VwdGlvbnMoc3RyaW5nKTtcblxuXHRzdHJpbmcgPSByZXBsYWNlX3BlcmlvZHNfd2l0aF9lbGxpcHNpcyhzdHJpbmcpO1xuXG5cdHJldHVybiBzdHJpbmc7XG59XG4iXX0=

//# sourceMappingURL=maps/typopo.built.js.map
