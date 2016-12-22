/*!
 * Typopo 1.0.6
 *
 * Copyright 2015-16 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2016-12-04
 */


(function(){

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
var sentence_punctuation = "\,\.\!\?\:\;"; // there is no ellipsis in the set as it is being used throughout a sentence in the middle. Rethink this group to split it into end-sentence punctuation and middle sentence punctuation
var ellipsis = "…";






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
	return string.replace(/\.{2,}/g, "…");
}



function remove_multiple_spaces(string) {
	return string.replace(/ {2,}/g, " ");
}



function correct_double_quotes(string, language) {
	var pattern = "(" + double_quote_adepts + ")(.*?)(" + double_quote_adepts + ")";
	var re = new RegExp(pattern, "g");

	switch (language) {
	case "rue":
		return string.replace(re, "«$2»");
	case "sk":
	case "cs":
		return string.replace(re, "„$2“");
	case "en":
		return string.replace(re, "“$2”");
	}
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
	[1] Swap right double quote adepts with a punctuation
	    (this comes first as it is a quite common mistake that may eventually
		  lead to improper identification of double primes)
	[2] Identify inches, arcseconds, seconds
	[3] Identify closed double quotes
	[4] Identify the rest as unclosed double quotes (best-effort replacement)
	[5] Fix spacing around quotes and primes
	[6] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language option
	@returns {string} output with properly replaces double qoutes and double primes
*/
function correct_double_quotes_and_primes(string, language) {

	/* [1] Swap right double quote adepts with a punctuation */
	var pattern = "("+ double_quote_adepts + ")([\.,!?])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, '$2$1');


	/* [2] Identify inches, arcseconds, seconds */
	string = string.replace(/(\d ?)(“|”|\"|″|‘{2,}|’{2,}|'{2,}|′{2,})/g, "$1{typopo__double-prime}");


	/* [3] Identify closed double quotes */
	pattern = "(" + double_quote_adepts + ")(.*?)(" + double_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{typopo__left-double-quote}$2{typopo__right-double-quote}");


	/* [4.1] Identify unclosed left double quote */
	pattern = "(" + double_quote_adepts + ")([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{typopo__left-double-quote}$2");


	/* [4.2] Identify unclosed right double quote */
	pattern = "([" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + sentence_punctuation + ellipsis + "])(" + double_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{typopo__right-double-quote}");


	/* [4.3] Remove remaining unidentified double quote */
	pattern = "([" + spaces + "])(" + double_quote_adepts + ")([" + spaces + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");


	/* [5] Fix spacing around quotes and prime */
	string = string.replace(/({typopo__left-double-quote})( )/g, "$1");
	string = string.replace(/( )({typopo__right-double-quote})/g, "$2");
	string = string.replace(/( )({typopo__double-prime})/g, "$2");


	/* [6] Punctuation replacement */
	string = string.replace(/({typopo__double-prime})/g, "″");

	switch (language) {
		case "rue":
			string = string.replace(/({typopo__left-double-quote})/g, "«");
			string = string.replace(/({typopo__right-double-quote})/g, "»");
		case "sk":
		case "cs":
			string = string.replace(/({typopo__left-double-quote})/g, "„");
			string = string.replace(/({typopo__right-double-quote})/g, "“");
		case "en":
			string = string.replace(/({typopo__left-double-quote})/g, "“");
			string = string.replace(/({typopo__right-double-quote})/g, "”");
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
	[1] Identify feet, arcminutes, minutes
	[2] Identify common apostrohe contractions
	[3] Identify single quotes
	[4] Identify residual apostrophes that have left
	[5] Swap right single quote adepts with a puntuation
			(not primes or apostrohes)
	?[6] Fix spacing around quotes, primes and apostrophes
	[7] Replace all identified punctuation with appropriate punctuation in
	    given language

	@param {string} string — input text for identification
	@param {string} language — language options
	@returns {string} — corrected output
*/
function correct_single_quotes_primes_and_apostrophes(string, language) {

	// /* [1] Identify feet, arcminutes, minutes */
	string = string.replace(/(\d)( ?)('|‘|’|‛|′)/g, "$1{typopo__single-prime}");


	/* [2.2] Identify ’n’ contractions */
	var pattern = "(" + single_quote_adepts + ")(n)(" + single_quote_adepts + ")";
	var re = new RegExp(pattern, "gi");
	string = string.replace(re, "{typopo__apostrophe}$2{typopo__apostrophe}");


	/* [2.2] Identify common contractions at the beginning or at the end
					 of the word, e.g. Fish ’n’ Chips, ’em, ’cause,… */
	var contraction_examples = "em|cause|twas|tis|til|round"
	pattern = "(" + single_quote_adepts + ")(" + contraction_examples + ")";
	re = new RegExp(pattern, "gi");
	string = string.replace(re, "{typopo__apostrophe}$2");


	/* [2.3] Identify in-word contractions,
					 e.g. Don’t, I’m, O’Doole, 69’ers */
	var character_adepts = "0-9" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue;
	pattern = "(["+ character_adepts +"])(" + single_quote_adepts + ")(["+ character_adepts +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{typopo__apostrophe}$3");


	/* [2.4] Identify year contractions
		 e.g. ’70s, INCHEBA ’89,… */
	pattern = "(" + single_quote_adepts + ")([0-9]{2})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{typopo__apostrophe}$2");


	/* [3] Identify single quotes within double quotes */
	pattern = "(" + double_quote_adepts + ")(.*?)(" + double_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function($0, $1, $2, $3){

		//identify {typopo__left-single-quote--adept}
		var pattern = "( )(" + single_quote_adepts + ")(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{typopo__left-single-quote--adept}$3");

		//identify {typopo__right-single-quote--adept}
		pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])([\.,!?])?(" + single_quote_adepts + ")([ ]|[\.,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{typopo__right-single-quote--adept}$4");

		//identify single quote pairs
		pattern = "({typopo__left-single-quote--adept})(.*?)({typopo__right-single-quote--adept})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{typopo__left-single-quote}$2{typopo__right-single-quote}");

		return $1 + $2 + $3;
	});


	/* [4] Identify residual apostrophes that have left */
	pattern = "(" + single_quote_adepts + ")";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{typopo__apostrophe}");


	/* [5] Swap right single quote adepts with a puntuation */
	pattern = "({typopo__right-single-quote})([\.,!?])";
	re = new RegExp(pattern, "g");
	string =  string.replace(re, '$2$1');


	/* [7] Punctuation replacement */
	string = string.replace(/({typopo__single-prime})/g, "′");
	string = string.replace(/{typopo__apostrophe}|{typopo__left-single-quote--adept}|{typopo__right-single-quote--adept}/g, "’");

	switch (language) {
	case "rue":
		string = string.replace(/{typopo__left-single-quote}/g, "‹");
		string = string.replace(/{typopo__right-single-quote}/g, "›");
		break;
	case "sk":
	case "cs":
		string = string.replace(/{typopo__left-single-quote}/g, "‚");
		string = string.replace(/{typopo__right-single-quote}/g, "‘");
		break;
	case "en":
		string = string.replace(/{typopo__left-single-quote}/g, "‘");
		string = string.replace(/{typopo__right-single-quote}/g, "’");
	}

	return string;
}



function swap_quotes_and_punctuation(string) {
	var pattern = "("+ double_quote_adepts + "|" +  single_quote_adepts +")([\.,!?])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, '$2$1');
}



function correct_multiple_sign(string) {
	return remove_multiple_spaces(string.replace(/([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, "$1 × $3"));
}



function replace_hyphen_with_dash(string) {
	// replace 3 hyphens with em dash
	string = string.replace(/(---)/g, "—");

	// replace 2 hyphens with en dash
	string = string.replace(/(--)/g, "–");

	//replace en dash with em dash, when appropriate and set proper spacing
	var pattern = "[" + spaces + "][-|–|—][" + spaces + "]";
	var re = new RegExp(pattern, "g");
	var replacement = narrow_nbsp + "—" + hair_space;
	string = string.replace(re, replacement);

	return string;
}



function replace_dash_with_hyphen(string){
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue +"])([–—])(["+ lowercase_chars_en_sk_cz_rue +"])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1-$3");
}



function remove_space_before_punctuation(string) {
	return string.replace(/([ ])([\,\.\!\?\:\;\)\]\}])/g, "$2");
}



function remove_space_after_punctuation(string) {
	return string.replace(/([\(\[\{])([ ])/g, "$1");
}

function remove_trailing_spaces(string) {
	return string.trim();
}



function add_space_before_punctuation(string) {
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([\(])(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1 $2$3");
}



function add_space_after_punctuation(string) {
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])([\,\.\!\?\:\;\)])(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "$1$2 $3");
}




function remove_space_after_double_quotes(string, language) {
	switch (language) {
	case "rue":
		return string.replace(/([«])([ ])/g, "$1");
	case "sk":
	case "cs":
		return string.replace(/([„])([ ])/g, "$1");
	case "en":
		return string.replace(/([“])([ ])/g, "$1");
	}
}



function remove_space_before_double_quotes(string, language) {
	switch (language) {
	case "rue":
		return string.replace(/([ ])([»])/g, "$2");
	case "sk":
	case "cs":
		return string.replace(/([ ])([“])/g, "$2");
	case "en":
		return string.replace(/([ ])([”])/g, "$2");
	}
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
	var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"{])(.+?)([…\\.\\?\\!])"; //[1]
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
	pattern = "([^0-9])([\\.\\?\\!] )(["+ lowercase_chars_en_sk_cz_rue +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, function($0, $1, $2, $3){
			return $1 + $2 + $3.toUpperCase();
	});

	return string;
}



function correct_accidental_uppercase(string) {
	// var pattern = "[a-z]+[a-zA-Z]+[A-Z]+|[A-Z]+[a-zA-Z]+[a-z]+|[a-z]+[a-zA-Z]+[a-z]+";
	var pattern = "["+ lowercase_chars_en_sk_cz_rue +"]+["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"]+["+ uppercase_chars_en_sk_cz_rue +"]+|["+ uppercase_chars_en_sk_cz_rue +"]+["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"]+["+ lowercase_chars_en_sk_cz_rue +"]+|["+ lowercase_chars_en_sk_cz_rue +"]+["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"]+["+ lowercase_chars_en_sk_cz_rue +"]+";
	var re = new RegExp(pattern, "g");
	return string.replace(re, function(string){
		return (string.substring(0,1) + string.substring(1).toLowerCase());
	});
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
	Identifies common use of apostrophes in a text and replaces them with {typopo-apostrophe}

	People use various characters for apostrophe, we’re going to identify the following — '‘’‛
	By common use of apostrophe, we mean an apostrophe that cannot be mistaken with a right single quote, just because of nature of it’s placement.

	Examples of common use of apostrophe:
	Don’t, I’m (or other in-word ommision)
	Fish ’n’ Chips (or other example of shortening —and—)
	O’Doole (or other example of name)
	’70s (or other year)
	69’ers

	Examples of apostrophe use that we are NOT covering with this identification algorithm (and they’ll be identified with certain probability in some other function)
	hers’  (when apostrophe is placed at the end of the word, it can be mistaken for single right quote)
	’bout  (when apostrophe is placed at the beginning of the word, it can be mistaken for single left quote)

	@param {string} string — input text for identification
	@returns {string} — output with identified apostrophes
*/
function identify_common_apostrophes(string) {
	//string for testing: fish 'n' chips 69'ers don't '70s")

	// identify
	// Fish ’n’ Chips and alike
	var pattern = "(" + single_quote_adepts + ")([nN])(" + single_quote_adepts + ")";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "{typopo-apostrophe}$2{typopo-apostrophe}");

	// identify
	// Don’t, I’m (or other in-word omission)
	// O’Doole (or other example of name)
	// 69’ers
	pattern = "([0-9"+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])(" + single_quote_adepts + ")([0-9"+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1{typopo-apostrophe}$3");

	//identify
	//’70s (or other year)
	//INCHEBA ’89
	pattern = "(" + single_quote_adepts + ")([0-9]{2})";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{typopo-apostrophe}$2");

	return string;
}



/*
	Identifies single quotes that may be used within double quotes and replace them with identifiers

	Identifiers
	{typopo-left-single-quote--adept}
	{typopo-left-single-quote}
	{typopo-right-single-quote--adept}
	{typopo-right-single-quote}

	@param {string} string — input text for identification
	@returns {string} — output with identified single quotes
*/
function identify_single_quotes(string) {
	//for text within double quotes
	var pattern = "(" + double_quote_adepts + ")(.*?)(" + double_quote_adepts + ")";
	var re = new RegExp(pattern, "g");
	return string.replace(re, function($0, $1, $2, $3){

		//identify {typopo-left-single-quote--adept}
		var pattern = "( )(" + single_quote_adepts + ")(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])";
		var re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1{typopo-left-single-quote--adept}$3");

		//identify {typopo-right-single-quote--adept}
		pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])([\.,!?])?(" + single_quote_adepts + ")([ ]|[\.,!?])";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "$1$2{typopo-right-single-quote--adept}$4");

		//identify single quote pairs
		pattern = "({typopo-left-single-quote--adept})(.*?)({typopo-right-single-quote--adept})";
		re = new RegExp(pattern, "g");
		$2 = $2.replace(re, "{typopo-left-single-quote}$2{typopo-right-single-quote}");

		return $1 + $2 + $3;
	});

}



