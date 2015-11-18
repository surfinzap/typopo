/*!
 * Typopo 0.06
 *
 * Copyright 2015 Braňo Šandala
 * Released under the MIT license
 *
 * Date: 2015-11-04
 */

(function(){
var essential_set = {
    '\\(C\\)': '©',
    '\\(c\\)': '©',
    '\\(R\\)': '®',
    '\\(r\\)': '®',
}

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

function correct_double_quotes(string) {
    return string.replace(/([„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,})(.*?)([„|“|”|\"]|,{2,}|‘{2,}|’{2,}|'{2,})/g, '„$2“');
}

function correct_single_quotes(string) {
    return string.replace(/[‚|‘|’](.*?)[‚|‘|’]/g, '‚$1‘');
}

function swap_quotes_for_punctuation(string) {
    return string.replace(/([“‘])([\.,!?])/g, '$2$1');
}

function correct_multiple_sign(string) {
    return remove_multiple_spaces(string.replace(/([1-9]+[ ]{0,1}[a-wz]*)([ ]{0,1}[x|×][ ]{0,1})([1-9]+[ ]{0,1}[a-wz]*)/g, '$1 × $3'));
}

function replace_hyphen_with_dash(string) {
    return string.replace(/( [-|–] )/g, ' — ')
}

function remove_spaces_after_punctuation(string, char) {
    var re = new RegExp('\\' + char + ' ', 'g');
    return string.replace(re, char);
}

function remove_spaces_before_punctuation(string, char) {
    var re = new RegExp(' \\' + char, 'g');
    return string.replace(re, char);
}


function remove_spaces_at_paragraph_beginning(string) {
    var lines = string.match(/[^\r\n]+/g);
    var lines_count = lines.length;

    for (var i = 0; i < lines_count; i++) {
        lines[i] = lines[i].replace(/^\s+/, '');
    }

    return lines.join('\n');
}


function clean_typos(string) {
    string = replace_symbols(string, essential_set);
    string = replace_periods_with_ellipsis(string);
    string = remove_multiple_spaces(string);
    string = correct_double_quotes(string);
    string = correct_single_quotes(string);
    string = swap_quotes_for_punctuation(string);
    string = correct_multiple_sign(string);
    string = replace_hyphen_with_dash(string);
    string = remove_spaces_after_punctuation(string, '(');
    string = remove_spaces_after_punctuation(string, '„');
    string = remove_spaces_after_punctuation(string, '‚');
    string = remove_spaces_before_punctuation(string, '.');
    string = remove_spaces_before_punctuation(string, ',');
    string = remove_spaces_before_punctuation(string, ':');
    string = remove_spaces_before_punctuation(string, '!');
    string = remove_spaces_before_punctuation(string, '?');
    string = remove_spaces_before_punctuation(string, '“');
    string = remove_spaces_before_punctuation(string, '‘');
    string = remove_spaces_before_punctuation(string, ')');
    string = remove_spaces_at_paragraph_beginning(string);
    return string;
}

    window.clean_typos = clean_typos;
})();
