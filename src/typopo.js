/*!
 * Typopo 1.3.0
 *
 * Copyright 2015-17 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2017-01-08
 */


(function () {

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
	"\\-\\+": "±",
};

var lowercase_chars_en_sk_cz_rue = "a-záäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюях";
var uppercase_chars_en_sk_cz_rue = "A-ZÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯХ";
var single_quote_adepts = "‚|'|‘|’|‛|′|‹|›";
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
var web_url_pattern = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)" +
                      "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_" +
                      "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?" +
                      "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+" +  // named host
                      "(?:" + // plus top level domain
                      "(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])" +
                      "|(?:biz|b[abdefghijmnorstvwyz])" +
                      "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])" +
                      "|d[ejkmoz]" +
                      "|(?:edu|e[cegrstu])" +
                      "|f[ijkmor]" +
                      "|(?:gov|g[abdefghilmnpqrstuwy])" +
                      "|h[kmnrtu]" +
                      "|(?:info|int|i[delmnoqrst])" +
                      "|(?:jobs|j[emop])" +
                      "|k[eghimnrwyz]" +
                      "|l[abcikrstuvy]" +
                      "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])" +
                      "|(?:name|net|n[acefgilopruz])" +
                      "|(?:org|om)" +
                      "|(?:pro|p[aefghklmnrstwy])" +
                      "|qa" +
                      "|r[eouw]" +
                      "|s[abcdeghijklmnortuvyz]" +
                      "|(?:tel|travel|t[cdfghjklmnoprtvwz])" +
                      "|u[agkmsyz]" +
                      "|v[aceginu]" +
                      "|w[fs]" +
                      "|y[etu]" +
                      "|z[amw]))" +
                      "|(?:(?:25[0-5]|2[0-4]" + // or ip address
                      "[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]" +
                      "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]" +
                      "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}" +
                      "|[1-9][0-9]|[0-9])))" +
                      "(?:\\:\\d{1,5})?)" + // plus option port number +
                      "(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~" + // plus option query params
                      "\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?" +
                      "(?:\\b|$)"; // and finally, a word boundary or end of
                                     // input.  This is to stop foo.sure from
                                     // matching as foo.su



var email_address_pattern = "[a-zA-Z0-9\\+\\.\\_\\%\\-]{1,256}" +
            "\\@" +
            "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}" +
            "(" +
                "\\." +
                "[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25}" +
            ")+";

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
	var pattern = "([" + sentence_punctuation + "])("+ double_quote_adepts + ")([" + sentence_punctuation + "])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$2");

	/* [1] Swap right double quote adepts with a terminal punctuation */
	pattern = "("+ double_quote_adepts + ")([" + terminal_punctuation + "])";
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
	var contraction_examples = "em|cause|twas|tis|til|round"
	pattern = "(" + single_quote_adepts + ")(" + contraction_examples + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "{{typopo__apostrophe}}$2");


	/* [1.3] Identify in-word contractions,
					 e.g. Don’t, I’m, O’Doole, 69’ers */
	var character_adepts = "0-9" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue;
	pattern = "(["+ character_adepts +"])(" + single_quote_adepts + ")(["+ character_adepts +"])";
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
	string = string.replace(re, function($0, $1, $2, $3){

		//identify {{typopo__left-single-quote--adept}}
		var pattern = "( )(" + single_quote_adepts + ")(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{{typopo__left-single-quote--adept}}$3");

		//identify {{typopo__right-single-quote--adept}}
		pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])([\.,!?])?(" + single_quote_adepts + ")([ ]|[\.,!?])";
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