/*
	Identifies residual apostrophes that remained in text after identifying common apostrophes and single quotes

	@param {string} string — input text for identification
	@returns {string} — output with identified apostrophes
*/
function identify_residual_apostrophes(string) {
	var pattern = "(" + single_quote_adepts + ")";
	var re = new RegExp(pattern, "g");
	return string.replace(re, "{typopo-apostrophe}");
}



/*
	Corrects improper spacing around aposiopesis
	Due to the fact that ellipsis character is being used both as an ellipsis and as an aposiopesis, we are able to auto-correct these scenarios:
	[1] remove space before aposiopesis, that is ending a sentence
	[2] remove space when aposiopesis is used at the beginning of the sentence

	@param {string} string — input text for identification
	@returns {string} — output with identified apostrophes
*/
function correct_spaces_around_aposiopesis(string) {
	/*[1] catching ending sentences in the middle of the paragraph*/
	var pattern = "([" + lowercase_chars_en_sk_cz_rue + "])( )(… [" + uppercase_chars_en_sk_cz_rue + "])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/*[1] catching ending sentences at the end of the paragraph*/
	pattern = "([" + lowercase_chars_en_sk_cz_rue +"])( )(…)(?![ " + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	/*[2]*/
	pattern = "([\.\?\!] …)( )([" + lowercase_chars_en_sk_cz_rue +"])";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "$1$3");

	return string;
}



