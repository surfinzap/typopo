import {removeTrailingSpaces} from "../whitespace/spaces";

export function removeNbspBetweenMultiCharWords(string, locale) {
	let pattern = "(["+ locale.lowercaseChars + locale.uppercaseChars +"]{2,})(["+ locale.nbsp + locale.narrowNbsp +"])(["+ locale.lowercaseChars + locale.uppercaseChars +"]{2,})";
	let re = new RegExp(pattern, "g");
	string =  string.replace(re, "$1 $3");
	string =  string.replace(re, "$1 $3"); //calling it twice to catch odd/even occurences

	return string;
}



export function addNbspAfterPreposition(string, locale) {
	let pattern = "(^|[" + locale.space + "]|[^" + locale.allChars + locale.apostrophe + "])([" + locale.allChars + "])([" + locale.space + "])"
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp;
	string = string.replace(re, replacement);
	string = string.replace(re, replacement); //calling it twice to catch odd/even occurences

	return string;
}



export function addNbspAfterAmpersand(string, locale) {
	let pattern = "([" + locale.spaces + "])(" + locale.ampersand + ")([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = " $2" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterCardinalNumber(string, locale) {
	let pattern = "(" + locale.cardinalNumber + ")( )(["+ locale.allChars +"]+)";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp + "$3";

	return string.replace(re, replacement);
}



export function addNbspAfterOrdinalNumber(string, locale) {
	let pattern = "("+ locale.cardinalNumber +")("+ locale.ordinalIndicator +")(["+ locale.spaces +"]?)(["+ locale.allChars +"]+)";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp + "$4";

	return string.replace(re, replacement);
}



export function addNbspWithinOrdinalDate(string, locale) {
	let pattern = "("+ locale.cardinalNumber +")("+ locale.ordinalIndicator +")(["+ locale.spaces +"]?)("+ locale.cardinalNumber +")("+ locale.ordinalIndicator +")(["+ locale.spaces +"]?)("+ locale.cardinalNumber +")";
	let re = new RegExp(pattern, "g");
	let replacement = "$1$2" + locale.nbsp + "$4$5" + locale.nbsp + "$7";

	return string.replace(re, replacement);
}


export function addNbspAfterRomanNumeral(string, locale) {
	// we can identify roman numeral effectively only if it has an ordinal indicator
	if(locale.romanOrdinalIndicator != "") {
		let pattern = "(\\b["+ locale.romanNumerals + "]+)("+ locale.romanOrdinalIndicator +")(["+ locale.spaces +"]?)";
		let re = new RegExp(pattern, "g");
		let replacement = "$1$2" + locale.nbsp;

		return string.replace(re, replacement);
	}

	return string;
}



export function addNbspAfterInitial(string, locale) {
	let pattern = "(["+ locale.uppercaseChars + "]\\.)(["+ locale.spaces +"])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterSymbol(string, locale, symbol) {
	let pattern = "("+ symbol +")([^" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp + "$2";

	return string.replace(re, replacement);
}



export function replaceSpacesWithNbspAfterSymbol(string, locale, symbol) {
	let pattern = "("+ symbol +")([" + locale.spaces + "])";
	let re = new RegExp(pattern, "g");
	let replacement = "$1" + locale.nbsp;

	return string.replace(re, replacement);
}



export function addNbspAfterAbbreviation(string, locale) {

	let abbreviations = locale.abbreviationsForNbsp;

	// replace existing spaces following abbreviations with nbsp

	for (var abbr in abbreviations) {
		let pattern = "(^|[^" + locale.allChars + locale.sentencePunctuation + "\\n])(" + abbreviations[abbr] +")([" + locale.spaces + "])([" + locale.allChars + "]|" + locale.cardinalNumber + ")";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1" + abbr + locale.nbsp + "$4";

		string = string.replace(re, replacement);
	}


	// best effort to add nbsp after abbreviations where were ommited
	
	for (var abbr in abbreviations) {
		let pattern = "(^|[^" + locale.allChars + locale.sentencePunctuation + "\\n])(" + abbreviations[abbr] +"[" + locale.spaces + "]?)([" + locale.allChars + "][^\\.]|" + locale.cardinalNumber + ")";
		let re = new RegExp(pattern, "gi");
		let replacement = "$1" + abbr + locale.nbsp + "$3";

		string = string.replace(re, replacement);
	}

	return removeTrailingSpaces(string, locale);
}




/*
	Consolidates the use of non-breaking spaces

	@param {string} string — input text for identification
	@returns {string} — output with correctly placed non-breaking space
*/
export function fixNbsp(string, locale) {
	string = removeNbspBetweenMultiCharWords(string, locale);
	string = addNbspAfterPreposition(string, locale);
	string = addNbspAfterAmpersand(string, locale);
	string = addNbspAfterCardinalNumber(string, locale);
	string = addNbspAfterOrdinalNumber(string, locale);
	string = addNbspWithinOrdinalDate(string, locale);
	string = addNbspAfterRomanNumeral(string, locale);
	string = addNbspAfterInitial(string, locale);
	string = addNbspAfterAbbreviation(string, locale)

	return string;
}