function replace_dash_with_hyphen(string){
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue +"])([–—])(["+ lowercase_chars_en_sk_cz_rue +"])";
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
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([" + opening_brackets + "])(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}



function add_space_after_punctuation(string) {
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([" + sentence_punctuation + closing_brackets + "])(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}



function remove_spaces_at_paragraph_beginning(string) {
	var lines = string.match(/[^\r\n]+/g);
	var lines_count = lines.length;

	for (var i = 0; i < lines_count; i++) {
		lines[i] = lines[i].replace(/^\s+/, "");
	}

	return lines.join("\n");
}



/*
	Consolidates the use of non-breaking spaces

	* adds non-breaking spaces after single-character prepositions
	* adds non-breaking spaces after numerals
	* adds non-breaking spaces around ×
	* removes characters between multi-character words

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
function consolidate_nbsp(string) {
	// removes non-breaking spaces between multi-character words
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"]{2,})(["+ nbsp + narrow_nbsp +"])(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"]{2,})";
	var re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences


	// adds non-breaking spaces after numerals
	pattern = "([0-9]+)( )(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"]+)";
	re = new RegExp(pattern, "g");
	var replacement = "$1" + nbsp + "$3";
	string =  string.replace(re, replacement);


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
	pattern = "([" + sentence_punctuation + "][" + spaces + "]" + ellipsis +")([" + spaces + "])([" + lowercase_chars_en_sk_cz_rue +"])";
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
	Changes small letters at the beginning of the sentence to upper case

	Comments
	[1] Note that "{" in regex is to catch variables in curly brackets that
	may appear at the beginning of the sentence. It is to prevent capitalization
	of the next letter which in this case would be a variable name

	@param {string} input text for identification
	@returns {string} output with capitalized first letter of each sentence
*/
function start_sentence_w_capital_letter(string) {
	// Correct capital letter in the first sentence of the paragraph
	var lines = string.match(/[^\r\n]+/g);
	var lines_count = lines.length;
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"{])(.+?)([" +ellipsis + terminal_punctuation +"])"; //[1], [2]
	var re = new RegExp(pattern);

	for (var i = 0; i < lines_count; i++) {
		lines[i] = lines[i].replace(re, function($0, $1, $2, $3){
			return $1.toUpperCase() + $2 + $3;
		});
	}

	string = lines.join("\n");

	// Correct sentence case in the middle of the string
	// find all lowercase letters after sentence punctuation, then replace them
	// with uppercase variant by calling another replace function
	// Exceptions: dates, numerical values
	pattern = "([^0-9])([" + terminal_punctuation + "][" + spaces + "])(["+ lowercase_chars_en_sk_cz_rue +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function($0, $1, $2, $3){
			return $1 + $2 + $3.toUpperCase();
	});

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
	var pattern = "["+ uppercase_chars_en_sk_cz_rue +"]{2,2}["+ lowercase_chars_en_sk_cz_rue +"]+";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
	});

	/* [2.1] Swapped cases (2-letter cases, i.e. iT)
			Note that this is divided into 2 separate cases as \b in JavaScript regex
			does not take non-latin characters into a cosnideration
	*/
	pattern = "["+ lowercase_chars_en_sk_cz_rue +"]["+ uppercase_chars_en_sk_cz_rue +"]\\b";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
	});

	/* [2.2] Swapped cases (n-letter cases, i.e. uPPERCASE) */
	pattern = "["+ lowercase_chars_en_sk_cz_rue +"]+["+ uppercase_chars_en_sk_cz_rue +"]{2,}";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
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

	@param {string} input text for identification
	@returns {string} corrected output
*/
function identify_common_abbreviations(string) {

	/* [1] Identify e.g., i.e. */
	var abbreviations = ["eg", "ie"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\b[" + abbreviations[i][0] + "]\\.?["+ spaces +"]?[" + abbreviations[i][1] + "]\\.?)(["+ spaces +"]?)(\\b)";
		var re = new RegExp(pattern, "gi");
		replacement = "{{typopo__" + abbreviations[i] + "}} ";
		string = string.replace(re, replacement);
	}


	/* [2] Identify a.m., p.m. */
	abbreviations = ["am", "pm"];
	for (var i = 0; i < abbreviations.length; i++) {
		var pattern = "(\\d)([" + spaces + "]?)(\\b[" + abbreviations[i][0] + "]\\.?["+ spaces +"]?[" + abbreviations[i][1] + "]\\.?)(["+ spaces +"]?)(\\b|\\B)";
		var re = new RegExp(pattern, "gi");
		replacement = "$1 {{typopo__" + abbreviations[i] + "}} ";
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
		replacement = abbreviations[i][0] + "." + abbreviations[i][1] + ".";
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


	@param {string} input text for correction
	@param {language} language option to correct specific typos; supported languages: en, sk, cs, rue. if not specified, English typos are corrected
	@returns {string} — corrected output
*/
function correct_typos(string, language) {
	language = (typeof language === "undefined") ? "en" : language;

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
	string = consolidate_nbsp(string);
	string = correct_spaces_around_ellipsis(string);

	string = replace_hyphen_with_dash(string, language);
	string = replace_dash_with_hyphen(string);

	string = start_sentence_w_capital_letter(string);
	string = correct_accidental_uppercase(string);

	string = place_common_abbreviations(string); // needs to go after punctuation fixes
	string = place_exceptions(string);

	string = replace_periods_with_ellipsis(string);

	return string;
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined")
	module.exports = correct_typos;
else
	window.correct_typos = correct_typos;

})();