/*
	Identifies intended use of apostrophes and single quotes and adjusts them accordingly.

	Assumptions (that author will use quotes in the following manner):
	* Double quotes are used in pairs
	* Single quotes are used in pairs
	* Single quotes are used as secondary (ie. within double quotes, which is a convention for currently supported languages — en-US, sk, cs, rue — https://en.wikipedia.org/wiki/Quotation_mark#Summary_table_for_various_languages)
	* Single quotes are used with proper spacing, eg. _'word-beginning, word-end'_
		* Wrong intention that algorithm won’t be able to identify effectively, eg. _'_word-beginning, word-end_'_

	Algorithm
	* identify common apostrophes
	* for text within double quotes
		* identify all left-single quote and right-single-quote adepts
		* identify single quote pairs
	* identify the rest of apostrophes
	* replace identified characters accordingly

	@param {string} string — input text for identification
	@param {string} language — language options
	@returns {string} — corrected output
*/
function correct_single_quotes_and_apostrophes(string, language) {
	string = identify_common_apostrophes(string);
	string = identify_single_quotes(string);
	string = identify_residual_apostrophes(string);

	//replace all identified apostrophes and quote adepts with apostrophes
	string = string.replace(/{typopo-apostrophe}|{typopo-left-single-quote--adept}|{typopo-right-single-quote--adept}/g, "’");

	//replace all identified quotes with appropriate quotes
	switch (language) {
	case "rue":
		string = string.replace(/{typopo-left-single-quote}/g, "‹");
		string = string.replace(/{typopo-right-single-quote}/g, "›");
		break;
	case "sk":
	case "cs":
		string = string.replace(/{typopo-left-single-quote}/g, "‚");
		string = string.replace(/{typopo-right-single-quote}/g, "‘");
		break;
	case "en":
		string = string.replace(/{typopo-left-single-quote}/g, "‘");
		string = string.replace(/{typopo-right-single-quote}/g, "’");
	}

	return string;
}



