/*!
 * Typopo 0.0.9
 *
 * Copyright 2015-16 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2016-02-20
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
    return string.replace(/[‘|']/g, "ʼ");
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

function remove_space_before_quotes(string, language) {
	switch (language) {
		case 'rue':
		case 'sk':
		case 'cs':
			return string.replace(/([ ])([“‘])/g, '$2');
    	case 'en':
			return string.replace(/([ ])([”’])/g, '$2');
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
    return string.replace(re, function(string,x,y){
        return (string.replace(y, y.toUpperCase()));
    });
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
    return string;
}

    window.clean_typos = clean_typos;
})();
