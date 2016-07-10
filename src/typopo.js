/*!
 * Typopo 1.0.2
 *
 * Copyright 2015-16 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2016-07-10
 */

(function(){
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
var single_quote_adepts = "‚'‘’‛";
var double_quote_adepts = "[„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,}";

function replace_symbols(string, replacement_set) {
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
		case "sk":
		case "cs":
			return string.replace(re, "„$2“");
			case "en":
				return string.replace(re, "“$2”");
	}
}



function swap_quotes_and_punctuation(string) {
		//once we'll support single quotes
		return string.replace(/([“‘’”])([\.,!?])/g, '$2$1');
		// return string.replace(/([“”])([\.,!?])/g, "$2$1");
}



function correct_multiple_sign(string) {
		return remove_multiple_spaces(string.replace(/([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, "$1 × $3"));
}



function replace_hyphen_with_dash(string) {
		return string.replace(/( [-|–] )/g, " — ");
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



function start_sentence_w_capital_letter(string) {
		// Correct sentence for the first initial sentence
		var lines = string.match(/[^\r\n]+/g);
		var lines_count = lines.length;
		var pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])(.+?)([…\\.\\?\\!])";
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

function replace_with_nbsp(string) {
		var pattern = "([  ])([aviuoszkAVIUOSZKавіуосзкюяАВІУОСЗКЮЯ]|&)( )";
		var re = new RegExp(pattern, "g");
		string = string.replace(re, "$1$2 "); //call it twice, for odd and even occurences
		return string.replace(re, "$1$2 ");
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
		var pattern = "([" + single_quote_adepts + "])([nN])([" + single_quote_adepts + "])";
		var re = new RegExp(pattern, "g");
		string = string.replace(re, "{typopo-apostrophe}$2{typopo-apostrophe}");

		// identify
		// Don’t, I’m (or other in-word ommision)
		// O’Doole (or other example of name)
		// 69’ers
		pattern = "([0-9"+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])([" + single_quote_adepts + "])([0-9"+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])";
		re = new RegExp(pattern, "g");
		string = string.replace(re, "$1{typopo-apostrophe}$3");

		//identify
		//’70s (or other year)
		//INCHEBA ’89
		pattern = "([" + single_quote_adepts + "])([0-9]{2})";
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
				var pattern = "( )([" + single_quote_adepts + "])(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])";
				var re = new RegExp(pattern, "g");
				$2 = $2.replace(re, "$1{typopo-left-single-quote--adept}$3");

				//identify {typopo-right-single-quote--adept}
				pattern = "(["+ lowercase_chars_en_sk_cz_rue + uppercase_chars_en_sk_cz_rue +"])([\.,!?])?([" + single_quote_adepts + "])([ ]|[\.,!?])";
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
		var pattern = "([" + single_quote_adepts + "])";
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

		Assumptions (meaning that author will use quotes in the following manner):
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
		* replace identified characters accordingly:

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

// supported languages: en, sk, cs, rue
function correct_typos(string, language) {
	language = (typeof language === "undefined") ? "en" : language;

		string = replace_symbols(string, essential_set);
		string = replace_periods_with_ellipsis(string);

		string = correct_double_quotes(string, language);
		string = correct_single_quotes_and_apostrophes(string, language);
		string = swap_quotes_and_punctuation(string);

	string = remove_space_after_double_quotes(string, language);
	string = remove_space_before_double_quotes(string, language);

		string = remove_multiple_spaces(string);
		string = remove_space_before_punctuation(string);
		string = remove_space_after_punctuation(string);
		string = add_space_before_punctuation(string);
		string = add_space_after_punctuation(string);
		string = remove_spaces_at_paragraph_beginning(string);
		string = replace_with_nbsp(string);
		string = space_ellispsis_around_commas(string);
		string = correct_spaces_around_aposiopesis(string);

		string = correct_multiple_sign(string);
		string = replace_hyphen_with_dash(string);
		string = replace_dash_with_hyphen(string);

		string = start_sentence_w_capital_letter(string);
		string = correct_accidental_uppercase(string);

		return string;
}

		if (typeof module !== "undefined" && typeof module.exports !== "undefined")
				module.exports = correct_typos;
		else
				window.correct_typos = correct_typos;

})();