/*
	Sets proper spacing, when ellipsis used used around commas

	@param {string} string — input text for identification
	@returns {string} — corrected output
*/

function space_ellispsis_around_commas(string) {
	return string.replace(/, ?… ?,/g, ", …,");
}



/*
	Identifies differently-spelled e.g. and i.e. and replaces it with {eg}, {ie}

	@param {string} input text for identification
	@returns {string} corrected output
*/
function identify_eg_ie(string) {
	var pattern = "\\b[eE]\\.?["+ spaces +"]?[gG]\\.?["+ spaces +"]?[^" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "]";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "{eg}");

	pattern = "\\b[iI]\\.?["+ spaces +"]?[eE]\\.?["+ spaces +"]?[^" + lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue + "]";
	re = new RegExp(pattern, "g");
	string = string.replace(re, "{ie}");

	return string;
}



/*
	Replaces {eg}, {ie} wiht e.g., i.e.

	@param {string} input text for identification
	@returns {string} corrected output
*/
function place_eg_ie(string) {
	string = string.replace(/{eg}/g, "e.g." + nbsp);
	string = string.replace(/{ie}/g, "i.e." + nbsp);
	return string;
}



/*
	Removes extra punctuation

	People tend to type in unnecessary punctuation, here are the observed cases:
	[1] extra comma after punctuation in direct speech, e.g. "“Hey!,” she said"

	@param {string} input text for correction
	@returns {string} — corrected output
*/
function remove_extra_punctuation(string) {
	// [1]
	var pattern = "([" + sentence_punctuation + "])([\,])";
	var re = new RegExp(pattern, "g");
	string = string.replace(re, "$1")

	return string;
}



