/*!
 * Typopo 0.0.11
 *
 * Copyright 2015-16 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2016-03-20
 */

(function(){
var essential_set = {
    '\\(C\\)': '©',
    '\\(c\\)': '©',
    '\\(R\\)': '®',
    '\\(r\\)': '®',
    '\\(TM\\)': '™',
    '\\(tm\\)': '™',
    '\\+\\-': '±',
    '\\-\\+': '±',
}

var lowercase_chars_en_sk_cz_rue = "a-záäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюя";
var uppercase_chars_en_sk_cz_rue = "A-ZÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯ";

function replace_symbols(string, replacement_set) {
    for (var rule in essential_set) {
        var re = new RegExp(rule, 'g');
        string = string.replace(re, essential_set[rule]);
    }
    return string;
}

function replace_periods_with_ellipsis(string) {
    return string.replace(/\.{2,}/g, '…');
}

function remove_multiple_spaces(string) {
    return string.replace(/ {2,}/g, ' ');
}

function correct_double_quotes(string, language) {
	switch (language) {
		case 'rue':
		case 'sk':
		case 'cs':
			return string.replace(/([„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,})(.*?)([„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,})/g, '„$2“');
    	case 'en':
    		return string.replace(/([„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,})(.*?)([„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,})/g, '“$2”');
	}
}

function correct_apostrophes(string) {
    return string.replace(/[‘|'|ʼ]/g, "’");
}

// function correct_single_quotes(string, language) {
// 	switch (language) {
// 		case 'rue':
// 		case 'sk':
// 		case 'cs':
// 			return string.replace(/[‚|‘|’|\'](?=\w)(.+?)[‚|‘|’|'](?!\w)/g, '‚$1‘');
//     	case 'en':
//     		return string.replace(/[‚|‘|’|\'](?=\w)(.+?)[‚|‘|’|'](?!\w)/g, '‘$1’');
// 	}
// }

function swap_quotes_and_punctuation(string) {
    return string.replace(/([“”])([\.,!?])/g, '$2$1');
    //once we'll support single quotes
    //return string.replace(/([“‘’”])([\.,!?])/g, '$2$1');
}

function correct_multiple_sign(string) {
    return remove_multiple_spaces(string.replace(/([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, '$1 × $3'));
}

function replace_hyphen_with_dash(string) {
    return string.replace(/( [-|–] )/g, ' — ')
}

function replace_dash_with_hyphen(string){
    var pattern = "(["+ lowercase_chars_en_sk_cz_rue +"])([–—])(["+ lowercase_chars_en_sk_cz_rue +"])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, '$1-$3');
}

function remove_space_after_punctuation(string) {
	return string.replace(/([\(])([ ])/g, '$1');
}

function remove_space_before_punctuation(string) {
	return string.replace(/([ ])([\,\.\!\?\:\;\)])/g, '$2');
}

function remove_spaces_around_slashes(string) {
    return string.replace(/\/ ?(.*?) ?\//g, '/$1/');
}


//this needs refactoring
function remove_space_after_quotes(string, language) {
	switch (language) {
		case 'rue':
		case 'sk':
		case 'cs':
			return string.replace(/([„‚])([ ])/g, '$1');
    	case 'en':
			return string.replace(/([“‘])([ ])/g, '$1');
	}
}

//this needs refactoring
function remove_space_before_quotes(string, language) {
	switch (language) {
		case 'rue':
		case 'sk':
		case 'cs':
			return string.replace(/([ ])([“‘])/g, '$2');
    	case 'en':
			return string.replace(/([ ])([”])/g, '$2');
	}
}


function remove_spaces_at_paragraph_beginning(string) {
    var lines = string.match(/[^\r\n]+/g);
    var lines_count = lines.length;

    for (var i = 0; i < lines_count; i++) {
        lines[i] = lines[i].replace(/^\s+/, '');
    }

    return lines.join('\n');
}

function start_sentence_w_capital_letter(string) {
    // find all lowercase letters after sentence punctuation, then replace them
    // with uppercase variant by calling another replace function
    var pattern = "([\\.\\?\\!] )(["+ lowercase_chars_en_sk_cz_rue +"])";
    var re = new RegExp(pattern, "g");
    return string.replace(re, function(string,regex_group_one,regex_group_two){
        return string.replace(regex_group_two, regex_group_two.toUpperCase());
    });
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
    var pattern = "([  ])([aviuoszkAVIUOSZK]|&)( )";
    var re = new RegExp(pattern, "g");
    string = string.replace(re, '$1$2 '); //call it twice, for odd and even occurences
    return string.replace(re, '$1$2 ');
}

/*
    This function identifies and marks common apostrophes that are being used in the language

    People use various characters for apostrophe, we're going to identify them all — '‘’
    By common use of apostrophe, we mean an apostrophe that cannot be mistaken with a right single quote, just because of nature of it's placement.

    Examples of common use of apostrophe:
    Don’t, I’m (or other in-word ommision)
    Fish ’n’ Chips (or other example of shortening —and—)
    O’Doole (or other example of name)
    ’70s (or other year)
    69’ers

    Examples of apostrophe use that we are not covering with this identification algorithm (and they'll be identified with certain probability in some other function)
    hers’  (when apostrophe is placed at the end of the word, it can be mistaken for single right quote)
    ’bout  (when apostrophe is placed at the beginning of the word, it can be mistaken for single left quote)

    We mark apostrophes by replacing them with text {typopo-apostrophe}
*/

function identify_common_apostrophes(string) {
    // identify
    // Fish ’n’ Chips and alike
    string = string.replace(/(['‘’])([nN])(['‘’])/g, '{typopo-apostrophe}$2{typopo-apostrophe}');

    // identify
    // Don’t, I’m (or other in-word ommision)
    // O’Doole (or other example of name)
    // 69’ers
    var pattern = "([a-záäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюяA-ZÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯ0-9])(['‘’])([a-záäčďéěíĺľňóôöőŕřšťúüűůýžабвгґдезіийклмнопрстуфъыьцчжшїщёєюяA-ZÁÄČĎÉĚÍĹĽŇÓÔÖŐŔŘŠŤÚÜŰŮÝŽАБВГҐДЕЗІИЙКЛМНОПРСТУФЪЫЬЦЧЖШЇЩЁЄЮЯ0-9])";
    var re = new RegExp(pattern, "g");

    return string;
}


// supported languages: en, sk, cs, rue
function clean_typos(string, language) {
	language = (typeof language === 'undefined') ? 'en' : language;

    string = replace_symbols(string, essential_set);
    string = replace_periods_with_ellipsis(string);
    string = remove_multiple_spaces(string);
    string = correct_double_quotes(string, language);
    string = swap_quotes_and_punctuation(string);
    string = correct_apostrophes(string);
    // string = correct_single_quotes(string, language);
    string = remove_spaces_around_slashes(string);
	string = remove_space_after_quotes(string, language);
	string = remove_space_before_quotes(string, language);
    string = correct_multiple_sign(string);
    string = replace_hyphen_with_dash(string);
    string = replace_dash_with_hyphen(string);
	string = remove_space_before_punctuation(string);
    string = remove_space_after_punctuation(string);
    string = remove_spaces_at_paragraph_beginning(string);
    string = start_sentence_w_capital_letter(string);
    string = correct_accidental_uppercase(string);
    string = replace_with_nbsp(string);
    return string;
}

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = clean_typos;
    else
        window.clean_typos = clean_typos;
        window.identify_common_apostrophes = identify_common_apostrophes;

})();