/*
	Correct typos in the predefined order


	@param {string} input text for correction
	@param {language} language option to correct specific typos; supported languages: en, sk, cs, rue. if not specified, English typos are corrected
	@returns {string} — corrected output
*/
function correct_typos(string, language) {
	language = (typeof language === "undefined") ? "en" : language;

	string = replace_symbols(string, essential_set);
	string = replace_periods_with_ellipsis(string);

	// string = correct_double_quotes(string, language);
	string = correct_double_quotes_and_primes(string, language);
	// string = correct_single_quotes_and_apostrophes(string, language);
	string = correct_single_quotes_primes_and_apostrophes(string, language);
	// string = swap_quotes_and_punctuation(string);

	// string = remove_space_after_double_quotes(string, language);
	// string = remove_space_before_double_quotes(string, language);

	/*
		# Suggested order for the new function correct_quotes()

* ? add nbsp between minutes and seconds

	*/


	// needs to go before punctuation fixes
	string = identify_eg_ie(string);


	string = correct_multiple_sign(string);

	string = remove_multiple_spaces(string);
	string = remove_space_before_punctuation(string);
	string = remove_space_after_punctuation(string);
	string = remove_trailing_spaces(string);
	string = add_space_before_punctuation(string);
	string = add_space_after_punctuation(string);
	string = remove_spaces_at_paragraph_beginning(string);
	string = consolidate_nbsp(string);
	string = space_ellispsis_around_commas(string);
	string = correct_spaces_around_aposiopesis(string);

	string = remove_extra_punctuation(string);

	string = replace_hyphen_with_dash(string);
	string = replace_dash_with_hyphen(string);

	string = start_sentence_w_capital_letter(string);
	string = correct_accidental_uppercase(string);

	// placing identified e.g., i.e. after punctuation fixes
	string = place_eg_ie(string);

	return string;
}

	if (typeof module !== "undefined" && typeof module.exports !== "undefined")
		module.exports = correct_typos;
	else
		window.correct_typos = correct_typos;

})();
